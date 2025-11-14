import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../context/AuthContext';
import { Permission, hasPermission } from '../utils/rolePermissions';
import { Box, Typography, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  requiredPermissions?: Permission[];
  requireAll?: boolean;
}

export function ProtectedRoute({
  children,
  requiredRoles,
  requiredPermissions,
  requireAll = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Check role-based access
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    if (!hasRequiredRole) {
      return <UnauthorizedPage />;
    }
  }

  // Check permission-based access
  if (requiredPermissions && requiredPermissions.length > 0) {
    const permissionChecks = requiredPermissions.map((permission) =>
      hasPermission(user.role, permission)
    );

    const hasAccess = requireAll ? permissionChecks.every(Boolean) : permissionChecks.some(Boolean);

    if (!hasAccess) {
      return <UnauthorizedPage />;
    }
  }

  return <>{children}</>;
}

function UnauthorizedPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            fontSize: 80,
            mb: 2,
          }}
        >
          <LockIcon sx={{ fontSize: 80, color: '#ff9800' }} />
        </Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Access Denied
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          You do not have permission to access this page. Please contact your administrator if you
          believe this is an error.
        </Typography>
      </Box>
    </Container>
  );
}
