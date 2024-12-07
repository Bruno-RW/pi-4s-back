import BarChart from "@/components/charts/BarChart";
import ColumnChart from "@/components/charts/ColumnChart";
import PieChart from "@/components/charts/PieChart";

interface DataProps { [key: string]: any };

interface ChartProps {
  cardTitle: string;
  cardDescription?: string;
  chartType: "column" | "bar" | "pie"; // Update this line
  data: DataProps[];
  
  className?: string;
  classTooltip?: string;
  xColumn?:string;
  yColumn?:string;

  nameKey?: string;
  chartDataKey?: string;
  labelDataKey?: string;

  dataKey?: string;
  dataKeyX?: string;
  dataKeyY?: string;
  labelFormatter?: (value: any) => string;

  chartLabels?: boolean;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  chartMargins?: { top?: number; right?: number; bottom?: number; left?: number };
  chartConfig?: any;
};

const Chart: React.FC<ChartProps> = async({
  cardTitle,
  cardDescription,
  chartType,
  data,

  className,
  classTooltip,
  xColumn,
  yColumn,

  nameKey,
  chartDataKey,
  labelDataKey,

  dataKeyX,
  dataKeyY,
  labelFormatter,

  chartLabels,
  hideXAxis,
  hideYAxis,
  chartMargins,
  chartConfig
}) => {
  //TODO: Create data filter

  if (chartType !== "pie" && xColumn && yColumn) {
    data = data ? data.map(item => ({
      x: item[xColumn],
      y: item[yColumn]
    })) : [];
  }

  return (
    <div className="flex-1 p-2">
      {(() => {
        switch (chartType) {
          case "column":
            return (
              <ColumnChart
                cardTitle={cardTitle}
                cardDescription={cardDescription}
                chartData={data}

                className={className}
                dataKeyX={dataKeyX}
                dataKeyY={dataKeyY}
                labelFormatter={labelFormatter}

                chartLabels={chartLabels}
                hideXAxis={hideXAxis}
                hideYAxis={hideYAxis}
                chartMargins={chartMargins}
              />
            );
          case "bar":
            return (
              <BarChart
                cardTitle={cardTitle}
                cardDescription={cardDescription}
                chartData={data}

                className={className}
                dataKeyX={dataKeyX}
                dataKeyY={dataKeyY}
                labelFormatter={labelFormatter}

                chartLabels={chartLabels}
                hideXAxis={hideXAxis}
                hideYAxis={hideYAxis}
                chartMargins={chartMargins}
              />
            );
          case "pie":
            return (
              <PieChart
                cardTitle={cardTitle}
                cardDescription={cardDescription}
                chartData={data}

                className={className}
                classTooltip={classTooltip}
                nameKey={nameKey}
                chartDataKey={chartDataKey}
                labelDataKey={labelDataKey}

                chartConfig={chartConfig}
              />
            );

          default: return null;
        }
      })()}
    </div>
  );
};

export default Chart;