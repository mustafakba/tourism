import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tourism - Üye İşlemleri",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={
        "min-h-screen bg-gray-50  flex w-full gap-y-[20px] flex-col items-center md:justify-center"
      }
    >
      <div className={"flex w-full"}>{children}</div>
    </main>
  );
}
