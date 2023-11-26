import Image from "next/image";
import React from "react";

function NotFound() {
  return (
    <div className="w-100-per h-100 flex flex-col justify-center items-center">
       <Image src="/not-found.svg" priority alt="not found" width={500} height={100}></Image>
       <h1 className="text-4xl font-bold text-indigo-900 mt-8">
        PAGE NOT FOUND
      </h1>
      <p className="text-lg text-slate-500 mt-8">OOPS! The Page You Requested Was Not Found. </p>
    </div>
  );
}

export default NotFound;
