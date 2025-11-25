import { Box, Pagination } from '@mui/material';
import { LibroCard } from '../LibroCard/LibroCard';
import { useLibros } from '../../context/LibrosContext';
import { MenuBook } from '@mui/icons-material';
import { LoadingSpinner, EmptyState, ResponsiveGrid } from '../common';

export const LibroList = () => {
  const { libros, loading, paginationInfo, fetchLibros } = useLibros();

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    fetchLibros(page, paginationInfo?.pageSize);
  };

  if (loading) {
    return <LoadingSpinner message="Cargando libros..." />;
  }

  if (libros.length === 0) {
    return (
      <EmptyState
        icon={<MenuBook sx={{ fontSize: 80, color: 'text.secondary' }} />}
        title="No hay libros disponibles"
        description="Agrega tu primer libro usando el formulario"
      />
    );
  }

  return (
    <Box>
      <ResponsiveGrid>
        {libros.map((libro) => (
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </ResponsiveGrid>

      {paginationInfo && paginationInfo.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={paginationInfo.totalPages}
            page={paginationInfo.pageNumber}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};
