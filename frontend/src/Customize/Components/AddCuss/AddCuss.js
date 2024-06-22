import React, { useState } from "react";

import { useNavigate } from "react-router";
import axios from "axios";
import "./addcuss.css";

import { FloatingLabel, Form, Button, Row, Col } from "react-bootstrap";
import { Tab, Nav, Container } from "react-bootstrap";
import Footer from "../../../Components/Accsesories/Head&Foot/Footer";
import Header from "../../../Components/Accsesories/Head&Foot/Header";
import Link from "antd/es/typography/Link";

function AddCuss() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    AccountUsername: "",
    MobileNumber: "",
    Address: "",
    City: "",
    Province: "",
    Zip: "",
    OrderNum: "",
    ChooseItem: "",
    ChooseDesign: "",
    NumberOfMaterials: "",
    MaterialTypes: [],
    MaterialWeights: [],
    AttributeType: "",
    Dimension: "",
    ChooseStoneType: "",
    ChooseStone: "",
    StoneWeight: "",
   
  });

  const [key, setKey] = useState("profile");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If ChooseItem changes, reset ChooseDesign
    if (name === "ChooseItem") {
      setInputs({
        ...inputs,
        [name]: value,
        ChooseDesign: "", // Reset ChooseDesign
      });
    } else if (name === "ChooseStoneType") {
      // Corrected this condition to match the stone type name
      setInputs({
        ...inputs,
        [name]: value,
        ChooseStone: "", // Reset stones
      });
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  const handleMaterialTypeChange = (e, index) => {
    const { value } = e.target;
    const updatedMaterialTypes = [...inputs.MaterialTypes];
    updatedMaterialTypes[index] = value;
    setInputs({
      ...inputs,
      MaterialTypes: updatedMaterialTypes,
    });
  };

  const handleMaterialWeightChange = (e, index) => {
    const { value } = e.target;
    const updatedMaterialWeights = [...inputs.MaterialWeights];
    updatedMaterialWeights[index] = value;
    setInputs({
      ...inputs,
      MaterialWeights: updatedMaterialWeights,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/CusDetails"));
  };

  const sendRequest = async () => {
    try {
      await axios.post("http://localhost:8070/cuss", {
        ...inputs,
      });
    } catch (error) {
      console.error("Error adding cuss:", error);
    }
  };

  // Design mappings for each item type
  const itemDesigns = {
    ring: [
      "ring1.jpg",
      "ring2.jpg",
      "ring3.jpg",
      "ring4.jpg",
      "ring5.jpg",
      "ring6.jpg",
      "ring7.jpg",
      "ring8.jpg",
      "ring9.jpg",
      "ring10.jpg",
      "ring11.jpg",
      "ring12.jpg",
      "ring13.jpg",
      "ring14.jpg",
      "ring15.jpg",
      "ring16.jpg",
    ],
    chain: [
      "chain1.jpg",
      "chain2.jpg",
      "chain3.jpg",
      "chain4.jpg",
      "chain5.jpg",
      "chain6.jpg",
      "chain7.jpg",
      "chain8.jpg",
      "chain9.jpg",
      "chain10.jpg",
      "chain11.jpg",
      "chain12.jpg",
      "chain13.jpg",
      "chain14.jpg",
      "chain15.jpg",
      "chain16.jpg",
    ],
    earring: [
      "earring1.jpg",
      "earring2.jpg",
      "earring3.jpg",
      "earring4.jpg",
      "earring5.jpg",
      "earring6.jpg",
      "earring7.jpg",
      "earring8.jpg",
      "earring9.jpg",
      "earring10.jpg",
      "earring11.jpg",
      "earring12.jpg",
      "earring13.jpg",
      "earring14.jpg",
      "earring15.jpg",
      "earring16.jpg",
    ],
    bracelet: [
      "bracelet1.jpg",
      "bracelet2.jpg",
      "bracelet3.jpg",
      "bracelet4.jpg",
      "bracelet5.jpg",
      "bracelet6.jpg",
      "bracelet7.jpg",
      "bracelet8.jpg",
      "bracelet9.jpg",
      "bracelet10.jpg",
      "bracelet11.jpg",
      "bracelet12.jpg",
    ],
    pendant: [
      "pendant1.jpg",
      "pendant2.jpg",
      "pendant3.jpg",
      "pendant4.jpg",
      "pendant5.jpg",
      "pendant6.jpg",
      "pendant7.jpg",
      "pendant8.jpg",
      "pendant9.jpg",
      "pendant10.jpg",
      "pendant11.jpg",
      "pendant12.jpg",
      "pendant13.jpg",
      "pendant14.jpg",
      "pendant15.jpg",
      "pendant16.jpg",
    ],
    necklace: [
      "necklace1.jpg",
      "necklace2.jpg",
      "necklace3.jpg",
      "necklace4.jpg",
      "necklace5.jpg",
      "necklace6.jpg",
      "necklace7.jpg",
      "necklace8.jpg",
      "necklace9.jpg",
      "necklace10.jpg",
      "necklace11.jpg",
      "necklace312.jpg",
      "necklace13.jpg",
      "necklace14.jpg",
      "necklace15.jpg",
      "necklace16.jpg",
    ],
    bangle: [
      "bangle1.jpg",
      "bangle2.jpg",
      "bangle3.jpg",
      "bangle4.jpg",
      "bangle5.jpg",
      "bangle6.jpg",
      "bangle7.jpg",
      "bangle8.jpg",
      "bangle10.jpg",
      "bangle11.jpg",
      "bangle12.jpg",
      "bangle13.jpg",
    ],
  };

  const stoneTypes = {
    diamond: ["diamond1.jpg", "diamond2.jpg", "diamond3.jpg"],
    gem: ["gem1.jpg", "gem2.jpg", "gem3.jpg"],
    imitation: ["imitation1.jpg", "imitation2.jpg", "imitation3.jpg"],
  };

  // Function to render design options based on selected item
  const renderDesignOptions = () => {
    const designs = itemDesigns[inputs.ChooseItem] || []; // Get designs for selected item
    return designs.map((design, index) => (
      <label key={index}>
        <Form.Check
          type="radio"
          name="ChooseDesign"
          value={design}
          onChange={handleChange}
        />

        <img src={"images/" + design} alt={`Design ${index + 1}`} />
      </label>
    ));
  };

  // Function to render stone options
  const renderStoneOptions = () => {
    const stones = stoneTypes[inputs.ChooseStoneType] || [];
    return stones.map((stone, index) => (
      <label key={index}>
        <Form.Check
          type="radio"
          name="ChooseStone"
          value={stone}
          onChange={handleChange}
        />
        <img src={"images/" + stone} alt={`Stone ${index + 1}`} />
      </label>
    ));
  };

  const renderMaterialFields = () => {
    const materialFields = [];
    for (let i = 0; i < inputs.NumberOfMaterials; i++) {
      materialFields.push(
        <div key={i}>
          <Form.Group controlId={`MaterialType${i}`}>
            <Form.Label className="addcus-label">
              Material Type {i + 1}
            </Form.Label>
            <Form.Select
              name={`MaterialType${i}`}
              className="addcus-input"
              onChange={(e) => handleMaterialTypeChange(e, i)}
              value={inputs.MaterialTypes[i] || ""}
              required
            >
              <option value="">Select Material Type</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="platinum">Platinum</option>
              <option value="palladium">Palladium</option>
            </Form.Select>
          </Form.Group>
     
          <Form.Group controlId={`MaterialWeight${i}`}>
            <Form.Label className="addcus-label">
              Material Weight {i + 1}
            </Form.Label>
            <Form.Control
              type="text"
              name={`MaterialWeight${i}`}
              className="addcus-input"
              onChange={(e) => handleMaterialWeightChange(e, i)}
              value={inputs.MaterialWeights[i] || ""}
              placeholder={`Enter material weight ${i + 1}`}
              required
            />
          </Form.Group>
          <br/>
          <br/>
        </div>
      );
    }
    return materialFields;
  };

  return (
    <div className="addcustomizemaincontainer">
      <Header/>
      

      <header className="header1">
        <h1 id="title" className="text-center">
          Make your own customizing jewelry
        </h1>
        <p id="description" className="text-center">
          Thank you for taking the time to help us improve the platform
        </p>
      </header>

      <div className="photo">
        <img src="images/cus.jpg" style={{ width: "100%" }}></img>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div className="fcontainer">
        <span className="big-circle"></span>
        <img src="img/shape.png" className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's Customize jewelry</h3>
            <p className="text">
            Personalized jewelry is the perfect gift to give to someone for a special occasion, event, or for no particular reason at all. The best personalized jewelry is that which touches the recipient with its special meaning. You can memorialize a special moment, date, or message by simply customizing a piece of jewelry that can be kept close to the heart
            </p>

            <div className="info">
              <div className="information">
                <i className="fas fa-map-marker-alt"></i> Address
                <p>92 B thalawathugoda</p>
              </div>
              <div className="information">
                <i className="fas fa-envelope"></i> Website
                <p>Diamonds.lk</p>
              </div>
              <div className="information">
                <i className="fas fa-phone"></i>Number
                <p>123-456-789</p>
              </div>
            </div>

          
            
          </div>

          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <Form id="survey-form" onSubmit={handleSubmit}>
              <h1 style={{ fontSize: "25px" }}>Personal details</h1>
              <br />
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="FirstName">
                    <Form.Label className="addcus-label">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="FirstName"
                      className="form-control addcus-input"
                      onChange={handleChange}
                      value={inputs.FirstName}
                      placeholder="First name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="LastName">
                    <Form.Label className="addcus-label">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="LastName"
                      className="form-control addcus-input"
                      onChange={handleChange}
                      value={inputs.LastName}
                      placeholder="Last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="AccountUsername">
                    <Form.Label className="addcus-label">
                      Account Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="AccountUsername"
                      className="form-control addcus-input"
                      onChange={handleChange}
                      value={inputs.AccountUsername}
                      placeholder="Account username"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="MobileNumber">
                    <Form.Label className="addcus-label">
                      Mobile Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="MobileNumber"
                      className="form-control addcus-input"
                      onChange={handleChange}
                      value={inputs.MobileNumber}
                      placeholder="Mobile number"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="Address">
                    <Form.Label className="addcus-label">Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="Address"
                      className="form-control addcus-input"
                      onChange={handleChange}
                      value={inputs.Address}
                      placeholder="Enter your address"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="City">
                    <Form.Label className="addcus-label">City</Form.Label>
                    <Form.Control
                      type="text"
                      name="City"
                      className="form-control addcus-input"
                      onChange={handleChange}
                      value={inputs.City}
                      placeholder="Enter your city"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="Province">
                    <Form.Label className="addcus-label">Province</Form.Label>
                    <Form.Control
                      as="select"
                      name="Province"
                      className="addcus-input"
                      onChange={handleChange}
                      value={inputs.Province}
                      required
                    >
                      <option>Choose...</option>
                      <option value="Central Province">Central Province</option>
                      <option value="Eastern Province">Eastern Province</option>
                      <option value="North Central Province">
                        North Central Province
                      </option>
                      <option value="Northern Province">
                        Northern Province
                      </option>
                      <option value="North Western Province">
                        North Western Province
                      </option>
                      <option value="Sabaragamuwa Province">
                        Sabaragamuwa Province
                      </option>
                      <option value="Southern Province">
                        Southern Province
                      </option>
                      <option value="Uva Province">Uva Province</option>
                      <option value="Western Province">Western Province</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="Zip">
                    <Form.Label className="addcus-label">Zip</Form.Label>
                    <Form.Control
                      type="text"
                      name="Zip"
                      className="form-control addcus-input"
                      onChange={handleChange}
                      value={inputs.Zip}
                      placeholder="Enter your zip code"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>

      <Container className="tab-container">
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
          <div className="row">
            <div className="col-md-3">
              <Nav variant="pills" className="flex-column nav-pills-custom">
                <Nav.Item className="btnHome">
                  <Nav.Link
                    eventKey="profile"
                    className="nav-link-custom"
                    style={{ color: "white" }}
                  >
                    Design Customizing
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="btnHome">
                  <Nav.Link
                    eventKey="contact"
                    className="nav-link-custom"
                    style={{ color: "white" }}
                  >
                    Stone Customizing
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <div className="col-md-9">
              <Tab.Content>
                <Tab.Pane eventKey="profile" className="tab-pane-custom">
                  <div className="tabcontainer">
                    <header className="header1">
                      <h1 id="title" className="text-center">
                        Customizing jewelry design
                      </h1>
                    </header>
                    <div className="form-wrap">
                      <Form id="survey-form" onSubmit={handleSubmit}>
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Group controlId="ChooseItem">
                              <Form.Label className="addcus-label">
                                Choose Item
                              </Form.Label>
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
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group controlId="ChooseDesign">
                            <Form.Label className="addcus-label">
                              Choose item design
                            </Form.Label>{" "}
                            {/*  ChooseDesign */}
                            <br />
                            <br />
                            {/* images for design selection */}
                            <div>{renderDesignOptions()}</div>
                            <br />
                            <br />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Group controlId="NumberOfMaterials">
                              <Form.Label className="addcus-label">
                                Number of Materials
                              </Form.Label>
                              <Form.Control
                                type="number"
                                name="NumberOfMaterials"
                                className="form-control addcus-input"
                                onChange={handleChange}
                                value={inputs.NumberOfMaterials}
                                placeholder="Enter number of materials"
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <br/>
                        {renderMaterialFields()}
                        <br />
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Group controlId="AttributeType">
                              <Form.Label className="addcus-label">
                                Attribute Type
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="AttributeType"
                                className="addcus-input"
                                onChange={handleChange}
                                value={inputs.AttributeType}
                                placeholder="Enter attribute type"
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="Dimension">
                              <Form.Label className="addcus-label">
                                Dimension
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="Dimension"
                                className="addcus-input"
                                onChange={handleChange}
                                value={inputs.Dimension}
                                placeholder="Enter dimension"
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="contact" className="tab-pane-custom">
                  <div className="container">
                    <header className="header">
                      <h1 id="title" className="text-center">
                        {" "}
                        Customizing your stone
                      </h1>
                    </header>
                    <div className="form-wrap">
                      <Form id="survey-form" onSubmit={handleSubmit}>
                        <Form.Group controlId="ChooseStoneType">
                          <Form.Label className="addcus-label">
                            Choose Stone Type
                          </Form.Label>
                          <Form.Select
                            name="ChooseStoneType"
                            className="addcus-input"
                            onChange={handleChange}
                            value={inputs.ChooseStoneType}
                            required
                          >
                            <option value="">Select Stone Type</option>
                            <option value="diamond">Diamond</option>
                            <option value="gem">Gem</option>
                            <option value="imitation">Imitation</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="ChooseStone">
                          <Form.Label className="addcus-label">
                            Choose Stone
                          </Form.Label>{" "}
                          {/*  ChooseStone */}
                          <br />
                          <br />
                          <div>{renderStoneOptions()}</div>
                        </Form.Group>

                        <Form.Group controlId="StoneWeight">
                          <Form.Label className="addcus-label">
                            Stone Weight
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="StoneWeight"
                            className="addcus-input"
                            onChange={handleChange}
                            value={inputs.StoneWeight}
                            placeholder="Enter stone weight"
                            required
                          />
                        </Form.Group>

                        <br />
                        <button
                          className="submitButton"
                          variant="success"
                          type="submit"
                        >
                          Place Order
                        </button>
                      </Form>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </Container>

      <br />
      <Link to="/Video" className ="video">
  <button className="video">
    Video Call
    </button>
    </Link>
      <br />
      <br />
<Footer/>
    </div>
  );
}

export default AddCuss;
