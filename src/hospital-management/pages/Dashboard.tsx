import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';

interface StatCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
  bgColor: string;
}

interface RecentPatient {
  id: string;
  name: string;
  status: 'admitted' | 'discharged' | 'pending';
  date: string;
  department: string;
}

interface UpcomingAppointment {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const statCards: StatCard[] = [
  {
    title: 'Total Patients',
    value: '1,248',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    trend: 5.2,
    bgColor: '#e3f2fd',
  },
  {
    title: 'Appointments Today',
    value: '32',
    icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
    trend: -2.1,
    bgColor: '#f3e5f5',
  },
  {
    title: 'Active Cases',
    value: '156',
    icon: <MedicalServicesIcon sx={{ fontSize: 40 }} />,
    trend: 3.8,
    bgColor: '#e8f5e9',
  },
  {
    title: 'Revenue (This Month)',
    value: '$45,320',
    icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
    trend: 8.5,
    bgColor: '#fff3e0',
  },
];

const recentPatients: RecentPatient[] = [
  {
    id: 'P001',
    name: 'John Smith',
    status: 'admitted',
    date: '2024-01-15',
    department: 'Cardiology',
  },
  {
    id: 'P002',
    name: 'Jane Doe',
    status: 'discharged',
    date: '2024-01-14',
    department: 'Orthopedics',
  },
  {
    id: 'P003',
    name: 'Robert Johnson',
    status: 'pending',
    date: '2024-01-13',
    department: 'Neurology',
  },
  {
    id: 'P004',
    name: 'Maria Garcia',
    status: 'admitted',
    date: '2024-01-12',
    department: 'General Surgery',
  },
];

const upcomingAppointments: UpcomingAppointment[] = [
  {
    id: 'A001',
    patient: 'Michael Brown',
    doctor: 'Dr. Sarah Johnson',
    time: '09:30 AM',
    status: 'confirmed',
  },
  {
    id: 'A002',
    patient: 'Emily Wilson',
    doctor: 'Dr. James Lee',
    time: '10:15 AM',
    status: 'confirmed',
  },
  {
    id: 'A003',
    patient: 'David Martinez',
    doctor: 'Dr. Patricia Chen',
    time: '11:00 AM',
    status: 'pending',
  },
  {
    id: 'A004',
    patient: 'Lisa Anderson',
    doctor: 'Dr. Marcus Thompson',
    time: '02:00 PM',
    status: 'confirmed',
  },
];

export default function HospitalDashboard() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'admitted':
        return { bgColor: '#fff3e0', color: '#e65100' };
      case 'discharged':
        return { bgColor: '#e8f5e9', color: '#2e7d32' };
      case 'pending':
        return { bgColor: '#e3f2fd', color: '#0d47a1' };
      case 'confirmed':
        return { bgColor: '#e8f5e9', color: '#2e7d32' };
      case 'cancelled':
        return { bgColor: '#ffebee', color: '#b71c1c' };
      default:
        return { bgColor: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            mb: 1,
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Welcome back! Here's what's happening at the hospital today.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                backgroundColor: stat.bgColor,
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '14px',
                        fontWeight: '500',
                        mb: 1,
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 'bold',
                        color: '#333',
                        mb: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    {stat.trend && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {stat.trend > 0 ? (
                          <TrendingUpIcon
                            sx={{
                              fontSize: '16px',
                              color: '#4caf50',
                            }}
                          />
                        ) : (
                          <TrendingDownIcon
                            sx={{
                              fontSize: '16px',
                              color: '#f44336',
                            }}
                          />
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            color: stat.trend > 0 ? '#4caf50' : '#f44336',
                            fontWeight: '600',
                          }}
                        >
                          {Math.abs(stat.trend)}% from last month
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      color: '#1976d2',
                      opacity: 0.3,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions & Recent Patients */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#333',
                }}
              >
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#1976d2',
                    textTransform: 'none',
                    fontWeight: '600',
                    py: 1.2,
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                  onClick={() => navigate('/patients')}
                >
                  Register New Patient
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: '#1976d2',
                    color: '#1976d2',
                    textTransform: 'none',
                    fontWeight: '600',
                    py: 1.2,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                  onClick={() => navigate('/appointments')}
                >
                  Schedule Appointment
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: '#1976d2',
                    color: '#1976d2',
                    textTransform: 'none',
                    fontWeight: '600',
                    py: 1.2,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                  onClick={() => navigate('/billing')}
                >
                  View Billing
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: '#1976d2',
                    color: '#1976d2',
                    textTransform: 'none',
                    fontWeight: '600',
                    py: 1.2,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                  onClick={() => navigate('/inventory')}
                >
                  Check Inventory
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Critical Alerts */}
          <Card
            sx={{
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              mt: 2,
              backgroundColor: '#fff5f5',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <WarningIcon sx={{ color: '#f44336', fontSize: 24 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#b71c1c',
                  }}
                >
                  Alerts
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
                • Low oxygen supply in ICU (2 days remaining)
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
                • Equipment maintenance overdue: MRI Scanner
              </Typography>
              <Typography variant="body2" color="textSecondary">
                • Dr. Johnson on leave next week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Patients */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#333',
                }}
              >
                Recent Patients
              </Typography>
              <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                        Patient ID
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                        Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                        Department
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                        Status
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentPatients.map((patient) => (
                      <TableRow
                        key={patient.id}
                        sx={{
                          '&:hover': { backgroundColor: '#f9f9f9' },
                          borderBottom: '1px solid #e0e0e0',
                        }}
                      >
                        <TableCell sx={{ fontSize: '14px', color: '#1976d2', fontWeight: '600' }}>
                          {patient.id}
                        </TableCell>
                        <TableCell sx={{ fontSize: '14px', color: '#333' }}>
                          {patient.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                          {patient.department}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={patient.status}
                            size="small"
                            sx={{
                              backgroundColor:
                                getStatusColor(patient.status).bgColor,
                              color: getStatusColor(patient.status).color,
                              textTransform: 'capitalize',
                              fontWeight: '600',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: '14px', color: '#999' }}>
                          {patient.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="text"
                sx={{
                  mt: 2,
                  color: '#1976d2',
                  textTransform: 'none',
                  fontWeight: '600',
                }}
                onClick={() => navigate('/patients')}
              >
                View All Patients →
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Upcoming Appointments */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#333',
            }}
          >
            Upcoming Appointments
          </Typography>
          <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Patient
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Doctor
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Time
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {upcomingAppointments.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f9f9f9' },
                      borderBottom: '1px solid #e0e0e0',
                    }}
                  >
                    <TableCell sx={{ fontSize: '14px', color: '#333' }}>
                      {appointment.patient}
                    </TableCell>
                    <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                      {appointment.doctor}
                    </TableCell>
                    <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                      {appointment.time}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={appointment.status}
                        size="small"
                        sx={{
                          backgroundColor:
                            getStatusColor(appointment.status).bgColor,
                          color: getStatusColor(appointment.status).color,
                          textTransform: 'capitalize',
                          fontWeight: '600',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="text"
                        sx={{
                          color: '#1976d2',
                          textTransform: 'none',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="text"
            sx={{
              mt: 2,
              color: '#1976d2',
              textTransform: 'none',
              fontWeight: '600',
            }}
            onClick={() => navigate('/appointments')}
          >
            View All Appointments →
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
