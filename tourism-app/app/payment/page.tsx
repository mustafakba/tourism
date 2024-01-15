"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTicket } from "@/provider/redux/users/usersSlice";
import CreditCard from "@/components/CreditCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiamond,
  faTicket,
  faArrowRight,
  faCalendarDays,
  faBus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Spinner from "@/components/Spinner";

const Page = () => {
  const tickets = useSelector((state) => state.user.tickets);
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/trips")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  useEffect(() => {
    if (tickets?.length > 0 && trips?.length > 0) {
      const filteredTrip = trips.find(
        // @ts-ignore
        (trip) => trip.trip_number === tickets[0].trip_number,
      );
      // @ts-ignore
      setSelectedTrip(filteredTrip);
    }
  }, [tickets, trips]);

  const handlePayment = () => {
    setLoading(true);
    setPaymentInitiated(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // @ts-ignore
  return (
    <div className="wrapper h-full">
      <div className="container">
        {!paymentInitiated && (
          <div className={"border-b my-5"}>
            Your Tickets Here! Complete Payment:
          </div>
        )}

        {!paymentInitiated && (
          <div className={"grid grid-cols-2"}>
            <div className={"flex justify-center gap-x-5 my-5"}>
              {tickets &&
                tickets.map(
                  (
                    ticket: {
                      seat_id:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | React.PromiseLikeOfReactNode
                        | null
                        | undefined;
                      trip_number:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | React.PromiseLikeOfReactNode
                        | null
                        | undefined;
                    },
                    index: React.Key | null | undefined,
                  ) => (
                    <div
                      className={
                        "flex flex-col justify-center gap-y-5  px-5 py-5 items-center bg-gray-200 text-black rounded-xl"
                      }
                      key={index}
                    >
                      <div className={"flex gap-x-2 items-center"}>
                        <FontAwesomeIcon icon={faDiamond} />
                        <p>ID: {ticket.seat_id}</p>
                      </div>
                      <div className={"flex gap-x-2 items-center"}>
                        <FontAwesomeIcon icon={faTicket} />
                        <p>Trip Number: {ticket.trip_number}</p>
                      </div>
                      <div className={"flex gap-x-2 items-center"}>
                        <p>{selectedTrip?.departure_location}</p>
                        <FontAwesomeIcon icon={faArrowRight} />
                        <p> {selectedTrip?.arrival_location}</p>
                      </div>
                      <div className={"flex gap-x-2 items-center"}>
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <p> {selectedTrip?.trip_date}</p>
                      </div>
                      <p>Company : {selectedTrip?.trip_details.brand_name}</p>
                      <div className={"flex gap-x-2 items-center"}>
                        <FontAwesomeIcon icon={faBus} />{" "}
                        <p>{selectedTrip?.trip_details.bus_brand}</p>
                      </div>
                      <p className={"font-bold"}>
                        {" "}
                        {selectedTrip?.trip_details.trip_price} $
                      </p>
                    </div>
                  ),
                )}
            </div>
            <CreditCard onButtonClick={handlePayment} />
          </div>
        )}

        {paymentInitiated && (
          <div className={"h-[50vh]"}>
            <div className="max-w-[500px] col-span-2 my-20 ml-auto mr-auto">
              {loading ? (
                <div className="text-center flex flex-col gap-y-5 items-center my-5">
                  <Spinner />
                </div>
              ) : !loading ? (
                <div className="text-center flex flex-col gap-y-5 items-center my-5">
                  <FontAwesomeIcon
                    color={"green"}
                    className={"text-[50px]"}
                    icon={faCheck}
                  />
                  <p>Ödeme Başarıyla Alındı!</p>
                  <div>
                    Bilet detayları ve ödeme detayları için lütfen mail
                    adresinizi kontrol edin.
                  </div>
                  <Link href={"/"}>Anasayfaya dönün.</Link>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
