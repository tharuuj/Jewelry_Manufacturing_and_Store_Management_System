import React from "react";

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
          <Link to="/addmaterialin" className="active home-a">
            <h2>Add materialin</h2>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/materialindetails" className="active home-a">
            <h2>Materialin details</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
