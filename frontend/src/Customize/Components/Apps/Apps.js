
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Apps.css";

export default function Orders(props) {
  const {
    _id,
    firstName,
    lastName,
    mobileNumber,
    Date,
    Time,
  } = props.app;

  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      await axios
        .delete(`http://localhost:5000/apps/${_id}`)
        .then((res) => res.data)
        .then(() => {
          history("/");
          history("/AppDetails");
        })
        .catch((error) => console.error("Error deleting app: ", error));
    }
  };

  return (
    <div className="app-container">
      <br />
      <table>
        <tbody>
          <tr>
            <td>Id:</td>
            <td>{_id}</td>
          </tr>
          <tr>
            <td>First Name:</td>
            <td>{firstName}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{lastName}</td>
          </tr>
          <tr>
            <td>Mobile Number:</td>
            <td>{mobileNumber}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>{Date}</td>
          </tr>
          <tr>
            <td>Time:</td>
            <td>{Time}</td>
          </tr>
        </tbody>
      </table>
      <Link to={`/AppDetails/${_id}`}>
        <button className="app-update-button">Update</button>
      </Link>
      <button className="app-button" onClick={deleteHandler}>
        Delete
      </button>
      <br />
    </div>
  );
}