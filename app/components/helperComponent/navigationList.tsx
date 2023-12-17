"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function NavigationList() {
  const router = useRouter();

  return (
    <ul className="flex w-48 justify-between">
      <Link href="/stats" className="text-white text-xl cursor-pointer">
       Stats
      </Link>
      <Link href="/repositories" className="text-white text-xl cursor-pointer">
        Repository
      </Link>
    </ul>
  );
}

export default NavigationList;
