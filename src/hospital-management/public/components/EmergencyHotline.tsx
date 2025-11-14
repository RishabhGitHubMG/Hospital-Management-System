import React from 'react';
import { Box, Button, Typography, Tooltip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function EmergencyHotline() {
  return (
    <Tooltip title="Click to call emergency line">
      <Button
        onClick={() => window.location.href = 'tel:+15551234567'}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: '#d32f2f',
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(211, 47, 47, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          minWidth: 'unset',
          p: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: '#b71c1c',
            boxShadow: '0 6px 24px rgba(211, 47, 47, 0.6)',
            transform: 'scale(1.1)',
          },
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        <PhoneIcon sx={{ fontSize: 32 }} />
      </Button>

      {/* Info Badge */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 104,
          right: 24,
          backgroundColor: '#d32f2f',
          color: '#ffffff',
          padding: '12px 16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap',
          zIndex: 999,
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          gap: 1,
        }}
      >
        <PriorityHighIcon sx={{ fontSize: 20 }} />
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>
            Emergency Line
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '12px' }}>
            +1 (555) 123-4567
          </Typography>
        </Box>
      </Box>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(211, 47, 47, 0.4);
          }
          50% {
            box-shadow: 0 4px 30px rgba(211, 47, 47, 0.8);
          }
        }
      `}</style>
    </Tooltip>
  );
}
