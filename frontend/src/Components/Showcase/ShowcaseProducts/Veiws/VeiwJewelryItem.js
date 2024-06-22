import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import Header from "../../../Accsesories/Head&Foot/Header";
import Footer from "../../../Accsesories/Head&Foot/Footer";
import Modal from 'react-bootstrap/Modal';
import CompareView from "./CompareView";
import Alert from 'react-bootstrap/Alert';
import './ViewJewelryItem.css';



export default function VeiwJewelerryItem(){

const[jewelleryItem,setjewelleryItem]=useState('');
const[ShowCompare,setShowCompare]=useState(false);
const[ShowCart,setShowCart]=useState(false);
const id=useParams().id;
const navigate=useNavigate();
const [showAlert, setShowAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const[user,setuser_id]=useState(JSON.parse(localStorage.getItem('user')));


/************************* set Timer******************************* */

let timer = ()=>{setTimeout(() => {
  setShowAlert(false);
}, 2000)};




/********************************************************************************** */
const handleAddToCart = (productId, productTitle) => {
 

  axios.post(`http://localhost:8070/cart/addtocart/${user._id}/${productId}`, {})
      .then((res) => {
        setAlertMessage(`"${productTitle}" added to cart!`);
        setShowAlert(true);
        timer();
        window.location.reload();
      })
      .catch((err) => {
          console.error(err);
      });
};

const handleAddToWishlist = (productId, productTitle) => {

  axios.post(`http://localhost:8070/wishlist/${user._id}/addItem`, { productId })
      .then((res) => {
          setAlertMessage(`"${productTitle}" added to Wishlist!`);
          setShowAlert(true);
          timer();
          window.location.reload();
      })
      .catch((err) => {
          console.error(err);
      });
};

const handleCloseAlert = () => {
  setShowAlert(false);
  clearTimeout(timer);
};




/********************************************************************************** */

  function HandleCompareModel(){

   setShowCompare(!ShowCompare);
    
    }

  function HandleCartModel(){

    setShowCart(!ShowCart);

   
    
  }

const config = {
    headers: {
      "content-Type": "application/json"
    }
  };

    useEffect(()=>{

    
       async function getShowCaseProducts(){
            await axios.get(`http://localhost:8070/showCitem/fetch/${id}`,config).then((res)=>{
    
                setjewelleryItem(res.data);
  
              
            }).catch((err)=>{
    
                alert(err);
            })
    
    
        }
    
        getShowCaseProducts();
        
    
    
    },[id])

return(

<div>
<Header/>


<div className="container">


    <h1 className="my-4">{jewelleryItem.Title}
      <small style={{fontSize:"20px"}}>  {jewelleryItem.brief}</small>
    </h1>
  
   
    <div className="row">
  
      <div className="col-md-8">
        <img className="img-fluid" src={`${jewelleryItem.showThumb_img}`} alt="" style={{borderRadius:"20px",boxShadow:" #454444  5px 12px 12px"}}/>
      </div>
  
      <div className="col-md-4">
        <h3 className="my-3">Item Description</h3>
        <p>{jewelleryItem.discrip}</p>
        <h3 className="my-3">Jewellary Details</h3>
        <ul>
        {jewelleryItem.Item &&

        <><li><h4>Item Title</h4>{jewelleryItem.Item.item_name}</li><li><h4>Price</h4>Rs.{jewelleryItem.Item.item_price}.00</li><li><h4>Materiel</h4>{jewelleryItem.Item.materiel}</li><li><h4>Stock Count</h4>{jewelleryItem.Item.stock_count}</li></>
        
        }
        </ul>
        {user?(
   <div>
        <button type="button" className="button-66 cart"  onClick={() => handleAddToCart(jewelleryItem._id, jewelleryItem.Title)} ><i className="fa fa-cart-arrow-down" aria-hidden="true"></i>Add to Cart</button>
        
        <button type="button" className="button-66 compare"  onClick={HandleCompareModel}><i className="fa-solid fa-code-compare" aria-hidden="true"></i>Compare</button>
        <button type="button" className="button-66  wishlist"  onClick={() => handleAddToWishlist(jewelleryItem._id, jewelleryItem.Title)} ><i className="fa-solid fa-shopping-bag" aria-hidden="true"></i>Add to WishList</button>
        
        <Alert show={showAlert} onClose={handleCloseAlert} variant="success">
                        {alertMessage}
                    </Alert>

</div>):null}
      </div>
  
    </div>


    <h3 className="my-4">Related Images</h3>
  
    <div className="row">
  
      <div className="col-md-3 col-sm-6 mb-4">
        <a href="#">
              <img className="img-fluid" src={`${jewelleryItem.showThumb_img_main}`} alt=""/>
            </a>
      </div>
  
      <div className="col-md-3 col-sm-6 mb-4">
        <a href="#">
              <img className="img-fluid" src={`${jewelleryItem.show_img1}`} alt=""/>
            </a>
      </div>
  
      <div className="col-md-3 col-sm-6 mb-4">
        <a href="#">
              <img className="img-fluid" src={`${jewelleryItem.show_img2}`} alt=""/>
            </a>
      </div>
  
      <div className="col-md-3 col-sm-6 mb-4">
        <a href="#">
              <img className="img-fluid" src={`${jewelleryItem.show_img3}`} alt=""/>
            </a>
      </div>
  
    </div>

  
  </div>


  {/*************************************Declareing models************************************************* */}

                    {/********************************Compare Model************************* */}

                    <Modal show={ShowCompare} onHide={HandleCompareModel} dialogClassName="modal-dialog-scrollable" centered  >
                   
                    <Modal.Body >
                    <a onClick={HandleCompareModel} className="close"/>
                      <CompareView product={jewelleryItem}/>

                    </Modal.Body>



                    </Modal>



   {/*************************************Declareing models************************************************* */}
   <Footer/>
</div>


)


}



