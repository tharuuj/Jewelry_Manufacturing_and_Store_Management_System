import NavMO from "../NavMO/NavMO.js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Materialout from "../Materialout/Materialout.js";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar.js";

const URL = "http://localhost:8070/materialouts";
const MATERIALOUTS_PER_PAGE = 5;

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

function Materialouts() {
  const [materialouts, setMaterialouts] = useState([]);
  const [filteredMaterialouts, setFilteredMaterialouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showAll, setShowAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // State to hold the selected date

  useEffect(() => {
    fetchHandler().then((data) => {
      setMaterialouts(data.materialouts);
      setFilteredMaterialouts(data.materialouts);
      setTotalPages(Math.ceil(data.materialouts.length / MATERIALOUTS_PER_PAGE));
    });
  }, []);

  useEffect(() => {
    filterMaterialoutsByDate(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const filterMaterialoutsByDate = (date) => {
    if (!date) {
      setFilteredMaterialouts(materialouts);
      setTotalPages(Math.ceil(materialouts.length / MATERIALOUTS_PER_PAGE));
      setNoResults(false);
      return;
    }

    const filtered = materialouts.filter((materialout) => materialout.date === date);
    setFilteredMaterialouts(filtered);
    setTotalPages(Math.ceil(filtered.length / MATERIALOUTS_PER_PAGE));
    setNoResults(filtered.length === 0);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    handleSearch(query);
  };

  const handleSearch = (query) => {
    try {
      const filtered = materialouts.filter((materialout) => {
        return Object.values(materialout).some((val) =>
          val && val.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredMaterialouts(filtered);
      setCurrentPage(1);
      setTotalPages(Math.ceil(filtered.length / MATERIALOUTS_PER_PAGE));
      setNoResults(filtered.length === 0);
    } catch (error) {
      console.error("Error occurred during search:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = () => {
    const sortedMaterialouts = [...filteredMaterialouts].sort((a, b) => {
      const nameA = a.materialoutID.toLowerCase();
      const nameB = b.materialoutID.toLowerCase();
      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    setFilteredMaterialouts(sortedMaterialouts);
    setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
  };

  const paginateMaterialouts = () => {
    const startIndex = (currentPage - 1) * MATERIALOUTS_PER_PAGE;
    const endIndex = startIndex + MATERIALOUTS_PER_PAGE;
    return filteredMaterialouts.slice(startIndex, endIndex);
  };

  const handleViewAll = () => {
    setShowAll(true);
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div>
      <NavMO />
      <center>
        <h1>Materialout Details Display Page</h1>
      </center>

      <div style={{ textAlign: "center" }} className="searchbar_admin">
        <input
          onChange={handleInputChange}
          type="text"
          name="search"
          placeholder="Search Materialout Details"
          style={{
            borderRadius: "8px",
            padding: "10px",
            marginRight: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        />
        
        {/* Date Picker */}
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
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
          <p>No Materialouts Found</p>
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th onClick={handleSort} style={{ cursor: "pointer" }}>
                  MaterialoutID {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th>JobID</th>
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
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {showAll ? (
                materialouts.map((materialout, i) => (
                  <Materialout key={i} materialout={materialout} />
                ))
              ) : (
                paginateMaterialouts().map((materialout, i) => (
                  <Materialout key={i} materialout={materialout} />
                ))
              )}
            </tbody>
          </table>
          <PDFDownloadLink document={
            <Document>
              <Page size="A4" style={styles.page}>
                <Text style={styles.heading}>Diamonds.lk-Jewelry Manufacture and Management System<br/><br/></Text>
                <View style={styles.row}>
                  <Text style={styles.cell}>MaterialoutID</Text>
                  <Text style={styles.cell}>JobID</Text>
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
                  <Text style={styles.cell}>Description</Text>
                </View>
                {showAll ? (
                  materialouts.map((materialout, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.cell}>{materialout.materialoutID}</Text>
                      <Text style={styles.cell}>{materialout.JobID}</Text>
                      <Text style={styles.cell}>{materialout.date}</Text>
                      <Text style={styles.cell}>{materialout.gold}</Text>
                      <Text style={styles.cell}>{materialout.silver}</Text>
                      <Text style={styles.cell}>{materialout.pladium}</Text>
                      <Text style={styles.cell}>{materialout.platinum}</Text>
                      <Text style={styles.cell}>{materialout.thairuby}</Text>
                      <Text style={styles.cell}>{materialout.burmeseruby}</Text>
                      <Text style={styles.cell}>{materialout.bluesapphire}</Text>
                      <Text style={styles.cell}>{materialout.blooddiamond}</Text>
                      <Text style={styles.cell}>{materialout.regentdiamond}</Text>
                      <Text style={styles.cell}>{materialout.description}</Text>
                    </View>
                  ))
                ) : (
                  paginateMaterialouts().map((materialout, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.cell}>{materialout.materialoutID}</Text>
                      <Text style={styles.cell}>{materialout.JobID}</Text>
                      <Text style={styles.cell}>{materialout.date}</Text>
                      <Text style={styles.cell}>{materialout.gold}</Text>
                      <Text style={styles.cell}>{materialout.silver}</Text>
                      <Text style={styles.cell}>{materialout.pladium}</Text>
                      <Text style={styles.cell}>{materialout.platinum}</Text>
                      <Text style={styles.cell}>{materialout.thairuby}</Text>
                      <Text style={styles.cell}>{materialout.burmeseruby}</Text>
                      <Text style={styles.cell}>{materialout.bluesapphire}</Text>
                      <Text style={styles.cell}>{materialout.blooddiamond}</Text>
                      <Text style={styles.cell}>{materialout.regentdiamond}</Text>
                      <Text style={styles.cell}>{materialout.description}</Text>
                    </View>
                  ))
                )}
              </Page>
            </Document>
          } fileName="materialout_report.pdf">
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

export default Materialouts;
