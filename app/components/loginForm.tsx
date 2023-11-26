"use client";
import React, { useState } from "react";
import LoginButton from "./loginBtn";

function LoginForm() {

  const [username, setUsername] = useState("");
  const [error,setError] = useState("")

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {
        error ? <p className="text-md text-red-500 mt-5">{error}</p> : null
      }
      <input
        type="text"
        placeholder="Enter Github username"
        className="input input-bordered w-full max-w-xs mt-5"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
      />
      <LoginButton username={username} setError={setError} />
    </div>
  );
}

export default LoginForm;
