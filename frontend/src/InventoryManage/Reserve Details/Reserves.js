import NavR from "../NavR/NavR.js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Reserve from "../Reserve/Reserve.js";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar.js";

const URL = "http://localhost:8070/reserves";
const RESERVES_PER_PAGE = 5;

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
    fontWeight: 'bold', 
    fontSize: 10, // Set the font size here
  },
});

function Reserves() {
  const [reserves, setReserves] = useState([]);
  const [filteredReserves, setFilteredReserves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order
  const [showAll, setShowAll] = useState(false); // State to track whether to show all data
  const [filterStatus, setFilterStatus] = useState("All"); // State to track filter status

  useEffect(() => {
    fetchHandler().then((data) => {
      setReserves(data.reserves);
      setFilteredReserves(data.reserves.filter(reserve => reserve.status === filterStatus || filterStatus === "All"));
      setTotalPages(Math.ceil(data.reserves.length / RESERVES_PER_PAGE));
    });
  }, [filterStatus]);

  const handleSearch = (query) => {
    const filtered = reserves.filter((reserve) => {
      return (
        Object.values(reserve).some((val) =>
          val.toString().toLowerCase().includes(query.toLowerCase())
        ) &&
        (filterStatus === "All" || reserve.status === filterStatus)
      );
    });
    setFilteredReserves(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / RESERVES_PER_PAGE));
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
    const sortedReserves = [...filteredReserves].sort((a, b) => {
      const nameA = a.reserveID.toLowerCase();
      const nameB = b.reserveID.toLowerCase();
      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    setFilteredReserves(sortedReserves);
    setSortOrder((order) => (order === "asc" ? "desc" : "asc")); // Toggle sorting order
  };

  const paginateReserves = () => {
    const startIndex = (currentPage - 1) * RESERVES_PER_PAGE;
    const endIndex = startIndex + RESERVES_PER_PAGE;
    return filteredReserves.slice(startIndex, endIndex);
  };

  const handleViewAll = () => {
    setShowAll(true); // Set showAll state to true to display all data
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div >
      <NavR />
      <center>
        <h1>Reserve Details Display Page</h1>
      </center>

      <div style={{ textAlign: "center" }}>
        <input
          onChange={handleInputChange}
          type="text"
          name="search"
          placeholder="Search Reserve Details"
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
        <label style={{ fontSize: "20px" }}>Filter by Status:</label>
        <br />
        <input
          type="radio"
          id="filterAll"
          name="filterStatus"
          value="All"
          checked={filterStatus === "All"}
          onChange={() => setFilterStatus("All")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterAll" style={{ marginRight: "10px" }}>All</label>
        <input
          type="radio"
          id="filterDelivered"
          name="filterStatus"
          value="Delivered"
          checked={filterStatus === "Delivered"}
          onChange={() => setFilterStatus("Delivered")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterDelivered" style={{ marginRight: "10px" }}>Delivered</label>
        <input
          type="radio"
          id="filterNotDelivered"
          name="filterStatus"
          value="Not Delivered"
          checked={filterStatus === "Not Delivered"}
          onChange={() => setFilterStatus("Not Delivered")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterNotDelivered">Not Delivered</label>
      </div>

      <br />

      {noResults ? (
        <div>
          <p>No Reserves Found</p>
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>              
                <th onClick={handleSort} style={{ cursor: "pointer" }}>
                  ReserveID {sortOrder === "asc" ? "↑" : "↓"} {/* Display arrow based on sorting order */}
                </th>
                <th>OrderID</th>
                <th>ProductID</th>
                <th>Quantity</th>              
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {showAll ? (
                // Render all reserves if showAll is true
                reserves.map((reserve, i) => (
                  <Reserve key={i} reserve={reserve} />
                ))
              ) : (
                // Otherwise, paginate the reserves
                paginateReserves().map((reserve, i) => (
                  <Reserve key={i} reserve={reserve} />
                ))
              )}
            </tbody>
          </table>
          <PDFDownloadLink document={
            <Document>
              <Page size="A4" style={styles.page}>
                <Text style={styles.heading}>Diamonds.lk-Jewelry Manufacture and Management System<br/><br/></Text>
                <View style={styles.row}>
                  <Text style={styles.cell}>ReserveID</Text>
                  <Text style={styles.cell}>OrderID</Text>
                  <Text style={styles.cell}>ProductID</Text>
                  <Text style={styles.cell}>Quantity</Text>
                  <Text style={styles.cell}>Description</Text>
                  <Text style={styles.cell}>Status</Text>
                </View>
                {showAll ? (
                  // Render all reserves if showAll is true
                  reserves.map((reserve, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.cell}>{reserve.reserveID}</Text>
                      <Text style={styles.cell}>{reserve.orderID}</Text>
                      <Text style={styles.cell}>{reserve.productID}</Text>
                      <Text style={styles.cell}>{reserve.quantity}</Text>
                      <Text style={styles.cell}>{reserve.description}</Text>
                      <Text style={styles.cell}>{reserve.status}</Text>
                    </View>
                  ))
                ) : (
                  // Otherwise, paginate the users
                  paginateReserves().map((reserve, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.cell}>{reserve.reserveID}</Text>
                      <Text style={styles.cell}>{reserve.orderID}</Text>
                      <Text style={styles.cell}>{reserve.productID}</Text>
                      <Text style={styles.cell}>{reserve.quantity}</Text>
                      <Text style={styles.cell}>{reserve.description}</Text>
                      <Text style={styles.cell}>{reserve.status}</Text>
                    </View>
                  ))
                )}
              </Page>
            </Document>
          } fileName="reserve_report.pdf">
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

export default Reserves;
