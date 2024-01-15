"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/provider/redux/cart/cartSlice";
import SeatGrid from "@/components/SeatGrid";
import { userSlice } from "@/provider/redux/users/usersSlice";

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

const Page = () => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const dispatch = useDispatch();

  const handleAddSeat = (seatId: string) => {
    //Redux'a ekleme alanı ,
    dispatch(addToCart(seatId));
  };
  const handleRemoveSeat = (seatId: string) => {
    // Redux cart state'inden kaldır
    dispatch(removeFromCart(seatId));
  };

  useEffect(() => {
    fetch("http://localhost:8000/trips")
      .then((response) => response.json())
      .then((data: Trip[]) => {
        const filteredTrip = data.find((trip) => trip.trip_number === slug);
        if (filteredTrip) {
          // @ts-ignore
          setTrip(filteredTrip);
        } else {
          // Burada trip bulunamazsa yapılacak işlemler
          console.log("Trip bulunamadı");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [slug]);

  if (!trip) {
    return <div>Sefer yükleniyor...</div>;
  }

  return (
    <div className={"wrapper"}>
      <div className={"container"}>
        <div className="details-area mt-10">
          <h6 className={"my-5 w-full border-b font-medium uppercase"}>
            Trip Details
          </h6>
          <div className={"grid grid-cols-4  gap-y-4 gap-x-4"}>
            <p className={"border bg-white rounded-xl py-2 px-4"}>
              Trip Number: {trip.trip_number}
            </p>
            <p className={"border bg-white rounded-xl py-2 px-4"}>
              Departure: {trip.departure_location}
            </p>
            <p className={"border bg-white rounded-xl py-2 px-4"}>
              Arrival: {trip.arrival_location}
            </p>
            <p className={"border bg-white rounded-xl py-2 px-4"}>
              Date: {trip.trip_date}
            </p>
            <p className={"border bg-white rounded-xl py-2 px-4"}>
              Time: {trip.time}
            </p>
            <p className={"border bg-white rounded-xl py-2 px-4"}>
              Bus Brand: {trip.trip_details.bus_brand}
            </p>
            <p className={"border bg-white rounded-xl py-2 px-4"}>
              Brand: {trip.trip_details.brand_name}
            </p>
            <p className={"border bg-white rounded-xl py-2 px-4"}>
              Break Count: {trip.trip_details.number_of_breaks}
            </p>
          </div>
          <SeatGrid
            trip={trip}
            seats={trip.seat_arrangement}
            onRemoveSeat={handleRemoveSeat}
            onAddSeat={handleAddSeat}
            userGender={undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
