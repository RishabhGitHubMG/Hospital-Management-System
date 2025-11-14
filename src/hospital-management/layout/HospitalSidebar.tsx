import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PaidIcon from '@mui/icons-material/Paid';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { usePermission } from '../hooks/usePermission';
import { Permission } from '../utils/rolePermissions';

interface HospitalSidebarProps {
  open: boolean;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  requiredPermission?: Permission;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/', requiredPermission: 'view_dashboard' },
  { label: 'Patients', icon: <PeopleIcon />, path: '/patients', requiredPermission: 'view_patients' },
  { label: 'Appointments', icon: <ScheduleIcon />, path: '/appointments', requiredPermission: 'view_appointments' },
  { label: 'Health Records', icon: <MedicalServicesIcon />, path: '/ehr', requiredPermission: 'view_ehr' },
  { label: 'Lab Tests', icon: <AssignmentIcon />, path: '/lab', requiredPermission: 'view_lab_tests' },
  { label: 'Pharmacy', icon: <LocalPharmacyIcon />, path: '/pharmacy', requiredPermission: 'view_pharmacy' },
  { label: 'Billing', icon: <ReceiptIcon />, path: '/billing', requiredPermission: 'view_billing' },
  { label: 'Inventory', icon: <InventoryIcon />, path: '/inventory', requiredPermission: 'view_inventory' },
];

const secondaryItems: NavItem[] = [
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings', requiredPermission: 'view_system_settings' },
  { label: 'Help & Support', icon: <HelpIcon />, path: '/help' },
];

export default function HospitalSidebar({ open }: HospitalSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { can } = usePermission();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Filter items based on permissions
  const visibleNavItems = navItems.filter(
    (item) => !item.requiredPermission || can(item.requiredPermission)
  );

  const visibleSecondaryItems = secondaryItems.filter(
    (item) => !item.requiredPermission || can(item.requiredPermission)
  );

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: '#1976d2',
          color: 'white',
        }}
      >
        <LocalHospitalIcon sx={{ fontSize: 32 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          HMS
        </Typography>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flex: 1, pt: 2 }}>
        {visibleNavItems.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
            selected={isActive(item.path)}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: '8px',
              backgroundColor: isActive(item.path)
                ? '#e3f2fd'
                : 'transparent',
              color: isActive(item.path) ? '#1976d2' : '#666',
              '&:hover': {
                backgroundColor: isActive(item.path)
                  ? '#e3f2fd'
                  : '#f5f5f5',
              },
              '& .MuiListItemIcon-root': {
                color: isActive(item.path) ? '#1976d2' : '#999',
                minWidth: 40,
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: isActive(item.path) ? '600' : '500',
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Secondary Items */}
      <Box>
        <Divider sx={{ my: 1 }} />
        <List>
          {visibleSecondaryItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              selected={isActive(item.path)}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: '8px',
                backgroundColor: isActive(item.path)
                  ? '#f0f0f0'
                  : 'transparent',
                color: isActive(item.path) ? '#333' : '#999',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiListItemIcon-root': {
                  color: isActive(item.path) ? '#1976d2' : '#bbb',
                  minWidth: 40,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar - Permanent */}
      <Box
        sx={{
          width: 240,
          backgroundColor: '#fff',
          borderRight: '1px solid #e0e0e0',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          display: { xs: 'none', sm: open ? 'block' : 'none' },
          zIndex: 100,
          overflowY: 'auto',
          transition: 'all 0.3s ease',
        }}
      >
        {drawerContent}
      </Box>

      {/* Mobile Sidebar - Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => {}}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#fff',
          },
        }}
      >
        <Box sx={{ width: 240 }}>{drawerContent}</Box>
      </Drawer>
    </>
  );
}
