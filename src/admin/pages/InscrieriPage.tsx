import { useEffect, useMemo, useState } from 'react';

import { Card } from '@admincn/components/ui/card';
import { UserPagination } from '../inscrieri/EnrollmentPagination';

import type { EnrollmentRecord, EnrollmentStatus } from '../../types';
import { paginate, totalPages } from '../../utils/pagination';
import { EnrollmentFilters } from '../inscrieri/EnrollmentFilters';
import { EnrollmentToolbar } from '../inscrieri/EnrollmentToolbar';
import { EnrollmentTable } from '../inscrieri/EnrollmentTable';
import { buildEnrollmentColumns } from '../inscrieri/enrollment-table-columns';

export function InscrieriPage({
  enrollments,
  onUpdateStatus,
}: {
  enrollments: EnrollmentRecord[];
  onUpdateStatus: (id: string, status: EnrollmentStatus) => void;
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<EnrollmentStatus | 'all'>('all');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enrollments.filter((row) => {
      if (statusFilter !== 'all' && row.status !== statusFilter) return false;
      if (!q) return true;
      return (
        row.studentName.toLowerCase().includes(q) ||
        row.studentEmail.toLowerCase().includes(q) ||
        row.courseTitle.toLowerCase().includes(q)
      );
    });
  }, [enrollments, search, statusFilter]);

  const pages = Math.max(1, totalPages(filtered.length, rowsPerPage));
  const safePage = Math.min(page, pages);
  const pageRows = paginate(filtered, safePage, rowsPerPage);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, rowsPerPage]);

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  const columns = useMemo(() => buildEnrollmentColumns(onUpdateStatus), [onUpdateStatus]);

  const showingFrom = filtered.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const showingTo = Math.min(safePage * rowsPerPage, filtered.length);

  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Înscrieri la cursuri</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Gestionați solicitările primite din catalogul public. Datele demo sunt stocate local în
          browser; platforma de producție rulează pe cursurispecializare.ro.
        </p>
      </div>

      <Card className="py-0 shadow-none">
        <div className="w-full">
          <div className="border-b">
            <EnrollmentFilters status={statusFilter} onStatusChange={setStatusFilter} />
            <EnrollmentToolbar
              search={search}
              rowsPerPage={rowsPerPage}
              onSearch={setSearch}
              onRowsPerPageChange={setRowsPerPage}
            />
            <EnrollmentTable rows={pageRows} columns={columns} />
          </div>
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
