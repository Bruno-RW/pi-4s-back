import BarChart from "@/components/charts/BarChart";
import ColumnChart from "@/components/charts/ColumnChart";

interface DataProps { [key: string]: any };

interface ChartProps {
  cardTitle: string;
  cardDescription?: string;
  chartType: "column" | "bar";
  data: DataProps[];
  
  className?: string;
  xColumn:string;
  yColumn:string;

  dataKeyX?: string;
  dataKeyY?: string;
  labelFormatter?: (value: any) => string;

  chartLabels?: boolean;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  chartMargins?: { top?: number; right?: number; bottom?: number; left?: number };
};

const Chart: React.FC<ChartProps> = async({
  cardTitle,
  cardDescription,
  chartType,
  data,

  className,
  xColumn,
  yColumn,

  dataKeyX,
  dataKeyY,
  labelFormatter,

  chartLabels,
  hideXAxis,
  hideYAxis,
  chartMargins,

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

            className={className}
            dataKeyX={dataKeyX}
            dataKeyY={dataKeyY}
            labelFormatter={labelFormatter}

            chartLabels={chartLabels}
            hideXAxis={hideXAxis}
            hideYAxis={hideYAxis}
            chartMargins={chartMargins}
          />
        ) : (
          <BarChart
            cardTitle={cardTitle}
            cardDescription={cardDescription}
            chartData={chartData}

            className={className}
            dataKeyX={dataKeyX}
            dataKeyY={dataKeyY}
            labelFormatter={labelFormatter}

            chartLabels={chartLabels}
            hideXAxis={hideXAxis}
            hideYAxis={hideYAxis}
            chartMargins={chartMargins}
          />
        )
      }
    </div>
  );
};

export default Chart;