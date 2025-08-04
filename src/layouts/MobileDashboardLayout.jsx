// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate, useLocation } from 'react-router-dom';
// // // import {handleGetCompanyData} from '../services/companyService'
// // // import {handleGetMyPersonalDetails} from '../services/personalDetailsService'


// // // const MobileDashboardLayout = ({ children }) => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// // //     // Fetching the company data and personal details
// // //     const [myCompanyData, setMyCompanyData] = useState(null);
// // //     const [myPersonalDetails, setMyPersonalDetails] = useState(null);

// // //     useEffect(() => {
// // //           const fetchCompanyData = async () => {
// // //               try {
// // //                   const response = await handleGetCompanyData();
// // //                   setMyCompanyData(response);
// // //               } catch (error) {
// // //                   console.error('Error fetching company data:', error);
// // //               }
// // //           };

// // //           const fetchPersonalDetails = async () => {
// // //               try {
// // //                   const response = await handleGetMyPersonalDetails();
// // //                   setMyPersonalDetails(response);
// // //               } catch (error) {
// // //                   console.error('Error fetching personal details:', error);
// // //               }
// // //           };
  
// // //           fetchCompanyData();
// // //           fetchPersonalDetails();
// // //       }, []); // Empty dependency array to run once on component mount


// // //   // Prevent body scroll when mobile menu is open
// // //   useEffect(() => {
// // //     if (isMobileMenuOpen) {
// // //       document.body.style.overflow = 'hidden';
// // //     } else {
// // //       document.body.style.overflow = '';
// // //     }
    
// // //     return () => {
// // //       document.body.style.overflow = '';
// // //     };
// // //   }, [isMobileMenuOpen]);

// // //   // Get user data with fallbacks
// // //   const getUserData = () => {
// // //     try {
// // //       return JSON.parse(localStorage.getItem('user_data') || '{}');
// // //     } catch {
// // //       return {};
// // //     }
// // //   };

// // //   const getRoleData = () => {
// // //     try {
// // //       return JSON.parse(localStorage.getItem('role_data') || '{}');
// // //     } catch {
// // //       return {};
// // //     }
// // //   };

// // //   const userData = getUserData();
// // //   const roleData = getRoleData()?.data || {};

// // //   // Header data with fallbacks - prioritizing personal details first name
// // //   const headerData = {
// // //     companyName: myCompanyData?.company_name || '-----',
// // //     userName: myPersonalDetails?.first_name || userData?.name || userData?.full_name || "John Doe",
// // //     userRole: roleData?.role_name || "Employee",
// // //     employeeId: userData?.employee_id || "-----"
// // //   };

// // //   // Permission helper functions
// // //   const canAccessEmployees = () => {
// // //     return roleData?.can_create_employee || 
// // //            roleData?.can_view_all_employees || 
// // //            roleData?.can_delete_employee;
// // //   };

// // //   const canAccessAttendance = () => {
// // //     return roleData?.can_view_own_attendance || 
// // //            roleData?.can_view_team_attendance || 
// // //            roleData?.can_view_all_attendance ||
// // //            roleData?.can_checkin_own ||
// // //            roleData?.can_checkout_own;
// // //   };

// // //   const canAccessLeaves = () => {
// // //     return roleData?.can_apply_own_leave || 
// // //            roleData?.can_view_own_leave || 
// // //            roleData?.can_view_team_leave || 
// // //            roleData?.can_view_all_leave ||
// // //            roleData?.can_approve_team_leave;
// // //   };

// // //   const canAccessDepartments = () => {
// // //     return roleData?.can_create_department || 
// // //            roleData?.can_view_all_departments || 
// // //            roleData?.can_edit_all_departments ||
// // //            roleData?.can_delete_department;
// // //   };

// // //   const canAccessRoles = () => {
// // //     return roleData?.can_create_roles || 
// // //            roleData?.can_view_all_roles || 
// // //            roleData?.can_edit_all_roles ||
// // //            roleData?.can_delete_roles;
// // //   };

// // //   const canAccessAuditLogs = () => {
// // //     return roleData?.can_view_all_audit_logs || 
// // //            roleData?.can_view_own_audit_logs || 
// // //            roleData?.can_view_team_audit_logs;
// // //   };

// // //   const canAccessReports = () => {
// // //     return roleData?.can_generate_employee_reports || 
// // //            roleData?.can_generate_attendance_reports || 
// // //            roleData?.can_generate_leave_reports ||
// // //            roleData?.can_create_custom_reports;
// // //   };

// // //   const isAdmin = () => {
// // //     return roleData?.role_name === "Admin Role" || roleData?.is_system_role;
// // //   };

// // //   // Navigation handlers
// // //   const toggleMobileMenu = () => {
// // //     setIsMobileMenuOpen(!isMobileMenuOpen);
// // //   };

// // //   const closeMobileMenu = () => {
// // //     setIsMobileMenuOpen(false);
// // //   };

// // //   const handleLinkClick = (path) => {
// // //     navigate(path);
// // //     setIsMobileMenuOpen(false);
// // //   };

// // //   const handleLogout = () => {
// // //     // Clear localStorage
// // //     localStorage.removeItem('user_data');
// // //     localStorage.removeItem('role_data');
// // //     localStorage.removeItem('auth_token');
    
// // //     // Navigate to login
// // //     navigate('/login');
// // //     setIsMobileMenuOpen(false);
// // //   };

// // //   const isActiveLink = (path) => {
// // //     return location.pathname === path;
// // //   };

// // //   return (
// // //     <div style={{ 
// // //       display: 'flex', 
// // //       flexDirection: 'column', 
// // //       height: '100vh',
// // //       position: 'relative'
// // //     }}>
// // //       {/* Mobile Header - Full Width */}
// // //       <header style={{
// // //         position: 'fixed',
// // //         top: 0,
// // //         left: 0,
// // //         right: 0,
// // //         height: '60px',
// // //         backgroundColor: '#ffffff',
// // //         borderBottom: '1px solid #e0e0e0',
// // //         display: 'flex',
// // //         alignItems: 'center',
// // //         padding: '0 1rem',
// // //         zIndex: 1000
// // //       }}>
// // //         {/* Hamburger Menu Button */}
// // //         <button 
// // //           onClick={toggleMobileMenu}
// // //           style={{
// // //             background: 'none',
// // //             border: 'none',
// // //             cursor: 'pointer',
// // //             padding: '8px',
// // //             marginRight: '12px'
// // //           }}
// // //         >
// // //           <div style={{ width: '24px', height: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
// // //             <span style={{ display: 'block', height: '2px', width: '100%', backgroundColor: '#000', transition: 'all 0.3s ease' }}></span>
// // //             <span style={{ display: 'block', height: '2px', width: '100%', backgroundColor: '#000', transition: 'all 0.3s ease' }}></span>
// // //             <span style={{ display: 'block', height: '2px', width: '100%', backgroundColor: '#000', transition: 'all 0.3s ease' }}></span>
// // //           </div>
// // //         </button>

// // //         {/* Company Info */}
// // //         <div style={{ flex: 1 }}>
// // //           <h1 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, color: '#000' }}>
// // //             {headerData.companyName}
// // //           </h1>
// // //         </div>

// // //         {/* User Avatar */}
// // //         <div style={{
// // //           width: '36px',
// // //           height: '36px',
// // //           borderRadius: '50%',
// // //           backgroundColor: '#000',
// // //           color: '#fff',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'center',
// // //           fontWeight: '600',
// // //           fontSize: '0.875rem'
// // //         }}>
// // //           {headerData.userName.charAt(0).toUpperCase()}
// // //         </div>
// // //       </header>

// // //       {/* Mobile Overlay */}
// // //       {isMobileMenuOpen && (
// // //         <div 
// // //           onClick={closeMobileMenu}
// // //           style={{
// // //             position: 'fixed',
// // //             top: 0,
// // //             left: 0,
// // //             right: 0,
// // //             bottom: 0,
// // //             backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // //             zIndex: 998
// // //           }}
// // //         />
// // //       )}

// // //       {/* Mobile Sidebar - Slide from Left */}
// // //       <aside style={{
// // //         position: 'fixed',
// // //         top: '60px',
// // //         left: 0,
// // //         bottom: 0,
// // //         width: '280px',
// // //         backgroundColor: '#ffffff',
// // //         borderRight: '1px solid #e0e0e0',
// // //         transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
// // //         transition: 'transform 0.3s ease',
// // //         zIndex: 999,
// // //         overflowY: 'auto'
// // //       }}>
// // //         {/* Sidebar Header */}
// // //         <div style={{ padding: '1.5rem 1rem 1rem 1rem', borderBottom: '1px solid #e0e0e0' }}>
// // //           <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#000', margin: 0 }}>
// // //             HRMS
// // //           </h2>
// // //         </div>
        
