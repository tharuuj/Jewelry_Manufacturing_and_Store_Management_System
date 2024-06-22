import React,{useState} from "react";
import axios from "axios";
import { useAsyncError, useLocation } from "react-router-dom";


export default function AddRProducts(){
  const location=useLocation();
const [item_name,setName]=useState("");
const [item_price,setPrice]=useState("");
const [stock_count,setCount]=useState("");
const [thumb_img,setImage]=useState(null);
const [category,setCategory]=useState("");
const [materiel,setMateriel]=useState("");
const[a,seta]=useState("");

const[previewImg,setPreviewImg]=useState("");


//declaring Image file input and Preview functions
async function imgCloudUpload(e){
  const imgfile=e.target.files[0];
  imgPreviewHandler(imgfile);
const{name,value}=e.target;
seta(name);
  const formData = new FormData();
  formData.append("file", imgfile) 
  formData.append("upload_preset", "showcaseManagement-images")

  try {
      await axios.post("https://api.cloudinary.com/v1_1/dlrcon8gh/image/upload", formData).then((res) =>{
          setImage(res.data.secure_url)
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


//posting function

function SendFormData(e){

 e.preventDefault();   


const newReadyMadeItem={

    item_name,item_price,stock_count,thumb_img, category,materiel
    


};

axios.post("http://localhost:8070/RMitem/addRMitem",newReadyMadeItem).then(()=>{

alert("Item Added");
window.location.reload();
}).catch((err)=>{

alert(err);

})




}











return(
<div>
<h2>{a}</h2>
<form className="row g-3" onSubmit={SendFormData}>
  <div className="col-md-4">
    <label for="inputEmail4" className="form-label">Item name</label>
    <input type="text" className="form-control" id="inputname" 
    onChange={(event)=>{setName(event.target.value)}}
    
    />
  </div>
  
  <div className="col-md-4">
    <label for="inputEmail4" className="form-label">Item Price</label>
    <input type="text" className="form-control" id="inputEmail4"
     onChange={(event)=>{setPrice(event.target.value)}}
    />
  </div>
  <div className="col-md-4">
    <label for="inputEmail4" className="form-label">Stock Count</label>
    <input type="text" className="form-control" id="inputEmail4"
     onChange={(event)=>{setCount(event.target.value)}}
    />
  </div>
 

  <div>
      <h2>Image Preview</h2>
      <input type="file" onChange={(event)=>{imgCloudUpload(event)}} accept="image/*" name="imahhe" />
      <br />
      {previewImg && <img src={previewImg} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
    </div>

  

  
  <div className="col-md-4">
    <label for="inputState" className="form-label">Category</label>
    <select id="inputState" className="form-select"  onChange={(event)=>{setCategory(event.target.value)}}>
      <option selected>Choose...</option>
      <option>bangels</option>
      <option>Neckless</option>
      <option>Ring</option>
      <option>Bangels</option>
    </select>
  </div>

  <div className="col-md-4">
    <label for="inputState" className="form-label">Materiel</label>
    <select id="inputState" className="form-select"  onChange={(event)=>{setMateriel(event.target.value)}}>
      <option selected>Choose...</option>
      <option>Gold</option>
      <option>Silver</option>
      <option>Gold</option>
    </select>
  </div>

  <div className="col-12">
    <button type="submit" className="btn btn-primary">Save</button>
  </div>
</form>




<hr></hr>


</div>




)







}