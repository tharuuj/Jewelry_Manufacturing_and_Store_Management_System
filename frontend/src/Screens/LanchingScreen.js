import React from "react";
import { useNavigate } from "react-router-dom";
import "./LaunchingScreen.css"
import mainlogo from '../Components/Accsesories/Images/MainLogo.png'




export default function LanchingScreen(){

    const navigate=useNavigate();
 

return(
<div className="LanchingScreen">
    <div className="titleSection">
	<img src={mainlogo}/>
	
	
	</div>

<div class="cols">
			<div class="col" ontouchstart="this.classList.toggle('hover');">
				<div class="container">
				<div className="front" style={{backgroundImage: `url(${require('../Components/Accsesories/Images/1.jpg')})`}}>

						<div class="inner">
							<p>Diligord</p>
              <span>Lorem ipsum</span>
						</div>
					</div>
					<div class="back" style={{backgroundImage: `url(${require('../Components/Accsesories/Images/1.jpg')})`}}>
						<div class="inner">
						  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
						</div>
					</div>
				</div>
			</div>


            <div class="col" ontouchstart="this.classList.toggle('hover');">
				<div class="container">
                <div className="front" style={{backgroundImage: `url(${require('../Components/Accsesories/Images/2.jpg')})`}}>
						<div class="inner">
							<p>Diligord</p>
              <span>Lorem ipsum</span>
						</div>
					</div>
					<div class="back" style={{backgroundImage: `url(${require('../Components/Accsesories/Images/2.jpg')})`}}>
						<div class="inner">
						  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
						</div>
					</div>
				</div>
			</div>


            <div class="col" ontouchstart="this.classList.toggle('hover');">
				<div class="container">
                <div className="front" style={{backgroundImage: `url(${require('../Components/Accsesories/Images/3.jpg')})`}}>
						<div class="inner">
							<p>Diligord</p>
              <span>Lorem ipsum</span>
						</div>
					</div>
					<div class="back" style={{backgroundImage: `url(${require('../Components/Accsesories/Images/3.jpg')})`}}>
						<div class="inner">
						  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
						</div>
					</div>
				</div>
			</div>


            
 </div>


<div className="Getstarted">
<a href="#" className="link-arrow font-reg" onClick={()=>{navigate("/1")}}><h1>Get started</h1></a>
</div>




</div>



)



}