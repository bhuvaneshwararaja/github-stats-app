"use client";
import React, { useState } from "react";

function NavigationList(props: any) {
  const [showStatsMenu, setShowStatsMenu] = useState(false);
  const [showRepoMenu, setShowRepoMenu] = useState(true);

  return (
    <ul className="flex justify-between mr-2">
      {showStatsMenu ? (
        <li
          className="text-white text-xl cursor-pointer font-mono"
          onClick={() => {
            props.scrollView(props.statsView);
            setShowRepoMenu(true);
            setShowStatsMenu(false);
          }}
        >
          Stats
        </li>
      ) : null}
      {showRepoMenu ? (
        <li
          className="text-white text-xl cursor-pointer font-mono"
          onClick={() => {
            props.scrollView(props.repoView);
            setShowRepoMenu(false);
            setShowStatsMenu(true);
          }}
        >
          Repository
        </li>
      ) : null}
    </ul>
  );
}

export default NavigationList;
