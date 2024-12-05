"use client";

import { ColumnDef } from "@tanstack/react-table";

import SecondaryAction from "./SecondaryActions";
import { DataTableColumnHeader } from "../DataTableColumnHeader";

import { Checkbox } from "@/components/ui/checkbox";

export type SecondaryColumnsProps = {
  deduplicationId: string;
  devEui: string | null;
  deviceName: string | null;

  noise: number | null;
  temperature: number | null;
  voltage: number | null;
  humidity: number | null;
  pm2_5: number | null;

  time: Date | string | null;
};

const centered = (text: string | number | null) => <div className="text-center">{text}</div>;

export const SecondaryColumns: ColumnDef<SecondaryColumnsProps>[] = [
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
    accessorKey: "noise",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Noise" center />,
  },
  {
    accessorKey: "temperature",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Temperature" center />,
  },
  {
    accessorKey: "voltage",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Voltage" center />,
  },
  {
    accessorKey: "humidity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Humidity" center />,
  },
  {
    accessorKey: "pm2_5",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PM2.5" center />,
  },

  {
    accessorKey: "time",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Time" center />,
  },

  {
    id: "actions",
    header: () => centered("Actions"),
    cell: ({ row }) => <SecondaryAction data={row.original} />,
  },
];