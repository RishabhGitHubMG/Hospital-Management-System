import * as React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HospitalManagement from "./hospital-management/HospitalManagement";
import PublicHome from "./hospital-management/public/pages/PublicHome";
import DoctorDirectory from "./hospital-management/public/pages/DoctorDirectory";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        404: Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you're looking for doesn't exist or has been moved.
      </Typography>
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/doctors" element={<DoctorDirectory />} />
        <Route path="/login" element={<HospitalManagement />} />
        <Route path="/dashboard/*" element={<HospitalManagement />} />
        <Route path="/patients/*" element={<HospitalManagement />} />
        <Route path="/appointments/*" element={<HospitalManagement />} />
        <Route path="/ehr/*" element={<HospitalManagement />} />
        <Route path="/billing/*" element={<HospitalManagement />} />
        <Route path="/inventory/*" element={<HospitalManagement />} />
        <Route path="/settings/*" element={<HospitalManagement />} />
        <Route path="/profile" element={<HospitalManagement />} />
        <Route path="/help" element={<HospitalManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
