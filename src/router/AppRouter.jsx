import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Splash from '../pages/splash/SplashScreen';
import Login from '../pages/auth/Login';
import WelcomeScreen from '../pages/welcome/WelcomeScreen';
import CompanyCreationForm from '../pages/company/CreateCompany';
import PersonalDetailsForm from '../pages/profile/PersonalDetailsForm';
import EmployeeProfile from '../pages/profile/EmployeeProfile';

// Import the new responsive layout
import ResponsiveDashboardLayout from './ResponsiveDashboardWrapper';
import Dashboard from '../pages/dashboard/Dashboard';
import EmployeeManagement from '../pages/employees/EmployeeManagement';
import DepartmentManagement from '../pages/departments/DepartmentManagement';
import RolesManagement from '../pages/roles/RoleManagement';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/CreateCompany" element={<CompanyCreationForm />} />
        
        {/* Personal Details Route - Protected but not wrapped in dashboard layout */}
        <Route
          path="/personal-details"
          element={
            <ProtectedRoute>
              <PersonalDetailsForm />
            </ProtectedRoute>
          }
        />
              
        {/* Dashboard Route - Updated to use ResponsiveDashboardLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <Dashboard />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Employee Management Route */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <EmployeeManagement />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Department Management Route - NEW */}
        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <DepartmentManagement />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Employee Profile Route - Wrapped in dashboard layout */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <EmployeeProfile />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Employee Profile with ID Route - For viewing other employees */}
        <Route
          path="/employee/:employeeId"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <EmployeeProfile />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/roles"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <RolesManagement />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Add other protected routes as needed */}
        {/* 
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <Attendance />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaves"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <Leaves />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <Reports />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <AuditLogs />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/company-settings"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <CompanySettings />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/system-settings"
          element={
            <ProtectedRoute>
              <ResponsiveDashboardLayout>
                <SystemSettings />
              </ResponsiveDashboardLayout>
            </ProtectedRoute>
          }
        />
        */}
        
        {/* Continue with other routes... */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;