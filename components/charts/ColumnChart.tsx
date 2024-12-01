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

  className?: string;
  dataKeyX?: string;
  dataKeyY?: string;
  labelFormatter?: (value: any) => string;

  hideXAxis?: boolean;
  hideYAxis?: boolean;
  chartMargins?: { top?: number; right?: number; bottom?: number; left?: number };
};

const ColumnChart: React.FC<ColumnChartProps> = ({ 
  cardTitle, 
  cardDescription,
  chartData,

  className,
  dataKeyX="x",
  dataKeyY="y",
  labelFormatter = (value) => value,
  
  hideXAxis = false,
  hideYAxis = false,
  chartMargins = { top: 15, right: 0, bottom: 0, left: 0 }
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>

      <CardContent>
        <ChartContainer className={cn("min-h-[200px] w-full", className)} config={chartConfig}>
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
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ColumnChart;