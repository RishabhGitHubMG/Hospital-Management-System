import React from 'react';
import {
  Box,
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicLayout from '../layout/PublicLayout';
import '../styles/animations.css';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  subSpecialties: string[];
  experience: number;
  rating: number;
  patients: number;
  phone: string;
  email: string;
  department: string;
  location: string;
  available: boolean;
  availability: string;
  bio: string;
  education: string;
  languages: string[];
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    subSpecialties: ['Interventional Cardiology', 'Heart Failure'],
    experience: 12,
    rating: 4.8,
    patients: 2150,
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@healthhub.com',
    department: 'Cardiology',
    location: 'Main Building, Floor 3',
    available: true,
    availability: 'Mon-Fri 9AM-5PM, Sat 10AM-2PM',
    bio: 'Experienced cardiologist specializing in interventional cardiology and heart failure management.',
    education: 'MD, Johns Hopkins University',
    languages: ['English', 'Spanish'],
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'General Surgery',
    subSpecialties: ['Laparoscopic Surgery', 'Cancer Surgery'],
    experience: 15,
    rating: 4.9,
    patients: 1890,
    phone: '+1 (555) 234-5678',
    email: 'michael.chen@healthhub.com',
    department: 'Surgery',
    location: 'West Wing, Operating Room Block',
    available: true,
    availability: 'Mon-Thu 8AM-4PM, Fri 8AM-12PM',
    bio: 'Skilled surgeon with expertise in laparoscopic and open surgical procedures.',
    education: 'MD, Stanford University',
    languages: ['English', 'Mandarin'],
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    subSpecialties: ['Pediatric Cardiology', 'Development Pediatrics'],
    experience: 10,
    rating: 4.7,
    patients: 1620,
    phone: '+1 (555) 345-6789',
    email: 'emily.rodriguez@healthhub.com',
    department: 'Pediatrics',
    location: 'East Wing, Floor 2',
    available: true,
    availability: 'Mon-Fri 10AM-6PM',
    bio: 'Compassionate pediatrician dedicated to the health and wellness of children.',
    education: 'MD, Harvard Medical School',
    languages: ['English', 'Spanish', 'Portuguese'],
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialization: 'Neurology',
    subSpecialties: ['Stroke Neurology', 'Parkinson\'s Disease'],
    experience: 18,
    rating: 4.9,
    patients: 1450,
    phone: '+1 (555) 456-7890',
    email: 'james.wilson@healthhub.com',
    department: 'Neurology',
    location: 'Central Building, Floor 4',
    available: true,
    availability: 'Tue-Fri 9AM-5PM, Sat 9AM-1PM',
    bio: 'Expert neurologist specializing in neurodegenerative diseases and stroke management.',
    education: 'MD, Yale School of Medicine',
    languages: ['English', 'French'],
  },
  {
    id: 5,
    name: 'Dr. Jennifer Lee',
    specialization: 'Orthopedics',
    subSpecialties: ['Joint Replacement', 'Sports Medicine'],
    experience: 14,
    rating: 4.8,
    patients: 1750,
    phone: '+1 (555) 567-8901',
    email: 'jennifer.lee@healthhub.com',
    department: 'Orthopedics',
    location: 'Sports Medicine Center',
    available: true,
    availability: 'Mon-Fri 8AM-5PM',
    bio: 'Orthopedic specialist with expertise in joint replacement and sports medicine.',
    education: 'MD, Duke University',
    languages: ['English'],
  },
  {
    id: 6,
    name: 'Dr. Robert Martinez',
    specialization: 'Emergency Medicine',
    subSpecialties: ['Trauma', 'Critical Care'],
    experience: 16,
    rating: 4.7,
    patients: 3200,
    phone: '+1 (555) 678-9012',
    email: 'robert.martinez@healthhub.com',
    department: 'Emergency',
    location: 'Emergency Department',
    available: true,
    availability: '24/7 On-Call',
    bio: 'Experienced emergency physician trained in trauma and critical care management.',
    education: 'MD, University of California',
    languages: ['English', 'Spanish'],
  },
  {
    id: 7,
    name: 'Dr. Lisa Anderson',
    specialization: 'Internal Medicine',
    subSpecialties: ['Geriatrics', 'Preventive Medicine'],
    experience: 11,
    rating: 4.6,
    patients: 1340,
    phone: '+1 (555) 789-0123',
    email: 'lisa.anderson@healthhub.com',
    department: 'Internal Medicine',
    location: 'Main Building, Floor 2',
    available: true,
    availability: 'Mon-Fri 9AM-5PM',
    bio: 'Internal medicine specialist providing comprehensive adult healthcare.',
    education: 'MD, Northwestern University',
    languages: ['English', 'German'],
  },
  {
    id: 8,
    name: 'Dr. David Thompson',
    specialization: 'Ophthalmology',
    subSpecialties: ['Cataract Surgery', 'Retinal Disorders'],
    experience: 13,
    rating: 4.8,
    patients: 1680,
    phone: '+1 (555) 890-1234',
    email: 'david.thompson@healthhub.com',
    department: 'Ophthalmology',
    location: 'Vision Center, West Building',
    available: false,
    availability: 'Temporarily Unavailable',
    bio: 'Expert ophthalmologist specializing in cataract surgery and retinal disorders.',
    education: 'MD, Johns Hopkins University',
    languages: ['English', 'Italian'],
  },
];

