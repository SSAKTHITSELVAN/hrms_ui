import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaPlus, FaEye, FaSearch, FaBriefcase, FaUsers, FaBuilding, FaUserTag, FaCheckCircle, FaTimesCircle, FaCog, FaEdit, FaTrash, FaExclamationTriangle, FaTimes, FaShieldAlt } from 'react-icons/fa';
import { handleGetAllRoles, handleGetRoleById, handleCreateRole, handleUpdateRoleStatus, handleUpdateRole, handleDeleteRole } from '../../services/roleService';
import './RoleManagement.css';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedRoleDetails, setSelectedRoleDetails] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editRoleData, setEditRoleData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ✅ Get company ID from the auth slice, which is the single source of truth.
  const companyId = useSelector(state => state.auth.roleData?.company_id);
  console.log('Company ID from Redux:', companyId);

  const [newRole, setNewRole] = useState({
    company_id: companyId || '',
    role_name: '',
    role_code: '',
    role_description: '',
    is_active: true,
    is_system_role: false,
    can_create_employee: false, can_view_all_employees: false, can_view_own_profile: true,
    can_view_team_members: false, can_view_department_employees: false, can_edit_all_employee_profiles: false,
    can_edit_own_profile: true, can_edit_team_profiles: false, can_delete_employee: false,
    can_archive_employee: false, can_restore_employee: false, can_activate_employee: false,
    can_deactivate_employee: false, can_suspend_employee: false,
    can_view_employee_documents: false, can_upload_employee_documents: false, can_delete_employee_documents: false,
    can_checkin_own: true, can_checkout_own: true, can_start_break_own: true, can_end_break_own: true,
    can_view_own_attendance: true, can_view_team_attendance: false, can_view_department_attendance: false,
    can_view_all_attendance: false, can_edit_own_attendance: false, can_edit_team_attendance: false,
    can_edit_all_attendance: false, can_delete_attendance: false, can_approve_attendance: false, can_reject_attendance: false,
    can_apply_own_leave: true, can_apply_leave_behalf: false, can_cancel_own_leave: true, can_cancel_team_leave: false,
    can_view_own_leave: true, can_view_team_leave: false, can_view_department_leave: false, can_view_all_leave: false,
    can_approve_team_leave: false, can_approve_department_leave: false, can_approve_all_leave: false,
    can_reject_team_leave: false, can_reject_department_leave: false, can_reject_all_leave: false,
    can_edit_own_leave: false, can_edit_team_leave: false, can_edit_all_leave: false, can_delete_leave_records: false,
    can_create_leave_types: false, can_edit_leave_types: false, can_delete_leave_types: false,
    can_manage_leave_policies: false, can_view_all_leave_balances: false,
    can_create_department: false, can_view_all_departments: false, can_view_own_department: true,
    can_edit_all_departments: false, can_edit_own_department: false, can_delete_department: false,
    can_assign_employees_department: false, can_remove_employees_department: false, can_transfer_employees: false,
    can_manage_department_hierarchy: false, can_assign_department_head: false,
    can_create_roles: false, can_view_all_roles: false, can_edit_all_roles: false, can_delete_roles: false,
    can_assign_roles: false, can_unassign_roles: false,
    can_view_company_details: false, can_edit_company_details: false, can_manage_company_settings: false,
    can_view_org_hierarchy: false, can_manage_org_hierarchy: false,
    can_generate_employee_reports: false, can_generate_attendance_reports: false, can_generate_leave_reports: false,
    can_generate_department_reports: false, can_create_custom_reports: false, can_export_employee_data: false,
    can_export_attendance_data: false, can_export_leave_data: false, can_export_all_data: false,
    can_view_employee_dashboard: true, can_view_attendance_dashboard: false, can_view_leave_dashboard: false,
    can_view_executive_dashboard: false,
    can_view_all_audit_logs: false, can_view_own_audit_logs: false, can_view_team_audit_logs: false,
    can_export_audit_logs: false,
    can_manage_system_settings: false, can_create_system_backup: false, can_restore_system_backup: false,
    can_enable_maintenance_mode: false,
    can_create_user_accounts: false, can_edit_user_accounts: false, can_delete_user_accounts: false,
    can_reset_user_passwords: false, can_lock_user_accounts: false, can_unlock_user_accounts: false
  });

  // ✅ Wait for companyId to be available before fetching roles
  useEffect(() => {
    if (companyId) {
      setNewRole(prev => ({ ...prev, company_id: companyId }));
      fetchRoles();
    }
  }, [companyId]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await handleGetAllRoles();
      setRoles(data || []);
      console.log('Roles fetched successfully:', data);
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError(err.message || 'Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoleDetails = async (roleId) => {
    try {
      setLoadingDetails(true);
      const data = await handleGetRoleById(roleId);
      setSelectedRoleDetails(data);
      console.log('Role details fetched successfully:', data);
    } catch (err) {
      console.error('Error fetching role details:', err);
      setError(err.message || 'Failed to fetch role details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const transformRoleData = (role) => {
    const department = role.role_name.includes('Admin') ? 'Administration' :
                      role.role_name.includes('HR') ? 'Human Resources' :
                      role.role_name.includes('Engineer') ? 'Engineering' :
                      role.role_name.includes('Manager') ? 'Management' :
                      'General';

    const permissionCount = Object.keys(role).filter(key =>
      key.startsWith('can_') && role[key] === true
    ).length;

    return {
      id: role.role_id,
      name: role.role_name,
      code: role.role_code,
      description: role.role_description,
      department: department,
      status: role.is_active ? 'Active' : 'Inactive',
      isSystemRole: role.is_system_role,
      permissionCount: permissionCount,
      createdAt: role.created_at,
      updatedAt: role.updated_at,
      permissions: Object.keys(role).filter(key =>
        key.startsWith('can_') && role[key] === true
      )
    };
  };

  const departments = useMemo(() => {
    if (!Array.isArray(roles)) {
      return [];
    }
    const depts = roles.map(role => {
      const transformed = transformRoleData(role);
      return transformed.department;
    }).filter(Boolean);
    return [...new Set(depts)];
  }, [roles]);

  const filteredRoles = useMemo(() => {
    const transformedRoles = roles.map(transformRoleData);

    return transformedRoles.filter(role => {
      const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            role.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            role.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = !departmentFilter || role.department === departmentFilter;
      const matchesStatus = !statusFilter || role.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [roles, searchTerm, departmentFilter, statusFilter]);

  const handleRoleClick = async (role) => {
    setSelectedRole(transformRoleData(role));
    await fetchRoleDetails(role.role_id);
    console.log('Role card clicked, fetching details for role:', role);
  };

  const handleStatusUpdate = async (roleId, currentStatus, event) => {
    event.stopPropagation();
    
    const newStatus = currentStatus === 'Active' ? false : true;
    const actionText = newStatus ? 'activate' : 'deactivate';
    
    if (!window.confirm(`Are you sure you want to ${actionText} this role?`)) {
      return;
    }

    try {
      setUpdatingStatus(true);
      console.log(`Updating status for role ${roleId} to ${newStatus}`);
      await handleUpdateRoleStatus(roleId, newStatus);
      
      setRoles(prevRoles =>
        prevRoles.map(role =>
          role.role_id === roleId
            ? { ...role, is_active: newStatus }
            : role
        )
      );

      if (selectedRole && selectedRole.id === roleId) {
        setSelectedRole(prev => ({ ...prev, status: newStatus ? 'Active' : 'Inactive' }));
      }

      alert(`Role ${actionText}d successfully!`);
      console.log(`Role ${roleId} status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating role status:', err);
      alert(err.message || `Failed to ${actionText} role`);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddRole = async () => {
    if (!newRole.role_name || !newRole.role_code || !newRole.role_description) {
      alert('Please fill in all required fields (Role Name, Role Code, Description)');
      return;
    }
    
    try {
      setIsSaving(true);
      console.log('Attempting to create new role with data:', newRole);
      await handleCreateRole(newRole);
      
      setNewRole(prevRole => ({
        ...prevRole,
        role_name: '',
        role_code: '',
        role_description: '',
        can_create_employee: false, can_view_all_employees: false, can_view_own_profile: false,
        can_view_team_members: false, can_view_department_employees: false, can_edit_all_employee_profiles: false,
        can_edit_own_profile: false, can_edit_team_profiles: false, can_delete_employee: false,
        can_archive_employee: false, can_restore_employee: false, can_activate_employee: false,
        can_deactivate_employee: false, can_suspend_employee: false,
        can_view_employee_documents: false, can_upload_employee_documents: false, can_delete_employee_documents: false,
        can_checkin_own: false, can_checkout_own: false, can_start_break_own: false, can_end_break_own: false,
        can_view_own_attendance: false, can_view_team_attendance: false, can_view_department_attendance: false,
        can_view_all_attendance: false, can_edit_own_attendance: false, can_edit_team_attendance: false,
        can_edit_all_attendance: false, can_delete_attendance: false, can_approve_attendance: false, can_reject_attendance: false,
        can_apply_own_leave: false, can_apply_leave_behalf: false, can_cancel_own_leave: false, can_cancel_team_leave: false,
        can_view_own_leave: false, can_view_team_leave: false, can_view_department_leave: false, can_view_all_leave: false,
        can_approve_team_leave: false, can_approve_department_leave: false, can_approve_all_leave: false,
        can_reject_team_leave: false, can_reject_department_leave: false, can_reject_all_leave: false,
        can_edit_own_leave: false, can_edit_team_leave: false, can_edit_all_leave: false, can_delete_leave_records: false,
        can_create_leave_types: false, can_edit_leave_types: false, can_delete_leave_types: false,
        can_manage_leave_policies: false, can_view_all_leave_balances: false,
        can_create_department: false, can_view_all_departments: false, can_view_own_department: false,
        can_edit_all_departments: false, can_edit_own_department: false, can_delete_department: false,
        can_assign_employees_department: false, can_remove_employees_department: false, can_transfer_employees: false,
        can_manage_department_hierarchy: false, can_assign_department_head: false,
        can_create_roles: false, can_view_all_roles: false, can_edit_all_roles: false, can_delete_roles: false,
        can_assign_roles: false, can_unassign_roles: false,
        can_view_company_details: false, can_edit_company_details: false, can_manage_company_settings: false,
        can_view_org_hierarchy: false, can_manage_org_hierarchy: false,
        can_generate_employee_reports: false, can_generate_attendance_reports: false, can_generate_leave_reports: false,
        can_generate_department_reports: false, can_create_custom_reports: false, can_export_employee_data: false,
        can_export_attendance_data: false, can_export_leave_data: false, can_export_all_data: false,
        can_view_employee_dashboard: false, can_view_attendance_dashboard: false, can_view_leave_dashboard: false,
        can_view_executive_dashboard: false,
        can_view_all_audit_logs: false, can_view_own_audit_logs: false, can_view_team_audit_logs: false,
        can_export_audit_logs: false,
        can_manage_system_settings: false, can_create_system_backup: false, can_restore_system_backup: false,
        can_enable_maintenance_mode: false,
        can_create_user_accounts: false, can_edit_user_accounts: false, can_delete_user_accounts: false,
        can_reset_user_passwords: false, can_lock_user_accounts: false, can_unlock_user_accounts: false
      }));
      
      setShowAddForm(false);
      alert('Role created successfully!');
      console.log('New role created successfully!');
      await fetchRoles();
    } catch (err) {
      console.error('Error creating role:', err);
      alert(err.message || 'Failed to create role');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditRole = async () => {
    if (!editRoleData.role_name || !editRoleData.role_code || !editRoleData.role_description) {
      alert('Please fill in all required fields (Role Name, Role Code, Description)');
      return;
    }

    try {
      setIsSaving(true);
      console.log('Attempting to update role with ID:', editRoleData.role_id, ' and data:', editRoleData);
      await handleUpdateRole(editRoleData.role_id, editRoleData);
      alert('Role updated successfully!');
      console.log('Role updated successfully!');
      setShowEditForm(false);
      closeModal();
      await fetchRoles();
    } catch (err) {
      console.error('Error updating role:', err);
      alert(err.message || 'Failed to update role');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (!window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      return;
    }
    try {
      setLoading(true);
      console.log('Attempting to delete role with ID:', roleId);
      await handleDeleteRole(roleId);
      alert('Role deleted successfully!');
      console.log(`Role ${roleId} deleted successfully!`);
      closeModal();
      await fetchRoles();
    } catch (err) {
      console.error('Error deleting role:', err);
      alert(err.message || 'Failed to delete role');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = () => {
    setEditRoleData({ ...selectedRoleDetails });
    setShowEditForm(true);
  };

  const closeEditModal = () => {
    setEditRoleData(null);
    setShowEditForm(false);
  };

  const closeModal = () => {
    setSelectedRole(null);
    setSelectedRoleDetails(null);
    closeEditModal();
  };

  const formatPermissionName = (permissionKey) => {
    return permissionKey
      .replace(/^can_/, '')
      .replace(/_/g, ' ',)
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const permissionCategories = {
    'Employee Management': [
      'can_create_employee', 'can_view_all_employees', 'can_view_own_profile',
      'can_view_team_members', 'can_view_department_employees', 'can_edit_all_employee_profiles',
      'can_edit_own_profile', 'can_edit_team_profiles', 'can_delete_employee',
      'can_archive_employee', 'can_restore_employee', 'can_activate_employee',
      'can_deactivate_employee', 'can_suspend_employee'
    ],
    'Document Management': [
      'can_view_employee_documents', 'can_upload_employee_documents', 'can_delete_employee_documents'
    ],
    'Attendance Management': [
      'can_checkin_own', 'can_checkout_own', 'can_start_break_own', 'can_end_break_own',
      'can_view_own_attendance', 'can_view_team_attendance', 'can_view_department_attendance',
      'can_view_all_attendance', 'can_edit_own_attendance', 'can_edit_team_attendance',
      'can_edit_all_attendance', 'can_delete_attendance', 'can_approve_attendance', 'can_reject_attendance'
    ],
    'Leave Management': [
      'can_apply_own_leave', 'can_apply_leave_behalf', 'can_cancel_own_leave', 'can_cancel_team_leave',
      'can_view_own_leave', 'can_view_team_leave', 'can_view_department_leave', 'can_view_all_leave',
      'can_approve_team_leave', 'can_approve_department_leave', 'can_approve_all_leave',
      'can_reject_team_leave', 'can_reject_department_leave', 'can_reject_all_leave',
      'can_edit_own_leave', 'can_edit_team_leave', 'can_edit_all_leave', 'can_delete_leave_records',
      'can_create_leave_types', 'can_edit_leave_types', 'can_delete_leave_types',
      'can_manage_leave_policies', 'can_view_all_leave_balances'
    ],
    'Department Management': [
      'can_create_department', 'can_view_all_departments', 'can_view_own_department',
      'can_edit_all_departments', 'can_edit_own_department', 'can_delete_department',
      'can_assign_employees_department', 'can_remove_employees_department', 'can_transfer_employees',
      'can_manage_department_hierarchy', 'can_assign_department_head'
    ],
    'Role Management': [
      'can_create_roles', 'can_view_all_roles', 'can_edit_all_roles', 'can_delete_roles',
      'can_assign_roles', 'can_unassign_roles'
    ],
    'Company Management': [
      'can_view_company_details', 'can_edit_company_details', 'can_manage_company_settings',
      'can_view_org_hierarchy', 'can_manage_org_hierarchy'
    ],
    'Reports & Analytics': [
      'can_generate_employee_reports', 'can_generate_attendance_reports', 'can_generate_leave_reports',
      'can_generate_department_reports', 'can_create_custom_reports', 'can_export_employee_data',
      'can_export_attendance_data', 'can_export_leave_data', 'can_export_all_data'
    ],
    'Dashboard Access': [
      'can_view_employee_dashboard', 'can_view_attendance_dashboard', 'can_view_leave_dashboard',
      'can_view_executive_dashboard'
    ],
    'Audit & Monitoring': [
      'can_view_all_audit_logs', 'can_view_own_audit_logs', 'can_view_team_audit_logs',
      'can_export_audit_logs'
    ],
    'System Administration': [
      'can_manage_system_settings', 'can_create_system_backup', 'can_restore_system_backup',
      'can_enable_maintenance_mode'
    ],
    'User Account Management': [
      'can_create_user_accounts', 'can_edit_user_accounts', 'can_delete_user_accounts',
      'can_reset_user_passwords', 'can_lock_user_accounts', 'can_unlock_user_accounts'
    ]
  };

  if (loading) {
    return (
      <div className="role-management">
        <div className="loading-container">
          <FaCog className="loading-spinner" />
          <p>Loading roles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="role-management">
        <div className="error-container">
          <FaExclamationTriangle className="error-icon" />
          <p className="error-message">Error: {error}</p>
          <button onClick={fetchRoles} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="role-management">
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Role Management</h1>
          <p className="page-subtitle">Manage and define roles for your employees.</p>
        </div>
        <div className="page-header-actions">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <FaPlus className="btn-icon" />
            Add New Role
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
        
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="form-select"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-select"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="role-grid">
        {filteredRoles.map(role => (
          <div
            key={role.id}
            className="role-card"
            onClick={() => handleRoleClick(roles.find(r => r.role_id === role.id))}
          >
            <div className="role-card-header">
              <div className="role-info">
                <h3>{role.name}</h3>
                <p>{role.code}</p>
              </div>
              <div className="role-badges">
                {role.isSystemRole && <span className="system-role-badge">System</span>}
                <span className={`status-badge ${role.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                  {role.status}
                </span>
              </div>
            </div>
            
            <p className="role-description">
              <FaBriefcase className="card-icon" />
              {role.description.length > 100 ? role.description.substring(0, 97) + '...' : role.description}
            </p>

            <div className="role-meta">
              <div className="meta-item">
                <FaCheckCircle className="meta-icon" />
                <span>{role.permissionCount} permissions</span>
              </div>
              <div className="meta-item">
                <FaUsers className="meta-icon" />
                <span>{role.department}</span>
              </div>
            </div>

            <div className="role-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleClick(roles.find(r => r.role_id === role.id));
                }}
                className="btn-view"
              >
                <FaEye className="btn-icon-sm" />
                View
              </button>
              
              {!role.isSystemRole && (
                <button
                  onClick={(e) => handleStatusUpdate(role.id, role.status, e)}
                  className={`btn-toggle-status ${role.status === 'Active' ? 'deactivate' : 'activate'}`}
                  disabled={updatingStatus}
                >
                  {role.status === 'Active' ? (
                    <>
                      <FaTimesCircle className="btn-icon-sm" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="btn-icon-sm" />
                      Activate
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredRoles.length === 0 && !loading && (
        <div className="empty-state">
          <FaShieldAlt className="empty-state-icon" />
          <p className="empty-state-text">No roles found matching your criteria.</p>
        </div>
      )}

      {selectedRole && !showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Role Details</h2>
              <button
                onClick={closeModal}
                className="btn-close"
              >
                <FaTimes className="close-icon" />
              </button>
            </div>
            
            <div className="modal-body">
              {loadingDetails ? (
                <div className="loading-container">
                  <FaCog className="loading-spinner" />
                  <p>Loading role details...</p>
                </div>
              ) : (
                <>
                  <div className="role-detail-header">
                    <div className="role-detail-info">
                      <h3>{selectedRole.name}</h3>
                      <p className="role-detail-code">{selectedRole.code}</p>
                    </div>
                    <div className="role-detail-actions">
                      {selectedRole.isSystemRole && <span className="system-role-badge">System</span>}
                      <span className={`status-badge ${selectedRole.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                        {selectedRole.status}
                      </span>
                    </div>
                  </div>

                  <div className="role-detail-grid">
                    <div className="detail-section">
                      <h4>Role Information</h4>
                      <div className="detail-row">
                        <FaBriefcase className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p className="detail-label">Description</p>
                          <p>{selectedRole.description}</p>
                        </div>
                      </div>
                      
                      <div className="detail-row">
                        <FaUsers className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p className="detail-label">Department (Inferred)</p>
                          <p>{selectedRole.department}</p>
                        </div>
                      </div>
                      
                      <div className="detail-row">
                        <FaShieldAlt className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p className="detail-label">Is System Role?</p>
                          <p>{selectedRole.isSystemRole ? 'Yes' : 'No'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Audit Information</h4>
                      <div className="detail-row">
                        <FaTimes className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p className="detail-label">Created At</p>
                          <p>{selectedRoleDetails?.created_at ? new Date(selectedRoleDetails.created_at).toLocaleString() : 'N/A'}</p>
                        </div>
                      </div>
                      <div className="detail-row">
                        <FaTimes className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p className="detail-label">Last Updated</p>
                          <p>{selectedRoleDetails?.updated_at ? new Date(selectedRoleDetails.updated_at).toLocaleString() : 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {selectedRoleDetails && (
                      <div className="detail-section full-width">
                        <h4>Permissions</h4>
                        {Object.entries(permissionCategories).map(([categoryName, permissions]) => (
                          <div key={categoryName} className="permission-category">
                            <h5>{categoryName}</h5>
                            <ul className="permission-list">
                              {permissions.map(permissionKey => {
                                const hasPermission = selectedRoleDetails[permissionKey] === true;
                                return (
                                  <li key={permissionKey} className={hasPermission ? 'permission-active' : 'permission-inactive'}>
                                    {hasPermission ? <FaCheckCircle /> : <FaTimesCircle />} {formatPermissionName(permissionKey)}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    {!selectedRole.isSystemRole && (
                      <>
                        <button
                          onClick={openEditModal}
                          className="btn-secondary"
                        >
                          <FaEdit className="btn-icon" />
                          Edit Role
                        </button>
                        <button
                          onClick={() => handleDeleteRole(selectedRole.id)}
                          className="btn-danger"
                        >
                          <FaTrash className="btn-icon" />
                          Delete Role
                        </button>
                        <button
                          onClick={(e) => handleStatusUpdate(selectedRole.id, selectedRole.status, e)}
                          className={`btn-primary ${selectedRole.status === 'Active' ? 'deactivate' : 'activate'}`}
                          disabled={updatingStatus}
                        >
                          {selectedRole.status === 'Active' ? (
                            <>
                              <FaTimesCircle className="btn-icon" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <FaCheckCircle className="btn-icon" />
                              Activate
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Add New Role</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-close"
              >
                <FaTimes className="close-icon" />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Role Name *</label>
                  <input
                    type="text"
                    required
                    value={newRole.role_name}
                    onChange={(e) => setNewRole({...newRole, role_name: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role Code *</label>
                  <input
                    type="text"
                    required
                    value={newRole.role_code}
                    onChange={(e) => setNewRole({...newRole, role_code: e.target.value})}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label className="form-label">Description *</label>
                  <textarea
                    required
                    value={newRole.role_description}
                    onChange={(e) => setNewRole({...newRole, role_description: e.target.value})}
                    className="form-input"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group checkbox-group full-width">
                  <input
                    type="checkbox"
                    id="isSystemRole"
                    checked={newRole.is_system_role}
                    onChange={(e) => setNewRole({...newRole, is_system_role: e.target.checked})}
                  />
                  <label htmlFor="isSystemRole" className="form-label">Is System Role?</label>
                </div>
              </div>

              <div className="permissions-section">
                <h4>Set Permissions</h4>
                {Object.entries(permissionCategories).map(([categoryName, permissions]) => (
                  <div key={categoryName} className="permission-category-form">
                    <h5>{categoryName}</h5>
                    <div className="permission-checkbox-grid">
                      {permissions.map(permissionKey => (
                        <div key={permissionKey} className="form-group checkbox-group">
                          <input
                            type="checkbox"
                            id={`perm-${permissionKey}`}
                            checked={newRole[permissionKey] || false}
                            onChange={(e) => setNewRole({ ...newRole, [permissionKey]: e.target.checked })}
                          />
                          <label htmlFor={`perm-${permissionKey}`}>{formatPermissionName(permissionKey)}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? 'Adding...' : 'Add Role'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditForm && editRoleData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Edit Role: {editRoleData.role_name}</h2>
              <button
                onClick={closeEditModal}
                className="btn-close"
              >
                <FaTimes className="close-icon" />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Role Name *</label>
                  <input
                    type="text"
                    required
                    value={editRoleData.role_name}
                    onChange={(e) => setEditRoleData({...editRoleData, role_name: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role Code *</label>
                  <input
                    type="text"
                    required
                    value={editRoleData.role_code}
                    onChange={(e) => setEditRoleData({...editRoleData, role_code: e.target.value})}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label className="form-label">Description *</label>
                  <textarea
                    required
                    value={editRoleData.role_description}
                    onChange={(e) => setEditRoleData({...editRoleData, role_description: e.target.value})}
                    className="form-input"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group checkbox-group full-width">
                  <input
                    type="checkbox"
                    id="editIsSystemRole"
                    checked={editRoleData.is_system_role}
                    onChange={(e) => setEditRoleData({...editRoleData, is_system_role: e.target.checked})}
                  />
                  <label htmlFor="editIsSystemRole" className="form-label">Is System Role?</label>
                </div>
                <div className="form-group checkbox-group full-width">
                  <input
                    type="checkbox"
                    id="editIsActive"
                    checked={editRoleData.is_active}
                    onChange={(e) => setEditRoleData({...editRoleData, is_active: e.target.checked})}
                  />
                  <label htmlFor="editIsActive" className="form-label">Is Active?</label>
                </div>
              </div>

              <div className="permissions-section">
                <h4>Set Permissions</h4>
                {Object.entries(permissionCategories).map(([categoryName, permissions]) => (
                  <div key={categoryName} className="permission-category-form">
                    <h5>{categoryName}</h5>
                    <div className="permission-checkbox-grid">
                      {permissions.map(permissionKey => (
                        <div key={permissionKey} className="form-group checkbox-group">
                          <input
                            type="checkbox"
                            id={`edit-perm-${permissionKey}`}
                            checked={editRoleData[permissionKey] || false}
                            onChange={(e) => setEditRoleData({ ...editRoleData, [permissionKey]: e.target.checked })}
                          />
                          <label htmlFor={`edit-perm-${permissionKey}`}>{formatPermissionName(permissionKey)}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditRole}
                  className="btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;