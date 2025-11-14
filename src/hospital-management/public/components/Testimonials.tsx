import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Rating,
  Avatar,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Heart Surgery Patient',
    content:
      'The care I received at HealthHub Hospital was exceptional. From the initial consultation to post-operative care, every staff member was professional and compassionate. I highly recommend their cardiology department.',
    rating: 5,
    avatar: 'JS',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Pediatric Patient Parent',
    content:
      'My child needed emergency care and the pediatrics team at HealthHub was incredible. They made my child feel comfortable and safe during a scary situation. Thank you to the entire team!',
    rating: 5,
    avatar: 'SJ',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Orthopedic Surgery Patient',
    content:
      'I had knee replacement surgery and the recovery process was smooth thanks to the excellent orthopedic team. The facilities are modern and the staff is very attentive to patient needs.',
    rating: 4.5,
    avatar: 'MC',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Routine Checkup Patient',
    content:
      'HealthHub Hospital provides outstanding preventive care. My annual checkup was thorough and the doctors took time to answer all my questions. Very satisfied with the service!',
    rating: 5,
    avatar: 'ED',
  },
  {
    id: 5,
    name: 'Robert Wilson',
    role: 'Emergency Department Patient',
    content:
      'I came to the emergency department with acute abdominal pain. The medical team quickly diagnosed and treated my condition. Professional, efficient, and caring staff!',
    rating: 4.5,
    avatar: 'RW',
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        backgroundColor: '#f5f5f5',
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
            color: '#333',
          }}
        >
          Patient Testimonials
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
          Hear from our patients about their experiences at HealthHub Hospital
        </Typography>

        <Box sx={{ position: 'relative', pt: 2 }}>
          <Grid container spacing={3}>
            {visibleTestimonials.map((testimonial, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={testimonial.id}
                className="stagger-item"
              >
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <FormatQuoteIcon sx={{ fontSize: 32, color: '#1976d2', opacity: 0.3 }} />
                      <Rating value={testimonial.rating} readOnly size="small" />
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        mb: 2.5,
                        lineHeight: 1.7,
                        fontStyle: 'italic',
                      }}
                    >
                      "{testimonial.content}"
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: '#1976d2',
                          color: '#ffffff',
                          fontWeight: 700,
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#333' }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 4,
              }}
            >
              <IconButton
                onClick={handlePrevious}
                sx={{
                  backgroundColor: '#1976d2',
                  color: '#ffffff',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              {/* Dots Indicator */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: index === currentSlide ? '#1976d2' : '#ccc',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                    }}
                  />
                ))}
              </Box>

              <IconButton
                onClick={handleNext}
                sx={{
                  backgroundColor: '#1976d2',
                  color: '#ffffff',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
