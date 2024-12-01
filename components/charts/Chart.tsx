import BarChart from "@/components/charts/BarChart";
import ColumnChart from "@/components/charts/ColumnChart";

import db from "@/lib/db";

interface ChartProps {
  cardTitle: string;
  cardDescription?: string;

  chartType: "column" | "bar";

  tableName?: string
  xColumn:string;
  yColumn:string;

  className?: string;

  dataKeyX?: string;
  dataKeyY?: string;
  labelFormatter?: (value: any) => string;
};

interface DataProps { [key: string]: any };

const Chart: React.FC<ChartProps> = async({
  cardTitle,
  cardDescription,

  chartType,

  tableName="nit2xli",
  xColumn,
  yColumn,

  dataKeyX,
  dataKeyY,
  labelFormatter,

  className,

}) => {
  const data: DataProps[] = await (db as any)[tableName].findMany();
  // const data: DataProps[] = await fetch("/api/data").then(res => res.json());

  //TODO: Create data filter

  const chartData = data.map(item => ({
    x: item[xColumn],
    y: item[yColumn]
  }));

  return (
    <div className="flex-1 p-2">
      {
        chartType === "column" ? (
          <ColumnChart
            cardTitle={cardTitle}
            cardDescription={cardDescription}
            chartData={chartData}
            dataKeyX={dataKeyX}
            dataKeyY={dataKeyY}
            className={className}
            labelFormatter={labelFormatter}
          />
        ) : (
          <BarChart
            cardTitle={cardTitle}
            cardDescription={cardDescription}
            chartData={chartData}
            dataKeyX={dataKeyX}
            className={className}
            labelFormatter={labelFormatter}
          />
        )
      }
    </div>
  );
};

export default Chart;