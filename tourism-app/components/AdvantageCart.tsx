import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface AdvantageCardProps {
  icon: IconDefinition;
  text: string;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ icon, text }) => {
  return (
    <div className="flex flex-col gap-y-3 justify-center p-4 items-center bg-[#0000007D] rounded-xl advantage-cart shadow-lg">
      <div className="text-3xl">
        <FontAwesomeIcon color={"rgb(255,255,255)"} icon={icon} />
      </div>
      <div className="flex-1 text-xs">
        <p className="text-center text-white">{text}</p>
      </div>
    </div>
  );
};

export default AdvantageCard;
