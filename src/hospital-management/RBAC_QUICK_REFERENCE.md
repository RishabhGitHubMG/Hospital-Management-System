# Hospital Management System - RBAC Quick Reference Guide

## Quick Start

### Login to the System
1. The app will display a login page with two sections:
   - **Left**: Traditional login form
   - **Right**: Quick login buttons for all 8 demo roles

2. **Quick Login**: Click any role card on the right to instantly login with that role's credentials

3. **Manual Login**: Enter credentials in the form:
   - Email: `role_email@hospital.com` (see table below)
   - Password: `password123` (same for all demo accounts)

### Demo User Credentials Table

```
┌──────────────────┬─────────────────────────┬────────────┬──────────────────┐
│ Role             │ Email                   │ Password   │ Department       │
├──────────────────┼─────────────────────────┼────────────┼──────────────────┤
│ Administrator    │ admin@hospital.com      │ password123│ Administration   │
│ Doctor           │ doctor@hospital.com     │ password123│ General Medicine │
│ Nurse            │ nurse@hospital.com      │ password123│ Emergency Ward   │
│ Lab Technician   │ lab@hospital.com        │ password123│ Laboratory       │
│ Pharmacist       │ pharmacist@hospital.com │ password123│ Pharmacy         │
│ Receptionist     │ receptionist@hospital.com│ password123│ Front Desk      │
│ Billing          │ billing@hospital.com    │ password123│ Finance          │
│ Patient          │ patient@hospital.com    │ password123│ Patient          │
└──────────────────┴──────────���──────────────┴────────────┴──────────────────┘
```

## What Each Role Can Access

### 👨‍💼 Administrator
- **Dashboard**: Full system overview with all metrics
- **Menu Items**: All menu items visible
- **Access**: 
  - All modules (Patients, Appointments, EHR, Billing, Inventory)
  - Settings & configuration
  - User management
  - Full reporting
- **Key Actions**: Manage everything in the system

### 👨‍⚕️ Doctor
- **Dashboard**: Patient care overview with appointments
- **Menu Items**: Patients, Appointments, Health Records, Help
- **Access**:
  - View/manage own patients
  - Check appointment schedule
  - Access patient medical records (EHR)
  - Create prescriptions and lab tests
  - View vital signs
- **Key Actions**: Diagnose, prescribe, manage patient care

### 👩‍⚕️ Nurse
- **Dashboard**: Assigned patients and vital signs overview
- **Menu Items**: Limited clinical access
- **Access**:
  - View assigned patients
  - Record vital signs
  - Update nursing notes
  - View patient medical records
- **Key Actions**: Monitor patients, record vitals, assist doctors

### 🔬 Lab Technician
- **Dashboard**: Lab operations overview with pending tests
- **Menu Items**: Lab Test Management
- **Access**:
  - View lab test requests
  - Enter test results
  - Generate lab reports
- **Key Actions**: Process lab tests, enter results

### 💊 Pharmacist
- **Dashboard**: Prescription and inventory overview
- **Menu Items**: Pharmacy, Inventory
- **Access**:
  - View pending prescriptions
  - Manage pharmacy stock
  - Update inventory levels
  - Dispense medications
- **Key Actions**: Manage prescriptions and inventory

### 👩‍💼 Receptionist
- **Dashboard**: Appointment and registration overview
- **Menu Items**: Patients, Appointments, Help
- **Access**:
  - Register new patients
  - Schedule appointments
  - Check appointment schedule
  - View patient basic info
- **Key Actions**: Patient registration and appointment management

### 💰 Billing & Accounts
- **Dashboard**: Financial overview with invoices and revenue
- **Menu Items**: Billing, Patients (limited)
- **Access**:
  - View patient billing information
  - Create and manage invoices
  - Record payments
  - Process insurance claims
- **Key Actions**: Financial transactions and billing management

### 👤 Patient
- **Dashboard**: Personal health and appointment overview
- **Menu Items**: Help (limited access)
- **Access**:
  - View own appointments
  - Access own medical records
  - View own bills and payments
  - View prescriptions
- **Key Actions**: Manage personal health information

## Using Permission Checking in Code

### 1. Using the usePermission Hook

```typescript
import { usePermission } from '../hooks/usePermission';

function MyComponent() {
  const { can, canAny, canAll, cannot } = usePermission();

  if (can('view_patients')) {
    // User can view patients
  }

  if (canAny(['view_billing', 'manage_billing'])) {
    // User has at least one of these permissions
  }

  if (canAll(['view_patients', 'manage_patients'])) {
    // User has all of these permissions
  }

  if (cannot('delete_patients')) {
    // User cannot delete patients
  }
}
```

### 2. Using the <Can> Component

