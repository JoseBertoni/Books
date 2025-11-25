import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface InfoItemProps {
  icon: ReactNode;
  text: string;
  variant?: 'body1' | 'body2';
}

export const InfoItem = ({ icon, text, variant = 'body2' }: InfoItemProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Typography variant={variant} color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};
