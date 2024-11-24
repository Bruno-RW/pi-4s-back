"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { PiSlidersHorizontal } from "react-icons/pi";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface DataTableFiltersProps<TData> { table: Table<TData>, searchKey: string };

export function DataTableFilters<TData>({ table, searchKey }: DataTableFiltersProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <Input className="max-w-sm dark:bg-neutral-950/50"
        placeholder={`Search ${searchKey}`}
        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
        onChange={(event: any) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="hidden h-8 lg:flex dark:bg-neutral-950/50" variant="outline" size="sm">
            <PiSlidersHorizontal className="mr-2 h-4 w-4" /> Columns
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[150px] dark:bg-[#101010]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(column => typeof column.accessorFn !== "undefined" && column.getCanHide())
            .map(column => 
              <DropdownMenuCheckboxItem className="capitalize" checked={column.getIsVisible()} onCheckedChange={value => column.toggleVisibility(!!value)} key={column.id}>
                {column.id === "createdAt" ? "Created" : column.id === "updatedAt" ? "Updated" : column.id}
              </DropdownMenuCheckboxItem>
            )
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}