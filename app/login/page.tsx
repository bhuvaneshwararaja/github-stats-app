import React from "react";
import LoginForm from "../components/loginForm";

const Login = () => {
  return (
    <div className="w-auto h-100 flex justify-center items-center">
      <div className="mockup-window border bg-base-300 w-5/12">
        <div className="flex flex-col justify-center items-center bg-base-200 h-96">
          <h1 className="font-semibold text-2xl font-mono">
            Welcome to Github stats
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
