import BarChart from "@/components/charts/BarChart";
import ColumnChart from "@/components/charts/ColumnChart";

interface DataProps { [key: string]: any };

interface ChartProps {
  cardTitle: string;
  cardDescription?: string;

  chartType: "column" | "bar";

  data: DataProps[];
  xColumn:string;
  yColumn:string;

  className?: string;

  dataKeyX?: string;
  dataKeyY?: string;
  labelFormatter?: (value: any) => string;
};

const Chart: React.FC<ChartProps> = async({
  cardTitle,
  cardDescription,

  chartType,

  data,
  xColumn,
  yColumn,

  dataKeyX,
  dataKeyY,
  labelFormatter,

  className,

}) => {
  //TODO: Create data filter

  const chartData = data ? data.map(item => ({
    x: item[xColumn],
    y: item[yColumn]
  })) : [];

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