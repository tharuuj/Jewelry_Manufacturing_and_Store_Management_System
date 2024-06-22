import NavM from "../NavM/NavM";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar";

function AddMaterial() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    materialID: "",
    name: "",
    type: "",
    grade: "",
    supplierID: "",
    unit: "",
    unitweight: "",
    unitcost: "",
    quantity: "",
    description: "",
    margin: "",
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
    history("/materialdetails");
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:8070/materials", {
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

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div>
      <NavM />
      <center>
        <h1>Add Material</h1>
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
          placeholder="MaterialID "
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
          placeholder="Name "
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
          placeholder="Type "
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
          placeholder="Grade "
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
  placeholder="SupplierID "
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
          placeholder="Unit "
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
          placeholder="Unitweight "
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
  placeholder="Unitcost "
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
          placeholder="Quantity "
        />
        <br />
        <br />

        <label>Description</label>
        <br />
        <textarea
          name="description"
          onChange={handleChange}
          value={inputs.description}
          placeholder="Description "
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
          placeholder="Margin "
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

export default AddMaterial;
