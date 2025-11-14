import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
  InputAdornment,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('admin@hospital.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email && password) {
      onLoginSuccess();
    } else {
      setError('Please enter both email and password');
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <CardContent sx={{ p: 4 }}>
            {/* Logo Section */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  borderRadius: '12px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  mb: 2,
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 1,
                }}
              >
                Hospital Management System
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Sign in to your account
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#999', mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#999', mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2">Remember me</Typography>
                  }
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: '#1976d2',
                    cursor: 'pointer',
                    fontWeight: '500',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot password?
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  backgroundColor: '#1976d2',
                  py: 1.5,
                  fontWeight: '600',
                  textTransform: 'none',
                  fontSize: '16px',
                  mt: 2,
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Divider */}
            <Box sx={{ position: 'relative', my: 3 }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: '#e0e0e0',
                }}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  position: 'relative',
                  backgroundColor: 'white',
                  display: 'inline-block',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  px: 1,
                }}
              >
                Demo Credentials
              </Typography>
            </Box>

            {/* Demo Info */}
            <Card
              sx={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                p: 1.5,
              }}
            >
              <Typography variant="caption" sx={{ color: '#666' }}>
                <strong>Email:</strong> admin@hospital.com
              </Typography>
              <br />
              <Typography variant="caption" sx={{ color: '#666' }}>
                <strong>Password:</strong> password123
              </Typography>
            </Card>

            {/* Footer */}
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: 'block', textAlign: 'center', mt: 3 }}
            >
              © 2024 Hospital Management System. All rights reserved.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
