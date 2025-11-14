import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Switch,
  FormControlLabel,
  Divider,
  Tab,
  Tabs,
  Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

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

export default function HospitalSettings() {
  const [tabValue, setTabValue] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');

  const [hospitalSettings, setHospitalSettings] = useState({
    hospitalName: 'City Medical Center',
    registrationNumber: 'HMS-2024-001',
    address: '123 Medical Street, Healthcare City',
    phone: '+1 (555) 123-4567',
    email: 'info@citymmedical.com',
    establishedYear: '2010',
  });

  const [userSettings, setUserSettings] = useState({
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    department: 'Administration',
    phone: '+1 (555) 987-6543',
    language: 'English',
    timezone: 'UTC-5',
  });

  const [systemSettings, setSystemSettings] = useState({
    enableNotifications: true,
    enableTwoFactor: false,
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: '365',
    appointmentReminder: true,
    appointmentReminderDays: '1',
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleHospitalChange = (field: string, value: string) => {
    setHospitalSettings({ ...hospitalSettings, [field]: value });
  };

  const handleUserChange = (field: string, value: string) => {
    setUserSettings({ ...userSettings, [field]: value });
  };

  const handleSystemChange = (field: string, value: string | boolean) => {
    setSystemSettings({ ...systemSettings, [field]: value });
  };

  const handleSave = () => {
    setSaveMessage('Settings saved successfully!');
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
        Settings
      </Typography>

      {saveMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {saveMessage}
        </Alert>
      )}

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
            <Tab label="Hospital Information" />
            <Tab label="User Profile" />
            <Tab label="System Settings" />
          </Tabs>
        </Box>

        <CardContent>
          {/* Hospital Information Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hospital Name"
                  value={hospitalSettings.hospitalName}
                  onChange={(e) =>
                    handleHospitalChange('hospitalName', e.target.value)
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
                  value={hospitalSettings.registrationNumber}
                  onChange={(e) =>
                    handleHospitalChange('registrationNumber', e.target.value)
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
                  label="Address"
                  value={hospitalSettings.address}
                  onChange={(e) =>
                    handleHospitalChange('address', e.target.value)
                  }
                  variant="outlined"
                  multiline
                  rows={2}
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
                  value={hospitalSettings.phone}
                  onChange={(e) =>
                    handleHospitalChange('phone', e.target.value)
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
                  value={hospitalSettings.email}
                  onChange={(e) =>
                    handleHospitalChange('email', e.target.value)
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
                  label="Established Year"
                  value={hospitalSettings.establishedYear}
                  onChange={(e) =>
                    handleHospitalChange('establishedYear', e.target.value)
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
                  onClick={handleSave}
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

          {/* User Profile Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={userSettings.fullName}
                  onChange={(e) =>
                    handleUserChange('fullName', e.target.value)
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
                  value={userSettings.email}
                  onChange={(e) => handleUserChange('email', e.target.value)}
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
                  label="Department"
                  value={userSettings.department}
                  onChange={(e) =>
                    handleUserChange('department', e.target.value)
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
                  value={userSettings.phone}
                  onChange={(e) => handleUserChange('phone', e.target.value)}
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
                  label="Language"
                  value={userSettings.language}
                  onChange={(e) =>
                    handleUserChange('language', e.target.value)
                  }
                  variant="outlined"
                  select
                  SelectProps={{ native: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Timezone"
                  value={userSettings.timezone}
                  onChange={(e) =>
                    handleUserChange('timezone', e.target.value)
                  }
                  variant="outlined"
                  select
                  SelectProps={{ native: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                >
                  <option value="UTC-5">UTC-5</option>
                  <option value="UTC+0">UTC+0</option>
                  <option value="UTC+1">UTC+1</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
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

          {/* System Settings Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 2,
                }}
              >
                Notifications & Security
              </Typography>
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={systemSettings.enableNotifications}
                      onChange={(e) =>
                        handleSystemChange(
                          'enableNotifications',
                          e.target.checked,
                        )
                      }
                    />
                  }
                  label="Enable Notifications"
                />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mt: 1 }}>
                  Receive alerts about appointments, patient updates, and system notifications
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={systemSettings.enableTwoFactor}
                      onChange={(e) =>
                        handleSystemChange('enableTwoFactor', e.target.checked)
                      }
                    />
                  }
                  label="Enable Two-Factor Authentication"
                />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mt: 1 }}>
                  Add an extra layer of security to your account
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 2,
                }}
              >
                Backup & Data
              </Typography>

              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={systemSettings.autoBackup}
                      onChange={(e) =>
                        handleSystemChange('autoBackup', e.target.checked)
                      }
                    />
                  }
                  label="Enable Automatic Backups"
                />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mt: 1 }}>
                  Automatically backup hospital data
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Backup Frequency"
                    value={systemSettings.backupFrequency}
                    onChange={(e) =>
                      handleSystemChange('backupFrequency', e.target.value)
                    }
                    variant="outlined"
                    select
                    SelectProps={{ native: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data Retention (days)"
                    value={systemSettings.dataRetention}
                    onChange={(e) =>
                      handleSystemChange('dataRetention', e.target.value)
                    }
                    variant="outlined"
                    type="number"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 2,
                }}
              >
                Appointment Settings
              </Typography>

              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={systemSettings.appointmentReminder}
                      onChange={(e) =>
                        handleSystemChange(
                          'appointmentReminder',
                          e.target.checked,
                        )
                      }
                    />
                  }
                  label="Enable Appointment Reminders"
                />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mt: 1 }}>
                  Send reminders to patients before appointments
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Reminder Days Before Appointment"
                value={systemSettings.appointmentReminderDays}
                onChange={(e) =>
                  handleSystemChange('appointmentReminderDays', e.target.value)
                }
                variant="outlined"
                type="number"
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
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
            </Box>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
}
