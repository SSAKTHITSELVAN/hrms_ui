// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import {handleGetCompanyData} from '../services/companyService'
// // import {handleGetMyPersonalDetails} from '../services/personalDetailsService'
// // import './MobileDashboardLayout.css'; // Import the CSS file

// // const MobileDashboardLayout = ({ children, currentWidth, mobileBreakpoint }) => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// //   // You can still use isLaptopView for any internal component logic if needed
// //   // const isLaptopView = currentWidth > mobileBreakpoint; 

// //   // Fetching the company data and personal details
// //   const [myCompanyData, setMyCompanyData] = useState(null);
// //   const [myPersonalDetails, setMyPersonalDetails] = useState(null);

// //   useEffect(() => {
// //         const fetchCompanyData = async () => {
// //             try {
// //                 const response = await handleGetCompanyData();
// //                 setMyCompanyData(response);
// //             } catch (error) {
// //                 console.error('Error fetching company data:', error);
// //             }
// //         };

// //         const fetchPersonalDetails = async () => {
// //             try {
// //                 const response = await handleGetMyPersonalDetails();
// //                 setMyPersonalDetails(response);
// //             } catch (error) {
// //                 console.error('Error fetching personal details:', error);
// //             }
// //         };

// //         fetchCompanyData();
// //         fetchPersonalDetails();
// //     }, []); 

// //   // Prevent body scroll when mobile menu is open
// //   useEffect(() => {
// //     if (isMobileMenuOpen) {
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       document.body.style.overflow = '';
// //     }
    
// //     return () => {
// //       document.body.style.overflow = '';
// //     };
// //   }, [isMobileMenuOpen]);

// //   // Get user data with fallbacks
// //   const getUserData = () => {
// //     try {
// //       return JSON.parse(localStorage.getItem('user_data') || '{}');
// //     } catch {
// //       return {};
// //     }
// //   };

// //   const userData = getUserData();

// //   // Header data with fallbacks - using personal details for both name and job role
// //   const headerData = {
// //     companyLogo: myCompanyData?.company_logo_url || "/default-logo.png",
// //     companyName: myCompanyData?.company_name || '-----',
// //     userName: myPersonalDetails?.first_name || userData?.name || userData?.full_name || "John Doe",
// //     userRole: myPersonalDetails?.job_role || "Employee",
// //     employeeId: userData?.employee_id || "-----"
// //   };

// //   // Navigation handlers
// //   const toggleMobileMenu = () => {
// //     setIsMobileMenuOpen(!isMobileMenuOpen);
// //   };

// //   const closeMobileMenu = () => {
// //     setIsMobileMenuOpen(false);
// //   };

// //   const handleLinkClick = (path) => {
// //     navigate(path);
// //     setIsMobileMenuOpen(false);
// //   };

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     navigate('/login');
// //     setIsMobileMenuOpen(false);
// //   };

// //   const isActiveLink = (path) => {
// //     return location.pathname === path;
// //   };

// //   return (
// //     <div className="mobile-dashboard-container">
// //       {/* This new wrapper will be centered on laptop screens */}
// //       <div className="dashboard-center-wrapper"> 
// //         {/* Mobile Header - Now positioned absolute within dashboard-center-wrapper */}
// //         <header className="mobile-header">
// //           {/* Hamburger Menu Button */}
// //           <button 
// //             onClick={toggleMobileMenu}
// //             className="hamburger-button"
// //           >
// //             <div className="hamburger-icon">
// //               <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
// //               <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
// //               <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
// //             </div>
// //           </button>

// //           {/* Company Info */}
// //           <div className="company-info">
// //             <img
// //                 src={headerData.companyLogo}
// //                 alt={headerData.companyName}
// //                 className="company-logo"
// //               />
// //           </div>

// //           {/* User Avatar */}
// //           <div className="user-avatar">
// //             {headerData.userName.charAt(0).toUpperCase()}
// //           </div>
// //         </header>

// //         {/* Mobile Overlay - Keep this fixed for full screen coverage */}
// //         {isMobileMenuOpen && (
// //           <div 
// //             onClick={closeMobileMenu}
// //             className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
// //           />
// //         )}

