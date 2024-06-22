
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React,{useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
/***************************************Customize*********************************************** */

import Homecuss from './Customize/Components/HomeCuss';
import CusDetails from './Customize/Components/CusDetails/CusDetails';
import AddCuss from './Customize/Components/AddCuss/AddCuss';
import UpdateCuss from './Customize/Components/UpdateCuss/UpdateCuss';
import Video from "./Customize/Components/Video";
import Room from "./Customize/Components/Room";
import AddApps from './Customize/Components/AddApps/AddApps';
import AppDetails from './Customize/Components/AppDetails/AppDetails';
import UpdateApps from './Customize/Components/UpdateApps/UpdateApps';

/***************************************Order*********************************************** */
import OrderHome from './Order/OrderHome';
import OrderDetails from './Order/OrderDetails/OrderDetails';
import AddOrders from './Order/AddOrders/AddOrders';
import UpdateOrder from './Order/UpdateOrder/UpdateOrder';



/***************************************Employee*********************************************** */


import HomeEmp from "./Employee/Containers/EmployeePersonal/HomeEmp";
import Register from "./Employee/Containers/EmployeePersonal/RegisterEmp";
import Edit from "./Employee/Containers/EmployeePersonal/EditEmp";
import Profile from "./Employee/Containers/EmployeePersonal/ProfileEmp";

import EmpDashboard from "./Employee/Containers/EmpDashboard/EmpDashboard"
import HomeWorkHistory from "./Employee/Containers/WorkHistory/HomeWorkHistory"
import AddWorkHistory from "./Employee/Containers/WorkHistory/AddWorkHistory"
import ViewWorkHistory from "./Employee/Containers/WorkHistory/ViewWorkHistory"
import UpdateWorkHistory from "./Employee/Containers/WorkHistory/UpdateWorkHistory"

import HomeAttendance from "./Employee/Containers/Attendance/HomeAttendance"
import AddAttendance from "./Employee/Containers/Attendance/AddAttendance"
import ViewAttendance from "./Employee/Containers/Attendance/ViewAttendance"
import UpdateAttendance from "./Employee/Containers/Attendance/UpdateAttendance"

import EmpMailer from "./Employee/Containers/Mailers/EmpMailer"

import HomeLeave from "./Employee/Containers/Leaves/HomeLeave"
import AddLeave from "./Employee/Containers/Leaves/AddLeave"
import UpdateLeave from "./Employee/Containers/Leaves/UpdateLeave"
/************************************Finance************************************************ */
import Finance from './Finance/Pages/Finance'
/************************************Payment************************************************ */

import Checkout from './Payment/checkout';
import TrackOrder from './Payment/trackOrder';
import PaymentHistory from './Payment/paymentHistory';
import TrackingAdmin from './Payment/trackingAdmin';
import PaymentAdmin from './Payment/paymentAdmin';


/**********************************User************************************************* */
import Mailer from "./User/Components/Layout/Mailer";
import AdminDashboard from './User/Containers/ProfileManagement/AdminDashboard';
/*******************************Showcase*************************************** */
import AdminSignUp from './User/Containers/Signup/AdminSignUp';
import VeiwRMproducts from './Components/readyMadeProducts/VeiwRproducts';
import LanchingScreen from './Screens/LanchingScreen';
import Home from './Screens/Home/Home';
import ReadymadeProducts from './Components/readyMadeProducts/readyMadeProducts';
import Showcase from './Components/Showcase/Showcase';
import AddRShowProducts from './Components/Showcase/ShowcaseProducts/AddShowcaseProducts';
import AddRMtoShow from './Components/Showcase/ShowcaseProducts/AddRMtoShow';
import AllShowcaseItems from './Components/Showcase/ShowcaseProducts/AllShowCaseProducts';
import UpdateShowcaseProduct from './Components/Showcase/ShowcaseProducts/UpdateShowcaseProduct';
import VeiwJewelerryItem from './Components/Showcase/ShowcaseProducts/Veiws/VeiwJewelryItem';
import AdminMain from './Screens/AdminMainPage';
import OnboardingScreen from './Screens/OnboardingScreen';
import ShowcaseReportGen from './Components/Showcase/ShocaseReport';
import CartComponent from './Components/Showcase/Cart/Cart';
import CompareView from './Components/Showcase/ShowcaseProducts/Veiws/CompareView';
import LoginScreen from './Screens/LoginScreen';
import Collections from './Components/Showcase/Collections';
import AdminHome from './Components/Admin/AdminHome';
import ShowcaseCategories from './Components/Showcase/Collections/ShowcaseCategories';
import Signin from './User/Containers/Signin';
import Signup  from './User/Containers/Signup';
import { isUserLoggedIn } from './User/actions';
/*******************************Showcase*************************************** */
/*******************************Inventory*************************************** */

import Inventory from "./InventoryManage/Inventory/Inventory";
import AddMaterial from "./InventoryManage/Add Material/AddMaterial";
import Materials from "./InventoryManage/Material Details/Materials";
import UpdateMaterial from "./InventoryManage/UpdateMaterial/UpdateMaterial";




import AddSupplier from "./InventoryManage/Add Supplier/AddSupplier";
import Suppliers from "./InventoryManage/Supplier Details/Suppliers";
import UpdateSupplier from "./InventoryManage/UpdateSupplier/UpdateSupplier";

import AddReserve from "./InventoryManage/Add Reserve/AddReserve";
import Reserves from "./InventoryManage/Reserve Details/Reserves";
import UpdateReserve from "./InventoryManage/UpdateReserve/UpdateReserve";

import AddMaterialout from "./InventoryManage/Add Materialout/AddMaterialout";
import Materialouts from "./InventoryManage/Materialout Details/Materialouts";
import UpdateMaterialout from "./InventoryManage/UpdateMaterialout/UpdateMaterialout";

import AddMaterialin from "./InventoryManage/Add Materialin/AddMaterialin";
import Materialins from "./InventoryManage/Materialin Details/Materialins";
import UpdateMaterialin from "./InventoryManage/UpdateMaterialin/UpdateMaterialin";

/*******************************Inventory*************************************** */


function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = window.localStorage.getItem('token');
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
   
    }
  }, []);


  return (


<div>

 <Routes>


  {/************************************Customize************************************************ */}
 
          <Route path="/cushome" element={<Homecuss />} />
          <Route path="/AddCuss" element={<AddCuss />} />
          <Route path="/CusDetails" element={<CusDetails />} />
          <Route path="/CusDetails/:id" element={<UpdateCuss />} />
          <Route path="/Video" element={<Video />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/AddApps" element={<AddApps />} />
          <Route path="/AppDetails" element={<AppDetails />} />
          <Route path="/AppDetails/:id" element={<UpdateApps />} />

 {/************************************Order************************************************ */}

          <Route path="/Orderhome" element={<OrderHome/>}/>
          <Route path="/AddOrders" element={<AddOrders/>}/>
          <Route path="/OrderDetails" element={<OrderDetails/>}/>
          <Route path="/OrderDetails/:id" element={<UpdateOrder/>}/>
 {/************************************Employee************************************************ */}

 <Route path='/emp' element={<EmpDashboard />} />

<Route path='/homeemp' element={<HomeEmp />} />
<Route path='/registeremp' element={<Register />} />
<Route path='/editemp/:id' element={<Edit />} />
<Route path='/empprofile/:id' element={<Profile />} />

<Route path='/addwork' element={<AddWorkHistory />} />
<Route path='/workhistory' element={<HomeWorkHistory />} />
<Route path='/viewworkhistory/:id' element={<ViewWorkHistory />} />
<Route path='/updateworkhistory/:id' element={<UpdateWorkHistory />} />

<Route path='/attendance' element={<HomeAttendance />} />
<Route path='/addattendance' element={<AddAttendance />} />
<Route path='/viewattendance/:id' element={<ViewAttendance />} />
<Route path='/updateatt/:id' element={<UpdateAttendance />} />

<Route path='/empmails' element={<EmpMailer />} />

<Route path='/addleave' element={<AddLeave />} />
<Route path='/leave' element={<HomeLeave />} />
<Route path='/updateleave/:id' element={<UpdateLeave />} />



 {/************************************Finance************************************************ */}
<Route path="/finance" element={<Finance />} />
 {/************************************Payment************************************************ */}
 <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderTracking" element={<TrackOrder />} />
          <Route path="/paymentHistory" element={<PaymentHistory />} />
          <Route path="/trackingAdmin" element={<TrackingAdmin />} />
          <Route path="/paymentAdmin" element={<PaymentAdmin />} />



  {/****************************Profile*********************************** */}
  <Route path='/manageProfile' exact Component={AdminDashboard}/>   
  <Route path="/sendmails" element={<Mailer/>}/>
   

  {/***************************Showcase******************************* */}
  <Route path='/signupAdmin' exact Component={AdminSignUp}/>
 <Route path='/signup' exact Component={Signup}/>
 <Route path='/signin' exact Component={Signin}/>
 <Route path='/cart' exact Component={CartComponent}/>
 <Route path='/compare' exact Component={CompareView}/> 
 <Route path='/report' exact Component={ShowcaseReportGen}/> 
 <Route path='/show/view/:id' exact Component={VeiwJewelerryItem}/>
 <Route path='/show/update/:id' exact Component={UpdateShowcaseProduct}/>
 <Route path='/show/View' exact Component={AllShowcaseItems}/>
 <Route path='/show/Cat' exact Component={ShowcaseCategories}/>
 <Route path='/show/add' exact Component={AddRMtoShow}/>
 <Route path='/show/addP/:id' exact Component={AddRShowProducts}/>

  <Route path='/show' exact Component={Showcase}/>
  <Route path='/RMP/update/:id' exact Component={VeiwRMproducts}/>
<Route path='/RMP' exact Component={ReadymadeProducts}/>
{/***************************Showcase******************************* */}

{/***************************Inventory******************************* */}
<Route path="/inventory" element={<Inventory/>}/>
          <Route path="/maininventory" element={<Inventory/>}/>
          <Route path="/addmaterial" element={<AddMaterial/>}/>
          <Route path="/materialdetails" element={<Materials/>}/>
          <Route path="/materialdetails/:id" element={<UpdateMaterial/>}/>

       

          <Route path="/addsupplier" element={<AddSupplier/>}/>
          <Route path="/supplierdetails" element={<Suppliers/>}/>
          <Route path="/supplierdetails/:id" element={<UpdateSupplier/>}/>

          <Route path="/addreserve" element={<AddReserve/>}/>
          <Route path="/reservedetails" element={<Reserves/>}/>
          <Route path="/reservedetails/:id" element={<UpdateReserve/>}/>

          <Route path="/addmaterialout" element={<AddMaterialout/>}/>
          <Route path="/materialoutdetails" element={<Materialouts/>}/>
          <Route path="/materialoutdetails/:id" element={<UpdateMaterialout/>}/>

          <Route path="/addmaterialin" element={<AddMaterialin/>}/>
          <Route path="/materialindetails" element={<Materialins/>}/>
          <Route path="/materialindetails/:id" element={<UpdateMaterialin/>}/>

{/***************************Inventory******************************* */}



<Route path='/admin' exact Component={AdminHome}/>
<Route path='/home/collection' exact Component={Collections}/>
<Route path='/home' exact Component={Home}/>

<Route path='/3' exact Component={OnboardingScreen}/>
<Route path='/1' exact Component={LoginScreen}/>
<Route path="/logged" element={user && (user.role=='customer')? <Navigate to="/home" />:user && (user.role=='admin')? <Navigate to="/admin" />:<LanchingScreen/>} />
<Route path='/' element={token && user ? <Navigate to="/logged" /> : <LanchingScreen/>}/>

 </Routes>
</div>


   
  );
}

export default App;
