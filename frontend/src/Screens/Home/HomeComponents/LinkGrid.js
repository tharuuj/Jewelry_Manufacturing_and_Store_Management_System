import React from "react";
import './LinkGrid.css';
import { useNavigate } from "react-router-dom";


export default function LinkGrid(){
let navigate=useNavigate();
return(

<div className="LinkGrid">
<div class="container-box">
  <div class="box a" onClick={()=>{navigate('/cushome')}}><div class="box_inner">
  <div class='text-content'>
  
      <div class='big'>Customize</div>
    </div>
						</div></div>
  <div class="box b" onClick={()=>{navigate('/show')}}>
  <div class="box_inner">
  <div class='text-content'>
    
      <div class='big'>Showcase</div>
    </div>
						</div>
  </div>
  <div class="box c" onClick={()=>{navigate('/home/collection')}}><div class="box_inner">
  <div class='text-content'>
    
      <div class='big'>Collections</div>
    </div>
						</div></div>
  <div class="box d"><div class="box_inner">
  <div class='text-content'>
    
      <div class='big'>Trending</div>
    </div>
						</div></div>
  <div class="box e"><div class="box_inner">
  <div class='text-content'>
    
      <div class='big'>Gems</div>
    </div>
						</div></div>
  
</div>



</div>


)




}