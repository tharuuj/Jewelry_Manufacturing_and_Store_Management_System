import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Materialout(props) {
  const {
    _id,
    materialoutID,
    JobId,
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
    
    description,
  } = props.materialout;

  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this materialout?"
    );
    if (confirmDelete) {
      await axios
        .delete(`http://localhost:8070/materialouts/${_id}`)
        .then((res) => res.data)
        .then(() => {
          history("/");
          history("/materialoutdetails");
        })
        .catch((error) => console.error("Error deleting materialout: ", error));
    }
  };

  return (
    <tr>
      <td>{materialoutID}</td>
      <td>{JobId}</td>
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
      
      <td>{description}</td>
      <td>
        <Link to={`/materialoutdetails/${_id}`}>
          <button>Update</button>
        </Link>
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Materialout;
