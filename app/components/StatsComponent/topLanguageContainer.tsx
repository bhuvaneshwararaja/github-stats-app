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
    if (userstatsData.statsData) {
      setLoader(true);
      const languageData = userstatsData.statsData["topLanguages"];
      setStatsData(languageData ? Object.values(languageData) : []);
      setStatsKey(languageData ? Object.keys(languageData) : []);
      setLoader(false);
    }
  }, [userstatsData]);

  let options: any = {
    chart: {
      id: "pie",
      foreColor: "#fff",
      type: "donut",
      height: 450,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Most used Languages",
      align: "center",
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "monospace",
        color: "#fff",
      },
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
  };

  return (
    <div>
      <div className="p-3 chart-card chart-box">
        {statsData && !loader ? (
          <Chart
            options={options}
            series={statsData}
            type="donut"
            width={"530px"}
            height={350}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default TopLanguageContainer;
