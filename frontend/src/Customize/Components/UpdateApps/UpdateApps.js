import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./updateapp.css"

function UpdateApps() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    Date: "",
    Time: "",
    
  });

  const history = useNavigate();
  const id = useParams().id;

  // Update data
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8070/apps/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.app));
    };
    fetchHandler();
  }, [id]);

  // Send data
  const sendRequest = async () => {
    await axios.put(`http://localhost:8070/apps/${id}`, inputs);
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
    sendRequest().then(() => history("/AppDetails"));
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
      <div className="heading">Update Your Appointment Details</div>
      <div className="description">
        "Neque porro quisquam est qui 
        dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit..."
         "Нет никого, кто любил бы боль саму
        по себе, кто искал бы её и кто 
        хотел бы иметь её просто потому,
        что это боль.."
      </div>
    </div>
  </div>
  );
}

export default UpdateApps;