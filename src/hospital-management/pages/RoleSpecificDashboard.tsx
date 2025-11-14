import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { usePermission } from '../hooks/usePermission';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function RoleSpecificDashboard() {
  const { user } = useAuth();
  const { can } = usePermission();
  const navigate = useNavigate();

  if (!user) return null;

  const getDashboardByRole = () => {
    switch (user.role) {
      case 'administrator':
        return <AdministratorDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'nurse':
        return <NurseDashboard />;
      case 'lab_technician':
        return <LabTechnicianDashboard />;
      case 'pharmacist':
        return <PharmacistDashboard />;
      case 'receptionist':
        return <ReceptionistDashboard />;
      case 'billing':
        return <BillingDashboard />;
      case 'patient':
        return <PatientDashboard />;
      default:
        return <Box>Unknown Role</Box>;
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Role: <strong>{user.role.replace(/_/g, ' ').toUpperCase()}</strong> | Department: {user.department}
        </Typography>
      </Box>

      {getDashboardByRole()}
    </Box>
  );
}

function AdministratorDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Users', value: '48', icon: <PeopleIcon sx={{ fontSize: 40 }} />, bgColor: '#e3f2fd' },
    { title: 'Active Patients', value: '1,248', icon: <MedicalServicesIcon sx={{ fontSize: 40 }} />, bgColor: '#e8f5e9' },
    { title: 'Total Revenue', value: '$2.5M', icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />, bgColor: '#fff3e0' },
    { title: 'System Health', value: '99.8%', icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, bgColor: '#f3e5f5' },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                System Management
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button fullWidth variant="contained" onClick={() => navigate('/settings')}>
                  Manage Settings
                </Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/users')}>
                  Manage Users & Roles
                </Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/reports')}>
                  View System Reports
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button fullWidth variant="contained" onClick={() => navigate('/patients')}>
                  Manage Patients
                </Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
                  View Appointments
                </Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/billing')}>
                  Financial Overview
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

function DoctorDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'My Patients', value: '24', icon: <PeopleIcon sx={{ fontSize: 40 }} />, bgColor: '#e3f2fd' },
    { title: 'Appointments Today', value: '8', icon: <ScheduleIcon sx={{ fontSize: 40 }} />, bgColor: '#f3e5f5' },
    { title: 'Pending Lab Tests', value: '12', icon: <AssignmentIcon sx={{ fontSize: 40 }} />, bgColor: '#fff3e0' },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Patient Care
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button fullWidth variant="contained" onClick={() => navigate('/patients')}>
                  View My Patients
                </Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
                  Check Schedule
                </Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/ehr')}>
                  Patient Records
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Clinical Tools
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
                  Prescriptions
                </Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
                  Lab Test Requests
                </Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
                  Discharge Summaries
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

function NurseDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Assigned Patients', value: '18', icon: <PeopleIcon sx={{ fontSize: 40 }} />, bgColor: '#e8f5e9' },
    { title: 'Vitals to Check', value: '5', icon: <MedicalServicesIcon sx={{ fontSize: 40 }} />, bgColor: '#e3f2fd' },
    { title: 'Nursing Notes', value: '12', icon: <AssignmentIcon sx={{ fontSize: 40 }} />, bgColor: '#f3e5f5' },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Patient Care Activities
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button fullWidth variant="contained" onClick={() => navigate('/appointments')}>
              Record Vital Signs
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
              View Patient Details
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
              Update Nursing Notes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

function LabTechnicianDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Pending Tests', value: '28', icon: <AssignmentIcon sx={{ fontSize: 40 }} />, bgColor: '#f3e5f5' },
    { title: 'Completed Today', value: '42', icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, bgColor: '#e8f5e9' },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Lab Operations
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button fullWidth variant="contained" onClick={() => navigate('/appointments')}>
              View Test Requests
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
              Enter Test Results
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
              Generate Reports
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

function PharmacistDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Pending Prescriptions', value: '34', icon: <LocalPharmacyIcon sx={{ fontSize: 40 }} />, bgColor: '#fff3e0' },
    { title: 'Low Stock Items', value: '8', icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, bgColor: '#ffebee' },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Pharmacy Management
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button fullWidth variant="contained" onClick={() => navigate('/appointments')}>
              Process Prescriptions
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/inventory')}>
              Manage Inventory
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
              Stock Alerts
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

function ReceptionistDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Today Appointments', value: '32', icon: <ScheduleIcon sx={{ fontSize: 40 }} />, bgColor: '#f3e5f5' },
    { title: 'New Registrations', value: '7', icon: <PeopleIcon sx={{ fontSize: 40 }} />, bgColor: '#e3f2fd' },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Front Desk Operations
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button fullWidth variant="contained" onClick={() => navigate('/patients')}>
              Register New Patient
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
              Schedule Appointment
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
              Manage Check-ins
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

function BillingDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Pending Invoices', value: '23', icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />, bgColor: '#fff3e0' },
    { title: 'Monthly Revenue', value: '$185K', icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, bgColor: '#e8f5e9' },
    { title: 'Overdue Payments', value: '5', icon: <AssignmentIcon sx={{ fontSize: 40 }} />, bgColor: '#ffebee' },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Financial Operations
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button fullWidth variant="contained" onClick={() => navigate('/billing')}>
              Create Invoice
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/billing')}>
              View Payments
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/billing')}>
              Insurance Claims
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

function PatientDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'My Appointments', value: '3', icon: <ScheduleIcon sx={{ fontSize: 40 }} />, bgColor: '#f3e5f5' },
    { title: 'Pending Results', value: '2', icon: <AssignmentIcon sx={{ fontSize: 40 }} />, bgColor: '#e8f5e9' },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            My Health
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button fullWidth variant="contained" onClick={() => navigate('/appointments')}>
              Book Appointment
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/appointments')}>
              View Medical Records
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/billing')}>
              View Bills
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

function StatCard({ title, value, icon, bgColor }: StatCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: bgColor,
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
            <Typography color="textSecondary" sx={{ fontSize: '14px', fontWeight: '500', mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: '#1976d2', opacity: 0.3 }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
