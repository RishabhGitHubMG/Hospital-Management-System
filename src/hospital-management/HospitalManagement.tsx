import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import UserProfile from './pages/UserProfile';
import HelpSupport from './pages/HelpSupport';
import Login from './pages/Login';

export default function HospitalManagement() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    const savedAuth = localStorage.getItem('hospital_auth');
    if (savedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('hospital_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('hospital_auth');
    setIsAuthenticated(false);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Show login page if on login route
  if (isLoginPage) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Show login page if not authenticated and trying to access protected routes
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
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
            <Route path="/dashboard/*" element={<HospitalDashboard />} />
            <Route path="/patients/*" element={<PatientManagement />} />
            <Route path="/appointments/*" element={<AppointmentScheduling />} />
            <Route path="/ehr/*" element={<ElectronicHealthRecords />} />
            <Route path="/billing/*" element={<BillingInvoicing />} />
            <Route path="/inventory/*" element={<InventoryManagement />} />
            <Route path="/settings/*" element={<HospitalSettings />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/help" element={<HelpSupport />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}
