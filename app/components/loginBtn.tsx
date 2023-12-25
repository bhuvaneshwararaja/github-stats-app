"use client";

import React, { use, useContext, useEffect, useState } from "react";
import { GlobalContext, UserContext } from "../context";
import { useRouter } from "next/navigation";

interface Props {
  username: string;
  setError:(error:string) => void
}

const LoginButton = ({ username,setError }: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const userContext: any = useContext(UserContext);
  const globalContext: any = useContext(GlobalContext)
  const router = useRouter()

  const loginUser = async () => {

    if(username){
      setIsLoading(true);
      setError("")
      const getUserData = await fetch(`/api/user/${username}`);
      const userDataResult = await getUserData.json();
      if (userDataResult && getUserData.status === 200) {
        userContext.setUserData(userDataResult);
        // router.push("/stats")
        // userContext.setShowMenu(true)
        globalContext.setShowMenu(true)
      }
      else if(getUserData.status === 404){
        setError("Enter valid github username");
      }
  
      let statsData = await getStatsData(username)
      await getPRData(username,statsData)
      setIsLoading(false);
    }
    else{
      setError("Please enter github username");
    }

  };

  const getStatsData = async (username:string) => {
    const getStatsData = await fetch(`/api/user/stats/${username}`,{'cache':"no-store"})
    const statsDataResult = await getStatsData.json()
    userContext.setStatsData(statsDataResult)
   }

  const getPRData = async (username:string,statsData:any) => {
    const getStatsData = await fetch(`/api/user/stats/${username}/pullRequest`,{'cache':"no-store"})
    const PRDataResult = await getStatsData.json()
    userContext.setStatsData((prev:any) => {return {...prev,"PRStats":PRDataResult}})
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
          className="btn w-40 btn-active mt-5 bg-indigo-900 border-none text-white hover:bg-indigo-800"
          onClick={loginUser}
        >
          Login
        </button>
      )}
    </>
  );
};

export default LoginButton;
