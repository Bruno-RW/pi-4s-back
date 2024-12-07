"use client";

import { 
  LabelList,
  Pie,
  PieChart as PChart
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

interface PieChartProps {
  cardTitle: string;
  cardDescription?: string;
  chartData: any[];

  classCard?: string;
  classChart?: string;
  classTooltip?: string;
  chartDataKey?: string;
  labelDataKey?: string;
  nameKey?: string;

  chartConfig: ChartConfig;
};

const PieChart: React.FC<PieChartProps> = ({
  cardTitle, 
  cardDescription,
  chartData,

  classCard,
  classChart,
  classTooltip,
  
  nameKey="Valor",
  chartDataKey="Numero",

  chartConfig,
}) => {
  return (
    <Card className={cn("flex flex-col m-2 w-full", classCard)}>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
      </CardHeader>

      <CardContent className="flex-1 pb-0 px-52">
        <ChartContainer
          config={chartConfig}
          className={cn(
            "mx-auto aspect-square min-h-[200px] w-full [&_.recharts-text]:fill-background", 
            classChart
          )}
        >
          <PChart>
            <ChartTooltip
              content={
                <ChartTooltipContent nameKey={chartDataKey} hideLabel className={cn("w-40", classTooltip)} />
              }
            />

            <Pie 
              data={chartData} 
              nameKey={nameKey} 
              dataKey={chartDataKey}
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {payload.visitors}
                  </text>
                )
              }}
            />
          </PChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChart;