import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function ShowReadyMadeproducts(props){

  const [isADD,setisADD]=useState(props.isadd);

  

  const navigate=useNavigate();

  const product=props.product;

  const config = {
    headers: {
        "content-Type": "application/json",
       
    },
};


console.log(isADD);




//delete Function
async function deleteProduct(id){
   
  
   
    await axios.delete(`http://localhost:8070/showCitem/deleteItem/${id}`, config).then(() => {
      alert("Product in Showcase deleted successfully")
      
      
  }).catch((error) => {
      alert(`Failed to delete the Showcase Product`)
  })
      
    
      await axios.delete(`http://localhost:8070/RMitem/deleteRM/${id}`, config).then(() => {
        alert("Product deleted successfully")
        
        window.location.reload();
    }).catch((error) => {
        alert(`Failed to delete the Product`)
    })
        
        
       
       
    }

//update function
function updateRproduct(id){

navigate(`/RMP/update/${id}`);

}
//add products
async function addP(id){


  let isAvailable;

  //Check if the Readymade item is already in the Showcase
  await axios.get(`http://localhost:8070/showCitem/fetchByItem/${id}`,config).then((res)=>{
   
  console.log(res.data.availability);
  isAvailable=(res.data.availability);
  
  }).catch((err)=>{
  
    alert(err);
  })
  

  if(!isAvailable){
    navigate(`/show/addP/${id}`);
  }
  else{

    alert("this Item Already Available In Showcase");
    window.location.reload();
  }


  
  }


return(
    <div >
    <table className="table">
<thead>
  <tr>
    <th scope="col">Item</th>
    <th scope="col">Price</th>
    <th scope="col">Count</th>
    <th scope="col">Img</th>
      <th scope="col">Category</th>
        <th scope="col">materiel</th>
       
          <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
{product.map((product,key)=>(

<tr key={key}>

   
<td>{product.item_name}</td>
<td>{product.item_price}</td>
<td>{product.stock_count}</td>
<td><img src={`${product.thumb_img}`} style={{ width: '150px', height: '150px', objectFit: 'cover',borderRadius:'50%' }}></img></td>
<td>{product.category}</td>
<td>{product.materiel}</td>
{isADD?<td><button onClick={()=>addP(product._id)}>AddProduct</button></td>
:<td><button onClick={()=>deleteProduct(product._id)}>delete</button>
<button onClick={()=>updateRproduct(product._id)}>Update</button>




</td>}



</tr>))}

</tbody>
</table>



  </div>






)







}