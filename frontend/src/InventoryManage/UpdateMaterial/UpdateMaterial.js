import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import NavM from "../NavM/NavM";
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar";

function UpdateMaterial() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHanlder = async () => {
      await axios
        .get(`http://localhost:8070/materials/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.material));
    };
    fetchHanlder();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8070/materials/${id}`, {
        materialID: String(inputs.materialID),
        name: String(inputs.name),
        type: String(inputs.type),
        grade: String(inputs.grade),
        supplierID: String(inputs.supplierID),
        unit: String(inputs.unit),
        unitweight: String(inputs.unitweight),
        unitcost: String(inputs.unitcost),
        quantity: String(inputs.quantity),
        description: String(inputs.description),
        margin: String(inputs.margin),
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
    sendRequest().then(() => history("/materialdetails"));
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div>
      <NavM />
      <center>
        <h1>Update Material</h1>
      </center>

      <form onSubmit={handleSubmit}>
        <label>MaterialID</label>
        <br />
        <input
          type="text"
          name="materialID"
          onChange={handleChange}
          value={inputs.materialID}
          required
          pattern="[A-Za-z0-9]+"
          disabled
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
        />
        <br />
        <br />

        <label>Type</label>
        <br />
        <select
          name="type"
          onChange={handleChange}
          value={inputs.type}
          required
        >
          <option value="">Select Type</option>
          <option value="Metal">Metal</option>
          <option value="Gem">Gem</option>
          <option value="Diamond">Diamond</option>
        </select>
        <br />
        <br />

        <label>Grade</label>
        <br />
        <select
          name="grade"
          onChange={handleChange}
          value={inputs.grade}
          required
        >
          <option value="">Select Grade</option>
          {inputs.type === "Metal" && (
            <>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </>
          )}
          {inputs.type === "Gem" && (
            <>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </>
          )}
          {inputs.type === "Diamond" && (
            <>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
            </>
          )}
        </select>
        <br />
        <br />

        <label>SupplierID</label>
        <br />
        <select
          name="supplierID"
          onChange={handleChange}
          value={inputs.supplierID}
          required
        >
          <option value="">Select Supplier</option>
          <option value="S001">S001</option>
          <option value="S002">S002</option>
          <option value="S003">S003</option>
        </select>
        <br />
        <br />

        <label>Unit</label>
        <br />
        <select
          name="unit"
          onChange={handleChange}
          value={inputs.unit}
          required
        >
          <option value="">Select Unit</option>
          {inputs.type === "Metal" && (
            <>
              <option value="grams">Grams</option>
            </>
          )}
          {(inputs.type === "Gem" || inputs.type === "Diamond") && (
            <>
              <option value="carats">Carats</option>
            </>
          )}
        </select>
        <br />
        <br />

        <label>Unitweight</label>
        <br />
        <input
          type="text"
          name="unitweight"
          onChange={handleChange}
          value={inputs.unitweight}
          required
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <label>Unitcost</label>
        <br />
        <input
          type="text"
          name="unitcost"
          onChange={handleChange}
          value={inputs.unitcost}
          required
          pattern="^\d+(\.\d{1,2})?$"
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

        <label>Margin</label>
        <br />
        <input
          type="text"
          name="margin"
          onChange={handleChange}
          value={inputs.margin}
          required
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default UpdateMaterial;
