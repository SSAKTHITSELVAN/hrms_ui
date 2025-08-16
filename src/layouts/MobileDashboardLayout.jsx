import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { handleGetCompanyData } from '../services/companyService';
import { handleGetMyPersonalDetails } from '../services/personalDetailsService';
import './MobileDashboardLayout.css';
import { FaBars, FaTimes, FaTachometerAlt, FaCalendarCheck, FaSuitcase, FaUsers, FaBuilding, FaUserTag, FaChartLine, FaFileAlt, FaCog, FaCogs, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const MobileDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roleData = useSelector((state) => state.roles.role);
  
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
    const permissionsObject = roleData.data || roleData; 
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
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="hamburger-button" aria-label="Toggle navigation menu">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="header-company-info">
            <img src={headerData.companyLogo} alt={headerData.companyName} className="company-logo" />
            {/* <h1 className="company-name">{headerData.companyName}</h1> */}
          </div>
          <div className="user-profile">
            <span className="user-name">{headerData.userName}</span>
            <div className="user-avatar">{headerData.userName.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        {isMobileMenuOpen && <div onClick={() => setIsMobileMenuOpen(false)} className={`mobile-overlay active`} />}

        <aside className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
          {/* <div className="sidebar-header">
            <p className="sidebar-subtitle">Navigation</p>
            <h2 className="sidebar-title">Dashboard</h2>
          </div> */}
          <nav className="mobile-nav">
            <button onClick={() => handleLinkClick('/dashboard')} className={`nav-button ${isActiveLink('/dashboard') ? 'active' : ''}`}>
              <FaTachometerAlt />Dashboard
            </button>
            {canAccessMenu('/attendance') && <button onClick={() => handleLinkClick('/attendance')} className={`nav-button ${isActiveLink('/attendance') ? 'active' : ''}`}>
              <FaCalendarCheck />Attendance
            </button>}
            {canAccessMenu('/leaves') && <button onClick={() => handleLinkClick('/leaves')} className={`nav-button ${isActiveLink('/leaves') ? 'active' : ''}`}>
              <FaSuitcase />Leaves
            </button>}
            {canAccessMenu('/employees') && <button onClick={() => handleLinkClick('/employees')} className={`nav-button ${isActiveLink('/employees') ? 'active' : ''}`}>
              <FaUsers />Employees
            </button>}
            {canAccessMenu('/departments') && <button onClick={() => handleLinkClick('/departments')} className={`nav-button ${isActiveLink('/departments') ? 'active' : ''}`}>
              <FaBuilding />Departments
            </button>}
            {canAccessMenu('/roles') && <button onClick={() => handleLinkClick('/roles')} className={`nav-button ${isActiveLink('/roles') ? 'active' : ''}`}>
              <FaUserTag />Roles
            </button>}
            {canAccessMenu('/reports') && <button onClick={() => handleLinkClick('/reports')} className={`nav-button ${isActiveLink('/reports') ? 'active' : ''}`}>
              <FaChartLine />Reports
            </button>}
            {canAccessMenu('/logs') && <button onClick={() => handleLinkClick('/logs')} className={`nav-button ${isActiveLink('/logs') ? 'active' : ''}`}>
              <FaFileAlt />Audit Logs
            </button>}
            {canAccessMenu('/company-settings') && <button onClick={() => handleLinkClick('/company-settings')} className={`nav-button ${isActiveLink('/company-settings') ? 'active' : ''}`}>
              <FaCog />Company Settings
            </button>}
            {canAccessMenu('/system-settings') && <button onClick={() => handleLinkClick('/system-settings')} className={`nav-button ${isActiveLink('/system-settings') ? 'active' : ''}`}>
              <FaCogs />System Settings
            </button>}
          </nav>

          <div className="sidebar-footer">
            <button onClick={() => handleLinkClick('/profile')} className={`nav-button profile-button ${isActiveLink('/profile') ? 'active' : ''}`}>
              <FaUserCircle />My Profile
            </button>
            <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt />Logout
            </button>
          </div>
        </aside>

        <main className="main-content">
          <div className="content-wrapper">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MobileDashboardLayout;