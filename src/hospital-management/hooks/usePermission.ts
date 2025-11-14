import { useAuth } from '../context/AuthContext';
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions } from '../utils/rolePermissions';

export function usePermission() {
  const { user } = useAuth();

  const can = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  const canAny = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAnyPermission(user.role, permissions);
  };

  const canAll = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAllPermissions(user.role, permissions);
  };

  const cannot = (permission: Permission): boolean => {
    return !can(permission);
  };

  return {
    can,
    canAny,
    canAll,
    cannot,
    userRole: user?.role,
  };
}
