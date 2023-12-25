/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context";

const Profile = () => {
  const userInfo: any = useContext(UserContext);

  return (
    <div className="h-100 flex w-full">
      <div
        className="w-full shadow-xl rounded-md flex items-center py-5 justify-center"
        style={{ background: "#1b1d27", color: "#fff" }}
      >
        <div className="avatar online">
          <div className="w-24 rounded-full ring ring-indigo-900 ring-offset-indigo-400 ring-offset-2 shadow-lg">
            <img src={userInfo.userData.avatar_url} alt="profile-img" />
          </div>
        </div>
        <div
          className="flex flex-col justify-between ml-10"
          style={{ height: "100px" }}
        >
          <h3 className="font-mono font-bold text-md mt-5">
            {userInfo.userData.name}
          </h3>
          <h3 className="font-mono font-bold">@{userInfo.userData.login}</h3>
          <p className="text-center text-sm">
            {userInfo.userData.bio || "No bio"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
