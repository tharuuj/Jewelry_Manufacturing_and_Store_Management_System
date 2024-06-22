import axios from "axios";
import React,{useState,useEffect} from "react";
import { useParams,useLocation } from "react-router-dom";
import AdminSideBar from "../Admin/AdminComponents/AdminSideBar";

export default function VeiwRMproducts(){

    let id=useParams().id;
  
    const[RMproduct,setRMproduct]=useState("");
    const [updatedproduct, setUpdatedproduct] = useState("");

 
    let [thumb_img,setImage]=useState("");
   
    let [isUpdate,setisUpdate]=useState(false);
    
    let[previewImg,setPreviewImg]=useState("");
    

    const head = {
        headers: {
          "content-Type": "application/json"
        }
      };
    
    
//declaring Image file input and Preview functions
async function imgCloudUpload(e){
  const imgfile=e.target.files[0];
  imgPreviewHandler(imgfile);
const{name,value}=e.target;

  const formData = new FormData();
  formData.append("file", imgfile) 
  formData.append("upload_preset", "showcaseManagement-images")

  try {
      await axios.post("https://api.cloudinary.com/v1_1/dlrcon8gh/image/upload", formData).then((res) =>{
          updatedproduct.thumb_img=(res.data.secure_url)
      })
  } catch (error) {
      alert(error)
  }
  

}





const imgPreviewHandler=(file)=>{

const reader=new FileReader();
reader.readAsDataURL(file)
reader.onloadend=()=>{
    setPreviewImg(reader.result)
}


}



    const updatebtnhandler=()=>{


    setisUpdate(true)


    }


const changeHandler=(event)=>{
    const { name, value } = event.target;
    setUpdatedproduct({ ...updatedproduct, [name]: value });
   
;


}

    useEffect(()=>{

        async function getEachRMproduct(){

           await axios.get(`http://localhost:8070/RMitem/searchitem/${id}`,head).then((res)=>{

         
            setRMproduct(res.data);
            setUpdatedproduct(res.data);


        }).catch((err)=>{

            alert(err);
        })


        }

getEachRMproduct();
    },[id])


async function updateProducts(){


await axios.put(`http://localhost:8070/RMitem/update/${updatedproduct._id}`,updatedproduct,head).then((res)=>{

 alert("Updated Succsefully");
 
}).catch((err)=>{

alert(err);
})

}

return(
<div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">
    <button onClick={updatebtnhandler}>Update Details</button>
    <h1>Name:{RMproduct.item_name}</h1>

<div>
<form className="row g-3" onSubmit={updateProducts}>
  <div className="col-md-4">
    <label for="inputEmail4" className="form-label">Item name</label>


    {isUpdate?<input type="text" className="form-control" id="inputname" name="item_name" value={updatedproduct.item_name} required
    onChange={changeHandler}
    
    />:<input type="text" className="form-control" id="inputname" name="item_name" value={updatedproduct.item_name} readOnly
   
    
    />}
  </div>
  
  <div className="col-md-4">
    <label for="inputEmail4" className="form-label">Item Price</label>

    {isUpdate?<input type="number" className="form-control" id="inputEmail4" name="item_price" value={updatedproduct.item_price} 
    onChange={changeHandler}
    />:<input type="number" className="form-control" id="inputEmail4" name="item_price" value={updatedproduct.item_price} 
readOnly
    />}

  </div>
  <div className="col-md-4">
    <label for="inputEmail4" className="form-label">Stock Count</label>
    
    {isUpdate?<input type="number" className="form-control" id="inputEmail4" name="stock_count"  value={updatedproduct.stock_count}
      onChange={changeHandler}
    />:<input type="number" className="form-control" id="inputEmail4" name="stock_count"  value={updatedproduct.stock_count}
    readOnly
  />}


  </div>
 

  <div>
      <h2>Image Preview</h2>
      <input type="file"  onChange={(event)=>{imgCloudUpload(event)}}accept="image/*" name="thumb_img"  />
      <br />
      {previewImg && <img src={previewImg} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
    </div>

  

  
  <div className="col-md-4">
    <label for="inputState" className="form-label">Category</label>
    {isUpdate?<select id="inputState" className="form-select" value={updatedproduct.category}  name="category"    onChange={changeHandler}>
      <option selected>Choose...</option>
      <option>bangels</option>
      <option>Neckless</option>
      <option>Ring</option>
      <option>Bangels</option>
    </select>:<input type="text" className="form-control" id="inputEmail4" value={updatedproduct.category}  name="category"  readOnly  onChange={changeHandler}>
      
     
    </input>}
  </div>

  <div className="col-md-4">
    <label for="inputState" className="form-label">Materiel</label>
    {isUpdate?
    <select id="inputState" className="form-select" value={updatedproduct.materiel}    name="materiel" onChange={changeHandler}>
      <option selected>Choose...</option>
      <option>Gold</option>
      <option>Silver</option>
      <option>Gold</option>
    </select>:<input type="text" className="form-control" id="inputEmail4" value={updatedproduct.materiel}    name="materiel"  readOnly  onChange={changeHandler}>
      
     
      </input>}
  </div>

  <div className="col-12">
   {isUpdate? <button type="submit" className="btn btn-primary">Update</button>:null}
  </div>
</form>

</div>
</div>
   </div>
  
)


}