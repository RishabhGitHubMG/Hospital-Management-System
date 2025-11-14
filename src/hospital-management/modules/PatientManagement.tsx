import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  bloodType: string;
  registeredDate: string;
  status: 'active' | 'inactive' | 'discharged';
}

function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'P001',
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      bloodType: 'O+',
      registeredDate: '2024-01-15',
      status: 'active',
    },
    {
      id: 'P002',
      name: 'Jane Doe',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 234-5678',
      email: 'jane.doe@email.com',
      bloodType: 'A+',
      registeredDate: '2024-01-10',
      status: 'active',
    },
    {
      id: 'P003',
      name: 'Robert Johnson',
      age: 58,
      gender: 'Male',
      phone: '+1 (555) 345-6789',
      email: 'robert.j@email.com',
      bloodType: 'B+',
      registeredDate: '2024-01-08',
      status: 'discharged',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState<Patient | null>(null);

  const handleOpenDialog = (patient?: Patient) => {
    if (patient) {
      setFormData(patient);
      setSelectedPatient(patient);
    } else {
      setFormData({
        id: `P${String(patients.length + 1).padStart(3, '0')}`,
        name: '',
        age: 0,
        gender: '',
        phone: '',
        email: '',
        bloodType: '',
        registeredDate: new Date().toISOString().split('T')[0],
        status: 'active',
      });
      setSelectedPatient(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(null);
  };

  const handleSavePatient = () => {
    if (formData) {
      if (selectedPatient) {
        setPatients(
          patients.map((p) => (p.id === formData.id ? formData : p)),
        );
      } else {
        setPatients([...patients, formData]);
      }
      handleCloseDialog();
    }
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bgColor: '#e8f5e9', color: '#2e7d32' };
      case 'inactive':
        return { bgColor: '#fff3e0', color: '#e65100' };
      case 'discharged':
        return { bgColor: '#e3f2fd', color: '#0d47a1' };
      default:
        return { bgColor: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
          Patient Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: '#1976d2',
            textTransform: 'none',
            fontWeight: '600',
          }}
        >
          Register New Patient
        </Button>
      </Box>

      {/* Search Bar */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0', mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search by patient name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 0 }}>
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
                    Age
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Blood Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Phone
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
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
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
                        {patient.age}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {patient.bloodType}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {patient.phone}
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
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(patient)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeletePatient(patient.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3, color: '#999' }}>
                      No patients found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Patient Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '12px' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#333' }}>
          {selectedPatient ? 'Edit Patient' : 'Register New Patient'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData?.name || ''}
                onChange={(e) =>
                  formData && setFormData({ ...formData, name: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={formData?.age || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, age: parseInt(e.target.value) })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gender"
                value={formData?.gender || ''}
                onChange={(e) =>
                  formData && setFormData({ ...formData, gender: e.target.value })
                }
                variant="outlined"
                select
                SelectProps={{ native: true }}
                size="small"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Blood Type"
                value={formData?.bloodType || ''}
                onChange={(e) =>
                  formData && setFormData({ ...formData, bloodType: e.target.value })
                }
                variant="outlined"
                select
                SelectProps={{ native: true }}
                size="small"
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData?.email || ''}
                onChange={(e) =>
                  formData && setFormData({ ...formData, email: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={formData?.phone || ''}
                onChange={(e) =>
                  formData && setFormData({ ...formData, phone: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSavePatient}
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              textTransform: 'none',
              fontWeight: '600',
            }}
          >
            Save Patient
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function PatientManagement() {
  return (
    <Routes>
      <Route path="/" element={<PatientList />} />
    </Routes>
  );
}
