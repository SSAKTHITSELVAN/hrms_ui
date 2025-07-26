
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Save, X, GraduationCap, Users, Calendar } from 'lucide-react';
import PersonalDetailsCard from '../../components/PersonalDetailsCard';
import AddressCard from '../../components/AddressCard';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
  const [expandedCards, setExpandedCards] = useState({
    education: false,
    family: false,
    leave: false
  });

  const [editingCards, setEditingCards] = useState({
    education: false,
    family: false,
    leave: false
  });

  // Static data for other cards (can be moved to separate components later)
  const [profileData, setProfileData] = useState({
    education: {
      degree: 'Bachelor of Computer Science',
      university: 'Stanford University',
      graduationYear: '2020',
      gpa: '3.8'
    },
    family: {
      fatherName: 'John Doe Sr.',
      motherName: 'Jane Doe',
      spouseName: 'Sarah Doe',
      children: '2'
    },
    leave: {
      annual: { total: 25, used: 12, remaining: 13 },
      sick: { total: 10, used: 3, remaining: 7 },
      personal: { total: 5, used: 1, remaining: 4 }
    }
  });

  const [tempData, setTempData] = useState({});

  const toggleCard = (cardName) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardName]: !prev[cardName]
    }));
  };

  const startEditing = (cardName) => {
    setTempData({ ...profileData[cardName] });
    setEditingCards(prev => ({
      ...prev,
      [cardName]: true
    }));
  };

  const saveChanges = (cardName) => {
    setProfileData(prev => ({
      ...prev,
      [cardName]: tempData
    }));
    setEditingCards(prev => ({
      ...prev,
      [cardName]: false
    }));
    setTempData({});
  };

  const cancelEditing = (cardName) => {
    setEditingCards(prev => ({
      ...prev,
      [cardName]: false
    }));
    setTempData({});
  };

  const updateTempData = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const CardHeader = ({ title, icon: Icon, cardName, isExpanded, isEditing }) => (
    <div className="card-header">
      <div className="card-header-left">
        <Icon className="card-icon" />
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-header-right">
        <button
          onClick={() => toggleCard(cardName)}
          className="card-action-btn"
        >
          {isExpanded ? (
            <ChevronUp className="card-action-icon" />
          ) : (
            <ChevronDown className="card-action-icon" />
          )}
        </button>
        {!isEditing && (
          <button
            onClick={() => startEditing(cardName)}
            className="card-action-btn"
          >
            <Edit2 className="card-action-icon" />
          </button>
        )}
      </div>
    </div>
  );

  const InputField = ({ label, value, onChange, type = "text", fullWidth = false, options = null }) => (
    <div className={`field-group ${fullWidth ? 'field-full-width' : ''}`}>
      <label className="field-label">{label}</label>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field-input"
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
        />
      )}
    </div>
  );

  const DisplayField = ({ label, value, fullWidth = false }) => (
    <div className={`field-group ${fullWidth ? 'field-full-width' : ''}`}>
      <label className="field-label">{label}</label>
      <p className="field-value">{value || 'Not specified'}</p>
    </div>
  );

  const EducationCard = () => (
    <div className="employee-card">
      <CardHeader
        title="Education"
        icon={GraduationCap}
        cardName="education"
        isExpanded={expandedCards.education}
        isEditing={editingCards.education}
      />
      {expandedCards.education && (
        <div className="card-content">
          <div className="card-grid">
            {editingCards.education ? (
              <>
                <InputField
                  label="Degree"
                  value={tempData.degree || ''}
                  onChange={(value) => updateTempData('degree', value)}
                />
                <InputField
                  label="University"
                  value={tempData.university || ''}
                  onChange={(value) => updateTempData('university', value)}
                />
                <InputField
                  label="Graduation Year"
                  value={tempData.graduationYear || ''}
                  onChange={(value) => updateTempData('graduationYear', value)}
                  type="number"
                />
                <InputField
                  label="GPA"
                  value={tempData.gpa || ''}
                  onChange={(value) => updateTempData('gpa', value)}
                />
              </>
            ) : (
              <>
                <DisplayField label="Degree" value={profileData.education.degree} />
                <DisplayField label="University" value={profileData.education.university} />
                <DisplayField label="Graduation Year" value={profileData.education.graduationYear} />
                <DisplayField label="GPA" value={profileData.education.gpa} />
              </>
            )}
          </div>
          {editingCards.education && (
            <div className="edit-actions">
              <button
                onClick={() => saveChanges('education')}
                className="save-btn"
              >
                <Save className="btn-icon" />
                Save
              </button>
              <button
                onClick={() => cancelEditing('education')}
                className="cancel-btn"
              >
                <X className="btn-icon" />
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const FamilyCard = () => (
    <div className="employee-card">
      <CardHeader
        title="Family Information"
        icon={Users}
        cardName="family"
        isExpanded={expandedCards.family}
        isEditing={editingCards.family}
      />
      {expandedCards.family && (
        <div className="card-content">
          <div className="card-grid">
            {editingCards.family ? (
              <>
                <InputField
                  label="Father's Name"
                  value={tempData.fatherName || ''}
                  onChange={(value) => updateTempData('fatherName', value)}
                />
                <InputField
                  label="Mother's Name"
                  value={tempData.motherName || ''}
                  onChange={(value) => updateTempData('motherName', value)}
                />
                <InputField
                  label="Spouse's Name"
                  value={tempData.spouseName || ''}
                  onChange={(value) => updateTempData('spouseName', value)}
                />
                <InputField
                  label="Number of Children"
                  value={tempData.children || ''}
                  onChange={(value) => updateTempData('children', value)}
                  type="number"
                />
              </>
            ) : (
              <>
                <DisplayField label="Father's Name" value={profileData.family.fatherName} />
                <DisplayField label="Mother's Name" value={profileData.family.motherName} />
                <DisplayField label="Spouse's Name" value={profileData.family.spouseName} />
                <DisplayField label="Number of Children" value={profileData.family.children} />
              </>
            )}
          </div>
          {editingCards.family && (
            <div className="edit-actions">
              <button
                onClick={() => saveChanges('family')}
                className="save-btn"
              >
                <Save className="btn-icon" />
                Save
              </button>
              <button
                onClick={() => cancelEditing('family')}
                className="cancel-btn"
              >
                <X className="btn-icon" />
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const LeaveCard = () => (
    <div className="employee-card">
      <CardHeader
        title="Leave Balance"
        icon={Calendar}
        cardName="leave"
        isExpanded={expandedCards.leave}
        isEditing={editingCards.leave}
      />
      {expandedCards.leave && (
        <div className="card-content">
          <div className="leave-section">
            {Object.entries(profileData.leave).map(([leaveType, data]) => (
              <div key={leaveType} className="leave-type">
                <h4 className="leave-type-title">{leaveType} Leave</h4>
                <div className="leave-stats">
                  <div className="leave-stat">
                    <div className="leave-stat-label">Total</div>
                    <div className="leave-stat-value">{data.total}</div>
                  </div>
                  <div className="leave-stat">
                    <div className="leave-stat-label">Used</div>
                    <div className="leave-stat-value">{data.used}</div>
                  </div>
                  <div className="leave-stat">
                    <div className="leave-stat-label">Remaining</div>
                    <div className="leave-stat-value">{data.remaining}</div>
                  </div>
                </div>
                <div className="leave-progress-bar">
                  <div 
                    className="leave-progress-fill"
                    style={{ 
                      width: `${(data.used / data.total) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="employee-profile-container">
      <div className="employee-profile-wrapper">
        <div className="employee-profile-header">
          <h1 className="employee-profile-title">Employee Profile</h1>
          <p className="employee-profile-subtitle">
            Manage your personal information and view your details
          </p>
        </div>

        <div className="employee-profile-cards">
          <PersonalDetailsCard />
          <AddressCard />
          <EducationCard />
          <FamilyCard />
          <LeaveCard />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;