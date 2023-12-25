"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context";
import Chart from "react-apexcharts";
import Loader from "../helperComponent/loader";

function TopStarredContainer() {
  const userstatsData: any = useContext(UserContext);
  const [statsData, setStatsData] = useState(
    userstatsData.statsData["topStarredRepo"]
  );
  const [statsKey, setStatsKey] = useState<String[]>([]);
  const [loader, setLoader] = useState<Boolean>(false);

  useEffect(() => {
    if (userstatsData.statsData) {
      setLoader(true);
      const languageData = userstatsData.statsData["topStarredRepo"];
      if (languageData) {
        let key = languageData.map((data: any) => data.repoName);
        let data = languageData.map((data: any) => data.stargazers_count);
        setStatsData(data);
        setStatsKey(key);
      }
      setLoader(false);
    }
  }, [userstatsData]);

  let options: any = {
    chart: {
      id: "basic-bar",
      foreColor: "#fff",
      height: 400,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Top Starred Repositories",
      align: "center",
      floating: true,
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "monospace",
        color: "#fff",
      },
    },
    stroke: {
      width: 0,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: statsKey,
    },
    colors: ["#006466"],
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#312244"],
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: "dark",
    },
    responsive: [
      {
        breakpoint: 1200,
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
  };

  return (
    <div>
      <div className="p-3 chart-card chart-box">
        {statsData && !loader ? (
          <Chart
            options={options}
            series={[
              {
                name:"Total stars",
                data: statsData,
              },
            ]}
            type="bar"
            width={"700px"}
            height={300}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default TopStarredContainer;
