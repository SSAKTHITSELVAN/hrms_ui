import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';


function WelcomeScreen() {
  const navigate = useNavigate();

  const handleChoice = (role) => {
    localStorage.setItem('firstTimeRole', role);
    if(role == 'company'){
      navigate('/CreateCompany');
    }
    else{
      navigate('/Login');
    }
  };

  return (
    <div className="welcome-screen">
      <div className="content-container">
        <h2>Welcome to Our Platform</h2>
        <p>Choose your role to get started and unlock a new way of working.</p>
        <div className="button-group">
          <button 
            className="role-button company-button" 
            onClick={() => handleChoice('company')}
          >
            Create a Company
          </button>
          <button 
            className="role-button employee-button" 
            onClick={() => handleChoice('employee')}
          >
            Join as Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;