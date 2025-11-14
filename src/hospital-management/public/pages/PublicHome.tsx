import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HeartIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicLayout from '../layout/PublicLayout';
import HospitalStatistics from '../components/HospitalStatistics';
import Testimonials from '../components/Testimonials';
import Awards from '../components/Awards';
import FAQ from '../components/FAQ';
import InsuranceProviders from '../components/InsuranceProviders';
import BlogNews from '../components/BlogNews';
import AppointmentBookingModal from '../components/AppointmentBookingModal';
import EmergencyHotline from '../components/EmergencyHotline';
import '../styles/animations.css';

interface ServiceCardData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const services: ServiceCardData[] = [
  {
    id: 1,
    title: 'Emergency Department',
    description:
      '24/7 emergency care with experienced trauma specialists and advanced life support systems. Our dedicated emergency team is always ready to provide immediate medical assistance.',
    icon: <LocalHospitalIcon sx={{ fontSize: 50 }} />,
    color: '#d32f2f',
  },
  {
    id: 2,
    title: 'Cardiology',
    description:
      'Comprehensive cardiac care including diagnostics, treatment, and rehabilitation services. We specialize in advanced interventions and preventive cardiology.',
    icon: <HeartIcon sx={{ fontSize: 50 }} />,
    color: '#d32f2f',
  },
  {
    id: 3,
    title: 'General Surgery',
    description:
      'Advanced surgical procedures with latest techniques and experienced surgical teams. Minimally invasive options available for faster recovery.',
    icon: <MedicalServicesIcon sx={{ fontSize: 50 }} />,
    color: '#1976d2',
  },
  {
    id: 4,
    title: 'Pediatrics',
    description:
      'Specialized child healthcare from newborn care to adolescent medicine with a compassionate approach. Child-friendly facilities and experienced pediatricians.',
    icon: <EmojiPeopleIcon sx={{ fontSize: 50 }} />,
    color: '#1976d2',
  },
  {
    id: 5,
    title: 'Orthopedics',
    description:
      'Bone and joint care with orthopedic specialists providing surgical and non-surgical treatments. Sports medicine and rehabilitation expertise available.',
    icon: <LocalHospitalIcon sx={{ fontSize: 50 }} />,
    color: '#ff9800',
  },
  {
    id: 6,
    title: 'Neurology',
    description:
      'Comprehensive neurological care for disorders of the nervous system and brain disorders. Advanced diagnostic imaging and treatment options.',
    icon: <MedicalServicesIcon sx={{ fontSize: 50 }} />,
    color: '#ff9800',
  },
];

