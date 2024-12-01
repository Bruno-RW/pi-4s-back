"use client";

import { 
  Bar, 
  BarChart as BChart, 
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";

const chartConfig = {
  desktop: {
    label: "Valor",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface BarChartProps {
  cardTitle: string;
  cardDescription?: string;
  chartData: any[];
  className?: string;
  dataKeyX?: string;
  dataKeyY?: string;
  labelFormatter?: (value: any) => string;
};

const BarChart: React.FC<BarChartProps> = ({ 
  cardTitle, 
  cardDescription,
  chartData,
  className,
  dataKeyX="x",
  dataKeyY="y",
  labelFormatter = (value) => value
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription ?? <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>
      
      <CardContent>
        <ChartContainer className={cn("min-h-[200px] w-full", className)} config={chartConfig}>
          <BChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey={dataKeyX}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={labelFormatter}
            />

            <XAxis dataKey={dataKeyY} type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey={dataKeyY} layout="vertical" radius={5} />
          </BChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChart;