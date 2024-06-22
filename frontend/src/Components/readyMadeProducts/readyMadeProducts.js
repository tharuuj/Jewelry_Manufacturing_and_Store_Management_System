import React,{useState,useEffect} from "react";
import axios from "axios";
import AdminSideBar from "../Admin/AdminComponents/AdminSideBar";
import ShowReadyMadeproducts from "./ShowReadyM";
import AddRProducts from "./AddRProducts";



export default function ReadymadeProducts(props){
    const {isadd}=props;
   


const[isAdd,setisadd]=useState(isadd);


const [RMproduct,setRMproduct]=useState([]);


useEffect(()=>{

   
    setisadd(isadd);

    console.log(isAdd);

    function getRMProducts(){
        axios.get("http://localhost:8070/RMitem/").then((res)=>{

            setRMproduct(res.data);

          
        }).catch((err)=>{

            alert(err);
        })


    }

    getRMProducts();
    


},[isadd])

return(


<div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">
{isAdd?<div>
    <h1>Add Item to showcase</h1>
    <hr></hr>
    <h1>Ready made Products</h1>
    <ShowReadyMadeproducts product={RMproduct} isadd={isAdd}/>


    </div>

:<div>
    

    <h1>Add Ready Made Products</h1>
<AddRProducts/>
    <hr/>
    
     <h1>Ready made Products</h1>
    <ShowReadyMadeproducts product={RMproduct} isadd={isAdd}/>
    
    </div>}
   
     
    </div>
</div>


        
      
      




    


)


}