# Hospital Management System (HMS)

A comprehensive web-based Hospital Management System built with React, TypeScript, and Material-UI. This system streamlines various processes within healthcare institutions and provides efficient administration tools.

## 🏥 Features

### 1. **Dashboard**
- Real-time hospital statistics and KPIs
- Quick action buttons for common tasks
- Recent patients list
- Upcoming appointments view
- System alerts and critical notifications

### 2. **Patient Management**
- Register new patients with complete information
- Maintain patient profiles and medical history
- Search and filter patients
- Edit and update patient records
- Track patient status (active, inactive, discharged)

### 3. **Appointment Scheduling**
- Schedule new appointments
- View all appointments with doctor assignment
- Filter appointments by status (scheduled, completed, cancelled)
- Reschedule or cancel appointments
- Duration and reason tracking

### 4. **Electronic Health Records (EHR)**
- Create and manage patient health records
- Track diagnoses, treatments, and medications
- Add clinical notes and observations
- View complete medical history
- Export and archive records

### 5. **Billing & Invoicing**
- Generate invoices for patient treatments
- Track payment status (pending, paid, overdue)
- Monitor revenue and outstanding amounts
- Print and send invoices
- Payment history tracking

### 6. **Inventory Management**
- Track medical supplies and equipment
- Monitor stock levels with visual indicators
- Low stock alerts and notifications
- Track expiry dates
- Manage supplier information
- Calculate inventory value

### 7. **User Management**
- User authentication and login
- Profile management
- Password management
- Department and specialization tracking
- Registration and license number management

### 8. **Hospital Settings**
- Configure hospital information
- Manage user settings
- System backup configuration
- Data retention policies
- Appointment reminder settings

## 🔐 Authentication

Default demo credentials:
- **Email:** admin@hospital.com
- **Password:** password123

Sessions are persisted in browser localStorage.

## 📁 Project Structure

```
src/hospital-management/
├── HospitalManagement.tsx          # Main component with routing & auth
├── layout/
│   ├── HospitalHeader.tsx          # Top navigation bar
│   └── HospitalSidebar.tsx         # Side navigation menu
├── pages/
│   ├── Dashboard.tsx               # Main dashboard
│   ├── Settings.tsx                # Hospital settings
│   ├── Login.tsx                   # Login page
│   └── UserProfile.tsx             # User profile management
├── modules/
│   ├── PatientManagement.tsx       # Patient management module
│   ├── AppointmentScheduling.tsx   # Appointment scheduling module
│   ├── ElectronicHealthRecords.tsx # EHR module
│   ├── BillingInvoicing.tsx        # Billing module
│   └── InventoryManagement.tsx     # Inventory module
└── README.md                        # This file
```

## 🎨 Design Features

- **Modern UI:** Clean and professional Material-UI design
- **Responsive:** Mobile, tablet, and desktop compatible
- **Color Coded:** Status indicators with intuitive color schemes
- **Data Tables:** Sortable and filterable data presentation
- **Modal Dialogs:** Smooth form interactions
- **Progress Bars:** Visual stock level indicators
- **Notifications:** System alerts and notifications

## 🛠️ Technologies

- **React 18+** - UI framework
- **TypeScript** - Type safety
- **Material-UI (MUI) 7+** - Component library
- **React Router v7** - Navigation
- **Emotion** - CSS-in-JS styling

## 📊 Data Management

All data is currently managed in-memory using React state. For production use, integrate with:
- Backend REST API
- Database (PostgreSQL, MySQL, etc.)
- Authentication service (OAuth, JWT)
- File storage (for documents and records)

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📝 Module Details

### Patient Management
- Add new patients with personal and medical information
- Track blood type and medical history
- Update patient records
- Search patients by name or ID
- View patient status

### Appointment Scheduling
- Schedule appointments with specific doctors
- Assign departments
- Set appointment duration
- Track appointment status
- View doctor availability

### Electronic Health Records
- Comprehensive medical record creation
- Diagnosis and treatment documentation
- Medication tracking
- Clinical notes
- Record versioning

### Billing & Invoicing
- Generate itemized invoices
- Track invoice status
- Calculate revenue metrics
- Payment status management
- Invoice printing

### Inventory Management
- Real-time stock tracking
- Automatic low-stock alerts
- Supplier management
- Expiry date tracking
- Cost analysis

## 🔧 Customization

### Adding New Modules

1. Create a new file in `modules/` directory
2. Import and use Routes for sub-pages
3. Add navigation entry in `layout/HospitalSidebar.tsx`
4. Update routing in `HospitalManagement.tsx`

### Styling

- Global styles in `index.css`
- Component-level styles using MUI `sx` prop
- Color scheme: Primary (#1976d2), Success (#2e7d32), Warning (#e65100), Error (#b71c1c)

### State Management

Current implementation uses React hooks (useState). For larger applications, consider:
- Redux Toolkit
- Zustand
- Context API with useReducer

## 📱 Responsive Breakpoints

- **XS:** 0px - Mobile phones
- **SM:** 600px - Tablets
- **MD:** 960px - Small laptops
- **LG:** 1280px - Desktops
- **XL:** 1920px - Large displays

## 🔒 Security Considerations

For production deployment:
- Implement secure authentication (JWT, OAuth)
- Use HTTPS for all connections
- Sanitize user inputs
- Implement role-based access control (RBAC)
- Encrypt sensitive data
- Regular security audits
- Implement rate limiting

## 📞 Support & Maintenance

### Future Enhancements
- Export functionality (PDF, Excel)
- Advanced reporting and analytics
- Multi-language support
- Dark mode theme
- Real-time notifications
- Mobile app integration
- Telemedicine features
- Insurance integration

### Known Limitations
- Data is not persisted to a backend
- Authentication is simulated
- No email notifications
- Limited reporting capabilities

## 📄 License

This project is developed for demonstration and learning purposes.

## 🙏 Acknowledgments

Built with Material-UI component library and React best practices.
