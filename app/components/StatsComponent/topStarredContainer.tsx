"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context";
import Chart from "react-apexcharts";

function TopStarredContainer() {
  const userstatsData: any = useContext(UserContext);
  const [statsData, setStatsData] = useState(
    userstatsData.statsData["topStarredRepo"]
  );
  const [statsKey, setStatsKey] = useState<String[]>([]);

  useEffect(() => {
    if (userstatsData.statsData) {
      const languageData = userstatsData.statsData["topStarredRepo"];
      if (languageData) {
        let key = languageData.map((data: any) => data.repoName);
        let data = languageData.map((data: any) => data.stargazers_count);
        setStatsData(data);
        setStatsKey(key);
      }
    }
  }, [userstatsData]);

  let options: any = {
    chart: {
      id: "basic-bar",
      fontColor: "#fff",
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
              horizontal: false
            }
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0.9,
        stops: [0, 40, 90],
        colorStops:          [
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
      },
    },
  };

  return (
    <div>
      {statsData ? (
        <>
          <div className="p-3 chart-card">
            <Chart
              options={options}
              series={[
                {
                  data: statsData,
                },
              ]}
              type="bar"
              width={"600px"}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default TopStarredContainer;