// // //         {/* Mobile Navigation */}
// // //         <nav style={{ padding: '1rem 0' }}>
// // //           {/* Dashboard - Always visible */}
// // //           <button 
// // //             onClick={() => handleLinkClick('/dashboard')}
// // //             style={{
// // //               display: 'block',
// // //               width: '100%',
// // //               padding: '1rem',
// // //               background: isActiveLink('/dashboard') ? '#f0f0f0' : 'none',
// // //               border: 'none',
// // //               textAlign: 'left',
// // //               color: '#000',
// // //               fontSize: '1rem',
// // //               fontWeight: isActiveLink('/dashboard') ? '600' : '500',
// // //               cursor: 'pointer',
// // //               borderLeft: isActiveLink('/dashboard') ? '3px solid #000' : '3px solid transparent'
// // //             }}
// // //           >
// // //             Dashboard
// // //           </button>

// // //           {/* Attendance */}
// // //           {canAccessAttendance() && (
// // //             <button 
// // //               onClick={() => handleLinkClick('/attendance')}
// // //               style={{
// // //                 display: 'block',
// // //                 width: '100%',
// // //                 padding: '1rem',
// // //                 background: isActiveLink('/attendance') ? '#f0f0f0' : 'none',
// // //                 border: 'none',
// // //                 textAlign: 'left',
// // //                 color: '#000',
// // //                 fontSize: '1rem',
// // //                 fontWeight: isActiveLink('/attendance') ? '600' : '500',
// // //                 cursor: 'pointer',
// // //                 borderLeft: isActiveLink('/attendance') ? '3px solid #000' : '3px solid transparent'
// // //               }}
// // //             >
// // //               Attendance
// // //             </button>
// // //           )}

// // //           {/* Leaves */}
// // //           {canAccessLeaves() && (
// // //             <button 
// // //               onClick={() => handleLinkClick('/leaves')}
// // //               style={{
// // //                 display: 'block',
// // //                 width: '100%',
// // //                 padding: '1rem',
// // //                 background: isActiveLink('/leaves') ? '#f0f0f0' : 'none',
// // //                 border: 'none',
// // //                 textAlign: 'left',
// // //                 color: '#000',
// // //                 fontSize: '1rem',
// // //                 fontWeight: isActiveLink('/leaves') ? '600' : '500',
// // //                 cursor: 'pointer',
// // //                 borderLeft: isActiveLink('/leaves') ? '3px solid #000' : '3px solid transparent'
// // //               }}
// // //             >
// // //               Leaves
// // //             </button>
// // //           )}

// // //           {/* Employees */}
// // //           {canAccessEmployees() && (
// // //             <button 
// // //               onClick={() => handleLinkClick('/employees')}
// // //               style={{
// // //                 display: 'block',
// // //                 width: '100%',
// // //                 padding: '1rem',
// // //                 background: isActiveLink('/employees') ? '#f0f0f0' : 'none',
// // //                 border: 'none',
// // //                 textAlign: 'left',
// // //                 color: '#000',
// // //                 fontSize: '1rem',
// // //                 fontWeight: isActiveLink('/employees') ? '600' : '500',
// // //                 cursor: 'pointer',
// // //                 borderLeft: isActiveLink('/employees') ? '3px solid #000' : '3px solid transparent'
// // //               }}
// // //             >
// // //               Employees
// // //             </button>
// // //           )}

// // //           {/* Departments */}
// // //           {canAccessDepartments() && (
// // //             <button 
// // //               onClick={() => handleLinkClick('/departments')}
// // //               style={{
// // //                 display: 'block',
// // //                 width: '100%',
// // //                 padding: '1rem',
// // //                 background: isActiveLink('/departments') ? '#f0f0f0' : 'none',
// // //                 border: 'none',
// // //                 textAlign: 'left',
// // //                 color: '#000',
// // //                 fontSize: '1rem',
// // //                 fontWeight: isActiveLink('/departments') ? '600' : '500',
// // //                 cursor: 'pointer',
// // //                 borderLeft: isActiveLink('/departments') ? '3px solid #000' : '3px solid transparent'
// // //               }}
// // //             >
// // //               Departments
// // //             </button>
// // //           )}

// // //           {/* Roles */}
// // //           {canAccessRoles() && (
// // //             <button 
// // //               onClick={() => handleLinkClick('/roles')}
// // //               style={{
// // //                 display: 'block',
// // //                 width: '100%',
// // //                 padding: '1rem',
// // //                 background: isActiveLink('/roles') ? '#f0f0f0' : 'none',
// // //                 border: 'none',
// // //                 textAlign: 'left',
// // //                 color: '#000',
// // //                 fontSize: '1rem',
// // //                 fontWeight: isActiveLink('/roles') ? '600' : '500',
// // //                 cursor: 'pointer',
// // //                 borderLeft: isActiveLink('/roles') ? '3px solid #000' : '3px solid transparent'
// // //               }}
// // //             >
// // //               Roles
// // //             </button>
// // //           )}

