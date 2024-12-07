//? --------- Default charts data --------- ?//
const monthMap = {
  Jan: 0,
  Fev: 1,
  Mar: 2,
  Abr: 3,
  Mai: 4,
  Jun: 5,
  Jul: 6,
  Ago: 7,
  Set: 8,
  Out: 9,
  Nov: 10,
  Dez: 11
};



//? --------- Custom filtering functions --------- ?//
function countDistinctDeviceNames(data) {
  const deviceNames = new Set(data.map(item => item.deviceName));
  return deviceNames.size;
}

function countByDeduplicationId(data) {
  return data.reduce((acc, item) => {
    acc[item.deduplicationId] = (acc[item.deduplicationId] || 0) + 1;
    return acc;
  }, {});
}

function countByDeviceName(data) {
  const counts = data.reduce((acc, item) => {
    acc[item.deviceName] = (acc[item.deviceName] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).map(deviceName => ({
    deviceName,
    count: counts[deviceName]
  }));
}

function avgByMonth(data, valueKey) {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.time]) {
      acc[item.time] = { time: item.time, [valueKey]: 0, count: 0 };
    }

    acc[item.time][valueKey] += item[valueKey];
    acc[item.time].count += 1;
    return acc;
  }, {});

  return Object
    .values(groupedData)
    .map(item => ({
      [`_avg_${valueKey}`]: Math.round(item[valueKey] / item.count),
      time: item.time
    }))
    .sort((a, b) => monthMap[a.time] - monthMap[b.time]);
}



//? --------- Export filtered data --------- ?//
// Common data
export function countDevices(data) { return countDistinctDeviceNames(data) };

export function countRows(data) { return countByDeduplicationId(data) };
export function countTotalRows(data) { return data.length };

// General data
export function generalCountByDeviceName(data)   { return countByDeviceName(data) };

export function generalAvgRainByMonth(data)  { return avgByMonth(data, 'emw_rain_lvl') };
export function generalAvgTempByMonth(data)  { return avgByMonth(data, 'emw_temperature') };
export function generalAvgHumidByMonth(data) { return avgByMonth(data, 'emw_humidity') };

// Secondary data
export function secondaryCountByDeviceName(data) { return countByDeviceName(data) };

export function secondaryAvgNoiseByMonth(data)   { return avgByMonth(data, 'noise') };
export function secondaryAvgVoltageByMonth(data) { return avgByMonth(data, 'voltage') };
export function secondaryAvgPMByMonth(data)      { return avgByMonth(data, 'pm2_5') };