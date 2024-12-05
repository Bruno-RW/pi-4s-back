//? --------- Default data for the chart --------- ?//
const monthMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11
};



//? --------- Custom filtering functions --------- ?//
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
export function generalAvgRainByMonth(data)  { return avgByMonth(data, 'emw_rain_lvl') };
export function generalAvgTempByMonth(data)  { return avgByMonth(data, 'emw_temperature') };
export function generalAvgHumidByMonth(data) { return avgByMonth(data, 'emw_humidity') };

export function secondaryAvgNoiseByMonth(data)   { return avgByMonth(data, 'noise') };
export function secondaryAvgVoltageByMonth(data) { return avgByMonth(data, 'voltage') };
export function secondaryAvgPMByMonth(data)      { return avgByMonth(data, 'pm2_5') };