// // //           {/* Reports */}
// // //           {canAccessReports() && (
// // //             <button 
// // //               onClick={() => handleLinkClick('/reports')}
// // //               style={{
// // //                 display: 'block',
// // //                 width: '100%',
// // //                 padding: '1rem',
// // //                 background: isActiveLink('/reports') ? '#f0f0f0' : 'none',
// // //                 border: 'none',
// // //                 textAlign: 'left',
// // //                 color: '#000',
// // //                 fontSize: '1rem',
// // //                 fontWeight: isActiveLink('/reports') ? '600' : '500',
// // //                 cursor: 'pointer',
// // //                 borderLeft: isActiveLink('/reports') ? '3px solid #000' : '3px solid transparent'
// // //               }}
// // //             >
// // //               Reports
// // //             </button>
// // //           )}

// // //           {/* Audit Logs */}
// // //           {canAccessAuditLogs() && (
// // //             <button 
// // //               onClick={() => handleLinkClick('/logs')}
// // //               style={{
// // //                 display: 'block',
// // //                 width: '100%',
// // //                 padding: '1rem',
// // //                 background: isActiveLink('/logs') ? '#f0f0f0' : 'none',
// // //                 border: 'none',
// // //                 textAlign: 'left',
// // //                 color: '#000',
// // //                 fontSize: '1rem',
// // //                 fontWeight: isActiveLink('/logs') ? '600' : '500',
// // //                 cursor: 'pointer',
// // //                 borderLeft: isActiveLink('/logs') ? '3px solid #000' : '3px solid transparent'
// // //               }}
// // //             >
// // //               Audit Logs
// // //             </button>
// // //           )}

// // //           {/* Admin Only Sections */}
// // //           {isAdmin() && (
// // //             <>
// // //               <button 
// // //                 onClick={() => handleLinkClick('/company-settings')}
// // //                 style={{
// // //                   display: 'block',
// // //                   width: '100%',
// // //                   padding: '1rem',
// // //                   background: isActiveLink('/company-settings') ? '#f0f0f0' : 'none',
// // //                   border: 'none',
// // //                   textAlign: 'left',
// // //                   color: '#000',
// // //                   fontSize: '1rem',
// // //                   fontWeight: isActiveLink('/company-settings') ? '600' : '500',
// // //                   cursor: 'pointer',
// // //                   borderLeft: isActiveLink('/company-settings') ? '3px solid #000' : '3px solid transparent'
// // //                 }}
// // //               >
// // //                 Company Settings
// // //               </button>
// // //               <button 
// // //                 onClick={() => handleLinkClick('/system-settings')}
// // //                 style={{
// // //                   display: 'block',
// // //                   width: '100%',
// // //                   padding: '1rem',
// // //                   background: isActiveLink('/system-settings') ? '#f0f0f0' : 'none',
// // //                   border: 'none',
// // //                   textAlign: 'left',
// // //                   color: '#000',
// // //                   fontSize: '1rem',
// // //                   fontWeight: isActiveLink('/system-settings') ? '600' : '500',
// // //                   cursor: 'pointer',
// // //                   borderLeft: isActiveLink('/system-settings') ? '3px solid #000' : '3px solid transparent'
// // //                 }}
// // //               >
// // //                 System Settings
// // //               </button>
// // //             </>
// // //           )}

// // //           {/* Profile - Always visible */}
// // //           <button 
// // //             onClick={() => handleLinkClick('/profile')}
// // //             style={{
// // //               display: 'block',
// // //               width: '100%',
// // //               padding: '1rem',
// // //               background: isActiveLink('/profile') ? '#f0f0f0' : 'none',
// // //               border: 'none',
// // //               textAlign: 'left',
// // //               color: '#000',
// // //               fontSize: '1rem',
// // //               fontWeight: isActiveLink('/profile') ? '600' : '500',
// // //               cursor: 'pointer',
// // //               borderLeft: isActiveLink('/profile') ? '3px solid #000' : '3px solid transparent'
// // //             }}
// // //           >
// // //             My Profile
// // //           </button>

// // //           {/* Logout - Always visible */}
// // //           <button 
// // //             onClick={handleLogout}
// // //             style={{
// // //               display: 'block',
// // //               width: '100%',
// // //               padding: '1rem',
// // //               background: 'none',
// // //               border: 'none',
// // //               borderTop: '1px solid #e0e0e0',
// // //               textAlign: 'left',
// // //               color: '#666',
// // //               fontSize: '1rem',
// // //               fontWeight: '500',
// // //               cursor: 'pointer',
// // //               marginTop: '1rem'
// // //             }}
// // //           >
// // //             Logout
// // //           </button>
// // //         </nav>
// // //       </aside>

