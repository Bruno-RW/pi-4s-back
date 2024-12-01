import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { avgRainLvlByMonth } from "@/lib/chartData";

import Chart from "@/components/charts/Chart";

const HomePage = async() => {
  const data = await db.nit2xli.findMany({take: 100 });

  const formattedData = data.map(item => ({
    ...item,
    time: formatDateTime(item.time, false, { month: "short" })
  }));

  const avgRainLvl = avgRainLvlByMonth(formattedData);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Chart 
          cardTitle="Rain Level"
          cardDescription="Average rain level by month (mm)"
          chartType="column"
          data={avgRainLvl}
          xColumn="time"
          yColumn="_avg_emw_rain_lvl"
        />

        <Chart 
          cardTitle="Temperature"
          cardDescription="Average temperature by month (ºC)"
          chartType="bar"
          data={avgRainLvl}
          xColumn="time"
          yColumn="_avg_emw_rain_lvl"
        />

        {/* <Chart 
          cardTitle="Humidity"
          chartType="bar"
          xColumn="time"
          yColumn="emw_avg_wind_speed"
        /> */}
      </div>
    </div>
  );
};

export default HomePage;