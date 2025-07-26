import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp, Edit2, Save, X, MapPin } from 'lucide-react';
import { handleGetMyAddress, handleSaveAddress, organizeAddressByType } from '../services/addressService';

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

const AddressCard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [editingType, setEditingType] = useState(null); // 'permanent', 'current', 'work', or null
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [addressData, setAddressData] = useState({
    permanent: null,
    current: null,
    work: null
  });

  const [tempData, setTempData] = useState({});

  // Helper function to get employee ID (you might need to implement this based on your auth system)
  const getEmployeeId = () => {
    // This is a placeholder - you should implement this to get the actual employee ID
    // from your authentication context, local storage, or user state
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return parsed.employee_id || parsed.id || "string";
      } catch (e) {
        console.warn('Could not parse user data from localStorage');
      }
    }
    return "string"; // Fallback - you should replace this with actual employee ID logic
  };

  // Fetch address details on component mount
  useEffect(() => {
    fetchAddressDetails();
  }, []);

  const fetchAddressDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await handleGetMyAddress();
      
      if (response) {
        // Organize the address array by type
        const organizedAddresses = organizeAddressByType(response);
        setAddressData(organizedAddresses);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch address details');
      console.error('Error fetching address details:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && !addressData.permanent && !addressData.current) {
      fetchAddressDetails();
    }
  };

  const startEditing = (addressType) => {
    const currentAddress = addressData[addressType];
    setTempData({
      employee_id: getEmployeeId(), // Add employee_id for create operations
      address_type: addressType,
      address_line1: currentAddress?.address_line1 || '',
      address_line2: currentAddress?.address_line2 || '',
      city: currentAddress?.city || '',
      state: currentAddress?.state || '',
      postal_code: currentAddress?.postal_code || '',
      country: currentAddress?.country || '',
      is_current: currentAddress?.is_current || false
    });
    setEditingType(addressType);
    setError(null);
  };

  const saveChanges = async () => {
    try {
      setSaving(true);
      setError(null);

      // Validate required fields
      if (!tempData.address_line1 || !tempData.city) {
        throw new Error('Address Line 1 and City are required fields');
      }

      console.log('Saving address with tempData:', tempData);

      // Use the new handleSaveAddress service which includes check-create-update logic
      const response = await handleSaveAddress(editingType, tempData);
      
      console.log('Save response:', response);

      if (response) {
        setEditingType(null);
        setTempData({});
        // Add a small delay before refreshing to ensure backend has processed the update
        setTimeout(async () => {
          await fetchAddressDetails(); // Refresh the data
        }, 500);
      } else {
        throw new Error('Save operation failed - no response received');
      }
    } catch (err) {
      console.error(`Error saving ${editingType} address:`, err);
      setError(err.message || `Failed to save ${editingType} address`);
    } finally {
      setSaving(false);
    }
  };

  const cancelEditing = () => {
    setEditingType(null);
    setTempData({});
    setError(null);
  };

  // Create individual change handlers with validation
  const handleAddressLine1Change = useCallback((value) => {
    setTempData(prev => ({ ...prev, address_line1: value }));
    if (error && value.trim()) {
      setError(null); // Clear error when user starts typing
    }
  }, [error]);

  const handleAddressLine2Change = useCallback((value) => {
    setTempData(prev => ({ ...prev, address_line2: value }));
  }, []);

  const handleCityChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, city: value }));
    if (error && value.trim()) {
      setError(null); // Clear error when user starts typing
    }
  }, [error]);

  const handleStateChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, state: value }));
  }, []);

  const handlePostalCodeChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, postal_code: value }));
  }, []);

  const handleCountryChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, country: value }));
  }, []);

  const handleIsCurrentChange = useCallback((value) => {
    setTempData(prev => ({ ...prev, is_current: value === 'true' }));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingType && tempData.address_line1?.trim() && tempData.city?.trim()) {
      saveChanges();
    } else {
      setError('Please fill in all required fields (Address Line 1 and City)');
    }
  };

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editingType && tempData.address_line1?.trim() && tempData.city?.trim()) {
        saveChanges();
      } else {
        setError('Please fill in all required fields (Address Line 1 and City)');
      }
    }
  }, [editingType, tempData.address_line1, tempData.city]);

  // Memoize options
  const isCurrentOptions = useMemo(() => [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' }
  ], []);

  const formatAddress = (address) => {
    if (!address) return 'Not specified';
    
    const parts = [
      address.address_line1,
      address.address_line2,
      address.city,
      address.state,
      address.postal_code,
      address.country
    ].filter(part => part && part.trim() !== '');
    
    return parts.length > 0 ? parts.join(', ') : 'Not specified';
  };

  const getAddressTypeLabel = (type) => {
    const labels = {
      permanent: 'Permanent Address',
      current: 'Current Address',
      work: 'Work Address'
    };
    return labels[type] || type;
  };

  const CardHeader = () => (
    <div className="card-header">
      <div className="card-header-left">
        <MapPin className="card-icon" />
        <h3 className="card-title">Address Information</h3>
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
              <p className="field-value">Loading address details...</p>
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
              fontSize: '0.875rem', 
              marginBottom: '1rem',
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              borderRadius: '0.375rem',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleFormSubmit}>
            {['permanent', 'current', 'work'].map(addressType => (
              <div key={addressType} className="address-section" style={{ marginBottom: '1.5rem' }}>
                <div className="address-section-header" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <h4 className="address-section-title" style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600',
                    color: '#374151',
                    margin: 0
                  }}>
                    {getAddressTypeLabel(addressType)}
                  </h4>
                  {editingType !== addressType && (
                    <button
                      onClick={() => startEditing(addressType)}
                      className="card-action-btn"
                      disabled={loading || editingType !== null}
                      type="button"
                      style={{ fontSize: '0.875rem' }}
                    >
                      <Edit2 className="card-action-icon" style={{ width: '14px', height: '14px' }} />
                    </button>
                  )}
                </div>

                <div className="card-grid">
                  {editingType === addressType ? (
                    <>
                      <InputField
                        label="Address Line 1 *"
                        value={tempData.address_line1 || ''}
                        onChange={handleAddressLine1Change}
                        onKeyPress={handleKeyPress}
                        fullWidth
                      />
                      <InputField
                        label="Address Line 2"
                        value={tempData.address_line2 || ''}
                        onChange={handleAddressLine2Change}
                        onKeyPress={handleKeyPress}
                        fullWidth
                      />
                      <InputField
                        label="City *"
                        value={tempData.city || ''}
                        onChange={handleCityChange}
                        onKeyPress={handleKeyPress}
                      />
                      <InputField
                        label="State"
                        value={tempData.state || ''}
                        onChange={handleStateChange}
                        onKeyPress={handleKeyPress}
                      />
                      <InputField
                        label="Postal Code"
                        value={tempData.postal_code || ''}
                        onChange={handlePostalCodeChange}
                        onKeyPress={handleKeyPress}
                      />
                      <InputField
                        label="Country"
                        value={tempData.country || ''}
                        onChange={handleCountryChange}
                        onKeyPress={handleKeyPress}
                      />
                      <InputField
                        label="Is Current Address"
                        value={tempData.is_current ? 'true' : 'false'}
                        onChange={handleIsCurrentChange}
                        options={isCurrentOptions}
                        onKeyPress={handleKeyPress}
                      />
                    </>
                  ) : (
                    <>
                      <DisplayField 
                        label="Full Address" 
                        value={formatAddress(addressData[addressType])} 
                        fullWidth 
                      />
                      <DisplayField 
                        label="Is Current Address" 
                        value={addressData[addressType]?.is_current ? 'Yes' : 'No'} 
                      />
                    </>
                  )}
                </div>

                {editingType === addressType && (
                  <div className="edit-actions">
                    <button
                      type="submit"
                      className="save-btn"
                      disabled={saving || !tempData.address_line1?.trim() || !tempData.city?.trim()}
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
              </div>
            ))}
          </form>
        </div>
      )}
    </div>
  );
};

export default AddressCard;