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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PrintIcon from '@mui/icons-material/Print';

interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  description: string;
  status: 'pending' | 'paid' | 'overdue';
}

function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV001',
      patientId: 'P001',
      patientName: 'John Smith',
      amount: 1500,
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      description: 'Cardiology Consultation & Tests',
      status: 'pending',
    },
    {
      id: 'INV002',
      patientId: 'P002',
      patientName: 'Jane Doe',
      amount: 2200,
      issueDate: '2024-01-10',
      dueDate: '2024-02-10',
      description: 'Surgery & Hospital Stay',
      status: 'paid',
    },
    {
      id: 'INV003',
      patientId: 'P003',
      patientName: 'Robert Johnson',
      amount: 800,
      issueDate: '2023-12-15',
      dueDate: '2024-01-15',
      description: 'Orthopedic Consultation',
      status: 'overdue',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleOpenDialog = (invoice?: Invoice) => {
    if (invoice) {
      setFormData(invoice);
      setSelectedInvoice(invoice);
    } else {
      setFormData({
        id: `INV${String(invoices.length + 1).padStart(3, '0')}`,
        patientId: '',
        patientName: '',
        amount: 0,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        description: '',
        status: 'pending',
      });
      setSelectedInvoice(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(null);
  };

  const handleSaveInvoice = () => {
    if (formData) {
      if (selectedInvoice) {
        setInvoices(
          invoices.map((i) => (i.id === formData.id ? formData : i)),
        );
      } else {
        setInvoices([...invoices, formData]);
      }
      handleCloseDialog();
    }
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter((i) => i.id !== id));
  };

  const handleMarkAsPaid = (id: string) => {
    setInvoices(
      invoices.map((i) => (i.id === id ? { ...i, status: 'paid' } : i)),
    );
  };

  const filteredInvoices =
    filterStatus === 'all'
      ? invoices
      : invoices.filter((i) => i.status === filterStatus);

  const totalRevenue = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const pendingAmount = invoices
    .filter((i) => i.status === 'pending')
    .reduce((sum, i) => sum + i.amount, 0);

  const overdueAmount = invoices
    .filter((i) => i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return { bgColor: '#fff3e0', color: '#e65100' };
      case 'paid':
        return { bgColor: '#e8f5e9', color: '#2e7d32' };
      case 'overdue':
        return { bgColor: '#ffebee', color: '#b71c1c' };
      default:
        return { bgColor: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
          Billing & Invoicing
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
          Create Invoice
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography color="textSecondary" sx={{ fontSize: '14px', mb: 1 }}>
                Total Revenue
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                ${totalRevenue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography color="textSecondary" sx={{ fontSize: '14px', mb: 1 }}>
                Pending
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e65100' }}>
                ${pendingAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography color="textSecondary" sx={{ fontSize: '14px', mb: 1 }}>
                Overdue
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#b71c1c' }}>
                ${overdueAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography color="textSecondary" sx={{ fontSize: '14px', mb: 1 }}>
                Total Invoices
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {invoices.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Invoices Table */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Invoice ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Patient
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Issue Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Due Date
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
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow
                      key={invoice.id}
                      sx={{
                        '&:hover': { backgroundColor: '#f9f9f9' },
                        borderBottom: '1px solid #e0e0e0',
                      }}
                    >
                      <TableCell sx={{ fontSize: '14px', color: '#1976d2', fontWeight: '600' }}>
                        {invoice.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#333' }}>
                        {invoice.patientName}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>
                        ${invoice.amount.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {invoice.issueDate}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {invoice.dueDate}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status}
                          size="small"
                          sx={{
                            backgroundColor:
                              getStatusColor(invoice.status).bgColor,
                            color: getStatusColor(invoice.status).color,
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
                            title="Print Invoice"
                          >
                            <PrintIcon fontSize="small" />
                          </IconButton>
                          {invoice.status === 'pending' && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleMarkAsPaid(invoice.id)}
                              sx={{
                                textTransform: 'none',
                                fontSize: '12px',
                                borderColor: '#2e7d32',
                                color: '#2e7d32',
                              }}
                            >
                              Mark Paid
                            </Button>
                          )}
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(invoice)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteInvoice(invoice.id)}
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
                      No invoices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Invoice Dialog */}
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
          {selectedInvoice ? 'Edit Invoice' : 'Create New Invoice'}
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData?.amount || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, amount: parseFloat(e.target.value) })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Issue Date"
                type="date"
                value={formData?.issueDate || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, issueDate: e.target.value })
                }
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={formData?.dueDate || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData?.description || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, description: e.target.value })
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
            onClick={handleSaveInvoice}
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              textTransform: 'none',
              fontWeight: '600',
            }}
          >
            Save Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function BillingInvoicing() {
  return (
    <Routes>
      <Route path="/" element={<InvoiceList />} />
    </Routes>
  );
}
