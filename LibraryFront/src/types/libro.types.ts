export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  genero: string;
  fechaPublicacion: string; // ISO date string from API
}

export interface CreateLibroDto {
  titulo: string;
  autor: string;
  descripcion: string;
  genero: string;
  fechaPublicacion: string; // ISO date string (YYYY-MM-DD)
}

export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
