import React from "react";
import './OnboardingScreen.css'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import logo from '../Components/Accsesories/Images/Logo.png';
import MainLogo from '../Components/Accsesories/Images/MainLogo.png'
import Sigin from '../User/Containers/Signin';

export default function LoginScreen(){

return(

<div className="login">
<div id="guest" class="split design-section">
</div>
<div className="Inner1"><div className="LeftSpan">
    <img src={MainLogo}/>
    <div class='text-content'>
      <div class="bold">You want</div>
      <div class='big'>As a Guest</div>
    </div>
<Link to="/home"><button >
      As a Guest
    </button></Link>
   
  </div></div>
<div className="amp"><img src={logo} className="logo"></img></div>

<div className="Inner2"><div className="LeftSpan">
  <Sigin/>
    </div>
  </div>


<div id="Admin" class="split dev-section">
 
</div>






</div>


)





}