import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

export default function SideBArAdmin(){


return(

<div>

<nav className="navbar navbar-expand-lg " style={{background:'linear-gradient(to left, #000000, #ffd700)',height:'80px'}}>
   
    <div className="container-fluid" style={{background:'transparent',fontSize:'22px'}}>
  
        <a className="navbar-brand" href="#" style={{fontSize:'37px',color:'black'}}>Diamonds.LK</a>

      
        <ul className="navbar-nav d-flex flex-row me-1">
      
        <li className="nav-item me-3 me-lg-0">
                <Link className="nav-link text-white" to="/2"><i className="fas fa-home mx-1"></i>Home</Link>
            </li>
            <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink  text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fas fa-cubes mx-1"></i>Inventory Management
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{backgroundColor:'gold'}}>
            <li ><Link className="dropdown-item" to="/RMP" style={{color:'black'}} >Add Readymade Items</Link></li>
            <li ><Link className="dropdown-item" href="#" style={{color:'black'}} >Veiw Readymade Items</Link></li>
       
          
            <li></li>
          </ul>
        </li>
          
            <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink  text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fas fa-tv mx-1"></i> ShowCase management
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{backgroundColor:'gold'}}>
            <li ><Link className="dropdown-item" to="/show/add"  style={{color:'black'}} >Add Items to Showcase</Link></li>
            <li ><Link className="dropdown-item" to="/show/View" style={{color:'black'}} >Veiw Showcase Items</Link></li>
            <li ><Link className="dropdown-item" to="/report" style={{color:'black'}} >Genarate Showcase Report </Link></li>
            <li ><Link className="dropdown-item" to="#" style={{color:'black'}} >Add Showcase Categories</Link></li>
            <li ><Link className="dropdown-item" to="#" style={{color:'black'}} >Add Featured Lists</Link></li>
            <li ><Link className="dropdown-item" to="#" style={{color:'black'}} >Add Trendings </Link></li>
          
            <li></li>
          </ul>
        </li>
            <li className="nav-item me-3 me-lg-0">
                <Link className="nav-link text-white" to="/compare"><i className="fas fa-cog mx-1"></i> Settings</Link>
            </li>
            <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink  text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fas fa-user mx-1"></i>  More
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="#">Cart</a></li>
            <li><a className="dropdown-item" href="/RMP">Readymade Products</a></li>
            <li></li>
          </ul>
        </li>
        <li className="nav-item me-3 me-lg-0">
                <Link className="nav-link text-white" to="/"><i className="fas fa-sign-out mx-1"></i>SignOut</Link>
            </li>
            
        </ul>
    </div>

 
</nav>
<div>
    
</div>
</div>



)



}