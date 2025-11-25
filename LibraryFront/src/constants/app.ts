export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 9,
  MIN_PAGE_SIZE: 5,
  MAX_PAGE_SIZE: 100,
} as const;

export const DEBOUNCE_DELAY = {
  SEARCH: 500,
  INPUT: 300,
} as const;

export const CACHE_DURATION = {
  SHORT: 60 * 1000, // 1 minuto
  MEDIUM: 5 * 60 * 1000, // 5 minutos
  LONG: 30 * 60 * 1000, // 30 minutos
} as const;