export default function PublicHome() {
  const navigate = useNavigate();
  const [searchDoctor, setSearchDoctor] = React.useState('');
  const [contactForm, setContactForm] = React.useState({ name: '', email: '', phone: '', message: '' });
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  const handleSearchDoctor = () => {
    if (searchDoctor.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchDoctor)}`);
    } else {
      navigate('/doctors');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for reaching out! We will contact you soon.`);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <PublicLayout>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            color: '#ffffff',
            py: { xs: 6, md: 10 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)',
              pointerEvents: 'none',
            }}
          />
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '28px', md: '48px' },
                animation: 'fadeInDown 0.8s ease-out',
              }}
            >
              Welcome to HealthHub Hospital
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: 'rgba(255,255,255,0.9)',
                fontSize: { xs: '16px', md: '20px' },
                animation: 'fadeInDown 0.8s ease-out 0.2s both',
              }}
            >
              Your trusted healthcare partner for a healthier life
            </Typography>

            {/* Search Doctor Box */}
            <Box
              sx={{
                mt: 4,
                mb: 2,
                animation: 'fadeInUp 0.8s ease-out 0.4s both',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  justifyContent: 'center',
                  flexWrap: { xs: 'wrap', md: 'nowrap' },
                }}
              >
                <TextField
                  placeholder="Search by specialty (e.g., Cardiology)"
                  value={searchDoctor}
                  onChange={(e) => setSearchDoctor(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSearchDoctor();
                  }}
                  sx={{
                    width: { xs: '100%', md: '350px' },
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    '& .MuiInputBase-input::placeholder': {
                      color: '#999',
                      opacity: 1,
                    },
                  }}
                  variant="outlined"
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={handleSearchDoctor}
                  sx={{
                    backgroundColor: '#ff9800',
                    color: '#ffffff',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': { backgroundColor: '#f57c00', transform: 'translateY(-2px)' },
                  }}
                >
                  Find a Doctor
                </Button>
              </Box>
            </Box>

            {/* CTA Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setAppointmentModalOpen(true)}
                sx={{
                  backgroundColor: '#ff9800',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { backgroundColor: '#f57c00', transform: 'translateY(-2px)' },
                }}
              >
                Book Appointment Now
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Hospital Statistics */}
        <HospitalStatistics />

        {/* Hospital Overview Section */}
        <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: '#f5f5f5' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                textAlign: 'center',
                color: '#333',
                animation: 'fadeInUp 0.8s ease-out',
              }}
            >
              About HealthHub Hospital
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: '#666',
                mb: 3,
                fontSize: '16px',
                lineHeight: 1.8,
                maxWidth: '800px',
                mx: 'auto',
                animation: 'fadeInUp 0.8s ease-out 0.2s both',
              }}
            >
              HealthHub Hospital is a leading healthcare institution committed to providing exceptional medical care
              and patient-centered services. With state-of-the-art facilities and a team of highly skilled healthcare
              professionals, we are dedicated to improving the health and well-being of our patients and the community
              we serve.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {/* Mission Card */}
              <Grid item xs={12} md={6} className="stagger-item">
                <Card
                  sx={{
                    height: '100%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <HeartIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                          Our Mission
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                      To deliver compassionate, high-quality healthcare services that promote health, prevent disease,
                      and provide effective treatment for all patients in a safe, welcoming environment. We are committed
                      to advancing medical knowledge through research and education.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Vision Card */}
              <Grid item xs={12} md={6} className="stagger-item">
                <Card
                  sx={{
                    height: '100%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <EmojiPeopleIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                          Our Vision
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                      To be the most trusted and innovative healthcare provider in our region, recognized for clinical
                      excellence, patient safety, and compassionate care. We envision a healthier community where every
                      patient receives personalized, evidence-based treatment.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Services Highlights Section */}
        <Box sx={{ py: { xs: 4, md: 8 } }} id="services">
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 4,
                textAlign: 'center',
                color: '#333',
              }}
            >
              Our Services
            </Typography>

            <Grid container spacing={3}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.id} className="stagger-item">
                  <Card
                    sx={{
                      height: '100%',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Box sx={{ color: service.color, mb: 2 }}>
                        {service.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Testimonials */}
        <Testimonials />

        {/* Awards & Accreditations */}
        <Awards />

        {/* Insurance Providers */}
        <InsuranceProviders />

        {/* Blog/News */}
        <BlogNews />

        {/* FAQ Section */}
        <FAQ />

        {/* Contact Section */}
        <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: '#f5f5f5' }} id="contact">
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 4,
                textAlign: 'center',
                color: '#333',
              }}
            >
              Contact Us
            </Typography>

            <Grid container spacing={4}>
              {/* Contact Information */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <PhoneIcon sx={{ fontSize: 28, color: '#1976d2', flexShrink: 0 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                        Phone
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        +1 (555) 123-4567
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        +1 (555) 123-4568
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <EmailIcon sx={{ fontSize: 28, color: '#1976d2', flexShrink: 0 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                        Email
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        info@healthhub.com
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        appointments@healthhub.com
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <LocationOnIcon sx={{ fontSize: 28, color: '#1976d2', flexShrink: 0 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                        Address
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        123 Medical Plaza
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Healthcare City, HC 12345
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Hours */}
                <Paper sx={{ p: 2.5, backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', mb: 2 }}>
                    Hours of Operation
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Monday - Friday:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333', fontWeight: 600 }}>
                      8:00 AM - 6:00 PM
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Saturday:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333', fontWeight: 600 }}>
                      9:00 AM - 4:00 PM
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Emergency (24/7):
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#d32f2f', fontWeight: 600 }}>
                      Always Open
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              {/* Contact Form */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <form onSubmit={handleContactSubmit}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      margin="normal"
                      required
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        backgroundColor: '#1976d2',
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.2,
                        '&:hover': { backgroundColor: '#1565c0' },
                      }}
                    >
                      Send Message
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            color: '#ffffff',
            py: { xs: 4, md: 6 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '24px', md: '36px' },
              }}
            >
              Ready to Schedule Your Appointment?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: 'rgba(255,255,255,0.9)',
                fontSize: { xs: '14px', md: '16px' },
              }}
            >
              Book your appointment with our experienced healthcare professionals today.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => setAppointmentModalOpen(true)}
                sx={{
                  backgroundColor: '#ff9800',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  '&:hover': { backgroundColor: '#f57c00' },
                }}
              >
                Book Now
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/doctors')}
                sx={{
                  borderColor: '#ffffff',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
              >
                Find a Doctor
              </Button>
            </Box>
          </Container>
        </Box>
      </PublicLayout>

      {/* Emergency Hotline Widget */}
      <EmergencyHotline />

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal
        open={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />
    </>
  );
}
