import { useEffect, useMemo, useState } from 'react';
import { ADMIN_TABLE_PAGE_SIZE, tablePageCount } from '../components/admin/TablePagination';

/**
 * Éles admin /admin/inscrieri (Lovable):
 *
 * 1. Másold be: src/hooks/useAdminTablePagination.ts
 * 2. A route fájlban (admin/inscrieri/index.tsx), a szűrt+rendezett `G` tömb után:
 *
 *    const { page, setPage, pagedRows, totalPages } = useAdminTablePagination(G);
 *
 * 3. Cseréld `G.map` → `pagedRows.map` (desktop táblázat + mobil kártyák).
 * 4. A táblázat alá:
 *
 *    <TablePagination page={page} totalItems={G.length} onPageChange={setPage} />
 *
 * 5. Szűrő változásakor reset (hook automatikusan resetel, ha `rows` referencia változik
 *    szűrő state miatt — külön useEffect a route-ban: setPage(1) when filters change).
 */
export function useAdminTablePagination<T>(
  rows: T[],
  pageSize = ADMIN_TABLE_PAGE_SIZE,
  resetDeps: unknown[] = []
) {
  const [page, setPage] = useState(1);
  const totalPages = tablePageCount(rows.length, pageSize);
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- explicit filter reset keys from route
  }, resetDeps);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, safePage, pageSize]);

  return {
    page: safePage,
    setPage,
    pageSize,
    totalPages,
    totalItems: rows.length,
    pagedRows,
  };
}
