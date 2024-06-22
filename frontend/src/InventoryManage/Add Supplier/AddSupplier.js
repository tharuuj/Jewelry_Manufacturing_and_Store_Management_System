import NavS from "../NavS/NavS";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar";

function AddSupplier() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    supplierID: "",
    name: "",
    nic: "",
    email: "",
    phone: "",
    address: "",
    bankdetails: "",
    description: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    history("/supplierdetails");
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:8070/suppliers", {
        supplierID: String(inputs.supplierID),
        name: String(inputs.name),
        nic: String(inputs.nic),
        email: String(inputs.email),
        phone: String(inputs.phone),
        address: String(inputs.address),
        bankdetails: String(inputs.bankdetails),
        description: String(inputs.description),
      })
      .then((res) => res.data);
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div>
      <NavS />
      <center>
        <h1>Add Supplier</h1>
      </center>

      <form onSubmit={handleSubmit}>
        <label>SupplierID</label>
        <br />
        <input
          type="text"
          name="supplierID"
          onChange={handleChange}
          value={inputs.supplierID}
          required
          pattern="[A-Za-z0-9]+"
          placeholder="SupplierID"
        />
        <br />
        <br />

        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          required
          pattern="[a-zA-Z ]+"
          placeholder="Name"
        />
        <br />
        <br />

        <label>NIC</label>
        <br />
        <input
          type="text"
          name="nic"
          onChange={handleChange}
          value={inputs.nic}
          required
          pattern="^\d{9}(v|V)|\d{12}$"
          placeholder="NIC"
        />
        <br />
        <br />

        <label>Email</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
          required
          placeholder="Email"
        />
        <br />
        <br />

        <label>Phone</label>
        <br />
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          value={inputs.phone}
          required
          pattern="^0\d{9}$"
          placeholder="Phone"
        />
        <br />
        <br />

        <label>Address</label>
        <br />
        <textarea
          name="address"
          onChange={handleChange}
          value={inputs.address}
          required
          placeholder="Address"
        ></textarea>
        <br />
        <br />

        <label>Bankdetails</label>
        <br />
        <textarea
          name="bankdetails"
          onChange={handleChange}
          value={inputs.bankdetails}
          required
          placeholder="Bankdetails"
        ></textarea>
        <br />
        <br />

        <label>Description</label>
        <br />
        <textarea
          name="description"
          onChange={handleChange}
          value={inputs.description}
          placeholder="Description"
        ></textarea>
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default AddSupplier;
