import React from "react";
import AdvantageCard from "../components/AdvantageCart";
import {
  faClock,
  faCoins,
  faHeadset,
  faLock,
  faPeopleGroup,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

const OurAdvantages = () => {
  return (
    <div className="our-advantages gap-y-2 gap-x-4 grid grid-cols-2 md:grid-cols-3">
      <div className="advantages-text bg-[#0000007D] rounded-xl py-2 text-md md:text-2xl text-white text-center col-span-2 md:col-span-3">
        The Best Ticket Site , JSTourism
      </div>
      <AdvantageCard icon={faHeadset} text={"7/24 Customer Support"} />
      <AdvantageCard icon={faLock} text={"Secure Payment"} />
      <AdvantageCard icon={faCoins} text={"No Commission, Free of Charge"} />
      <AdvantageCard
        icon={faPeopleGroup}
        text={"From 25 million a month\n" + "More Visitors"}
      />
      <AdvantageCard icon={faClock} text={"Buy Your Ticket in Two Minutes\n"} />
      <AdvantageCard
        icon={faXmarkSquare}
        text={"Canceled Ticket Seamless Returns"}
      />
    </div>
  );
};

export default OurAdvantages;
