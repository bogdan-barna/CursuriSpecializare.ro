import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Card } from '@admincn/components/ui/card';
import { Input } from '@admincn/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@admincn/components/ui/select';

import type { EvaluationOutcome, EvaluationRecord } from '../../types';
import { paginate, totalPages } from '../../utils/pagination';
import { downloadEvaluationPdf } from '../../utils/exportEvaluationPdf';
import { UserPagination } from '../inscrieri/EnrollmentPagination';
import { EvaluationTable } from '../evaluari/EvaluationTable';
import { buildEvaluationColumns } from '../evaluari/evaluation-table-columns';

const OUTCOME_FILTER: { value: EvaluationOutcome | 'all'; label: string }[] = [
  { value: 'all', label: 'Toate rezultatele' },
  { value: 'promovat', label: 'Promovat' },
  { value: 'in_asteptare', label: 'În așteptare' },
  { value: 'respins', label: 'Respins' },
];

export function EvaluariPage({ evaluations }: { evaluations: EvaluationRecord[] }) {
  const [search, setSearch] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState<EvaluationOutcome | 'all'>('all');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return evaluations.filter((row) => {
      if (outcomeFilter !== 'all' && row.outcome !== outcomeFilter) return false;
      if (!q) return true;
      return (
        row.studentName.toLowerCase().includes(q) ||
        row.studentEmail.toLowerCase().includes(q) ||
        row.courseTitle.toLowerCase().includes(q) ||
        row.cohortLabel.toLowerCase().includes(q)
      );
    });
  }, [evaluations, search, outcomeFilter]);

  const pages = Math.max(1, totalPages(filtered.length, rowsPerPage));
  const safePage = Math.min(page, pages);
  const pageRows = paginate(filtered, safePage, rowsPerPage);

  useEffect(() => {
    setPage(1);
  }, [search, outcomeFilter, rowsPerPage]);

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  const handleDownloadPdf = useCallback(async (record: EvaluationRecord) => {
    setDownloadingId(record.id);
    try {
      await downloadEvaluationPdf(record);
      toast.success('PDF descărcat', {
        description: `Fișa de evaluare pentru ${record.studentName} a fost salvată.`,
      });
    } catch {
      toast.error('Export PDF eșuat', {
        description: 'Reîncercați sau verificați dacă browserul permite descărcări.',
      });
    } finally {
      setDownloadingId(null);
    }
  }, []);

  const columns = useMemo(
    () => buildEvaluationColumns(handleDownloadPdf, downloadingId),
    [handleDownloadPdf, downloadingId]
  );

  const showingFrom = filtered.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const showingTo = Math.min(safePage * rowsPerPage, filtered.length);

  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Evaluări cursanți</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Fișe de evaluare pentru programele acreditate. Exportul PDF folosește identitatea vizuală
          CursuriSpecializare (Academic Blue) — același stil ca pe cursurispecializare.ro.
        </p>
      </div>

      <Card className="py-0 shadow-none">
        <div className="w-full">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
            <Input
              placeholder="Caută cursant, curs sau grupă…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex flex-wrap items-center gap-2">
              <Select
                items={OUTCOME_FILTER.map((opt) => ({ label: opt.label, value: opt.value }))}
                value={outcomeFilter}
                onValueChange={(v: string | null) => {
                  if (v) setOutcomeFilter(v as EvaluationOutcome | 'all');
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rezultat" />
                </SelectTrigger>
                <SelectContent>
                  {OUTCOME_FILTER.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                items={[10, 20, 50].map((n) => ({
                  label: `${n} / pagină`,
                  value: String(n),
                }))}
                value={String(rowsPerPage)}
                onValueChange={(v: string | null) => {
                  if (v) setRowsPerPage(Number(v));
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 50].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} / pagină
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <EvaluationTable rows={pageRows} columns={columns} />
          <UserPagination
            showingFrom={showingFrom}
            showingTo={showingTo}
            total={filtered.length}
            currentPage={safePage}
            totalPages={pages}
            onPageChange={setPage}
          />
        </div>
      </Card>
    </div>
  );
}
