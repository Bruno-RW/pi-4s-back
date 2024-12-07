"use client";

import { useState } from "react";
import {
  useReactTable,
  flexRender,
  ColumnDef,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { AiOutlinePlus } from "react-icons/ai";

import { capitalize, formatNumber } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Button from "@/components/ui/custom/Button";
import Separator from "@/components/ui/custom/Separator";
import Heading from "@/components/ui/custom/Heading";

import { DataTablePagination } from "./DataTablePagination";
import { DataTableFilters } from "./DataTableFilters";
import { useNavbar } from "@/context/NavbarContext";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  entityName: string;
  searchKey: string;
  data: TData[];
};

export default function DataTable<TData, TValue>({ columns, entityName, searchKey, data }: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const { isActive } = useNavbar();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      columnFilters,
      rowSelection,
      sorting,
    },
  });

  return (
    <section className="flex flex-col gap-y-3">
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <Heading title={`${capitalize(entityName)} (${formatNumber(data.length)})`} description={`Gerenciar ${entityName}`} />

          <Button className="bg-border-shadow px-3" href={`/${entityName}/new`}>
            <AiOutlinePlus size={20} />
          </Button>
        </div>

        <Separator />
      </div>

      <div className="flex flex-col gap-y-4">
        <DataTableFilters table={table} searchKey={searchKey} />

        <div className="bg-shadow rounded-lg border overflow-hidden dark:shadow-none dark:bg-black/10">
          <Table>
            <TableHeader className="dark:bg-neutral-950/50">
              {table.getHeaderGroups().map(headerGroup => 
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => 
                    <TableHead className="text-black/70 font-bold dark:text-neutral-400" key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )}
                </TableRow>
              )}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => 
                  <TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
                    {row.getVisibleCells().map(cell => 
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )}
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center h-24">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DataTablePagination table={table} isActive={isActive} />
      </div>
    </section>
  );
}