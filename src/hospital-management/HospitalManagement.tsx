import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import HospitalSidebar from './layout/HospitalSidebar';
import HospitalHeader from './layout/HospitalHeader';
import HospitalDashboard from './pages/Dashboard';
import PatientManagement from './modules/PatientManagement';
import AppointmentScheduling from './modules/AppointmentScheduling';
import ElectronicHealthRecords from './modules/ElectronicHealthRecords';
import BillingInvoicing from './modules/BillingInvoicing';
import InventoryManagement from './modules/InventoryManagement';
import HospitalSettings from './pages/Settings';

export default function HospitalManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <HospitalSidebar open={sidebarOpen} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: { xs: 0, sm: sidebarOpen ? '240px' : '0' },
          transition: 'margin-left 0.3s ease',
        }}
      >
        <HospitalHeader onMenuClick={handleSidebarToggle} sidebarOpen={sidebarOpen} />
        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            py: 3,
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Routes>
            <Route path="/" element={<HospitalDashboard />} />
            <Route path="/patients/*" element={<PatientManagement />} />
            <Route path="/appointments/*" element={<AppointmentScheduling />} />
            <Route path="/ehr/*" element={<ElectronicHealthRecords />} />
            <Route path="/billing/*" element={<BillingInvoicing />} />
            <Route path="/inventory/*" element={<InventoryManagement />} />
            <Route path="/settings/*" element={<HospitalSettings />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}
