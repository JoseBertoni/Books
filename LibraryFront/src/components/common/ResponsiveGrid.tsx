import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
}

export const ResponsiveGrid = ({ 
  children, 
  columns = { xs: 1, sm: 2, md: 3 },
  gap = 3 
}: ResponsiveGridProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(${columns.xs || 1}, 1fr)`,
          sm: `repeat(${columns.sm || 2}, 1fr)`,
          md: `repeat(${columns.md || 3}, 1fr)`,
          lg: `repeat(${columns.lg || columns.md || 3}, 1fr)`,
        },
        gap,
      }}
    >
      {children}
    </Box>
  );
};
