"use client";

import { 
    Area,
    AreaChart as AChart,
    CartesianGrid,
    XAxis
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
  data1: {
    label: "Valor 1",
    color: "hsl(var(--chart-1))",
  },
  data2: {
    label: "Valor 2",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


interface AreaChartProps {
    cardTitle: string;
    cardDescription?: string;
    chartData: any[];
  
    className?: string;
    dataKeyX?: string;
    dataKeyY?: string;
    dataKey1?: string;
    dataKey2?: string;
    labelFormatter?: (value: any) => string;
  
    chartLabels?: boolean;
    hideXAxis?: boolean;
    hideYAxis?: boolean;
    chartMargins?: { top?: number; right?: number; bottom?: number; left?: number };
};

const AreaChart: React.FC<AreaChartProps> = ({
    cardTitle, 
    cardDescription,
    chartData,
  
    className,
    dataKeyX="x",
    dataKey1="data1",
    dataKey2="data2",

    labelFormatter = (value) => value,
  
    chartLabels = true,
    hideXAxis = false,
    hideYAxis = false,
    chartMargins = { top: 0, right: 12, bottom: 0, left: 12 }
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>

      <CardContent>
        <ChartContainer className={cn("min-h-[200px] w-full", className)} config={chartConfig}>
          <AChart
            accessibilityLayer
            data={chartData}
            margin={chartMargins}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey={dataKeyX}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            {/* <ChartTooltip cursor={false} content={<ChartTooltipContent />} /> */}

            <defs>
              <linearGradient id="fillData1" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              
              <linearGradient id="fillData2" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey={dataKey1}
              type="natural"
              fill="var(--chart-2)"
              fillOpacity={0.4}
              stroke="var(--chart-2)"
              stackId="a"
            />

            <Area
              dataKey={dataKey2}
              type="natural"
              fill="var(--chart-1)"
              fillOpacity={0.4}
              stroke="var(--chart-1)"
              stackId="a"
            />
          </AChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AreaChart;