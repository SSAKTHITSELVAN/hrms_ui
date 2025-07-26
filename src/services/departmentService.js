// src/services/departmentService.js
import { 
    getAllDepartments, 
    getDepartmentById, 
    createDepartment, 
    updateDepartment, 
    deleteDepartment,
    getDepartmentsByCompany,
    searchDepartments 
} from '../api/department';

export const handleGetAllDepartments = async (skip = 0, limit = 100) => {
    try {
        const response = await getAllDepartments(skip, limit);
        return response.data?.items || response.data || [];
    } catch (err) {
        console.error('Error fetching departments:', err);
        throw err.response?.data || { message: 'Failed to retrieve departments' };
    }
};

export const handleGetDepartmentById = async (departmentId) => {
    try {
        const response = await getDepartmentById(departmentId);
        return response.data?.data || response.data;
    } catch (err) {
        console.error('Error fetching department details:', err);
        throw err.response?.data || { message: 'Failed to retrieve department details' };
    }
};

export const handleCreateDepartment = async (departmentData) => {
    try {
        // Transform UI data to API format with required defaults
        const apiPayload = transformToApiFormat(departmentData);
        const response = await createDepartment(apiPayload);
        return response.data || response;
    } catch (err) {
        console.error('Error creating department:', err);
        throw err.response?.data || { message: 'Failed to create department' };
    }
};

export const handleUpdateDepartment = async (departmentId, departmentData) => {
    try {
        const apiPayload = transformToApiFormat(departmentData);
        const response = await updateDepartment(departmentId, apiPayload);
        return response.data || response;
    } catch (err) {
        console.error('Error updating department:', err);
        throw err.response?.data || { message: 'Failed to update department' };
    }
};

export const handleDeleteDepartment = async (departmentId) => {
    try {
        const response = await deleteDepartment(departmentId);
        return response.data || response;
    } catch (err) {
        console.error('Error deleting department:', err);
        throw err.response?.data || { message: 'Failed to delete department' };
    }
};

export const handleGetDepartmentsByCompany = async (companyId, skip = 0, limit = 100) => {
    try {
        const response = await getDepartmentsByCompany(companyId, skip, limit);
        return response.data?.items || response.data || [];
    } catch (err) {
        console.error('Error fetching company departments:', err);
        throw err.response?.data || { message: 'Failed to retrieve company departments' };
    }
};

export const handleSearchDepartments = async (searchQuery, skip = 0, limit = 100) => {
    try {
        const response = await searchDepartments(searchQuery, skip, limit);
        return response.data?.items || response.data || [];
    } catch (err) {
        console.error('Error searching departments:', err);
        throw err.response?.data || { message: 'Failed to search departments' };
    }
};

// Transform UI form data to API format
const transformToApiFormat = (uiData) => {
    return {
        // Ensure company_id is always sent, even if backend overwrites it
        company_id: uiData.company_id || "placeholder_company_id", //

        department_name: uiData.name || '',
        department_description: uiData.description || '',
        department_code: uiData.code || generateDepartmentCode(uiData.name),
        department_type: uiData.type || 'operational',
        department_status: uiData.status ? uiData.status.toLowerCase() : 'active',
        max_employee_capacity: uiData.maxCapacity || 50,
        
        // Work schedule defaults
        working_hours_start: uiData.workingHoursStart || '09:00:00',
        working_hours_end: uiData.workingHoursEnd || '17:00:00',
        break_duration_minutes: uiData.breakDuration || 60,
        flexible_hours_allowed: uiData.flexibleHours || false,
        remote_work_allowed: uiData.remoteWork || false,
        overtime_allowed: uiData.overtimeAllowed !== undefined ? uiData.overtimeAllowed : true,
        weekend_work_required: uiData.weekendWork || false,
        
        // Leave policies defaults
        auto_approve_leave_days: uiData.autoApproveLeave || 0,
        max_consecutive_leave_days: uiData.maxConsecutiveLeave || 30,
        advance_leave_notice_days: uiData.advanceNotice || 7,
        late_arrival_grace_minutes: uiData.graceMinutes || 15,
        early_departure_requires_approval: uiData.earlyDepartureApproval !== undefined ? uiData.earlyDepartureApproval : true,
        
        // Permission defaults
        can_employees_view_others: uiData.canViewOthers || false,
        can_employees_request_overtime: uiData.canRequestOvertime !== undefined ? uiData.canRequestOvertime : true,
        show_department_calendar: uiData.showCalendar !== undefined ? uiData.showCalendar : true,
        show_department_announcements: uiData.showAnnouncements !== undefined ? uiData.showAnnouncements : true,
        show_team_directory: uiData.showDirectory !== undefined ? uiData.showDirectory : true,
        allow_profile_updates: uiData.allowProfileUpdates !== undefined ? uiData.allowProfileUpdates : true,
        
        // Tracking defaults
        track_login_activity: uiData.trackLogin !== undefined ? uiData.trackLogin : true,
        track_attendance_changes: uiData.trackAttendance !== undefined ? uiData.trackAttendance : true,
        track_leave_activities: uiData.trackLeave !== undefined ? uiData.trackLeave : true,
        track_profile_changes: uiData.trackProfile !== undefined ? uiData.trackProfile : true,
        audit_retention_days: uiData.auditRetention || 365,
        
        // Optional fields
        department_location: uiData.location || null,
        department_phone: uiData.phone || null,
        department_email: uiData.email || null,
        department_budget: uiData.budget || null,
        cost_center_code: uiData.costCenter || null,
        parent_department_id: uiData.parentDepartmentId || null,
        
        // Security defaults
        confidentiality_level: uiData.confidentialityLevel || 'standard',
        requires_background_check: uiData.requiresBackgroundCheck || false,
        
        // Project defaults
        is_billable_department: uiData.isBillable || false,
        requires_timesheet: uiData.requiresTimesheet || false,
        project_based_work: uiData.projectBased || false,
        client_facing: uiData.clientFacing || false,
        
        // Contact info
        notification_email: uiData.notificationEmail || null,
        escalation_email: uiData.escalationEmail || null,
        emergency_contact_number: uiData.emergencyContact || null,
    };
};

// Generate department code from name
const generateDepartmentCode = (name) => {
    if (!name) return 'DEPT001';
    
    const code = name
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .substring(0, 4)
        .padEnd(4, 'X');
    
    const timestamp = Date.now().toString().slice(-3);
    return `${code}${timestamp}`;
};