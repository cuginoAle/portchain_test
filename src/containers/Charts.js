import React from "react";
import getVesselsWithSchedule from "api/portchain";
import { getPortsWithStats } from "helpers";
import Top5PortsChart from "widgets/Top5PortsChart";
import PortCallDurationStats from "widgets/PortCallDurationStats";
import VesselDelayStats from "widgets/VesselDelayStats";

function Chart() {
  const [portsWithStats, setPortsWithStats] = React.useState({});
  const [vesselsWithStats, setVesselsWithStats] = React.useState({});

  React.useEffect(() => {
    getVesselsWithSchedule().then(data => {
      setVesselsWithStats(data);
      setPortsWithStats(getPortsWithStats(data));
    });
  }, []);

  return (
    <>
      <Top5PortsChart portsWithStats={portsWithStats} />
      <PortCallDurationStats portsWithStats={portsWithStats} />
      <VesselDelayStats vesselsWithStats={vesselsWithStats} />
    </>
  );
}

export default Chart;
