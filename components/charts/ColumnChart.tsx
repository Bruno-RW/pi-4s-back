"use client";

import { 
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";

const chartConfig = {
  data: {
    label: "Valor",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ColumnChartProps {
  cardTitle: string;
  cardDescription?: string;
  chartData: any[];

  classCard?: string;
  classChart?: string;
  dataKeyX?: string;
  dataKeyY?: string;
  labelFormatter?: (value: any) => string;

  chartLabels?: boolean;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  chartMargins?: { top?: number; right?: number; bottom?: number; left?: number };
};

const ColumnChart: React.FC<ColumnChartProps> = ({ 
  cardTitle, 
  cardDescription,
  chartData,

  classCard,
  classChart,
  dataKeyX="x",
  dataKeyY="y",
  labelFormatter = (value) => value,
  
  chartLabels = true,
  hideXAxis = false,
  hideYAxis = false,
  chartMargins = { top: 15, right: 0, bottom: 0, left: 0 }
}) => {
  return (
    <Card className={cn(classCard)}>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>

      <CardContent>
        <ChartContainer className={cn("min-h-[200px] w-full", classChart)} config={chartConfig}>
          <BarChart 
            accessibilityLayer
            data={chartData}
            margin={chartMargins}
            >
            <CartesianGrid vertical={false} />
            
            <XAxis
              dataKey={dataKeyX}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={labelFormatter}
              hide={hideXAxis}
            />

            <YAxis
              dataKey={dataKeyY}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={labelFormatter}
              hide={hideYAxis}
            />

            <Bar dataKey={dataKeyY} fill="hsl(var(--chart-1))" radius={4}>
              {chartLabels &&
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              }
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ColumnChart;