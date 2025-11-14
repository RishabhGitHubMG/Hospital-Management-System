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
  LinearProgress,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import SearchIcon from '@mui/icons-material/Search';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  unit: string;
  expiryDate: string;
  supplier: string;
  cost: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

function InventoryList() {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 'INV-001',
      name: 'Surgical Masks',
      category: 'PPE',
      quantity: 450,
      minStock: 100,
      unit: 'pieces',
      expiryDate: '2025-12-31',
      supplier: 'Medical Supplies Co.',
      cost: 0.50,
      status: 'in-stock',
    },
    {
      id: 'INV-002',
      name: 'Oxygen Cylinders',
      category: 'Medical Gas',
      quantity: 15,
      minStock: 20,
      unit: 'pieces',
      expiryDate: '2024-12-31',
      supplier: 'Gas Suppliers Ltd.',
      cost: 150,
      status: 'low-stock',
    },
    {
      id: 'INV-003',
      name: 'Disposable Gloves',
      category: 'PPE',
      quantity: 0,
      minStock: 200,
      unit: 'boxes',
      expiryDate: '2024-06-30',
      supplier: 'Medical Supplies Co.',
      cost: 25,
      status: 'out-of-stock',
    },
    {
      id: 'INV-004',
      name: 'Antibiotics - Amoxicillin',
      category: 'Medicines',
      quantity: 340,
      minStock: 100,
      unit: 'tablets',
      expiryDate: '2025-08-15',
      supplier: 'Pharma Inc.',
      cost: 0.75,
      status: 'in-stock',
    },
    {
      id: 'INV-005',
      name: 'IV Fluids (Saline)',
      category: 'Fluids',
      quantity: 85,
      minStock: 150,
      unit: 'bags',
      expiryDate: '2025-06-30',
      supplier: 'Fluid Suppliers',
      cost: 8.50,
      status: 'low-stock',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'PPE',
    'Medical Gas',
    'Medicines',
    'Fluids',
    'Surgical Instruments',
    'Equipment',
  ];

  const handleOpenDialog = (item?: InventoryItem) => {
    if (item) {
      setFormData(item);
      setSelectedItem(item);
    } else {
      setFormData({
        id: `INV-${String(items.length + 1).padStart(3, '0')}`,
        name: '',
        category: '',
        quantity: 0,
        minStock: 0,
        unit: '',
        expiryDate: new Date().toISOString().split('T')[0],
        supplier: '',
        cost: 0,
        status: 'in-stock',
      });
      setSelectedItem(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(null);
  };

  const determineStatus = (
    quantity: number,
    minStock: number,
  ): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= minStock) return 'low-stock';
    return 'in-stock';
  };

  const handleSaveItem = () => {
    if (formData) {
      const updatedFormData = {
        ...formData,
        status: determineStatus(formData.quantity, formData.minStock),
      };

      if (selectedItem) {
        setItems(
          items.map((i) => (i.id === updatedFormData.id ? updatedFormData : i)),
        );
      } else {
        setItems([...items, updatedFormData]);
      }
      handleCloseDialog();
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const lowStockItems = items.filter((i) => i.status !== 'in-stock').length;
  const totalValue = items.reduce(
    (sum, item) => sum + item.quantity * item.cost,
    0,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return { bgColor: '#e8f5e9', color: '#2e7d32' };
      case 'low-stock':
        return { bgColor: '#fff3e0', color: '#e65100' };
      case 'out-of-stock':
        return { bgColor: '#ffebee', color: '#b71c1c' };
      default:
        return { bgColor: '#f5f5f5', color: '#666' };
    }
  };

  const getStockPercentage = (quantity: number, minStock: number) => {
    return Math.min((quantity / Math.max(minStock, 1)) * 100, 100);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
          Inventory Management
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
          Add Item
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography color="textSecondary" sx={{ fontSize: '14px', mb: 1 }}>
                Total Items
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {items.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography color="textSecondary" sx={{ fontSize: '14px', mb: 1 }}>
                Low/Out of Stock
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                {lowStockItems}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography color="textSecondary" sx={{ fontSize: '14px', mb: 1 }}>
                Total Inventory Value
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                ${totalValue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography color="textSecondary" sx={{ fontSize: '14px', mb: 1 }}>
                Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningIcon
                  sx={{
                    fontSize: 20,
                    color: lowStockItems > 0 ? '#f44336' : '#4caf50',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: '600',
                    color:
                      lowStockItems > 0 ? '#f44336' : '#4caf50',
                  }}
                >
                  {lowStockItems > 0 ? 'Alert' : 'Good'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0', mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search by item name or ID..."
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

      {/* Inventory Table */}
      <Card sx={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Item ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Stock Level
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Expiry Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        '&:hover': { backgroundColor: '#f9f9f9' },
                        borderBottom: '1px solid #e0e0e0',
                      }}
                    >
                      <TableCell sx={{ fontSize: '14px', color: '#1976d2', fontWeight: '600' }}>
                        {item.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#333' }}>
                        {item.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {item.category}
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        <Box sx={{ minWidth: 200 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <span>
                              {item.quantity} {item.unit}
                            </span>
                            <span style={{ fontSize: '12px', color: '#999' }}>
                              Min: {item.minStock}
                            </span>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={getStockPercentage(
                              item.quantity,
                              item.minStock,
                            )}
                            sx={{
                              height: 6,
                              borderRadius: '4px',
                              backgroundColor:
                                item.status === 'out-of-stock'
                                  ? '#ffebee'
                                  : item.status === 'low-stock'
                                    ? '#fff3e0'
                                    : '#e8f5e9',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor:
                                  item.status === 'out-of-stock'
                                    ? '#b71c1c'
                                    : item.status === 'low-stock'
                                      ? '#e65100'
                                      : '#2e7d32',
                              },
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            backgroundColor:
                              getStatusColor(item.status).bgColor,
                            color: getStatusColor(item.status).color,
                            textTransform: 'capitalize',
                            fontWeight: '600',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '14px', color: '#666' }}>
                        {item.expiryDate}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(item)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteItem(item.id)}
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
                      No items found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Item Dialog */}
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
          {selectedItem ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Item Name"
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
                label="Category"
                value={formData?.category || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, category: e.target.value })
                }
                variant="outlined"
                select
                SelectProps={{ native: true }}
                size="small"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit"
                value={formData?.unit || ''}
                onChange={(e) =>
                  formData && setFormData({ ...formData, unit: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Quantity"
                type="number"
                value={formData?.quantity || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value),
                  })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Minimum Stock"
                type="number"
                value={formData?.minStock || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({
                    ...formData,
                    minStock: parseInt(e.target.value),
                  })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cost per Unit"
                type="number"
                value={formData?.cost || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({
                    ...formData,
                    cost: parseFloat(e.target.value),
                  })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                type="date"
                value={formData?.expiryDate || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Supplier"
                value={formData?.supplier || ''}
                onChange={(e) =>
                  formData &&
                  setFormData({ ...formData, supplier: e.target.value })
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
            onClick={handleSaveItem}
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              textTransform: 'none',
              fontWeight: '600',
            }}
          >
            Save Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function InventoryManagement() {
  return (
    <Routes>
      <Route path="/" element={<InventoryList />} />
    </Routes>
  );
}
