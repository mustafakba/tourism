"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../provider/redux/store";
import { setTrips } from "../../provider/redux/trips/tripSlice";
import SearchBar from "../../components/shared/SearchBar";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faAnglesRight,
  faChair,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const TripList: React.FC = () => {
  const dispatch = useDispatch();
  const trips = useSelector((state: RootState) => state.trips.trips);

  useEffect(() => {
    const storedTrips = localStorage.getItem("trips");
    if (storedTrips) {
      const trips = JSON.parse(storedTrips);
      dispatch(setTrips(trips));
    }
  }, [dispatch]);

  return (
    <div className={"wrapper"}>
      <SearchBar />
      <div className="container">
        {trips.length > 0 && (
          <div>
            We found {trips.length} bus schedules matching your search criteria.
          </div>
        )}
        {trips.length > 0 ? (
          trips.map((trip, index) => {
            // Burada available seat sayısını hesaplıyoruz
            const availableSeats = trip.seat_arrangement.filter(
              (seat) => !seat.selected,
            ).length;
            return (
              <div
                className={
                  "flex overflow-x-auto gap-x-5 md:gap-x-0 justify-between px-5 items-center py-5 bg-white w-full my-5"
                }
                key={index}
              >
                <div className="logo flex flex-col gap-y-2 bg-white pr-5">
                  <Image
                    src={"/assets/logos/svg/logo-no-background.svg"}
                    alt={"logo"}
                    width={150}
                    height={150}
                  />
                  <span className={"text-xs"}>
                    {trip.trip_details.brand_name}
                  </span>
                </div>
                <div className="time flex flex-col gap-y-3 items-center">
                  <div className="flex items-center gap-x-1">
                    <FontAwesomeIcon icon={faClock} />
                    <span className={""}>{trip.time}</span>
                  </div>
                  <div className={"text-xs"}>
                    <span>
                      {trip.trip_details.number_of_breaks} Breaks | (10 hours)
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3 items-center">
                  <div className="flex items-center gap-x-1">
                    <FontAwesomeIcon icon={faChair} />
                    <span className={"font-bold"}>2 + 2</span>
                  </div>
                  <div className={"text-sm flex items-center gap-x-2"}>
                    {trip.departure_location}{" "}
                    <FontAwesomeIcon icon={faAnglesRight} />
                    {trip.arrival_location}
                  </div>
                </div>
                <div className="flex flex-col gap-y-3 items-center">
                  <div className={"flex items-center gap-x-2"}>
                    <span>Price</span>
                    <FontAwesomeIcon icon={faTicket} />
                  </div>
                  <div className={"flex font-bold items-center gap-x-2"}>
                    {trip.trip_details.trip_price} $
                  </div>
                </div>
                <div className="flex flex-col gap-y-3 items-center">
                  <span className={"text-xs text-red-400"}>
                    Last {availableSeats} seats
                  </span>
                  <Link
                    className={
                      "border py-1 px-2 rounded bg-primary-300 duration-200 hover:bg-primary-50 text-white"
                    }
                    href={`/seferler/${trip.trip_number}`}
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>There are no sessions with the criteria you are looking for.</p>
        )}
      </div>
    </div>
  );
};

export default TripList;
