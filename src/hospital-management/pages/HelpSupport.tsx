import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import BugReportIcon from '@mui/icons-material/BugReport';

export default function HelpSupport() {
  const [expandedFaq, setExpandedFaq] = useState<string | false>(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  const faqs = [
    {
      id: 'faq-1',
      question: 'How do I register a new patient?',
      answer:
        'To register a new patient, navigate to the Patients section and click "Register New Patient". Fill in the patient details including name, age, blood type, and contact information. Click "Save Patient" to complete the registration.',
    },
    {
      id: 'faq-2',
      question: 'How can I schedule an appointment?',
      answer:
        'Go to the Appointments section and click "Schedule Appointment". Select the patient, doctor, department, date, and time. Add the reason for visit and click "Save Appointment" to confirm.',
    },
    {
      id: 'faq-3',
      question: 'How do I create an electronic health record?',
      answer:
        'In the Electronic Health Records section, click "Create New Record". Enter patient information, diagnosis, treatment details, medications, and clinical notes. All records are automatically saved and linked to the patient profile.',
    },
    {
      id: 'faq-4',
      question: 'How can I generate an invoice?',
      answer:
        'Navigate to the Billing section and click "Create Invoice". Enter patient details, service description, and amount. Choose invoice status and due date. Click "Save Invoice" to generate the invoice.',
    },
    {
      id: 'faq-5',
      question: 'How do I track inventory stock?',
      answer:
        'The Inventory Management section displays all medical supplies with real-time stock levels. Items are color-coded: green for in-stock, orange for low-stock, and red for out-of-stock. Click "Add Item" to add new inventory.',
    },
    {
      id: 'faq-6',
      question: 'Can I export data from the system?',
      answer:
        'The system currently supports viewing and printing data. Future versions will include comprehensive export functionality for PDF, Excel, and other formats.',
    },
    {
      id: 'faq-7',
      question: 'How do I change my password?',
      answer:
        'Click on your profile avatar in the top-right corner and select "Profile". Go to the "Change Password" tab and enter your current password and new password twice. Click "Change Password" to update.',
    },
    {
      id: 'faq-8',
      question: 'What are the browser requirements?',
      answer:
        'The Hospital Management System works best on modern browsers including Chrome, Firefox, Safari, and Edge. Mobile browsers are supported for responsive design.',
    },
  ];

  const handleFaqToggle = (id: string) => {
    setExpandedFaq(expandedFaq === id ? false : id);
  };

  const handleContactChange = (field: string, value: string) => {
    setContactForm({ ...contactForm, [field]: value });
  };

  const handleSubmitContact = () => {
    if (
      contactForm.name &&
      contactForm.email &&
      contactForm.subject &&
      contactForm.message
    ) {
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitMessage(''), 3000);
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          mb: 3,
        }}
      >
        Help & Support
      </Typography>

      {/* Quick Support Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <HelpIcon
                  sx={{
                    fontSize: 32,
                    color: '#1976d2',
                  }}
                />
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: '600',
                  color: '#333',
                  mb: 1,
                }}
              >
                Documentation
              </Typography>
              <Typography variant="body2" color="textSecondary">
                View user guides and tutorials
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <BugReportIcon
                  sx={{
                    fontSize: 32,
                    color: '#f44336',
                  }}
                />
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: '600',
                  color: '#333',
                  mb: 1,
                }}
              >
                Report Issue
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Report bugs or issues
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <InfoIcon
                  sx={{
                    fontSize: 32,
                    color: '#2196f3',
                  }}
                />
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: '600',
                  color: '#333',
                  mb: 1,
                }}
              >
                About
              </Typography>
              <Typography variant="body2" color="textSecondary">
                System information
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <EmailIcon
                  sx={{
                    fontSize: 32,
                    color: '#4caf50',
                  }}
                />
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: '600',
                  color: '#333',
                  mb: 1,
                }}
              >
                Contact Us
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Get in touch with support
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FAQs */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0', mb: 4 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              mb: 2,
            }}
          >
            Frequently Asked Questions (FAQs)
          </Typography>

          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expandedFaq === faq.id}
              onChange={() => handleFaqToggle(faq.id)}
              sx={{
                backgroundColor: '#f9f9f9',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    fontWeight: '500',
                    color: '#333',
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="textSecondary">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 2,
                }}
              >
                Contact Information
              </Typography>

              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <EmailIcon sx={{ color: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary="support@hospital.com"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <PhoneIcon sx={{ color: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary="+1 (555) 123-4567"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <LocationOnIcon sx={{ color: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Address"
                    secondary="123 Medical Street, Healthcare City"
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 1,
                }}
              >
                Support Hours
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Monday - Friday: 9:00 AM - 6:00 PM
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Saturday: 10:00 AM - 4:00 PM
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Sunday & Holidays: Closed
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#1976d2', mt: 2, fontWeight: '500' }}
              >
                24/7 Emergency Support Available
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 2,
                }}
              >
                Send us a Message
              </Typography>

              {submitMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {submitMessage}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Full Name"
                value={contactForm.name}
                onChange={(e) => handleContactChange('name', e.target.value)}
                variant="outlined"
                margin="normal"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={contactForm.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                variant="outlined"
                margin="normal"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Subject"
                value={contactForm.subject}
                onChange={(e) =>
                  handleContactChange('subject', e.target.value)
                }
                variant="outlined"
                margin="normal"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Message"
                value={contactForm.message}
                onChange={(e) =>
                  handleContactChange('message', e.target.value)
                }
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmitContact}
                sx={{
                  backgroundColor: '#1976d2',
                  textTransform: 'none',
                  fontWeight: '600',
                  mt: 2,
                  py: 1.5,
                }}
              >
                Send Message
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
