import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import "./updatecuss.css";

function UpdateCuss() {
  const [inputs, setInputs] = useState({
    OrderNum: "",
    ChooseItem: "", 
    ChooseDesign: "", // Adding ChooseDesign to match with addcuss.js
  });

  const history = useNavigate();
  const { id } = useParams();

  // Update data
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cuss/${id}`);
        const data = response.data;
        setInputs(data.cus);
      } catch (error) {
        console.error("Error fetching cuss:", error);
      }
    };
    fetchHandler();
  }, [id]);

  // Send data
  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/cuss/${id}`, inputs);
      history("/CusDetails");
    } catch (error) {
      console.error("Error updating cuss:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  // Design mappings for each item type
  const itemDesigns = {
    ring: ["ring1.jpg", "ring2.jpg", "ring3.jpg", "ring4.jpg" ,"ring5.jpg", "ring6.jpg", "ring7.jpg", "ring8.jpg", "ring9.jpg", "ring10.jpg", "ring11.jpg", "ring12.jpg", "ring13.jpg", "ring14.jpg" ,"ring15.jpg", "ring16.jpg"],
    chain: ["chain1.jpg", "chain2.jpg", "chain3.jpg", "chain4.jpg", "chain5.jpg", "chain6.jpg", "chain7.jpg", "chain8.jpg","chain9.jpg", "chain10.jpg", "chain11.jpg", "chain12.jpg", "chain13.jpg", "chain14.jpg", "chain15.jpg", "chain16.jpg"],
    earring: ["earring1.jpg", "earring2.jpg", "earring3.jpg", "earring4.jpg", "earring5.jpg", "earring6.jpg", "earring7.jpg", "earring8.jpg", "earring9.jpg", "earring10.jpg", "earring11.jpg", "earring12.jpg", "earring13.jpg", "earring14.jpg", "earring15.jpg", "earring16.jpg"],
    bracelet: ["bracelet1.jpg", "bracelet2.jpg", "bracelet3.jpg", "bracelet4.jpg", "bracelet5.jpg", "bracelet6.jpg", "bracelet7.jpg", "bracelet8.jpg", "bracelet9.jpg", "bracelet10.jpg", "bracelet11.jpg", "bracelet12.jpg", "bracelet13.jpg", "bracelet14.jpg", "bracelet15.jpg", "bracelet16.jpg"],
    pendant: ["pendant1.jpg", "pendant2.jpg", "pendant3.jpg", "pendant4.jpg", "pendant5.jpg", "pendant6.jpg", "pendant7.jpg", "pendant8.jpg", "pendant9.jpg", "pendant10.jpg", "pendant11.jpg", "pendant12.jpg", "pendant13.jpg", "pendant14.jpg", "pendant15.jpg", "pendant16.jpg"],
    necklace: ["necklace1.jpg", "necklace2.jpg", "necklace3.jpg", "necklace4.jpg", "necklace5.jpg", "necklace6.jpg", "necklace7.jpg", "necklace8.jpg", "necklace9.jpg", "necklace10.jpg", "necklace11.jpg", "necklace312.jpg", "necklace13.jpg", "necklace14.jpg", "necklace15.jpg", "necklace16.jpg"]
  };

  // Function to render design options based on selected item
  const renderDesignOptions = () => {
    const designs = itemDesigns[inputs.ChooseItem] || [];
    return designs.map((design, index) => (
      <label key={index}>
        <Form.Check
          type="radio"
          name="ChooseDesign"
          value={design}
          onChange={handleChange}
          checked={inputs.ChooseDesign === design}
        />
        <img src={"images/" + design} alt={`Design ${index + 1}`} />
      </label>
    ));
  };

  return (
    <div className="addcus-container">
      <h2>Update Customizing Order Details</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Label className="addcus-label">Order Number</Form.Label>
        <Form.Control
          type="text"
          name="OrderNum"
          className="addcus-input"
          value={inputs.OrderNum}
          disabled
        />
        <Form.Label className="addcus-label">Choose Item</Form.Label>
        <Form.Select
          name="ChooseItem"
          className="addcus-input"
          onChange={handleChange}
          value={inputs.ChooseItem}
          required
        >
          <option value="">Select an item</option>
          <option value="ring">Ring</option>
          <option value="chain">Chain</option>
          <option value="earring">Earring</option>
          <option value="bracelet">Bracelet</option>
          <option value="pendant">Pendant</option>
          <option value="necklace">Necklace</option>
          <option value="bangle">Bangle</option>
        </Form.Select>
        <Form.Label className="addcus-label">Choose Design</Form.Label>
        <div>
          {renderDesignOptions()}
        </div>
        <Button className="addcus-button" type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default UpdateCuss;
