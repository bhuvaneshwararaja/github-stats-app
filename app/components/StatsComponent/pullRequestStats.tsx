"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/app/context";
import Chart from "react-apexcharts";

function PullRequestStats() {
  const userstatsData: any = useContext(UserContext);
  const [statsData, setStatsData] = useState(
    userstatsData.statsData["PRStats"]
  );
  const [statsKey, setStatsKey] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDataToShow, setTotalDataToShow] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userstatsData.statsData.PRStats) {
      paginatePRs();
      console.log(
        Math.round(
          userstatsData.statsData["PRStats"]["openPRs"].length / totalDataToShow
        )
      );
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
    const PRData = userstatsData.statsData["PRStats"];

    if (PRData) {
      const startIndex = (currentPage - 1) * totalDataToShow;
      const endIndex = startIndex + totalDataToShow;

      setStatsData([
        {
          name:"openPR",
          data: PRData["openPRs"].slice(startIndex, endIndex),
        },
        {
         name:"closedPR",
          data: PRData["closedPRs"].slice(startIndex, endIndex),
        },
        {
         name:"mergedPR",
          data: PRData["mergedPRs"].slice(startIndex, endIndex),
        },
      ]);
      setStatsKey(PRData.repoName.slice(startIndex, endIndex));
    }
  };

  let options: any = {
    chart: {
      type: "bar",
      height: 430,
      foreColor: "#fff",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'last',
        columnWidth: '70%',
        barHeight: '70%',
        dataLabels: {
          position: "top",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
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
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0.9,
        stops: [0, 40, 90],
        colorStops: [
          [
            {
              offset: 30,
              color: "#FDC830",
              opacity: 10,
            },
            {
              offset: 100,
              color: "#F37335",
              opacity: 50,
            },
          ],
          [
           {
             offset: 30,
             color: "#a8ff78",
             opacity: 10,
           },
           {
             offset: 100,
             color: "#78ffd6",
             opacity: 50,
           },
         ],
         [
          {
            offset: 30,
            color: "#bc4e9c",
            opacity: 10,
          },
          {
            offset: 100,
            color: "#f80759",
            opacity: 50,
          },
        ],
        ],
      },
    },
  };

  return (
    <div>
      {statsData ? (
        <>
          <div className="p-3 w-full flex flex-col">
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
      ) : null}
    </div>
  );
}

export default PullRequestStats;
