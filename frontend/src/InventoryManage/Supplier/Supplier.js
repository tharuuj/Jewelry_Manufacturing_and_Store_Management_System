import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Supplier(props) {
  const {
    _id,
    supplierID,
    name,
    nic,
    email,
    phone,
    address,
    bankdetails,
    description,
  } = props.supplier;

  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      await axios
        .delete(`http://localhost:8070/suppliers/${_id}`)
        .then((res) => res.data)
        .then(() => {
          history("/");
          history("/supplierdetails");
        })
        .catch((error) => console.error("Error deleting supplier: ", error));
    }
  };

  return (
    <tr>
      <td>{supplierID}</td>
      <td>{name}</td>
      <td>{nic}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>{bankdetails}</td>
      <td>{description}</td>
      <td>
        <Link to={`/supplierdetails/${_id}`}>
          <button>Update</button>
        </Link>
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Supplier;
