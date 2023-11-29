// StudentForm.js
import React, { useState } from "react";

const StudentForm = ({ onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSave = () => {
    console.log("handleSave function called");
    // Perform any validation if needed

    // Prepare the student data
    const studentData = {
      name,
      email,
      studentId,
      startDate,
    };

    // Call the onSave prop to save the student information
    onSave(studentData);
  };
  
  console.log("StudentForm props:", onSave);

  return (
    <div>
      <h2>Student Information Form</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Student ID:</label>
          <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default StudentForm;


// // StudentForm.js
// import React, { useState } from "react";

// const StudentForm = ({ onSave }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [studentId, setStudentId] = useState("");
//   const [startDate, setStartDate] = useState("");

//   const handleSave = () => {
//     // Perform any validation if needed

//     // Prepare the student data
//     const studentData = {
//       name,
//       email,
//       studentId,
//       startDate,
//     };

//     // Call the onSave prop to save the student information
//     onSave(studentData);
//   };

//   return (
//     <div>
//       <h2>Student Information Form</h2>
//       <form>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div>
//           <label>Student ID:</label>
//           <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
//         </div>
//         <div>
//           <label>Start Date:</label>
//           <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//         </div>
//         <button type="button" onClick={handleSave}>
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudentForm;
