import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { 
  avgRainLvlByMonth, 
  avgTempByMonth,
  avgHumidByMonth
} from "@/lib/charts/chartData";

import Chart from "@/components/charts/Chart";

const HomePage = async() => {
  // const data = await db.nit2xli.findMany();
  const data = await db.nit2xli.findMany({ take: 100 });

  const formattedData = data.map(item => ({
    ...item,
    time: formatDateTime(item.time, false, { month: "short" })
  }));

  const avgRainLvl = avgRainLvlByMonth(formattedData);
  const avgTemp = avgTempByMonth(formattedData);
  const avgHumidity = avgHumidByMonth(formattedData);

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
          chartType="column"
          data={avgTemp}
          xColumn="time"
          yColumn="_avg_emw_temperature"
        />

        <Chart 
          cardTitle="Humidity"
          cardDescription="Average humidity by month (g/m³)"
          chartType="column"
          data={avgHumidity}
          xColumn="time"
          yColumn="_avg_emw_humidity"
        />
      </div>
    </div>
  );
};

export default HomePage;