import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
  Alert,
  Tab,
  Tabs,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div hidden={value !== index} style={{ width: '100%' }}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function UserProfile() {
  const [tabValue, setTabValue] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 987-6543',
    department: 'Hospital Administration',
    specialization: 'Healthcare Management',
    registrationNumber: 'REG-2024-001',
    licenseNumber: 'LIC-2024-001',
    joiningDate: '2020-01-15',
    bio: 'Experienced hospital administrator with 15+ years in healthcare management.',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  const handleSaveProfile = () => {
    setSaveMessage('Profile updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleChangePassword = () => {
    setPasswordError('');

    if (!passwordData.currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }

    if (!passwordData.newPassword) {
      setPasswordError('Please enter a new password');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    setSaveMessage('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setTimeout(() => setSaveMessage(''), 3000);
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
        User Profile
      </Typography>

      {saveMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {saveMessage}
        </Alert>
      )}

      {/* Profile Header Card */}
      <Card
        sx={{
          borderRadius: '12px',
          border: '1px solid #e0e0e0',
          mb: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs="auto">
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    backgroundColor: '#1976d2',
                    fontSize: '48px',
                    fontWeight: 'bold',
                  }}
                >
                  SJ
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#1976d2',
                    color: 'white',
                    borderRadius: '50%',
                    p: 0.8,
                    cursor: 'pointer',
                    border: '3px solid white',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  <CameraAltIcon sx={{ fontSize: 18 }} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 0.5,
                }}
              >
                {profileData.fullName}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                {profileData.department}
              </Typography>
              <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: '600' }}>
                {profileData.specialization}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
        <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: '500',
                color: '#999',
              },
              '& .Mui-selected': {
                color: '#1976d2',
                fontWeight: '600',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            <Tab label="Personal Information" />
            <Tab label="Professional Details" />
            <Tab label="Change Password" />
          </Tabs>
        </Box>

        <CardContent>
          {/* Personal Information Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={profileData.fullName}
                  onChange={(e) =>
                    handleProfileChange('fullName', e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    handleProfileChange('email', e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) =>
                    handleProfileChange('phone', e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Joining Date"
                  type="date"
                  value={profileData.joiningDate}
                  onChange={(e) =>
                    handleProfileChange('joiningDate', e.target.value)
                  }
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  value={profileData.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  variant="outlined"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveProfile}
                  sx={{
                    backgroundColor: '#1976d2',
                    textTransform: 'none',
                    fontWeight: '600',
                    py: 1.2,
                    px: 3,
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Professional Details Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  value={profileData.department}
                  onChange={(e) =>
                    handleProfileChange('department', e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Specialization"
                  value={profileData.specialization}
                  onChange={(e) =>
                    handleProfileChange('specialization', e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Registration Number"
                  value={profileData.registrationNumber}
                  onChange={(e) =>
                    handleProfileChange('registrationNumber', e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="License Number"
                  value={profileData.licenseNumber}
                  onChange={(e) =>
                    handleProfileChange('licenseNumber', e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveProfile}
                  sx={{
                    backgroundColor: '#1976d2',
                    textTransform: 'none',
                    fontWeight: '600',
                    py: 1.2,
                    px: 3,
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Change Password Tab */}
          <TabPanel value={tabValue} index={2}>
            {passwordError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {passwordError}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    handlePasswordChange('currentPassword', e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    handlePasswordChange('newPassword', e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange('confirmPassword', e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">
                  Password must be at least 8 characters long
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleChangePassword}
                  sx={{
                    backgroundColor: '#1976d2',
                    textTransform: 'none',
                    fontWeight: '600',
                    py: 1.2,
                    px: 3,
                  }}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
}
