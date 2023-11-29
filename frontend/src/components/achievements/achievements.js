import React, { useState } from 'react';
import './achievements.css';
import { useAuth } from '../AuthContext';

function Achievements() {
  const { token } = useAuth();
  const [selectedOption, setSelectedOption] = useState('');
  const [optionInfo, setOptionInfo] = useState({});
  const [error, setError] = useState(null);

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);

    try {
      let response; // Declare response variable here

      if (token) {
        response = await fetch(`http://localhost:9002/achievements?option=${option}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response && response.status === 200) {
        const data = await response.json(); // Parse response data
        setOptionInfo(data);
        setError(null);
      } else {
        setError('Failed to fetch option information');
      }
    } catch (error) {
      console.error('API request error:', error);
      setError('Internal server error');
    }
  };

  return (
    <div className="container p-4 rounded bg-light">
      <h2 className="mt-4">Achievements</h2>
      <div className="mb-3">
        <select
          className="form-select"
          value={selectedOption}
          onChange={(e) => handleOptionSelect(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="Internship">Internship</option>
          <option value="Scholarship">Scholarship</option>
          <option value="Workshop">Workshop</option>
        </select>
      </div>
      {error && <p className="text-danger">Error: {error}</p>}
      {selectedOption && (
        <div>
          <h3>{selectedOption} Information</h3>
          <ul className="list-group">
            {Object.entries(optionInfo).map(([key, value]) => (
              <li className="list-group-item" key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Achievements;




// import React, { useState } from 'react';
// import './achievements.css';
// import { useAuth } from '../AuthContext';

// function Achievements() {
//   const { token } = useAuth();
//   const [selectedOption, setSelectedOption] = useState('');
//   const [optionInfo, setOptionInfo] = useState({});
//   const [error, setError] = useState(null);

//   const handleOptionSelect = async (option) => {
//     setSelectedOption(option);

//     try {
//       let response; // Declare response variable here

//       if (token) {
//         response = await fetch(`http://localhost:9002/achievements?option=${option}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       }

//       if (response && response.status === 200) {
//         const data = await response.json(); // Parse response data
//         setOptionInfo(data);
//         setError(null);
//       } else {
//         setError('Failed to fetch option information');
//       }
//     } catch (error) {
//       console.error('API request error:', error);
//       setError('Internal server error');
//     }
//   };



//   return (
//     <div>
//       <h2>Achievements</h2>
//       <div>
//         <select
//           value={selectedOption}
//           onChange={(e) => handleOptionSelect(e.target.value)}
//         >
//           <option value="">Select an option</option>
//           <option value="Internship">Internship</option>
//           <option value="Scholarship">Scholarship</option>
//           <option value="Workshop">Workshop</option>
//         </select>
//       </div>
//       {error && <p>Error: {error}</p>}
//       {selectedOption && (
//         <div>
//           <h3>{selectedOption} Information</h3>
//           <ul>
//             {Object.entries(optionInfo).map(([key, value]) => (
//               <li key={key}>
//                 <strong>{key}:</strong> {value}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Achievements;


