import React from "react";

function Loading() {
  return (
    <div className="w-100-per h-100 flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">
        People don’t care about what you say, they care about what you build !!
      </h1>
      <span className="loading loading-dots loading-lg mt-5"></span>
    </div>
  );
}

export default Loading;
