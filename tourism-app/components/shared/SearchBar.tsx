import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setTrips } from "@/provider/redux/trips/tripSlice";
import { useDispatch } from "react-redux";

// @ts-ignore
import { formatDate } from "@/utils/FormatDate"; // utils klasöründeki formatDate fonksiyonunu import edin

import {
  faClock,
  faCoins,
  faHeadset,
  faLock,
  faLockOpen,
  faPeopleGroup,
  faPlus,
  faXmark,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import OurAdvantages from "@/components/OurAdvantages";
import { toast } from "react-toastify";
import { filter } from "minimatch";
import { router } from "next/client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const SearchArea: React.FC = ({}) => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const cities = ["Istanbul", "Ankara", "Antalya"];
  const [allTrips, setAllTrips] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isTripsPage = pathname === "/seferler";

  const handleSearchClick = () => {
    console.log("From:", from);
    console.log("To:", to);
    const formattedDate = formatDate(selectedDate);
    console.log("Date:", formattedDate);

    fetch("http://localhost:8000/trips")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (trip: {
            departure_location: string;
            arrival_location: string;
            trip_date: string;
          }) => {
            return (
              trip.departure_location === from &&
              trip.arrival_location === to &&
              trip.trip_date === formattedDate
            );
          },
        );

        console.log(filteredData);
        dispatch(setTrips(filteredData));
        localStorage.setItem("trips", JSON.stringify(filteredData));
        router.push("/seferler");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      className={`flex wrapper ${
        isTripsPage
          ? "relative top-0"
          : "absolute top-0 md:top-[23%] flex-col w-full gap-4"
      } `}
    >
      <div className={"container rounded-xl py-5"}>
        <div
          className={`${
            isTripsPage
              ? "min-w-[100%] justify-between flex px-0"
              : "grid md:grid-cols-2 justify-around"
          } gap-y-8 gap-x-4 px-4 `}
        >
          <div
            className={`${
              isTripsPage ? "grid md:flex w-full gap-x-5" : "grid"
            } search-ticket-area py-4 gap-y-1 px-4 rounded-xl bg-gray-50`}
          >
            <div className={`flex flex-col ${isTripsPage ? "md:w-1/4" : ""}`}>
              <label
                htmlFor="from"
                className="text-sm border-b py-1 font-medium text-gray-700"
              >
                From
              </label>
              <select
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className={`flex flex-col ${isTripsPage ? "md:w-1/4" : ""}`}>
              <label
                htmlFor="to"
                className="text-sm border-b py-1 font-medium text-gray-700"
              >
                To
              </label>
              <select
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className={`flex flex-col ${isTripsPage ? "md:w-1/4" : ""}`}>
              <label
                htmlFor="date"
                className="text-sm border-b py-1 font-medium text-gray-700"
              >
                Tarih
              </label>
              <DatePicker
                id="date"
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                wrapperClassName="w-full"
              />
            </div>
            <button
              onClick={handleSearchClick}
              className={`bg-primary-50 px-4 py-3 text-white rounded-xl items-center justify-center flex ${
                isTripsPage ? "md:w-1/4" : ""
              }`}
            >
              Search Ticket
            </button>
          </div>
          {!isTripsPage && (
            <div className={"row-start-1 md:col-start-2"}>
              <OurAdvantages />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
