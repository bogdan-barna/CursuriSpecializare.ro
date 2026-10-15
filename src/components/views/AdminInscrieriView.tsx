import React, { useEffect, useMemo, useState } from 'react';
import { EnrollmentRecord, EnrollmentStatus } from '../../types';
import { Pagination } from '../ui/Pagination';
import { DEFAULT_PAGE_SIZE, paginate, totalPages } from '../../utils/pagination';
import { ClipboardList, Search, Filter } from 'lucide-react';

interface AdminInscrieriViewProps {
  enrollments: EnrollmentRecord[];
  onUpdateStatus: (id: string, status: EnrollmentStatus) => void;
  isDarkMode: boolean;
}

const STATUS_LABELS: Record<EnrollmentStatus, string> = {
  pending: 'În așteptare',
  confirmed: 'Confirmată',
  cancelled: 'Anulată',
};

const STATUS_STYLES: Record<EnrollmentStatus, string> = {
  pending: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  confirmed: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  cancelled: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
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

export const AdminInscrieriView: React.FC<AdminInscrieriViewProps> = ({
  enrollments,
  onUpdateStatus,
  isDarkMode,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<EnrollmentStatus | 'all'>('all');
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

  const pages = totalPages(filtered.length, DEFAULT_PAGE_SIZE);
  const safePage = Math.min(page, pages);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  const pageRows: EnrollmentRecord[] = paginate(filtered, safePage, DEFAULT_PAGE_SIZE);

  return (
    <div className="space-y-8 pb-16">
      <div
        className={`rounded-[8px] border px-4 py-3 text-sm ${
          isDarkMode
            ? 'bg-amber-950/30 border-amber-700/40 text-amber-100'
            : 'bg-amber-50 border-amber-200 text-amber-950'
        }`}
        role="status"
      >
        <strong>Demo design system</strong> — az éles admin és a valódi înscrieri lista a{' '}
        <a
          href="https://www.cursurispecializare.ro/admin/inscrieri"
          className="font-semibold underline text-[#004CCA] dark:text-[#60A5FA]"
          target="_blank"
          rel="noreferrer"
        >
          cursurispecializare.ro/admin/inscrieri
        </a>{' '}
        oldalon fut (Lovable). A lapozás ott a <code className="text-xs">lovable-src/</code> mappa
        fájljaival telepíthető.
      </div>
      <div>
        <span className="text-xs font-bold tracking-widest text-[#004CCA] uppercase">
          ADMINISTRARE PLATFORMĂ
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-1">
          <div>
            <h1
              className={`text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-[#0B1C30]'
              }`}
            >
              <ClipboardList className="w-8 h-8 text-[#0062FF]" />
              Înscrieri la cursuri
            </h1>
            <p
              className={`mt-2 text-sm max-w-2xl ${
                isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
              }`}
            >
              Lista solicitărilor de înscriere primite din catalogul public. Folosiți filtrele și
              paginarea pentru volume mari de date.
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-[8px] border text-sm font-semibold ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44] text-[#60A5FA]'
                : 'bg-[#EFF4FF] border-[#DCE9FF] text-[#004CCA]'
            }`}
          >
            Total: {enrollments.length} înscrieri
          </div>
        </div>
      </div>

      <div
        className={`rounded-[8px] border overflow-hidden ${
          isDarkMode ? 'bg-[#0F1D32] border-[#1E2E44]' : 'bg-white border-[#E2E8F0] shadow-sm'
        }`}
      >
        <div
          className={`p-4 sm:p-5 flex flex-col lg:flex-row gap-3 border-b ${
            isDarkMode ? 'border-[#1E2E44]' : 'border-[#E2E8F0]'
          }`}
        >
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? 'text-[#64748B]' : 'text-[#94A3B8]'
              }`}
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Căutare după nume, email sau curs…"
              className={`w-full pl-10 pr-4 py-2.5 rounded-[8px] border text-sm focus:outline-none focus:ring-2 focus:ring-[#0062FF] ${
                isDarkMode
                  ? 'bg-[#132338] border-[#1E2E44] text-white placeholder:text-[#64748B]'
                  : 'bg-[#F8F9FF] border-[#E2E8F0] text-[#0B1C30]'
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${isDarkMode ? 'text-[#64748B]' : 'text-[#94A3B8]'}`} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as EnrollmentStatus | 'all')}
              className={`py-2.5 px-3 rounded-[8px] border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0062FF] ${
                isDarkMode
                  ? 'bg-[#132338] border-[#1E2E44] text-white'
                  : 'bg-white border-[#E2E8F0] text-[#0B1C30]'
              }`}
            >
              <option value="all">Toate statusurile</option>
              <option value="pending">În așteptare</option>
              <option value="confirmed">Confirmate</option>
              <option value="cancelled">Anulate</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[720px]">
            <thead
              className={`text-xs uppercase tracking-wide font-semibold ${
                isDarkMode ? 'bg-[#132338] text-[#94A3B8]' : 'bg-[#F8F9FF] text-[#64748B]'
              }`}
            >
              <tr>
                <th className="px-4 py-3 font-semibold">Participant</th>
                <th className="px-4 py-3 font-semibold">Curs</th>
                <th className="px-4 py-3 font-semibold">Data</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className={`px-4 py-12 text-center ${
                      isDarkMode ? 'text-[#64748B]' : 'text-[#94A3B8]'
                    }`}
                  >
                    Nu există înscrieri care să corespundă filtrelor.
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-t ${
                      isDarkMode ? 'border-[#1E2E44] hover:bg-[#132338]/60' : 'border-[#E2E8F0] hover:bg-[#F8F9FF]/80'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#0B1C30]'}`}>
                        {row.studentName}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                        {row.studentEmail}
                      </div>
                    </td>
                    <td className={`px-4 py-3 max-w-[220px] ${isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'}`}>
                      {row.courseTitle}
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                      {formatDate(row.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[row.status]}`}
                      >
                        {STATUS_LABELS[row.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <select
                        value={row.status}
                        onChange={(e) => onUpdateStatus(row.id, e.target.value as EnrollmentStatus)}
                        className={`text-xs py-1.5 px-2 rounded-[6px] border font-medium focus:outline-none focus:ring-2 focus:ring-[#0062FF] ${
                          isDarkMode
                            ? 'bg-[#132338] border-[#1E2E44] text-white'
                            : 'bg-white border-[#E2E8F0] text-[#0B1C30]'
                        }`}
                        aria-label={`Schimbă status pentru ${row.studentName}`}
                      >
                        <option value="pending">În așteptare</option>
                        <option value="confirmed">Confirmată</option>
                        <option value="cancelled">Anulată</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 sm:px-5 pb-5">
          <Pagination
            currentPage={safePage}
            totalPages={pages}
            pageSize={DEFAULT_PAGE_SIZE}
            totalItems={filtered.length}
            onPageChange={setPage}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};