// // //       {/* Main Content - Below Header */}
// // //       <main style={{
// // //         marginTop: '60px',
// // //         padding: '1rem',
// // //         flex: 1,
// // //         overflowY: 'auto',
// // //         height: 'calc(100vh - 60px)'
// // //       }}>
// // //         <div style={{ maxWidth: '100%', margin: '0 auto' }}>
// // //           {children}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default MobileDashboardLayout;










// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import {handleGetCompanyData} from '../services/companyService'
// // import {handleGetMyPersonalDetails} from '../services/personalDetailsService'

// // const MobileDashboardLayout = ({ children }) => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
// //     }, []); // Empty dependency array to run once on component mount

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
// //     <div style={{ 
// //       display: 'flex', 
// //       flexDirection: 'column', 
// //       height: '100vh',
// //       position: 'relative'
// //     }}>
// //       {/* Mobile Header - Full Width */}
// //       <header style={{
// //         position: 'fixed',
// //         top: 0,
// //         left: 0,
// //         right: 0,
// //         height: '60px',
// //         backgroundColor: '#ffffff',
// //         borderBottom: '1px solid #e0e0e0',
// //         display: 'flex',
// //         alignItems: 'center',
// //         padding: '0 1rem',
// //         zIndex: 1000
// //       }}>
// //         {/* Hamburger Menu Button */}
// //         <button 
// //           onClick={toggleMobileMenu}
// //           style={{
// //             background: 'none',
// //             border: 'none',
// //             cursor: 'pointer',
// //             padding: '8px',
// //             marginRight: '12px'
// //           }}
// //         >
// //           <div style={{ width: '24px', height: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
// //             <span style={{ display: 'block', height: '2px', width: '100%', backgroundColor: '#000', transition: 'all 0.3s ease' }}></span>
// //             <span style={{ display: 'block', height: '2px', width: '100%', backgroundColor: '#000', transition: 'all 0.3s ease' }}></span>
// //             <span style={{ display: 'block', height: '2px', width: '100%', backgroundColor: '#000', transition: 'all 0.3s ease' }}></span>
// //           </div>
// //         </button>

// //         {/* Company Info */}
// //         <div style={{ flex: 1 }}>
// //           <img
// //               src={headerData.companyLogo}
// //               alt={headerData.companyName}
// //               className="company-logo"
// //             />
// //           {/* <h1 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, color: '#000' }}>
// //             {headerData.companyName}
// //           </h1> */}
// //         </div>

// //         {/* User Avatar */}
// //         <div style={{
// //           width: '36px',
// //           height: '36px',
// //           borderRadius: '50%',
// //           backgroundColor: '#000',
// //           color: '#fff',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           fontWeight: '600',
// //           fontSize: '0.875rem'
// //         }}>
// //           {headerData.userName.charAt(0).toUpperCase()}
// //         </div>
// //       </header>

// //       {/* Mobile Overlay */}
// //       {isMobileMenuOpen && (
// //         <div 
// //           onClick={closeMobileMenu}
// //           style={{
// //             position: 'fixed',
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //             zIndex: 998
// //           }}
// //         />
// //       )}

// //       {/* Mobile Sidebar - Slide from Left */}
// //       <aside style={{
// //         position: 'fixed',
// //         top: '60px',
// //         left: 0,
// //         bottom: 0,
// //         width: '280px',
// //         backgroundColor: '#ffffff',
// //         borderRight: '1px solid #e0e0e0',
// //         transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
// //         transition: 'transform 0.3s ease',
// //         zIndex: 999,
// //         overflowY: 'auto'
// //       }}>
// //         {/* Sidebar Header */}
// //         <div style={{ padding: '1.5rem 1rem 1rem 1rem', borderBottom: '1px solid #e0e0e0' }}>
// //           <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#000', margin: 0 }}>
// //             HRMS
// //           </h2>
// //         </div>
        
// //         {/* Mobile Navigation */}
// //         <nav style={{ padding: '1rem 0' }}>
// //           {/* Dashboard - Always visible */}
// //           <button 
// //             onClick={() => handleLinkClick('/dashboard')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/dashboard') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/dashboard') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/dashboard') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             Dashboard
// //           </button>

// //           {/* Attendance */}
// //           <button 
// //             onClick={() => handleLinkClick('/attendance')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/attendance') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/attendance') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/attendance') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             Attendance
// //           </button>

