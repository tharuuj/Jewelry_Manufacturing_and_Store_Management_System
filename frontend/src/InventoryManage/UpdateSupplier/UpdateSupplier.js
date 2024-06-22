import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import NavS from "../NavS/NavS";
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar";

function UpdateSupplier() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHanlder = async () => {
      await axios
        .get(`http://localhost:8070/suppliers/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.supplier));
    };
    fetchHanlder();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8070/suppliers/${id}`, {
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

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/supplierdetails"));
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div>
      <NavS />
      <center>
        <h1>Update Supplier</h1>
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
          disabled
        />
        <br />
        <br />

        <label>Name</label>
        <br />
        <textarea
          name="name"
          onChange={handleChange}
          value={inputs.name}
        ></textarea>
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
        />
        <br />
        <br />

        <label>Phone</label>
        <br />
        <input
          type="Number"
          name="phone"
          onChange={handleChange}
          value={inputs.phone}
          required
          pattern="^0\d{9}$"
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
        ></textarea>
        <br />
        <br />

        <label>Description</label>
        <br />
        <textarea
          name="description"
          onChange={handleChange}
          value={inputs.description}
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

export default UpdateSupplier;