// //         {/* Mobile Sidebar - Now positioned absolute within dashboard-center-wrapper */}
// //         <aside className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
// //           {/* Mobile Navigation */}
// //           <nav className="mobile-nav">
// //             <button onClick={() => handleLinkClick('/dashboard')} className={`nav-button ${isActiveLink('/dashboard') ? 'active' : ''}`}>Dashboard</button>
// //             <button onClick={() => handleLinkClick('/attendance')} className={`nav-button ${isActiveLink('/attendance') ? 'active' : ''}`}>Attendance</button>
// //             <button onClick={() => handleLinkClick('/leaves')} className={`nav-button ${isActiveLink('/leaves') ? 'active' : ''}`}>Leaves</button>
// //             <button onClick={() => handleLinkClick('/employees')} className={`nav-button ${isActiveLink('/employees') ? 'active' : ''}`}>Employees</button>
// //             <button onClick={() => handleLinkClick('/departments')} className={`nav-button ${isActiveLink('/departments') ? 'active' : ''}`}>Departments</button>
// //             <button onClick={() => handleLinkClick('/roles')} className={`nav-button ${isActiveLink('/roles') ? 'active' : ''}`}>Roles</button>
// //             <button onClick={() => handleLinkClick('/reports')} className={`nav-button ${isActiveLink('/reports') ? 'active' : ''}`}>Reports</button>
// //             <button onClick={() => handleLinkClick('/logs')} className={`nav-button ${isActiveLink('/logs') ? 'active' : ''}`}>Audit Logs</button>
// //             <button onClick={() => handleLinkClick('/company-settings')} className={`nav-button ${isActiveLink('/company-settings') ? 'active' : ''}`}>Company Settings</button>
// //             <button onClick={() => handleLinkClick('/system-settings')} className={`nav-button ${isActiveLink('/system-settings') ? 'active' : ''}`}>System Settings</button>
// //             <button onClick={() => handleLinkClick('/profile')} className={`nav-button ${isActiveLink('/profile') ? 'active' : ''}`}>My Profile</button>
// //             <button onClick={handleLogout} className="logout-button">Logout</button>
// //           </nav>
// //         </aside>

// //         {/* Main Content Area - now its width is constrained by .dashboard-center-wrapper */}
// //         <main className="main-content">
// //           <div className="content-wrapper">
// //             {children} {/* Your actual page content will be rendered here */}
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MobileDashboardLayout;





// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { handleGetCompanyData } from '../services/companyService';
// import { handleGetMyPersonalDetails } from '../services/personalDetailsService';
// import './MobileDashboardLayout.css';

// const MobileDashboardLayout = ({ children }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Redux roles_data
//   const roleData = useSelector((state) => state.roles.role);

//   // Fetch company & personal details
//   const [myCompanyData, setMyCompanyData] = useState(null);
//   const [myPersonalDetails, setMyPersonalDetails] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setMyCompanyData(await handleGetCompanyData());
//         setMyPersonalDetails(await handleGetMyPersonalDetails());
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Prevent body scroll
//   useEffect(() => {
//     document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
//     return () => { document.body.style.overflow = ''; };
//   }, [isMobileMenuOpen]);

//   // User data fallback
//   const userData = JSON.parse(localStorage.getItem('user_data') || '{}');

//   const headerData = {
//     companyLogo: myCompanyData?.company_logo_url || "/default-logo.png",
//     companyName: myCompanyData?.company_name || '-----',
//     userName: myPersonalDetails?.first_name || userData?.name || userData?.full_name || "John Doe",
//     userRole: myPersonalDetails?.job_role || "Employee",
//     employeeId: userData?.employee_id || "-----"
//   };

