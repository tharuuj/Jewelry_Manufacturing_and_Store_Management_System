

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Apps from '../Apps/Apps';
import "./AppDetails.css";

const URL = "http://localhost:8070/apps";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function AppDetails() {
  const [apps, setApps] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setApps(data.apps));
  }, []);

  const ComponentsRef = useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      let filteredApps = data.apps.filter((app) =>
        Object.values(app).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      // Sort by date
      filteredApps = filteredApps.sort((a, b) => new Date(a.date) - new Date(b.date));

      setApps(filteredApps);
      setNoResults(filteredApps.length === 0);
    });
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    const tableRows = [];
    const columns = ["ID", "First Name", "Last Name", "Mobile Number", "Date", "Time"];
  
    // Add header
    doc.setFontSize(18);
    doc.text("Diamonds.lk", 14, 15);
    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleString(), 14, 25);
    doc.setFontSize(10);
  
    // Add company details
    const companyName = "Appointment Details Report";
    const companyAddress = "92 B Kahapola raod, Thalawathugoda";
    doc.text(companyName, 14, 35);
    doc.text(companyAddress, 14, 45);
  
    apps.forEach((app) => {
      const row = [];
      Object.values(app).forEach((value) => {
        row.push(value.toString());
      });
      tableRows.push(row);
    });
  
    // Add the table after adding header and company details
    doc.autoTable({
      head: [columns],
      body: tableRows,
      startY: 55, // Adjust this value to leave space for the header and company details
    });
  
    doc.save("Apps_Report.pdf");
  };

  return (
    <div className="app-details-container">
      <h1>Details</h1>
      <div className="search-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search App Details"
          className="search-input"
        />
        <button
          onClick={handleSearch}
          className="search-button"
        >
          Search
        </button>
      </div>

      {noResults ? (
        <div>
          <p>No Apps Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          {apps &&
            apps.map((app, i) => (
              <div key={i}>
                <Apps app={app} />
              </div>
            ))}
        </div>
      )}

      <button
        onClick={handleDownloadReport}
        className="download-button"
      >
        Download Report
      </button>
    </div>
  );
}

export default AppDetails;
