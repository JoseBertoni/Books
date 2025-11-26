import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../../hooks/usePagination';

describe('usePagination', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(10);
  });

  it('should initialize with custom values', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 5, initialPageSize: 20 })
    );

    expect(result.current.currentPage).toBe(5);
    expect(result.current.pageSize).toBe(20);
  });

  it('should go to specific page', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
  });

  it('should go to next page', () => {
    const { result } = renderHook(() => usePagination({ initialPage: 2 }));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(3);
  });

  it('should go to previous page', () => {
    const { result } = renderHook(() => usePagination({ initialPage: 3 }));

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  it('should not go below page 1', () => {
    const { result } = renderHook(() => usePagination({ initialPage: 1 }));

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('should change page size', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.changePageSize(25);
    });

    expect(result.current.pageSize).toBe(25);
    expect(result.current.currentPage).toBe(1); // Should reset to page 1
  });

  it('should reset pagination', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 1, initialPageSize: 10 })
    );

    act(() => {
      result.current.goToPage(5);
      result.current.changePageSize(20);
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(20);

    act(() => {
      result.current.reset();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(10);
  });
});
