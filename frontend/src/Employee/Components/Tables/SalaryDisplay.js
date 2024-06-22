// SalaryDisplay.js
import React from 'react';

const SalaryDisplay = ({ salaryList, handleClose }) => {
  return (
    <div className="salary-modal">
      <div className="salary-modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Salary List</h2>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Attendance Day Count</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {salaryList.map((item) => (
              <tr key={item.employeeID}>
                <td>{item.employeeID}</td>
                <td>{item.attendanceCount}</td>
                <td>{item.salary * item.attendanceCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryDisplay;
