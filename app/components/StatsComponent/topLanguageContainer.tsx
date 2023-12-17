import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context";
import Chart from "react-apexcharts";


function TopLanguageContainer() {
  const userstatsData: any = useContext(UserContext);
  const [statsData, setStatsData] = useState(
    userstatsData.statsData["topLanguages"]
  );
  const [statsKey, setStatsKey] = useState<String[]>([]);

  useEffect(() => {
    if (userstatsData.statsData) {
      const languageData = userstatsData.statsData["topLanguages"];
      setStatsData(languageData ? Object.values(languageData) : []);
      setStatsKey(languageData ? Object.keys(languageData) : []);
    }
  }, [userstatsData]);



  let options: any = {
    chart: {
      id: "pie",
      foreColor: "#fff",
      type:"donut",
      height: 430,

    },
      labels: statsKey,
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

  };

  return (
    <div>
      {statsData ? (
        <div className="p-3 chart-card">
            <Chart
              options={options}
              series={statsData}
              type="donut"
              width={"600px"}
            />
          </div>
      ) : null}
    </div>
  );
}

export default TopLanguageContainer;