// //           {/* Leaves */}
// //           <button 
// //             onClick={() => handleLinkClick('/leaves')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/leaves') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/leaves') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/leaves') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             Leaves
// //           </button>

// //           {/* Employees */}
// //           <button 
// //             onClick={() => handleLinkClick('/employees')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/employees') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/employees') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/employees') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             Employees
// //           </button>

// //           {/* Departments */}
// //           <button 
// //             onClick={() => handleLinkClick('/departments')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/departments') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/departments') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/departments') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             Departments
// //           </button>

// //           {/* Roles */}
// //           <button 
// //             onClick={() => handleLinkClick('/roles')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/roles') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/roles') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/roles') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             Roles
// //           </button>

// //           {/* Reports */}
// //           <button 
// //             onClick={() => handleLinkClick('/reports')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/reports') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/reports') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/reports') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             Reports
// //           </button>

// //           {/* Audit Logs */}
// //           <button 
// //             onClick={() => handleLinkClick('/logs')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/logs') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/logs') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/logs') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             Audit Logs
// //           </button>

// //           {/* Company Settings */}
// //           <button 
// //             onClick={() => handleLinkClick('/company-settings')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/company-settings') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/company-settings') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/company-settings') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             Company Settings
// //           </button>

// //           {/* System Settings */}
// //           <button 
// //             onClick={() => handleLinkClick('/system-settings')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/system-settings') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/system-settings') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/system-settings') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             System Settings
// //           </button>

// //           {/* Profile - Always visible */}
// //           <button 
// //             onClick={() => handleLinkClick('/profile')}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: isActiveLink('/profile') ? '#f0f0f0' : 'none',
// //               border: 'none',
// //               textAlign: 'left',
// //               color: '#000',
// //               fontSize: '1rem',
// //               fontWeight: isActiveLink('/profile') ? '600' : '500',
// //               cursor: 'pointer',
// //               borderLeft: isActiveLink('/profile') ? '3px solid #000' : '3px solid transparent'
// //             }}
// //           >
// //             My Profile
// //           </button>

// //           {/* Logout - Always visible */}
// //           <button 
// //             onClick={handleLogout}
// //             style={{
// //               display: 'block',
// //               width: '100%',
// //               padding: '1rem',
// //               background: 'none',
// //               border: 'none',
// //               borderTop: '1px solid #e0e0e0',
// //               textAlign: 'left',
// //               color: '#666',
// //               fontSize: '1rem',
// //               fontWeight: '500',
// //               cursor: 'pointer',
// //               marginTop: '1rem'
// //             }}
// //           >
// //             Logout
// //           </button>
// //         </nav>
// //       </aside>

// //       {/* Main Content - Below Header */}
// //       <main style={{
// //         marginTop: '60px',
// //         padding: '1rem',
// //         flex: 1,
// //         overflowY: 'auto',
// //         height: 'calc(100vh - 60px)'
// //       }}>
// //         <div style={{ maxWidth: '100%', margin: '0 auto' }}>
// //           {children}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default MobileDashboardLayout;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {handleGetCompanyData} from '../services/companyService'
// import {handleGetMyPersonalDetails} from '../services/personalDetailsService'
// import './MobileDashboardLayout.css'; // Import the CSS file

// const MobileDashboardLayout = ({ children, currentWidth, mobileBreakpoint }) => { // Added currentWidth and mobileBreakpoint props
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Determine if it's a laptop view based on the passed props
//   const isLaptopView = currentWidth > mobileBreakpoint;

//   // Fetching the company data and personal details
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

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
    
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isMobileMenuOpen]);

//   // Get user data with fallbacks
//   const getUserData = () => {
//     try {
//       return JSON.parse(localStorage.getItem('user_data') || '{}');
//     } catch {
//       return {};
//     }
//   };

//   const userData = getUserData();

//   // Header data with fallbacks - using personal details for both name and job role
//   const headerData = {
//     companyLogo: myCompanyData?.company_logo_url || "/default-logo.png",
//     companyName: myCompanyData?.company_name || '-----',
//     userName: myPersonalDetails?.first_name || userData?.name || userData?.full_name || "John Doe",
//     userRole: myPersonalDetails?.job_role || "Employee",
//     employeeId: userData?.employee_id || "-----"
//   };

