"use client";

import { ColumnDef } from "@tanstack/react-table";

import GeneralAction from "./GeneralActions";
import { DataTableColumnHeader } from "../DataTableColumnHeader";

import { Checkbox } from "@/components/ui/checkbox";

export type GeneralColumnsProps = {
  deduplicationId: string;
  devEui: string | null;
  deviceName: string | null;

  emw_rain_lvl: number | null;
  emw_avg_wind_speed: number | null;
  emw_gust_wind_speed: number | null;
  emw_wind_direction: number | null;

  emw_temperature: number | null;
  emw_humidity: number | null;
  emw_luminosity: bigint | null;
  emw_uv: number | null;
  emw_solar_radiation: number | null;
  emw_atm_pres: number | null;

  internal_temperature: number | null;
  internal_humidity: number | null;

  time: Date | string | null;
};

const centered = (text: string | number | null) => <div className="text-center">{text}</div>;

export const GeneralColumns: ColumnDef<GeneralColumnsProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "deduplicationId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="DeduplicationID" center />,
    cell: ({ row }) => centered(row.original.deduplicationId)
  },
  {
    accessorKey: "devEui",
    header: ({ column }) => <DataTableColumnHeader column={column} title="DevEui" center />,
    cell: ({ row }) => centered(row.original.devEui)
  },
  {
    accessorKey: "deviceName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="DeviceName" center />,
  },

  {
    accessorKey: "emw_rain_lvl",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwRainLvl" center />,
  },
  {
    accessorKey: "emw_avg_wind_speed",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwAvgWindSpeed" center />,
  },
  {
    accessorKey: "emw_gust_wind_speed",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwGustWindSpeed" center />,
  },
  {
    accessorKey: "emw_wind_direction",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwWindDirection" center />,
  },
  {
    accessorKey: "emw_temperature",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwTemperature" center />,
  },
  {
    accessorKey: "emw_humidity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwHumidity" center />,
  },
  {
    accessorKey: "emw_luminosity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwLuminosity" center />,
  },
  {
    accessorKey: "emw_uv",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwUv" center />,
  },
  {
    accessorKey: "emw_solar_radiation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwSolarRadiation" center />,
  },
  {
    accessorKey: "emw_atm_pres",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwAtmPres" center />,
  },
  {
    accessorKey: "internal_temperature",
    header: ({ column }) => <DataTableColumnHeader column={column} title="InternalTemperature" center />,
  },
  {
    accessorKey: "internal_humidity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="InternalHumidity" center />,
  },
  {
    accessorKey: "time",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Time" center />,
  },

  {
    id: "actions",
    header: () => centered("Actions"),
    cell: ({ row }) => <GeneralAction data={row.original} />,
  },
];