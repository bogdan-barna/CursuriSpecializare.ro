import type { ColumnDef } from '@tanstack/react-table';
import { FileDownIcon } from 'lucide-react';

import { Badge } from '@admincn/components/ui/badge';
import { Button } from '@admincn/components/ui/button';

import type { EvaluationOutcome, EvaluationRecord } from '../../types';

const OUTCOME_LABELS: Record<EvaluationOutcome, string> = {
  promovat: 'Promovat',
  respins: 'Respins',
  in_asteptare: 'În așteptare',
};

const OUTCOME_CLASS: Record<EvaluationOutcome, string> = {
  promovat: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  respins: 'bg-destructive/10 text-destructive',
  in_asteptare: 'bg-primary/10 text-primary',
};

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('ro-RO', {
      dateStyle: 'medium',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function buildEvaluationColumns(
  onDownloadPdf: (record: EvaluationRecord) => void,
  downloadingId: string | null
): ColumnDef<EvaluationRecord>[] {
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
      cell: ({ row }) => (
        <div className="flex flex-col text-sm">
          <span>{row.original.courseTitle}</span>
          <span className="text-muted-foreground text-xs">{row.original.cohortLabel}</span>
        </div>
      ),
    },
    {
      accessorKey: 'overallPercent',
      header: 'Scor',
      cell: ({ row }) => (
        <span className="text-sm font-semibold tabular-nums">{row.original.overallPercent}%</span>
      ),
    },
    {
      accessorKey: 'outcome',
      header: 'Rezultat',
      cell: ({ row }) => (
        <Badge className={`h-auto rounded-sm px-1.5 capitalize ${OUTCOME_CLASS[row.original.outcome]}`}>
          {OUTCOME_LABELS[row.original.outcome]}
        </Badge>
      ),
    },
    {
      accessorKey: 'evaluatedAt',
      header: 'Data',
      cell: ({ row }) => <span className="text-sm">{formatDate(row.original.evaluatedAt)}</span>,
    },
    {
      id: 'pdf',
      header: () => 'PDF',
      cell: ({ row }) => {
        const busy = downloadingId === row.original.id;
        return (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 gap-1.5"
            disabled={busy}
            onClick={() => onDownloadPdf(row.original)}
          >
            <FileDownIcon className="size-3.5" />
            {busy ? 'Se generează…' : 'Salvează PDF'}
          </Button>
        );
      },
      size: 140,
    },
  ];
}
