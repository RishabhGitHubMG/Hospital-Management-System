import React, { ReactNode } from 'react';
import { usePermission } from '../hooks/usePermission';
import { Permission } from '../utils/rolePermissions';

interface CanProps {
  children: ReactNode;
  perform: Permission | Permission[];
  fallback?: ReactNode;
  require?: 'any' | 'all';
}

export function Can({ children, perform, fallback = null, require = 'all' }: CanProps) {
  const { can, canAny, canAll } = usePermission();

  const permissions = Array.isArray(perform) ? perform : [perform];
  
  const hasAccess = require === 'any' 
    ? (permissions.length === 1 ? can(permissions[0]) : canAny(permissions))
    : canAll(permissions);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface CannotProps {
  children: ReactNode;
  perform: Permission | Permission[];
  fallback?: ReactNode;
}

export function Cannot({ children, perform, fallback = null }: CannotProps) {
  const { cannot, canAny, canAll } = usePermission();

  const permissions = Array.isArray(perform) ? perform : [perform];
  
  const shouldShow = permissions.length === 1 
    ? cannot(permissions[0]) 
    : !canAll(permissions);

  if (!shouldShow) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
