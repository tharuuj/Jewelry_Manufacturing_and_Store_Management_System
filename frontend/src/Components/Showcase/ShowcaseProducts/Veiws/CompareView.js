import React,{useState,useEffect} from "react";
import "./CompareView.css"
import axios from "axios";


export default function CompareView(props){

const[showFullList,setshowFullList]=useState(false);
const[showItem,setshowItem]=useState(false);
const[ShowcaseProducts,setShowcaseProducts]=useState([]);
const[jewelleryItem,setjewelleryItem]=useState('');
const[SelectedItem,setSelectedItem]=useState(props.product);

const[BestPrice,setBestPrice]=useState(0);//0for initial,1 for selected,2 for comparing one,3 for equal
const[BestMateriel,setBestMateriel]=useState(0);
const[BestRate,setBestRate]=useState(0);

const config = {
    headers: {
      "content-Type": "application/json"
    }
  };





useEffect(()=>{

    async function getEachSCproduct(){

       await axios.get("http://localhost:8070/showCitem/fetchAll",config).then((res)=>{
    
        setShowcaseProducts(res.data);

      
    }).catch((err)=>{

        alert(err);
    })


   }


   setshowFullList(true);
   getEachSCproduct();


},[]);

useEffect(()=>{

    if(jewelleryItem){
        Comparisson();
    }
   


},[jewelleryItem]);

//Fetch Selected Item to Compare
async function getShowCaseProducts(ID){
    await axios.get(`http://localhost:8070/showCitem/fetch/${ID}`,config).then((res)=>{

        setjewelleryItem(res.data);
     
      
    }).catch((err)=>{

        alert(err);
    })
  
ChangeContentHandler();


}

//comparison 
function Comparisson(){

if(SelectedItem.Item.item_price > jewelleryItem.Item.item_price){

    setBestPrice(2);
}
else if(SelectedItem.Item.item_price < jewelleryItem.Item.item_price){

    setBestPrice(1);
}
else{ setBestPrice(3)}


console.log(BestPrice);

}


const ChangeContentHandler=()=>{

    if(showFullList != showItem){
        setshowFullList(!showFullList);
        setshowItem(!showItem);
        setBestPrice(0);
        

    }

};


return(

    <div style={{alignItems:'center',alignContent:'center'}} >
<div className=" compare row row-cols-1 row-cols-md-2 g-4">
  <div className="col">
    <div className="card">

    {/****************************************carosel***************************************** */}

    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{width:'433.6px',height:'289.06px',overflow:'hidden'}}>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={`${SelectedItem.showThumb_img}`} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={`${SelectedItem.showThumb_img_main}`} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`${SelectedItem.show_img1}`} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`${SelectedItem.show_img2}`} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`${SelectedItem.show_img3}`} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


   {/****************************************carosel***************************************** */}



      <div className="card-body">
        <h5 className="card-title">{SelectedItem.Title}</h5>
        <span className="List">
        <ul>
    <li className="one">
      Price:RS.{SelectedItem.Item.item_price} <span>{(() => {
        if (BestPrice==1) {
          return <h6>1</h6>;
        } else if(BestPrice==3){
          return <h6>=</h6>;
        } else if(BestPrice==0){
            return null;
          }
        else{
            return <h6>2</h6>
        }
      })()}</span>
    </li>
    <li className="two">
      Material:{SelectedItem.Item.materiel}
    </li>
     <li className="three">
      Ratings
    </li>
  </ul>
        </span>
       
      </div>
    </div>
  </div>


  {/********************************************Comparing Item******************************************************/}
  <div className="col">
    {showFullList?(
    
    <div className="card">
        <div className="ProductsList">
            <div className="List-product-head">
                <h3>Select Product to Compare</h3>
            </div>
            <div className="List-product-body">
           


                <ul>
                    {ShowcaseProducts.map((product,key)=>
                    <li style={{padding:'0'}} key={key}>
                        <span className="All-product" style={{backgroundColor:'lime',margin:'8px',borderRadius:'10px',display: 'flex'}} onClick={()=>{getShowCaseProducts(product._id)}}>
                            <h4>Name:{product.Title}</h4>
                            <h5>Price:{product.Item.item_price}</h5>  
                            <span><img src={`${product.showThumb_img}`} style={{width:'48px',height:'48px',borderRadius:'50%'}}></img></span>  
                                                
                        </span>
                    </li>
               )}
                </ul>
            </div>


        </div>



</div>
):showItem?(

    <div className="card">
      
       {/****************************************carosel***************************************** */}

    <div id="carouselExampleControls1" className="carousel slide" data-bs-ride="carousel" style={{width:'433.6px',height:'289.06px',overflow:'hidden'}}>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={`${jewelleryItem.showThumb_img}`} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={`${jewelleryItem.showThumb_img_main}`} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`${jewelleryItem.show_img1}`} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`${jewelleryItem.show_img2}`} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`${jewelleryItem.show_img3}`} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls1" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls1" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


   {/****************************************carosel***************************************** */}


      <div className="card-body">
        <h5 className="card-title">{jewelleryItem.Title}</h5>
        <span className="List">
        <ul>
    <li className="one">
      Price:RS.{jewelleryItem.Item.item_price}<span>{(() => {
        if (BestPrice==2) {
          return <h6>1</h6>;
        } else if(BestPrice==3){
          return <h6>=</h6>;
        }
     else if(BestPrice==0){
        return null;
      }else{
            return <h6>2</h6>
        }
      })()}</span>
    </li>
    <li className="two">
      Material:{jewelleryItem.Item.materiel}
    </li>
     <li className="three">
      Ratings
    </li>
  </ul>
        </span>
        <button onClick={ChangeContentHandler}>Compare With More</button>
       
      </div>
    </div>





):null}
  

  </div>
 
</div>
    </div>

)

}