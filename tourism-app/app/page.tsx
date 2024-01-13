"use client";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import SearchBar from "@/components/shared/SearchBar";
import HeroSection from "@/components/HeroSection";
import OurInfos from "@/components/OurInfos";
import { faPlaneSlash } from "@fortawesome/free-solid-svg-icons";

interface User {
  email: string;
  birthDate: string; // veya uygun tür
  gender: string; // veya uygun tür
}

export default function Home() {
  // useSelector hook'u ile Redux state'inden user state'ini çekiyoruz
  const user: User = useSelector((state: { user: User }) => state.user);

  return (
    <main className="flex min-h-[90vh] relative flex-col items-center">
      <section className={"relative"}>
        <HeroSection />
      </section>
      <section
        className={
          "my-10 items-center justify-center ml-auto mr-auto flex flex-col"
        }
      >
        <h4 className={"mb-10 italic border-b text-2xl"}>
          {" "}
          Why work with us ?
        </h4>
        <div className="about-us container gap-x-4 flex md:flex-row flex-row justify-between w-full">
          <OurInfos
            text={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur dolores doloribus dolorum explicabo fugit quis quo sit vitae voluptatem."
            }
            icon={faPlaneSlash}
          />
          <OurInfos
            text={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur dolores doloribus dolorum explicabo fugit quis quo sit vitae voluptatem."
            }
            icon={faPlaneSlash}
          />
          <OurInfos
            text={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur dolores doloribus dolorum explicabo fugit quis quo sit vitae voluptatem."
            }
            icon={faPlaneSlash}
          />
          <OurInfos
            text={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur dolores doloribus dolorum explicabo fugit quis quo sit vitae voluptatem."
            }
            icon={faPlaneSlash}
          />
        </div>
      </section>
    </main>
  );
}
