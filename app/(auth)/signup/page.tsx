"use client";
import React, { useEffect } from "react";
import SignupForm from "@/components/SignUp";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  // @ts-ignore
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.firstName) {
      // Eğer user.firstName varsa, kullanıcı giriş yapmış demektir.
      router.push("/"); // Ana sayfaya yönlendir.
    }
  }, [user, router]);
  return (
    <div className={"flex w-full"}>
      <SignupForm />
    </div>
  );
};

export default Page;
