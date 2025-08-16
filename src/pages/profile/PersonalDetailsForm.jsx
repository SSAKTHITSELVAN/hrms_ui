import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserPlus, FaSpinner } from "react-icons/fa";
import { createPersonalDetails } from "../../services/personalDetailsService";
import { setHasPersonalDetails } from '../../store/reducers/authReducer';
import "./PersonalDetailsForm.css";

const PersonalDetailsForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "male",
    date_of_birth: "",
    marital_status: "single",
    nationality: "",
    blood_group: "A+",
    personal_contact_number: "",
    personal_email: "",
    job_role: "",
    permanent_address: "",
    current_address: "",
    emergency_contact_person: "",
    emergency_contact_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await createPersonalDetails(formData);
      dispatch(setHasPersonalDetails());
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to save personal details");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="personal-details-container">
      <div className="personal-details-card">
        <h2 className="personal-details-title">Complete Your Profile</h2>
        <p className="personal-details-subtitle">
          Please provide your personal details to complete your profile.
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="personal-details-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Middle Name</label>
              <input
                type="text"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="form-input form-select"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth *</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Marital Status *</label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                required
                className="form-input form-select"
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Nationality *</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Blood Group *</label>
              <select
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                required
                className="form-input form-select"
              >
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
              <label className="form-label">Personal Contact Number *</label>
              <input
                type="tel"
                name="personal_contact_number"
                value={formData.personal_contact_number}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="form-input"
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Personal Email *</label>
              <input
                type="email"
                name="personal_email"
                value={formData.personal_email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Job Role</label>
              <input
                type="text"
                name="job_role"
                value={formData.job_role}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Permanent Address *</label>
              <input
                type="text"
                name="permanent_address"
                value={formData.permanent_address}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Current Address *</label>
              <input
                type="text"
                name="current_address"
                value={formData.current_address}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Emergency Contact Person *</label>
              <input
                type="text"
                name="emergency_contact_person"
                value={formData.emergency_contact_person}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Emergency Contact Number *</label>
              <input
                type="tel"
                name="emergency_contact_number"
                value={formData.emergency_contact_number}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="form-input"
              />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? (
              <>
                <FaSpinner className="btn-icon loading-spinner" /> Saving...
              </>
            ) : (
              <>
                <FaUserPlus className="btn-icon" /> Complete Profile & Continue
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;