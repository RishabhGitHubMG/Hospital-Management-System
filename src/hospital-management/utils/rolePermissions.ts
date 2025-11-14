import { UserRole } from '../context/AuthContext';

export type Permission = 
  | 'view_dashboard'
  | 'view_own_profile'
  | 'view_other_profiles'
  | 'manage_patients'
  | 'view_patients'
  | 'view_own_patients'
  | 'manage_appointments'
  | 'view_appointments'
  | 'manage_prescriptions'
  | 'view_prescriptions'
  | 'manage_lab_tests'
  | 'view_lab_tests'
  | 'manage_vital_signs'
  | 'view_vital_signs'
  | 'manage_pharmacy'
  | 'view_pharmacy'
  | 'manage_billing'
  | 'view_billing'
  | 'manage_inventory'
  | 'view_inventory'
  | 'manage_ehr'
  | 'view_ehr'
  | 'manage_users'
  | 'view_users'
  | 'manage_system_settings'
  | 'view_system_settings'
  | 'manage_discharge_summaries'
  | 'view_discharge_summaries'
  | 'manage_nursing_notes'
  | 'view_nursing_notes';

export interface RolePermissions {
  [role in UserRole]: Permission[];
}

export const rolePermissionsMap: RolePermissions = {
  // Patient / Visitor
  patient: [
    'view_dashboard',
    'view_own_profile',
    'view_appointments',
    'view_prescriptions',
    'view_lab_tests',
    'view_vital_signs',
    'view_billing',
    'manage_appointments', // Can only request/manage own
  ],

  // Doctor
  doctor: [
    'view_dashboard',
    'view_own_profile',
    'view_own_patients',
    'view_appointments',
    'manage_prescriptions',
    'manage_lab_tests',
    'manage_vital_signs',
    'manage_discharge_summaries',
    'manage_ehr',
    'view_ehr',
    'view_vital_signs',
    'view_nursing_notes',
  ],

  // Nurse / Staff
  nurse: [
    'view_dashboard',
    'view_own_profile',
    'view_vital_signs',
    'manage_vital_signs',
    'manage_nursing_notes',
    'view_nursing_notes',
    'view_ehr',
    'view_appointments',
  ],

  // Laboratory Technician
  lab_technician: [
    'view_dashboard',
    'view_own_profile',
    'view_lab_tests',
    'manage_lab_tests',
  ],

  // Pharmacist
  pharmacist: [
    'view_dashboard',
    'view_own_profile',
    'view_prescriptions',
    'manage_pharmacy',
    'view_pharmacy',
    'view_inventory',
    'manage_inventory',
  ],

  // Receptionist / Front Desk
  receptionist: [
    'view_dashboard',
    'view_own_profile',
    'view_patients',
    'manage_patients',
    'manage_appointments',
    'view_appointments',
    'view_other_profiles',
  ],

  // Billing & Accounts
  billing: [
    'view_dashboard',
    'view_own_profile',
    'view_billing',
    'manage_billing',
    'view_patients',
    'view_inventory',
  ],

  // Hospital Administrator
  administrator: [
    'view_dashboard',
    'view_own_profile',
    'view_other_profiles',
    'manage_patients',
    'view_patients',
    'manage_appointments',
    'view_appointments',
    'manage_prescriptions',
    'view_prescriptions',
    'manage_lab_tests',
    'view_lab_tests',
    'manage_vital_signs',
    'view_vital_signs',
    'manage_pharmacy',
    'view_pharmacy',
    'manage_billing',
    'view_billing',
    'manage_inventory',
    'view_inventory',
    'manage_ehr',
    'view_ehr',
    'manage_users',
    'view_users',
    'manage_system_settings',
    'view_system_settings',
    'manage_discharge_summaries',
    'view_discharge_summaries',
    'manage_nursing_notes',
    'view_nursing_notes',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = rolePermissionsMap[role];
  return permissions.includes(permission);
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}

export const roleDisplayNames: Record<UserRole, string> = {
  patient: 'Patient',
  doctor: 'Doctor',
  nurse: 'Nurse',
  lab_technician: 'Lab Technician',
  pharmacist: 'Pharmacist',
  receptionist: 'Receptionist',
  billing: 'Billing & Accounts',
  administrator: 'Hospital Administrator',
};

export const roleColors: Record<UserRole, string> = {
  patient: '#4CAF50',
  doctor: '#2196F3',
  nurse: '#FF9800',
  lab_technician: '#9C27B0',
  pharmacist: '#F44336',
  receptionist: '#00BCD4',
  billing: '#FFB300',
  administrator: '#1976D2',
};
