"use client";

import Image from "next/image";

export default function LoadingSpinnerLight({ size }: any) {
  return (
    <div>
      <Image
        src={"/images/svgs/loading-spinner-light.svg"}
        alt={"loading"}
        height={size ?? 100}
        width={size ?? 100}
        objectFit={"contain"}
      />
    </div>
  );
}
