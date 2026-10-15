export const DEFAULT_PAGE_SIZE = 10;

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function totalPages(itemCount: number, pageSize: number): number {
  if (itemCount === 0) return 1;
  return Math.ceil(itemCount / pageSize);
}

/** Compact page list with first/last and ellipsis gaps (e.g. 1 … 4 5 6 … 12). */
export function buildPageRange(current: number, total: number, siblingCount = 1): (number | 'ellipsis')[] {
  if (total <= 1) return [1];

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let p = current - siblingCount; p <= current + siblingCount; p++) {
    if (p >= 1 && p <= total) pages.add(p);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | 'ellipsis')[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push('ellipsis');
    }
    result.push(sorted[i]);
  }

  return result;
}
