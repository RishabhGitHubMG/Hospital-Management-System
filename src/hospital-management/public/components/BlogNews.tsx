import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding Heart Health: A Comprehensive Guide',
    excerpt:
      'Learn about cardiovascular disease prevention, risk factors, and the latest treatment options available at HealthHub Hospital.',
    author: 'Dr. Sarah Johnson',
    date: 'Dec 15, 2024',
    category: 'Cardiology',
    image: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Pediatric Care: What Every Parent Should Know',
    excerpt:
      'Comprehensive guide for parents on common pediatric conditions, vaccinations, and when to seek medical attention.',
    author: 'Dr. Emily Davis',
    date: 'Dec 12, 2024',
    category: 'Pediatrics',
    image: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Recovery Tips After Orthopedic Surgery',
    excerpt:
      'Expert advice on post-operative care, rehabilitation exercises, and returning to normal activities safely.',
    author: 'Dr. Michael Chen',
    date: 'Dec 10, 2024',
    category: 'Orthopedics',
    image: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    readTime: '6 min read',
  },
];

export default function BlogNews() {
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
          Latest Health News & Articles
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
          Stay informed with insights and updates from our healthcare professionals
        </Typography>

        <Grid container spacing={3}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={4} key={post.id} className="stagger-item">
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardMedia
                  sx={{
                    height: 200,
                    background: post.image,
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Chip
                    label={post.category}
                    size="small"
                    sx={{
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      fontWeight: 600,
                      mb: 1.5,
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color: '#333',
                      mb: 1,
                      lineHeight: 1.4,
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      mb: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    {post.excerpt}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                      <CalendarTodayIcon sx={{ fontSize: 16, color: '#999' }} />
                      <Typography variant="caption" sx={{ color: '#999' }}>
                        {post.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                      <PersonIcon sx={{ fontSize: 16, color: '#999' }} />
                      <Typography variant="caption" sx={{ color: '#999' }}>
                        {post.author}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      color: '#1976d2',
                      fontWeight: 600,
                    }}
                  >
                    {post.readTime}
                  </Typography>
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      color: '#1976d2',
                      '&:hover': { backgroundColor: '#e3f2fd' },
                    }}
                  >
                    Read Article
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#1976d2',
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            View All Articles
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
