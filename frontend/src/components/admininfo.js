import React, { useEffect, useState } from 'react';

const AdminInfo = ({ token }) => {
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch('http://localhost:9002/api/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdminInfo(data);
        } else {
          // Handle unauthorized or other errors
          console.error('Failed to fetch admin information');
        }
      } catch (error) {
        console.error('Fetch admin info error:', error);
      }
    };

    if (token) {
      fetchAdminInfo();
    }
  }, [token]);

  return (
    <div>
      <h2>Admin Information</h2>
      {adminInfo && (
        <div>
          <p>Email: {adminInfo.email}</p>
          <p>User ID: {adminInfo._id}</p>
        </div>
      )}
    </div>
  );
};

export default AdminInfo;

