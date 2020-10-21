import {
  formatHours,
  minutesToHours,
  memoizer,
  timeDiffInMinutes,
  timeDiffInDays,
  getVesselDelaysMap,
  getPortsWithStats,
  isInt
} from "helpers";

import { logs, vesselsWithData } from "../__test_data__/data";

describe("Helpers", () => {
  it("formats minutes to hours", () => {
    const res = formatHours(66);
    expect(res).toBe("1h:06m");
  });

  it("converts minutes to hours", () => {
    const res = minutesToHours(66);
    expect(res).toBe(1.1);
  });

  it("memoizes a function", () => {
    const fn = jest.fn();
    const memoizedFn = memoizer(fn);

    memoizedFn();
    expect(fn).toHaveBeenCalledTimes(1);

    memoizedFn();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("timeDiffInMinutes", () => {
    const a = new Date("2020-10-21T12:00:00.000Z");
    const b = new Date("2020-10-21T11:50:00.000Z");
    expect(timeDiffInMinutes(a, b)).toBe(10);
  });

  it("timeDiffInDays", () => {
    const a = new Date("2020-10-21T12:00:00.000Z");
    const b = new Date("2019-10-21T12:00:00.000Z");
    expect(timeDiffInDays(a, b)).toBe(366);
  });

  it("getVesselDelaysMap", () => {
    const arrival = "2020-10-21T13:00:00.000Z";
    const result = getVesselDelaysMap(arrival, logs);

    const expected = new Map([
      [20, 330],
      [11, 300],
      [6, 120],
      [3, 30],
      [2, 60]
    ]);
    expect(result).toStrictEqual(expected);
  });

  it("isInt", () => {
    expect(isInt(2.5)).toBeFalsy();
    expect(isInt(5)).toBeTruthy();
  });

  it("getPortsWithStats", () => {
    const result = getPortsWithStats(vesselsWithData);

    const portIds = Object.keys(result);
    const arrivalsCount = portIds.map(id => result[id].arrivals);
    const berths = portIds.map(id => result[id].berths);

    expect(portIds).toStrictEqual([
      "BEANR",
      "DEHAM",
      "MACAS",
      "GHTEM",
      "CIABJ",
      "MAPTM",
      "ITSAL",
      "ITCAG",
      "GRPIR",
      "EGALY",
      "EGDAM",
      "LBBEY",
      "HKHKG",
      "CNYTN",
      "USNYC",
      "SGSIN",
      "USORF",
      "USTSA",
      "USC84",
      "TWKHH",
      "VNVUT"
    ]);

    expect(arrivalsCount).toStrictEqual([
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      4,
      3,
      2,
      2,
      2,
      2,
      1
    ]);

    expect(berths).toStrictEqual([
      [1026],
      [762],
      [1506],
      [1869],
      [2802],
      [660],
      [1056],
      [1620],
      [1195],
      [1002],
      [875],
      [3420],
      [1140, 1140, 1140, 912, 1140, 1140],
      [1440, 2100, 1440, 1488, 1440, 1440],
      [2460, 2640, 3678, 1380, 2460, 1380, 1818, 2604, 1380],
      [1320, 1110, 1440, 1635, 1122, 1320, 1440, 1314],
      [1740, 2376, 1740, 1740, 2100, 1740],
      [961, 1710, 961, 961, 1512, 961],
      [900, 1428, 900, 900, 1386, 900],
      [840, 840, 846, 840, 840, 1092, 840],
      [2076]
    ]);
  });
});
