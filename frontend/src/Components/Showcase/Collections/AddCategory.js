import React,{useEffect, useState} from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";




export default function AddRShowCategory(){

const [newShowcaseCat,setnewSCat]= useState({ 
 type:'',
 Cat_discrip:'',
 Cat_thumbnail:''
    

  
});

const [errorMessage, setErrorMessage] = useState('');


const changeHandler=(event)=>{
                      const { name, value } = event.target;
                      setnewSCat(prevState => ({
                        ...prevState,
                        [name]: value,
                       
                     
                    }));
                       
                
                    }


//declaring Image file input and Preview functions

async function imgCloudUpload(e){
  const imgfile=e.target.files[0];

const{name,value}=e.target;

  const formData = new FormData();
  formData.append("file", imgfile) 
  formData.append("upload_preset", "showcaseManagement-images")

  try {
      await axios.post("https://api.cloudinary.com/v1_1/dlrcon8gh/image/upload", formData).then((res) =>{
        setnewSCat(prevState => ({
          ...prevState,
          [name]: res.data.secure_url
          
       
      }));   
      
      })
  } catch (error) {
      alert(error)
  }
  

}





const config = {
  headers: {
      "content-Type": "application/json",
     
  },
};







//posting function

function SendFormData(e){


 e.preventDefault();  
 
 //Form Validation
 if (!newShowcaseCat.type) {
  setErrorMessage('Name is required');
  return;
}
if (!newShowcaseCat.Cat_discrip) {
  setErrorMessage('Discription is required');
  return;
}
if (!newShowcaseCat.Cat_thumbnail) {
  setErrorMessage('Image is required');
  return;
}
//
console.log(newShowcaseCat.type,newShowcaseCat.Cat_discrip,newShowcaseCat.Cat_thumbnail);

axios.post("http://localhost:8070/showcat/setcat",newShowcaseCat).then(()=>{

alert("Category Added");
window.location.reload();
}).catch((err)=>{

alert(err);

})




}











return(
<div>

  <h2>Add  Showcase Category</h2>
  

<form className="row g-3" onSubmit={SendFormData}>

  <div className="col-md-4">
    <label for="inpittitle" className="form-label">Category name</label>
    <input type="text" className="form-control" id="inputname" name="type"
    onChange={changeHandler}
    
    />
  </div>

  <div class="input-group">
  <span class="input-group-text">Discription</span>
  <textarea class="form-control" aria-label="With textarea" name="Cat_discrip" onChange={changeHandler} pattern="[A-Za-z0-9]+"></textarea>
</div>
  


  <div className="imagesSection">
  <div>
      
    <label for="inputState" className="form-label">Thumbnail</label>
    <input type="file" className="form-control" id="inputname" name="Cat_thumbnail" accept="image/*"
   onChange={(event)=>{imgCloudUpload(event)}}
    
    />
      <br />
      { newShowcaseCat.Cat_thumbnail && <img src={newShowcaseCat.Cat_thumbnail} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
    </div>

  


  </div>


  

  <div className="col-12">
    <button type="submit" className="btn btn-primary">Save</button>
  </div>
  {errorMessage && <div className="error">alert({errorMessage})</div>}
</form>





</div>




)







}