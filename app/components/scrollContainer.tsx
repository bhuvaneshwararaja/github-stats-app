"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Login from "../login/page";
import NavigationList from "./helperComponent/navigationList";
import Image from "next/image";
import StatsContainer from "./statsContainer";
import { GlobalContext, UserContext } from "../context";
import Repositories from "../repositories/page";
import { RiLogoutCircleRLine } from "react-icons/ri";

function ScrollContainer() {
  const userInfo: any = useContext(UserContext);
  const globalContext: any = useContext(GlobalContext);

  const [showMenu, setShowMenu] = useState(false);
  const [hideLogin, setHideLogin] = useState(false);

  const statsView = useRef(null);
  const repoView = useRef(null);
  const loginView = useRef(null);

  const scrollIntoView = (elementRef: any) => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (userInfo?.userData?.login) {
      scrollIntoView(statsView);
      setTimeout(() => {
        setHideLogin(true);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalContext]);

  return (
    <div className="wrapper">
      <div
        className=" z-10 w-full p-2 flex justify-between fixed"
        style={{ backgroundColor: "#0a0c11" }}
      >
        <Image src="/logo.png" width={50} height={50} alt="logo"></Image>
        {globalContext.showMenu ? (
          <div className="flex items-center justify-center">
            <NavigationList
              scrollView={scrollIntoView}
              statsView={statsView}
              repoView={repoView}
            />
            <RiLogoutCircleRLine
              className="text-white w-7 h-7 cursor-pointer"
              onClick={() => {
                globalContext.setShowMenu(false);
                setHideLogin(false);
                userInfo.setUserData([]);
                userInfo.setStatsData([]);
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col">
        {!hideLogin ? (
          <div
            className="w-full overflow-hidden"
            style={{ height: "100vh" }}
            ref={loginView}
          >
            <Login setShowMenu={setShowMenu} />
          </div>
        ) : null}
        {userInfo?.userData?.login ? (
          <div className="flex flex-col">
            <div className="w-full" style={{ height: "auto" }} ref={statsView}>
              <StatsContainer />
            </div>
            <div className="w-full" style={{ height: "100vh" }} ref={repoView}>
              <Repositories />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ScrollContainer;