//   // Navigation handlers
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const handleLinkClick = (path) => {
//     navigate(path);
//     setIsMobileMenuOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//     setIsMobileMenuOpen(false);
//   };

//   const isActiveLink = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <div className="mobile-dashboard-container">
//       {/* Mobile Header - Full Width */}
//       <header className="mobile-header">
//         {/* Hamburger Menu Button */}
//         <button 
//           onClick={toggleMobileMenu}
//           className="hamburger-button"
//         >
//           <div className="hamburger-icon">
//             <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
//             <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
//             <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
//           </div>
//         </button>

//         {/* Company Info */}
//         <div className="company-info">
//           <img
//               src={headerData.companyLogo}
//               alt={headerData.companyName}
//               className="company-logo"
//             />
//           {/* <h1 className="company-name">
//             {headerData.companyName}
//           </h1> */}
//         </div>

//         {/* User Avatar */}
//         <div className="user-avatar">
//           {headerData.userName.charAt(0).toUpperCase()}
//         </div>
//       </header>

//       {/* Mobile Overlay */}
//       {isMobileMenuOpen && (
//         <div 
//           onClick={closeMobileMenu}
//           className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
//         />
//       )}

//       {/* Mobile Sidebar - Slide from Left */}
//       <aside className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
//         {/* Sidebar Header */}
//         <div className="sidebar-header">
//           <h2 className="sidebar-title">
//             HRMS
//           </h2>
//         </div>
        
//         {/* Mobile Navigation */}
//         <nav className="mobile-nav">
//           {/* Dashboard - Always visible */}
//           <button 
//             onClick={() => handleLinkClick('/dashboard')}
//             className={`nav-button ${isActiveLink('/dashboard') ? 'active' : ''}`}
//           >
//             Dashboard
//           </button>

//           {/* Attendance */}
//           <button 
//             onClick={() => handleLinkClick('/attendance')}
//             className={`nav-button ${isActiveLink('/attendance') ? 'active' : ''}`}
//           >
//             Attendance
//           </button>

//           {/* Leaves */}
//           <button 
//             onClick={() => handleLinkClick('/leaves')}
//             className={`nav-button ${isActiveLink('/leaves') ? 'active' : ''}`}
//           >
//             Leaves
//           </button>

//           {/* Employees */}
//           <button 
//             onClick={() => handleLinkClick('/employees')}
//             className={`nav-button ${isActiveLink('/employees') ? 'active' : ''}`}
//           >
//             Employees
//           </button>

//           {/* Departments */}
//           <button 
//             onClick={() => handleLinkClick('/departments')}
//             className={`nav-button ${isActiveLink('/departments') ? 'active' : ''}`}
//           >
//             Departments
//           </button>

//           {/* Roles */}
//           <button 
//             onClick={() => handleLinkClick('/roles')}
//             className={`nav-button ${isActiveLink('/roles') ? 'active' : ''}`}
//           >
//             Roles
//           </button>

//           {/* Reports */}
//           <button 
//             onClick={() => handleLinkClick('/reports')}
//             className={`nav-button ${isActiveLink('/reports') ? 'active' : ''}`}
//           >
//             Reports
//           </button>

//           {/* Audit Logs */}
//           <button 
//             onClick={() => handleLinkClick('/logs')}
//             className={`nav-button ${isActiveLink('/logs') ? 'active' : ''}`}
//           >
//             Audit Logs
//           </button>

//           {/* Company Settings */}
//           <button 
//             onClick={() => handleLinkClick('/company-settings')}
//             className={`nav-button ${isActiveLink('/company-settings') ? 'active' : ''}`}
//           >
//             Company Settings
//           </button>

//           {/* System Settings */}
//           <button 
//             onClick={() => handleLinkClick('/system-settings')}
//             className={`nav-button ${isActiveLink('/system-settings') ? 'active' : ''}`}
//           >
//             System Settings
//           </button>

//           {/* Profile - Always visible */}
//           <button 
//             onClick={() => handleLinkClick('/profile')}
//             className={`nav-button ${isActiveLink('/profile') ? 'active' : ''}`}
//           >
//             My Profile
//           </button>

//           {/* Logout - Always visible */}
//           <button 
//             onClick={handleLogout}
//             className="logout-button"
//           >
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content - Below Header */}
//       <main className="main-content" style={{
//         // Add laptop-specific styles here
//         maxWidth: isLaptopView ? '1200px' : '100%', // Example max-width for laptop
//         margin: isLaptopView ? '0 auto' : '0 auto' // Center content on laptop
//       }}>
//         <div className="content-wrapper">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MobileDashboardLayout;




import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {handleGetCompanyData} from '../services/companyService'
import {handleGetMyPersonalDetails} from '../services/personalDetailsService'
import './MobileDashboardLayout.css'; // Import the CSS file

