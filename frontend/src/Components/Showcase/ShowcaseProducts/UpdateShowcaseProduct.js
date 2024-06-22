import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminSideBar from "../../Admin/AdminComponents/AdminSideBar";

export default function UpdateShowcaseProduct(){

const id=useParams().id;
const [Show_category,setShowCategory]=useState([]);
const [featuredList,setflist]=useState([]);
const [updatedProduct,setupdatedProduct]=useState("");
    
let[previewImg,setPreviewImg]=useState("");

const config = {
    headers: {
      "content-Type": "application/json"
    }
  };

//gether Product
useEffect(()=>{

     function getEachSCproduct(){

        axios.get(`http://localhost:8070/showCitem/fetch/${id}`,config).then((res)=>{

  
        setupdatedProduct(res.data);
  
        console.log(updatedProduct);

    }).catch((err)=>{

        alert(err);
    })


    }
    
//get Category List
async function getAllCats(){

  await axios.get("http://localhost:8070/showcat/",config).then((res)=>{


   setShowCategory(res.data);
 
  


}).catch((err)=>{

   alert(err);
})

}
//get featured list

//get Category List
async function getAllFlists(){

  await axios.get("http://localhost:8070/Flist/",config).then((res)=>{


   setflist(res.data);
 
  


}).catch((err)=>{

   alert(err);
})



};


getEachSCproduct();
getAllCats();
getAllFlists();
},[id])




//declaring Image file input and Preview functions

async function imgCloudUpload(e){
  const imgfile=e.target.files[0];

const{name,value}=e.target;

  const formData = new FormData();
  formData.append("file", imgfile) 
  formData.append("upload_preset", "showcaseManagement-images")

  try {
      await axios.post("https://api.cloudinary.com/v1_1/dlrcon8gh/image/upload", formData).then((res) =>{
        setupdatedProduct(prevState => ({
          ...prevState,
          [name]: res.data.secure_url
          
       
      }));   
      
      })
  } catch (error) {
      alert(error)
  }
  

}



   
    
        const updatebtnhandler=()=>{
    
    
      
        }
    
    
    const changeHandler=(event)=>{
        const { name, value } = event.target;
        setupdatedProduct({ ...updatedProduct, [name]: value });
       

       
    ;
    
    
    }

    
async function updateProducts(){


    await axios.put(`http://localhost:8070/showCitem/update/${updatedProduct._id}`,updatedProduct,config).then((res)=>{
    
     alert("Updated Succsefully");
     
     
    }).catch((err)=>{
    
    alert(err);
    })
    
    }
return(


   
<div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">
        <h2>{updatedProduct.Title}</h2>

        <div>
            
<form className="row g-3" onSubmit={updateProducts}>

<div className="col-md-4">
  <label for="inpittitle" className="form-label">Item name</label>
  <input type="text" className="form-control" id="inputname" name="Title"
  onChange={changeHandler} value={updatedProduct.Title}
  
  />
</div>

<div class="input-group">
  <span class="input-group-text">Brief</span>
  <textarea class="form-control" aria-label="With textarea" name="brief" onChange={changeHandler} value={updatedProduct.brief}></textarea>
</div>
  
  <div class="input-group">
  <span class="input-group-text">Discription</span>
  <textarea class="form-control" aria-label="With textarea" name="discrip" onChange={changeHandler} value={updatedProduct.discrip}></textarea>
</div>


 
   
  <div className="imagesSection">
  <div>
      
    <label for="inputState" className="form-label">Thumbnail</label>
    <input type="file" className="form-control" id="inputname" name="showThumb_img" accept="image/*"
   onChange={(event)=>{imgCloudUpload(event)}}
    
    />
      <br />
      { updatedProduct.showThumb_img && <img src={updatedProduct.showThumb_img} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
    </div>

    <div className="col-md-4">
    <label for="inpittitle" className="form-label">Main Image</label>
    <input type="file" className="form-control" id="inputname" name="showThumb_img_main" accept="image/*"
  onChange={(event)=>{imgCloudUpload(event)}}
    
    />
      <br />
    { updatedProduct.showThumb_img_main && <img src={updatedProduct.showThumb_img_main} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  <div className="col-md-4">
    <label for="inpittitle" className="form-label">Preview Image 1</label>
    <input type="file" className="form-control" id="inputname" name="show_img1" accept="image/*"
    onChange={(event)=>{imgCloudUpload(event)}}
    
    />
       <br />
    { updatedProduct.show_img1 && <img src={updatedProduct.show_img1} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  <div className="col-md-4">
    <label for="inpittitle" className="form-label"> Preview Image 2</label>
    <input type="file" className="form-control" id="inputname" name="show_img2" accept="image/*"
    onChange={(event)=>{imgCloudUpload(event)}}
    
    />
       <br />
    { updatedProduct.show_img2 && <img src={updatedProduct.show_img2} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  <div className="col-md-4">
    <label for="inpittitle" className="form-label">Preview Image 3</label>
    <input type="file" className="form-control" id="inputname" name="show_img3" accept="image/*"
    onChange={(event)=>{imgCloudUpload(event)}}
    
    />
       <br />
    { updatedProduct.show_img3 && <img src={updatedProduct.show_img3} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  <div className="col-md-4">
    <label for="inpittitle" className="form-label">Preview Image 4</label>
    <input type="file" className="form-control" id="inputname" name="show_img4" accept="image/*"
   onChange={(event)=>{imgCloudUpload(event)}}
    
    />
       <br />
    { updatedProduct.show_img4 && <img src={updatedProduct.show_img4} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  <div className="col-md-4">
    <label for="inpittitle" className="form-label">Preview Image 5</label>
    <input type="file" className="form-control" id="inputname" name="show_img5" accept="image/*"
    onChange={(event)=>{imgCloudUpload(event)}}
    
    />
       <br />
    { updatedProduct.show_img5 && <img src={updatedProduct.show_img5} alt="Preview Image" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '20px',borderRadius:'50%',opacity:'75%'}} />}
   
  </div>
  


  </div>



<div className="col-12">
  <button type="submit" className="btn btn-primary">Save</button>
</div>
</form>
        </div>

</div>
    </div>
)
  

}