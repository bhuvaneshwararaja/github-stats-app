"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/navigation";

interface Props {
  username: string;
  setError:(error:string) => void
}

const LoginButton = ({ username,setError }: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const userContext: any = useContext(UserContext);
  const router = useRouter()

  const loginUser = async () => {

    setIsLoading(true);
    setError("")
    const getUserData = await fetch(`/api/user/${username}`);
    const userDataResult = await getUserData.json();
    if (userDataResult && getUserData.status === 200) {
      userContext.setUserData(userDataResult);
      router.push("/stats")
    }
    else if(getUserData.status === 404){
      setError("Enter valid github username");
    }

    await getStatsData(username)
    setIsLoading(false);
  };

  const getStatsData = async (username:string) => {
    const getStatsData = await fetch(`/api/user/stats/${username}`,{'cache':"no-store"})
    const statsDataResult = await getStatsData.json()
    userContext.setStatsData(statsDataResult)
   }

  return (
    <>
      {isLoading ? (
        <button className="btn w-40 btn-active mt-5 bg-green-300 text-white cursor-not-allowed hover:bg-green-300">
          <span className="loading loading-spinner"></span>
          Signing in..
        </button>
      ) : (
        <button
          className="btn w-40 btn-active mt-5 bg-indigo-500 text-white hover:bg-indigo-700"
          onClick={loginUser}
        >
          Login
        </button>
      )}
    </>
  );
};

export default LoginButton;
