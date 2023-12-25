"use client";
import React, { useState } from "react";
import { UserContext } from "../context";

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState([]);
  const [statsData, setStatsData] = useState([]);

  return (
    <>
      <UserContext.Provider
        value={{
          userData,
          setUserData,
          statsData,
          setStatsData,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}

export default UserContextProvider;
