import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./updateorder.css"; 
import Nav from "../Nav/Nav";

function UpdateOrder() {
  const [inputs, setInputs] = useState({
    _id: "",
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

  const history = useNavigate();
  const id = useParams().id;

  // Update data
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8070/orders/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  // Send data
  const sendRequest = async () => {
    await axios.put(`http://localhost:8070/orders/${id}`, inputs);
  };

  // Handle input changes
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/OrderDetails"));
  };

  return (
    <div className="usercontainer">
      <Nav/>
       <h1 className="head">Add Order Details</h1>
      <div className="card-container">
        <div className="card">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-item">
              <label htmlFor="_id">ID</label>
              <input
                type="text"
                id="_id"
                name="_id"
                placeholder="ID"
                value={inputs._id}
                onChange={handleChange}
                required
              />
            </div>
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

export default UpdateOrder;
