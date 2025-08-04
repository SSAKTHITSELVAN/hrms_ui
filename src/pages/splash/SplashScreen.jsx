import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import splashImage from '../../assets/images/Pinesphere.jpeg';
import './SplashScreen.css';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const userChoice = localStorage.getItem('firstTimeRole');
      if (!userChoice) {
        // First time → show welcome screen
        navigate('/welcome');
      } else {
        // Already chosen → go to login
        navigate('/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <img 
        src={splashImage}
        alt="App Logo"
        className="splash-logo"
      />
    </div>
  );
};

export default Splash;
