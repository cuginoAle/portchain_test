import config from "./config";
import axios from "axios";

const _getVessels = () =>
  axios.get(config.vesselsEndPointUrl).then(result => result.data);

const _getSchedule = vesselImo =>
  axios.get(`${config.scheduleEndPointUrl}/${vesselImo}`).then(result => ({
    ...result.data.vessel,
    portCalls: result.data.portCalls
  }));

const _getVesselsWithSchedule = () => {
  console.log("fetching data!");
  return _getVessels().then(vessels => {
    return Promise.all(vessels.map(vessel => _getSchedule(vessel.imo)));
  });
};

const _fetchedData = _getVesselsWithSchedule();

const vesselsWithSchedule = () => {
  return _fetchedData;
};

export default vesselsWithSchedule;
