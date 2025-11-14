import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        py: 5,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Hospital Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocalHospitalIcon sx={{ fontSize: 28, color: '#1976d2' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                HealthHub Hospital
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
              Providing world-class healthcare services with compassion and excellence.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" underline="hover" sx={{ color: '#999', '&:hover': { color: '#1976d2' } }}>
                Home
              </Link>
              <Link href="/doctors" underline="hover" sx={{ color: '#999', '&:hover': { color: '#1976d2' } }}>
                Find a Doctor
              </Link>
              <Link href="/#services" underline="hover" sx={{ color: '#999', '&:hover': { color: '#1976d2' } }}>
                Services
              </Link>
              <Link href="/login" underline="hover" sx={{ color: '#999', '&:hover': { color: '#1976d2' } }}>
                Patient Login
              </Link>
            </Box>
          </Grid>

          {/* Departments */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Departments
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" underline="hover" sx={{ color: '#999', '&:hover': { color: '#1976d2' } }}>
                Cardiology
              </Link>
              <Link href="/" underline="hover" sx={{ color: '#999', '&:hover': { color: '#1976d2' } }}>
                Emergency
              </Link>
              <Link href="/" underline="hover" sx={{ color: '#999', '&:hover': { color: '#1976d2' } }}>
                Surgery
              </Link>
              <Link href="/" underline="hover" sx={{ color: '#999', '&:hover': { color: '#1976d2' } }}>
                Pediatrics
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <PhoneIcon sx={{ fontSize: 18, color: '#1976d2', mt: 0.5 }} />
                <Typography variant="body2" sx={{ color: '#999' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <EmailIcon sx={{ fontSize: 18, color: '#1976d2', mt: 0.5 }} />
                <Typography variant="body2" sx={{ color: '#999' }}>
                  info@healthhub.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <LocationOnIcon sx={{ fontSize: 18, color: '#1976d2', mt: 0.5 }} />
                <Typography variant="body2" sx={{ color: '#999' }}>
                  123 Medical Plaza, Healthcare City, HC 12345
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: '#333' }} />

        {/* Bottom Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#999' }}>
            &copy; {currentYear} HealthHub Hospital. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/" underline="hover" sx={{ color: '#999', fontSize: '14px', '&:hover': { color: '#1976d2' } }}>
              Privacy Policy
            </Link>
            <Link href="/" underline="hover" sx={{ color: '#999', fontSize: '14px', '&:hover': { color: '#1976d2' } }}>
              Terms of Service
            </Link>
            <Link href="/" underline="hover" sx={{ color: '#999', fontSize: '14px', '&:hover': { color: '#1976d2' } }}>
              Accessibility
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
