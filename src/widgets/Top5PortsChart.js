import React from "react";
import PropTypes from "prop-types";
import BarChart from "components/BarChart";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 60px;
  > * {
    width: 100%;
    margin-bottom: 20px;
  }

  @media screen and (min-width: 600px) {
    > * {
      width: calc(50% - 10px);
    }
  }
`;
const ChartWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.02);
  padding: 40px;
`;

const Top5Ports = ({ portsWithStats }) => {
  const portsOrderedByArrivals = React.useMemo(() => {
    const portsArray = Object.keys(portsWithStats).map(
      key => portsWithStats[key]
    );
    return portsArray.sort((a, b) => b.arrivals - a.arrivals);
  }, [portsWithStats]);

  const mappedPorts = portsOrderedByArrivals.map(port => ({
    id: port.id,
    label: port.name,
    value: port.arrivals
  }));

  const top5 = mappedPorts.slice(0, 5);
  const bottom5 = mappedPorts.slice(-5);
  const max = top5[0]?.value;

  return (
    <Wrapper>
      <ChartWrapper>
        <BarChart max={max} dataRows={top5} title="Top 5 ports:" />
      </ChartWrapper>

      <ChartWrapper>
        <BarChart max={max} dataRows={bottom5} title="Bottom 5 ports:" />
      </ChartWrapper>
    </Wrapper>
  );
};

Top5Ports.displayName = "Top5Ports";

Top5Ports.propTypes = {
  portsWithStats: PropTypes.shape({})
};

export default Top5Ports;
