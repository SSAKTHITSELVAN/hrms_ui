// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import './LaptopDashboardLayout.css';
// import {handleGetCompanyData} from '../services/companyService'
// import {handleGetMyPersonalDetails} from '../services/personalDetailsService'

// const LaptopDashboardLayout = ({ children }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Fetching the company data
//   const [myCompanyData, setMyCompanyData] = useState(null);
//   const [myPersonalDetails, setMyPersonalDetails] = useState(null);

//   useEffect(() => {
//         const fetchCompanyData = async () => {
//             try {
//                 const response = await handleGetCompanyData();
//                 setMyCompanyData(response);
//             } catch (error) {
//                 console.error('Error fetching company data:', error);
//             }
//         };

//         const fetchPersonalDetails = async () => {
//             try {
//                 const response = await handleGetMyPersonalDetails();
//                 setMyPersonalDetails(response);
//             } catch (error) {
//                 console.error('Error fetching personal details:', error);
//             }
//         };

//         fetchCompanyData();
//         fetchPersonalDetails();
//     }, []); // Empty dependency array to run once on component mount

//   // Get user data with fallbacks
//   const getUserData = () => {
//     try {
//       return JSON.parse(localStorage.getItem('user_data') || '{}');
//     } catch {
//       return {};
//     }
//   };

//   const getRoleData = () => {
//     try {
//       return JSON.parse(localStorage.getItem('role_data') || '{}');
//     } catch {
//       return {};
//     }
//   };

//   const userData = getUserData();
//   const roleData = getRoleData()?.data || {};

//   // Header data with fallbacks - prioritizing personal details first name
//   const headerData = {
//     companyName: myCompanyData?.company_name || '-----',
//     userName: myPersonalDetails?.first_name || userData?.name || userData?.full_name || "John Doe",
//     userRole: roleData?.role_name || "Employee"
//   };

//   // Permission helper functions
//   const canAccessEmployees = () => {
//     return roleData?.can_create_employee ||
//            roleData?.can_view_all_employees ||
//            roleData?.can_delete_employee;
//   };

//   const canAccessAttendance = () => {
//     return roleData?.can_view_own_attendance ||
//            roleData?.can_view_team_attendance ||
//            roleData?.can_view_all_attendance ||
//            roleData?.can_checkin_own ||
//            roleData?.can_checkout_own;
//   };

//   const canAccessLeaves = () => {
//     return roleData?.can_apply_own_leave ||
//            roleData?.can_view_own_leave ||
//            roleData?.can_view_team_leave ||
//            roleData?.can_view_all_leave ||
//            roleData?.can_approve_team_leave;
//   };

//   const canAccessDepartments = () => {
//     return roleData?.can_create_department ||
//            roleData?.can_view_all_departments ||
//            roleData?.can_edit_all_departments ||
//            roleData?.can_delete_department;
//   };

//   const canAccessRoles = () => {
//     return roleData?.can_create_roles ||
//            roleData?.can_view_all_roles ||
//            roleData?.can_edit_all_roles ||
//            roleData?.can_delete_roles;
//   };

//   const canAccessAuditLogs = () => {
//     return roleData?.can_view_all_audit_logs ||
//            roleData?.can_view_own_audit_logs ||
//            roleData?.can_view_team_audit_logs;
//   };

//   const canAccessReports = () => {
//     return roleData?.can_generate_employee_reports ||
//            roleData?.can_generate_attendance_reports ||
//            roleData?.can_generate_leave_reports ||
//            roleData?.can_create_custom_reports;
//   };

//   const isAdmin = () => {
//     return roleData?.role_name === "Admin Role" || roleData?.is_system_role;
//   };

//   // Navigation handlers
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   const isActiveLink = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <div className="laptop-layout">
//       {/* Header - Fixed Top */}
//       <header className="laptop-header">
//         <div className="header-container">
//           {/* Header Left */}
//           <div className="header-left">
//             <h1 className="company-name">
//               {headerData.companyName}
//             </h1>
//           </div>

//           {/* Header Right */}
//           <div className="header-right">
//             <div className="user-info">
//               <div className="user-avatar">
//                 {headerData.userName.charAt(0).toUpperCase()}
//               </div>
//               <div className="user-details">
//                 <h3 className="user-name">
//                   {headerData.userName}
//                 </h3>
//                 <p className="user-role">
//                   {headerData.userRole}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="layout-body">
//         {/* Sidebar - Fixed Left */}
//         <aside className="laptop-sidebar">
//           {/* Sidebar Header */}
//           <div className="sidebar-header">
//             <h2 className="sidebar-title">HRMS</h2>
//           </div>

