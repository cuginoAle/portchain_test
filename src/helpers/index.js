import moment from "moment";

export const getPortsWithStats = memoizer(vesselsWithSchedule =>
  vesselsWithSchedule.reduce((portStatsAccumulator, currVessel) => {
    // identifying what port each vessel arrived
    const vesselPortStats = currVessel.portCalls.reduce(
      (accumulator, currCall) => {
        // calculating the stats
        const berth = timeDiffInMinutes(currCall.departure, currCall.arrival);
        const increment = currCall.isOmitted ? 0 : 1;
        accumulator[currCall.port.id] = accumulator[currCall.port.id]
          ? {
              ...accumulator[currCall.port.id],
              arrivals: accumulator[currCall.port.id].arrivals + increment,
              berths: [...accumulator[currCall.port.id].berths, berth]
            }
          : {
              ...currCall.port,
              arrivals: increment,
              berths: [berth]
            };
        return accumulator;
      },
      {}
    );

    // grouping together each vessel stat and adding them to the respective port
    Object.keys(vesselPortStats).forEach(portStatId => {
      portStatsAccumulator[portStatId] = portStatsAccumulator[portStatId]
        ? {
            ...portStatsAccumulator[portStatId],
            arrivals:
              portStatsAccumulator[portStatId].arrivals +
              vesselPortStats[portStatId].arrivals,
            berths: [
              ...portStatsAccumulator[portStatId].berths,
              ...vesselPortStats[portStatId].berths
            ]
          }
        : {
            ...vesselPortStats[portStatId],
            arrivals: vesselPortStats[portStatId].arrivals,
            berths: [...vesselPortStats[portStatId].berths]
          };
    });

    return portStatsAccumulator;
  }, {})
);

export function memoizer(fun) {
  let cache = new Map();
  return function(n) {
    if (cache.has(n)) {
      return cache.get(n);
    } else {
      let result = fun(n);
      cache.set(n, result);
      return result;
    }
  };
}

export function timeDiffInMinutes(a, b) {
  return moment(a).diff(moment(b), "minutes");
}

export function timeDiffInDays(a, b) {
  return moment(a).diff(moment(b), "days");
}

export function minutesToHours(minutes) {
  const mod = minutes % 60;
  return Math.floor(minutes / 60) + mod / 60;
}

export function formatHours(minutes) {
  return (
    Math.floor(minutes / 60) + "h:" + ("0" + (minutes % 60)).slice(-2) + "m"
  );
}

export function isInt(value) {
  return value === parseInt(value);
}

export function getVesselDelaysMap(arrival, logs) {
  const delayMap = new Map();
  const arrivalsLogs = logs
    .filter(log => !!log.arrival)
    .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));

  arrivalsLogs.forEach(log => {
    const forecastedInDays = Math.abs(timeDiffInDays(log.createdDate, arrival));
    const delayInMinutes = Math.abs(timeDiffInMinutes(arrival, log.arrival));

    delayMap.set(forecastedInDays, delayInMinutes);
  });

  return delayMap;
}
