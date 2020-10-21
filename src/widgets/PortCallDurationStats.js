import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import percentile from "percentile";
import LineChart from "components/LineChart";
import { minutesToHours } from "helpers";
import { formatHours } from "../helpers";

const percPoints = [5, 20, 50, 90];

const ChartWrapper = styled.div`
  > h3 {
    margin-bottom: 1em;
  }
  .contentWrapper {
    display: flex;
    flex-wrap: wrap;
  }
`;
const PortWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  margin-bottom: 5px;
  margin-right: 5px;
  padding-bottom: 10px;

  min-width: 120px;

  .percentile {
    padding: 0 10px;
  }

  .portName {
    font-weight: 300;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.05);
  }
  small {
    font-size: 0.7em;
    width: 2em;
    display: inline-block;
  }

  .result {
    font-weight: bold;
  }
`;

const Wrapper = styled.div`
  > h2 {
    padding-bottom: 0.5em;
    border-bottom: 5px solid rgba(0, 0, 0, 0.05);
  }

  ${ChartWrapper} {
    padding: 40px;
  }
`;

const PortCallDurationStats = ({ portsWithStats }) => {
  const portsArray = Object.values(portsWithStats);

  const portsOrderedByName = React.useMemo(() => {
    return portsArray.sort((a, b) => (a.name < b.name ? -1 : 1));
  }, [portsArray]);

  const portPercentiles = React.useMemo(
    () =>
      portsOrderedByName.map(port => ({
        ...port,
        percentiles: percentile(percPoints, port.berths)
      })),
    [portsOrderedByName]
  );

  const lineChartData = {
    labels: percPoints.map(p => "P." + p),
    datasets: [...portPercentiles]
      .sort((a, b) => Math.max(...b.percentiles) - Math.max(...a.percentiles))
      .slice(0, 10)
      .map((port, index) => {
        return {
          label: port.name,
          data: port.percentiles.map(perc => {
            return minutesToHours(perc);
            // return perc;
          }),
          backgroundColor: "transparent",
          borderColor: `hsl(${(360 / 10) * index},60%, 50%)`,
          lineTension: 0.2
        };
      })
  };

  return (
    <Wrapper>
      <h2>Port call percentiles:</h2>

      <ChartWrapper>
        <h3>Top 10 by port-call length (in hours):</h3>
        <LineChart data={lineChartData} />
      </ChartWrapper>

      <ChartWrapper>
        <h3>Ports:</h3>
        <div className="contentWrapper">
          {portPercentiles.map(port => (
            <PortWrapper key={port.id}>
              <div className="portName">{port.name}</div>
              {port.percentiles.map((result, index) => (
                <p key={index} className="percentile">
                  P<small>{percPoints[index]}:</small>
                  <span className="result">{formatHours(result)}</span>
                </p>
              ))}
            </PortWrapper>
          ))}
        </div>
      </ChartWrapper>
    </Wrapper>
  );
};

PortCallDurationStats.displayName = "PortCallDurationStats";

PortCallDurationStats.propTypes = {
  portsWithStats: PropTypes.shape({})
};
export default PortCallDurationStats;
