import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@admincn/components/ui/table';

import type { EnrollmentRecord } from '../../types';

type Props = {
  rows: EnrollmentRecord[];
  columns: ColumnDef<EnrollmentRecord>[];
};

export function EnrollmentTable({ rows, columns }: Props) {
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="h-14 border-t">
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="text-muted-foreground first:pl-4 last:px-4">
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-muted/50 h-14">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="first:pl-4 last:px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-muted-foreground h-24 text-center">
              Nu există înscrieri pentru filtrele selectate.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
