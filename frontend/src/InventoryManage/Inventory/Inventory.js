import React from "react";
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar";
//import NavM from "../NavM/NavM.js"

//new
import { Link } from "react-router-dom";

function Inventory() {
  return (
    <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

    
    <div>

      <h1>Inventory Page</h1>

      <Link to="/materialdetails">
        <h1>Material Page</h1>
      </Link>

      <Link to="/materialindetails">
        <h1>Materialin Page</h1>
      </Link>

      <Link to="/materialoutdetails">
        <h1>Materialout Page</h1>
      </Link>

      {/* Product Page */}

      <Link to="/reservedetails">
        <h1>Reserve Page</h1>
      </Link>

      <Link to="/supplierdetails">
        <h1>Supplier Page</h1>
      </Link>
    </div>
    </div>
    </div>
  );
}

export default Inventory;
