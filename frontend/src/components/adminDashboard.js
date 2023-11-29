
import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import LogoutButton from "./logout/logout";
import { useAuth } from "./AuthContext";
import StudentForm from "./studentForm"; 
import ChatSystem from "./chatsystem/script";

const AdminDashboard = () => {
  const { token, email } = useAuth();
  const [adminInfo, setAdminInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const navigate = useNavigate();

  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        console.log("Fetching admin info...");
        if (token && isAdmin && email) {
          const response = await fetch(`http://localhost:9002/data?email=${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            const adminData = await response.json();
            console.log("Admin data:", adminData);
            setAdminInfo(adminData);
            setSelectedPhoto(adminData.photo);
          } else {
            console.error('Failed to fetch admin information. Status:', response.status);
          }

          setIsLoading(false);
        } else {
          console.error('Failed to fetch admin information. Token, isAdmin, or email is missing.');
        }
      } catch (error) {
        console.error('Fetch admin info error:', error);
      }
    };

    if (token && isAdmin && email) {
      fetchAdminInfo();
    }
  }, [token, isAdmin, email, navigate]);

  const saveStudentInfo = async (studentData) => {
    try {
      console.log("Saving student info...", studentData);
      const response = await fetch('http://localhost:9002/saveStudentInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(studentData),
      });
      if (response.status === 200) {
        console.log('Student information saved successfully');
      } else {
        console.error('Failed to save student information. Status:', response.status);
      }
    } catch (error) {
      console.error('Save student info error:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/admindashboard/ChatSystem" className="nav-link">
                  Chat System
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admindashboard/form" className="nav-link">
                  Form
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Admin Dashboard</h1>
            <LogoutButton />
          </div>

          {isLoading ? (
            <p>Loading admin data...</p>
          ) : (
            <div>
              <div>
                {selectedPhoto !== null ? (
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${selectedPhoto}`}
                      alt="Admin"
                      style={{ maxWidth: '200px', borderRadius: '50%' }}
                    />
                  </div>
                ) : (
                  <div>
                    {/* You can add an input for changing the photo here if needed */}
                  </div>
                )}

                <div className="mt-4">
                  {adminInfo ? (
                    <>
                      <p><strong>Name:</strong> {adminInfo.name}</p>
                      <p><strong>Email:</strong> {adminInfo.email}</p>
                      <p><strong>Admin Id:</strong> {adminInfo.adminId}</p>
                      <p><strong>Faculty:</strong> {adminInfo.faculty}</p>
                    </>
                  ) : (
                    <p>Admin information not available.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <Routes>
            <Route path="/admindashboard/ChatSystem" element={<ChatSystem />} />
            <Route path="/admindashboard/form" element={<StudentForm onSave={saveStudentInfo} />} />
          </Routes>

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;



// import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
// import LogoutButton from "./logout/logout";
// import { useAuth } from "./AuthContext";
// import StudentForm from "./studentForm";
// import ChatSystem from "./chatsystem/script";

// const AdminDashboard = () => {
//   const { token, email } = useAuth();
//   const [adminInfo, setAdminInfo] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedPhoto, setSelectedPhoto] = useState(null);
 

//   const navigate = useNavigate();

//   const { isAdmin } = useAuth();

//   useEffect(() => {
//     const fetchAdminInfo = async () => {
//       try {
//         if (token && isAdmin && email) {
//           const response = await fetch(`http://localhost:9002/data?email=${email}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (response.status === 200) {
//             const adminData = await response.json();
//             setAdminInfo(adminData);
//             setSelectedPhoto(adminData.photo);
//           }

//           setIsLoading(false);
//         } else {
//           console.error('Failed to fetch admin information');
//         }
//       } catch (error) {
//         console.error('Fetch admin info error:', error);
//       }
//     };

//     if (token && isAdmin && email) {
//       fetchAdminInfo();
//     }
//   }, [token, isAdmin, email, navigate]);

//   const saveStudentInfo = async (studentData) => {
//     try {
//       const response = await fetch('http://localhost:9002/data/saveStudentInfo', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(studentData),
//       });
//       if (response.status === 200) {
//         console.log('Student information saved successfully');
//       } else {
//         console.error('Failed to save student information');
//       }
//     } catch (error) {
//       console.error('Save student info error:', error);
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
//           <div className="position-sticky">
//             <ul className="nav flex-column">
//               <li className="nav-item">
//                 <Link to="/admindashboard/ChatSystem" className="nav-link">
//                   Chat System
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/admindashboard/form" className="nav-link">
//                   Form
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
//           <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
//             <h1 className="h2">Admin Dashboard</h1>
//             <LogoutButton />
//           </div>

//           {isLoading ? (
//             <p>Loading admin data...</p>
//           ) : (
//             <div>
//               <div>
//                 {selectedPhoto !== null ? (
//                   <div>
//                     <img
//                       src={`data:image/jpeg;base64,${selectedPhoto}`}
//                       alt="Admin"
//                       style={{ maxWidth: '200px', borderRadius: '50%' }}
//                     />
//                   </div>
//                 ) : (
//                   <div>
//                     {/* You can add an input for changing the photo here if needed */}
//                   </div>
//                 )}

//                 <div className="mt-4">
//                   {adminInfo ? (
//                     <>
//                       <p><strong>Name:</strong> {adminInfo.name}</p>
//                       <p><strong>Email:</strong> {adminInfo.email}</p>
//                       <p><strong>Admin Id:</strong> {adminInfo.adminId}</p>
//                       <p><strong>Faculty:</strong> {adminInfo.faculty}</p>
//                     </>
//                   ) : (
//                     <p>Admin information not available.</p>
//                   )}
//                 </div>
//                 <div>
//                   <StudentForm onSave={saveStudentInfo} />
//                 </div>
//               </div>
//               </div>
//             )}
        
//             <Routes>
//               <Route path="/admindashboard/ChatSystem" element={<ChatSystem />} />
//               <Route path="/admindashboard/form" element={<StudentForm />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   export default AdminDashboard;

