import NavMI from "../NavMI/NavMI.js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Materialin from "../Materialin/Materialin.js";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar.js";

const URL = "http://localhost:8070/materialins";
const MATERIALINS_PER_PAGE = 5;

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
  },
  cell: {
    width: '20%',
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold', // Add bold style here
    fontSize: 10, // Set the font size here
  },
});

function Materialins() {
  const [materialins, setMaterialins] = useState([]);
  const [filteredMaterialins, setFilteredMaterialins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showAll, setShowAll] = useState(false);
  const [filterSupplierID, setFilterSupplierID] = useState("All");

  useEffect(() => {
    fetchHandler().then((data) => {
      setMaterialins(data.materialins);
      setTotalPages(Math.ceil(data.materialins.length / MATERIALINS_PER_PAGE));
      const filtered = filterMaterialinsBySupplierID(data.materialins, filterSupplierID);
      setFilteredMaterialins(filtered);
    });
  }, [filterSupplierID]);

  const handleSearch = (query) => {
    const filtered = materialins.filter((materialin) => {
      return (
        materialin &&
        Object.values(materialin).some((val) =>
          val && val.toString().toLowerCase().includes(query.toLowerCase())
        ) &&
        (filterSupplierID === "All" || materialin.supplierID === filterSupplierID)
      );
    });
    setFilteredMaterialins(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / MATERIALINS_PER_PAGE));
    setNoResults(filtered.length === 0);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    handleSearch(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = () => {
    const sortedMaterialins = [...filteredMaterialins].sort((a, b) => {
      const nameA = a.materialinID.toLowerCase();
      const nameB = b.materialinID.toLowerCase();
      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    setFilteredMaterialins(sortedMaterialins);
    setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
  };

  const paginateMaterialins = () => {
    const startIndex = (currentPage - 1) * MATERIALINS_PER_PAGE;
    const endIndex = startIndex + MATERIALINS_PER_PAGE;
    return filteredMaterialins.slice(startIndex, endIndex);
  };

  const handleViewAll = () => {
    setShowAll(true);
  };

  const filterMaterialinsBySupplierID = (materialins, supplierID) => {
    if (supplierID === "All") {
      return materialins;
    } else {
      return materialins.filter((materialin) => materialin.supplierID === supplierID);
    }
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div>
      <NavMI />
      <center>
        <h1>Materialin Details Display Page</h1>
      </center>

      <div style={{ textAlign: "center" }} className="searchbar_admin">
        <input
          onChange={handleInputChange}
          type="text"
          name="search"
          placeholder="Search Materialin Details"
          style={{
            borderRadius: "8px",
            padding: "10px",
            marginRight: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        />
      </div>

      
      <div>
        <label style={{ fontSize: "20px" }}>Filter by SupplierID:</label>
        <br />
        <input
          type="radio"
          id="filterAllSupplierIDs"
          name="filterSupplierID"
          value="All"
          checked={filterSupplierID === "All"}
          onChange={() => setFilterSupplierID("All")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterAllSupplierIDs" style={{ marginRight: "10px" }}>All</label>
        <input
          type="radio"
          id="filterS001"
          name="filterSupplierID"
          value="S001"
          checked={filterSupplierID === "S001"}
          onChange={() => setFilterSupplierID("S001")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterS001" style={{ marginRight: "10px" }}>S001</label>
        <input
          type="radio"
          id="filterS002"
          name="filterSupplierID"
          value="S002"
          checked={filterSupplierID === "S002"}
          onChange={() => setFilterSupplierID("S002")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterS002" style={{ marginRight: "10px" }}>S002</label>
        <input
          type="radio"
          id="filterS003"
          name="filterSupplierID"
          value="S003"
          checked={filterSupplierID === "S003"}
          onChange={() => setFilterSupplierID("S003")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterS003">S003</label>
      </div>

      <br/>

      {noResults ? (
        <div>
          <p>No Materialins Found</p>
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th onClick={handleSort} style={{ cursor: "pointer" }}>
                MaterialinID {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th>SupplierID</th>
                <th>Date</th>
                <th>Gold</th>
                <th>Silver</th>
                <th>Pladium</th>
                <th>Platinum</th>
                <th>Thai Ruby</th>
                <th>Burmese Ruby</th>
                <th>Blue Sapphire</th>
                <th>Blood Diamond</th>
                <th>Regent Diamond</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {showAll ? (
                materialins.map((materialin, i) => (
                  <Materialin key={i} materialin={materialin} />
                ))
              ) : (
                paginateMaterialins().map((materialin, i) => (
                  <Materialin key={i} materialin={materialin} />
                ))
              )}
            </tbody>
          </table>
          <PDFDownloadLink document={
            <Document>
              <Page size="A4" style={styles.page}>
                <Text style={styles.heading}>Diamonds.lk-Jewelry Manufacture and Management System<br/><br/></Text>
                <View style={styles.row}>
                  <Text style={styles.cell}>MaterialinID</Text>
                  <Text style={styles.cell}>SupplierID</Text>
                  <Text style={styles.cell}>Date</Text>
                  <Text style={styles.cell}>Gold</Text>
                  <Text style={styles.cell}>Silver</Text>
                  <Text style={styles.cell}>Pladium</Text>
                  <Text style={styles.cell}>Platinum</Text>
                  <Text style={styles.cell}>Thai Ruby</Text>
                  <Text style={styles.cell}>Burmese Ruby</Text>
                  <Text style={styles.cell}>Blue Sapphire</Text>
                  <Text style={styles.cell}>Blood Diamond</Text>
                  <Text style={styles.cell}>Regent Diamond</Text>
                  <Text style={styles.cell}>Value</Text>
                </View>
                {showAll ? (
                  materialins.map((materialin, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.cell}>{materialin && materialin.materialinID}</Text>
                      <Text style={styles.cell}>{materialin && materialin.supplierID}</Text>
                      <Text style={styles.cell}>{materialin && materialin.date}</Text>
                      <Text style={styles.cell}>{materialin && materialin.gold}</Text>
                      <Text style={styles.cell}>{materialin && materialin.silver}</Text>
                      <Text style={styles.cell}>{materialin && materialin.pladium}</Text>
                      <Text style={styles.cell}>{materialin && materialin.platinum}</Text>
                      <Text style={styles.cell}>{materialin && materialin.thairuby}</Text>
                      <Text style={styles.cell}>{materialin && materialin.burmeseruby}</Text>
                      <Text style={styles.cell}>{materialin && materialin.bluesapphire}</Text>
                      <Text style={styles.cell}>{materialin && materialin.blooddiamond}</Text>
                      <Text style={styles.cell}>{materialin && materialin.regentdiamond}</Text>
                      <Text style={styles.cell}>{materialin && materialin.value}</Text>
                    </View>
                  ))
                ) : (
                  paginateMaterialins().map((materialin, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.cell}>{materialin && materialin.materialinID}</Text>
                      <Text style={styles.cell}>{materialin && materialin.supplierID}</Text>
                      <Text style={styles.cell}>{materialin && materialin.date}</Text>
                      <Text style={styles.cell}>{materialin && materialin.gold}</Text>
                      <Text style={styles.cell}>{materialin && materialin.silver}</Text>
                      <Text style={styles.cell}>{materialin && materialin.pladium}</Text>
                      <Text style={styles.cell}>{materialin && materialin.platinum}</Text>
                      <Text style={styles.cell}>{materialin && materialin.thairuby}</Text>
                      <Text style={styles.cell}>{materialin && materialin.burmeseruby}</Text>
                      <Text style={styles.cell}>{materialin && materialin.bluesapphire}</Text>
                      <Text style={styles.cell}>{materialin && materialin.blooddiamond}</Text>
                      <Text style={styles.cell}>{materialin && materialin.regentdiamond}</Text>
                      <Text style={styles.cell}>{materialin && materialin.value}</Text>
                    </View>
                  ))
                )}
              </Page>
            </Document>
          } fileName="materialin_report.pdf">
            {({ blob, url, loading, error }) => (
              <button disabled={loading}>{loading ? 'Generating PDF...' : 'Download PDF'}</button>
            )}
          </PDFDownloadLink>
          <button onClick={handleViewAll}>View All</button>
        </div>
      )}
      <br />
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || noResults}
        >
          Next
        </button>
      </div>
      <br />
    </div>
    </div>
    </div>
  );
}

export default Materialins;