//           {/* Sidebar Navigation */}
//           <nav className="sidebar-nav">
//             {/* Dashboard - Always visible */}
//             <Link
//               to="/dashboard"
//               className={`nav-link ${isActiveLink('/dashboard') ? 'active' : ''}`}
//             >
//               Dashboard
//             </Link>

//             {/* Attendance */}
//             {canAccessAttendance() && (
//               <Link
//                 to="/attendance"
//                 className={`nav-link ${isActiveLink('/attendance') ? 'active' : ''}`}
//               >
//                 Attendance
//               </Link>
//             )}

//             {/* Leaves */}
//             {canAccessLeaves() && (
//               <Link
//                 to="/leaves"
//                 className={`nav-link ${isActiveLink('/leaves') ? 'active' : ''}`}
//               >
//                 Leaves
//               </Link>
//             )}

//             {/* Employees */}
//             {canAccessEmployees() && (
//               <Link
//                 to="/employees"
//                 className={`nav-link ${isActiveLink('/employees') ? 'active' : ''}`}
//               >
//                 Employees
//               </Link>
//             )}

//             {/* Departments */}
//             {canAccessDepartments() && (
//               <Link
//                 to="/departments"
//                 className={`nav-link ${isActiveLink('/departments') ? 'active' : ''}`}
//               >
//                 Departments
//               </Link>
//             )}

//             {/* Roles */}
//             {canAccessRoles() && (
//               <Link
//                 to="/roles"
//                 className={`nav-link ${isActiveLink('/roles') ? 'active' : ''}`}
//               >
//                 Roles
//               </Link>
//             )}

//             {/* Reports */}
//             {canAccessReports() && (
//               <Link
//                 to="/reports"
//                 className={`nav-link ${isActiveLink('/reports') ? 'active' : ''}`}
//               >
//                 Reports
//               </Link>
//             )}

//             {/* Audit Logs */}
//             {canAccessAuditLogs() && (
//               <Link
//                 to="/logs"
//                 className={`nav-link ${isActiveLink('/logs') ? 'active' : ''}`}
//               >
//                 Audit Logs
//               </Link>
//             )}

//             {/* Admin Only Sections */}
//             {isAdmin() && (
//               <>
//                 <Link
//                   to="/company-settings"
//                   className={`nav-link ${isActiveLink('/company-settings') ? 'active' : ''}`}
//                 >
//                   Company Settings
//                 </Link>
//                 <Link
//                   to="/system-settings"
//                   className={`nav-link ${isActiveLink('/system-settings') ? 'active' : ''}`}
//                 >
//                   System Settings
//                 </Link>
//               </>
//             )}

//             {/* Profile - Always visible */}
//             <Link
//               to="/profile"
//               className={`nav-link ${isActiveLink('/profile') ? 'active' : ''}`}
//             >
//               My Profile
//             </Link>

//             {/* Logout - Always visible */}
//             <button
//               onClick={handleLogout}
//               className="logout-button"
//             >
//               Logout
//             </button>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="main-content">
//           <div className="content-container">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default LaptopDashboardLayout;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LaptopDashboardLayout.css";
import { handleGetCompanyData } from "../services/companyService";
import { handleGetMyPersonalDetails } from "../services/personalDetailsService";

const LaptopDashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fetching the company data
  const [myCompanyData, setMyCompanyData] = useState(null);
  const [myPersonalDetails, setMyPersonalDetails] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await handleGetCompanyData();
        setMyCompanyData(response);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    const fetchPersonalDetails = async () => {
      try {
        const response = await handleGetMyPersonalDetails();
        setMyPersonalDetails(response);
      } catch (error) {
        console.error("Error fetching personal details:", error);
      }
    };

    fetchCompanyData();
    fetchPersonalDetails();
  }, []); // Empty dependency array to run once on component mount

  // Get user data with fallbacks
  const getUserData = () => {
    try {
      return JSON.parse(localStorage.getItem("user_data") || "{}");
    } catch {
      return {};
    }
  };

  const getRoleData = () => {
    try {
      return JSON.parse(localStorage.getItem("role_data") || "{}");
    } catch {
      return {};
    }
  };

  const userData = getUserData();
  const roleData = getRoleData()?.data || {}; // Accessing the 'data' property as per your structure

  // Header data with fallbacks - prioritizing personal details first name and job role
  const headerData = {
    companyLogo: myCompanyData?.company_logo_url || "/default-logo.png", // Fallback logo
    companyName: myCompanyData?.company_name || "-----",
    userName:
      myPersonalDetails?.first_name ||
      userData?.name ||
      userData?.full_name ||
      "John Doe",
    userRole: myPersonalDetails?.job_role || roleData?.role_name || "Employee", // Use job_role from personal details, then role_name
  };

  // Permission helper functions
  const canAccessEmployees = () => {
    return (
      roleData?.can_create_employee ||
      roleData?.can_view_all_employees ||
      roleData?.can_delete_employee ||
      roleData?.can_view_own_profile ||
      roleData?.can_view_team_members ||
      roleData?.can_view_department_employees ||
      roleData?.can_edit_all_employee_profiles ||
      roleData?.can_edit_own_profile ||
      roleData?.can_edit_team_profiles ||
      roleData?.can_archive_employee ||
      roleData?.can_restore_employee ||
      roleData?.can_activate_employee ||
      roleData?.can_deactivate_employee ||
      roleData?.can_suspend_employee ||
      roleData?.can_view_employee_documents ||
      roleData?.can_upload_employee_documents ||
      roleData?.can_delete_employee_documents
    );
  };

  const canAccessAttendance = () => {
    return (
      roleData?.can_view_own_attendance ||
      roleData?.can_view_team_attendance ||
      roleData?.can_view_department_attendance ||
      roleData?.can_view_all_attendance ||
      roleData?.can_checkin_own ||
      roleData?.can_checkout_own ||
      roleData?.can_start_break_own ||
      roleData?.can_end_break_own ||
      roleData?.can_edit_own_attendance ||
      roleData?.can_edit_team_attendance ||
      roleData?.can_edit_all_attendance ||
      roleData?.can_delete_attendance ||
      roleData?.can_approve_attendance ||
      roleData?.can_reject_attendance
    );
  };

  const canAccessLeaves = () => {
    return (
      roleData?.can_apply_own_leave ||
      roleData?.can_view_own_leave ||
      roleData?.can_view_team_leave ||
      roleData?.can_view_department_leave ||
      roleData?.can_view_all_leave ||
      roleData?.can_approve_team_leave ||
      roleData?.can_approve_department_leave ||
      roleData?.can_approve_all_leave ||
      roleData?.can_reject_team_leave ||
      roleData?.can_reject_department_leave ||
      roleData?.can_reject_all_leave ||
      roleData?.can_edit_own_leave ||
      roleData?.can_edit_team_leave ||
      roleData?.can_edit_all_leave ||
      roleData?.can_delete_leave_records ||
      roleData?.can_create_leave_types ||
      roleData?.can_edit_leave_types ||
      roleData?.can_delete_leave_types ||
      roleData?.can_manage_leave_policies ||
      roleData?.can_view_all_leave_balances ||
      roleData?.can_apply_leave_behalf ||
      roleData?.can_cancel_own_leave ||
      roleData?.can_cancel_team_leave
    );
  };

  const canAccessDepartments = () => {
    return (
      roleData?.can_create_department ||
      roleData?.can_view_all_departments ||
      roleData?.can_view_own_department ||
      roleData?.can_edit_all_departments ||
      roleData?.can_edit_own_department ||
      roleData?.can_delete_department ||
      roleData?.can_assign_employees_department ||
      roleData?.can_remove_employees_department ||
      roleData?.can_transfer_employees ||
      roleData?.can_manage_department_hierarchy ||
      roleData?.can_assign_department_head
    );
  };

  const canAccessRoles = () => {
    return (
      roleData?.can_create_roles ||
      roleData?.can_view_all_roles ||
      roleData?.can_edit_all_roles ||
      roleData?.can_delete_roles ||
      roleData?.can_assign_roles ||
      roleData?.can_unassign_roles
    );
  };

  const canAccessAuditLogs = () => {
    return (
      roleData?.can_view_all_audit_logs ||
      roleData?.can_view_own_audit_logs ||
      roleData?.can_view_team_audit_logs ||
      roleData?.can_export_audit_logs
    );
  };

  const canAccessReports = () => {
    return (
      roleData?.can_generate_employee_reports ||
      roleData?.can_generate_attendance_reports ||
      roleData?.can_generate_leave_reports ||
      roleData?.can_generate_department_reports ||
      roleData?.can_create_custom_reports ||
      roleData?.can_export_employee_data ||
      roleData?.can_export_attendance_data ||
      roleData?.can_export_leave_data ||
      roleData?.can_export_all_data
    );
  };

  const canAccessCompanySettings = () => {
    return (
      roleData?.can_view_company_details ||
      roleData?.can_edit_company_details ||
      roleData?.can_manage_company_settings ||
      roleData?.can_view_org_hierarchy ||
      roleData?.can_manage_org_hierarchy
    );
  };

  const canAccessSystemSettings = () => {
    return (
      roleData?.can_manage_system_settings ||
      roleData?.can_create_system_backup ||
      roleData?.can_restore_system_backup ||
      roleData?.can_enable_maintenance_mode ||
      roleData?.can_create_user_accounts ||
      roleData?.can_edit_user_accounts ||
      roleData?.can_delete_user_accounts ||
      roleData?.can_reset_user_passwords ||
      roleData?.can_lock_user_accounts ||
      roleData?.can_unlock_user_accounts
    );
  };

  const isAdmin = () => {
    return roleData?.role_name === "Admin Role" || roleData?.is_system_role;
  };

  // Navigation handlers
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="laptop-layout">
      {/* Header - Fixed Top */}
      <header className="laptop-header">
        <div className="header-container">
          <div className="header-left">
            <img
              src={headerData.companyLogo}
              alt={headerData.companyName}
              className="company-logo"
            />
            <h1 className="company-name">{headerData.companyName}</h1>
          </div>

          {/* Header Right */}
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">
                {headerData.userName.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <h3 className="user-name">{headerData.userName}</h3>
                <p className="user-role">{headerData.userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="layout-body">
        {/* Sidebar - Fixed Left */}
        <aside className="laptop-sidebar">
          {/* Sidebar Header */}
          <div className="sidebar-header">
            <h2 className="sidebar-title">HRMS</h2>
          </div>

          {/* Sidebar Navigation */}
          <nav className="sidebar-nav">
            {/* Dashboard - Always visible if user has any view dashboard permissions or is admin */}
            {(roleData?.can_view_employee_dashboard ||
              roleData?.can_view_attendance_dashboard ||
              roleData?.can_view_leave_dashboard ||
              roleData?.can_view_executive_dashboard ||
              isAdmin()) && (
              <Link
                to="/dashboard"
                className={`nav-link ${
                  isActiveLink("/dashboard") ? "active" : ""
                }`}
              >
                Dashboard
              </Link>
            )}

            {/* Attendance */}
            {canAccessAttendance() && (
              <Link
                to="/attendance"
                className={`nav-link ${
                  isActiveLink("/attendance") ? "active" : ""
                }`}
              >
                Attendance
              </Link>
            )}

            {/* Leaves */}
            {canAccessLeaves() && (
              <Link
                to="/leaves"
                className={`nav-link ${
                  isActiveLink("/leaves") ? "active" : ""
                }`}
              >
                Leaves
              </Link>
            )}

            {/* Employees */}
            {canAccessEmployees() && (
              <Link
                to="/employees"
                className={`nav-link ${
                  isActiveLink("/employees") ? "active" : ""
                }`}
              >
                Employees
              </Link>
            )}

            {/* Departments */}
            {canAccessDepartments() && (
              <Link
                to="/departments"
                className={`nav-link ${
                  isActiveLink("/departments") ? "active" : ""
                }`}
              >
                Departments
              </Link>
            )}

            {/* Roles */}
            {canAccessRoles() && (
              <Link
                to="/roles"
                className={`nav-link ${isActiveLink("/roles") ? "active" : ""}`}
              >
                Roles
              </Link>
            )}

            {/* Reports */}
            {canAccessReports() && (
              <Link
                to="/reports"
                className={`nav-link ${
                  isActiveLink("/reports") ? "active" : ""
                }`}
              >
                Reports
              </Link>
            )}

            {/* Audit Logs */}
            {canAccessAuditLogs() && (
              <Link
                to="/logs"
                className={`nav-link ${isActiveLink("/logs") ? "active" : ""}`}
              >
                Audit Logs
              </Link>
            )}

            {/* Company Settings */}
            {canAccessCompanySettings() && (
              <Link
                to="/company-settings"
                className={`nav-link ${
                  isActiveLink("/company-settings") ? "active" : ""
                }`}
              >
                Company Settings
              </Link>
            )}

            {/* System Settings */}
            {canAccessSystemSettings() && (
              <Link
                to="/system-settings"
                className={`nav-link ${
                  isActiveLink("/system-settings") ? "active" : ""
                }`}
              >
                System Settings
              </Link>
            )}

            {/* Profile - Always visible (can_view_own_profile or any view employee data) */}
            {(roleData?.can_view_own_profile || canAccessEmployees()) && (
              <Link
                to="/profile"
                className={`nav-link ${
                  isActiveLink("/profile") ? "active" : ""
                }`}
              >
                My Profile
              </Link>
            )}

            {/* Logout - Always visible */}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-container">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default LaptopDashboardLayout;
