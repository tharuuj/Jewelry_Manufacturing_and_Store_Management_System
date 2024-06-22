import NavM from "../NavM/NavM.js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Material from "../Material/Material.js";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar.js";
import "./Materials.css"

const URL = "http://localhost:8070/materials";
const MATERIALS_PER_PAGE = 5;

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

function Materials() {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order
  const [showAll, setShowAll] = useState(false); // State to track whether to show all data
  const [filterType, setFilterType] = useState("All"); // State to track filter type

  useEffect(() => {
    fetchHandler().then((data) => {
      setMaterials(data.materials);
      setFilteredMaterials(filterMaterialsByType(data.materials, filterType));
      setTotalPages(Math.ceil(data.materials.length / MATERIALS_PER_PAGE));
    });
  }, [filterType]);

  const handleSearch = (query) => {
    const filtered = materials.filter((material) => {
      return (
        Object.values(material).some((val) =>
          val.toString().toLowerCase().includes(query.toLowerCase())
        ) &&
        (filterType === "All" || material.type === filterType)
      );
    });
    setFilteredMaterials(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / MATERIALS_PER_PAGE));
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
    const sortedMaterials = [...filteredMaterials].sort((a, b) => {
      const nameA = a.materialID.toLowerCase();
      const nameB = b.materialID.toLowerCase();
      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    setFilteredMaterials(sortedMaterials);
    setSortOrder((order) => (order === "asc" ? "desc" : "asc")); // Toggle sorting order
  };

  const paginateMaterials = () => {
    const startIndex = (currentPage - 1) * MATERIALS_PER_PAGE;
    const endIndex = startIndex + MATERIALS_PER_PAGE;
    return filteredMaterials.slice(startIndex, endIndex);
  };

  const handleViewAll = () => {
    setShowAll(true); // Set showAll state to true to display all data
  };

  const filterMaterialsByType = (materials, type) => {
    if (type === "All") {
      return materials;
    } else {
      return materials.filter((material) => material.type === type);
    }
  };

  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    <div>
      <NavM />
      <center>
        <h1>Material Details Display Page</h1>
      </center>

      <div style={{ textAlign: "center" }} className="searchbar_admin">
        <input
          onChange={handleInputChange}
          type="text"
          name="search"
          placeholder="Search material Details"
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
        <label style={{ fontSize: "20px" }}>Filter by Type:</label>
        <br />
        <input
          type="radio"
          id="filterAllTypes"
          name="filterType"
          value="All"
          checked={filterType === "All"}
          onChange={() => setFilterType("All")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterAllTypes" style={{ marginRight: "10px" }}>All</label>
        <input
          type="radio"
          id="filterMetal"
          name="filterType"
          value="Metal"
          checked={filterType === "Metal"}
          onChange={() => setFilterType("Metal")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterMetal" style={{ marginRight: "10px" }}>Metal</label>
        <input
          type="radio"
          id="filterGem"
          name="filterType"
          value="Gem"
          checked={filterType === "Gem"}
          onChange={() => setFilterType("Gem")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterGem" style={{ marginRight: "10px" }}>Gem</label>
        <input
          type="radio"
          id="filterDiamond"
          name="filterType"
          value="Diamond"
          checked={filterType === "Diamond"}
          onChange={() => setFilterType("Diamond")}
          style={{ fontSize: "20px" }}
        />
        <label htmlFor="filterDiamond">Diamond</label>
      </div>

      <br />

      {noResults ? (
        <div>
          <p>No Materials Found</p>
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th onClick={handleSort} style={{ cursor: "pointer" }}>
                  MaterialID {sortOrder === "asc" ? "↑" : "↓"} {/* Display arrow based on sorting order */}
                </th>
                <th>Name</th>
                <th>Type</th>
                <th>Grade</th>
                <th>SupplierID</th>
                <th>Unit</th>
                <th>Unitweight</th>
                <th>Unitcost</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Margin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {showAll ? (
                // Render all materials if showAll is true
                materials.map((material, i) => (
                  <Material key={i} material={material} />
                ))
              ) : (
                // Otherwise, paginate the materials
                paginateMaterials().map((material, i) => (
                  <Material key={i} material={material} />
                ))
              )}
            </tbody>
          </table>
          <PDFDownloadLink document={
            <Document>
              <Page size="A4" style={styles.page}>
                <Text style={styles.heading}>Diamonds.lk-Jewelry Manufacture and Management System<br/><br/></Text>
                <View style={styles.row}>
                  <Text style={styles.cell}>MaterialID</Text>
                  <Text style={styles.cell}>Name</Text>
                  <Text style={styles.cell}>Type</Text>
                  <Text style={styles.cell}>Grade</Text>
                  <Text style={styles.cell}>SupplierID</Text>
                  <Text style={styles.cell}>Unit</Text>
                  <Text style={styles.cell}>Unitweight</Text>
                  <Text style={styles.cell}>Unitcost</Text>
                  <Text style={styles.cell}>Quantity</Text>
                  <Text style={styles.cell}>Description</Text>
                  <Text style={styles.cell}>Margin</Text>
                </View>
                {showAll ? (
                  // Render all materials if showAll is true
                  materials.map((material, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.cell}>{material.materialID}</Text>
                      <Text style={styles.cell}>{material.name}</Text>
                      <Text style={styles.cell}>{material.type}</Text>
                      <Text style={styles.cell}>{material.grade}</Text>
                      <Text style={styles.cell}>{material.supplierID}</Text>
                      <Text style={styles.cell}>{material.unit}</Text>
                      <Text style={styles.cell}>{material.unitweight}</Text>
                      <Text style={styles.cell}>{material.unitcost}</Text>
                      <Text style={styles.cell}>{material.quantity}</Text>
                      <Text style={styles.cell}>{material.description}</Text>
                      <Text style={styles.cell}>{material.margin}</Text>
                    </View>
                  ))
                ) : (
                  // Otherwise, paginate the materials
                  paginateMaterials().map((material, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.cell}>{material.materialID}</Text>
                      <Text style={styles.cell}>{material.name}</Text>
                      <Text style={styles.cell}>{material.type}</Text>
                      <Text style={styles.cell}>{material.grade}</Text>
                      <Text style={styles.cell}>{material.supplierID}</Text>
                      <Text style={styles.cell}>{material.unit}</Text>
                      <Text style={styles.cell}>{material.unitweight}</Text>
                      <Text style={styles.cell}>{material.unitcost}</Text>
                      <Text style={styles.cell}>{material.quantity}</Text>
                      <Text style={styles.cell}>{material.description}</Text>
                      <Text style={styles.cell}>{material.margin}</Text>
                    </View>
                  ))
                )}
              </Page>
            </Document>
          } fileName="material_report.pdf">
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

export default Materials;
