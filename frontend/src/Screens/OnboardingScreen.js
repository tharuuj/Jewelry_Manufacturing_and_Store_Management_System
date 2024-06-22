import React from "react";
import { Link } from "react-router-dom";

import Footer from "../Components/Accsesories/Head&Foot/Footer";
import Header from "../Components/Accsesories/Head&Foot/Header";
import ShowcaseItemGrid from "../Components/Showcase/ShowcaseProducts/Veiws/ShowcaseGridVeiw";


export default function OnboardingScreen(){

return(
<div className="onBoard">
	<Header/>
	<ShowcaseItemGrid/>

<Footer/>
</div>




)



}