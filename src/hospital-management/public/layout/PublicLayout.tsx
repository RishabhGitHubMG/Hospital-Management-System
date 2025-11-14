import React from 'react';
import { Box } from '@mui/material';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PublicHeader />
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      <PublicFooter />
    </Box>
  );
}
