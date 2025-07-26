import React, { useState, useEffect } from 'react';
import MobileDashboardLayout from '../layouts/MobileDashboardLayout';
import LaptopDashboardLayout from '../layouts/LaptopDashboardLayout';

// Custom hook to track window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Set initial size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Responsive Dashboard Wrapper Component
const ResponsiveDashboardLayout = ({ children }) => {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  // Define breakpoint for mobile vs laptop
  const MOBILE_BREAKPOINT = 768;

  useEffect(() => {
    if (width !== undefined) {
      setIsMobile(width <= MOBILE_BREAKPOINT);
    }
  }, [width]);

  // Show loading state while determining screen size
  if (width === undefined) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.125rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  // Render appropriate layout based on screen size
  return isMobile ? (
    <MobileDashboardLayout>{children}</MobileDashboardLayout>
  ) : (
    <LaptopDashboardLayout>{children}</LaptopDashboardLayout>
  );
};

// Alternative Hook-based approach (export both for flexibility)
export const useResponsiveLayout = () => {
  const { width } = useWindowSize();
  const MOBILE_BREAKPOINT = 768;
  
  return {
    isMobile: width ? width <= MOBILE_BREAKPOINT : false,
    isLaptop: width ? width > MOBILE_BREAKPOINT : false,
    width,
    screenSize: width ? (width <= MOBILE_BREAKPOINT ? 'mobile' : 'laptop') : 'unknown'
  };
};

// Demo Dashboard Component for testing
const Dashboard = () => {
  const { screenSize } = useResponsiveLayout();
  
  return (
    <div>
      <h1>Hello 👋 Welcome to your HRMS Dashboard</h1>
      <p>This is your dashboard page visible inside the layout.</p>
      <p style={{ 
        padding: '0.5rem', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#666',
        marginTop: '1rem'
      }}>
        Current Layout: <strong>{screenSize}</strong>
      </p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Dashboard Overview</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
          <div style={{ 
            padding: '1rem', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#333' }}>Total Employees</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#000' }}>156</p>
          </div>
          <div style={{ 
            padding: '1rem', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#333' }}>Present Today</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#000' }}>142</p>
          </div>
          <div style={{ 
            padding: '1rem', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#333' }}>On Leave</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#000' }}>8</p>
          </div>
          <div style={{ 
            padding: '1rem', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#333' }}>Pending Approvals</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#000' }}>3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example App Component showing usage
const App = () => {
  return (
    <ResponsiveDashboardLayout>
      <Dashboard />
    </ResponsiveDashboardLayout>
  );
};

// Export the custom hook and components
export { useWindowSize };
export default ResponsiveDashboardLayout;
export { App };