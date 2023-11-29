import React from 'react';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
  const navigate = useNavigate();
  

  const handleLogout = () => {

    // Remove token from localStorage
    
    localStorage.removeItem('token');
    localStorage.removeItem('email');


    // Redirect to the login page
    navigate('/login');
  };
  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#007bff", 
        color: "#ffffff", 
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "16px",
        
      }}
    >
      Logout
    </button>
  );
  
  
};

export default LogoutButton;
