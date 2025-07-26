// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { handleCreateCompany } from '../../services/companyService';

// const initialState = {
//   company_code: '',
//   company_name: '',
//   company_legal_name: '',
//   company_logo_url: '',
//   company_website_url: '',
//   company_organization_type: 'CORPORATION',
//   company_industry_sector: '',
//   company_size_category: '1-10',
//   company_contact_number: '',
//   company_email: '',
//   company_primary_address: '',
//   company_billing_address: '',
//   company_tax_id: '',
//   company_registration_number: '',
//   company_timezone: '',
//   company_locale: '',
//   company_currency: '',
//   company_fiscal_year_start: 1,
//   subscription_tier: 'BASIC',
//   subscription_status: 'ACTIVE',
//   subscription_expires_at: new Date().toISOString(),
//   company_status: 'ACTIVE',
//   onboarding_completed: false,
// };

// const CreateCompany = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState(initialState);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await handleCreateCompany(form);
//       localStorage.setItem('firstTimeRole', 'company');
//       navigate('/login');
//     } catch (err) {
//       setError(err.message || 'Company creation failed');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Create Your Company</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input name="company_code" placeholder="Company Code" value={form.company_code} onChange={handleChange} required /><br />
//         <input name="company_name" placeholder="Company Name" value={form.company_name} onChange={handleChange} required /><br />
//         <input name="company_legal_name" placeholder="Legal Name" value={form.company_legal_name} onChange={handleChange} required /><br />
//         <input name="company_logo_url" placeholder="Logo URL" value={form.company_logo_url} onChange={handleChange} /><br />
//         <input name="company_website_url" placeholder="Website" value={form.company_website_url} onChange={handleChange} /><br />
//         <input name="company_industry_sector" placeholder="Industry Sector" value={form.company_industry_sector} onChange={handleChange} /><br />
//         <input name="company_size_category" placeholder="Size (e.g. 1-10)" value={form.company_size_category} onChange={handleChange} /><br />
//         <input name="company_contact_number" placeholder="Contact Number" value={form.company_contact_number} onChange={handleChange} /><br />
//         <input name="company_email" placeholder="Email" value={form.company_email} onChange={handleChange} /><br />
//         <input name="company_primary_address" placeholder="Primary Address" value={form.company_primary_address} onChange={handleChange} /><br />
//         <input name="company_billing_address" placeholder="Billing Address" value={form.company_billing_address} onChange={handleChange} /><br />
//         <input name="company_tax_id" placeholder="Tax ID" value={form.company_tax_id} onChange={handleChange} /><br />
//         <input name="company_registration_number" placeholder="Registration Number" value={form.company_registration_number} onChange={handleChange} /><br />
//         <input name="company_timezone" placeholder="Timezone" value={form.company_timezone} onChange={handleChange} /><br />
//         <input name="company_locale" placeholder="Locale (e.g. en-US)" value={form.company_locale} onChange={handleChange} /><br />
//         <input name="company_currency" placeholder="Currency (e.g. USD)" value={form.company_currency} onChange={handleChange} /><br />
//         <input name="company_fiscal_year_start" type="number" placeholder="Fiscal Year Start (Month Number)" value={form.company_fiscal_year_start} onChange={handleChange} /><br />
//         <label>
//           Onboarding Completed:
//           <input type="checkbox" name="onboarding_completed" checked={form.onboarding_completed} onChange={handleChange} />
//         </label><br />
//         <button type="submit">Create Company</button>
//       </form>
//     </div>
//   );
// };

// export default CreateCompany;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleCreateCompany } from '../../services/companyService';
import './CreateCompany.css';

const initialState = {
  company_code: '',
  company_name: '',
  company_legal_name: '',
  company_logo_url: '',
  company_website_url: '',
  company_organization_type: 'CORPORATION',
  company_industry_sector: '',
  company_size_category: '1-10',
  company_contact_number: '',
  company_email: '',
  company_primary_address: '',
  company_billing_address: '',
  company_tax_id: '',
  company_registration_number: '',
  company_timezone: '',
  company_locale: '',
  company_currency: '',
  company_fiscal_year_start: 1,
  subscription_tier: 'BASIC',
  subscription_status: 'ACTIVE',
  subscription_expires_at: new Date().toISOString(),
  company_status: 'ACTIVE',
  onboarding_completed: false,
};

