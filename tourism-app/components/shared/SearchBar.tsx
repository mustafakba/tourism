import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdvantageCard from "@/components/AdvantageCart";
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

const SearchArea: React.FC = ({}) => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const cities = [
    "İstanbul",
    "Ankara",
    "Antalya",
    "İzmir",
    "Bursa",
    "Nevşehir",
    "Hakkari",
  ];
  const handleSearchClick = () => {
    console.log("From:", from);
    console.log("To:", to);
    console.log("Date:", selectedDate?.toLocaleDateString());
  };

  return (
    <div className="flex wrapper absolute top-0 md:top-[23%] flex-col w-full gap-4">
      <div className={"container rounded-xl py-5"}>
        <div
          className={"grid md:grid-cols-2 gap-y-8 gap-x-4 px-4 justify-around"}
        >
          <div className="search-ticket-area grid py-4 gap-y-1 px-4 rounded-xl  bg-gray-50">
            <div className="flex flex-col">
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
            <div className="flex flex-col">
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
            <div className="flex flex-col">
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
              className={
                "bg-primary-50 px-4 py-3 text-white rounded-xl items-center justify-center flex"
              }
            >
              Search Ticket
            </button>
          </div>
          <div className={"row-start-1 md:col-start-2"}>
            <OurAdvantages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;