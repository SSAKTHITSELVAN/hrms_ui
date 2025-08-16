import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/thunks/authThunk';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ employee_code: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token, hasPersonalDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate(hasPersonalDetails ? '/dashboard' : '/personal-details', { replace: true });
    }
  }, [token, hasPersonalDetails, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        <p className="login-subtitle">Access your employee portal</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="employee_code" className="form-label">Employee Code</label>
            <input
              id="employee_code"
              name="employee_code"
              type="text"
              placeholder="Enter your employee code"
              value={formData.employee_code}
              onChange={handleChange}
              className="form-input"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;