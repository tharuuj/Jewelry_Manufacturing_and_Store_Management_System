import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSideBar from "../../../Admin/AdminComponents/AdminSideBar";


export default function ShowcaseItemTable(props){

const products=props.products;
console.log(products);
const navigate=useNavigate();

//delete Function
async function deleteProduct(id){
  const config = {
      headers: {
          "content-Type": "application/json",
         
      },
  };

 
      await axios.delete(`http://localhost:8070/showCitem/delete/${id}`, config).then(() => {
          alert("Product deleted successfully")
          
          window.location.reload();
      }).catch((error) => {
          alert(`Failed to delete the Product`)
      })
  }

//update function
function updateRproduct(id){

navigate(`/show/update/${id}`);

}

function VeiwJewelerry(id){

  navigate(`/show/view/${id}`);
  
  }

 

return(
<div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">

<table className="table">
<thead>
  <tr>
    <th scope="col">Title</th>
    <th scope="col">Brief</th>
    <th scope="col">Discrip</th>
    <th scope="col">Thumb</th>
    <th scope="col">feature</th>
    <th scope="col">Item Name</th>
      <th scope="col">Category</th>
        <th scope="col">materiel</th>
        <th scope="col">Stocks</th>

  
        <th scope="col">rate</th>
       
          <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
{products.map((product,key)=>(

<tr key={key}>
   
<td>{product.Title}</td>
<td>{product.brief}</td>
<td>{product.discrip}</td>
<td><img src={`${product.showThumb_img}`} style={{ width: '200px', height: '200px', objectFit: 'cover' ,borderRadius:'50%'}}/></td>
<td>{product.featuredList.FL_type}</td>
{product.Item?(<>
<td>{product.Item.item_name}</td>
<td>{product.Show_category.type}</td>
<td>{product.Item.materiel}</td>
<td>{product.Item.stock_count}</td>
</>
):(<td colSpan={4}>Out of Stock</td>)}

<td>{product.ratings}</td>

<td><button onClick={()=>deleteProduct(product._id)}>delete</button>
<button onClick={()=>updateRproduct(product._id)}>Update</button>
<button onClick={()=>VeiwJewelerry(product._id)}>Veiw</button>



</td>



</tr>))}

</tbody>
</table>





</div>

</div>

)


} 