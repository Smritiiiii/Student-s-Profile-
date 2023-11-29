
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MarksChart = ({ token }) => {
  const [marksData, setMarksData] = useState(null);

  useEffect(() => { 
    const fetchMarksData = async () => {
      try {
        const response = await axios.get('http://localhost:9002/marks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setMarksData(response.data);
        } else {
          // Handle unauthorized or other errors
          console.error('Failed to fetch marks data');
        }
      } catch (error) {
        console.error('Fetch marks data error:', error);
      }
    };

    if (token) {
      fetchMarksData();
    }
  }, [token]);

  return (
    <div>
      <h2>Progress Chart</h2>
      {marksData && marksData.midterm && marksData.finalterm ? (
        <div style={{ width: '80%', height: 400, margin: 'auto' }}>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={[
                { name: 'MidSem1', value: marksData.midterm.midSem1 },
                { name: 'MidSem2', value: marksData.midterm.midSem2 },
                { name: 'MidSem3', value: marksData.midterm.midSem3 },
                { name: 'MidSem4', value: marksData.midterm.midSem4 },
                { name: 'MidSem5', value: marksData.midterm.midSem5 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="rgba(75, 192, 192, 0.2)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>Loading....</p>
      )}
      {marksData && marksData.finalterm ? (
        <div style={{ width: '80%', height: 400, margin: 'auto' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: 'FinalSem1', value: marksData.finalterm.finalSem1 },
                { name: 'FinalSem2', value: marksData.finalterm.finalSem2 },
                { name: 'FinalSem3', value: marksData.finalterm.finalSem3 },
                { name: 'FinalSem4', value: marksData.finalterm.finalSem4 },
                { name: 'FinalSem5', value: marksData.finalterm.finalSem5 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="rgba(75, 192, 192, 0.5)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default MarksChart;

