import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ourInfosCartProps {
  icon: IconDefinition;
  text: string;
}

// @ts-ignore
const OurInfos = ({ icon, text }) => {
  return (
    <div>
      <div className="opacity-[95%] hover:opacity-100 cursor-pointer duration-200 flex flex-col gap-y-3 justify-center p-4 items-center bg-primary-50 rounded-xl advantage-cart shadow-lg">
        <div className="md:text-3xl">
          <FontAwesomeIcon color={"rgb(255,255,255)"} icon={icon} />
        </div>
        <div className="flex-1 text-xs">
          <p className="text-center text-white">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default OurInfos;
