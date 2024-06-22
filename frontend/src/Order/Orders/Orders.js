import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./orders.css"; // Assuming the CSS file is named Users.css

export default function User(props) {
  const {
    _id,
    OrderId,
    CustomerName,
    ItemName,
    ItemNumber,
    Quantity,
    ItemAmount,
    TotalAmount,
    ContactNumber,
    Address,
    OrderType,
    Date,
  } = props.user;

  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      await axios
        .delete(`http://localhost:8070/orders/${_id}`)
        .then(() => {
          alert("Delete Succsesfull");
          window.location.reload();
        })
        .catch((error) => console.error("Error deleting user: ", error));
    }
  };

  return (
    <div className="user-container">
      <br />
      <table>
        <tbody>
          <tr>
            <td>Id:</td>
            <td>{_id}</td>
          </tr>
          <tr>
            <td>Order Id:</td>
            <td>{OrderId}</td>
          </tr>
          <tr>
            <td>Customer Name:</td>
            <td>{CustomerName}</td>
          </tr>
          <tr>
            <td>Item Name:</td>
            <td>{ItemName}</td>
          </tr>
          <tr>
            <td>Item Number:</td>
            <td>{ItemNumber}</td>
          </tr>
          <tr>
            <td>Quantity:</td>
            <td>{Quantity}</td>
          </tr>
          <tr>
            <td>Item Amount:</td>
            <td>{ItemAmount}</td>
          </tr>
          <tr>
            <td>Total Amount:</td>
            <td>{TotalAmount}</td>
          </tr>
          <tr>
            <td>Contact Number:</td>
            <td>{ContactNumber}</td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>{Address}</td>
          </tr>
          <tr>
            <td>Order Type:</td>
            <td>{OrderType}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>{Date}</td>
          </tr>
        </tbody>
      </table>
      <Link to={`/OrderDetails/${_id}`}>
        <button className="user-update-button">Update</button>
      </Link>
      <button className="user-button" onClick={deleteHandler}>
        Delete
      </button>
      <br />
    </div>
  );
}
