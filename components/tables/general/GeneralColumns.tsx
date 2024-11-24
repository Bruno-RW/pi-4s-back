"use client";

import { ColumnDef } from "@tanstack/react-table";

import GeneralAction from "./GeneralActions";
import { DataTableColumnHeader } from "../DataTableColumnHeader";

import { Checkbox } from "@/components/ui/checkbox";

export type GeneralColumnsProps = {
  deduplicationId: string;
  devEui: string | null;
  deviceName: string | null;

  emwRainLvl: number | null;
  emwAvgWindSpeed: number | null;
  emwGustWindSpeed: number | null;
  emwWindDirection: number | null;

  emwTemperature: number | null;
  emwHumidity: number | null;
  emwLuminosity: bigint | null;
  emwUv: number | null;
  emwSolarRadiation: number | null;
  emwAtmPres: number | null;

  internalTemperature: number | null;
  internalHumidity: number | null;

  time: string | null;
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
    accessorKey: "emwRainLvl",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwRainLvl" center />,
  },
  {
    accessorKey: "emwAvgWindSpeed",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwAvgWindSpeed" center />,
  },
  {
    accessorKey: "emwGustWindSpeed",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwGustWindSpeed" center />,
  },
  {
    accessorKey: "emwWindDirection",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwWindDirection" center />,
  },
  {
    accessorKey: "emwTemperature",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwTemperature" center />,
  },
  {
    accessorKey: "emwHumidity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwHumidity" center />,
  },
  {
    accessorKey: "emwLuminosity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwLuminosity" center />,
  },
  {
    accessorKey: "emwUv",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwUv" center />,
  },
  {
    accessorKey: "emwSolarRadiation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwSolarRadiation" center />,
  },
  {
    accessorKey: "emwAtmPres",
    header: ({ column }) => <DataTableColumnHeader column={column} title="EmwAtmPres" center />,
  },
  {
    accessorKey: "internalTemperature",
    header: ({ column }) => <DataTableColumnHeader column={column} title="InternalTemperature" center />,
  },
  {
    accessorKey: "internalHumidity",
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