import NavMO from "../NavMO/NavMO";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar";

function AddMaterialout() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    materialoutID: "",
    JobId: "",
    date: "",
    gold: "",
    silver: "",
    pladium: "",
    platinum: "",
    thairuby: "",
    burmeseruby: "",
    bluesapphire: "",

    blooddiamond: "",

    regentdiamond: "",

    description: "",
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
    history("/materialoutdetails");
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:8070/materialouts", {
        materialoutID: String(inputs.materialoutID),
        JobId: String(inputs.JobId),
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

        description: String(inputs.description),
      })
      .then((res) => res.data);
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div>
      <NavMO />
      <center>
        <h1>Add Materialout</h1>
      </center>

      <form onSubmit={handleSubmit}>
        <label>MaterialoutID</label>
        <br />
        <input
          type="text"
          name="materialoutID"
          onChange={handleChange}
          value={inputs.materialoutID}
          required
          pattern="[A-Za-z0-9]+"
          placeholder="MaterialoutID "
        />
        <br />
        <br />

        <label>JobID</label>
        <br />
        <input
          type="text"
          name="JobId"
          onChange={handleChange}
          value={inputs.JobId}
          required
          pattern="[A-Za-z0-9]+"
          placeholder="JobID "
        />
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
          placeholder="Date "
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
          placeholder="Gold "
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
          placeholder="Silver "
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
          placeholder="Pladium "
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
          placeholder="Platinum "
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
          placeholder="Thai Ruby "
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
          placeholder="Burmese Ruby "
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
          placeholder="Blue Sapphire "
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
          placeholder="Blood Diamond "
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
          placeholder="Regent Diamond "
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

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default AddMaterialout;
