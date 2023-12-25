"use client";
import React, { useState } from "react";
import { GlobalContext, UserContext } from "../context";

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <GlobalContext.Provider
        value={{
          showMenu,
          setShowMenu
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
}

export default GlobalContextProvider;
