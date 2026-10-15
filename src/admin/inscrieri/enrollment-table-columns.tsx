import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@admincn/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@admincn/components/ui/dropdown-menu';
import { Button } from '@admincn/components/ui/button';
import { EllipsisVerticalIcon } from 'lucide-react';

import type { EnrollmentRecord, EnrollmentStatus } from '../../types';

const STATUS_LABELS: Record<EnrollmentStatus, string> = {
  pending: 'În așteptare',
  confirmed: 'Confirmată',
  cancelled: 'Anulată',
};

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('ro-RO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function buildEnrollmentColumns(
  onUpdateStatus: (id: string, status: EnrollmentStatus) => void
): ColumnDef<EnrollmentRecord>[] {
  return [
    {
      accessorKey: 'studentName',
      header: 'Cursant',
      cell: ({ row }) => (
        <div className="flex flex-col text-sm">
          <span className="text-card-foreground font-medium">{row.original.studentName}</span>
          <span className="text-muted-foreground">{row.original.studentEmail}</span>
        </div>
      ),
    },
    {
      accessorKey: 'courseTitle',
      header: 'Curs',
      cell: ({ row }) => <span className="text-sm">{row.original.courseTitle}</span>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Data',
      cell: ({ row }) => <span className="text-sm">{formatDate(row.original.createdAt)}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge className="bg-primary/10 text-primary h-auto rounded-sm px-1.5 capitalize">
          {STATUS_LABELS[row.original.status]}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: () => 'Acțiuni',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="text-muted-foreground size-8">
                <EllipsisVerticalIcon className="size-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onUpdateStatus(row.original.id, 'pending')}>
              Marchează în așteptare
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(row.original.id, 'confirmed')}>
              Confirmă înscrierea
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(row.original.id, 'cancelled')}>
              Anulează
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 60,
    },
  ];
}
