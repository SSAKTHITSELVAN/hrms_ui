// // src/components/Sidebar.jsx
// import { Link, useNavigate } from 'react-router-dom';
// import "./Sidebar.css";

// const Sidebar = () => {
//   const role = JSON.parse(localStorage.getItem('role_data'));
//   const roleData = role?.data;
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   // Helper functions to check permissions (makes code more readable)
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

//   // If no role data, don't render navigation
//   if (!roleData) {
//     return (
//       <div>
//         <h2>HRMS</h2>
//         <div>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>HRMS</h2>
//       <nav>
//         {/* Dashboard - Always visible for logged-in users */}
//         <div><Link to="/dashboard">Dashboard</Link></div>

//         {/* Attendance - Show if user has any attendance permissions */}
//         {canAccessAttendance() && (
//           <div><Link to="/attendance">Attendance</Link></div>
//         )}

//         {/* Leaves - Show if user has any leave permissions */}
//         {canAccessLeaves() && (
//           <div><Link to="/leaves">Leaves</Link></div>
//         )}

//         {/* Employees - Show if user has any employee management permissions */}
//         {canAccessEmployees() && (
//           <div><Link to="/employees">Employees</Link></div>
//         )}

//         {/* Departments - Show if user has department permissions */}
//         {canAccessDepartments() && (
//           <div><Link to="/departments">Departments</Link></div>
//         )}

//         {/* Roles - Show if user has role management permissions */}
//         {canAccessRoles() && (
//           <div><Link to="/roles">Roles</Link></div>
//         )}

//         {/* Reports - Show if user has any reporting permissions */}
//         {canAccessReports() && (
//           <div><Link to="/reports">Reports</Link></div>
//         )}

//         {/* Audit Logs - Show if user has audit log permissions */}
//         {canAccessAuditLogs() && (
//           <div><Link to="/logs">Audit Logs</Link></div>
//         )}

//         {/* Admin Only Sections */}
//         {isAdmin() && (
//           <>
//             <div><Link to="/company-settings">Company Settings</Link></div>
//             <div><Link to="/system-settings">System Settings</Link></div>
//           </>
//         )}

//         {/* Profile - Always visible (users should always see their own profile) */}
//         <div><Link to="/profile">My Profile</Link></div>
        
//         {/* Logout - Always visible */}
//         <div><button onClick={handleLogout}>Logout</button></div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;



// src/components/Sidebar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./Sidebar.css";

