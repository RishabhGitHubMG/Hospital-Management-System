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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  duration: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
}

function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'APT001',
      patientName: 'Michael Brown',
      patientId: 'P001',
      doctorName: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      date: '2024-02-15',
      time: '09:30',
      duration: '30',
      reason: 'Heart Checkup',
      status: 'scheduled',
    },
    {
      id: 'APT002',
      patientName: 'Emily Wilson',
      patientId: 'P002',
      doctorName: 'Dr. James Lee',
      department: 'Orthopedics',
      date: '2024-02-15',
      time: '10:15',
      duration: '45',
      reason: 'Knee Pain Consultation',
      status: 'scheduled',
    },
    {
      id: 'APT003',
      patientName: 'David Martinez',
      patientId: 'P003',
      doctorName: 'Dr. Patricia Chen',
      department: 'Neurology',
      date: '2024-02-16',
      time: '14:00',
      duration: '30',
      reason: 'Headache Treatment',
      status: 'completed',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState<Appointment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const doctors = [
    'Dr. Sarah Johnson',
    'Dr. James Lee',
    'Dr. Patricia Chen',
    'Dr. Marcus Thompson',
  ];

  const departments = [
    'Cardiology',
    'Orthopedics',
    'Neurology',
    'General Surgery',
    'Pediatrics',
  ];

  const handleOpenDialog = (appointment?: Appointment) => {
    if (appointment) {
      setFormData(appointment);
      setSelectedAppointment(appointment);
    } else {
      setFormData({
        id: `APT${String(appointments.length + 1).padStart(3, '0')}`,
        patientName: '',
        patientId: '',
        doctorName: '',
        department: '',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        duration: '30',
        reason: '',
        status: 'scheduled',
      });
      setSelectedAppointment(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(null);
  };

  const handleSaveAppointment = () => {
    if (formData) {
      if (selectedAppointment) {
        setAppointments(
          appointments.map((a) => (a.id === formData.id ? formData : a)),
        );
      } else {
        setAppointments([...appointments, formData]);
      }
      handleCloseDialog();
    }
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status: 'cancelled' } : a,
      ),
    );
  };

  const filteredAppointments =
    filterStatus === 'all'
      ? appointments
      : appointments.filter((a) => a.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return { bgColor: '#e3f2fd', color: '#0d47a1' };
      case 'completed':
        return { bgColor: '#e8f5e9', color: '#2e7d32' };
      case 'cancelled':
        return { bgColor: '#ffebee', color: '#b71c1c' };
      case 'no-show':
        return { bgColor: '#fff3e0', color: '#e65100' };
      default:
        return { bgColor: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
          Appointment Scheduling
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
          Schedule Appointment
        </Button>
      </Box>

      {/* Filter */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0', mb: 3 }}>
        <CardContent>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={filterStatus}
              label="Filter by Status"
              onChange={(e) => setFilterStatus(e.target.value)}
              sx={{
                borderRadius: '8px',
              }}
            >
              <MenuItem value="all">All Appointments</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="no-show">No Show</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Patient
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Doctor
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Date & Time
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Reason
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
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      sx={{
                        '&:hover': { backgroundColor: '#f9f9f9' },
                        borderBottom: '1px solid #e0e0e0',
                      }}
                    >
                      <TableCell sx={{ fontSize: '14px', color: '#1976d2', fontWeight: '600' }}>
                        {appointment.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#333' }}>
                        {appointment.patientName}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {appointment.doctorName}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {appointment.date} {appointment.time}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {appointment.reason}
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
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {appointment.status === 'scheduled' && (
                            <>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleOpenDialog(appointment)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() =>
                                  handleCancelAppointment(appointment.id)
                                }
                              >
                                <CancelIcon fontSize="small" />
                              </IconButton>
                            </>
                          )}
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                              handleDeleteAppointment(appointment.id)
                            }
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
                      No appointments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Appointment Dialog */}
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
          {selectedAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={formData?.patientName || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, patientName: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient ID"
                value={formData?.patientId || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, patientId: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={formData?.doctorName || ''}
                  label="Doctor"
                  onChange={(e) =>
                    formData &&
                    setFormData({ ...formData, doctorName: e.target.value })
                  }
                >
                  {doctors.map((doc) => (
                    <MenuItem key={doc} value={doc}>
                      {doc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Department</InputLabel>
                <Select
                  value={formData?.department || ''}
                  label="Department"
                  onChange={(e) =>
                    formData &&
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={formData?.date || ''}
                onChange={(e) =>
                  formData && setFormData({ ...formData, date: e.target.value })
                }
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={formData?.time || ''}
                onChange={(e) =>
                  formData && setFormData({ ...formData, time: e.target.value })
                }
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason for Visit"
                value={formData?.reason || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, reason: e.target.value })
                }
                variant="outlined"
                multiline
                rows={2}
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
            onClick={handleSaveAppointment}
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              textTransform: 'none',
              fontWeight: '600',
            }}
          >
            Save Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function AppointmentScheduling() {
  return (
    <Routes>
      <Route path="/" element={<AppointmentList />} />
    </Routes>
  );
}
