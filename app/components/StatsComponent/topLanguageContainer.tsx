"use client";
import React, { useContext, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { UserContext } from "@/app/context";

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

  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    maintainAspectRation: true,
    plugins: {
      title: {
        display: true,
        text: "Top Languages",
      },
    },
  };
  const pieChartData = {
    labels: statsKey,
    datasets: [
      {
        label: "Most used language",
        data: statsData,
        backgroundColor: [
          "#0457ac",
          "#308fac",
          "#37bd79",
          "#a7e237",
          "#f4e604"
        ],
        borderColor: [
         "#0457ac",
         "#308fac",
         "#37bd79",
         "#a7e237",
         "#f4e604"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {statsData ? (
        <Pie
          height="300px"
          width="600px"
          data={pieChartData}
          options={options}
        />
      ) : null}
    </div>
  );
}

export default TopLanguageContainer;