export default function DoctorDirectory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = React.useState(initialSearch);
  const [selectedSpecialization, setSelectedSpecialization] = React.useState('');
  const [selectedDepartment, setSelectedDepartment] = React.useState('');
  const [ratingFilter, setRatingFilter] = React.useState<[number, number]>([0, 5]);
  const [availabilityFilter, setAvailabilityFilter] = React.useState(false);
  const [filteredDoctors, setFilteredDoctors] = React.useState<Doctor[]>(mockDoctors);
  const [loading, setLoading] = React.useState(false);

  const specializations = Array.from(new Set(mockDoctors.map((doc) => doc.specialization))).sort();
  const departments = Array.from(new Set(mockDoctors.map((doc) => doc.department))).sort();

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let results = mockDoctors;

      if (searchTerm) {
        results = results.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.subSpecialties.some((sub) => sub.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      if (selectedSpecialization) {
        results = results.filter((doctor) => doctor.specialization === selectedSpecialization);
      }

      if (selectedDepartment) {
        results = results.filter((doctor) => doctor.department === selectedDepartment);
      }

      results = results.filter((doctor) => doctor.rating >= ratingFilter[0] && doctor.rating <= ratingFilter[1]);

      if (availabilityFilter) {
        results = results.filter((doctor) => doctor.available);
      }

      setFilteredDoctors(results);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedSpecialization, selectedDepartment, ratingFilter, availabilityFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialization('');
    setSelectedDepartment('');
    setRatingFilter([0, 5]);
    setAvailabilityFilter(false);
  };

  const hasActiveFilters = searchTerm || selectedSpecialization || selectedDepartment || ratingFilter[0] !== 0 || ratingFilter[1] !== 5 || availabilityFilter;

  return (
    <PublicLayout>
      {/* Header Section */}
      <Box
        sx={{
          py: { xs: 3, md: 5 },
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: '#ffffff',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '28px', md: '42px' },
            }}
          >
            Find a Doctor
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '14px', md: '16px' },
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Search our experienced healthcare professionals by name, specialty, location, and availability
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: 4, backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Search Box */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                }}
              />
            </Grid>

            {/* Specialization Filter */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Filter by Specialization</InputLabel>
                <Select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  label="Filter by Specialization"
                  sx={{ backgroundColor: '#ffffff' }}
                >
                  <MenuItem value="">All Specializations</MenuItem>
                  {specializations.map((spec) => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Department Filter */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Filter by Department</InputLabel>
                <Select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  label="Filter by Department"
                  sx={{ backgroundColor: '#ffffff' }}
                >
                  <MenuItem value="">All Departments</MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Rating Filter */}
            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: '4px' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                  Minimum Rating: {ratingFilter[0]}/5
                </Typography>
                <Slider
                  value={ratingFilter}
                  onChange={(e, newValue) => setRatingFilter(newValue as [number, number])}
                  min={0}
                  max={5}
                  step={0.5}
                  marks
                  valueLabelDisplay="auto"
                  sx={{ color: '#1976d2' }}
                />
              </Box>
            </Grid>

            {/* Availability Filter */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, backgroundColor: '#ffffff' }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={availabilityFilter}
                        onChange={(e) => setAvailabilityFilter(e.target.checked)}
                        sx={{ color: '#1976d2' }}
                      />
                    }
                    label="Show only available doctors"
                  />
                </FormGroup>
              </Paper>
            </Grid>
          </Grid>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Active filters:
              </Typography>
              {searchTerm && (
                <Chip
                  label={`Search: "${searchTerm}"`}
                  onDelete={() => setSearchTerm('')}
                  size="small"
                />
              )}
              {selectedSpecialization && (
                <Chip
                  label={`Specialty: ${selectedSpecialization}`}
                  onDelete={() => setSelectedSpecialization('')}
                  size="small"
                />
              )}
              {selectedDepartment && (
                <Chip
                  label={`Department: ${selectedDepartment}`}
                  onDelete={() => setSelectedDepartment('')}
                  size="small"
                />
              )}
              {(ratingFilter[0] !== 0 || ratingFilter[1] !== 5) && (
                <Chip
                  label={`Rating: ${ratingFilter[0]}-${ratingFilter[1]}`}
                  onDelete={() => setRatingFilter([0, 5])}
                  size="small"
                />
              )}
              {availabilityFilter && (
                <Chip
                  label="Available Only"
                  onDelete={() => setAvailabilityFilter(false)}
                  size="small"
                />
              )}
              <Button
                size="small"
                onClick={clearFilters}
                sx={{ color: '#1976d2', textTransform: 'none' }}
              >
                Clear All
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* Results Section */}
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : filteredDoctors.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                No doctors found
              </Typography>
              <Typography variant="body2" sx={{ color: '#999' }}>
                Try adjusting your search criteria or filters to find more doctors.
              </Typography>
            </Paper>
          ) : (
            <>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#333',
                  mb: 3,
                }}
              >
                Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
              </Typography>

              <Grid container spacing={3}>
                {filteredDoctors.map((doctor, index) => (
                  <Grid item xs={12} sm={6} md={4} key={doctor.id} className="stagger-item">
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      <CardContent sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              backgroundColor: '#1976d2',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <PersonIcon sx={{ fontSize: 32, color: '#ffffff' }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', mb: 0.5 }}>
                              {doctor.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 600 }}>
                              {doctor.specialization}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Rating */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIcon
                                key={i}
                                sx={{
                                  fontSize: 16,
                                  color: i < Math.floor(doctor.rating) ? '#ffc107' : '#ccc',
                                }}
                              />
                            ))}
                          </Box>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {doctor.rating} ({doctor.patients} patients)
                          </Typography>
                        </Box>

                        {/* Sub-specialties */}
                        {doctor.subSpecialties.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            {doctor.subSpecialties.map((sub) => (
                              <Chip
                                key={sub}
                                label={sub}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 0.5, mb: 0.5, color: '#1976d2', borderColor: '#1976d2' }}
                              />
                            ))}
                          </Box>
                        )}

                        {/* Bio */}
                        <Typography variant="body2" sx={{ color: '#666', mb: 2, lineHeight: 1.6 }}>
                          {doctor.bio}
                        </Typography>

                        {/* Details */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <LocationOnIcon sx={{ fontSize: 18, color: '#999' }} />
                            <Typography variant="caption" sx={{ color: '#666' }}>
                              {doctor.location}
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            <strong>Hours:</strong> {doctor.availability}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            <strong>Languages:</strong> {doctor.languages.join(', ')}
                          </Typography>
                        </Box>

                        {/* Experience & Availability */}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip
                            label={`${doctor.experience}+ years`}
                            size="small"
                            variant="outlined"
                            sx={{ color: '#ff9800', borderColor: '#ff9800' }}
                          />
                          <Chip
                            label={doctor.available ? 'Available' : 'Unavailable'}
                            size="small"
                            sx={{
                              backgroundColor: doctor.available ? '#4caf50' : '#999',
                              color: '#ffffff',
                            }}
                          />
                        </Box>
                      </CardContent>

                      <CardActions sx={{ pt: 0 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          disabled={!doctor.available}
                          onClick={() => navigate('/login')}
                          sx={{
                            backgroundColor: doctor.available ? '#1976d2' : '#ccc',
                            color: '#ffffff',
                            textTransform: 'none',
                            '&:hover': {
                              backgroundColor: doctor.available ? '#1565c0' : '#ccc',
                            },
                          }}
                        >
                          {doctor.available ? 'Schedule Appointment' : 'Not Available'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </PublicLayout>
  );
}
