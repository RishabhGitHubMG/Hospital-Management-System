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
  Grid,
  Paper,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../context/AuthContext';
import { roleDisplayNames, roleColors } from '../utils/rolePermissions';
import { UserRole } from '../context/AuthContext';

interface LoginProps {
  onLoginSuccess: () => void;
}

const demoCredentials: Record<UserRole, { email: string; password: string; description: string }> = {
  administrator: {
    email: 'admin@hospital.com',
    password: 'password123',
    description: 'Full system access and control',
  },
  doctor: {
    email: 'doctor@hospital.com',
    password: 'password123',
    description: 'Patient care and diagnosis',
  },
  nurse: {
    email: 'nurse@hospital.com',
    password: 'password123',
    description: 'Patient vitals and care assistance',
  },
  lab_technician: {
    email: 'lab@hospital.com',
    password: 'password123',
    description: 'Lab tests and results',
  },
  pharmacist: {
    email: 'pharmacist@hospital.com',
    password: 'password123',
    description: 'Pharmacy and inventory',
  },
  receptionist: {
    email: 'receptionist@hospital.com',
    password: 'password123',
    description: 'Patient registration and appointments',
  },
  billing: {
    email: 'billing@hospital.com',
    password: 'password123',
    description: 'Financial transactions and invoicing',
  },
  patient: {
    email: 'patient@hospital.com',
    password: 'password123',
    description: 'Personal health and appointments',
  },
};

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('admin@hospital.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('administrator');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      onLoginSuccess();
    } catch {
      setError('Invalid email or password');
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    const creds = demoCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setSelectedRole(role);
    setError('');
  };

  const quickLogin = async (role: UserRole) => {
    const creds = demoCredentials[role];
    try {
      await login(creds.email, creds.password);
      onLoginSuccess();
    } catch {
      setError('Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Left Side - Login Form */}
          <Grid item xs={12} sm={12} md={5}>
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
                    Hospital Management
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
          </Grid>

          {/* Right Side - Demo Roles */}
          <Grid item xs={12} sm={12} md={7}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Demo User Roles
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  mb: 3,
                }}
              >
                Click any role below to quickly login with demo credentials
              </Typography>

              <Grid container spacing={2}>
                {(Object.keys(demoCredentials) as UserRole[]).map((role) => (
                  <Grid item xs={12} sm={6} key={role}>
                    <Paper
                      onClick={() => quickLogin(role)}
                      sx={{
                        p: 2.5,
                        cursor: 'pointer',
                        backgroundColor: selectedRole === role ? roleColors[role] : 'white',
                        color: selectedRole === role ? 'white' : '#333',
                        border: selectedRole === role ? `3px solid ${roleColors[role]}` : '2px solid #e0e0e0',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                          transform: 'translateY(-2px)',
                          backgroundColor: selectedRole === role ? roleColors[role] : '#f9f9f9',
                        },
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: '600', mb: 0.5 }}>
                        {roleDisplayNames[role]}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.85 }}>
                        {demoCredentials[role].description}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
                        {demoCredentials[role].email}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Info Card */}
              <Paper
                sx={{
                  mt: 3,
                  p: 2,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: '8px',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: '600', mb: 1, color: '#333' }}>
                  ℹ️ Demo Information
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', lineHeight: 1.6 }}>
                  All demo credentials use the password: <strong>password123</strong>
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 1, lineHeight: 1.6 }}>
                  Each role has different permissions and access levels within the Hospital Management System.
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
