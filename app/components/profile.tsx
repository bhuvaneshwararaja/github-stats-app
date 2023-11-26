/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context";

const Profile = () => {
  const userInfo: any = useContext(UserContext);

  return (
    <aside className="h-100 w-64 flex">
      <div className="w-64 h-72 bg-slate-100 shadow-xl rounded-md flex flex-col items-center py-5 justify-around">
        <div className="avatar online">
          <div className="w-24 rounded-full ring ring-indigo-400 ring-offset-indigo-400 ring-offset-2 shadow-lg">
            <img
              src={userInfo.userData.avatar_url}
              alt="profile-img"
            />
          </div>
        </div>
        <h3 className="font-mono font-bold text-md">{userInfo.userData.name}</h3>
        <h3 className="font-mono font-bold">@{userInfo.userData.login}</h3>
        <p className="text-center text-sm">
        {userInfo.userData.bio || "No bio"}
        </p>
      </div>

    </aside>
  );
};

export default Profile;
