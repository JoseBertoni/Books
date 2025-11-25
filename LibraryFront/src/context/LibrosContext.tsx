import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Libro, CreateLibroDto, PaginatedResponse } from '../types/libro.types';
import { libroService } from '../services/api.service';

interface LibrosContextType {
  libros: Libro[];
  loading: boolean;
  error: string | null;
  paginationInfo: Omit<PaginatedResponse<Libro>, 'items'> | null;
  searchTerm: string;
  generoFilter: string;
  fetchLibros: (pageNumber?: number, pageSize?: number) => Promise<void>;
  createLibro: (libro: CreateLibroDto) => Promise<Libro>;
  setSearchTerm: (term: string) => void;
  setGeneroFilter: (genero: string) => void;
  clearError: () => void;
}

const LibrosContext = createContext<LibrosContextType | undefined>(undefined);

export const useLibros = () => {
  const context = useContext(LibrosContext);
  if (!context) {
    throw new Error('useLibros debe usarse dentro de LibrosProvider');
  }
  return context;
};

interface LibrosProviderProps {
  children: ReactNode;
}

export const LibrosProvider = ({ children }: LibrosProviderProps) => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paginationInfo, setPaginationInfo] = useState<Omit<PaginatedResponse<Libro>, 'items'> | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [generoFilter, setGeneroFilter] = useState<string>('Todos');

  const fetchLibros = useCallback(async (pageNumber: number = 1, pageSize: number = 9) => {
    setLoading(true);
    setError(null);
    try {
      const response = await libroService.getLibros(pageNumber, pageSize, searchTerm, generoFilter);
      setLibros(response.items);
      setPaginationInfo({
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalCount: response.totalCount,
        hasPreviousPage: response.hasPreviousPage,
        hasNextPage: response.hasNextPage,
      });
    } catch (err: any) {
      setError(err.message || 'Error al cargar los libros');
      setLibros([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, generoFilter]);

  const createLibro = useCallback(async (libro: CreateLibroDto): Promise<Libro> => {
    setLoading(true);
    setError(null);
    try {
      const nuevoLibro = await libroService.createLibro(libro);
      // Refrescar la lista actual
      if (paginationInfo) {
        await fetchLibros(paginationInfo.pageNumber, paginationInfo.pageSize);
      } else {
        await fetchLibros();
      }
      return nuevoLibro;
    } catch (err: any) {
      const errorMessage = err.errors 
        ? Object.values(err.errors).flat().join(', ')
        : err.message || 'Error al crear el libro';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchLibros, paginationInfo]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: LibrosContextType = {
    libros,
    loading,
    error,
    paginationInfo,
    searchTerm,
    generoFilter,
    fetchLibros,
    createLibro,
    setSearchTerm,
    setGeneroFilter,
    clearError,
  };

  return <LibrosContext.Provider value={value}>{children}</LibrosContext.Provider>;
};
