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
import Profile from "./profile";

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
      console.log(true);
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
      {userInfo.userData ? (
        <div className="flex flex-col p-5">
          <div className="he-90 flex flex-col mt-5">
            <div className="mt-10 grid grid-cols-2 gap-6 ">
              <div className="grid grid-cols-1 gap-3">
                <Profile />
                <StatsChips
                  statsData={{
                    followers: followers,
                    following: following,
                    totalRepos: public_repos,
                    gists: public_gists,
                  }}
                />
              </div>
              <TopStarredContainer />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <TopLanguageContainer />
              <TopSizedRepo />
            </div>
          </div>
          <div className="he-90 flex-flex-col mt-5">
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
        </div>
      ) : null}
    </>
  );
}

export default StatsContainer;
