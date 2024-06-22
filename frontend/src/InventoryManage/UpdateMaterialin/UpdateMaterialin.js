import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import NavMI from "../NavMI/NavMI";
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar";

function UpdateMaterialin() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHanlder = async () => {
      await axios
        .get(`http://localhost:8070/materialins/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.materialin));
    };
    fetchHanlder();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8070/materialins/${id}`, {
        materialinID: String(inputs.materialinID),
        supplierID: String(inputs.supplierID),
        date: String(inputs.date),
        gold: String(inputs.gold),
        silver: String(inputs.silver),
        pladium: String(inputs.pladium),
        platinum: String(inputs.platinum),
        thairuby: String(inputs.thairuby),
        burmeseruby: String(inputs.burmeseruby),
        bluesapphire: String(inputs.bluesapphire),

        blooddiamond: String(inputs.blooddiamond),

        regentdiamond: String(inputs.regentdiamond),

        value: String(inputs.value),
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
    sendRequest().then(() => history("/materialindetails"));
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div>
      <NavMI />
      <center>
        <h1>Update Materialin</h1>
      </center>

      <form onSubmit={handleSubmit}>
        <label>MaterialinID</label>
        <br />
        <input
          type="text"
          name="materialinID"
          onChange={handleChange}
          value={inputs.materialinID}
          required
          pattern="[A-Za-z0-9]+"
          disabled
        />
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
          <option value="">Select SupplierID</option>
          <option value="S001">S001</option>
          <option value="S002">S002</option>
          <option value="S003">S003</option>
        </select>
        <br />
        <br />

        <label>Date</label>
        <br />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={inputs.date}
          required
        />
        <br />
        <br />

        <label>Gold</label>
        <br />
        <input
          type="text"
          name="gold"
          onChange={handleChange}
          value={inputs.gold}
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <label>Silver</label>
        <br />
        <input
          type="text"
          name="silver"
          onChange={handleChange}
          value={inputs.silver}
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <label>Pladium</label>
        <br />
        <input
          type="text"
          name="pladium"
          onChange={handleChange}
          value={inputs.pladium}
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <label>Platinum</label>
        <br />
        <input
          type="text"
          name="platinum"
          onChange={handleChange}
          value={inputs.platinum}
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <label>Thai Ruby</label>
        <br />
        <input
          type="text"
          name="thairuby"
          onChange={handleChange}
          value={inputs.thairuby}
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <label>Burmese Ruby</label>
        <br />
        <input
          type="text"
          name="burmeseruby"
          onChange={handleChange}
          value={inputs.burmeseruby}
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <label>Blue Sapphire</label>
        <br />
        <input
          type="text"
          name="bluesapphire"
          onChange={handleChange}
          value={inputs.bluesapphire}
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <label>Blood Diamond</label>
        <br />
        <input
          type="text"
          name="blooddiamond"
          onChange={handleChange}
          value={inputs.blooddiamond}
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <label>Regent Diamond</label>
        <br />
        <input
          type="text"
          name="regentdiamond"
          onChange={handleChange}
          value={inputs.regentdiamond}
          pattern="^(?!-)[0-9]+(\.[0-9]+)?$"
        />
        <br />
        <br />

        <label>Value</label>
        <br />
        <input
          type="text"
          name="value"
          onChange={handleChange}
          value={inputs.value}
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

export default UpdateMaterialin;
