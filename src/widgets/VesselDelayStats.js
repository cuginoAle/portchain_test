import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getVesselDelaysMap, minutesToHours } from "helpers";
import LineChart from "components/LineChart";
import percentile from "percentile";

const ChartWrapper = styled.div`
  padding: 20px;
`;
const ChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${ChartWrapper} {
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    ${ChartWrapper} {
      width: 50%;
    }
  }

  @media screen and (min-width: 1000px) {
    ${ChartWrapper} {
      width: 33.3%;
    }
  }
`;
const Wrapper = styled.div``;

const VesselDelayStats = ({ className, vesselsWithStats }) => {
  const classes = ["VesselDelayStats"];
  const forecastedDaysBefore = [14, 7, 2];
  const percPoints = [5, 50, 80];

  if (className) classes.push(className);

  const vesselArray = Object.values(vesselsWithStats);

  const vesselsWithDelays = React.useMemo(
    () =>
      vesselArray.map(vessel => ({
        ...vessel,
        delays: vessel.portCalls.map(call =>
          getVesselDelaysMap(call.arrival, call.logEntries)
        )
      })),
    [vesselArray]
  );

  const vesselsWithMappedDelays = React.useMemo(() => {
    return vesselsWithDelays.map(vessel => {
      return {
        ...vessel,
        delays: vessel.delays.map(delayMap => {
          let forecastedDaysBeforeIndex = 0;
          const groupedDelayMap = new Map();

          delayMap.forEach((value, key) => {
            while (key < forecastedDaysBefore[forecastedDaysBeforeIndex]) {
              forecastedDaysBeforeIndex++;
            }

            forecastedDaysBeforeIndex < forecastedDaysBefore.length &&
              groupedDelayMap.set(
                forecastedDaysBefore[forecastedDaysBeforeIndex],
                value
              );
          });
          return groupedDelayMap;
        })
      };
    });
  }, [forecastedDaysBefore, vesselsWithDelays]);

  const dataToRender = React.useMemo(() => {
    return vesselsWithMappedDelays.map(vessel => {
      const vesselPercentiles = forecastedDaysBefore.map(day =>
        percentile(
          percPoints,
          vessel.delays.map(delay => delay.get(day)).filter(d => !!d)
        )
      );

      const lineChartData = {
        labels: percPoints.map(p => "P." + p),
        datasets: vesselPercentiles.map((value, index) => {
          return {
            label: `${forecastedDaysBefore[index]} days`,
            data: value.map(v => minutesToHours(v)),
            backgroundColor: "transparent",
            borderColor: `hsl(${(360 / 10) * index},60%, 50%)`,
            lineTension: 0.2
          };
        })
      };
      return (
        <ChartWrapper key={vessel.name}>
          <h3>{vessel.name}</h3>
          <LineChart data={lineChartData} height="300px" />
        </ChartWrapper>
      );
    });
  }, [forecastedDaysBefore, percPoints, vesselsWithMappedDelays]);

  return (
    <Wrapper className={classes.join(" ")}>
      <h2>Vessel delay percentiles (in hours):</h2>
      <ChartsContainer>{dataToRender}</ChartsContainer>
    </Wrapper>
  );
};

VesselDelayStats.displayName = "VesselDelayStats";

VesselDelayStats.propTypes = {
  className: PropTypes.string
};

VesselDelayStats.defaultProps = {
  className: null
};

export default VesselDelayStats;
