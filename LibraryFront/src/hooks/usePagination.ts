import { useState, useCallback } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

export const usePagination = ({
  initialPage = 1,
  initialPageSize = 10,
  onPageChange,
}: UsePaginationProps = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      onPageChange?.(page, pageSize);
    },
    [pageSize, onPageChange]
  );

  const nextPage = useCallback(() => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    onPageChange?.(newPage, pageSize);
  }, [currentPage, pageSize, onPageChange]);

  const previousPage = useCallback(() => {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
    onPageChange?.(newPage, pageSize);
  }, [currentPage, pageSize, onPageChange]);

  const changePageSize = useCallback(
    (newSize: number) => {
      setPageSize(newSize);
      setCurrentPage(1);
      onPageChange?.(1, newSize);
    },
    [onPageChange]
  );

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSize(initialPageSize);
  }, [initialPage, initialPageSize]);

  return {
    currentPage,
    pageSize,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    reset,
  };
};
