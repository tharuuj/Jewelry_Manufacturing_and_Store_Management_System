import React,{useState,useEffect} from "react";
import { useNavigate,Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import "./showcaseGrid.css"


export default function ShowcaseItemGrid(){
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
const navigate=useNavigate();
const[Query,setQuery]=useState("");
const[ShowcaseProducts,setShowcaseProducts]=useState([]);
const[user,setuser_id]=useState(JSON.parse(localStorage.getItem('user')));

const[Order,setOrder]=useState("ASC");


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
/************************* set Timer******************************* */

let timer = ()=>{setTimeout(() => {
  setShowAlert(false);
}, 2000)};

/////////////////////////////////////////////////////////////////////




const handleAddToWishlist = (productId, productTitle) => {


  axios.post(`http://localhost:8070/wishlist/${user._id}/addItem`, { productId })
      .then((res) => {
          setAlertMessage(`"${productTitle}" added to Wishlist!`);
          setShowAlert(true);
          timer();


          
      })
      .catch((err) => {
          console.error(err);
      });
};

const handleCloseAlert = () => {
  setShowAlert(false);
  clearTimeout(timer);

};

/////////////////////////////////////////////////////////////////////


const SortName=(term)=>{

  if(Order=== "ASC"){

    const sorted=[...ShowcaseProducts].sort((a,b)=>
      a[term].toLowerCase()> b[term].toLowerCase()?1:-1

    );
    setAlertMessage("Item Sorted to A-Z");
    setShowAlert(true);
    setShowcaseProducts(sorted);
    setOrder("DSC");
    timer();
  }

  if(Order=== "DSC"){

    const sorted=[...ShowcaseProducts].sort((a,b)=>
      a[term].toLowerCase()< b[term].toLowerCase()?1:-1

    );
    setAlertMessage("Item Sorted to Z-A");
    setShowAlert(true);
    setShowcaseProducts(sorted);
    setOrder("ASC");
    timer();
  }




}
///////////////////////////////////////////////////////////////////

const SortPrice=(term)=>{

  if(Order=== "ASC"){

    const sorted=[...ShowcaseProducts].sort((a,b)=>
      a.Item[term]> b.Item[term]?1:-1

    );
    setAlertMessage("Item Sorted to Price Low to Price High");
    setShowAlert(true);
    setShowcaseProducts(sorted);
    setOrder("DSC");
    timer();
  }

  if(Order=== "DSC"){

    const sorted=[...ShowcaseProducts].sort((a,b)=>
      a.Item[term]< b.Item[term]?1:-1

    );
    setAlertMessage("Item Sorted to Price High to Price Low ");
    setShowAlert(true);
    setShowcaseProducts(sorted);
    setOrder("ASC");
    timer();
  }




}


////////////////////////////////////////////////////////////////




const renderSpanFlist = (Flist) => {
    switch (Flist) {
      case 'seasonal':
        return   <span className="product-new-label" style={{backgroundColor:'red'}}>{Flist}</span>;
      case 'wedding':
        return   <span className="product-new-label" style={{backgroundColor:'green'}}>{Flist}</span>;
      default:
        return <p>product.featuredList.FL_type</p>;
    }
  };

  function VeiwJewelerry(id){

    navigate(`/show/view/${id}`);
    
    }
   const SearchHandler=(query)=>{

    

    setShowcaseProducts(ShowcaseProducts.filter(product=>(Object.values(product).toString().toLowerCase()).includes(query.toLowerCase())))


   }




    console.log(ShowcaseProducts);
return(

<div className="ShowCase">
  


<div  className="searchBar" style={{ textAlign: "center" }}>
        <input
         onChange={(e)=>setQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Jewellary Details"
         
        
       />
        <div class="tabs_wrap">
    <ul>
      <li onClick={()=>SortName("Title")}>Filter By Name(A to Z)</li>
      <li onClick={()=>SortPrice("item_price")}>Filter By price(L to H)</li>
      <li class="active">Filter By ..</li>
    </ul>
  </div>

      </div>
     


<div className="Showcasegrid">


    
<div className="Itemcontainer">
   
    <div className="row">
    <Alert show={showAlert} onClose={handleCloseAlert} variant="success" className="customAlert">
                                                        {alertMessage}
                                                    </Alert>
    {(ShowcaseProducts.filter(product=>(Object.values(product).toString().toLowerCase()).includes(Query.toLowerCase()))).map((product,key)=>(
      
      
        <div className="col-md-3 col-sm-6" key={key}>
      
          
            <div className="product-grid3">
                <div className="product-image3">
                    <a href="#">
                        <img className="pic-1" src={`${product.showThumb_img}`} style={{overflow:"hidden",width:"276px",height:"276px", objectFit: 'cover'}}/>
                        <img className="pic-2" src={`${product.showThumb_img_main}`} style={{overflow:"hidden",width:"276px",height:"276px", objectFit: 'cover'}}/>
                    </a>
                    <ul className="social">
                        <li><span onClick={()=>{VeiwJewelerry(product._id)}} ><i className="fa fa-eye"></i></span></li>
                        <li ><span onClick={() => handleAddToWishlist(product._id, product.Title)}><i className="fa fa-shopping-bag"></i></span></li>
                      
                    </ul>
                   
                    {renderSpanFlist(product.featuredList.FL_type)}
                  
                </div>
              
                <div className="product-content">
                
                  {(!product.Item||product.Item.stock_count==0)?(

                    <span>Out of Stocks</span>):(<div> <h3 className="title">{product.Title}</h3>
                    <div className="price">
                       {product.Item.item_price}
                       
                       
                    </div>
                    <span>{product.Item.materiel}</span>
                    <span style={{marginLeft:"4px",backgroundColor:"lime",padding:"3px",paddingLeft:"4px"}}> Stocks:{product.Item.stock_count}</span>
                    </div>)}
                
                   
                  
                </div>
               
            </div>
           
            
        </div>))}
        </div>
    </div>

</div>
                   

</div>

) 


} 