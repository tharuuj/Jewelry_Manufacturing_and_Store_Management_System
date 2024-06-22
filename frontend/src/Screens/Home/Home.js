import React from "react";
import './home.css'
import Header from "../../Components/Accsesories/Head&Foot/Header";
import Footer from "../../Components/Accsesories/Head&Foot/Footer";
import Carosal from "./HomeComponents/Carosal";
import LinkGrid from "./HomeComponents/LinkGrid";
export default function Home(){


 

return(
<div>
  
    <Header active='home'/>




<Carosal/>
    <LinkGrid/>


    <Footer/>
    


</div>



)



}