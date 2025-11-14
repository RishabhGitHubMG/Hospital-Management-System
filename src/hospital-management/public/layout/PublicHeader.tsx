import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function PublicHeader() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Find a Doctor', path: '/doctors' },
    { label: 'Services', path: '/#services' },
    { label: 'Contact', path: '/#contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#ffffff', color: '#1976d2', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '70px' }}>
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                flex: 1,
              }}
              onClick={() => navigate('/')}
            >
              <LocalHospitalIcon sx={{ fontSize: 32, color: '#1976d2' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', margin: 0 }}>
                  HealthHub
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Hospital
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    window.location.hash = item.path.split('#')[1] || '';
                  }}
                  sx={{
                    color: '#333',
                    textTransform: 'none',
                    fontSize: '16px',
                    '&:hover': { color: '#1976d2' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Auth Buttons - Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' },
                }}
              >
                Patient Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{
                  backgroundColor: '#1976d2',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                Staff Login
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#1976d2' }}
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer anchor="right" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 700 }}>
              Menu
            </Typography>
            <IconButton onClick={toggleMobileMenu} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ sx: { color: '#333' } }}
                />
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                navigate('/login');
                setMobileMenuOpen(false);
              }}
              sx={{
                borderColor: '#1976d2',
                color: '#1976d2',
                textTransform: 'none',
              }}
            >
              Patient Login
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                navigate('/login');
                setMobileMenuOpen(false);
              }}
              sx={{
                backgroundColor: '#1976d2',
                textTransform: 'none',
              }}
            >
              Staff Login
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
