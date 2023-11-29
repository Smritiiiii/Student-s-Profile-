import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from  "../AuthContext"

const Login = ({ updateToken, updateEmail, updatePhoto }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("student"); 

  const navigate = useNavigate();
  const { updateIsAdmin } = useAuth ();

  const handleLogin = async (e) => {
    e.preventDefault();
 
  
     
    const loginUrl = selectedRole === "admin" ? "http://localhost:9002/api/login" : "http://localhost:9002/auth/login";

    try {

      


      const response = await axios.post(loginUrl, {
        email,
        password,
        role: selectedRole, 
      });



      if (response.status === 200) {
        const data = response.data;

        const isAdmin = selectedRole === "admin";
        


        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userPhoto", data.user.photo || "");

        updateToken(data.token);
        updateEmail(data.user.email);
        updatePhoto(data.user.photo || "");
      
       


        if (selectedRole === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
   
 


  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);

    // Change the background image based on the selected role
    const loginMain = document.querySelector(".login-main");
    if (e.target.value === "admin") {
      loginMain.classList.add("admin");
    loginMain.classList.remove("student");
    updateIsAdmin(true); 
  } else {
    loginMain.classList.add("student");
    loginMain.classList.remove("admin");
    updateIsAdmin(false); 
  }
};
            
  return (
    <div className="login-main">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div>
            <label htmlFor="role">Select your role:</label>
            <select
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
  

export default Login;

