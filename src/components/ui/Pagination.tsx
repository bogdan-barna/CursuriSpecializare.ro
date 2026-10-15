import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buildPageRange } from '../../utils/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isDarkMode: boolean;
  itemLabel?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages: total,
  pageSize,
  totalItems,
  onPageChange,
  isDarkMode,
  itemLabel = 'înscrieri',
}) => {
  if (totalItems === 0) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  const pages = buildPageRange(currentPage, total);

  const navBtnClass = (disabled: boolean) =>
    `inline-flex items-center justify-center w-9 h-9 rounded-[8px] border text-sm font-medium transition-colors ${
      disabled
        ? 'opacity-40 cursor-not-allowed border-transparent'
        : isDarkMode
        ? 'border-[#1E2E44] text-[#CBD5E1] hover:bg-[#1E2E44]'
        : 'border-[#E2E8F0] text-[#475569] hover:bg-[#EFF4FF]'
    }`;

  const pageBtnClass = (active: boolean) =>
    `min-w-[2.25rem] h-9 px-2 rounded-[8px] text-sm font-semibold transition-colors ${
      active
        ? 'bg-[#004CCA] text-white shadow-sm'
        : isDarkMode
        ? 'text-[#CBD5E1] hover:bg-[#1E2E44]'
        : 'text-[#475569] hover:bg-[#EFF4FF]'
    }`;

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t ${
        isDarkMode ? 'border-[#1E2E44]' : 'border-[#E2E8F0]'
      }`}
    >
      <p className={`text-sm ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
        Afișare{' '}
        <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#0B1C30]'}`}>
          {start}–{end}
        </span>{' '}
        din{' '}
        <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#0B1C30]'}`}>
          {totalItems}
        </span>{' '}
        {itemLabel}
      </p>

      <nav className="flex items-center gap-1" aria-label="Paginare">
        <button
          type="button"
          aria-label="Pagina anterioară"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={navBtnClass(currentPage <= 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((item, idx) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${idx}`}
              className={`px-1 text-sm ${isDarkMode ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Pagina ${item}`}
              aria-current={item === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(item)}
              className={pageBtnClass(item === currentPage)}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          aria-label="Pagina următoare"
          disabled={currentPage >= total}
          onClick={() => onPageChange(currentPage + 1)}
          className={navBtnClass(currentPage >= total)}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
};
