import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Layout/ProfileMngHead";
import "./style.css";
import axios from "axios";
import { signout } from "../../actions";
import html2pdf from "html2pdf.js";
import $ from "jquery";
import "datatables.net";
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';

const AdminDashboard = () => {
  const [admin,setAdmin] = useState(JSON.parse(localStorage.getItem('user')));
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showBigButtons, setShowBigButtons] = useState(true);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showAdminDetails, setshowAdminDetails] = useState(false);
  const [users, setCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const dispatch = useDispatch();
  const history = useNavigate();
  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    $('#customer-table').DataTable();
  }, [users]); // Trigger initialization when users data changes

  const fetchAdminDetails = async () => {
    try {
      const token = window.localStorage.getItem("token");
    
      const response = await axios.get(
        `http://localhost:8070/users/${admin._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.user);
      setUpdatedUser(response.data.user);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Token expired or unauthorized:", error.response);
        alert("Your session has expired. Please login again.");
        dispatch(signout());
      } else {
        console.error("Error fetching admin details:", error.response);
      }
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const adminId = user._id.toString();
      await axios.put(`http://localhost:8070/users/${admin._id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchAdminDetails();
      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Token expired or unauthorized:", error.response);
        alert("Your session has expired. Please login again.");
        dispatch(signout());
      } else {
        console.error("Error updating customer details:", error.response);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const adminId = user._id.toString();
      await axios.delete(`http://localhost:8070/users/${admin._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Account deleted successfully");
      logout();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Token expired or unauthorized:", error.response);
        alert("Your session has expired. Please login again.");
        dispatch(signout());
      } else {
        console.error("Error deleting customer account:", error.response);
      }
    }
  };

  const handleNoButtonClick = () => {
    setShowDeleteConfirmation(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSidebarButtonClick = (title) => {
    if (title === "Dashboard") {
      setShowBigButtons(true);
      setShowCustomerDetails(false); // Set showCustomerDetails to false
      setshowAdminDetails(false);
    } else if (title === "Customers") {
      setShowBigButtons(false);
      fetchCustomerDetails();
      setshowAdminDetails(false);
    } else if (title === "Account Details") {
      setShowBigButtons(false);
      setShowCustomerDetails(false);
      setshowAdminDetails(true);
      fetchAdminDetails();
    }
  };

  const fetchCustomerDetails = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8070/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const customersData = response.data.users.filter(
        (user) => user.role === "customer"
      );

      setCustomers(customersData);
      setCustomerCount(customersData.length); // Update customer count
      setShowCustomerDetails(true);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const handleSendEmailsClick = () => {
    history(`/sendmails`);
  };

  const downloadPDF = () => {
    const companyName = "Diamonds.lk"; 
    const reportName = "Customer Details Report";
    const element = document.getElementById("customer-table");

    // Create the table HTML dynamically
    const tableHTML = `
        <table style="width:100%; border-collapse: collapse; ">
            <thead>
                <tr >
                
                </tr>
            </thead>
            <tbody>
                ${element.innerHTML}
            </tbody>
        </table>
    `;
    
    const companyNameHTML = `<h2 style="color: #00008B; font-size: 24px;">${companyName}</h2><br/>`;
    const reportNameHTML = `<h2 style="color:red;">${reportName}</h2><br/><br/><hr style="height: 5px; background-color:red; border: none;"/>`;

    // Combine all HTML content
    const contentHTML = companyNameHTML + reportNameHTML + tableHTML;

    const opt = {
        margin: 1,
        filename: 'customer_report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    // Generate PDF from HTML content
    html2pdf().from(contentHTML).set(opt).save();
};

  return (
    <div className="ProfileManagement">
      <header className="header">
        <Header />
      </header>
      <div className="dashboard">
        <div className="sidebar">
          <ul>
            <br />
            <p align="center" className="name">
              {user ? user.name : "Admin"}
            </p>
            <li>
              <button onClick={() => handleSidebarButtonClick("Dashboard")}>
              <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/FFFFFF/dashboard-layout.png" alt="dashboard-layout"/>Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => handleSidebarButtonClick("Customers")}>
              <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/FFFFFF/commercial-development-management.png" alt="commercial-development-management"/>Customers
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSidebarButtonClick("Account Details")}
              >
               <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/FFFFFF/guest-male.png" alt="guest-male"/> Account Details
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleSendEmailsClick();
                  handleSidebarButtonClick("Send Emails");
                }}
              >
                <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/FFFFFF/media-message.png" alt="media-message"/>Send Emails
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowDeleteConfirmation(true);
                  handleSidebarButtonClick("Delete Account");
                }}
              >
               <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/FFFFFF/filled-trash.png" alt="filled-trash"/> Delete Account
              </button>
            </li>
           
          </ul>
        </div>

        {showBigButtons ? (
          
          <div className="bigButtons">
            <div className="buttonContainer">
              
              <p className="summary">
   
           
                Customers: {customerCount}<br/><br/>
                <img width="200" height="200" src="https://img.icons8.com/material-outlined/100/228BE6/queue.png" alt="queue"/>
              </p>
              
            </div>
          </div>
        ) : null}
        {showAdminDetails ? (
          <div className="container">
            <div className="customer-details">
              <h2>My Account</h2>
              <br />
              {user && (
                <div>
                  <div className="row">
                    <div className="detail">
                      <label>Name:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={updatedUser.name}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user.name}</span>
                      )}
                    </div>
                    <div className="detail">
                      <label>DOB:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="DOB"
                          value={updatedUser.DOB}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user.DOB}</span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="detail">
                      <label>Address:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={updatedUser.address}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user.address}</span>
                      )}
                    </div>
                    <div className="detail">
                      <label>PhoneNumber:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="phoneNumber"
                          value={updatedUser.phoneNumber}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user.phoneNumber}</span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="detail">
                      <label>Email:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="email"
                          value={updatedUser.email}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user.email}</span>
                      )}
                    </div>
                    <div className="detail">
                      <label>Username:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="username"
                          value={updatedUser.username}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user.username}</span>
                      )}
                    </div>
                  </div>

                  {showDeleteConfirmation ? (
                    <div>
                      <p>Are you sure you want to delete your account?</p>
                      <button
                        className="deleteButton"
                        onClick={handleDeleteAccount}
                      >
                        Delete
                      </button>
                      <button
                        className="noButton"
                        onClick={handleNoButtonClick}
                      >
                        No
                      </button>
                    </div>
                  ) : isEditing ? (
                    <button className="saveButton" onClick={handleUpdate}>
                      Save Changes
                    </button>
                  ) : (
                    <button
                      className="editButton"
                      onClick={() => setIsEditing(true)}
                    >
                      Update Details
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : null}
        {showCustomerDetails && users && users.length > 0 && (
          <div className="container">
            <div className="table-container">
              <table id="customer-table" className="display">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>DOB</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((customer) => (
                    <tr key={customer._id}>
                      <td>{customer.name}</td>
                      <td>{customer.address}</td>
                      <td>{customer.DOB}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table><br/><br/>
              <button onClick={downloadPDF} className="pdf">
                Download Customers Report
              </button>
            </div>
            <br/>
          </div>
        )}

        {/* Calendar component */}
        {showBigButtons ? (
          <div className="container">
            <div className="calendar-container">
              <Calendar />
            </div>
          </div>
        ) : null}
      </div>
      
    </div>
  );
};

export default AdminDashboard;
