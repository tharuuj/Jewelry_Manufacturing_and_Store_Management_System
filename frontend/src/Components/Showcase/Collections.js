import React,{useEffect,useState} from "react";
import './Collections.css'
import Header from "../Accsesories/Head&Foot/Header";
import Footer from "../Accsesories/Head&Foot/Footer";
import axios from "axios";



export default function Collections(){
  const [Show_category,setShowCategory]=useState([]);


  
const config = {
  headers: {
      "content-Type": "application/json",
     
  },
};

useEffect(()=>{
  
//get Category List
async function getAllCats(){

  await axios.get("http://localhost:8070/showcat/",config).then((res)=>{


   setShowCategory(res.data);


}).catch((err)=>{

   alert(err);
})

}

getAllCats();

},[])

return(

<div>
<Header/>
<div className="Collection">
   <h1>Our Collection</h1>
<div className="Itemcontainer">
   
    <div className="row">

    {Show_category.map((category,key)=>(
      
      
        <div className="col-md-3 col-sm-6" key={key}>
      
          
            <div className="product-grid3">
            <div class="container">
            <div
              class="front"
              style={{background: `url(${category.Cat_thumbnail})`,backgroundPosition:'center',objectFit:'cover',backgroundSize:'cover'}}
            >
              <div class="inner">
                <p>{category.type}</p>
               
               
                
              </div>
              <div className="mask"></div>
              
            </div>
         
            <div class="back">
              <div class="inner">
                <p>
                  {category.Cat_discrip}
                </p>
              </div>
            </div>
          </div>

          
              
              
               
            </div>
           
            
        </div>))}

    </div>




    </div>
    <Footer/>
</div>
</div>

)






}