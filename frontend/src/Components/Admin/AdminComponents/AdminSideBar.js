import React,{useState} from "react";
import './AdminSideBar.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch ,useSelector} from "react-redux";
import { signout } from "../../../User/actions";
import logo from "../../Accsesories/Images/MainLogo.png"
import { useNavigate } from "react-router-dom";


export default function AdminSideBar(){
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const auth = useSelector((state) => state.auth);
  const logout = () => {
      dispatch(signout());
      navigate('/');

    };

return(

<div className="AdminSidebar">
<section class="app">
  <aside class="sidebar">
         <header>
      <img src={logo}></img>
      </header>
    <nav class="sidebar-nav">
 
      <ul>
        <li>
          <a href="#"><i class="fa-solid fa-shop"></i><span>Showcase Management</span></a>
          <ul class="nav-flyout">
            <li>
              <a href="/show/add"><i class="fa fa-plus" aria-hidden="true"></i>Add Items to Showcase</a>
            </li>
            <li>
              <a href="/show/View"><i class="fa-solid fa-list-check"></i>Manage Showcase</a>
            </li>
            <li>
              <a href="/show/Cat"><i class="fa fa-plus" aria-hidden="true"></i>Add Categories</a>
            </li>
            <li>
              <a href="/report"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Showcase Report</a>
            </li>
            <li>
              <a href="#"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Manage Ads</a>
            </li>
          </ul>

        </li>
        <li>
          <a href="/inventory"><i class="fa-solid fa-cubes"></i><span class="">Invenory Management</span></a>
          <ul class="nav-flyout">
            <li>
              <a href="/RMP"><i class="fa-solid fa-pen-ruler"></i>Add Readymade Items</a>
            </li>
            <li>
              <a href="/materialdetails"><i class="fa-brands fa-sketch"></i>Materiels</a>
            </li>
            <li>
              <a href="/materialindetails"><i class="fa-solid fa-box-open"></i>Materiels In</a>
            </li>
            <li>
              <a href="/materialoutdetails"><i class="fa-solid fa-square-up-right"></i>Materials Out</a>
            </li>
            <li>
              <a href="/reservedetails"><i class="fa-solid fa-box"></i>Reserves</a>
            </li>
            <li>
              <a href="/supplierdetails"><i class="fa-solid fa-dolly"></i>Suppliers</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#"><i class="fa-solid fa-address-card"></i><span class="">Profile Management</span></a>
          <ul class="nav-flyout">
          <li>
              <a href="/manageProfile"><i class="fa-regular fa-address-card"></i>Profiles</a>
            </li>
            <li>
              <a href="/signupAdmin"><i class="fa-sharp fa-solid fa-person-circle-plus"></i>Register Admins</a>
            </li>
           
            
          </ul>
        </li>
        <li>
          <a href="/Orderhome"><i class="fa-brands fa-stack-overflow"></i><span class="">Order Management</span></a>
          
        </li>
        <li>
          <a href="/finance"><i class="fa-solid fa-coins"></i> <span class="">Finance Management</span></a>
         
        </li>
        <li>
          <a href="/emp"><i class="fa-solid fa-users"></i><span class="">Employee Management</span></a>
         
        </li>
        <li onClick={logout}>
          <a href=""><i class="fa-solid fa-arrow-right-from-bracket"></i><span class="">SignOut</span></a>
        </li>
      </ul>
    </nav>
  </aside>
</section>


</div>


)



}