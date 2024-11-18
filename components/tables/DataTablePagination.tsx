import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { cn, formatNumber } from "@/lib/utils";

interface DataTablePaginationProps<TData> { table: Table<TData>; isActive: boolean };

export function DataTablePagination<TData>({ table, isActive }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of {" "}
        {formatNumber(table.getFilteredRowModel().rows.length)} row(s) selected.
      </div>

      <div className="flex items-center space-x-2 md:space-x-6 lg:space-x-8">
        <div className="hidden items-center space-x-2 lg:flex">
          <p className="text-sm font-medium">Rows per page</p>

          <Select value={`${table.getState().pagination.pageSize}`} onValueChange={value => table.setPageSize(Number(value))}>
            <SelectTrigger className="h-8 w-[70px] dark:bg-[#101010]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>

            <SelectContent className="dark:bg-[#101010]" side="top">
              {[10, 20, 30, 40, 50, 100].map(pageSize => 
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex max-w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {" "}
          {formatNumber(table.getPageCount())}
        </div>

        <div className={cn("flex flex-col sm:flex-row items-center space-x-2", isActive && "flex-row")}>
          <Button className="hidden h-8 w-8 p-0 lg:flex dark:bg-[#101010]" variant="outline"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button className="h-8 w-8 p-0 dark:bg-[#101010]" variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <Button className="h-8 w-8 p-0 dark:bg-[#101010]" variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          <Button className="hidden h-8 w-8 p-0 lg:flex dark:bg-[#101010]" variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}