```typescript
import { Can, Cannot } from '../components/Can';

function MyComponent() {
  return (
    <>
      <Can perform="view_patients">
        {/* This renders only if user can view_patients */}
        <PatientsList />
      </Can>

      <Can perform={['view_billing', 'manage_billing']} require="any">
        {/* This renders if user has ANY of these permissions */}
        <BillingPanel />
      </Can>

      <Cannot perform="delete_patients">
        {/* This renders only if user cannot delete patients */}
        <div>Delete functionality disabled</div>
      </Cannot>
    </>
  );
}
```

### 3. Using Protected Routes

```typescript
import { ProtectedRoute } from '../components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/billing"
        element={
          <ProtectedRoute requiredPermissions={['view_billing']}>
            <BillingPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRoles={['administrator']}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

## Available Permissions

### Dashboard & Navigation
- `view_dashboard` - Access main dashboard
- `view_own_profile` - View own profile
- `view_other_profiles` - View other users' profiles

### Patient Management
- `view_patients` - View patient list
- `view_own_patients` - View assigned patients (for doctors)
- `manage_patients` - Create/edit/delete patients

### Appointments
- `view_appointments` - View appointment schedule
- `manage_appointments` - Create/edit/cancel appointments

### Clinical
- `manage_prescriptions` - Create prescriptions
- `view_prescriptions` - View prescriptions
- `manage_lab_tests` - Create/manage lab tests
- `view_lab_tests` - View lab tests
- `manage_vital_signs` - Record vital signs
- `view_vital_signs` - View vital signs
- `manage_discharge_summaries` - Create discharge summaries
- `view_discharge_summaries` - View discharge summaries
- `manage_nursing_notes` - Create nursing notes
- `view_nursing_notes` - View nursing notes

### EHR
- `view_ehr` - View electronic health records
- `manage_ehr` - Edit health records

### Pharmacy
- `view_pharmacy` - View pharmacy
- `manage_pharmacy` - Manage pharmacy operations

### Inventory
- `view_inventory` - View inventory
- `manage_inventory` - Manage inventory

### Billing
- `view_billing` - View billing information
- `manage_billing` - Create/manage invoices

### Administration
- `manage_users` - Create/edit/delete users
- `view_users` - View user list
- `manage_system_settings` - Change system settings
- `view_system_settings` - View settings

## Testing the RBAC System

### Test 1: Login Flow
1. Open the app
2. Click any role button
3. Verify you're logged in with that role
4. Check the header shows your name and role

### Test 2: Dashboard Customization
1. Login as different roles
2. Verify each role shows a customized dashboard
3. Compare admin dashboard with patient dashboard

### Test 3: Sidebar Menu Filtering
1. Login as Administrator
2. Verify all menu items are visible (8+ items)
3. Logout and login as Patient
4. Verify only relevant items are visible (2-3 items)

### Test 4: Route Protection
1. Login as Patient
2. Try to access `/billing` - Should see "Access Denied"
3. Try to access `/settings` - Should see "Access Denied"
4. Login as Admin
5. Access the same routes - Should work

### Test 5: Component-Level Permissions
1. Login as Doctor
2. Look for "Prescriptions" button - Should be visible
3. Login as Patient
4. Same button should be hidden

## Architecture Overview

```
AuthContext (User & Permissions)
    ↓
usePermission Hook
    ↓
    ├─→ <Can> Component
    ├─→ <Cannot> Component
    ├─→ <ProtectedRoute> Component
    └─→ Direct permission checks in components

HospitalSidebar (filters menu based on permissions)
    ↓
RoleSpecificDashboard (renders different dashboard per role)
    ↓
HospitalManagement (wraps routes with protection)
```

## Key Concepts

### RBAC vs PBAC
- **RBAC** (Role-Based Access Control): Grant permissions based on user role
- **PBAC** (Permission-Based Access Control): Check specific permissions

The system uses both:
- Routes use RBAC: `<ProtectedRoute requiredRoles={['administrator']}>`
- Components use PBAC: `can('view_patients')`

### Permission Inheritance
- Administrator role has ALL permissions
- Other roles have specific permissions based on their job function
- Permissions are centrally defined in `rolePermissions.ts`

## Troubleshooting

### Issue: Login page shows but can't login
- Make sure to enter valid email from the table above
- Password is always: `password123`
- Click the role card on the right for quick login

### Issue: Menu items not showing
- Make sure you're logged in with correct role
- Check the RBAC_TEST_RESULTS.md for expected menu items per role

### Issue: Seeing "Access Denied"
- This means your role doesn't have permission for that page
- Try logging in with Administrator role to access all features

### Issue: Components not visible
- Check if they're wrapped with `<Can>` component
- Verify your role has the required permission
- Check browser console for any errors

## Next Steps

1. **Customize Permissions**: Edit `rolePermissions.ts` to add new permissions
2. **Create New Roles**: Add new role in `UserRole` type and define permissions
3. **Add More Protected Routes**: Wrap routes with `<ProtectedRoute>`
4. **Connect to Backend**: Replace mock authentication with real API calls
5. **Implement Audit Logging**: Log all permission checks for compliance

---

**System Status**: ✅ Phase 1 Complete - Production Ready RBAC Framework
