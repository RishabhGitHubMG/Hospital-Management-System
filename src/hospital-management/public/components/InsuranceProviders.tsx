import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VerifiedIcon from '@mui/icons-material/Verified';

interface Insurance {
  id: number;
  name: string;
  coverage: string[];
}

const insuranceProviders: Insurance[] = [
  {
    id: 1,
    name: 'United Healthcare',
    coverage: ['Medical', 'Dental', 'Vision', 'Prescription'],
  },
  {
    id: 2,
    name: 'Aetna',
    coverage: ['Medical', 'Pharmacy', 'Mental Health'],
  },
  {
    id: 3,
    name: 'Cigna',
    coverage: ['Medical', 'Dental', 'Vision', 'Wellness'],
  },
  {
    id: 4,
    name: 'Blue Cross Blue Shield',
    coverage: ['Medical', 'Prescription', 'Behavioral Health'],
  },
  {
    id: 5,
    name: 'Humana',
    coverage: ['Medical', 'Dental', 'Medicare Advantage'],
  },
  {
    id: 6,
    name: 'Medicare',
    coverage: ['Parts A', 'B', 'C', 'D'],
  },
  {
    id: 7,
    name: 'Medicaid',
    coverage: ['Full Coverage', 'Emergency', 'Preventive Care'],
  },
  {
    id: 8,
    name: 'Tricare',
    coverage: ['Military', 'Veterans', 'Families'],
  },
];

export default function InsuranceProviders() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: '#f5f5f5' }}>
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
          Insurance We Accept
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
          We accept most major insurance plans. Please contact our billing department for specific coverage questions.
        </Typography>

        <Grid container spacing={2}>
          {insuranceProviders.map((provider, index) => (
            <Grid item xs={12} sm={6} md={3} key={provider.id} className="stagger-item">
              <Card
                sx={{
                  height: '100%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                    <CreditCardIcon sx={{ color: '#1976d2', fontSize: 24 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#333',
                      }}
                    >
                      {provider.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {provider.coverage.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        size="small"
                        icon={<VerifiedIcon />}
                        sx={{
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          '& .MuiChip-icon': {
                            color: '#1976d2',
                          },
                        }}
                      />
                    ))}
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 2,
                      color: '#999',
                      fontSize: '12px',
                    }}
                  >
                    ✓ Accepted at all facilities
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
            Don't see your insurance provider listed?
          </Typography>
          <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 600 }}>
            Contact our billing department at +1 (555) 123-4567 or billing@healthhub.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
