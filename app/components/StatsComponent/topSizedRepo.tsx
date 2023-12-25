"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context";
import Chart from "react-apexcharts";
import Loader from "../helperComponent/loader";

function TopSizedRepo() {
  const userstatsData: any = useContext(UserContext);
  const [statsData, setStatsData] = useState(
    userstatsData.statsData["topRepoSize"]
  );
  const [statsKey, setStatsKey] = useState<String[]>([]);
  const [loader, setLoader] = useState<Boolean>(false);

  useEffect(() => {
    if (userstatsData.statsData) {
      setLoader(true);
      const languageData = userstatsData.statsData["topRepoSize"];
      if (languageData) {
        let key = languageData.map((data: any) => data.repoName);
        let data = languageData.map((data: any) => data.repoSize);
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
      text: "Top Sized Repositories",
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
    colors: ["#b7094c"],
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#0091ad"],
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
  };

  return (
    <div>
        <div className="p-3 chart-card chart-box">
          {statsData && !loader ? (
            <Chart
              options={options}
              series={[
                {
                  name:"Repo Size",
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

export default TopSizedRepo;
