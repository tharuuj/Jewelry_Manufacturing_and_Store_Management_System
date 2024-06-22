import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { FaPlus } from "react-icons/fa";
import { FaMinus, FaSearch, FaShoppingCart } from "react-icons/fa";
import { IoRemoveCircle } from "react-icons/io5";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CartComponent = () => {

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const[user,setuser_id]=useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();
   
   

    useEffect(() => {
        // Fetch cart items from backend
      

        fetchCartItems();
    }, []);
    const fetchCartItems = async () => {
        try {
            
            //if (!userId) {
            //     // Redirect to signin page if userId is not present
            //     // You can implement this part
            //     return;
            // }
          

            const response = await axios.get(`http://localhost:8070/cart/fetchcart/${user._id}`);
           
            setTotalPrice(response.data.totalPrice);
            setCartItems(response.data.items);
          
           
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    const handleClearCart = () => {
        // const userId = localStorage.getItem("userId");

        // if (!userId) {
        //     navigate("/signin");
        //     return;
        // }
    
        axios.delete(`http://localhost:8070/cart/clearcart/${user._id}`)
            .then((res) => {
                console.log(res.data);
                fetchCartItems();
                setAlertMessage('Cart cleared successfully!');
                setShowAlert(true);
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);

            });
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleMinusClick = async (productId) => {
       // Change this to use the actual user ID
        const updatedCartItems = cartItems.map(item => {
            if (item.productId._id === productId.productId._id && item.quantity > 1) {
                item.quantity -= 1;
            }
            return item;
        });
        setCartItems(updatedCartItems);
        await updateProductQuantity(user._id, productId.productId._id, updatedCartItems.find(item => item.productId._id === productId.productId._id).quantity);
    };

    const handlePlusClick = async (productId) => {
      
        const updatedCartItems = cartItems.map(item => {
            if (item.productId._id === productId.productId._id) {
                item.quantity += 1;
            }
            return item;
        });
        setCartItems(updatedCartItems);
        await updateProductQuantity(user._id, productId.productId._id, updatedCartItems.find(item => item.productId._id === productId.productId._id).quantity);
       
      };

    const updateProductQuantity = async (user_id, productId, quantity) => {
        try {
            await axios.put(`http://localhost:8070/cart/updatePro/${user_id}/${productId}`, { quantity });
            fetchCartItems();
           
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };
    const handleRemoveItemClick = async (productId) => {
         // Change this to use the actual user ID

        try {
            // Filter out the item to be removed from the cart
            const updatedCartItems = cartItems.filter(item => item.productId._id !== productId.productId._id);
            setCartItems(updatedCartItems);

            // Call the backend API to remove the item from the cart
            await removeItemFromCart(user._id, productId.productId._id);
            
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const removeItemFromCart = async (user_id, productId) => {
        try {
            await axios.delete(`http://localhost:8070/cart/removeProduct/${user_id}/${productId}`);
            
            fetchCartItems();
         
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const filteredCartItems = cartItems.filter(item =>
        item.productId.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const generateReport = () => {
        // Create new jsPDF instance
        const doc = new jsPDF();

        // Set font style and size
        doc.setFont('helvetica');
        doc.setFontSize(12);

        // Set report title
        doc.text('Shopping Cart Report', 14, 20);

        // Add table headings
        const headers = ['Product', 'Price', 'Quantity', 'Subtotal'];
        const data = cartItems.map(item => [
            item.productId.Title,
            item.productId.Item.item_price,
            item.quantity,
            item.productId.Item.item_price * item.quantity
        ]);
        doc.autoTable({
            startY: 30,
            head: [headers],
            body: data
        });

        // Set total price
        doc.text(`Total Price: ${totalPrice}`, 14, doc.lastAutoTable.finalY + 10);

        // Save the document
        doc.save('ShoppingCartReport.pdf');
    };

    return (
        <section>
            <div className="bg-white mx-10 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <div className="row cart-wrapper">
                                <div className="col-sm-8 col-md-8">
                                    <div className="col-12">
                                        <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4 col-6">
                                            <div class="input-group">
                                                <input
                                                    type="search"
                                                    placeholder="Search in the Cart"
                                                    aria-describedby="button-addon1"
                                                    class="form-control border-0 bg-light"
                                                    onChange={handleSearch}
                                                    value={searchQuery}
                                                />
                                                <div class="input-group-append">
                                                    <button id="button-addon1" type="submit" class="btn btn-link text-primary"><FaSearch /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-table-container" style={{ marginBottom: '2.5rem' }}>
                                        <table className="table table-cart">
                                            <thead>
                                                <tr>
                                                    <th className="thumbnail-col">Thumbnail</th>
                                                    <th className="product-col">Product</th>
                                                    <th className="price-col">Price</th>
                                                    <th className="qty-col">Quantity</th>
                                                    <th className="text-right">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredCartItems.map((item, index) => (
                                                    <tr key={index} className="product-row">
                                                        <td>
                                                            <figure className="product-image-container">
                                                                <img
                                                                    src={item.productId.show_img1}
                                                                    alt="Product"
                                                                    className="product-image"
                                                                    style={{ maxWidth: 80 }}
                                                                />
                                                            </figure>
                                                        </td>
                                                        <td className="product-col">
                                                            <h5 className="product-title">{item.productId.Title}</h5>
                                                        </td>
                                                        <td>Rs {item.productId.Item.item_price ? item.productId.Item.item_price : 0}</td>
                                                        <td>
                                                            <div className="quantity-wrapper">
                                                                <div className="input-group">
                                                                    <span className="input-group-btn">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-default btn-number"
                                                                            onClick={() => handleMinusClick(item)}
                                                                        >
                                                                            <FaMinus />
                                                                        </button>
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        name="quant[1]"
                                                                        className="form-control input-number"
                                                                        value={item.quantity}
                                                                        min="1"
                                                                        max="30"
                                                                        readOnly
                                                                    />
                                                                    <span className="input-group-btn">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-default btn-number"
                                                                            onClick={() => handlePlusClick(item)}
                                                                        >
                                                                            <FaPlus />
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-right">
                                                            <span className="subtotal-price">Rs {item.productId.Item.item_price ? item.productId.Item.item_price * item.quantity : 0}</span>
                                                        </td>
                                                        <td className="text-right text-danger" onClick={() => handleRemoveItemClick(item)}>
                                                            <IoRemoveCircle />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="bg-white col-4 mx-10 mt-5">
                                    <div className="container">
                                        <div className="row">
                                            {/* Other columns */}
                                            <div className="col-12">
                                                <div
                                                    className="cart-summary"
                                                    style={{
                                                        marginBottom: "1.6rem",
                                                        padding: "1.5rem",
                                                        border: "1px solid #e7e7e7",
                                                        background: "#fff",
                                                    }}
                                                >
                                                    <h3>CART TOTALS</h3>

                                                    <table className="table table-totals">
                                                        <tfoot>
                                                            <tr>
                                                                <td>
                                                                    <b>Total</b>
                                                                </td>
                                                                <td>
                                                                    <b>
                                                                        {totalPrice}
                                                                    </b>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>

                                                    <div className="checkout-methods">
                                                        <a href="/checkout" className="btn btn-block btn-dark">
                                                            Proceed to Checkout <i className="fa fa-arrow-right"></i>
                                                        </a>
                                                        <a href="#!" className="btn btn-block btn-success mt-2 mx-1" onClick={generateReport}>
                                                            Snap the Cart <FaShoppingCart />
                                                        </a>
                                                        <a href="#!" className="btn btn-block btn-danger mt-2" onClick={handleClearCart}>
                                                            Clear Cart <i className="fa fa-arrow-right"></i>
                                                        </a>
                                                    </div>

                                                    <Alert show={showAlert} onClose={handleCloseAlert} variant="success">
                                                        {alertMessage}
                                                    </Alert>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
    .cart-table-container .input-group .form-control {
      height: 25px;
      border-color: rgba(0, 0, 0, 0.09);
    }

    .cart-table-container .btn-shop,
    .cart-table-container .btn-sm {
      border: none;
      background-color: #f4f4f4;
      color: #222529;
    }

    .cart-table-container .btn-shop:hover,
    .cart-table-container .btn-sm:hover {
      color: #fff;
      background-color: #08c;
    }

    .table.table-cart tr td,
    .table.table-cart tr th,
    .table.table-wishlist tr td,
    .table.table-wishlist tr th {
      vertical-align: middle;
    }

    .table.table-cart tr th,
    .table.table-wishlist tr th {
      border: 0;
      color: #222529;
      font-weight: 500;
      line-height: 2rem;
      font-size: 14px;
      text-transform: uppercase;
    }

    .table.table-cart tr td,
    .table.table-wishlist tr td {
      border-top: 1px solid #e7e7e7;
    }

    .table.table-cart tr td.product-col,
    .table.table-wishlist tr td.product-col {
      padding: 2rem 0.8rem 1.8rem 0;
    }

    .table.table-cart tr.product-action-row td,
    .table.table-wishlist tr.product-action-row td {
      padding: 0 0 2.2rem;
      border: 0;
    }

    .table.table-cart .product-image-container,
    .table.table-wishlist .product-image-container {
      position: relative;
      width: 8rem;
      margin: 0;
    }

    .table.table-cart .product-title,
    .table.table-wishlist .product-title {
      margin-bottom: 0;
      padding: 0;
      font-family: "Open Sans", sans-serif;
      font-weight: 400;
      line-height: 1.75;
      font-size: 16px;
    }

    .table.table-cart .product-title a,
    .table.table-wishlist .product-title a {
      color: inherit;
      text-decoration: none;
    }

    .table.table-cart .subtotal-price,
    .table.table-wishlist .subtotal-price {
      color: #222529;
      font-size: 1.6rem;
      font-weight: 600;
      font-size: 16px;
    }

    .table.table-cart .btn-remove,
    .table.table-wishlist .btn-remove {
      right: 15px;
      font-size: 1.1rem;
    }

    .table.table-cart tfoot td,
    .table.table-wishlist tfoot td {
      padding: 2rem 0.8rem 1rem;
    }

    .table.table-cart tfoot .btn,
    .table.table-wishlist tfoot .btn {
      padding: 1.2rem 2.4rem 1.3rem 2.5rem;
      font-size: 1.3rem;
      font-weight: 700;
      height: 43px;
      letter-spacing: -0.018em;
      font-size: 14px;
      padding: 0px 25px;
    }

    .table.table-cart tfoot .btn+.btn,
    .table.table-wishlist tfoot .btn+.btn {
      margin-left: 1rem;
    }

    .table.table-cart .bootstrap-touchspin.input-group,
    .table.table-wishlist .bootstrap-touchspin.input-group {
      margin-right: auto;
      margin-left: auto;
    }

    .table.table-cart .product-title a,
    .table.table-cart .subtotal-price {
      display: block;
      margin-bottom: 1px;
    }

    .table-cart tr th {
      padding: 1rem;
    }

    .table-cart tr th.thumbnail-col {
      width: 16%;
    }

    .table-cart tr th.product-col {
      width: 33%;
    }

    .table-cart tr th.price-col {
      width: 14%;
    }

    .table-cart td {
      padding: 1rem 1rem;
    }

    .qty-col {
      min-width: 98px;
    }

    tbody .product-col {
      font-size: 0;
    }

    .product-col .product-image-container {
      display: table-cell;
      padding-right: 1.8rem;
      margin-bottom: 0;
      vertical-align: middle;
    }

    .product-col .product-image img {
      border: 1px solid #ccc;
    }

    .product-col .product-title {
      margin-bottom: 1px;
      display: table-cell;
      vertical-align: middle;
    }

    .cart-discount {
      margin-bottom: 2rem;
    }

    .cart-discount h4 {
      margin-bottom: 1.2rem;
      font-size: 1.6rem;
      font-weight: 400;
    }

    .cart-discount form {
      max-width: 420px;
    }

    .cart-discount .input-group-append {
      margin-left: 3px;
    }

    .cart-summary h3 {
      margin-bottom: 10px;
      font-size: 16px;
      letter-spacing: -0.01em;
    }

    .product-image img {
      width: 100px;
      height: 100px;
    }

    .quantity-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .quantity-wrapper label {
      font-weight: 300;
      color: #666666;
      font-size: 15px;
      margin-bottom: 0;
    }

    .quantity-wrapper .input-group {
      width: 100px;
      margin: 0 10px;
    }

    .quantity-wrapper input {
      width: 35px !important;
      pointer-events: none;
      padding: 0;
      border: 0;
      text-align: center;
      margin-left: auto !important;
      position: initial !important;
    }

    .quantity-wrapper .input-group-btn {
      border: 1px solid #d5d5d5;
      border-radius: 50px !important;
      display: flex;
    }

    .quantity-wrapper .btn {
      padding: 0;
      height: 28px;
      width: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      box-shadow: none;
    }

    .quantity-wrapper .bx {
      font-size: 16px;
    }

    .promo-code-area h3 {
      font-size: 16px;
      font-weight: 400;
      margin: 10px 0;
    }

    .apply-coupon-btn {
      background-color: #4f1fff;
      color: #fff;
    }

    .apply-coupon-btn:hover {
      color: #fff;
    }

    .cart-discount input {
      box-shadow: none !important;
      outline: none !important;
    }

    .table-totals tfoot tr td:last-child {
      text-align: right;
    }

    .checkout-methods {
      text-align: center;
    }

    .btn-remove {
      position: absolute;
      top: -10px;
      right: -8px;
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 50%;
      color: #474747;
      background-color: #fff;
      box-shadow: 0 2px 6px 0 rgb(0 0 0 / 40%);
      text-align: center;
      line-height: 2rem;
    }
    .icon-cancel{
      text-decoration: none;
    }
    .icon-cancel:before {
      content: "";
      font-family: "Font Awesome 5 Free";
      font-weight: 700;
    }
  `}</style>

        </section>
    );
};

export default CartComponent;
