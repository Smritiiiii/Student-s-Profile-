// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
// import Login from "./components/login/login";
// import UserInfo from "./components/UserInfo";
// import Dashboard from "./components/dashboard";

// import MarksChart from "./components/ProgressReport/report";
// import Achievements from "./components/achievements/achievements";
// import HomePage from "./components/homepage/homepage";
// import AdminDashboard from "./components/adminDashboard";
// import AdminInfo from "./components/admininfo";
// import StudentForm from "./components/studentForm";
// import { useAuth } from "./components/AuthContext";
// import ChatBox from "./components/chatsystem/ChatBox";

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
//       <div className='App'>
//         <Routes>
//           <Route path='/' element={<HomePage />} />

//           {/* Define routes for authenticated content */}
//           <Route path='/login' element={<Login updateToken={updateToken} updateEmail={updateEmail} updatePhoto={updatePhoto} updateRole={updateRole} />} />
//           <Route path='/user' element={<UserInfo token={token} email={email} photoData={photoData} />} />
//           <Route path='/chatbox' element={<ChatBox />} />
//           <Route path='/marks' element={<MarksChart token={token} />} />
//           <Route
//             path='/dashboard/*'
//             element={
//               token ? (
//                 role === "admin" ? (
//                   <AdminDashboard>
//                     <Link to='/admininfo'>Admin Info</Link> 
//                     <Link to='/Chatbox'>Chat System</Link> 
//                     <Link to='/StudentForm'>Student Form</Link> 
                   
//                   </AdminDashboard>
//                 ) : (
//                   <Dashboard>
//                     <Link to='/Chatbox'>Chat System</Link>
//                     <Link to='/achievements'>View Achievements</Link>
//                     <Link to='/progressreport'>View Progress Report</Link>
//                   </Dashboard>
//                 )
//               ) : (
//                 <Navigate to='/login' />
//               )
//             }
//           />
//           <Route path='/dashboard/Chatbox' element={<ChatBox />} />
//           <Route path='/dashboard/achievements' element={<Achievements />} />
//           <Route path='/dashboard/progressreport' element={<MarksChart token={token} />} />
//           <Route path='/admininfo' element={role === "admin" ? <AdminInfo token={token} email={email} photoData={photoData} /> : <Navigate to='/dashboard/*' />} />
//           <Route path='/admindashboard/*' element={<AdminDashboard />} />
//           <Route path='/admindashboard/Chatbox' element={<ChatBox />} />
//           <Route path='/admindashboard/StudentForm' element={<StudentForm />} />

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
import MarksChart from "./components/ProgressReport/report";
import Achievements from "./components/achievements/achievements";
import HomePage from "./components/homepage/homepage";
import AdminDashboard from "./components/adminDashboard";
import AdminInfo from "./components/admininfo";
import { useAuth } from "./components/AuthContext";
import ChatBox from "./components/chatsystem/ChatBox";
import StudentForm from "./components/studentForm"; // Update import

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
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />} />

          {/* Define routes for authenticated content */}
          <Route path='/login' element={<Login updateToken={updateToken} updateEmail={updateEmail} updatePhoto={updatePhoto} updateRole={updateRole} />} />
          <Route path='/user' element={<UserInfo token={token} email={email} photoData={photoData} />} />
          <Route path='/chatbox' element={<ChatBox />} />
          <Route path='/marks' element={<MarksChart token={token} />} />
          <Route
            path='/dashboard/*'
            element={
              token ? (
                role === "admin" ? (
                  <AdminDashboard>
                    <Link to='/admininfo'>Admin Info</Link>
                    <Link to='/chatbox'>Chat System</Link> {/* Update the link */}
                    <Link to='/studentform'>Student Form</Link> {/* Update the link */}
                  </AdminDashboard>
                ) : (
                  <Dashboard>
                    <Link to='/chatbox'>Chat System</Link>
                    <Link to='/achievements'>View Achievements</Link>
                    <Link to='/progressreport'>View Progress Report</Link>
                  </Dashboard>
                )
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route path='/dashboard/chatbox' element={<ChatBox />} /> {/* Update the path */}
          <Route path='/dashboard/achievements' element={<Achievements />} />
          <Route path='/dashboard/progressreport' element={<MarksChart token={token} />} />
          <Route path='/admininfo' element={role === "admin" ? <AdminInfo token={token} email={email} photoData={photoData} /> : <Navigate to='/dashboard/*' />} />
          <Route path='/admindashboard/*' element={<AdminDashboard />} />
          <Route path='/admindashboard/chatbox' element={<ChatBox />} /> {/* Update the path */}
          <Route path='/admindashboard/studentform' element={<StudentForm />} /> {/* Update the path */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
