// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Get user data from localStorage with fallback
  const getUserData = () => {
    try {
      return JSON.parse(localStorage.getItem('user_data') || '{}');
    } catch {
      return {};
    }
  };

  const getRoleData = () => {
    try {
      return JSON.parse(localStorage.getItem('role_data') || '{}');
    } catch {
      return {};
    }
  };

  const userData = getUserData();
  const roleData = getRoleData();
  
  // Header data with fallbacks
  const headerData = {
    companyName: "TechCorp Solutions",
    currentDate: currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    currentTime: currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    userName: userData?.name || userData?.full_name || "John Doe",
    userRole: roleData?.data?.role_name || "Employee",
    department: userData?.department || "IT Department",
    employeeId: userData?.employee_id || "EMP001",
    totalEmployees: 156,
    activeProjects: 23,
    pendingTasks: 8
  };

  return (
    <div className="header-container">
      {/* Main Header Section */}
      <div className="header-main">
        <div className="header-left">
          <div className="company-info">
            <h1 className="company-name">{headerData.companyName}</h1>
            <p className="date-time">
              {headerData.currentDate} • {headerData.currentTime}
            </p>
          </div>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              {headerData.userName.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h3 className="user-name">{headerData.userName}</h3>
              <p className="user-meta">
                {headerData.userRole} • {headerData.employeeId}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;