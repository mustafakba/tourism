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

const Page = () => {
  const tickets = useSelector((state) => state.user.tickets);
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/trips")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  useEffect(() => {
    if (tickets?.length > 0 && trips?.length > 0) {
      const filteredTrip = trips.find(
        (trip) => trip.trip_number === tickets[0].trip_number,
      );
      setSelectedTrip(filteredTrip);
    }
  }, [tickets, trips]);

  const handlePayment = () => {
    setLoading(true);

    // Simule edilmiş bir API çağrısı
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="wrapper h-full">
      <div className="container">
        {!isSuccess && (
          <div className={"border-b my-5"}>
            Your Tickets Here! Complete Payment:
          </div>
        )}
        <div className={"grid grid-cols-2"}>
          {!isSuccess && (
            <div className={"flex justify-center gap-x-5 my-5"}>
              {tickets &&
                tickets.map((ticket, index) => (
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
                ))}
            </div>
          )}

          <div className="max-w-[500px] flex items-center justify-center h-[50vh] col-span-2 my-20 ml-auto mr-auto">
            {!isSuccess ? (
              <CreditCard onButtonClick={handlePayment} />
            ) : (
              <div className="text-center flex flex-col gap-y-5 my-5">
                <div className={"text-[50px]"}>
                  <FontAwesomeIcon color={"green"} icon={faCheck} />
                </div>
                <p>
                  Ödeme başarıyla alındı. Daha fazlası için lütfen mail
                  adresinizi kontrol etmeyi unutmayınız.
                </p>
                <Link className={"underline"} href={"/"}>
                  Anasayfaya Dön
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
