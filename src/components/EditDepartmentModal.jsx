import React, { useState, useEffect } from 'react';
import { X, Edit, Loader, Clock, MapPin, Phone, Mail, DollarSign, Building, Users } from 'lucide-react';
import { handleUpdateDepartment, handleGetDepartmentById } from '../services/departmentService';
import { handleGetAllRoles } from '../services/roleService';

const EditDepartmentModal = ({
  isOpen,
  onClose,
  departmentId,
  onUpdateSuccess,
  onError
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [department, setDepartment] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    type: 'operational',
    maxCapacity: 50,
    location: '',
    phone: '',
    email: '',
    workingHoursStart: '09:00',
    workingHoursEnd: '17:00',
    flexibleHours: false,
    remoteWork: false,
    overtimeAllowed: true,
    budget: '',
    costCenter: '',
    confidentialityLevel: 'standard',
    status: 'Active',
    defaultEmployeeRoleId: '',
    // New fields from API payload / CreateDepartmentModal
    breakDuration: 60,
    weekendWork: false,
    autoApproveLeave: 0,
    maxConsecutiveLeave: 30,
    advanceNotice: 7,
    graceMinutes: 15,
    earlyDepartureApproval: true,
    canViewOthers: false,
    canRequestOvertime: true,
    requiresManagerApproval: 'leave,overtime,profile_changes', // Example default string
    departmentPermissions: '',
    showCalendar: true,
    showAnnouncements: true,
    showDirectory: true,
    allowProfileUpdates: true,
    trackAttendance: true,
    trackLeave: true,
    trackLogin: true,
    trackProfile: true,
    auditRetention: 365,
    clientFacing: false,
    isBillable: false,
    requiresTimesheet: false,
    projectBased: false,
    notificationEmail: '',
    escalationEmail: '',
    emergencyContact: '',
    complianceRequirements: '',
    requiresBackgroundCheck: false, // Added for consistency
    dataAccessRestrictions: '', // Added for consistency
    parentDepartmentId: '', // Added for consistency
  });

  useEffect(() => {
    if (isOpen && departmentId) {
      fetchDepartmentDetails();
      fetchRoles();
    }
  }, [isOpen, departmentId]);

  const fetchDepartmentDetails = async () => {
    setLoading(true);
    try {
      const data = await handleGetDepartmentById(departmentId);
      const transformedData = transformToDisplayFormat(data);
      setDepartment(transformedData);

      // Populate form with existing data, including all new fields
      setFormState({
        name: transformedData.name || '',
        description: transformedData.description || '',
        type: transformedData.type || 'operational',
        maxCapacity: transformedData.maxCapacity || 50,
        location: transformedData.location || '',
        phone: transformedData.phone || '',
        email: transformedData.email || '',
        workingHoursStart: transformedData.workingHoursStart?.substring(0, 5) || '09:00',
        workingHoursEnd: transformedData.workingHoursEnd?.substring(0, 5) || '17:00',
        flexibleHours: transformedData.flexibleHours || false,
        remoteWork: transformedData.remoteWork || false,
        overtimeAllowed: transformedData.overtimeAllowed !== undefined ? transformedData.overtimeAllowed : true,
        budget: transformedData.budget || '',
        costCenter: transformedData.costCenter || '',
        confidentialityLevel: transformedData.confidentialityLevel || 'standard',
        status: transformedData.status,
        defaultEmployeeRoleId: transformedData._raw.default_employee_role_id || '',
        
        // Populate new fields
        breakDuration: transformedData._raw.break_duration_minutes || 60,
        weekendWork: transformedData._raw.weekend_work_required || false,
        autoApproveLeave: transformedData._raw.auto_approve_leave_days || 0,
        maxConsecutiveLeave: transformedData._raw.max_consecutive_leave_days || 30,
        advanceNotice: transformedData._raw.advance_leave_notice_days || 7,
        graceMinutes: transformedData._raw.late_arrival_grace_minutes || 15,
        earlyDepartureApproval: transformedData._raw.early_departure_requires_approval || true,
        canViewOthers: transformedData._raw.can_employees_view_others || false,
        canRequestOvertime: transformedData._raw.can_employees_request_overtime || true,
        requiresManagerApproval: transformedData._raw.requires_manager_approval_for || 'leave,overtime,profile_changes',
        departmentPermissions: transformedData._raw.department_specific_permissions || '',
        showCalendar: transformedData._raw.show_department_calendar || true,
        showAnnouncements: transformedData._raw.show_department_announcements || true,
        showDirectory: transformedData._raw.show_team_directory || true,
        allowProfileUpdates: transformedData._raw.allow_profile_updates || true,
        trackAttendance: transformedData._raw.track_attendance_changes || true,
        trackLeave: transformedData._raw.track_leave_activities || true,
        trackLogin: transformedData._raw.track_login_activity || true,
        trackProfile: transformedData._raw.track_profile_changes || true,
        auditRetention: transformedData._raw.audit_retention_days || 365,
        clientFacing: transformedData._raw.client_facing || false,
        isBillable: transformedData._raw.is_billable_department || false,
        requiresTimesheet: transformedData._raw.requires_timesheet || false,
        projectBased: transformedData._raw.project_based_work || false,
        notificationEmail: transformedData._raw.notification_email || '',
        escalationEmail: transformedData._raw.escalation_email || '',
        emergencyContact: transformedData._raw.emergency_contact_number || '',
        complianceRequirements: transformedData._raw.compliance_requirements || '',
        requiresBackgroundCheck: transformedData._raw.requires_background_check || false,
        dataAccessRestrictions: transformedData._raw.data_access_restrictions || '',
        parentDepartmentId: transformedData._raw.parent_department_id || '',
      });
    } catch (error) {
      console.error('Error fetching department details:', error);
      onError?.(error.message || 'Failed to load department details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    setLoadingRoles(true);
    try {
      const fetchedRoles = await handleGetAllRoles(0, 100, true);
      setRoles(fetchedRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      onError('Failed to load roles for selection.');
    } finally {
      setLoadingRoles(false);
    }
  };

  const transformToDisplayFormat = (dept) => ({
    id: dept.department_id,
    name: dept.department_name,
    description: dept.department_description,
    code: dept.department_code,
    employeeCount: dept.department_employee_count || 0,
    status: dept.department_status === 'active' ? 'Active' : 'Inactive',
    type: dept.department_type,
    location: dept.department_location,
    phone: dept.department_phone,
    email: dept.department_email,
    workingHoursStart: dept.working_hours_start,
    workingHoursEnd: dept.working_hours_end,
    maxCapacity: dept.max_employee_capacity,
    flexibleHours: dept.flexible_hours_allowed,
    remoteWork: dept.remote_work_allowed,
    overtimeAllowed: dept.overtime_allowed,
    budget: dept.department_budget,
    costCenter: dept.cost_center_code,
    confidentialityLevel: dept.confidentiality_level,
    parentDepartmentId: dept.parent_department_id, // Already present, but ensure it's picked up
    company_id: dept.company_id,
    _raw: dept, // Keep raw data to easily access all API fields
  });

  const handleInputChange = (field, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.name.trim()) {
      onError?.('Department name is required');
      return;
    }
    
    // New Validation: Ensure a default role is selected
    if (!formState.defaultEmployeeRoleId) {
      onError?.('Please select a default employee role for the department.');
      return;
    }

    setLoadingSubmit(true);
    try {
      const updatePayload = {
        ...(department?._raw || {}),
        ...formState,
        status: formState.status.toLowerCase(),
        default_employee_role_id: formState.defaultEmployeeRoleId, // Ensure role ID is correctly mapped and sent
        // Map UI field names to API field names for updated fields
        break_duration_minutes: formState.breakDuration,
        weekend_work_required: formState.weekendWork,
        auto_approve_leave_days: formState.autoApproveLeave,
        max_consecutive_leave_days: formState.maxConsecutiveLeave,
        advance_leave_notice_days: formState.advanceNotice,
        late_arrival_grace_minutes: formState.graceMinutes,
        early_departure_requires_approval: formState.earlyDepartureApproval,
        can_employees_view_others: formState.canViewOthers,
        can_employees_request_overtime: formState.canRequestOvertime,
        requires_manager_approval_for: formState.requiresManagerApproval,
        department_specific_permissions: formState.departmentPermissions,
        show_department_calendar: formState.showCalendar,
        show_department_announcements: formState.showAnnouncements,
        show_team_directory: formState.showDirectory,
        allow_profile_updates: formState.allowProfileUpdates,
        track_attendance_changes: formState.trackAttendance,
        track_leave_activities: formState.trackLeave,
        track_login_activity: formState.trackLogin,
        track_profile_changes: formState.trackProfile,
        audit_retention_days: formState.auditRetention,
        client_facing: formState.clientFacing,
        is_billable_department: formState.isBillable,
        requires_timesheet: formState.requiresTimesheet,
        project_based_work: formState.projectBased,
        notification_email: formState.notificationEmail,
        escalation_email: formState.escalationEmail,
        emergency_contact_number: formState.emergencyContact,
        compliance_requirements: formState.complianceRequirements,
        requires_background_check: formState.requiresBackgroundCheck,
        data_access_restrictions: formState.dataAccessRestrictions,
        parent_department_id: formState.parentDepartmentId, // Ensure this is also mapped
        
        // Remove UI-only fields if they shouldn't go to the API (e.g., employeeCount)
        employeeCount: undefined,
        // Any other UI-specific fields that should not be sent to the API should be set to undefined
      };

      await handleUpdateDepartment(departmentId, updatePayload);
      onUpdateSuccess?.();
      handleClose();
    } catch (error) {
      console.error('Error updating department:', error);
      onError?.(error.message || 'Failed to update department');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFormState({ // Reset form state when closing
      name: '', description: '', type: 'operational', maxCapacity: 50, location: '', phone: '', email: '',
      workingHoursStart: '09:00', workingHoursEnd: '17:00', flexibleHours: false, remoteWork: false, overtimeAllowed: true,
      budget: '', costCenter: '', confidentialityLevel: 'standard', status: 'Active', defaultEmployeeRoleId: '',
      breakDuration: 60, weekendWork: false, autoApproveLeave: 0, maxConsecutiveLeave: 30, advanceNotice: 7,
      graceMinutes: 15, earlyDepartureApproval: true, canViewOthers: false, canRequestOvertime: true,
      requiresManagerApproval: 'leave,overtime,profile_changes', departmentPermissions: '', showCalendar: true,
      showAnnouncements: true, showDirectory: true, allowProfileUpdates: true, trackAttendance: true,
      trackLeave: true, trackLogin: true, trackProfile: true, auditRetention: 365, clientFacing: false,
      isBillable: false, requiresTimesheet: false, projectBased: false, notificationEmail: '',
      escalationEmail: '', emergencyContact: '', complianceRequirements: '', requiresBackgroundCheck: false,
      dataAccessRestrictions: '', parentDepartmentId: '',
    });
    setDepartment(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-lg">
        <div className="modal-header">
          <h2 className="modal-title">Edit Department</h2>
          <button onClick={handleClose} className="btn-close-modal">
            <X />
          </button>
        </div>

        {loading ? (
          <div className="modal-body">
            <div className="loading-container">
              <Loader className="loading-spinner" />
              <p>Loading department details...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Department Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formState.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Department Type</label>
                  <select
                    className="form-input"
                    value={formState.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                  >
                    <option value="operational">Operational</option>
                    <option value="administrative">Administrative</option>
                    <option value="support">Support</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    className="form-input"
                    value={formState.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Default Employee Role *</label>
                  <select
                    className="form-input"
                    value={formState.defaultEmployeeRoleId}
                    onChange={(e) => handleInputChange('defaultEmployeeRoleId', e.target.value)}
                    disabled={loading || loadingRoles}
                    required // Make it required for HTML5 validation as well
                  >
                    <option value="">{loadingRoles ? 'Loading roles...' : 'Select a role'}</option>
                    {roles.map(role => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={formState.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Max Capacity</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formState.maxCapacity}
                    onChange={(e) => handleInputChange('maxCapacity', parseInt(e.target.value, 10) || 0)}
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formState.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formState.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formState.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Work Hours Start</label>
                  <input
                    type="time"
                    className="form-input"
                    value={formState.workingHoursStart}
                    onChange={(e) => handleInputChange('workingHoursStart', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Work Hours End</label>
                  <input
                    type="time"
                    className="form-input"
                    value={formState.workingHoursEnd}
                    onChange={(e) => handleInputChange('workingHoursEnd', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Budget</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    value={formState.budget}
                    onChange={(e) => handleInputChange('budget', parseFloat(e.target.value) || '')}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Cost Center</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formState.costCenter}
                    onChange={(e) => handleInputChange('costCenter', e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Confidentiality Level</label>
                  <select
                    className="form-input"
                    value={formState.confidentialityLevel}
                    onChange={(e) => handleInputChange('confidentialityLevel', e.target.value)}
                  >
                    <option value="standard">Standard</option>
                    <option value="confidential">Confidential</option>
                    <option value="high">High</option>
                  </select>
                </div>
                 {/* Parent Department ID - Added for completeness based on API payload */}
                <div className="form-group">
                  <label className="form-label">Parent Department ID (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formState.parentDepartmentId}
                    onChange={(e) => handleInputChange('parentDepartmentId', e.target.value)}
                    placeholder="Enter parent department ID"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Work Policies & Features</h3>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.flexibleHours}
                      onChange={(e) => handleInputChange('flexibleHours', e.target.checked)}
                    />
                    Flexible Hours Allowed
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.remoteWork}
                      onChange={(e) => handleInputChange('remoteWork', e.target.checked)}
                    />
                    Remote Work Allowed
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.overtimeAllowed}
                      onChange={(e) => handleInputChange('overtimeAllowed', e.target.checked)}
                    />
                    Overtime Allowed
                  </label>
                   <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.weekendWork}
                      onChange={(e) => handleInputChange('weekendWork', e.target.checked)}
                    />
                    Weekend Work Required
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.earlyDepartureApproval}
                      onChange={(e) => handleInputChange('earlyDepartureApproval', e.target.checked)}
                    />
                    Early Departure Requires Approval
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.canViewOthers}
                      onChange={(e) => handleInputChange('canViewOthers', e.target.checked)}
                    />
                    Employees Can View Others
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.canRequestOvertime}
                      onChange={(e) => handleInputChange('canRequestOvertime', e.target.checked)}
                    />
                    Employees Can Request Overtime
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.showCalendar}
                      onChange={(e) => handleInputChange('showCalendar', e.target.checked)}
                    />
                    Show Department Calendar
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.showAnnouncements}
                      onChange={(e) => handleInputChange('showAnnouncements', e.target.checked)}
                    />
                    Show Department Announcements
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.showDirectory}
                      onChange={(e) => handleInputChange('showDirectory', e.target.checked)}
                    />
                    Show Team Directory
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.allowProfileUpdates}
                      onChange={(e) => handleInputChange('allowProfileUpdates', e.target.checked)}
                    />
                    Allow Profile Updates
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.trackAttendance}
                      onChange={(e) => handleInputChange('trackAttendance', e.target.checked)}
                    />
                    Track Attendance Changes
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.trackLeave}
                      onChange={(e) => handleInputChange('trackLeave', e.target.checked)}
                    />
                    Track Leave Activities
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.trackLogin}
                      onChange={(e) => handleInputChange('trackLogin', e.target.checked)}
                    />
                    Track Login Activity
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.trackProfile}
                      onChange={(e) => handleInputChange('trackProfile', e.target.checked)}
                    />
                    Track Profile Changes
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.clientFacing}
                      onChange={(e) => handleInputChange('clientFacing', e.target.checked)}
                    />
                    Client Facing
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.isBillable}
                      onChange={(e) => handleInputChange('isBillable', e.target.checked)}
                    />
                    Is Billable Department
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.requiresTimesheet}
                      onChange={(e) => handleInputChange('requiresTimesheet', e.target.checked)}
                    />
                    Requires Timesheet
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.projectBased}
                      onChange={(e) => handleInputChange('projectBased', e.target.checked)}
                    />
                    Project Based Work
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formState.requiresBackgroundCheck}
                      onChange={(e) => handleInputChange('requiresBackgroundCheck', e.target.checked)}
                    />
                    Requires Background Check
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">Break Duration (minutes)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formState.breakDuration}
                    onChange={(e) => handleInputChange('breakDuration', parseInt(e.target.value, 10) || 0)}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Auto Approve Leave Days</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formState.autoApproveLeave}
                    onChange={(e) => handleInputChange('autoApproveLeave', parseInt(e.target.value, 10) || 0)}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Consecutive Leave Days</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formState.maxConsecutiveLeave}
                    onChange={(e) => handleInputChange('maxConsecutiveLeave', parseInt(e.target.value, 10) || 0)}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Advance Notice Days (for leave)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formState.advanceNotice}
                    onChange={(e) => handleInputChange('advanceNotice', parseInt(e.target.value, 10) || 0)}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Late Arrival Grace Minutes</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formState.graceMinutes}
                    onChange={(e) => handleInputChange('graceMinutes', parseInt(e.target.value, 10) || 0)}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Audit Retention Days</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formState.auditRetention}
                    onChange={(e) => handleInputChange('auditRetention', parseInt(e.target.value, 10) || 0)}
                    min="0"
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Manager Approval Requires</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formState.requiresManagerApproval}
                    onChange={(e) => handleInputChange('requiresManagerApproval', e.target.value)}
                    placeholder="e.g., leave,overtime,profile_changes"
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Department Permissions</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formState.departmentPermissions}
                    onChange={(e) => handleInputChange('departmentPermissions', e.target.value)}
                    placeholder="e.g., read_only,manage_employees"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Notification Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formState.notificationEmail}
                    onChange={(e) => handleInputChange('notificationEmail', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Escalation Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formState.escalationEmail}
                    onChange={(e) => handleInputChange('escalationEmail', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Emergency Contact Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formState.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Compliance Requirements</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formState.complianceRequirements}
                    onChange={(e) => handleInputChange('complianceRequirements', e.target.value)}
                    placeholder="e.g., GDPR, HIPAA"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Data Access Restrictions</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formState.dataAccessRestrictions}
                    onChange={(e) => handleInputChange('dataAccessRestrictions', e.target.value)}
                    placeholder="e.g., restricted_to_managers"
                  />
                </div>
              </div>

              {department && (
                <div className="form-section">
                  <h3 className="form-section-title">Current Department Information</h3>
                  <div className="current-info-grid">
                    <div className="info-item">
                      <Users className="info-icon" />
                      <span>Employees: {department.employeeCount} / {department.maxCapacity}</span>
                    </div>
                    <div className="info-item">
                      <Building className="info-icon" />
                      <span>Status: {department.status}</span>
                    </div>
                    <div className="info-item">
                      <span>Code: {department.code}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-secondary"
                disabled={loadingSubmit}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loadingSubmit || !formState.name.trim()}
              >
                {loadingSubmit ? (
                  <>
                    <Loader className="btn-icon loading" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Edit className="btn-icon" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditDepartmentModal;