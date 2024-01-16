import React from "react";
import Image from "next/image";
import SearchBar from "../components/shared/SearchBar";

const HeroSection = () => {
  return (
    <div className={""}>
      <div className={"shadow-2xl"}>
        <Image
          src={"/assets/images/bannerHome.png"}
          alt={"banner"}
          width={1200}
          height={25}
          className={
            "w-screen h-[90vh] md:h-[70vh] object-cover filter brightness-[65%]"
          }
        />
      </div>
      <SearchBar />
    </div>
  );
};

export default HeroSection;
