import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import NavR from "../NavR/NavR";
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar";

function UpdateReserve() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHanlder = async () => {
      await axios
        .get(`http://localhost:8070/reserves/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.reserve));
    };
    fetchHanlder();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8070/reserves/${id}`, {
        reserveID: String(inputs.reserveID),
        OrderId: String(inputs.OrderId),
        productID: String(inputs.productID),
        quantity: String(inputs.quantity),
        description: String(inputs.description),
        status: String(inputs.status),
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
    sendRequest().then(() => history("/reservedetails"));
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div>
      <NavR />
      <center>
        <h1>Update Reserve</h1>
      </center>

      <form onSubmit={handleSubmit}>
        <label>ReserveID</label>
        <br />
        <input
          type="text"
          name="reserveID"
          onChange={handleChange}
          value={inputs.reserveID}
          required
          pattern="[A-Za-z0-9]+"
          disabled
        />
        <br />
        <br />

        <label>OrderID</label>
        <br />
        <input
          type="text"
          name="OrderId"
          onChange={handleChange}
          value={inputs.OrderId}
          required
          pattern="[A-Za-z0-9]+"
        />
        <br />
        <br />

        <label>ProductID</label>
        <br />
        <input
          type="text"
          name="productID"
          onChange={handleChange}
          value={inputs.productID}
          required
          pattern="[A-Za-z0-9]+"
        />
        <br />
        <br />

        <label>Quantity</label>
        <br />
        <input
          type="text"
          name="quantity"
          onChange={handleChange}
          value={inputs.quantity}
          required
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
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

        <div>
          <label>Status</label>
          <br />
          <input
            type="radio"
            id="delivered"
            name="status"
            value="Delivered"
            checked={inputs.status === "Delivered"}
            onChange={handleChange}
          />
          <label htmlFor="delivered">Delivered</label>
          <input
            type="radio"
            id="notDelivered"
            name="status"
            value="Not Delivered"
            checked={inputs.status === "Not Delivered"}
            onChange={handleChange}
          />
          <label htmlFor="notDelivered">Not Delivered</label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default UpdateReserve;
