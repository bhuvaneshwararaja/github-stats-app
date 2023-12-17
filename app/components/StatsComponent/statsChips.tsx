"use client";
import React from "react";

function StatsChips({
  statsData: { followers, following, totalRepos, gists },
}: any) {
  return (
    <div className="w-full grid grid-cols-4 gap-5">
      <div className="stats stats-vertical shadow  ">
        <div className="stat place-items-center">
          <div className="stat-figure text-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-black">Followers</div>
          <div className="stat-value text-black">{followers}</div>
        </div>
      </div>
      <div className="stats stats-horizontal shadow  ">
        <div className="stat place-items-center">
          <div className="stat-figure text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-black">Following</div>
          <div className="stat-value text-black">{following}</div>
        </div>
      </div>
      <div className="stats stats-horizontal shadow  ">
        <div className="stat place-items-center">
          <div className="stat-figure text-purple-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-black">Total Repo</div>
          <div className="stat-value text-black">{totalRepos}</div>
        </div>
      </div>
      <div className="stats stats-horizontal shadow  ">
        <div className="stat place-items-center">
          <div className="stat-figure text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-black">Public Gists</div>
          <div className="stat-value text-black">{gists}</div>
        </div>
      </div>
    </div>
  );
}

export default StatsChips;
