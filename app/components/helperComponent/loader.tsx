import React from "react";

function Loader() {
  return (
    <div className="chart-card flex flex-col">
      <span className="loading loading-bars loading-lg"></span>
      <h2 className="text-white mt-3">Loading stats ...</h2>
    </div>
  );
}

export default Loader;
