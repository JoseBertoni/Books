import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Fade,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useLibros } from '../../context/LibrosContext';
import { GENEROS } from '../../constants';
import type { CreateLibroDto } from '../../types/libro.types';

interface FormErrors {
  titulo?: string;
  autor?: string;
  descripcion?: string;
  genero?: string;
  fechaPublicacion?: string;
}

export const LibroForm = () => {
  const { createLibro, loading } = useLibros();
  const [formData, setFormData] = useState<CreateLibroDto>({
    titulo: '',
    autor: '',
    descripcion: '',
    genero: '',
    fechaPublicacion: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es obligatorio';
    } else if (formData.titulo.length > 200) {
      newErrors.titulo = 'El título no puede exceder 200 caracteres';
    }

    if (!formData.autor.trim()) {
      newErrors.autor = 'El autor es obligatorio';
    } else if (formData.autor.length > 100) {
      newErrors.autor = 'El autor no puede exceder 100 caracteres';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria';
    } else if (formData.descripcion.length > 1000) {
      newErrors.descripcion = 'La descripción no puede exceder 1000 caracteres';
    }

    if (!formData.genero) {
      newErrors.genero = 'El género es obligatorio';
    }

    if (!formData.fechaPublicacion) {
      newErrors.fechaPublicacion = 'La fecha de publicación es obligatoria';
    } else {
      const fecha = new Date(formData.fechaPublicacion);
      const hoy = new Date();
      if (fecha > hoy) {
        newErrors.fechaPublicacion = 'La fecha no puede ser futura';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createLibro(formData);
      setFormData({
        titulo: '',
        autor: '',
        descripcion: '',
        genero: '',
        fechaPublicacion: '',
      });
      setErrors({});
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      // El error ya se maneja en el contexto
    }
  };

  const handleChange = (field: keyof CreateLibroDto) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Agregar Nuevo Libro
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Título"
            value={formData.titulo}
            onChange={handleChange('titulo')}
            error={!!errors.titulo}
            helperText={errors.titulo}
            disabled={loading}
            required
          />

          <TextField
            fullWidth
            label="Autor"
            value={formData.autor}
            onChange={handleChange('autor')}
            error={!!errors.autor}
            helperText={errors.autor}
            disabled={loading}
            required
          />

          <TextField
            fullWidth
            select
            label="Género"
            value={formData.genero}
            onChange={handleChange('genero')}
            error={!!errors.genero}
            helperText={errors.genero}
            disabled={loading}
            required
          >
            {GENEROS.map((genero) => (
              <MenuItem key={genero} value={genero}>
                {genero}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="date"
            label="Fecha de Publicación"
            value={formData.fechaPublicacion}
            onChange={handleChange('fechaPublicacion')}
            error={!!errors.fechaPublicacion}
            helperText={errors.fechaPublicacion}
            disabled={loading}
            required
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />

          <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descripción"
              value={formData.descripcion}
              onChange={handleChange('descripcion')}
              error={!!errors.descripcion}
              helperText={errors.descripcion}
              disabled={loading}
              required
            />
          </Box>

          <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' }, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
              disabled={loading}
              sx={{ minWidth: 200 }}
            >
              {loading ? 'Agregando...' : 'Agregar Libro'}
            </Button>
          </Box>
        </Box>
      </Box>

      {showSuccess && (
        <Fade in={showSuccess}>
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: 'success.light',
              color: 'success.contrastText',
              borderRadius: 1,
            }}
          >
            <Typography>¡Libro agregado exitosamente!</Typography>
          </Box>
        </Fade>
      )}
    </Paper>
  );
};
