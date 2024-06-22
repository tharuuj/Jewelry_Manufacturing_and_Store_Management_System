import React,{useState,useEffect, useRef} from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import {useReactToPrint} from "react-to-print";
import AdminSideBar from "../Admin/AdminComponents/AdminSideBar";



export default function ShowcaseReportGen(){


    const navigate=useNavigate();
   
    const[ShowcaseProducts,setShowcaseProducts]=useState([]);
    
    useEffect(()=>{
    
    
      
    
        function getShowCaseProducts(){
            axios.get("http://localhost:8070/showCitem/fetchAll").then((res)=>{
    
                setShowcaseProducts(res.data);
    
              
            }).catch((err)=>{
    
                alert(err);
            })
    
    
        }
    
        getShowCaseProducts();
        
    
    
    },[])

    //report genaration
    const ComponenntReferance=useRef();
    const printHandler=useReactToPrint({
        content:()=>ComponenntReferance.current,
        documentTitle:"Showcase Report",
        onAfterPrint:()=>alert("The Report Succsesfully Generated & Downloaded!")


    })

return(

<div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">
    <button onClick={printHandler}>Download Report PDF</button>
    
<div ref={ComponenntReferance}>
    <h1>Total Products Count : {ShowcaseProducts.length}</h1>
    <table className="table" >
<thead>
  <tr>
    <th scope="col">Title</th>
    <th scope="col">Brief</th>
    <th scope="col">Discrip</th>
    <th scope="col">Item Name</th>
      <th scope="col">Category</th>
        <th scope="col">materiel</th>
        <th scope="col">Stocks</th>
        <th scope="col">feature</th>
        <th scope="col">Thumb</th>
       
       
          
  </tr>
</thead>
<tbody>
{ShowcaseProducts.map((product,key)=>(

<tr key={key}>
   
<td>{product.Title}</td>
<td>{product.brief}</td>
<td>{product.discrip}</td>
<td>{product.Item.item_name}</td>
<td>{product.Show_category.type}</td>
<td>{product.Item.materiel}</td>
<td>{product.Item.stock_count}</td>
<td>{product.featuredList.FL_type}</td>
<td><img src={`${product.showThumb_img}`} style={{ width: '200px', height: '200px', objectFit: 'cover' ,borderRadius:'50%'}}/></td>
<td>{product.ratings}</td>





</tr>))}

</tbody>
</table>





</div>
    </div>
</div>

)




}