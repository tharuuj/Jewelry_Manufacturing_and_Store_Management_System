import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import './EmpDashboard.css';
import Header from '../../Components/Headers/Headers';
import { fetchEmployeeCount, fetchAggregatedAttendance } from '../../services/Apis';
import Chart from 'chart.js/auto';


const EmpDashboard = () => {

  const [employeeCount, setEmployeeCount] = useState(0);
  const [attendanceData, setAttendanceData] = useState({ dates: [], counts: [] });
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch employee count when the component mounts
    fetchEmployeeCount()
      .then(count => {
        setEmployeeCount(count || 0);
      })
      .catch(error => console.error('Error fetching employee IDs:', error));

    // Fetch aggregated attendance data when the component mounts
    fetchAggregatedAttendance()
      .then(data => {
        setAttendanceData(data);
      })
      .catch(error => console.error('Error fetching aggregated attendance data:', error));

  }, []);

  useEffect(() => {
    // Check if attendanceData is still empty
    if (attendanceData.dates.length === 0 || attendanceData.counts.length === 0) {
      return;
    }

    // Destroy previous chart instance
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    // Render new chart instance
    const chartData = {
      labels: attendanceData.dates,
      datasets: [
        {
          label: 'Attendance Count',
          data: attendanceData.counts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const ctx = document.getElementById('attendance-chart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          x: {
            type: 'category', // Use 'category' scale alias for Chart.js v3
          },
        },
      },
    });

  }, [attendanceData]);
/*
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Employee Management Dashboard</h1>
      <div className="dashboard-card">
        <p className="dashboard-count">Total Employees: {employeeCount}</p>
        <h2>Attendance Chart</h2>
        <div className="chart-container">
          <canvas id="attendance-chart"></canvas>
        </div>
      </div>
    </div>
  );
};
*/

return (
  <div>
  
    <br></br>
    <Header/>
    <h1 className="dashboard-heading">Welcome to Employee Management Dashboard</h1>
    <div className="dashboard-container">
      <div className="employee-card">
        <div className="employee-strip"></div>
        <div className="employee-info">
          <div className="employee-count">{employeeCount}</div>
        </div>
        <div className="label">Total Employees</div>
      </div>
      <div className="chart-card">
        <h2>Attendance Chart</h2>
        <div className="chart-container">
          <canvas id="attendance-chart"></canvas>
        </div>
      </div>
    </div>
  </div>
);
};


export default EmpDashboard;
