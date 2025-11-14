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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Tab,
  Tabs,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';

interface HealthRecord {
  id: string;
  patientId: string;
  patientName: string;
  recordDate: string;
  diagnosis: string;
  treatment: string;
  medications: string;
  notes: string;
  doctor: string;
}

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

function RecordsList() {
  const [records, setRecords] = useState<HealthRecord[]>([
    {
      id: 'EHR001',
      patientId: 'P001',
      patientName: 'John Smith',
      recordDate: '2024-01-20',
      diagnosis: 'Hypertension',
      treatment: 'Medication & Lifestyle Changes',
      medications: 'Lisinopril 10mg daily',
      notes: 'Patient shows good compliance',
      doctor: 'Dr. Sarah Johnson',
    },
    {
      id: 'EHR002',
      patientId: 'P002',
      patientName: 'Jane Doe',
      recordDate: '2024-01-18',
      diagnosis: 'Type 2 Diabetes',
      treatment: 'Insulin Therapy',
      medications: 'Metformin 500mg twice daily',
      notes: 'Blood sugar levels stable',
      doctor: 'Dr. James Lee',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [formData, setFormData] = useState<HealthRecord | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const handleOpenDialog = (record?: HealthRecord) => {
    if (record) {
      setFormData(record);
      setSelectedRecord(record);
    } else {
      setFormData({
        id: `EHR${String(records.length + 1).padStart(3, '0')}`,
        patientId: '',
        patientName: '',
        recordDate: new Date().toISOString().split('T')[0],
        diagnosis: '',
        treatment: '',
        medications: '',
        notes: '',
        doctor: '',
      });
      setSelectedRecord(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(null);
  };

  const handleSaveRecord = () => {
    if (formData) {
      if (selectedRecord) {
        setRecords(
          records.map((r) => (r.id === formData.id ? formData : r)),
        );
      } else {
        setRecords([...records, formData]);
      }
      handleCloseDialog();
    }
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const handleViewRecord = (record: HealthRecord) => {
    setSelectedRecord(record);
    setOpenViewDialog(true);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
          Electronic Health Records (EHR)
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
          Create New Record
        </Button>
      </Box>

      {/* Records Table */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Record ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Patient
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Diagnosis
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Doctor
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.length > 0 ? (
                  records.map((record) => (
                    <TableRow
                      key={record.id}
                      sx={{
                        '&:hover': { backgroundColor: '#f9f9f9' },
                        borderBottom: '1px solid #e0e0e0',
                      }}
                    >
                      <TableCell sx={{ fontSize: '14px', color: '#1976d2', fontWeight: '600' }}>
                        {record.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#333' }}>
                        {record.patientName}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {record.diagnosis}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {record.doctor}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {record.recordDate}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleViewRecord(record)}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(record)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteRecord(record.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3, color: '#999' }}>
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* View Record Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '12px' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#333' }}>
          Health Record Details
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedRecord && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">
                  Record ID
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '600', mb: 2 }}>
                  {selectedRecord.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">
                  Patient Name
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '600', mb: 2 }}>
                  {selectedRecord.patientName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">
                  Doctor
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '600', mb: 2 }}>
                  {selectedRecord.doctor}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">
                  Record Date
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '600', mb: 2 }}>
                  {selectedRecord.recordDate}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  Diagnosis
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                  {selectedRecord.diagnosis}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  Treatment
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                  {selectedRecord.treatment}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  Medications
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                  {selectedRecord.medications}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  Clinical Notes
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                  {selectedRecord.notes}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenViewDialog(false)}
            sx={{ textTransform: 'none' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Record Dialog */}
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
          {selectedRecord ? 'Edit Health Record' : 'Create New Health Record'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Doctor"
                value={formData?.doctor || ''}
                onChange={(e) =>
                  formData && setFormData({ ...formData, doctor: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Record Date"
                type="date"
                value={formData?.recordDate || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, recordDate: e.target.value })
                }
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnosis"
                value={formData?.diagnosis || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, diagnosis: e.target.value })
                }
                variant="outlined"
                multiline
                rows={2}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Treatment"
                value={formData?.treatment || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, treatment: e.target.value })
                }
                variant="outlined"
                multiline
                rows={2}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medications"
                value={formData?.medications || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, medications: e.target.value })
                }
                variant="outlined"
                multiline
                rows={2}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Clinical Notes"
                value={formData?.notes || ''}
                onChange={(e) =>
                  formData && setFormData({ ...formData, notes: e.target.value })
                }
                variant="outlined"
                multiline
                rows={3}
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
            onClick={handleSaveRecord}
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              textTransform: 'none',
              fontWeight: '600',
            }}
          >
            Save Record
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function ElectronicHealthRecords() {
  return (
    <Routes>
      <Route path="/" element={<RecordsList />} />
    </Routes>
  );
}
