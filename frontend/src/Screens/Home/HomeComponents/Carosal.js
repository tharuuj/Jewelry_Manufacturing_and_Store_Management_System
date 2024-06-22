import React from "react";
import './Carosal.css';
import Slider1 from '../HomeComponents/images-Home/Slider/shiny-gemstone-drop-necklace-black-background-generated-by-ai.jpg'
import Slider2 from '../HomeComponents/images-Home/Slider/shiny-gold-necklace-with-gemstone-drop-pendant-generated-by-ai.jpg'
import Slider3 from '../HomeComponents/images-Home/Slider/shiny-jewelry-collection-glistens-with-gold-gems-generated-by-ai.jpg'



export default function Carosal(){


return(

    <div className="CarosalMain">

<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={Slider1} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={Slider2} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={Slider3} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    </div>
)


}