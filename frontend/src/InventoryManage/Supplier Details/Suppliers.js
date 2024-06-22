import NavS from "../NavS/NavS.js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Supplier from "../Supplier/Supplier.js";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar.js";

const URL = "http://localhost:8070/suppliers";
const SUPPLIERS_PER_PAGE = 5;

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

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order
  const [showAll, setShowAll] = useState(false); // State to track whether to show all data

  useEffect(() => {
    fetchHandler().then((data) => {
      setSuppliers(data.suppliers);
      setFilteredSuppliers(data.suppliers);
      setTotalPages(Math.ceil(data.suppliers.length / SUPPLIERS_PER_PAGE));
    });
  }, []);

  const handleSearch = (query) => {
    const filtered = suppliers.filter((supplier) => {
      return Object.values(supplier).some((val) =>
        val.toString().toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredSuppliers(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / SUPPLIERS_PER_PAGE));
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
    const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
      const nameA = a.supplierID.toLowerCase();
      const nameB = b.supplierID.toLowerCase();
      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    setFilteredSuppliers(sortedSuppliers);
    setSortOrder((order) => (order === "asc" ? "desc" : "asc")); // Toggle sorting order
  };

  const paginateSuppliers = () => {
    const startIndex = (currentPage - 1) * SUPPLIERS_PER_PAGE;
    const endIndex = startIndex + SUPPLIERS_PER_PAGE;
    return filteredSuppliers.slice(startIndex, endIndex);
  };

  const handleViewAll = () => {
    setShowAll(true); // Set showAll state to true to display all data
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div >
      <NavS />
      <center>
        <h1>Supplier Details Display Page</h1>
      </center>

      <div style={{ textAlign: "center" }}>
        <input
          onChange={handleInputChange}
          type="text"
          name="search"
          placeholder="Search Supplier Details"
          style={{
            borderRadius: "8px",
            padding: "10px",
            marginRight: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        />
      </div>

      <br />

      {noResults ? (
        <div>
          <p>No Suppliers Found</p>
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th onClick={handleSort} style={{ cursor: "pointer" }}>
                SupplierID {sortOrder === "asc" ? "↑" : "↓"} {/* Display arrow based on sorting order */}
                </th>
                <th>Name</th>
                <th>NIC</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Bankdetails</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {showAll ? (
                // Render all suppliers if showAll is true
                suppliers.map((supplier, i) => (
                  <Supplier key={i} supplier={supplier} />
                ))
              ) : (
                // Otherwise, paginate the users
                paginateSuppliers().map((supplier, i) => (
                  <Supplier key={i} supplier={supplier} />
                ))
              )}
            </tbody>
          </table>
          <PDFDownloadLink document={
            <Document>
              <Page size="A4" style={styles.page}>
                <Text style={styles.heading}>Diamonds.lk-Jewelry Manufacture and Management System<br/><br/></Text>
                <View style={styles.row}>
                  <Text style={styles.cell}>SupplierID</Text>
                  <Text style={styles.cell}>Name</Text>
                  <Text style={styles.cell}>NIC</Text>
                  <Text style={styles.cell}>Email</Text>
                  <Text style={styles.cell}>Phone</Text>
                  <Text style={styles.cell}>Address</Text>
                  <Text style={styles.cell}>Bankdetails</Text>
                  <Text style={styles.cell}>Description</Text>
                </View>
                {showAll ? (
                  // Render all suppliers if showAll is true
                  suppliers.map((supplier, i) => (
                    <View key={i} style={styles.row}>
                    <Text style={styles.cell}>{supplier.supplierID}</Text>
                    <Text style={styles.cell}>{supplier.name}</Text>
                    <Text style={styles.cell}>{supplier.nic}</Text>
                    <Text style={styles.cell}>{supplier.email}</Text>
                    <Text style={styles.cell}>{supplier.phone}</Text>
                    <Text style={styles.cell}>{supplier.address}</Text>
                    <Text style={styles.cell}>{supplier.bankdetails}</Text>
                    <Text style={styles.cell}>{supplier.description}</Text>
                  </View>
                  ))
                ) : (
                  // Otherwise, paginate the users
                  paginateSuppliers().map((supplier, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.cell}>{supplier.supplierID}</Text>
                      <Text style={styles.cell}>{supplier.name}</Text>
                      <Text style={styles.cell}>{supplier.nic}</Text>
                      <Text style={styles.cell}>{supplier.email}</Text>
                      <Text style={styles.cell}>{supplier.phone}</Text>
                      <Text style={styles.cell}>{supplier.address}</Text>
                      <Text style={styles.cell}>{supplier.bankdetails}</Text>
                      <Text style={styles.cell}>{supplier.description}</Text>
                    </View>
                  ))
                )}
              </Page>
            </Document>
          } fileName="supplier_report.pdf">
            {({ blob, url, loading, error }) => (
              <button disabled={loading}>{loading ? 'Generating PDF...' : 'Download PDF'}</button>
            )}
          </PDFDownloadLink>
          <button onClick={handleViewAll}>View All</button> {/* Button to view all data */}
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
          disabled={currentPage === totalPages || noResults} // Disable button when there are no results
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

export default Suppliers;
