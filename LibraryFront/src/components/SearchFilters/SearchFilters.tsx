import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useLibros } from '../../context/LibrosContext';
import { GENEROS_CON_TODOS, DEBOUNCE_DELAY } from '../../constants';

export const SearchFilters = () => {
  const { searchTerm, generoFilter, setSearchTerm, setGeneroFilter, fetchLibros } = useLibros();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        setSearchTerm(localSearchTerm);
      }
    }, DEBOUNCE_DELAY.SEARCH);

    return () => clearTimeout(timer);
  }, [localSearchTerm, searchTerm, setSearchTerm]);

  useEffect(() => {
    fetchLibros(1, 9);
  }, [searchTerm, generoFilter, fetchLibros]);

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  const handleGeneroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeneroFilter(event.target.value);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          label="Buscar por título"
          placeholder="Escribe el título del libro..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: localSearchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="limpiar búsqueda"
                    onClick={handleClearSearch}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          select
          label="Filtrar por género"
          value={generoFilter}
          onChange={handleGeneroChange}
        >
          {GENEROS_CON_TODOS.map((genero) => (
            <MenuItem key={genero} value={genero}>
              {genero}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Paper>
  );
};
