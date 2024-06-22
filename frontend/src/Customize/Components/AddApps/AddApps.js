import React, { useState } from "react";

import { useNavigate } from "react-router";
import axios from "axios";
import "./AddApps.css"


function AddApps() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    Date: "",
    Time: "",
   
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
      await axios.post("http://localhost:8070/apps", {
        ...inputs,
      });
      history("/AppDetails");
    } catch (error) {
      console.error("Error adding app:", error);
    }
  };

  return (

    <div className="appcontainer" >
      <div className="card-container">
        <div className="card">
          <form className="form-container" onSubmit={handleSubmit} >
            <div className="form-item">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={inputs.firstName}
                onChange={handleChange}
                required
      
                
                
      
              />
            </div>
            <div className="form-item">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={inputs.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Mobile umber"
                value={inputs.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-item gap">
              <div className="form-sub-items">
                <label htmlFor="Date">Booking Date</label>
                <input
                  type="date"
                  id="Date"
                  name="Date"
                  value={inputs.Date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-sub-items">
                <label htmlFor="Time">Time</label>
                <input
                  type="time"
                  name="Time"
                  value={inputs.Time}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="text-container">
        <div className="heading">Book Your Appointment</div>
        <div className="description">
        Personalized jewelry is the perfect gift to give to someone for a special occasion, event, or for no particular reason at all. The best personalized jewelry is that which touches the recipient with its special meaning. You can memorialize a special moment, date, or message by simply customizing a piece of jewelry that can be kept close to the heart
        </div>
      </div>
    </div>
    
  );
}

export default AddApps;
   