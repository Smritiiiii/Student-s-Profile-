import React, { useEffect, useState } from 'react';

const UserInfo = ({ token }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          // Handle unauthorized or other errors
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Fetch user info error:', error);
      }
    };

    if (token) {
      fetchUserInfo();
    }
  }, [token]);

  return (
    <div>
      <h2>User Information</h2>
      {userInfo && (
        <div>
          <p>Email: {userInfo.email}</p>
          <p>User ID: {userInfo._id}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
