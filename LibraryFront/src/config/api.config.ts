export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5057/api',
  ENDPOINTS: {
    LIBROS: '/Libros',
  },
  DEFAULT_PAGE_SIZE: 9,
};