const CreateCompany = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await handleCreateCompany(form);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Company creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-company-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1 className="form-title">Create Your Company</h1>
          <p className="form-subtitle">Set up your business profile to get started</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="company-form">
          {/* Basic Information Section */}
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="company_code" className="form-label">Company Code *</label>
                <input
                  id="company_code"
                  name="company_code"
                  type="text"
                  className="form-input"
                  placeholder="Enter company code"
                  value={form.company_code}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company_name" className="form-label">Company Name *</label>
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  className="form-input"
                  placeholder="Enter company name"
                  value={form.company_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="company_legal_name" className="form-label">Legal Name *</label>
                <input
                  id="company_legal_name"
                  name="company_legal_name"
                  type="text"
                  className="form-input"
                  placeholder="Enter legal company name"
                  value={form.company_legal_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company_logo_url" className="form-label">Logo URL</label>
                <input
                  id="company_logo_url"
                  name="company_logo_url"
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/logo.png"
                  value={form.company_logo_url}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="company_website_url" className="form-label">Website URL</label>
                <input
                  id="company_website_url"
                  name="company_website_url"
                  type="url"
                  className="form-input"
                  placeholder="https://example.com"
                  value={form.company_website_url}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Company Details Section */}
          <div className="form-section">
            <h2 className="section-title">Company Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="company_organization_type" className="form-label">Organization Type</label>
                <select
                  id="company_organization_type"
                  name="company_organization_type"
                  className="form-select"
                  value={form.company_organization_type}
                  onChange={handleChange}
                >
                  <option value="CORPORATION">Corporation</option>
                  <option value="LLC">LLC</option>
                  <option value="PARTNERSHIP">Partnership</option>
                  <option value="SOLE_PROPRIETORSHIP">Sole Proprietorship</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="company_industry_sector" className="form-label">Industry Sector</label>
                <input
                  id="company_industry_sector"
                  name="company_industry_sector"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Technology, Healthcare"
                  value={form.company_industry_sector}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="company_size_category" className="form-label">Company Size</label>
                <select
                  id="company_size_category"
                  name="company_size_category"
                  className="form-select"
                  value={form.company_size_category}
                  onChange={handleChange}
                >
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="company_contact_number" className="form-label">Contact Number</label>
                <input
                  id="company_contact_number"
                  name="company_contact_number"
                  type="tel"
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                  value={form.company_contact_number}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="company_email" className="form-label">Company Email</label>
                <input
                  id="company_email"
                  name="company_email"
                  type="email"
                  className="form-input"
                  placeholder="contact@company.com"
                  value={form.company_email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="form-section">
            <h2 className="section-title">Address Information</h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="company_primary_address" className="form-label">Primary Address</label>
                <textarea
                  id="company_primary_address"
                  name="company_primary_address"
                  className="form-textarea"
                  placeholder="Enter primary business address"
                  value={form.company_primary_address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="company_billing_address" className="form-label">Billing Address</label>
                <textarea
                  id="company_billing_address"
                  name="company_billing_address"
                  className="form-textarea"
                  placeholder="Enter billing address (leave blank if same as primary)"
                  value={form.company_billing_address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Legal & Financial Section */}
          <div className="form-section">
            <h2 className="section-title">Legal & Financial</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="company_tax_id" className="form-label">Tax ID</label>
                <input
                  id="company_tax_id"
                  name="company_tax_id"
                  type="text"
                  className="form-input"
                  placeholder="XX-XXXXXXX"
                  value={form.company_tax_id}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="company_registration_number" className="form-label">Registration Number</label>
                <input
                  id="company_registration_number"
                  name="company_registration_number"
                  type="text"
                  className="form-input"
                  placeholder="Enter registration number"
                  value={form.company_registration_number}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="company_currency" className="form-label">Currency</label>
                <select
                  id="company_currency"
                  name="company_currency"
                  className="form-select"
                  value={form.company_currency}
                  onChange={handleChange}
                >
                  <option value="">Select Currency</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="company_fiscal_year_start" className="form-label">Fiscal Year Start Month</label>
                <select
                  id="company_fiscal_year_start"
                  name="company_fiscal_year_start"
                  className="form-select"
                  value={form.company_fiscal_year_start}
                  onChange={handleChange}
                >
                  <option value={1}>January</option>
                  <option value={2}>February</option>
                  <option value={3}>March</option>
                  <option value={4}>April</option>
                  <option value={5}>May</option>
                  <option value={6}>June</option>
                  <option value={7}>July</option>
                  <option value={8}>August</option>
                  <option value={9}>September</option>
                  <option value={10}>October</option>
                  <option value={11}>November</option>
                  <option value={12}>December</option>
                </select>
              </div>
            </div>
          </div>

          {/* Localization Section */}
          <div className="form-section">
            <h2 className="section-title">Localization</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="company_timezone" className="form-label">Timezone</label>
                <select
                  id="company_timezone"
                  name="company_timezone"
                  className="form-select"
                  value={form.company_timezone}
                  onChange={handleChange}
                >
                  <option value="">Select Timezone</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Asia/Kolkata">India (IST)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="company_locale" className="form-label">Locale</label>
                <select
                  id="company_locale"
                  name="company_locale"
                  className="form-select"
                  value={form.company_locale}
                  onChange={handleChange}
                >
                  <option value="">Select Locale</option>
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="en-IN">English (India)</option>
                  <option value="es-ES">Spanish</option>
                  <option value="fr-FR">French</option>
                  <option value="de-DE">German</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="form-section">
            <h2 className="section-title">Preferences</h2>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="onboarding_completed"
                  checked={form.onboarding_completed}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Mark onboarding as completed</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating...
                </>
              ) : (
                'Create Company'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;