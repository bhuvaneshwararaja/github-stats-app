import SwitchTabs from "../components/StatsComponent/switchTabs";
import TopStarredContainer from "../components/StatsComponent/topStarredContainer";
import StatsContainer from "../components/statsContainer";

function Stats() {
  return (
    <div className="w-full px-3 overflow-y-scroll" style={{ height: "100vh" }}>
      <StatsContainer/>
    {/* <SwitchTabs /> */}
    </div>
  );
}

export default Stats;
