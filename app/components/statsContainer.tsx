"use client";
import { UserContext } from "../context";
import React, { useContext, useEffect, useId } from "react";
import StatsChips from "./StatsComponent/statsChips";
import GithubContributionCalendar from "./StatsComponent/githubContributionCalendar";
import TopLanguageContainer from "./StatsComponent/topLanguageContainer";
import TopStarredContainer from "./StatsComponent/topStarredContainer";
import { useRouter } from "next/navigation";
import PullRequestStats from "./StatsComponent/pullRequestStats";
import TopSizedRepo from "./StatsComponent/topSizedRepo";

function StatsContainer() {
  const userInfo: any = useContext(UserContext);
  const {
    followers,
    following,
    public_repos,
    created_at,
    updated_at,
    login,
    public_gists,
  } = userInfo.userData;
  const router = useRouter();
  useEffect(() => {
    if (login) {
      getStatsData();
    } else {
      router.push("/");
    }
  }, []);

  const getStatsData = async () => {
    const getStatsData = await fetch(`/api/user/stats/${login}`, {
      cache: "no-store",
    });
    const statsDataResult = await getStatsData.json();
    userInfo.setStatsData(statsDataResult);
  };

  return (
    <>
      <div className="flex flex-col p-5">
        <div className="flex justify-between mt-10">
          <TopLanguageContainer />
          <TopSizedRepo />
          <TopStarredContainer />
        </div>
        <div className="mt-5">
          <StatsChips
            statsData={{
              followers: followers,
              following: following,
              totalRepos: public_repos,
              gists: public_gists,
            }}
          />
        </div>

        <div className="mt-5">
          <PullRequestStats />
        </div>

        <div className="mt-5">
          <GithubContributionCalendar
            yearRange={{
              startDate: created_at,
              endDate: updated_at,
              name: login,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default StatsContainer;
