import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Fade,
} from '@mui/material';
import { CalendarToday, Person, Category } from '@mui/icons-material';
import type { Libro } from '../../types/libro.types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { InfoItem } from '../common';

interface LibroCardProps {
  libro: Libro;
}

export const LibroCard = ({ libro }: LibroCardProps) => {
  const formatearFecha = (fecha: string) => {
    try {
      return format(new Date(fecha), 'dd MMMM yyyy', { locale: es });
    } catch {
      return fecha;
    }
  };

  return (
    <Fade in timeout={500}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 6,
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {libro.titulo}
          </Typography>

          <Box sx={{ mb: 1 }}>
            <InfoItem
              icon={<Person fontSize="small" color="action" />}
              text={libro.autor}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InfoItem
              icon={<CalendarToday fontSize="small" color="action" />}
              text={formatearFecha(libro.fechaPublicacion)}
            />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {libro.descripcion}
          </Typography>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Chip
            icon={<Category />}
            label={libro.genero}
            color="primary"
            variant="outlined"
            size="small"
          />
        </CardActions>
      </Card>
    </Fade>
  );
};
