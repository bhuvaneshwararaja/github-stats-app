"use client";
import React, { useState } from "react";
import LoginButton from "./loginBtn";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex w-full flex-col">
      {error ? <p className="text-md text-red-500 mt-5">{error}</p> : null}
      <div className="flex">
        <input
          type="text"
          placeholder="Enter Github username"
          className="input input-bordered w-full max-w-xs mt-5"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
        />
        <div className="ml-3">
          <LoginButton username={username} setError={setError} />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
