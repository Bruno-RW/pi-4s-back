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

export function avgRainLvlByMonth(data) {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.time]) {
      acc[item.time] = { time: item.time, emw_rain_lvl: 0, count: 0 };
    }

    acc[item.time].emw_rain_lvl += item.emw_rain_lvl;
    acc[item.time].count += 1;
    return acc;
  }, {});

  return Object
    .values(groupedData)
    .map(item => ({
      _avg_emw_rain_lvl: Math.round(item.emw_rain_lvl / item.count),
      time: item.time
    }))
    .sort((a, b) => monthMap[a.time] - monthMap[b.time]);
}