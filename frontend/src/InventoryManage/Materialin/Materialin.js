import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Materialin(props) {
  const {
    _id,
    materialinID,
    supplierID,
    date,
    gold,
    silver,
    pladium,
    platinum,
    thairuby,
    burmeseruby,
    bluesapphire,
    blooddiamond,
    regentdiamond,
    value,
  } = props.materialin;

  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this materialin?"
    );
    if (confirmDelete) {
      await axios
        .delete(`http://localhost:8070/materialins/${_id}`)
        .then((res) => res.data)
        .then(() => {
          history("/");
          history("/materialindetails");
        })
        .catch((error) => console.error("Error deleting materialin: ", error));
    }
  };

  return (
    <tr>
      <td>{materialinID}</td>
      <td>{supplierID}</td>
      <td>{date}</td>
      <td>{gold}</td>
      <td>{silver}</td>
      <td>{pladium}</td>
      <td>{platinum}</td>
      <td>{thairuby}</td>
      <td>{burmeseruby}</td>
      <td>{bluesapphire}</td>

      <td>{blooddiamond}</td>

      <td>{regentdiamond}</td>

      <td>{value}</td>
      <td>
        <Link to={`/materialindetails/${_id}`}>
          <button>Update</button>
        </Link>
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Materialin;
