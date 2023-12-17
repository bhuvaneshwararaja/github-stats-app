"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/app/context";
import Chart from "react-apexcharts";
import Loader from "../helperComponent/loader";

function PullRequestStats() {
  const userstatsData: any = useContext(UserContext);
  const [statsData, setStatsData] = useState(
    userstatsData.statsData["PRStats"]
  );
  const [statsKey, setStatsKey] = useState([]);
  const [loader, setLoader] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDataToShow, setTotalDataToShow] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userstatsData.statsData.PRStats) {
      paginatePRs();

      setTotalPages(
        Math.round(
          userstatsData.statsData["PRStats"]["openPRs"].length / totalDataToShow
        )
      );
    }
  }, [userstatsData]);

  useEffect(() => {
    paginatePRs();
  }, [currentPage]);

  const paginatePRs = () => {
    setLoader(true);
    const PRData = userstatsData.statsData["PRStats"];

    if (PRData) {
      const startIndex = (currentPage - 1) * totalDataToShow;
      const endIndex = startIndex + totalDataToShow;

      setStatsData([
        {
          name: "openPR",
          data: PRData["openPRs"].slice(startIndex, endIndex),
        },
        {
          name: "closedPR",
          data: PRData["closedPRs"].slice(startIndex, endIndex),
        },
        {
          name: "mergedPR",
          data: PRData["mergedPRs"].slice(startIndex, endIndex),
        },
      ]);
      setStatsKey(PRData.repoName.slice(startIndex, endIndex));
    }
    setLoader(false);
  };

  let options: any = {
    chart: {
      type: "bar",
      height: 430,
      foreColor: "#fff",
      toolbar: {
        show: false,
      },
    },
    forecastDataPoints: {
      count: 0,
      fillOpacity: 0.5,
      strokeWidth: undefined,
      dashArray: 4,
    },
    stroke: {
      colors: ["transparent"],
      width: 5,
    },
    plotOptions: {
      bar: {
        columnWidth: "100%",
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
    },
    xaxis: {
      categories: statsKey,
    },
    grid: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 300,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#FCCF31", "#17ead9", "#f02fc2"],
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#F55555", "#6078ea", "#6094ea"],
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div>
      {statsData && !loader ? (
        <>
          <div className="p-3 w-full flex flex-col chart-box">
            <Chart
              options={options}
              series={statsData}
              type="bar"
              width={"100%"}
              height={500}
            />
            {totalPages > 1 ? (
              <div className="flex justify-center mt-8">
                <div className="join">
                  {new Array(totalPages).fill(0).map((pageIndex, index) => {
                    return (
                      <input
                        ref={inputRef}
                        className={`join-item btn btn-square`}
                        type="radio"
                        name="options"
                        aria-label={(index + 1).toString()}
                        style={
                          currentPage === index + 1
                            ? { background: "#333", border: "none" }
                            : {}
                        }
                        defaultChecked={currentPage === index + 1}
                        onInput={(e) => {
                          setCurrentPage(index + 1);
                        }}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default PullRequestStats;
