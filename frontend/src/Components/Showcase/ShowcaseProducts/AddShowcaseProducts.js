import React,{useEffect, useState} from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import AdminSideBar from "../../Admin/AdminComponents/AdminSideBar";



export default function AddRShowProducts(){

  const RMpid=useParams().id;
const location=useLocation();
const [ShowcaseItem,setShowcaseItem]=useState("");
const [Item,setitem]=useState("");
const [Show_category,setShowCategory]=useState([]);
const [featuredList,setflist]=useState([]);
const [newShowcaseProduct,setnewSCp]= useState({ 
  title:'',
  brief:'',
  discrip:'',
  item:'',
  category:'',
  fList:'',
  rate:null,
    showThumb_img:'',
    thumb_main:'',
    showImg1:'',
    showImg2:'',
    showImg3:'',
    showImg4:'',
    showImg5:''
    

  
});

const [errorMessage, setErrorMessage] = useState('');


const changeHandler=(event)=>{
                      const { name, value } = event.target;
                      setnewSCp(prevState => ({
                        ...prevState,
                        [name]: value,
                        item:Item._id
                     
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
        setnewSCp(prevState => ({
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

useEffect(()=>{

  //get items from readymadeitems
async function getEachRMproduct(){

  await axios.get(`http://localhost:8070/RMitem/searchitem/${RMpid}`,config).then((res)=>{


   setitem(res.data);
   newShowcaseProduct.item=Item._id;

   

  


}).catch((err)=>{

   alert(err);
})


};
//get Category List
async function getAllCats(){

  await axios.get("http://localhost:8070/showcat/",config).then((res)=>{


   setShowCategory(res.data);
 
  


}).catch((err)=>{

   alert(err);
})

}
//get featured list


async function getAllFlists(){

  await axios.get("http://localhost:8070/Flist/",config).then((res)=>{


   setflist(res.data);
 
  


}).catch((err)=>{

   alert(err);
})



};

getEachRMproduct();
getAllCats();
getAllFlists();


},[])






//posting function

function SendFormData(e){


 e.preventDefault();  
 
 //Form Validation
 if (!newShowcaseProduct.title) {
  setErrorMessage('Name is required');
  return;
}
if (!newShowcaseProduct.brief) {
  setErrorMessage('Brief is required');
  return;
}
if (!newShowcaseProduct.discrip) {
  setErrorMessage('Discription is required');
  return;
}
if (!newShowcaseProduct.showThumb_img) {
  setErrorMessage('Image is required');
  return;
}
if (!newShowcaseProduct.thumb_main) {
  setErrorMessage('Image is required');
  return;
}
if (!newShowcaseProduct.showImg1) {
  setErrorMessage('Image is required');
  return;
}
if (!newShowcaseProduct.showImg2) {
  setErrorMessage('Image is required');
  return;
}
if (!newShowcaseProduct.showImg3) {
  setErrorMessage('Image is required');
  return;
}
if (!newShowcaseProduct.showImg4) {
  setErrorMessage('Image is required');
  return;
}
if (!newShowcaseProduct.showImg5) {
  setErrorMessage('Image is required');
  return;
}
//
console.log(newShowcaseProduct.showThumb_img,newShowcaseProduct.thumb_main);

axios.post("http://localhost:8070/showCitem/addtoShow",newShowcaseProduct).then(()=>{

alert("Item Added");
window.location.reload();
}).catch((err)=>{

alert(err);

})




}











return(
  <div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">
  <h2>Add items to Showcase</h2>
  <h3>{Item.item_name}</h3>

<form className="row g-3" onSubmit={SendFormData}>

  <div className="col-md-4">
    <label for="inpittitle" className="form-label">Item name</label>
    <input type="text" className="form-control" id="inputname" name="title"
    onChange={changeHandler}
    
    />
  </div>

  <div class="input-group">
  <span class="input-group-text">Brief</span>
  <textarea class="form-control" aria-label="With textarea" name="brief" onChange={changeHandler} pattern="[A-Za-z0-9]+"></textarea>
</div>
  
  <div class="input-group">
  <span class="input-group-text">Discription</span>
  <textarea class="form-control" aria-label="With textarea" name="discrip" onChange={changeHandler}></textarea>
</div>

 
<div className="col-md-4">
    <label for="inputState" className="form-label">Category</label>
   <select id="inputState" className="form-select" name="category"  onChange={changeHandler}>
      <option selected>Choose...</option>
     {Show_category.map((cat,key)=>(<option key={key} >{cat.type}</option>))}
    
    </select>
  </div>
  <div className="col-md-4">
    <label for="inputState" className="form-label">Featured List</label>
   <select id="inputState" className="form-select" name="fList"  onChange={changeHandler}>
      
      {featuredList.map((flist,key)=>(<option key={key} >{flist.FL_type}</option>))}
    
    </select>
  </div>
 
   
  <div className="imagesSection">
  <div>
      
    <label for="inputState" className="form-label">Thumbnail</label>
    <input type="file" className="form-control" id="inputname" name="showThumb_img" accept="image/*"
   onChange={(event)=>{imgCloudUpload(event)}}
    
    />
      <br />
      { newShowcaseProduct.showThumb_img && <img src={newShowcaseProduct.showThumb_img} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
    </div>

    <div className="col-md-4">
    <label for="inpittitle" className="form-label">Main Image</label>
    <input type="file" className="form-control" id="inputname" name="thumb_main" accept="image/*"
  onChange={(event)=>{imgCloudUpload(event)}}
    
    />
      <br />
    { newShowcaseProduct.thumb_main && <img src={newShowcaseProduct.thumb_main} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  <div className="col-md-4">
    <label for="inpittitle" className="form-label">Preview Image 1</label>
    <input type="file" className="form-control" id="inputname" name="showImg1" accept="image/*"
    onChange={(event)=>{imgCloudUpload(event)}}
    
    />
       <br />
    { newShowcaseProduct.showImg1 && <img src={newShowcaseProduct.showImg1} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%',objectFit: 'cover'}} />}
   
  </div>
  <div className="col-md-4">
    <label for="inpittitle" className="form-label"> Preview Image 2</label>
    <input type="file" className="form-control" id="inputname" name="showImg2" accept="image/*"
    onChange={(event)=>{imgCloudUpload(event)}}
    
    />
       <br />
    { newShowcaseProduct.showImg2 && <img src={newShowcaseProduct.showImg2} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  <div className="col-md-4">
    <label for="inpittitle" className="form-label">Preview Image 3</label>
    <input type="file" className="form-control" id="inputname" name="showImg3" accept="image/*"
    onChange={(event)=>{imgCloudUpload(event)}}
    
    />
       <br />
    { newShowcaseProduct.showImg3 && <img src={newShowcaseProduct.showImg3} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  <div className="col-md-4">
    <label for="inpittitle" className="form-label">Preview Image 4</label>
    <input type="file" className="form-control" id="inputname" name="showImg4" accept="image/*"
   onChange={(event)=>{imgCloudUpload(event)}}
    
    />
       <br />
    { newShowcaseProduct.showImg4 && <img src={newShowcaseProduct.showImg4} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  <div className="col-md-4">
    <label for="inpittitle" className="form-label">Preview Image 5</label>
    <input type="file" className="form-control" id="inputname" name="showImg5" accept="image/*"
    onChange={(event)=>{imgCloudUpload(event)}}
    
    />
       <br />
    { newShowcaseProduct.showImg5 && <img src={newShowcaseProduct.showImg5} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  


  </div>


  

  <div className="col-12">
    <button type="submit" className="btn btn-primary">Save</button>
  </div>
  {errorMessage && <div className="error">alert({errorMessage})</div>}
</form>



</div>

</div>




)







}