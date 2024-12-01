"use client";

import { 
  Bar, 
  BarChart as BChart,
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

interface BarChartProps {
  cardTitle: string;
  cardDescription?: string;
  chartData: any[];

  className?: string;
  dataKeyX?: string;
  dataKeyY?: string;
  labelFormatter?: (value: any) => string;

  chartLabels?: boolean;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  chartMargins?: { top?: number; right?: number; bottom?: number; left?: number };
};

const BarChart: React.FC<BarChartProps> = ({ 
  cardTitle, 
  cardDescription,
  chartData,

  className,
  dataKeyX="x",
  dataKeyY="y",
  labelFormatter = (value) => value,

  chartLabels = true,
  hideXAxis = false,
  hideYAxis = false,
  chartMargins = { top: 0, right: 25, bottom: 0, left: 0 }
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>
      
      <CardContent>
        <ChartContainer className={cn("min-h-[200px] w-full", className)} config={chartConfig}>
          <BChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={chartMargins}
          >
            <CartesianGrid horizontal={false} />

            <YAxis
              dataKey={dataKeyX}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={labelFormatter}
              hide={hideYAxis}
            />

            <XAxis 
              dataKey={dataKeyY} 
              type="number" 
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={labelFormatter}
              hide={hideXAxis}
            />

            <Bar dataKey={dataKeyY} fill="hsl(var(--chart-1))" layout="vertical" radius={5}>
              {chartLabels &&
                <LabelList
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              }
            </Bar>
          </BChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChart;