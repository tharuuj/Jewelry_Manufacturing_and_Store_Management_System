import React from "react";
import Header from "../Accsesories/Head&Foot/Header";
import Footer from "../Accsesories/Head&Foot/Footer";
import ShowcaseItemGrid from "./ShowcaseProducts/Veiws/ShowcaseGridVeiw";




export default function Showcase(){



return(

<div>
    <Header active='show'/>
<ShowcaseItemGrid/>
<Footer/>

</div>

)


}