import React, { useState, useEffect } from 'react';
import { Plus, X, Loader } from 'lucide-react';
import { handleCreateDepartment } from '../services/departmentService';
import { handleGetAllRoles } from '../services/roleService'; // Import the service to fetch roles

const CreateDepartmentModal = ({ isOpen, onClose, onCreateSuccess, onError }) => {
  // Form State - Expanded to match API payload requirements
  const initialFormState = {
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
    budget: '', // Now a string to allow empty input
    costCenter: '',
    confidentialityLevel: 'standard',
    
    // New fields to match API payload
    parentDepartmentId: '', // To be selected from existing departments (if applicable)
    defaultEmployeeRoleId: '', // This will hold the selected role_id
    employeeCount: 0, // This is usually backend-managed, but included if API expects it
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
    departmentPermissions: '', // This might be a complex object/string for API
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
  };

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [roles, setRoles] = useState([]); // State to store fetched roles
  const [loadingRoles, setLoadingRoles] = useState(false); // State for loading roles

  // Fetch roles when the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen]);

  const fetchRoles = async () => {
    setLoadingRoles(true);
    try {
      // Fetch all active roles (you can adjust parameters if needed)
      const fetchedRoles = await handleGetAllRoles(0, 100, true); 
      setRoles(fetchedRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      onError('Failed to load roles for selection.');
    } finally {
      setLoadingRoles(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = () => {
    onClose();
    setFormState(initialFormState); // Reset form state when closing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      onError?.('Department name is required');
      return;
    }

    setLoading(true);
    try {
      // The departmentService's transformToApiFormat should handle converting
      // formState.defaultEmployeeRoleId to default_employee_role_id
      await handleCreateDepartment(formState);
      onCreateSuccess?.();
      handleClose(); // Close modal and reset form
    } catch (error) {
      console.error('Error creating department:', error);
      onError?.(error.message || 'Failed to create department');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-lg">
        <div className="modal-header">
          <h2 className="modal-title">Create New Department</h2>
          <button onClick={handleClose} className="btn-close-modal">
            <X />
          </button>
        </div>
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
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Department Type</label>
                <select
                  className="form-input"
                  value={formState.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  disabled={loading}
                >
                  <option value="operational">Operational</option>
                  <option value="administrative">Administrative</option>
                  <option value="support">Support</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              {/* New: Default Employee Role Dropdown */}
              <div className="form-group">
                <label className="form-label">Default Employee Role</label>
                <select
                  className="form-input"
                  value={formState.defaultEmployeeRoleId}
                  onChange={(e) => handleInputChange('defaultEmployeeRoleId', e.target.value)}
                  disabled={loading || loadingRoles} // Disable if overall loading or roles are loading
                >
                  <option value="">{loadingRoles ? 'Loading roles...' : 'Select a role (Optional)'}</option>
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={formState.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formState.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formState.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Work Hours Start</label>
                <input
                  type="time"
                  className="form-input"
                  value={formState.workingHoursStart}
                  onChange={(e) => handleInputChange('workingHoursStart', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Work Hours End</label>
                <input
                  type="time"
                  className="form-input"
                  value={formState.workingHoursEnd}
                  onChange={(e) => handleInputChange('workingHoursEnd', e.target.value)}
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cost Center</label>
                <input
                  type="text"
                  className="form-input"
                  value={formState.costCenter}
                  onChange={(e) => handleInputChange('costCenter', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Confidentiality Level</label>
                <select
                  className="form-input"
                  value={formState.confidentialityLevel}
                  onChange={(e) => handleInputChange('confidentialityLevel', e.target.value)}
                  disabled={loading}
                >
                  <option value="standard">Standard</option>
                  <option value="confidential">Confidential</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Parent Department ID - Assuming this should list other Departments, not Roles.
                  If you need this to list roles, please clarify. */}
              <div className="form-group">
                <label className="form-label">Parent Department ID (Optional)</label>
                <input
                  type="text" // Placeholder, ideally this would be a dropdown of departments
                  className="form-input"
                  value={formState.parentDepartmentId}
                  onChange={(e) => handleInputChange('parentDepartmentId', e.target.value)}
                  disabled={loading}
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
                    disabled={loading}
                  />
                  Flexible Hours Allowed
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.remoteWork}
                    onChange={(e) => handleInputChange('remoteWork', e.target.checked)}
                    disabled={loading}
                  />
                  Remote Work Allowed
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.overtimeAllowed}
                    onChange={(e) => handleInputChange('overtimeAllowed', e.target.checked)}
                    disabled={loading}
                  />
                  Overtime Allowed
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.weekendWork}
                    onChange={(e) => handleInputChange('weekendWork', e.target.checked)}
                    disabled={loading}
                  />
                  Weekend Work Required
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.canViewOthers}
                    onChange={(e) => handleInputChange('canViewOthers', e.target.checked)}
                    disabled={loading}
                  />
                  Employees Can View Others
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.canRequestOvertime}
                    onChange={(e) => handleInputChange('canRequestOvertime', e.target.checked)}
                    disabled={loading}
                  />
                  Employees Can Request Overtime
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.showCalendar}
                    onChange={(e) => handleInputChange('showCalendar', e.target.checked)}
                    disabled={loading}
                  />
                  Show Department Calendar
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.showAnnouncements}
                    onChange={(e) => handleInputChange('showAnnouncements', e.target.checked)}
                    disabled={loading}
                  />
                  Show Department Announcements
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.showDirectory}
                    onChange={(e) => handleInputChange('showDirectory', e.target.checked)}
                    disabled={loading}
                  />
                  Show Team Directory
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.allowProfileUpdates}
                    onChange={(e) => handleInputChange('allowProfileUpdates', e.target.checked)}
                    disabled={loading}
                  />
                  Allow Profile Updates
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.trackAttendance}
                    onChange={(e) => handleInputChange('trackAttendance', e.target.checked)}
                    disabled={loading}
                  />
                  Track Attendance Changes
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.trackLeave}
                    onChange={(e) => handleInputChange('trackLeave', e.target.checked)}
                    disabled={loading}
                  />
                  Track Leave Activities
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.trackLogin}
                    onChange={(e) => handleInputChange('trackLogin', e.target.checked)}
                    disabled={loading}
                  />
                  Track Login Activity
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.trackProfile}
                    onChange={(e) => handleInputChange('trackProfile', e.target.checked)}
                    disabled={loading}
                  />
                  Track Profile Changes
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.earlyDepartureApproval}
                    onChange={(e) => handleInputChange('earlyDepartureApproval', e.target.checked)}
                    disabled={loading}
                  />
                  Early Departure Requires Approval
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.clientFacing}
                    onChange={(e) => handleInputChange('clientFacing', e.target.checked)}
                    disabled={loading}
                  />
                  Client Facing
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.isBillable}
                    onChange={(e) => handleInputChange('isBillable', e.target.checked)}
                    disabled={loading}
                  />
                  Is Billable Department
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.requiresTimesheet}
                    onChange={(e) => handleInputChange('requiresTimesheet', e.target.checked)}
                    disabled={loading}
                  />
                  Requires Timesheet
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formState.projectBased}
                    onChange={(e) => handleInputChange('projectBased', e.target.checked)}
                    disabled={loading}
                  />
                  Project Based Work
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Manager Approval Requires</label>
                <input
                  type="text"
                  className="form-input"
                  value={formState.requiresManagerApproval}
                  onChange={(e) => handleInputChange('requiresManagerApproval', e.target.value)}
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Escalation Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formState.escalationEmail}
                  onChange={(e) => handleInputChange('escalationEmail', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Emergency Contact Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formState.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Compliance Requirements</label>
                <input
                  type="text"
                  className="form-input"
                  value={formState.complianceRequirements}
                  onChange={(e) => handleInputChange('complianceRequirements', e.target.value)}
                  disabled={loading}
                  placeholder="e.g., GDPR, HIPAA"
                />
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button"
              onClick={handleClose} 
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn-primary" 
              disabled={loading || !formState.name.trim()}
            >
              {loading ? (
                <>
                  <Loader className="btn-icon loading" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="btn-icon" />
                  Create Department
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDepartmentModal;