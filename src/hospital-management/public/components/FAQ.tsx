import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'How do I schedule an appointment?',
    answer:
      'You can schedule an appointment through our online portal, by calling our appointment line at +1 (555) 123-4567, or by visiting our hospital in person. We also offer virtual consultations for your convenience.',
    category: 'Appointments',
  },
  {
    id: 2,
    question: 'What insurance plans do you accept?',
    answer:
      'We accept most major insurance plans including United Healthcare, Aetna, Cigna, Blue Cross Blue Shield, and many others. Please contact our billing department to confirm your specific plan coverage.',
    category: 'Insurance',
  },
  {
    id: 3,
    question: 'Do you offer emergency services?',
    answer:
      'Yes, our emergency department is open 24/7/365. We have advanced trauma facilities and experienced emergency medicine physicians to handle all types of medical emergencies.',
    category: 'Emergency Services',
  },
  {
    id: 4,
    question: 'What are your visiting hours?',
    answer:
      'Regular visiting hours are from 10:00 AM to 8:00 PM daily. ICU and critical care visiting hours may vary. Please ask at the front desk for specific information about your family member\'s unit.',
    category: 'Hospital Policies',
  },
  {
    id: 5,
    question: 'Do you offer telehealth services?',
    answer:
      'Yes, we offer virtual consultations with many of our specialists. This is ideal for follow-up appointments, medication consultations, and non-emergency visits. Contact us to schedule a telehealth appointment.',
    category: 'Services',
  },
  {
    id: 6,
    question: 'What should I bring to my appointment?',
    answer:
      'Please bring a valid ID, insurance card (if available), any medical records from previous providers, a list of current medications, and a list of any allergies or health concerns you want to discuss.',
    category: 'Appointments',
  },
  {
    id: 7,
    question: 'Do you have parking facilities?',
    answer:
      'Yes, we have ample parking available with accessible spaces for patients with disabilities. Parking is complimentary for patients and visitors. Valet parking is available upon request.',
    category: 'Hospital Policies',
  },
  {
    id: 8,
    question: 'How do I access my medical records?',
    answer:
      'You can access your medical records through our patient portal or by submitting a written request to our medical records department. We typically provide records within 5-7 business days.',
    category: 'Medical Records',
  },
];

export default function FAQ() {
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);
  const categories = Array.from(new Set(faqItems.map((item) => item.category)));

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <HelpOutlineIcon sx={{ fontSize: 48, color: '#1976d2' }} />
          </Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: '#333',
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Find answers to common questions about our services, appointments, and hospital policies
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} md={6} key={category}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#1976d2',
                    mb: 2,
                    paddingBottom: 1,
                    borderBottom: '2px solid #1976d2',
                  }}
                >
                  {category}
                </Typography>

                {faqItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <Accordion
                      key={item.id}
                      expanded={expandedPanel === `panel-${item.id}`}
                      onChange={handleChange(`panel-${item.id}`)}
                      sx={{
                        mb: 1,
                        '&:before': { display: 'none' },
                        backgroundColor: '#ffffff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        '&.Mui-expanded': {
                          margin: 0,
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(25,118,210,0.05)',
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: '#333',
                          }}
                        >
                          {item.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          backgroundColor: '#fafafa',
                          color: '#666',
                          lineHeight: 1.7,
                        }}
                      >
                        {item.answer}
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
