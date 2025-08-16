import React from 'react';
import { FaUser, FaBuilding, FaChartLine, FaCalendarCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import './Dashboard.css';

const Dashboard = () => {
  // Use useSelector to get user and company data from the Redux store
  const userData = useSelector(state => state.auth.userData) || { full_name: 'Employee', job_role: 'User' };
  const companyData = useSelector(state => state.auth.companyData) || { company_name: 'Your Company' };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-banner">
          <h1 className="welcome-title">Welcome Back, {userData.full_name || 'Employee'}! 👋</h1>
          <p className="welcome-subtitle">Here's an overview of your activity at {companyData.company_name || 'Your Company'}.</p>
        </div>
      </div>
      
      <div className="dashboard-grid">
        {/* Placeholder Card 1 */}
        <div className="dashboard-card">
          <div className="card-icon-wrapper">
            <FaUser className="card-icon" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Profile Status</h3>
            <p className="card-value">100% Complete</p>
          </div>
        </div>

        {/* Placeholder Card 2 */}
        <div className="dashboard-card">
          <div className="card-icon-wrapper">
            <FaCalendarCheck className="card-icon" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Today's Attendance</h3>
            <p className="card-value">Clocked in at 9:00 AM</p>
          </div>
        </div>

        {/* Placeholder Card 3 */}
        <div className="dashboard-card">
          <div className="card-icon-wrapper">
            <FaChartLine className="card-icon" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Performance Score</h3>
            <p className="card-value">Excellent</p>
          </div>
        </div>

        {/* Placeholder Card 4 */}
        <div className="dashboard-card">
          <div className="card-icon-wrapper">
            <FaBuilding className="card-icon" />
          </div>
          <div className="card-info">
            <h3 className="card-title">Department</h3>
            <p className="card-value">{userData.job_role || 'Not Assigned'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;