"use client";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { UserContext } from "@/app/context";

function TopStarredContainer() {

 const userstatsData: any = useContext(UserContext);
 const [statsData, setStatsData] = useState(
   userstatsData.statsData["topStarredRepo"]
 );
 const [statsKey, setStatsKey] = useState<String[]>([]);

 useEffect(() => {
   if (userstatsData.statsData) {
     const languageData = userstatsData.statsData["topStarredRepo"];
     if(languageData){
      let key = languageData.map((data:any) => data.repoName)
      let data = languageData.map((data:any) => data.stargazers_count)
      setStatsData(data);
      setStatsKey(key);
     }

   }
 }, [userstatsData]);

 ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

 const options:any = {
  responsive: true,
  maintainAspectRation: true,

  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Top stared repo",
    },
  },
};

  const barGraphData = {
   labels: statsKey,
   datasets: [
    {
      label: "Most starred repo",
      data: statsData,
      backgroundColor: [
       "#01084f",
       "#391954",
       "#391954",
       "#a73c5a",
       "#ff7954"
     ],
    },
  ]
 };

 

  return (
    <div>
          {
           statsData ? <Bar height="300px" width="600px" options={options} data={barGraphData} /> : null
          }
    </div>
  );
}

export default TopStarredContainer;
