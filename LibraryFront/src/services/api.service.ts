import axios, { AxiosError } from 'axios';
import { API_CONFIG } from '../config/api.config';
import type { Libro, CreateLibroDto, PaginatedResponse, ApiError } from '../types/libro.types';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const apiError: ApiError = {
        message: error.response.data?.message || 'Error en la solicitud',
        errors: error.response.data?.errors,
      };
      return Promise.reject(apiError);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      return Promise.reject({
        message: 'No se pudo conectar con el servidor. Verifica que la API esté corriendo.',
      });
    } else {
      // Algo sucedió al configurar la solicitud
      return Promise.reject({
        message: 'Error al realizar la solicitud',
      });
    }
  }
);

export const libroService = {
  async getLibros(
    pageNumber: number = 1, 
    pageSize: number = API_CONFIG.DEFAULT_PAGE_SIZE,
    searchTerm?: string,
    genero?: string
  ): Promise<PaginatedResponse<Libro>> {
    const params: any = { pageNumber, pageSize };
    
    if (searchTerm) {
      params.searchTerm = searchTerm;
    }
    
    if (genero && genero !== 'Todos') {
      params.genero = genero;
    }
    
    const response = await apiClient.get<PaginatedResponse<Libro>>(API_CONFIG.ENDPOINTS.LIBROS, {
      params,
    });
    return response.data;
  },

  async createLibro(libro: CreateLibroDto): Promise<Libro> {
    const response = await apiClient.post<Libro>(API_CONFIG.ENDPOINTS.LIBROS, libro);
    return response.data;
  },
};
