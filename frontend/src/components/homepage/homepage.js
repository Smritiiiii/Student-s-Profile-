import React from "react";
import "./homepage.css";
import BackgroundImage from "./university.jpg"
import {  useNavigate } from 'react-router-dom';

function HomePage(){
    const navigate = useNavigate();

    const handleLoginClick = () => {

        navigate('/login')
    }

  return (
    <div className="homepage">

    <img
      src={BackgroundImage}
      alt="Blurred Background"
      className="background-image"
    />
    <div className="content">
      <h1>Welcome!</h1>
      <p>This app contains records of students. </p>

      {/* Login button that navigates to the "/login" route */}
      <button  className ="homepage-button "onClick={handleLoginClick}>Get Started </button>
    </div>
  </div>
);
}

export default HomePage;
