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
  const [loader,setLoader] = useState<Boolean>(false)

  useEffect(() => {
    if (userstatsData.statsData) {
      setLoader(true)
      const languageData = userstatsData.statsData["topRepoSize"];
      if (languageData) {
        let key = languageData.map((data: any) => data.repoName);
        let data = languageData.map((data: any) => data.repoSize);
        setStatsData(data);
        setStatsKey(key);
      }
      setLoader(false)

    }
  }, [userstatsData]);

  let options: any = {
    chart: {
      id: "basic-bar",
      foreColor: "#fff",
      height: 400,

    },
    stroke: {
     width: 0
   },
   dataLabels: {
     enabled: false
   },
   grid: {
     show: false,
   },
   xaxis: {
     categories: statsKey,
   },
   colors: ["#5CAC82"],
   fill: {
     type: "gradient",
     gradient: {
       gradientToColors: ["#7CA5F1"],
       shade: "dark",
       type: "vertical",
       shadeIntensity: 0.5,
       inverseColors: false,
       opacityFrom: 1,
       opacityTo: 0.8,
       stops: [0, 100]
     }
   },
   tooltip: {
     theme: "dark"
   }
  };

  return (
    <div>
      {statsData && !loader? (
        <>
          <div className="p-3 chart-card chart-box">
            <Chart
              options={options}
              series={[
                {
                  data: statsData,
                },
              ]}
              type="bar"
              width={"530px"}
            />
          </div>
        </>
      ) : <Loader/>}
    </div>
  );
}

export default TopSizedRepo;
