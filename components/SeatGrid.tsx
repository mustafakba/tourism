import React, { useState } from "react";
import { toast } from "react-toastify";
import formatNumber from "@/utils/FormatNumber";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addTicket } from "@/provider/redux/users/usersSlice";

interface Seats {
  seat_id: string;
  gender: string;
  selected: boolean;
}
interface Trip {
  trip_number: string;
  departure_location: string;
  arrival_location: string;
  trip_date: string;
  time: string;
  trip_details: TripDetails;
  seat_arrangement: Seat[];
}
interface TripDetails {
  bus_brand: string;
  brand_name: string;
  number_of_breaks: number;
  trip_price: number;
}

interface Seat {
  seat_id: string;
  gender: string;
  selected: boolean;
}
interface SeatGridProps {
  seats: Seats[];
  onRemoveSeat: (seatId: string) => void;
  onAddSeat: (seatId: string) => void;
  userGender: string;
  trip: Trip;
}
const SeatGrid: React.FC<SeatGridProps> = ({
  seats,
  onRemoveSeat,
  onAddSeat,
  userGender,
  trip,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsInfo, setSelectedSeatsInfo] = useState({});
  // @ts-ignore
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const calculateTotalPrice = () => {
    const selectedSeatsCount = selectedSeats.length;
    // @ts-ignore
    const totalPrice = selectedSeatsCount * trip.trip_details.trip_price;
    return totalPrice;
  };

  const handleContinuePayment = () => {
    if (selectedSeats.length === 0) {
      toast.error("Lütfen en az bir koltuk seçin.");
      return;
    }

    const tickets = selectedSeats.map((seatId) => ({
      seat_id: seatId,
      trip_number: trip.trip_number,
    }));

    tickets.forEach((ticket) => {
      dispatch(addTicket(ticket));
    });

    router.push("/payment");
  };

  const isSeatSelectable = (seat: {
    seat_id: any;
    gender?: string;
    selected?: boolean;
  }) => {
    return (
      !seat.selected && // Eğer koltuk zaten seçili değilse
      (userGender !== "female" ||
        (userGender === "female" &&
          seat.gender !== "female" &&
          // @ts-ignore

          selectedSeats.indexOf(seat.seat_id) === -1))
    );
  };

  const getOppositeSeatId = (seatId: string) => {
    const row = seatId.charAt(0);
    const oppositeRow = row === "A" ? "B" : "A";
    return oppositeRow + seatId.substring(1);
  };
  const isOppositeSeatSelectable = (seat: {
    seat_id: any;
    gender?: string | undefined;
    selected?: boolean | undefined;
  }) => {
    const oppositeSeatId = getOppositeSeatId(seat.seat_id);
    const oppositeSeat = seats.find((s) => s.seat_id === oppositeSeatId);

    return (
      !oppositeSeat ||
      (userGender !== "female" && oppositeSeat.gender !== "female")
    );
  };

  const handleSeatClick = (seat: {
    seat_id: any;
    gender?: string | undefined;
    selected?: boolean | undefined;
  }) => {
    if (user.firstName === null) {
      console.log(user);
      const confirmResult = window.confirm(
        "Bilet seçmek için giriş yapmanız gerekmektedir. Şimdi giriş yapmak ister misiniz?",
      );

      if (confirmResult) {
        router.push("/login");
      }

      return;
    }

    if (isSeatSelectable(seat) && isOppositeSeatSelectable(seat)) {
      // @ts-ignore
      const seatIndex = selectedSeats.indexOf(seat.seat_id);
      if (seatIndex === -1) {
        onAddSeat(seat.seat_id);
        // @ts-ignore
        setSelectedSeats((prevSelectedSeats) => [
          ...prevSelectedSeats,
          seat.seat_id,
        ]);
      } else {
        onRemoveSeat(seat.seat_id);
        setSelectedSeats((prevSelectedSeats) =>
          prevSelectedSeats.filter((_, index) => index !== seatIndex),
        );
      }
    } else {
      if (!isSeatSelectable(seat)) {
        toast.error("Bu koltuk zaten seçilmiş");
      } else {
        toast.error("Karşı cinsin yanından koltuk seçilemez.");
        console.log("Karşılıklı koltuk seçilemez.");
      }
    }
  };

  const renderSeats = (seatsToRender: any[]) => {
    return seatsToRender.map((seat) => {
      // @ts-ignore
      const isSelected = selectedSeats.includes(seat.seat_id);

      const seatStyle = {
        backgroundColor:
          seat.gender === "male"
            ? isSelected
              ? "rgba(58,80,78,0.5)"
              : "#2d7bf4"
            : seat.gender === "female"
              ? isSelected
                ? "rgba(58,80,78,0.5)"
                : "pink"
              : isSelected
                ? "rgba(58,80,78,0.5)"
                : "white",
        color: isSelected && seat.gender === "male" ? "white" : "black", // Yazı rengini belirle
        width: "50px",
        height: "50px",
        border: "1px solid black",
        margin: "5px",
        cursor: isSeatSelectable(seat) ? "pointer" : "not-allowed",
      };

      return (
        <div
          key={seat.seat_id}
          style={seatStyle}
          className={"flex items-center shadow justify-center"}
          onClick={() => handleSeatClick(seat)}
        >
          {seat.seat_id}
        </div>
      );
    });
  };

  const renderLeftColumn = () => {
    const leftColumnSeats =
      seats?.filter((seat: { seat_id: string | string[] }) =>
        seat.seat_id.includes("A"),
      ) || [];
    return <div style={{ float: "left" }}>{renderSeats(leftColumnSeats)}</div>;
  };

  const renderRightColumn = () => {
    const rightColumnSeats =
      seats?.filter((seat: { seat_id: string | string[] }) =>
        seat.seat_id.includes("B"),
      ) || [];
    return (
      <div style={{ float: "right" }}>{renderSeats(rightColumnSeats)}</div>
    );
  };

  return (
    <div>
      <div className={"text-center py-5 border-b"}>
        Please choose from the available seats
      </div>
      <div className={"flex justify-center gap-x-10 py-5 "}>
        <div>
          <div className={"flex flex-col bg-white px-8 py-1 shadow-2xl"}>
            <div>
              {renderLeftColumn()}
              {renderRightColumn()}
            </div>
            <div
              className={
                "colors text-white grid border-t-2 border-black pt-4 grid-cols-2 m-auto gap-y-2 gap-x-2 items-center justify-center"
              }
            >
              <div className="male py-1 w-[50px] h-[20px] flex items-center justify-center bg-[#2d7bf4] ">
                M
              </div>
              <div className="female py-1 w-[50px] h-[20px] flex items-center justify-center bg-[#2d7bf4] ">
                F
              </div>
              <div className="pink text-xs py-1 w-[50px] h-[20px] flex items-center justify-center bg-[#9ca7a6] ">
                Choose
              </div>
              <div className="pink text-black border border-black !bg-white text-xs py-1 w-[50px] h-[20px] flex items-center justify-center ">
                Empty
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "flex flex-col shadow-2xl justify-between py-5 gap-y-3 bg-white py-1 px-4 rounded-xl"
          }
        >
          <div>
            <div>Your Selected Seats :</div>
            <div className={"flex border shadow justify-center"}>
              {selectedSeats.join(", ")}
            </div>
          </div>
          {selectedSeats.length > 0 && (
            <div>Total Price : {formatNumber(calculateTotalPrice())}</div>
          )}
          {selectedSeats.length > 0 && (
            <div
              onClick={handleContinuePayment}
              className={
                "border flex cursor-pointer text-white shadow items-center py-2 px-2 bg-primary-50 hover:border-primary-200 duration-200"
              }
            >
              Continue payment
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;
