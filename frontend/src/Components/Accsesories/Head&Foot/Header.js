import React,{useState,useEffect} from "react";
import './Header.css';
import mainLogo from '../Images/MainLogo.png'
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import CartComponent from "../../Showcase/Cart/Cart";
import Wishlist from "../../Showcase/Wishlist/Wishlist";
import { useDispatch ,useSelector} from "react-redux";
import { signout } from "../../../User/actions";
import Profile from "../../../User/Containers/Profile";

import { useNavigate } from "react-router-dom";


export default function Header(props){




  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const[cartSize,setcartSize]=useState('');


  const auth = useSelector((state) => state.auth);
  const logout = () => {
      dispatch(signout());
      navigate('/');

    };
  

    const [show, setShow] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);
    const [showprofile, setShowProfile] = useState(false);
    const[activeClass,setActiveClass]=useState(props.active)
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseWishlist = () => setShowWishlist(false);
    const handleShowWishlist = () => setShowWishlist(true);
    const handleCloseProfile = () => setShowProfile(false);
    const handleShowProfile = () => setShowProfile(true);
  

    useEffect(() => {
      // Fetch cart items from backend
    

      fetchCartItems();
  }, []);
  const fetchCartItems = async () => {
      try {
        
        

          const response = await axios.get(`http://localhost:8070/cart/fetchcart/${user._id}`);
          console.log(response.data);
          
          let arr=response.data.items;
          setcartSize(arr.length);
          
        
         
      } catch (error) {
          console.error('Error fetching cart items:', error);
      }
  };
  


return(


<header>
      <div className="container">
        <div className="header_flex">
          <div>
            <a href="/"><img src={mainLogo} alt="logo"  id="headerLogo"/></a>
          </div>
          <div className="d_flex gap_26">
            <div className="d_flex gap_26">
              <div className="contact_links">
                <div className="contact_icon">
                  <img src="https://sudip-bhowmick.github.io/images/img/mail.svg" alt="mail" />
                  <a href="mailto:sudipbhowmick80@gmail.com">diamonds.lk@gmail.com</a>
                </div>
                <div className="contact_icon">
                  <img src="https://sudip-bhowmick.github.io/images/img/call.svg" alt="call" />
                  <a href="tel:918898244769">+94712345678</a>
                </div>
              </div>
              <div className="social_links">
                <a href="#" target="_blank"><img src="https://sudip-bhowmick.github.io/images/img/linkedin.svg" alt="linkedin" /></a>
                <a href="#" target="_blank"><img src="https://sudip-bhowmick.github.io/images/img/facebook.svg" alt="facebook" /></a>
                <a href="#" target="_blank"><img src="https://sudip-bhowmick.github.io/images/img/twitter.svg" alt="twitter" /></a>
              </div>
            </div>
            <div className="header_cta">
              <a href="javascript:void(0)" className="btn_one">Book a call</a>
            </div>

            <button type="button" className="burger" id="burger">
              <span className="burger_line"></span>
              <span className="burger_line"></span>
              <span className="burger_line"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="overlay"></div>
      <nav className="dark_bg" id="menu">
        <div className="container">
            <div>
          <ul>
            <li><a href="/home"  className={(activeClass=='home')?"active":"inactive"}><i className="fas fa-home mx-1"></i>Home</a></li>
            <li><a href="/show" className={(activeClass=='show')?"active":"inactive"}><i className="fas fa-tv mx-1"></i>Showcase</a></li>
            <li><a href="/AddCuss" className={(activeClass=='order')?"active":"inactive"}>Customize Order</a></li>
            <li><a href="/AddApps" className={(activeClass=='order')?"active":"inactive"}>Appointment Booking</a></li>

           
<div  className="commonTabs"><ul>
<li><a onClick={handleShow}>
                
                <span><span className="badge badge-pill bg-danger cartCount">{cartSize}</span><i className="fas fa-shopping-cart mx-2"></i>Cart</span>
                      
                      
                      </a></li>
            <li ><a onClick={handleShowWishlist}><i className="fas fa-shopping-bag mx-1"></i>WishList</a></li>
            <li ><a onClick={handleShowProfile}><i className="fas fa-user mx-1"></i>Profile</a></li>
            <li onClick={logout}><a ><i className="fas fa-sign-out mx-1"></i>SignOut</a></li>
            </ul>      
</div>
          </ul>
          
          
          </div>
         
        </div>
      </nav>

      
<Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>My cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CartComponent />

        </Modal.Body>
      </Modal>

      <Modal show={showWishlist} onHide={handleCloseWishlist} centered>
        <Modal.Header closeButton>
          <Modal.Title>My Wishlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Wishlist/>

        </Modal.Body>
      </Modal>




      <Modal show={showprofile} onHide={handleCloseProfile} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>My Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Profile/>

        </Modal.Body>
      </Modal>

      


    </header>







)

}
