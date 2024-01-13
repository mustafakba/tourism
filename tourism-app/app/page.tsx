"use client";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import SearchBar from "@/components/shared/SearchBar";

interface User {
  email: string;
  birthDate: string; // veya uygun tür
  gender: string; // veya uygun tür
}

export default function Home() {
  // useSelector hook'u ile Redux state'inden user state'ini çekiyoruz
  const user: User = useSelector((state: { user: User }) => state.user);

  return (
    <main className="flex min-h-[90vh] flex-col items-center">
      <div className={"shadow-2xl relative"}>
        <Image
          src={"/assets/images/bannerHome.png"}
          alt={"banner"}
          width={1200}
          height={25}
          className={"w-screen h-[60vh] object-cover filter brightness-[65%]"}
        />
      </div>
      <SearchBar />
      <div>
        <p>Homepage</p>
        <p>Email: {user.email}</p>
        <p>Birth Date: {user.birthDate}</p>
        <p>Gender: {user.gender}</p>
      </div>
    </main>
  );
}
