"use client";

import { 
  Bar,
  BarChart,
  CartesianGrid,
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
};

const ColumnChart: React.FC<ColumnChartProps> = ({ 
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
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            
            <XAxis
              dataKey={dataKeyX}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={labelFormatter}
            />

            <YAxis
              dataKey={dataKeyY}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={labelFormatter}
            />

            {/* <ChartTooltip content={<ChartTooltipContent />} /> */}

            <Bar 
              dataKey={dataKeyY}
              fill="hsl(var(--chart-1))" 
              radius={4} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ColumnChart;