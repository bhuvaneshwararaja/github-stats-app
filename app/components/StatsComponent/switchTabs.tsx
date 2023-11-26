"use client";
import React from "react";
import StatsContainer from "../statsContainer";
import RepoList from "./repoList";

function SwitchTabs() {
  return (
    <>
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-bold text-md"
          aria-label="Github Stats"
          defaultChecked
          style={{width:"16rem"}}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <StatsContainer />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-bold text-md"
          aria-label="Repositories"
          style={{width:"12rem"}}

        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
           <RepoList/>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-bold text-md"
          aria-label="Recent Activities"
          style={{width:"16rem"}}

        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
         Yes To Implement
        </div>
      </div>
    </>
  );
}

export default SwitchTabs;
