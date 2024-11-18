"use client";

import { ColumnDef } from "@tanstack/react-table";

import UsersAction from "./UsersActions";
import { DataTableColumnHeader } from "../DataTableColumnHeader";

import { Checkbox } from "@/components/ui/checkbox";

export type UsersColumnsProps = {
  id: number;
  name: string;
  email: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

const centered = (text: string | number) => <div className="text-center">{text}</div>;

export const UsersColumns: ColumnDef<UsersColumnsProps>[] = [
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
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" center />,
    cell: ({ row }) => centered(row.original.id)
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="E-mail" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" center />,
    cell: ({ row }) => centered(row.original.type)
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated" />,
  },
  
  {
    id: "actions",
    header: () => centered("Actions"),
    cell: ({ row }) => <UsersAction data={row.original} />,
  },
];