//   // Menu route -> permissions mapping
//   const menuPermissions = {
//     '/attendance': [
//       'can_checkin_own', 'can_checkout_own', 'can_start_break_own', 'can_end_break_own',
//       'can_view_own_attendance', 'can_view_team_attendance', 'can_view_department_attendance', 'can_view_all_attendance',
//       'can_edit_own_attendance', 'can_edit_team_attendance', 'can_edit_all_attendance',
//       'can_delete_attendance', 'can_approve_attendance', 'can_reject_attendance'
//     ],
//     '/leaves': [
//       'can_apply_own_leave', 'can_apply_leave_behalf', 'can_cancel_own_leave', 'can_cancel_team_leave',
//       'can_view_own_leave', 'can_view_team_leave', 'can_view_department_leave', 'can_view_all_leave',
//       'can_approve_team_leave', 'can_approve_department_leave', 'can_approve_all_leave',
//       'can_reject_team_leave', 'can_reject_department_leave', 'can_reject_all_leave',
//       'can_edit_own_leave', 'can_edit_team_leave', 'can_edit_all_leave', 'can_delete_leave_records'
//     ],
//     '/employees': [
//       'can_create_employee','can_view_all_employees','can_view_own_profile','can_view_team_members','can_view_department_employees',
//       'can_edit_all_employee_profiles','can_edit_own_profile','can_edit_team_profiles','can_delete_employee',
//       'can_archive_employee','can_restore_employee','can_activate_employee','can_deactivate_employee','can_suspend_employee'
//     ],
//     '/departments': [
//       'can_create_department','can_view_all_departments','can_view_own_department',
//       'can_edit_all_departments','can_edit_own_department','can_delete_department',
//       'can_assign_employees_department','can_remove_employees_department','can_transfer_employees',
//       'can_manage_department_hierarchy','can_assign_department_head'
//     ],
//     '/roles': [
//       'can_create_roles','can_view_all_roles','can_edit_all_roles','can_delete_roles',
//       'can_assign_roles','can_unassign_roles'
//     ],
//     '/reports': [
//       'can_generate_employee_reports','can_generate_attendance_reports','can_generate_leave_reports',
//       'can_generate_department_reports','can_create_custom_reports','can_export_employee_data',
//       'can_export_attendance_data','can_export_leave_data','can_export_all_data'
//     ],
//     '/logs': [
//       'can_view_all_audit_logs','can_view_own_audit_logs','can_view_team_audit_logs','can_export_audit_logs'
//     ],
//     '/company-settings': [
//       'can_view_company_details','can_edit_company_details','can_manage_company_settings'
//     ],
//     '/system-settings': [
//       'can_manage_system_settings','can_create_system_backup','can_restore_system_backup','can_enable_maintenance_mode'
//     ]
//   };

//   // Check if menu should show: any permission is true
//   const canAccessMenu = (menuPath) => {
//     if (!roleData) return false;
//     const permissions = menuPermissions[menuPath] || [];
//     return permissions.some((perm) => roleData[perm] === true);
//   };

//   // Handlers
//   const handleLinkClick = (path) => { navigate(path); setIsMobileMenuOpen(false); };
//   const handleLogout = () => { localStorage.clear(); navigate('/login'); setIsMobileMenuOpen(false); };
//   const isActiveLink = (path) => location.pathname === path;

//   return (
//     <div className="mobile-dashboard-container">
//       <div className="dashboard-center-wrapper"> 
//         <header className="mobile-header">
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="hamburger-button">
//             <div className="hamburger-icon">
//               <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
//               <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
//               <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
//             </div>
//           </button>
//           <div className="company-info">
//             <img src={headerData.companyLogo} alt={headerData.companyName} className="company-logo" />
//           </div>
//           <div className="user-avatar">{headerData.userName.charAt(0).toUpperCase()}</div>
//         </header>

//         {isMobileMenuOpen && <div onClick={() => setIsMobileMenuOpen(false)} className={`mobile-overlay active`} />}

//         <aside className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
//           <nav className="mobile-nav">
//             {/* Always visible */}
//             <button onClick={() => handleLinkClick('/dashboard')} className={`nav-button ${isActiveLink('/dashboard') ? 'active' : ''}`}>Dashboard</button>

