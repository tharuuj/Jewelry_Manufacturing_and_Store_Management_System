import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addorders.css"; // Assuming the CSS file is named AddUsers.css
import Nav from "../Nav/Nav";

function AddOrders() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    
    OrderId: "",
    CustomerName: "",
    ItemName: "",
    ItemNumber: "",
    Quantity: "",
    ItemAmount: "",
    TotalAmount: "",
    ContactNumber: "",
    Address: "",
    OrderType: "",
    Date: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8070/orders", {
        ...inputs,
      });
      history("/OrderDetails");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="usercontainer">
      <Nav/>
      <h1 className="head">Add Order Details</h1>
      <div className="card-container">
        <div className="card">
          <form className="form-container" onSubmit={handleSubmit}>
            
            <div className="form-item">
              <label htmlFor="OrderId">Order ID</label>
              <input
                type="text"
                id="OrderId"
                name="OrderId"
                placeholder="Order ID"
                value={inputs.OrderId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="CustomerName">Customer Name</label>
              <input
                type="text"
                id="CustomerName"
                name="CustomerName"
                placeholder="Customer Name"
                value={inputs.CustomerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="ItemName">Item Name</label>
              <input
                type="text"
                id="ItemName"
                name="ItemName"
                placeholder="Item Name"
                value={inputs.ItemName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="ItemNumber">Item Number</label>
              <input
                type="text"
                id="ItemNumber"
                name="ItemNumber"
                placeholder="Item Number"
                value={inputs.ItemNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="Quantity">Quantity</label>
              <input
                type="text"
                id="Quantity"
                name="Quantity"
                placeholder="Quantity"
                value={inputs.Quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="ItemAmount">Item Amount</label>
              <input
                type="text"
                id="ItemAmount"
                name="ItemAmount"
                placeholder="Item Amount"
                value={inputs.ItemAmount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="TotalAmount">Total Amount</label>
              <input
                type="text"
                id="TotalAmount"
                name="TotalAmount"
                placeholder="Total Amount"
                value={inputs.TotalAmount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="ContactNumber">Contact Number</label>
              <input
                type="text"
                id="ContactNumber"
                name="ContactNumber"
                placeholder="Contact Number"
                value={inputs.ContactNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                id="Address"
                name="Address"
                placeholder="Address"
                value={inputs.Address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="OrderType">Order Type</label>
              <select
                name="OrderType"
                id="OrderType"
                value={inputs.OrderType}
                onChange={handleChange}
                required
              >
                <option value="">Select Order Type</option>
                <option value="Online">Online</option>
                <option value="Physical">Physical</option>
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="Date">Date</label>
              <input
                type="date"
                id="Date"
                name="Date"
                value={inputs.Date}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default AddOrders;
