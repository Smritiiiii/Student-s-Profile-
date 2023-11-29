// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
// import Login from "./components/login/login";
// import UserInfo from "./components/UserInfo";
// import Dashboard from "./components/dashboard";
// import ChatSystem from "./components/chatsystem/script";
// import MarksChart from "./components/ProgressReport/report";
// import Achievements from "./components/achievements/achievements";
// import HomePage from "./components/homepage/homepage";
// import AdminDashboard from "./components/adminDashboard";
// import AdminInfo from "./components/admininfo";
// import StudentForm from "./components/studentForm";
// import { useAuth } from "./components/AuthContext";

// function App() {
//   const { token, setToken, email, setEmail, photoData, setPhoto, role, setRole } = useAuth();

//   const updateToken = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("userToken", newToken);
//   };

//   const updateEmail = (newEmail) => {
//     setEmail(newEmail);
//     localStorage.setItem("userEmail", newEmail);
//   };

//   const updatePhoto = (newPhoto) => {
//     setPhoto(newPhoto);
//     localStorage.setItem("userPhoto", newPhoto);
//   };

//   const updateRole = (newRole) => {
//     setRole(newRole);
//     localStorage.setItem("userRole", newRole);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<HomePage />} />

//           {/* Define routes for authenticated content */}
//           <Route
//             path="/login"
//             element={
//               <Login
//                 updateToken={updateToken}
//                 updateEmail={updateEmail}
//                 updatePhoto={updatePhoto}
//                 updateRole={updateRole}
//               />
//             }
//           />
//           <Route
//             path="/user"
//             element={<UserInfo token={token} email={email} photoData={photoData} />}
//           />
//           <Route
//             path="/marks"
//             element={<MarksChart token={token} />}
//           />
//           <Route
//             path="/dashboard/*"
//             element={
//               token && role === "student" ? (
//                 <Dashboard>
//                   <Link to="/dashboard/ChatSystem">Chat System</Link>
//                   <Link to="/dashboard/achievements">View Achievements</Link>
//                   <Link to="/dashboard/progressreport">View Progress Report</Link>
//                 </Dashboard>
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/admindashboard/*"
//             element={
//               token && role === "admin" ? (
//                 <AdminDashboard>
//                   <Link to="/admindashboard/form">Form</Link>
//                   <Link to="/admindashboard/ChatSystem">Chat System</Link>
//                 </AdminDashboard>
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           {/* Other routes */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;




import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Login from "./components/login/login";
import UserInfo from "./components/UserInfo";
import Dashboard from "./components/dashboard";
import ChatSystem from "./components/chatsystem/script";
import MarksChart from "./components/ProgressReport/report";
import Achievements from "./components/achievements/achievements";
import HomePage from "./components/homepage/homepage";
import AdminDashboard from "./components/adminDashboard";
import AdminInfo from "./components/admininfo";
import StudentForm from "./components/studentForm"
import { useAuth } from "./components/AuthContext";

function App() {
  const { token, setToken, email, setEmail, photoData, setPhoto, role, setRole } = useAuth();

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("userToken", newToken);
  };

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
    localStorage.setItem("userEmail", newEmail);
  };

  const updatePhoto = (newPhoto) => {
    setPhoto(newPhoto);
    localStorage.setItem("userPhoto", newPhoto);
  };

  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/" element={<HomePage />} />

          {/* Define routes for authenticated content */}
          <Route
            path="/login"
            element={
              <Login
                updateToken={updateToken}
                updateEmail={updateEmail}
                updatePhoto={updatePhoto}
                updateRole={updateRole}
              />
            }
          />
          <Route
            path="/user"
            element={<UserInfo token={token} email={email} photoData={photoData} />}
          />
          <Route
            path="/marks"
            element={<MarksChart token={token} />}
          />
          <Route
            path="/dashboard/*"
            element={
              token ? (
                role === "admin" ? (
                  <AdminDashboard>
                    <Link to="/admininfo">Admin Info</Link> {/* Include the Admin Info link */}
                  </AdminDashboard>
                ) : (
                  <Dashboard>
                    <Link to="/ChatSystem">Chat System</Link>
                    <Link to="/achievements">View Achievements</Link>
                    <Link to="/progressreport">View Progress Report</Link>
                  </Dashboard>
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard/ChatSystem"
            element={<ChatSystem />}
          />
          <Route
            path="/dashboard/achievements"
            element={<Achievements />}
          />
          <Route
            path="/dashboard/progressreport"
            element={<MarksChart token={token} />}
          />
          <Route
            path="/admininfo"
            element={
              role === "admin" ? (
                <AdminInfo token={token} email={email} photoData={photoData} />
              ) : (
                <Navigate to="/dashboard/*" />
              )
            }
          />
          <Route path="/admindashboard/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
 

export default App;

