import React from "react";
import "./NavR.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Inventory">
      <ul className="home-ul">
        <li className="home-11">
          <Link to="/maininventory" className="active home-a">
            <h2>Inventory</h2>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/addreserve" className="active home-a">
            <h2>Add reserve</h2>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/reservedetails" className="active home-a">
            <h2>Reserve details</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
