import React from "react";
import LoginForm from "../components/loginForm";
import Image from "next/image";

const Login = () => {
  return (
    <div className="w-100 he-100 flex px-32 items-center justify-between">
      <div></div>
      <div className="flex flex-col justify-around">
        <h1 className="text-5xl font-bold text-white items-center">
          Welcome to Github Stats
        </h1>
        <p className="text-2xl text-slate-700 font-medium mt-3">
          Fork it, fix it, merge it
        </p>
        <LoginForm />
      </div>
      <div className="flex flex-col justify-around he-18">
        <Image
          src="/stats.svg"
          alt="home-human image"
          width={500}
          height={400}
        ></Image>
      </div>
    </div>
  );
};

export default Login;
