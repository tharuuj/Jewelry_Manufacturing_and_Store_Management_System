import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Cuss from "../Cuss/Cuss";
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './cusdetails.css';

function CusDetails() {
  const [cuss, setCuss] = useState([]);
  const [filteredCuss, setFilteredCuss] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [noResults, setNoResults] = useState(false);
  const ComponentsRef = useRef();
  const [companyName, setCompanyName] = useState("Diamonds.lk"); // Add state for company name
  const [companyAddress, setCompanyAddress] = useState("92 B Kahapola road, Thalawathugoda"); // Add state for company address

  useEffect(() => {
    fetchHandler();
  }, []);

  useEffect(() => {
    filterCuss();
  }, [cuss, filterOption]);

  const handleSearch = () => {
    fetchHandler();
  };

  const fetchHandler = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cuss");
      setCuss(response.data.cuss);
      setNoResults(response.data.cuss.length === 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterCuss = () => {
    if (filterOption === "") {
      setFilteredCuss(cuss);
    } else {
      const filtered = cuss.filter((cus) => cus.ChooseItem === filterOption);
      setFilteredCuss(filtered);
    }
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'a2'
    });
    const tableRows = [];
    const columns = ["ID", "First Name", "Last Name", "Account Username", "Mobile Number", "Address", "City", "Province", "Zip",  "Choose Item", "Choose Design","NumberOfMaterial", "MaterialTypes","MaterialWeights", "Attribute Type", "Dimension", "Choose Stone Type", "Choose Stone", "Stone Weight"];

    // Add header
    doc.setFontSize(18);
    doc.text("Daimonds.lk", 14, 15);
    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleString(), 14, 25);
    doc.setFontSize(10);
    const companyName = "Customermizing Details Report";
    const companyAddress = "92 B Kahapola raod, Thalawathugoda";
    doc.text(companyName, 14, 35); 
    doc.text(companyAddress, 14, 45); 

    filteredCuss.forEach((cus) => {
      const row = [];
      Object.values(cus).forEach((value) => {
        row.push(value.toString());
      });
      tableRows.push(row);
    });

    doc.autoTable({
      head: [columns],
      body: tableRows,
      startY: 55, // Adjust this value to leave space for the header and company details
    });

    doc.save("Cuss_Report.pdf");
  };

  return (
    <div className="cus-details-container">
      <h2>Cus Details Display Page</h2>
      <br/>
      <br/>
      <div className="search-container">
        <input
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search User Details"
        />
        <Button
          className="search-newbutton"
          onClick={handleSearch}
          style={{width:'200px'}}
        >
          Search
        </Button>
      </div>

      <div className="filter-container">
        <label htmlFor="filterOption" className="filter-label">
          Filter by Choose Item:
        </label>
        <select
          id="filterOption"
          name="filterOption"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="filter-select"
        >
          <option value="">All</option>
          <option value="ring">Ring</option>
          <option value="chain">Chain</option>
          <option value="earring">Earring</option>
          <option value="bracelet">Bracelet</option>
          <option value="pendant">Pendant</option>
          <option value="necklace">Necklace</option>
          <option value="bangle">Bangle</option>
        </select>
      </div>
<br/><br/>
      {noResults ? (
        <div >
          <p>No cuss Found</p>
        </div>
      ) : (
        <div id="table-container" ref={ComponentsRef} >
          {filteredCuss.map((cus, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <Cuss cus={cus} />
            </div>
          ))}
        </div>
      )}

      <div >
        <Button
          onClick={handleDownloadReport}
          style={{width:'200px' , marginLeft:'550px'}}
        >
          Download Report
        </Button> 
      </div>
    </div>
  );
}

export default CusDetails;
