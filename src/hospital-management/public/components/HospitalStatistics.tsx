import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import AwardsIcon from '@mui/icons-material/EmojiEvents';

interface Statistic {
  id: number;
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const statistics: Statistic[] = [
  {
    id: 1,
    label: 'Hospital Beds',
    value: '500+',
    icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
    color: '#1976d2',
  },
  {
    id: 2,
    label: 'Expert Doctors',
    value: '250+',
    icon: <PersonIcon sx={{ fontSize: 40 }} />,
    color: '#d32f2f',
  },
  {
    id: 3,
    label: 'Patients Served',
    value: '50K+',
    icon: <GroupIcon sx={{ fontSize: 40 }} />,
    color: '#2e7d32',
  },
  {
    id: 4,
    label: 'Years of Excellence',
    value: '25+',
    icon: <AwardsIcon sx={{ fontSize: 40 }} />,
    color: '#ff9800',
  },
];

export default function HospitalStatistics() {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        color: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 1,
            textAlign: 'center',
          }}
        >
          Why Choose HealthHub Hospital?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            mb: 4,
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Leading healthcare provider with state-of-the-art facilities and compassionate care
        </Typography>

        <Grid container spacing={3}>
          {statistics.map((stat, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={stat.id}
              className="stagger-item"
            >
              <Card
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardContent sx={{ py: 3 }}>
                  <Box
                    sx={{
                      color: stat.color,
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: stat.color,
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
