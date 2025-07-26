import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Users,
  Building,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Clock,
  Edit,
  Loader,
  Shield,
  Calendar,
  FileText,
  Eye,
  Settings,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { handleGetDepartmentById } from '../services/departmentService';
import { handleGetAllEmployees } from '../services/employeeService';

// Assume ViewDepartmentModal.css is imported here or styles are global
// import './ViewDepartmentModal.css';

// Reusable component for displaying a single detail item
const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="detail-item">
    {Icon && <Icon className="detail-icon" />}
    <strong>{label}:</strong> {value || 'Not specified'}
  </div>
);

// Reusable component for a section with a title and icon
const Section = ({ icon: Icon, title, children }) => (
  <div className="details-section">
    <h4 className="section-title">
      {Icon && <Icon className="section-icon" />}
      {title}
    </h4>
    {children}
  </div>
);

// Boolean indicator component (from original, kept as is)
const BooleanIndicator = ({ value, label }) => (
  <div className="boolean-indicator">
    {value ? (
      <CheckCircle className="bool-icon bool-true" />
    ) : (
      <XCircle className="bool-icon bool-false" />
    )}
    <span className={value ? 'bool-text-true' : 'bool-text-false'}>
      {label}
    </span>
  </div>
);

const ViewDepartmentModal = ({
  isOpen,
  onClose,
  departmentId,
  onEdit,
  onError,
}) => {
  const [department, setDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDepartmentDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch department details and all employees in parallel
      const [deptData, employeesData] = await Promise.all([
        handleGetDepartmentById(departmentId),
        handleGetAllEmployees(0, 1000), // Fetch a large number to ensure all are covered
      ]);

      // Transform department data to display format
      const transformedDept = transformToDisplayFormat(deptData);
      setDepartment(transformedDept);

      // Filter employees for this department
      const deptEmployees = Array.isArray(employeesData)
        ? employeesData
            .filter((emp) => emp.department_id === departmentId)
            .map((emp) => ({
              id: emp.employee_id,
              name: `${emp.first_name || ''} ${emp.last_name || ''}`.trim(),
              role: emp.job_role?.job_title || 'N/A',
              email: emp.email,
              phone: emp.phone,
              status: emp.status,
            }))
        : [];

      setEmployees(deptEmployees);
    } catch (err) {
      console.error('Error fetching department details:', err);
      const errorMessage = err.message || 'Failed to fetch department details';
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [departmentId, onError]); // Add onError to useCallback dependencies

  // Fetch department details and employees when modal opens
  useEffect(() => {
    if (isOpen && departmentId) {
      fetchDepartmentDetails();
    }
  }, [isOpen, departmentId, fetchDepartmentDetails]); // Add fetchDepartmentDetails to dependencies

  const transformToDisplayFormat = (dept) => ({
    id: dept.department_id,
    name: dept.department_name,
    description: dept.department_description,
    code: dept.department_code,
    type: dept.department_type,
    status: dept.department_status === 'active' ? 'Active' : 'Inactive',
    location: dept.department_location,
    phone: dept.department_phone,
    email: dept.department_email,
    budget: dept.department_budget,
    costCenter: dept.cost_center_code,
    maxCapacity: dept.max_employee_capacity,

    // Work schedule
    workingHoursStart: dept.working_hours_start,
    workingHoursEnd: dept.working_hours_end,
    breakDuration: dept.break_duration_minutes,
    flexibleHours: dept.flexible_hours_allowed,
    remoteWork: dept.remote_work_allowed,
    overtimeAllowed: dept.overtime_allowed,
    weekendWork: dept.weekend_work_required,

    // Leave policies
    autoApproveLeave: dept.auto_approve_leave_days,
    maxConsecutiveLeave: dept.max_consecutive_leave_days,
    advanceNotice: dept.advance_leave_notice_days,
    graceMinutes: dept.late_arrival_grace_minutes,
    earlyDepartureApproval: dept.early_departure_requires_approval,

    // Permissions
    canViewOthers: dept.can_employees_view_others,
    canRequestOvertime: dept.can_employees_request_overtime,
    showCalendar: dept.show_department_calendar,
    showAnnouncements: dept.show_department_announcements,
    showDirectory: dept.show_team_directory,
    allowProfileUpdates: dept.allow_profile_updates,

    // Tracking
    trackLogin: dept.track_login_activity,
    trackAttendance: dept.track_attendance_changes,
    trackLeave: dept.track_leave_activities,
    trackProfile: dept.track_profile_changes,
    auditRetention: dept.audit_retention_days,

    // Security & Project
    confidentialityLevel: dept.confidentiality_level,
    requiresBackgroundCheck: dept.requires_background_check,
    isBillable: dept.is_billable_department,
    requiresTimesheet: dept.requires_timesheet,
    projectBased: dept.project_based_work,
    clientFacing: dept.client_facing,

    // Contact info
    notificationEmail: dept.notification_email,
    escalationEmail: dept.escalation_email,
    emergencyContact: dept.emergency_contact_number,

    parentDepartmentId: dept.parent_department_id,
    _raw: dept,
  });

  // Helper functions
  const getStatusBadgeClass = (status) =>
    status === 'Active' ? 'status-badge-active' : 'status-badge-inactive';

  const formatTime = (time) => (time ? time.substring(0, 5) : 'N/A');

  const formatCurrency = (amount) =>
    amount
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount)
      : 'Not Set';

  const formatMinutes = (minutes) => {
    if (minutes === null || minutes === undefined) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleEditClick = useCallback(() => {
    if (onEdit && department) {
      onEdit(department);
    }
  }, [onEdit, department]);

  const handleClose = useCallback(() => {
    // Reset state when closing the modal
    setDepartment(null);
    setEmployees([]);
    setError(null);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  // Generate a unique ID for the modal title for accessibility
  const modalTitleId = `department-modal-title-${departmentId}`;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby={modalTitleId}>
      <div className="modal-content modal-xl">
        <div className="modal-header">
          <h2 id={modalTitleId} className="modal-title">
            {loading ? 'Loading Department...' : 'Department Details'}
          </h2>
          <div className="modal-header-actions">
            {department && onEdit && (
              <button
                onClick={handleEditClick}
                className="btn btn-secondary btn-sm"
                title="Edit Department"
                aria-label="Edit Department"
              >
                <Edit className="btn-icon" />
                Edit
              </button>
            )}
            <button onClick={handleClose} className="btn-close-modal" aria-label="Close Department Details">
              <X />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="loading-container">
              <Loader className="loading-spinner" size={48} />
              <p>Loading department details...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button
                onClick={fetchDepartmentDetails}
                className="btn btn-primary btn-sm retry-button"
              >
                Retry
              </button>
            </div>
          ) : !department ? (
            <p className="no-department-found">Department not found.</p>
          ) : (
            <div className="department-details">
              {/* Basic Information */}
              <div className="details-header">
                <div className="details-title-group">
                  <h3>{department.name}</h3>
                  <div className="details-code">{department.code}</div>
                </div>
                <span className={`status-badge ${getStatusBadgeClass(department.status)}`}>
                  {department.status}
                </span>
              </div>

              {department.description && (
                <div className="details-description">
                  <p>{department.description}</p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="details-stats">
                <div className="stat-item">
                  <Users className="stat-icon" />
                  <div>
                    <div className="stat-value">
                      {employees.length} / {department.maxCapacity}
                    </div>
                    <div className="stat-label">Employees</div>
                  </div>
                </div>
                <div className="stat-item">
                  <Building className="stat-icon" />
                  <div>
                    <div className="stat-value">{department.type}</div>
                    <div className="stat-label">Type</div>
                  </div>
                </div>
                <div className="stat-item">
                  <DollarSign className="stat-icon" />
                  <div>
                    <div className="stat-value">
                      {formatCurrency(department.budget)}
                    </div>
                    <div className="stat-label">Budget</div>
                  </div>
                </div>
                <div className="stat-item">
                  <Shield className="stat-icon" />
                  <div>
                    <div className="stat-value">
                      {department.confidentialityLevel}
                    </div>
                    <div className="stat-label">Confidentiality</div>
                  </div>
                </div>
              </div>

              {/* Detailed Information Tabs */}
              <div className="details-tabs">
                <div className="tab-content">
                  <Section icon={Mail} title="Contact Information">
                    <div className="details-grid">
                      <DetailItem
                        icon={MapPin}
                        label="Location"
                        value={department.location}
                      />
                      <DetailItem
                        icon={Phone}
                        label="Phone"
                        value={department.phone}
                      />
                      <DetailItem
                        icon={Mail}
                        label="Email"
                        value={department.email}
                      />
                      <DetailItem
                        icon={Mail}
                        label="Notification Email"
                        value={department.notificationEmail}
                      />
                      <DetailItem
                        icon={Mail}
                        label="Escalation Email"
                        value={department.escalationEmail}
                      />
                      <DetailItem
                        icon={Phone}
                        label="Emergency Contact"
                        value={department.emergencyContact}
                      />
                    </div>
                  </Section>

                  <Section icon={Clock} title="Work Schedule">
                    <div className="details-grid">
                      <DetailItem
                        icon={Clock}
                        label="Working Hours"
                        value={`${formatTime(department.workingHoursStart)} - ${formatTime(department.workingHoursEnd)}`}
                      />
                      <DetailItem
                        icon={Clock}
                        label="Break Duration"
                        value={formatMinutes(department.breakDuration)}
                      />
                      <DetailItem
                        icon={Clock}
                        label="Grace Period"
                        value={formatMinutes(department.graceMinutes)}
                      />
                    </div>
                    <div className="boolean-grid">
                      <BooleanIndicator
                        value={department.flexibleHours}
                        label="Flexible Hours"
                      />
                      <BooleanIndicator
                        value={department.remoteWork}
                        label="Remote Work"
                      />
                      <BooleanIndicator
                        value={department.overtimeAllowed}
                        label="Overtime Allowed"
                      />
                      <BooleanIndicator
                        value={department.weekendWork}
                        label="Weekend Work Required"
                      />
                      <BooleanIndicator
                        value={department.earlyDepartureApproval}
                        label="Early Departure Approval Required"
                      />
                    </div>
                  </Section>

                  <Section icon={Calendar} title="Leave Policies">
                    <div className="details-grid">
                      <DetailItem
                        icon={Calendar}
                        label="Auto-approve Leave"
                        value={`${department.autoApproveLeave} days`}
                      />
                      <DetailItem
                        icon={Calendar}
                        label="Max Consecutive Leave"
                        value={`${department.maxConsecutiveLeave} days`}
                      />
                      <DetailItem
                        icon={Calendar}
                        label="Advance Notice Required"
                        value={`${department.advanceNotice} days`}
                      />
                    </div>
                  </Section>

                  <Section icon={Settings} title="Employee Permissions">
                    <div className="boolean-grid">
                      <BooleanIndicator
                        value={department.canViewOthers}
                        label="View Other Employees"
                      />
                      <BooleanIndicator
                        value={department.canRequestOvertime}
                        label="Request Overtime"
                      />
                      <BooleanIndicator
                        value={department.showCalendar}
                        label="Department Calendar"
                      />
                      <BooleanIndicator
                        value={department.showAnnouncements}
                        label="Department Announcements"
                      />
                      <BooleanIndicator
                        value={department.showDirectory}
                        label="Team Directory"
                      />
                      <BooleanIndicator
                        value={department.allowProfileUpdates}
                        label="Profile Updates"
                      />
                    </div>
                  </Section>

                  <Section icon={Eye} title="Tracking & Audit">
                    <div className="boolean-grid">
                      <BooleanIndicator
                        value={department.trackLogin}
                        label="Login Activity"
                      />
                      <BooleanIndicator
                        value={department.trackAttendance}
                        label="Attendance Changes"
                      />
                      <BooleanIndicator
                        value={department.trackLeave}
                        label="Leave Activities"
                      />
                      <BooleanIndicator
                        value={department.trackProfile}
                        label="Profile Changes"
                      />
                    </div>
                    <DetailItem
                      icon={FileText}
                      label="Audit Retention"
                      value={`${department.auditRetention} days`}
                    />
                  </Section>

                  <Section icon={Building} title="Project & Billing">
                    <div className="details-grid">
                      <DetailItem
                        icon={DollarSign}
                        label="Cost Center"
                        value={department.costCenter}
                      />
                    </div>
                    <div className="boolean-grid">
                      <BooleanIndicator
                        value={department.isBillable}
                        label="Billable Department"
                      />
                      <BooleanIndicator
                        value={department.requiresTimesheet}
                        label="Timesheet Required"
                      />
                      <BooleanIndicator
                        value={department.projectBased}
                        label="Project-based Work"
                      />
                      <BooleanIndicator
                        value={department.clientFacing}
                        label="Client Facing"
                      />
                    </div>
                  </Section>

                  <Section icon={Shield} title="Security">
                    <div className="boolean-grid">
                      <BooleanIndicator
                        value={department.requiresBackgroundCheck}
                        label="Background Check Required"
                      />
                    </div>
                  </Section>

                  {/* Employees Section */}
                  <Section icon={Users} title={`Department Employees (${employees.length})`}>
                    {employees.length > 0 ? (
                      <div className="employee-grid">
                        {employees.map((emp) => (
                          <div key={emp.id} className="employee-card">
                            <div className="employee-info">
                              <div className="employee-name">{emp.name}</div>
                              <div className="employee-role">{emp.role}</div>
                              {emp.email && (
                                <div className="employee-contact">
                                  {emp.email}
                                </div>
                              )}
                              {emp.phone && (
                                <div className="employee-contact">
                                  {emp.phone}
                                </div>
                              )}
                            </div>
                            <div className="employee-status">
                              <span
                                className={`status-badge ${
                                  emp.status === 'active'
                                    ? 'status-badge-active'
                                    : 'status-badge-inactive'
                                }`}
                              >
                                {emp.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-employees">
                        No employees currently assigned to this department.
                      </p>
                    )}
                  </Section>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDepartmentModal;