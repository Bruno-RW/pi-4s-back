import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { 
  generalAvgRainByMonth, 
  generalAvgTempByMonth,
  generalAvgHumidByMonth,

  secondaryAvgNoiseByMonth,
  secondaryAvgVoltageByMonth,
  secondaryAvgPMByMonth
} from "@/lib/charts/chartData";

import Chart from "@/components/charts/Chart";
import Heading from "@/components/ui/custom/Heading";
import Separator from "@/components/ui/custom/Separator";

const HomePage = async() => {
  //? ------ General data from the nit2xli table ------ ?//
  const generalData = await db.nit2xli.findMany({take: 100});

  const generalFormattedData = generalData.map(item => ({
    ...item,
    time: formatDateTime(item.time, false, { month: "short" })
  }));

  const generalAvgRain = generalAvgRainByMonth(generalFormattedData);
  const generalAvgTemp = generalAvgTempByMonth(generalFormattedData);
  const generalAvgHumidity = generalAvgHumidByMonth(generalFormattedData);

  
  //? ------ Secondary data from the k72623_lo table ------ ?//
  const secondaryData = await db.k72623_lo.findMany({take: 100});

  const secondaryFormattedData = secondaryData.map(item => ({
    ...item,
    time: formatDateTime(item.time, false, { month: "short" })
  }));

  const secondaryAvgNoise = secondaryAvgNoiseByMonth(secondaryFormattedData);
  const secondaryAvgVoltage = secondaryAvgVoltageByMonth(secondaryFormattedData);
  const secondaryPMVoltage = secondaryAvgPMByMonth(secondaryFormattedData);

  return (
    <>
      <section>
        <div className="flex flex-col gap-y-2">
          <Heading subtitle="General data" description="Data from the nit2xli table"/>
          <Separator/>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <Chart 
              cardTitle="Rain Level"
              cardDescription="Average rain level by month (mm)"
              chartType="column"
              data={generalAvgRain}
              xColumn="time"
              yColumn="_avg_emw_rain_lvl"
            />

            <Chart 
              cardTitle="Temperature"
              cardDescription="Average temperature by month (ºC)"
              chartType="column"
              data={generalAvgTemp}
              xColumn="time"
              yColumn="_avg_emw_temperature"
            />

            <Chart 
              cardTitle="Humidity"
              cardDescription="Average humidity by month (g/m³)"
              chartType="column"
              data={generalAvgHumidity}
              xColumn="time"
              yColumn="_avg_emw_humidity"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-y-2">
          <Heading subtitle="Secondary data" description="Data from the k72623_lo table"/>
          <Separator/>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <Chart 
              cardTitle="Noise Level"
              cardDescription="Average noise level by month (dB)"
              chartType="column"
              data={secondaryAvgNoise}
              xColumn="time"
              yColumn="_avg_noise"
            />

            <Chart 
              cardTitle="Voltage"
              cardDescription="Average voltage by month (V)"
              chartType="column"
              data={secondaryAvgVoltage}
              xColumn="time"
              yColumn="_avg_voltage"
            />

            <Chart 
              cardTitle="PM2.5"
              cardDescription="Average PM2.5 by month (µg/m³)"
              chartType="column"
              data={secondaryPMVoltage}
              xColumn="time"
              yColumn="_avg_pm2_5"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;