const MobileDashboardLayout = ({ children, currentWidth, mobileBreakpoint }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // You can still use isLaptopView for any internal component logic if needed
  // const isLaptopView = currentWidth > mobileBreakpoint; 

  // Fetching the company data and personal details
  const [myCompanyData, setMyCompanyData] = useState(null);
  const [myPersonalDetails, setMyPersonalDetails] = useState(null);

  useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await handleGetCompanyData();
                setMyCompanyData(response);
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        const fetchPersonalDetails = async () => {
            try {
                const response = await handleGetMyPersonalDetails();
                setMyPersonalDetails(response);
            } catch (error) {
                console.error('Error fetching personal details:', error);
            }
        };

        fetchCompanyData();
        fetchPersonalDetails();
    }, []); 

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Get user data with fallbacks
  const getUserData = () => {
    try {
      return JSON.parse(localStorage.getItem('user_data') || '{}');
    } catch {
      return {};
    }
  };

  const userData = getUserData();

  // Header data with fallbacks - using personal details for both name and job role
  const headerData = {
    companyLogo: myCompanyData?.company_logo_url || "/default-logo.png",
    companyName: myCompanyData?.company_name || '-----',
    userName: myPersonalDetails?.first_name || userData?.name || userData?.full_name || "John Doe",
    userRole: myPersonalDetails?.job_role || "Employee",
    employeeId: userData?.employee_id || "-----"
  };

  // Navigation handlers
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="mobile-dashboard-container">
      {/* This new wrapper will be centered on laptop screens */}
      <div className="dashboard-center-wrapper"> 
        {/* Mobile Header - Now positioned absolute within dashboard-center-wrapper */}
        <header className="mobile-header">
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="hamburger-button"
          >
            <div className="hamburger-icon">
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </div>
          </button>

          {/* Company Info */}
          <div className="company-info">
            <img
                src={headerData.companyLogo}
                alt={headerData.companyName}
                className="company-logo"
              />
          </div>

          {/* User Avatar */}
          <div className="user-avatar">
            {headerData.userName.charAt(0).toUpperCase()}
          </div>
        </header>

        {/* Mobile Overlay - Keep this fixed for full screen coverage */}
        {isMobileMenuOpen && (
          <div 
            onClick={closeMobileMenu}
            className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          />
        )}

        {/* Mobile Sidebar - Now positioned absolute within dashboard-center-wrapper */}
        <aside className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
          {/* Sidebar Header */}
          <div className="sidebar-header">
            <h2 className="sidebar-title">
              HRMS
            </h2>
          </div>
          
          {/* Mobile Navigation */}
          <nav className="mobile-nav">
            <button onClick={() => handleLinkClick('/dashboard')} className={`nav-button ${isActiveLink('/dashboard') ? 'active' : ''}`}>Dashboard</button>
            <button onClick={() => handleLinkClick('/attendance')} className={`nav-button ${isActiveLink('/attendance') ? 'active' : ''}`}>Attendance</button>
            <button onClick={() => handleLinkClick('/leaves')} className={`nav-button ${isActiveLink('/leaves') ? 'active' : ''}`}>Leaves</button>
            <button onClick={() => handleLinkClick('/employees')} className={`nav-button ${isActiveLink('/employees') ? 'active' : ''}`}>Employees</button>
            <button onClick={() => handleLinkClick('/departments')} className={`nav-button ${isActiveLink('/departments') ? 'active' : ''}`}>Departments</button>
            <button onClick={() => handleLinkClick('/roles')} className={`nav-button ${isActiveLink('/roles') ? 'active' : ''}`}>Roles</button>
            <button onClick={() => handleLinkClick('/reports')} className={`nav-button ${isActiveLink('/reports') ? 'active' : ''}`}>Reports</button>
            <button onClick={() => handleLinkClick('/logs')} className={`nav-button ${isActiveLink('/logs') ? 'active' : ''}`}>Audit Logs</button>
            <button onClick={() => handleLinkClick('/company-settings')} className={`nav-button ${isActiveLink('/company-settings') ? 'active' : ''}`}>Company Settings</button>
            <button onClick={() => handleLinkClick('/system-settings')} className={`nav-button ${isActiveLink('/system-settings') ? 'active' : ''}`}>System Settings</button>
            <button onClick={() => handleLinkClick('/profile')} className={`nav-button ${isActiveLink('/profile') ? 'active' : ''}`}>My Profile</button>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </nav>
        </aside>

        {/* Main Content Area - now its width is constrained by .dashboard-center-wrapper */}
        <main className="main-content">
          <div className="content-wrapper">
            {children} {/* Your actual page content will be rendered here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MobileDashboardLayout;