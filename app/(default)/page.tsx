import db from "@/lib/db";
import { capitalize, formatDateTime, formatNumber } from "@/lib/utils";

import { 
  countTotalRows,
  countDevices,

  generalCountByDeviceName,
  generalAvgRainByMonth, 
  generalAvgTempByMonth,
  generalAvgHumidByMonth,

  secondaryCountByDeviceName,
  secondaryAvgNoiseByMonth,
  secondaryAvgVoltageByMonth,
  secondaryAvgPMByMonth,
} from "@/lib/charts/chartData";

import Heading from "@/components/ui/custom/Heading";
import Separator from "@/components/ui/custom/Separator";

import Chart from "@/components/charts/Chart";
import Card from "@/components/charts/Card";

const deviceColors = {
  "Estação Aeroporto":   "hsl(var(--chart-1))",
  "Estação Cruzeiro":    "hsl(var(--chart-2))",
  "Estação Prefeitura":  "hsl(var(--chart-3))",
  "Estação Unijuí":      "hsl(var(--chart-4))",
  "Estación San Marcos": "hsl(var(--chart-5))",
  "Montagem":            "hsl(30, 79%, 55%)",

  "Micropartículas Rótula do Tafarel":  "hsl(var(--chart-1))",
  "Micropartículas Rótula do Taffarel": "hsl(var(--chart-2))",
};

const getColorForDevice = (deviceName: string) => {
  // @ts-ignore
  return deviceColors[deviceName] || "var(--color-default)";
};

const HomePage = async() => {
  //? ------ Get data from database ------ ?//
  const generalData = await db.nit2xli.findMany({take: 10000});
  const secondaryData = await db.k72623_lo.findMany({take: 10000});

  const generalFormattedData = generalData.map(item => ({
    ...item,
    time: formatDateTime(item.time, false, { month: "short" })
  }));
  const secondaryFormattedData = secondaryData.map(item => ({
    ...item,
    time: formatDateTime(item.time, false, { month: "short" })
  }));


  //? ------ Common data from both table ------ ?//
  const generalTotalRows = countTotalRows(generalFormattedData);
  const secondaryTotalRows = countTotalRows(secondaryFormattedData);

  const commonTotalRows = generalTotalRows + secondaryTotalRows;
  const commonTotalDevices: number = countDevices([...generalFormattedData, ...secondaryFormattedData]);


  //? ------ General data from the nit2xli table ------ ?//
  const generalTotalDevices: number = countDevices(generalFormattedData);

  const generalAvgRain = generalAvgRainByMonth(generalFormattedData);
  const generalAvgTemp = generalAvgTempByMonth(generalFormattedData);
  const generalAvgHumidity = generalAvgHumidByMonth(generalFormattedData);

  
  //? ------ Secondary data from the k72623_lo table ------ ?//
  const secondaryTotalDevices: number = countDevices(secondaryFormattedData);

  const secondaryAvgNoise = secondaryAvgNoiseByMonth(secondaryFormattedData);
  const secondaryAvgVoltage = secondaryAvgVoltageByMonth(secondaryFormattedData);
  const secondaryPMVoltage = secondaryAvgPMByMonth(secondaryFormattedData);

  const generalDeviceCounts = generalCountByDeviceName(generalFormattedData).map(item => ({
    ...item,
    fill: getColorForDevice(item.deviceName)
  }));

  const secondaryDeviceCounts = secondaryCountByDeviceName(secondaryFormattedData).map(item => ({
    ...item,
    fill: getColorForDevice(item.deviceName)
  }));

  return (
    <>
      <section>
        <div className="flex flex-col gap-y-2">
          <Heading subtitle="Informações gerais" description="Dados de ambas as tabelas"/>
          <Separator/>
        </div>

        <div className="flex flex-row">
          <Card classCard="w-1/2"
            cardTitle="Qtd. dispositivos"
            cardContent={commonTotalDevices.toString()}
          />

          <Card classCard="w-1/2"
            cardTitle="Qtd. dados totais"
            cardContent={formatNumber(commonTotalRows)}
          />
        </div>

        <div className="flex flex-row">
          <Chart 
            cardTitle="Dispositivos primários"
            cardDescription="Contagem de dispositivos na tabela nit2xli"
            chartType="pie"
            data={generalDeviceCounts}
            nameKey="deviceName"
            chartDataKey="count"
            chartConfig={{
              deviceName: { label: "deviceName" }, 
              fill: { label: "fill" },
            }}
          />

          <Chart 
            cardTitle="Dispositivos secundários"
            cardDescription="Contagem de dispositivos na tabela k72623_lo"
            chartType="pie"
            data={secondaryDeviceCounts}
            nameKey="deviceName"
            chartDataKey="count"
            chartConfig={{
              deviceName: { label: "deviceName" },
              color: { label: "fill" }
            }}
          />
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-y-2">
          <Heading subtitle="Dados primários" description="Dados da tabela nit2xli"/>
          <Separator/>
        </div>

        <div className="flex flex-row">
          <Card classCard="w-1/2"
            cardTitle="Quantidade dispositivos"
            cardContent={generalTotalDevices.toString()}
          />

          <Card classCard="w-1/2"
            cardTitle="Quantidade dados"
            cardContent={formatNumber(generalTotalRows)}
          />
        </div>

        <div className="flex flex-row">
          <Chart 
            cardTitle="Nível de chuva"
            cardDescription="Média de nível de chuva por mês (mm)"
            chartType="column"
            data={generalAvgRain}
            xColumn="time"
            yColumn="_avg_emw_rain_lvl"
          />

          <Chart 
            cardTitle="Temperatura"
            cardDescription="Média de temperatura por mês (ºC)"
            chartType="column"
            data={generalAvgTemp}
            xColumn="time"
            yColumn="_avg_emw_temperature"
          />

          <Chart 
            cardTitle="Umidade"
            cardDescription="Média de umidade por mês (g/m³)"
            chartType="column"
            data={generalAvgHumidity}
            xColumn="time"
            yColumn="_avg_emw_humidity"
          />
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-y-2">
          <Heading subtitle="Dados secundários" description="Dados da tabela k72623_lo"/>
          <Separator/>
        </div>

        <div className="flex flex-row">
          <Card classCard="w-1/2"
            cardTitle="Quantidade dispositivos"
            cardContent={secondaryTotalDevices.toString()}
          />

          <Card classCard="w-1/2"
            cardTitle="Qtd. dados k72623_lo"
            cardContent={formatNumber(secondaryTotalRows)}
          />
        </div>

        <div className="flex flex-row">
          <Chart 
            cardTitle="Nível de ruído"
            cardDescription="Média de nível de ruído por mês (dB)"
            chartType="bar"
            data={secondaryAvgNoise}
            xColumn="time"
            yColumn="_avg_noise"
          />

          <Chart 
            cardTitle="Voltagem"
            cardDescription="Média de voltagem por mês (V)"
            chartType="bar"
            data={secondaryAvgVoltage}
            xColumn="time"
            yColumn="_avg_voltage"
          />

          <Chart 
            cardTitle="PM2.5"
            cardDescription="Média de PM2.5 por mês (µg/m³)"
            chartType="bar"
            data={secondaryPMVoltage}
            xColumn="time"
            yColumn="_avg_pm2_5"
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;