//             {canAccessMenu('/attendance') && (
//               <button onClick={() => handleLinkClick('/attendance')} className={`nav-button ${isActiveLink('/attendance') ? 'active' : ''}`}>Attendance</button>
//             )}
//             {canAccessMenu('/leaves') && (
//               <button onClick={() => handleLinkClick('/leaves')} className={`nav-button ${isActiveLink('/leaves') ? 'active' : ''}`}>Leaves</button>
//             )}
//             {canAccessMenu('/employees') && (
//               <button onClick={() => handleLinkClick('/employees')} className={`nav-button ${isActiveLink('/employees') ? 'active' : ''}`}>Employees</button>
//             )}
//             {canAccessMenu('/departments') && (
//               <button onClick={() => handleLinkClick('/departments')} className={`nav-button ${isActiveLink('/departments') ? 'active' : ''}`}>Departments</button>
//             )}
//             {canAccessMenu('/roles') && (
//               <button onClick={() => handleLinkClick('/roles')} className={`nav-button ${isActiveLink('/roles') ? 'active' : ''}`}>Roles</button>
//             )}
//             {canAccessMenu('/reports') && (
//               <button onClick={() => handleLinkClick('/reports')} className={`nav-button ${isActiveLink('/reports') ? 'active' : ''}`}>Reports</button>
//             )}
//             {canAccessMenu('/logs') && (
//               <button onClick={() => handleLinkClick('/logs')} className={`nav-button ${isActiveLink('/logs') ? 'active' : ''}`}>Audit Logs</button>
//             )}
//             {canAccessMenu('/company-settings') && (
//               <button onClick={() => handleLinkClick('/company-settings')} className={`nav-button ${isActiveLink('/company-settings') ? 'active' : ''}`}>Company Settings</button>
//             )}
//             {canAccessMenu('/system-settings') && (
//               <button onClick={() => handleLinkClick('/system-settings')} className={`nav-button ${isActiveLink('/system-settings') ? 'active' : ''}`}>System Settings</button>
//             )}

//             {/* Always visible */}
//             <button onClick={() => handleLinkClick('/profile')} className={`nav-button ${isActiveLink('/profile') ? 'active' : ''}`}>My Profile</button>
//             <button onClick={handleLogout} className="logout-button">Logout</button>
//           </nav>
//         </aside>

//         <main className="main-content">
//           <div className="content-wrapper">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MobileDashboardLayout;




import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { handleGetCompanyData } from '../services/companyService';
import { handleGetMyPersonalDetails } from '../services/personalDetailsService';
import './MobileDashboardLayout.css';

const MobileDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roleData = useSelector((state) => state.roles.role);
  // console.log('Role in layout:', roleData);

  const [myCompanyData, setMyCompanyData] = useState(null);
  const [myPersonalDetails, setMyPersonalDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMyCompanyData(await handleGetCompanyData());
        setMyPersonalDetails(await handleGetMyPersonalDetails());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const userData = JSON.parse(localStorage.getItem('user_data') || '{}');

  const headerData = {
    companyLogo: myCompanyData?.company_logo_url || "/default-logo.png",
    companyName: myCompanyData?.company_name || '-----',
    userName: myPersonalDetails?.first_name || userData?.name || userData?.full_name || "John Doe",
    userRole: myPersonalDetails?.job_role || "Employee",
    employeeId: userData?.employee_id || "-----"
  };

  const menuPermissions = {
    '/attendance': [
      'can_checkin_own','can_checkout_own','can_start_break_own','can_end_break_own',
      'can_view_own_attendance','can_view_team_attendance','can_view_department_attendance','can_view_all_attendance',
      'can_edit_own_attendance','can_edit_team_attendance','can_edit_all_attendance',
      'can_delete_attendance','can_approve_attendance','can_reject_attendance'
    ],
    '/leaves': [
      'can_apply_own_leave','can_apply_leave_behalf','can_cancel_own_leave','can_cancel_team_leave',
      'can_view_own_leave','can_view_team_leave','can_view_department_leave','can_view_all_leave',
      'can_approve_team_leave','can_approve_department_leave','can_approve_all_leave',
      'can_reject_team_leave','can_reject_department_leave','can_reject_all_leave',
      'can_edit_own_leave','can_edit_team_leave','can_edit_all_leave','can_delete_leave_records'
    ],
    '/employees': [
      'can_create_employee','can_view_all_employees','can_view_own_profile','can_view_team_members','can_view_department_employees',
      'can_edit_all_employee_profiles','can_edit_own_profile','can_edit_team_profiles','can_delete_employee',
      'can_archive_employee','can_restore_employee','can_activate_employee','can_deactivate_employee','can_suspend_employee'
    ],
    '/departments': [
      'can_create_department','can_view_all_departments','can_view_own_department',
      'can_edit_all_departments','can_edit_own_department','can_delete_department',
      'can_assign_employees_department','can_remove_employees_department','can_transfer_employees',
      'can_manage_department_hierarchy','can_assign_department_head'
    ],
    '/roles': [
      'can_create_roles','can_view_all_roles','can_edit_all_roles','can_delete_roles',
      'can_assign_roles','can_unassign_roles'
    ],
    '/reports': [
      'can_generate_employee_reports','can_generate_attendance_reports','can_generate_leave_reports',
      'can_generate_department_reports','can_create_custom_reports','can_export_employee_data',
      'can_export_attendance_data','can_export_leave_data','can_export_all_data'
    ],
    '/logs': [
      'can_view_all_audit_logs','can_view_own_audit_logs','can_view_team_audit_logs','can_export_audit_logs'
    ],
    '/company-settings': [
      'can_view_company_details','can_edit_company_details','can_manage_company_settings'
    ],
    '/system-settings': [
      'can_manage_system_settings','can_create_system_backup','can_restore_system_backup','can_enable_maintenance_mode'
    ]
  };

  const canAccessMenu = (menuPath) => {
    if (!roleData) return false;
    const permissionsObject = roleData.data || roleData; // ✅ support flattened or nested
    const permissions = menuPermissions[menuPath] || [];
    return permissions.some((perm) => permissionsObject[perm] === true);
  };

  const handleLinkClick = (path) => { navigate(path); setIsMobileMenuOpen(false); };
  const handleLogout = () => { localStorage.clear(); navigate('/login'); setIsMobileMenuOpen(false); };
  const isActiveLink = (path) => location.pathname === path;

  return (
    <div className="mobile-dashboard-container">
      <div className="dashboard-center-wrapper"> 
        <header className="mobile-header">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="hamburger-button">
            <div className="hamburger-icon">
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </div>
          </button>
          <div className="company-info">
            <img src={headerData.companyLogo} alt={headerData.companyName} className="company-logo" />
          </div>
          <div className="user-avatar">{headerData.userName.charAt(0).toUpperCase()}</div>
        </header>

        {isMobileMenuOpen && <div onClick={() => setIsMobileMenuOpen(false)} className={`mobile-overlay active`} />}

        <aside className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            <button onClick={() => handleLinkClick('/dashboard')} className={`nav-button ${isActiveLink('/dashboard') ? 'active' : ''}`}>Dashboard</button>

            {canAccessMenu('/attendance') && <button onClick={() => handleLinkClick('/attendance')} className={`nav-button ${isActiveLink('/attendance') ? 'active' : ''}`}>Attendance</button>}
            {canAccessMenu('/leaves') && <button onClick={() => handleLinkClick('/leaves')} className={`nav-button ${isActiveLink('/leaves') ? 'active' : ''}`}>Leaves</button>}
            {canAccessMenu('/employees') && <button onClick={() => handleLinkClick('/employees')} className={`nav-button ${isActiveLink('/employees') ? 'active' : ''}`}>Employees</button>}
            {canAccessMenu('/departments') && <button onClick={() => handleLinkClick('/departments')} className={`nav-button ${isActiveLink('/departments') ? 'active' : ''}`}>Departments</button>}
            {canAccessMenu('/roles') && <button onClick={() => handleLinkClick('/roles')} className={`nav-button ${isActiveLink('/roles') ? 'active' : ''}`}>Roles</button>}
            {canAccessMenu('/reports') && <button onClick={() => handleLinkClick('/reports')} className={`nav-button ${isActiveLink('/reports') ? 'active' : ''}`}>Reports</button>}
            {canAccessMenu('/logs') && <button onClick={() => handleLinkClick('/logs')} className={`nav-button ${isActiveLink('/logs') ? 'active' : ''}`}>Audit Logs</button>}
            {canAccessMenu('/company-settings') && <button onClick={() => handleLinkClick('/company-settings')} className={`nav-button ${isActiveLink('/company-settings') ? 'active' : ''}`}>Company Settings</button>}
            {canAccessMenu('/system-settings') && <button onClick={() => handleLinkClick('/system-settings')} className={`nav-button ${isActiveLink('/system-settings') ? 'active' : ''}`}>System Settings</button>}

            <button onClick={() => handleLinkClick('/profile')} className={`nav-button ${isActiveLink('/profile') ? 'active' : ''}`}>My Profile</button>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </nav>
        </aside>

        <main className="main-content">
          <div className="content-wrapper">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MobileDashboardLayout;
