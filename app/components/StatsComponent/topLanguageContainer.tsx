import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context";
import Chart from "react-apexcharts";
import Loader from "../helperComponent/loader";

function TopLanguageContainer() {
  const userstatsData: any = useContext(UserContext);
  const [statsData, setStatsData] = useState(
    userstatsData.statsData["topLanguages"]
  );
  const [statsKey, setStatsKey] = useState<String[]>([]);
  const [loader, setLoader] = useState<Boolean>(false);
  useEffect(() => {
    setLoader(true);
    if (userstatsData.statsData) {
      const languageData = userstatsData.statsData["topLanguages"];
      setStatsData(languageData ? Object.values(languageData) : []);
      setStatsKey(languageData ? Object.keys(languageData) : []);
    }
    setLoader(false);
  }, [userstatsData]);

  let options: any = {
    chart: {
      id: "pie",
      foreColor: "#fff",
      type: "donut",
      height: 450,
    },
    labels: statsKey,
    grid: {
      show: false,
    },
    fill: {
      type: "pattern",
      opacity: 1,
      pattern: {
        enabled: true,
        style: "horizontalLines",
      },
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
  };

  return (
    <div>
      {statsData && !loader ? (
        <div className="p-3 chart-card chart-box">
          <Chart
            options={options}
            series={statsData}
            type="donut"
            width={"530px"}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default TopLanguageContainer;