import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Eye, Trash2, X, Users, Building, Mail, Phone, Calendar, MapPin, Loader, UserCheck, UserX } from 'lucide-react';
import { handleGetAllEmployees, handleGetEmployeeById, handleUpdateEmployeeStatus } from '../../services/employeeService';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    personal_email: '',
    personal_contact_number: '',
    job_role: '',
    gender: '',
    date_of_birth: '',
    marital_status: '',
    nationality: '',
    blood_group: '',
    emergency_contact_person: '',
    emergency_contact_number: ''
  });

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await handleGetAllEmployees(0, 100);
      setEmployees(data || []);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeDetails = async (employeeId) => {
    try {
      setLoadingDetails(true);
      const data = await handleGetEmployeeById(employeeId);
      setSelectedEmployeeDetails(data);
    } catch (err) {
      console.error('Error fetching employee details:', err);
      setError(err.message || 'Failed to fetch employee details');
    } finally {
      setLoadingDetails(false);
    }
  };

  // Transform API data to match display format
  const transformEmployeeData = (employee) => {
    return {
      id: employee.employee_id,
      name: `${employee.first_name} ${employee.middle_name ? employee.middle_name + ' ' : ''}${employee.last_name}`.trim(),
      email: employee.personal_email,
      phone: employee.personal_contact_number,
      department: employee.job_role, // Using job_role as department for now
      role: employee.job_role,
      joinDate: new Date(employee.created_at).toISOString().split('T')[0],
      status: employee.employee_status || 'Active', // Use actual status from API
      location: employee.nationality || 'Not specified',
      salary: 'Not specified', // API doesn't provide salary
      gender: employee.gender,
      dateOfBirth: employee.date_of_birth,
      maritalStatus: employee.marital_status,
      bloodGroup: employee.blood_group,
      emergencyContact: employee.emergency_contact_person,
      emergencyPhone: employee.emergency_contact_number
    };
  };

  // Get unique departments from employees
  const departments = useMemo(() => {
    const depts = employees.map(emp => emp.job_role).filter(Boolean);
    return [...new Set(depts)];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const transformedEmployees = employees.map(transformEmployeeData);
    
    return transformedEmployees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
      const matchesStatus = !statusFilter || employee.status === statusFilter;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  const handleEmployeeClick = async (employee) => {
    setSelectedEmployee(transformEmployeeData(employee));
    await fetchEmployeeDetails(employee.employee_id);
  };

  const handleStatusUpdate = async (employeeId, currentStatus, event) => {
    event.stopPropagation(); // Prevent card click
    
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const actionText = newStatus === 'ACTIVE' ? 'activate' : 'deactivate';
    
    if (!confirm(`Are you sure you want to ${actionText} this employee?`)) {
      return;
    }

    try {
      setUpdatingStatus(true);
      await handleUpdateEmployeeStatus(employeeId, newStatus);
      
      // Update the employees list with the new status
      setEmployees(prevEmployees => 
        prevEmployees.map(emp => 
          emp.employee_id === employeeId 
            ? { ...emp, employee_status: newStatus }
            : emp
        )
      );

      // Update selected employee if it's the same one
      if (selectedEmployee && selectedEmployee.id === employeeId) {
        setSelectedEmployee(prev => ({ ...prev, status: newStatus }));
      }

      alert(`Employee ${actionText}d successfully!`);
    } catch (err) {
      console.error('Error updating employee status:', err);
      alert(err.message || `Failed to ${actionText} employee`);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddEmployee = () => {
    if (!newEmployee.first_name || !newEmployee.last_name || !newEmployee.personal_email || 
        !newEmployee.personal_contact_number || !newEmployee.job_role) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Here you would typically make an API call to add the employee
    // For now, we'll just refresh the employee list
    alert('Add employee functionality needs to be implemented with your API');
    setShowAddForm(false);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setSelectedEmployeeDetails(null);
  };

  if (loading) {
    return (
      <div className="employee-management">
        <div className="loading-container">
          <Loader className="loading-spinner" />
          <p>Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employee-management">
        <div className="error-container">
          <p className="error-message">Error: {error}</p>
          <button onClick={fetchEmployees} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-management">
      {/* Header */}
      <div className="management-header">
        <div className="management-header-content">
          <div className="management-header-inner">
            <div className="management-header-left">
              <Users className="management-logo" />
              <h1 className="management-title">Employee Dashboard</h1>
              <span className="employee-count">({employees.length} employees)</span>
            </div>
            <div className="header-actions">
              <button onClick={fetchEmployees} className="btn-outline">
                Refresh
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                <Plus className="btn-icon" />
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="management-content">
        {/* Filters */}
        <div className="filters-section">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search employees..."
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
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        {/* Employee Grid */}
        <div className="employee-grid">
          {filteredEmployees.map(employee => (
            <div
              key={employee.id}
              className="employee-card"
              onClick={() => handleEmployeeClick(employees.find(emp => emp.employee_id === employee.id))}
            >
              <div className="employee-card-header">
                <div className="employee-info">
                  <h3>{employee.name}</h3>
                  <p>{employee.role}</p>
                </div>
                <span className={`status-badge ${employee.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
                  {employee.status}
                </span>
              </div>
              
              <div className="employee-details">
                <div className="detail-item">
                  <Building className="detail-icon" />
                  {employee.department}
                </div>
                <div className="detail-item">
                  <Mail className="detail-icon" />
                  {employee.email}
                </div>
                <div className="detail-item">
                  <Phone className="detail-icon" />
                  {employee.phone}
                </div>
              </div>

              <div className="employee-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmployeeClick(employees.find(emp => emp.employee_id === employee.id));
                  }}
                  className="btn-secondary"
                >
                  <Eye className="btn-icon-sm" />
                  View Details
                </button>
                
                <button
                  onClick={(e) => handleStatusUpdate(employee.id, employee.status, e)}
                  className={`btn-outline ${employee.status === 'ACTIVE' ? 'btn-danger' : 'btn-success'}`}
                  disabled={updatingStatus}
                >
                  {employee.status === 'ACTIVE' ? (
                    <>
                      <UserX className="btn-icon-sm" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <UserCheck className="btn-icon-sm" />
                      Activate
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && !loading && (
          <div className="empty-state">
            <Users className="empty-state-icon" />
            <p className="empty-state-text">No employees found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Employee Details</h2>
              <button
                onClick={closeModal}
                className="btn-close"
              >
                <X className="close-icon" />
              </button>
            </div>
            
            <div className="modal-body">
              {loadingDetails ? (
                <div className="loading-container">
                  <Loader className="loading-spinner" />
                  <p>Loading employee details...</p>
                </div>
              ) : (
                <>
                  <div className="employee-detail-header">
                    <div className="employee-detail-info">
                      <h3>{selectedEmployee.name}</h3>
                      <p>{selectedEmployee.role}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`status-badge ${selectedEmployee.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
                        {selectedEmployee.status}
                      </span>
                      <button
                        onClick={(e) => handleStatusUpdate(selectedEmployee.id, selectedEmployee.status, e)}
                        className={`btn-outline ${selectedEmployee.status === 'ACTIVE' ? 'btn-danger' : 'btn-success'}`}
                        disabled={updatingStatus}
                      >
                        {selectedEmployee.status === 'ACTIVE' ? (
                          <>
                            <UserX className="btn-icon-sm" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="btn-icon-sm" />
                            Activate
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="employee-detail-grid">
                    <div className="detail-section">
                      <h4>Contact Information</h4>
                      <div className="detail-row">
                        <Mail className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p>Email</p>
                          <p>{selectedEmployee.email}</p>
                        </div>
                      </div>
                      
                      <div className="detail-row">
                        <Phone className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p>Phone</p>
                          <p>{selectedEmployee.phone}</p>
                        </div>
                      </div>
                      
                      <div className="detail-row">
                        <Building className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p>Job Role</p>
                          <p>{selectedEmployee.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Personal Information</h4>
                      <div className="detail-row">
                        <Calendar className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p>Date of Birth</p>
                          <p>{selectedEmployee.dateOfBirth ? new Date(selectedEmployee.dateOfBirth).toLocaleDateString() : 'Not specified'}</p>
                        </div>
                      </div>
                      
                      <div className="detail-row">
                        <MapPin className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p>Nationality</p>
                          <p>{selectedEmployee.location}</p>
                        </div>
                      </div>
                      
                      <div className="detail-row">
                        <Users className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p>Gender</p>
                          <p>{selectedEmployee.gender || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-row-icon">♥</div>
                        <div className="detail-row-content">
                          <p>Blood Group</p>
                          <p>{selectedEmployee.bloodGroup || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-row-icon">💍</div>
                        <div className="detail-row-content">
                          <p>Marital Status</p>
                          <p>{selectedEmployee.maritalStatus || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Emergency Contact</h4>
                      <div className="detail-row">
                        <Users className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p>Contact Person</p>
                          <p>{selectedEmployee.emergencyContact || 'Not specified'}</p>
                        </div>
                      </div>
                      
                      <div className="detail-row">
                        <Phone className="detail-row-icon" />
                        <div className="detail-row-content">
                          <p>Emergency Phone</p>
                          <p>{selectedEmployee.emergencyPhone || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Add New Employee</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-close"
              >
                <X className="close-icon" />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newEmployee.first_name}
                    onChange={(e) => setNewEmployee({...newEmployee, first_name: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Middle Name</label>
                  <input
                    type="text"
                    value={newEmployee.middle_name}
                    onChange={(e) => setNewEmployee({...newEmployee, middle_name: e.target.value})}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newEmployee.last_name}
                    onChange={(e) => setNewEmployee({...newEmployee, last_name: e.target.value})}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    required
                    value={newEmployee.personal_email}
                    onChange={(e) => setNewEmployee({...newEmployee, personal_email: e.target.value})}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newEmployee.personal_contact_number}
                    onChange={(e) => setNewEmployee({...newEmployee, personal_contact_number: e.target.value})}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Job Role *</label>
                  <input
                    type="text"
                    required
                    value={newEmployee.job_role}
                    onChange={(e) => setNewEmployee({...newEmployee, job_role: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select
                    value={newEmployee.gender}
                    onChange={(e) => setNewEmployee({...newEmployee, gender: e.target.value})}
                    className="form-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    value={newEmployee.date_of_birth}
                    onChange={(e) => setNewEmployee({...newEmployee, date_of_birth: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Marital Status</label>
                  <select
                    value={newEmployee.marital_status}
                    onChange={(e) => setNewEmployee({...newEmployee, marital_status: e.target.value})}
                    className="form-select"
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Nationality</label>
                  <input
                    type="text"
                    value={newEmployee.nationality}
                    onChange={(e) => setNewEmployee({...newEmployee, nationality: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <select
                    value={newEmployee.blood_group}
                    onChange={(e) => setNewEmployee({...newEmployee, blood_group: e.target.value})}
                    className="form-select"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Emergency Contact Person</label>
                  <input
                    type="text"
                    value={newEmployee.emergency_contact_person}
                    onChange={(e) => setNewEmployee({...newEmployee, emergency_contact_person: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Emergency Contact Number</label>
                  <input
                    type="tel"
                    value={newEmployee.emergency_contact_number}
                    onChange={(e) => setNewEmployee({...newEmployee, emergency_contact_number: e.target.value})}
                    className="form-input"
                  />
                </div>
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
                  onClick={handleAddEmployee}
                  className="btn-primary"
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;