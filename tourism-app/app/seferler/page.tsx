"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/provider/redux/store";
import { setTrips } from "@/provider/redux/trips/tripSlice";

const TripList: React.FC = () => {
  const dispatch = useDispatch();
  const trips = useSelector((state: RootState) => state.trips.trips); // Redux store'dan trips verisini çek

  useEffect(() => {
    // localStorage'dan trips verisini yükle
    const storedTrips = localStorage.getItem("trips");
    if (storedTrips) {
      const trips = JSON.parse(storedTrips);
      dispatch(setTrips(trips)); // Redux store'una dispatch et
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Seferler Sayfası</h2>
      {trips.map((trip, index) => (
        <div key={index}>
          <p>
            {trip.departure_location} - {trip.arrival_location}
          </p>
          <p>Tarih: {trip.trip_date}</p>
          {/* Diğer trip detayları... */}
        </div>
      ))}
    </div>
  );
};

export default TripList;
