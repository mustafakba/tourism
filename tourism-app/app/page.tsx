"use client";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

interface User {
  email: string;
  birthDate: string; // veya uygun tür
  gender: string; // veya uygun tür
}

export default function Home() {
  // useSelector hook'u ile Redux state'inden user state'ini çekiyoruz
  const user: User = useSelector((state: { user: User }) => state.user);

  return (
    <main className="flex min-h-[90vh] flex-col items-center p-12">
      <div>Banner olacak</div>
      {/* User bilgilerini göstermek için basit bir gösterim */}
      <div>
        <p>Homepage</p>
        <p>Email: {user.email}</p>
        <p>Birth Date: {user.birthDate}</p>
        <p>Gender: {user.gender}</p>
      </div>
    </main>
  );
}
