/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { generateYear } from "@/app/helper/commonHelper";
import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

function GithubContributionCalendar({
  yearRange: { startDate, endDate, name },
}: any) {
  const [yearList, setYearList] = useState<Array<number>>([]);
  const [year, setYear] = useState<number>(new Date(endDate).getFullYear());

  useEffect(() => {
    setYearList(generateYear(startDate, endDate));
  }, []);

  return (
    <>
      {yearList.length ? (
        <div className="relative">
          <div
            className="rounded-md shadow-md py-10 w-full absolute  chart-box"

          >
            <div className="flex flex-col  w-full  justify-center items-center p-3">
              <GitHubCalendar
                username={name}
                colorScheme="light"
                year={year}
                fontSize={18}
                blockMargin={10}
              />
              <div className=" overflow-y-scroll">
                <ul className="menu rounded-box ml-2 flex-row">
                  {yearList.map((currentYear: number) => (
                    <li
                      key={currentYear}
                      className={
                        currentYear === year ? "bg-gray-100 rounded-md" : ""
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setYear(currentYear);
                      }}
                    >
                      <a className="font-semibold">{currentYear}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default GithubContributionCalendar;
