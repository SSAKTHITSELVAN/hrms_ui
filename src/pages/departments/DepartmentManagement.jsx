import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Users, Eye, Edit, Trash2, Search, Filter, X, Loader, Clock, MapPin, Phone, Mail, DollarSign, Building } from 'lucide-react';
import {
  handleGetAllDepartments,
  handleUpdateDepartment as updateDepartmentService,
} from '../../services/departmentService';
import { handleGetAllEmployees } from '../../services/employeeService';
import CreateDepartmentModal from '../../components/CreateDepartmentModal';
import EditDepartmentModal from '../../components/EditDepartmentModal';
import ViewDepartmentModal from '../../components/ViewDepartmentModal';
import './DepartmentManagement.css';

// Reusable component for loading states
const LoadingSpinner = ({ message }) => (
  <div className="loading-container">
    <Loader className="loading-spinner" />
    <p>{message}</p>
  </div>
);

const DepartmentManagement = () => {
  // Core Data State
  const [departments, setDepartments] = useState([]);
  const [departmentEmployees, setDepartmentEmployees] = useState({});

  // Loading and Error State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  // Filter and Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewDepartmentId, setViewDepartmentId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [departmentToDeactivate, setDepartmentToDeactivate] = useState(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const deptsPromise = handleGetAllDepartments(0, 1000);
      const empsPromise = handleGetAllEmployees(0, 1000);

      const [deptsData, empsData] = await Promise.all([deptsPromise, empsPromise]);

      setDepartments(Array.isArray(deptsData) ? deptsData : []);

      const employeesByDept = {};
      if (Array.isArray(empsData)) {
        empsData.forEach(emp => {
          const deptId = emp.department_id;
          if (!deptId) return;
          if (!employeesByDept[deptId]) {
            employeesByDept[deptId] = [];
          }
          employeesByDept[deptId].push({
            id: emp.employee_id,
            name: `${emp.first_name || ''} ${emp.last_name || ''}`.trim(),
            role: emp.job_role?.job_title || 'N/A',
            email: emp.email
          });
        });
      }
      setDepartmentEmployees(employeesByDept);

    } catch (err) {
      console.error('Error fetching initial data:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // --- DATA TRANSFORMATION & FILTERING ---
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
    parentDepartmentId: dept.parent_department_id,
    _raw: dept,
  });

  const filteredDepartments = useMemo(() => {
    if (!Array.isArray(departments)) return [];
    return departments
      .map(transformToDisplayFormat)
      .filter(dept => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const matchesSearch =
          dept.name?.toLowerCase().includes(lowerSearchTerm) ||
          dept.description?.toLowerCase().includes(lowerSearchTerm) ||
          dept.code?.toLowerCase().includes(lowerSearchTerm);
        const matchesStatus = statusFilter === 'All' || dept.status === statusFilter;
        const matchesType = typeFilter === 'All' || dept.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
      });
  }, [departments, searchTerm, statusFilter, typeFilter]);

  // --- HANDLERS ---
  const handleDeactivateDepartment = async () => {
    if (!departmentToDeactivate) return;
    
    setLoadingAction(true);
    try {
      const payload = { ...departmentToDeactivate, status: 'inactive' };
      await updateDepartmentService(departmentToDeactivate.id, payload);
      
      // Refresh departments data
      await fetchInitialData();
      closeAllModals();
    } catch (err) {
      console.error('Error deactivating department:', err);
      setError(err.message || 'Failed to deactivate department');
    } finally {
      setLoadingAction(false);
    }
  };

  // UI Event Handlers
  const handleOpenCreate = () => {
    setShowCreateModal(true);
  };

  const handleOpenDetails = (departmentId) => {
    setViewDepartmentId(departmentId);
    setShowViewModal(true);
  };
  
  const handleOpenEdit = (dept) => {
    setEditDepartmentId(dept.id);
    setShowEditModal(true);
  };
  
  // The handleOpenDeactivate function remains, but its corresponding button is removed from JSX
  const handleOpenDeactivate = (dept) => {
    setDepartmentToDeactivate(dept);
    setShowConfirmDialog(true);
  };

  // Modal Callback Handlers
  const handleCreateSuccess = async () => {
    // Refresh departments data after successful creation
    await fetchInitialData();
  };

  const handleCreateError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleEditSuccess = async () => {
    // Refresh departments data after successful edit
    await fetchInitialData();
  };

  const handleEditError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleViewEditRequest = (departmentData) => {
    // Close view modal and open edit modal
    setShowViewModal(false);
    setViewDepartmentId(null);
    setEditDepartmentId(departmentData.id);
    setShowEditModal(true);
  };

  const handleViewError = (errorMessage) => {
    setError(errorMessage);
  };

  const closeAllModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setShowConfirmDialog(false);
    setViewDepartmentId(null);
    setEditDepartmentId(null);
    setDepartmentToDeactivate(null);
  };

  // --- HELPERS & FORMATTERS ---
  const getStatusBadgeClass = (status) => status === 'Active' ? 'status-badge-active' : 'status-badge-inactive';
  const formatTime = (time) => time ? time.substring(0, 5) : 'N/A';

  // --- RENDER LOGIC ---
  if (loading) {
    return <LoadingSpinner message="Loading Department Data..." />;
  }

  return (
    <div className="dept-management-container">
      <div className="dept-management-content">
        <div className="header">
          <h1 className="header-title">Department Management</h1>
          <p className="header-subtitle">Central hub for organizing and managing company departments.</p>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>&times;</button>
          </div>
        )}

        <div className="controls-panel">
          <div className="controls-wrapper">
            <div className="controls-group">
              <div className="search-container">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search departments..." 
                  className="search-input" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              <div className="filter-container">
                <Filter className="filter-icon" />
                <select 
                  className="filter-select" 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="filter-container">
                <Building className="filter-icon" />
                <select 
                  className="filter-select" 
                  value={typeFilter} 
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="operational">Operational</option>
                  <option value="administrative">Administrative</option>
                  <option value="support">Support</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
            </div>
            <button onClick={handleOpenCreate} className="btn btn-primary">
              <Plus className="btn-icon" /> Add Department
            </button>
          </div>
        </div>

        <div className="department-grid">
          {filteredDepartments.map(dept => (
            <div key={dept.id} className="department-card">
              <div className="card-header">
                <div className="card-title-group">
                  <h3 className="card-title">{dept.name}</h3>
                  <div className="card-code">{dept.code}</div>
                </div>
                <span className={`status-badge ${getStatusBadgeClass(dept.status)}`}>
                  {dept.status}
                </span>
              </div>
              <p className="card-description">
                {dept.description || 'No description provided.'}
              </p>
              <div className="card-details-grid">
                <div className="card-detail-item">
                  <Users className="detail-icon" />
                  <span>{dept.employeeCount} / {dept.maxCapacity} Employees</span>
                </div>
                <div className="card-detail-item">
                  <Building className="detail-icon" />
                  <span>{dept.type}</span>
                </div>
                {dept.location && (
                  <div className="card-detail-item">
                    <MapPin className="detail-icon" />
                    <span>{dept.location}</span>
                  </div>
                )}
                <div className="card-detail-item">
                  <Clock className="detail-icon" />
                  <span>{formatTime(dept.workingHoursStart)} - {formatTime(dept.workingHoursEnd)}</span>
                </div>
              </div>
              <div className="card-footer">
                <button onClick={() => handleOpenDetails(dept.id)} className="btn-view-details">
                  <Eye className="btn-icon" /> View Details
                </button>
                <div className="card-actions">
                  <button 
                    onClick={() => handleOpenEdit(dept)} 
                    className="btn-icon-action" 
                    title="Edit"
                  >
                    <Edit />
                  </button>
                  {/* The deactivation button is removed as per your request */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="no-results">
            <h3>No Departments Found</h3>
            <p>Try adjusting your filters or add a new department.</p>
          </div>
        )}

        {/* Create Department Modal */}
        <CreateDepartmentModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateSuccess={handleCreateSuccess}
          onError={handleCreateError}
        />

        {/* Edit Department Modal */}
        <EditDepartmentModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          departmentId={editDepartmentId}
          onUpdateSuccess={handleEditSuccess}
          onError={handleEditError}
        />

        {/* View Department Modal */}
        <ViewDepartmentModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          departmentId={viewDepartmentId}
          onEdit={handleViewEditRequest}
          onError={handleViewError}
        />

        {/* Confirm Deactivation Modal */}
        {showConfirmDialog && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Confirm Deactivation</h2>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to deactivate the{' '}
                  <strong>{departmentToDeactivate?.name}</strong> department?
                </p>
              </div>
              <div className="modal-footer">
                <button 
                  onClick={closeAllModals} 
                  className="btn btn-secondary" 
                  disabled={loadingAction}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeactivateDepartment} 
                  className="btn btn-danger" 
                  disabled={loadingAction}
                >
                  {loadingAction ? (
                    <>
                      <Loader className="btn-icon loading" />
                      Deactivating...
                    </>
                  ) : (
                    <>
                      <Trash2 className="btn-icon" />
                      Deactivate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentManagement;