import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';


function WelcomeScreen() {
  const navigate = useNavigate();

  const handleChoice = (role) => {
    localStorage.setItem('firstTimeRole', role); // Save choice
    if(role == 'company'){
      navigate('/CreateCompany'); // Go to Create Company
    }
    else{
      navigate('/Login'); // Go to login if he is employee
    }
  };

  return (
    <div className="welcome-screen">
      <h2>Welcome! Choose your role:</h2>
      <button onClick={() => handleChoice('company')}>Create a Company</button>
      <button onClick={() => handleChoice('employee')}>Join as Employee</button>
    </div>
  );
}

export default WelcomeScreen;
