/**
 * Éles site (Lovable / TanStack Start): másold be ugyanebbe a path-ba.
 * Használat: admin/inscrieri lista alján, a szűrt sorok lapozásához.
 */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEFAULT_PAGE_SIZE = 25;

export type TablePaginationProps = {
  page: number;
  pageSize?: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
};

function buildPageRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 1) return [1];
  const pages = new Set<number>([1, total]);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= total) pages.add(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | 'ellipsis')[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push('ellipsis');
    out.push(sorted[i]);
  }
  return out;
}

export function tablePageCount(totalItems: number, pageSize = DEFAULT_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function TablePagination({
  page,
  pageSize = DEFAULT_PAGE_SIZE,
  totalItems,
  onPageChange,
  itemLabel = 'înregistrări',
}: TablePaginationProps) {
  if (totalItems === 0) return null;

  const totalPages = tablePageCount(totalItems, pageSize);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, totalItems);
  const pages = buildPageRange(safePage, totalPages);

  return (
    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Afișare{' '}
        <span className="font-medium text-foreground">
          {start}–{end}
        </span>{' '}
        din <span className="font-medium text-foreground">{totalItems}</span> {itemLabel}
      </p>
      <nav className="flex items-center gap-1" aria-label="Paginare înscrieri">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-9"
          disabled={safePage <= 1}
          aria-label="Pagina anterioară"
          onClick={() => onPageChange(safePage - 1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        {pages.map((item, idx) =>
          item === 'ellipsis' ? (
            <span key={`e-${idx}`} className="px-1 text-sm text-muted-foreground">
              …
            </span>
          ) : (
            <Button
              key={item}
              type="button"
              variant={item === safePage ? 'default' : 'ghost'}
              size="sm"
              className="min-w-9"
              aria-current={item === safePage ? 'page' : undefined}
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          )
        )}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-9"
          disabled={safePage >= totalPages}
          aria-label="Pagina următoare"
          onClick={() => onPageChange(safePage + 1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </nav>
    </div>
  );
}

export { DEFAULT_PAGE_SIZE as ADMIN_TABLE_PAGE_SIZE };
