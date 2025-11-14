import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import HospitalSidebar from './layout/HospitalSidebar';
import HospitalHeader from './layout/HospitalHeader';
import HospitalDashboard from './pages/Dashboard';
import PatientManagement from './modules/PatientManagement';
import AppointmentScheduling from './modules/AppointmentScheduling';
import ElectronicHealthRecords from './modules/ElectronicHealthRecords';
import BillingInvoicing from './modules/BillingInvoicing';
import InventoryManagement from './modules/InventoryManagement';
import HospitalSettings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import HelpSupport from './pages/HelpSupport';
import Login from './pages/Login';

function HospitalManagementLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated, logout } = useAuth();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => {}} />;
  }

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
        <HospitalHeader onMenuClick={handleSidebarToggle} sidebarOpen={sidebarOpen} onLogout={handleLogout} />
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
            <Route
              path="/patients/*"
              element={
                <ProtectedRoute requiredPermissions={['view_patients']}>
                  <PatientManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments/*"
              element={
                <ProtectedRoute requiredPermissions={['view_appointments']}>
                  <AppointmentScheduling />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ehr/*"
              element={
                <ProtectedRoute requiredPermissions={['view_ehr']}>
                  <ElectronicHealthRecords />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing/*"
              element={
                <ProtectedRoute requiredPermissions={['view_billing']}>
                  <BillingInvoicing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory/*"
              element={
                <ProtectedRoute requiredPermissions={['view_inventory']}>
                  <InventoryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/*"
              element={
                <ProtectedRoute requiredPermissions={['view_system_settings']}>
                  <HospitalSettings />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/help" element={<HelpSupport />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default function HospitalManagement() {
  return (
    <AuthProvider>
      <HospitalManagementLayout />
    </AuthProvider>
  );
}
