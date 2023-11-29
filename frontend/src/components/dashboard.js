import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Routes, useNavigate} from "react-router-dom";
import "./dashboard.css";
import Achievements from "./achievements/achievements";
import LogoutButton from "./logout/logout";
import { useAuth } from "./AuthContext";

const Dashboard = () => {
  const { token, email } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (token && email) {
          const response = await fetch(`http://localhost:9002/info?email=${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            const userData = await response.json();
            setUserInfo(userData);

            const startDate = new Date(userData.startDate);
            const currentDate = new Date();
            const diffMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
            const currentSemesterNumber = Math.floor(diffMonths / 5) + 1;
            setCurrentSemester(currentSemesterNumber);

            // Set profile photo URL
            setSelectedPhoto(userData.photo);

            // After successfully fetching data, set isLoading to false
            setIsLoading(false);
          } else {
            console.error('Failed to fetch user information');
          }
        }
      } catch (error) {
        console.error('Fetch user info error:', error);
      }
    };

    if (token) {
      fetchUserInfo();
    }
  }, [token, email, navigate]);

  const formatStartDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };




  return (
    <div className="container-fluid">
      <div className="row">
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/dashboard/ChatSystem" className="nav-link">
                  Chat System
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/achievements" className="nav-link">
                  Track Achievements
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/progressreport" className="nav-link">
                  View Progress Report
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <LogoutButton />
          </div>

          {/* Display user data or loading indicator */}
          {isLoading ? (
            <p>Loading user data...</p>
          ) : (
            /* Display user data when it's available */
            <div>
              <div>
                {selectedPhoto !== null ? (
                  <div>
                    <img src={`data:image/jpeg;base64,${selectedPhoto}`}alt="User Photo"
                      style={{ maxWidth: '200px', borderRadius: '50%' }}
                      
                    />
                  </div>
                ) : (
                  <div>
                    {/* You can add an input for changing the photo here if needed */}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <p><strong>Name:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Student Id:</strong> {userInfo.studentId}</p>
                {userInfo.startDate && (
                  <p><strong>Start Date:</strong> {formatStartDate(userInfo.startDate)}</p>
                )}
                {currentSemester !== null && (
                  <p><strong>Current Semester:</strong> {currentSemester}</p>
                )}
              </div>
            </div>
          )}

          <Routes>
            <Route path="/dashboard/achievements" element={<Achievements />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;







