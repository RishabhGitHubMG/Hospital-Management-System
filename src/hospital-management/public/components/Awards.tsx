import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';
import StarRateIcon from '@mui/icons-material/StarRate';

interface Award {
  id: number;
  title: string;
  issuer: string;
  year: number;
  description: string;
  icon: React.ReactNode;
}

const awards: Award[] = [
  {
    id: 1,
    title: 'Joint Commission Accreditation',
    issuer: 'The Joint Commission',
    year: 2023,
    description: 'Highest standards of patient safety and healthcare quality',
    icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
  },
  {
    id: 2,
    title: 'Best Hospital Award',
    issuer: 'National Health Care Awards',
    year: 2023,
    description: 'Recognition for excellence in patient care and outcomes',
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
  },
  {
    id: 3,
    title: 'Patient Safety Excellence',
    issuer: 'Healthcare Quality Commission',
    year: 2022,
    description: 'Zero medication errors for 2+ consecutive years',
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
  },
  {
    id: 4,
    title: '5-Star Patient Satisfaction',
    issuer: 'CMS Patient Satisfaction Survey',
    year: 2023,
    description: 'Consistently rated highest in patient satisfaction scores',
    icon: <StarRateIcon sx={{ fontSize: 40 }} />,
  },
];

export default function Awards() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 1,
            textAlign: 'center',
            color: '#333',
          }}
        >
          Awards & Accreditations
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: '#666',
            mb: 4,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Our commitment to excellence and patient safety is recognized by leading healthcare organizations
        </Typography>

        <Grid container spacing={3}>
          {awards.map((award) => (
            <Grid item xs={12} sm={6} md={3} key={award.id} className="stagger-item">
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ py: 3 }}>
                  <Box sx={{ color: '#ff9800', mb: 2, display: 'flex', justifyContent: 'center' }}>
                    {award.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#333',
                      mb: 1,
                    }}
                  >
                    {award.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#1976d2',
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {award.issuer}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#999',
                      display: 'block',
                      mb: 1.5,
                    }}
                  >
                    {award.year}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      lineHeight: 1.6,
                    }}
                  >
                    {award.description}
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