const Sidebar = () => {
  const role = JSON.parse(localStorage.getItem('role_data') || '{}');
  const roleData = role?.data;
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Close menu if switching to desktop
      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isMobileMenuOpen]);

  // Handle mobile menu toggle
  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking overlay
  const closeMobileMenu = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
  };

  // Handle navigation link clicks
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  // Helper function to check if link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Helper functions to check permissions (makes code more readable)
  const canAccessEmployees = () => {
    return roleData?.can_create_employee || 
           roleData?.can_view_all_employees || 
           roleData?.can_delete_employee;
  };

  const canAccessAttendance = () => {
    return roleData?.can_view_own_attendance || 
           roleData?.can_view_team_attendance || 
           roleData?.can_view_all_attendance ||
           roleData?.can_checkin_own ||
           roleData?.can_checkout_own;
  };

  const canAccessLeaves = () => {
    return roleData?.can_apply_own_leave || 
           roleData?.can_view_own_leave || 
           roleData?.can_view_team_leave || 
           roleData?.can_view_all_leave ||
           roleData?.can_approve_team_leave;
  };

  const canAccessDepartments = () => {
    return roleData?.can_create_department || 
           roleData?.can_view_all_departments || 
           roleData?.can_edit_all_departments ||
           roleData?.can_delete_department;
  };

  const canAccessRoles = () => {
    return roleData?.can_create_roles || 
           roleData?.can_view_all_roles || 
           roleData?.can_edit_all_roles ||
           roleData?.can_delete_roles;
  };

  const canAccessAuditLogs = () => {
    return roleData?.can_view_all_audit_logs || 
           roleData?.can_view_own_audit_logs || 
           roleData?.can_view_team_audit_logs;
  };

  const canAccessReports = () => {
    return roleData?.can_generate_employee_reports || 
           roleData?.can_generate_attendance_reports || 
           roleData?.can_generate_leave_reports ||
           roleData?.can_create_custom_reports;
  };

  const isAdmin = () => {
    return roleData?.role_name === "Admin Role" || roleData?.is_system_role;
  };

  // If no role data, show loading state
  if (!roleData) {
    return (
      <>
        {isMobile && (
          <div className="mobile-header">
            <h2>HRMS</h2>
            <button className="mobile-toggle" disabled>
              <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        )}
        <div className="sidebar-loading">
          <div>Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile Header with Toggle Button */}
      {isMobile && (
        <div className="mobile-header">
          <h2>HRMS</h2>
          <button 
            className="mobile-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isMobile && isMobileMenuOpen ? 'active' : ''}`}>
        <h2>HRMS</h2>
        <nav>
          {/* Dashboard - Always visible for logged-in users */}
          <div>
            <Link 
              to="/dashboard" 
              className={isActiveLink('/dashboard') ? 'active' : ''}
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>
          </div>

          {/* Attendance - Show if user has any attendance permissions */}
          {canAccessAttendance() && (
            <div>
              <Link 
                to="/attendance" 
                className={isActiveLink('/attendance') ? 'active' : ''}
                onClick={handleLinkClick}
              >
                Attendance
              </Link>
            </div>
          )}

          {/* Leaves - Show if user has any leave permissions */}
          {canAccessLeaves() && (
            <div>
              <Link 
                to="/leaves" 
                className={isActiveLink('/leaves') ? 'active' : ''}
                onClick={handleLinkClick}
              >
                Leaves
              </Link>
            </div>
          )}

          {/* Employees - Show if user has any employee management permissions */}
          {canAccessEmployees() && (
            <div>
              <Link 
                to="/employees" 
                className={isActiveLink('/employees') ? 'active' : ''}
                onClick={handleLinkClick}
              >
                Employees
              </Link>
            </div>
          )}

          {/* Departments - Show if user has department permissions */}
          {canAccessDepartments() && (
            <div>
              <Link 
                to="/departments" 
                className={isActiveLink('/departments') ? 'active' : ''}
                onClick={handleLinkClick}
              >
                Departments
              </Link>
            </div>
          )}

          {/* Roles - Show if user has role management permissions */}
          {canAccessRoles() && (
            <div>
              <Link 
                to="/roles" 
                className={isActiveLink('/roles') ? 'active' : ''}
                onClick={handleLinkClick}
              >
                Roles
              </Link>
            </div>
          )}

          {/* Reports - Show if user has any reporting permissions */}
          {canAccessReports() && (
            <div>
              <Link 
                to="/reports" 
                className={isActiveLink('/reports') ? 'active' : ''}
                onClick={handleLinkClick}
              >
                Reports
              </Link>
            </div>
          )}

          {/* Audit Logs - Show if user has audit log permissions */}
          {canAccessAuditLogs() && (
            <div>
              <Link 
                to="/logs" 
                className={isActiveLink('/logs') ? 'active' : ''}
                onClick={handleLinkClick}
              >
                Audit Logs
              </Link>
            </div>
          )}

          {/* Admin Only Sections */}
          {isAdmin() && (
            <>
              <div>
                <Link 
                  to="/company-settings" 
                  className={isActiveLink('/company-settings') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Company Settings
                </Link>
              </div>
              <div>
                <Link 
                  to="/system-settings" 
                  className={isActiveLink('/system-settings') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  System Settings
                </Link>
              </div>
            </>
          )}

          {/* Profile - Always visible (users should always see their own profile) */}
          <div>
            <Link 
              to="/profile" 
              className={isActiveLink('/profile') ? 'active' : ''}
              onClick={handleLinkClick}
            >
              My Profile
            </Link>
          </div>
          
          {/* Logout - Always visible */}
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;