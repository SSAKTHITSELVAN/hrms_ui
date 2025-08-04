import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp, Edit2, Save, X, User } from 'lucide-react';
import { handleGetMyPersonalDetails, updatePersonalDetails } from '../services/personalDetailsService';

// Move InputField outside the component to prevent recreation
const InputField = ({ label, value, onChange, type = "text", fullWidth = false, options = null, onKeyPress }) => (
  <div className={`field-group ${fullWidth ? 'field-full-width' : ''}`}>
    <label className="field-label">{label}</label>
    {options ? (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
        onKeyPress={onKeyPress}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
        onKeyPress={onKeyPress}
        autoComplete="off"
      />
    )}
  </div>
);

// Move DisplayField outside the component
const DisplayField = ({ label, value, fullWidth = false }) => (
  <div className={`field-group ${fullWidth ? 'field-full-width' : ''}`}>
    <label className="field-label">{label}</label>
    <p className="field-value">{value || 'Not specified'}</p>
  </div>
);

const PersonalDetailsCard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [personalData, setPersonalData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    // employeeId: '',
    gender: '',
    dateOfBirth: '',
    maritalStatus: '',
    nationality: '',
    bloodGroup: '',
    jobRole: ''
  });

  const [emergencyData, setEmergencyData] = useState({
    emergencyContactPerson: '',
    emergencyContactNumber: ''
  });

  const [tempData, setTempData] = useState({});

  // Fetch personal details on component mount
  useEffect(() => {
    fetchPersonalDetails();
  }, []);

  const fetchPersonalDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await handleGetMyPersonalDetails();
      
      if (response) {
        const data = response;
        
        setPersonalData({
          firstName: data.first_name || '',
          middleName: data.middle_name || '',
          lastName: data.last_name || '',
          email: data.personal_email || '',
          phone: data.personal_contact_number || '',
          // employeeId: data.employee_id || '',
          gender: data.gender || '',
          dateOfBirth: data.date_of_birth || '',
          maritalStatus: data.marital_status || '',
          nationality: data.nationality || '',
          bloodGroup: data.blood_group || '',
          jobRole: data.job_role || ''
        });

        setEmergencyData({
          emergencyContactPerson: data.emergency_contact_person || '',
          emergencyContactNumber: data.emergency_contact_number || ''
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch personal details');
      console.error('Error fetching personal details:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && !personalData.firstName && !personalData.lastName) {
      fetchPersonalDetails();
    }
  };

  const startEditing = () => {
    setTempData({ ...personalData });
    setIsEditing(true);
    setError(null);
  };

  const saveChanges = async () => {
    try {
      setSaving(true);
      setError(null);

      const updateData = {
        first_name: tempData.firstName,
        middle_name: tempData.middleName,
        last_name: tempData.lastName,
        gender: tempData.gender,
        date_of_birth: tempData.dateOfBirth,
        marital_status: tempData.maritalStatus,
        nationality: tempData.nationality,
        blood_group: tempData.bloodGroup,
        personal_contact_number: tempData.phone,
        personal_email: tempData.email,
        job_role: tempData.jobRole,
        emergency_contact_person: emergencyData.emergencyContactPerson,
        emergency_contact_number: emergencyData.emergencyContactNumber
      };

      const response = await updatePersonalDetails(updateData);
      
      if (response) {
        setPersonalData(tempData);
        setIsEditing(false);
        setTempData({});
        await fetchPersonalDetails();
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to update personal details');
      console.error('Error updating personal details:', err);
    } finally {
      setSaving(false);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setTempData({});
    setError(null);
  };

  // Create individual change handlers to prevent recreation
  const handleFirstNameChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, firstName: value }));
  }, []);

  const handleMiddleNameChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, middleName: value }));
  }, []);

  const handleLastNameChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, lastName: value }));
  }, []);

  const handleEmailChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, email: value }));
  }, []);

  const handlePhoneChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, phone: value }));
  }, []);

  const handleGenderChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, gender: value }));
  }, []);

  const handleDateOfBirthChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, dateOfBirth: value }));
  }, []);

  const handleMaritalStatusChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, maritalStatus: value }));
  }, []);

  const handleNationalityChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, nationality: value }));
  }, []);

  const handleBloodGroupChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, bloodGroup: value }));
  }, []);

  const handleJobRoleChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, jobRole: value }));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      saveChanges();
    }
  };

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isEditing && tempData.firstName && tempData.lastName) {
        saveChanges();
      }
    }
  }, [isEditing, tempData.firstName, tempData.lastName]);

  // Memoize options to prevent recreation
  const genderOptions = useMemo(() => [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ], []);

  const maritalStatusOptions = useMemo(() => [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
  ], []);

  const bloodGroupOptions = useMemo(() => [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ], []);

  const CardHeader = () => (
    <div className="card-header">
      <div className="card-header-left">
        <User className="card-icon" />
        <h3 className="card-title">Personal Details</h3>
      </div>
      <div className="card-header-right">
        <button
          onClick={toggleCard}
          className="card-action-btn"
          type="button"
        >
          {isExpanded ? (
            <ChevronUp className="card-action-icon" />
          ) : (
            <ChevronDown className="card-action-icon" />
          )}
        </button>
        {!isEditing && (
          <button
            onClick={startEditing}
            className="card-action-btn"
            disabled={loading}
            type="button"
          >
            <Edit2 className="card-action-icon" />
          </button>
        )}
      </div>
    </div>
  );

  if (loading && isExpanded) {
    return (
      <div className="employee-card">
        <CardHeader />
        <div className="card-content">
          <div className="card-grid">
            <div className="field-group">
              <p className="field-value">Loading personal details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-card">
      <CardHeader />
      {isExpanded && (
        <div className="card-content">
          {error && (
            <div className="error-message" style={{ 
              color: '#dc2626', 
              fontSize: '0.75rem', 
              marginBottom: '0.75rem',
              padding: '0.5rem',
              backgroundColor: '#fee2e2',
              borderRadius: '0.25rem'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleFormSubmit}>
            <div className="card-grid">
              {isEditing ? (
                <>
                  <InputField
                    label="First Name"
                    value={tempData.firstName || ''}
                    onChange={handleFirstNameChange}
                    onKeyPress={handleKeyPress}
                  />
                  <InputField
                    label="Middle Name"
                    value={tempData.middleName || ''}
                    onChange={handleMiddleNameChange}
                    onKeyPress={handleKeyPress}
                  />
                  <InputField
                    label="Last Name"
                    value={tempData.lastName || ''}
                    onChange={handleLastNameChange}
                    onKeyPress={handleKeyPress}
                  />
                  <InputField
                    label="Email"
                    value={tempData.email || ''}
                    onChange={handleEmailChange}
                    type="email"
                    onKeyPress={handleKeyPress}
                  />
                  <InputField
                    label="Phone"
                    value={tempData.phone || ''}
                    onChange={handlePhoneChange}
                    onKeyPress={handleKeyPress}
                  />
                  <InputField
                    label="Gender"
                    value={tempData.gender || ''}
                    onChange={handleGenderChange}
                    options={genderOptions}
                    onKeyPress={handleKeyPress}
                  />
                  <InputField
                    label="Date of Birth"
                    value={tempData.dateOfBirth || ''}
                    onChange={handleDateOfBirthChange}
                    type="date"
                    onKeyPress={handleKeyPress}
                  />
                  <InputField
                    label="Marital Status"
                    value={tempData.maritalStatus || ''}
                    onChange={handleMaritalStatusChange}
                    options={maritalStatusOptions}
                    onKeyPress={handleKeyPress}
                  />
                  <InputField
                    label="Nationality"
                    value={tempData.nationality || ''}
                    onChange={handleNationalityChange}
                    onKeyPress={handleKeyPress}
                  />
                  <InputField
                    label="Blood Group"
                    value={tempData.bloodGroup || ''}
                    onChange={handleBloodGroupChange}
                    options={bloodGroupOptions}
                    onKeyPress={handleKeyPress}
                  />
                  <InputField
                    label="Job Role"
                    value={tempData.jobRole || ''}
                    onChange={handleJobRoleChange}
                    onKeyPress={handleKeyPress}
                  />
                </>
              ) : (
                <>
                  <DisplayField label="First Name" value={personalData.firstName} />
                  <DisplayField label="Middle Name" value={personalData.middleName} />
                  <DisplayField label="Last Name" value={personalData.lastName} />
                  <DisplayField label="Email" value={personalData.email} />
                  <DisplayField label="Phone" value={personalData.phone} />
                  {/* <DisplayField label="Employee ID" value={personalData.employeeId} /> */}
                  <DisplayField label="Gender" value={personalData.gender} />
                  <DisplayField label="Date of Birth" value={personalData.dateOfBirth} />
                  <DisplayField label="Marital Status" value={personalData.maritalStatus} />
                  <DisplayField label="Nationality" value={personalData.nationality} />
                  <DisplayField label="Blood Group" value={personalData.bloodGroup} />
                  <DisplayField label="Job Role" value={personalData.jobRole} />
                </>
              )}
            </div>
            
            {/* Emergency Contact Section */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h4>
              <div className="card-grid">
                <DisplayField label="Emergency Contact Person" value={emergencyData.emergencyContactPerson} />
                <DisplayField label="Emergency Contact Number" value={emergencyData.emergencyContactNumber} />
              </div>
            </div>
            
            {isEditing && (
              <div className="edit-actions">
                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >
                  <Save className="btn-icon" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="cancel-btn"
                  disabled={saving}
                >
                  <X className="btn-icon" />
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default PersonalDetailsCard;