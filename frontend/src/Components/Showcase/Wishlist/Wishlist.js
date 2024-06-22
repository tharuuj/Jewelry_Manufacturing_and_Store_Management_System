import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { IoRemoveCircle } from "react-icons/io5";

function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const[user,setuser_id]=useState(JSON.parse(localStorage.getItem('user')));
    

    useEffect(() => {
        fetchWishlistItems();
    }, []);

    const fetchWishlistItems = async () => {
        try {
            const userId = 1; 

            const response = await axios.get(`http://localhost:8070/wishlist/${user._id}`);
            setWishlistItems(response.data.wishlistItems);
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
        }
    };

    const handleRemoveItemClick = async (itemId) => {
        try {
            const userId = 1; 

            await axios.delete(`http://localhost:8070/wishlist/${user._id}/removeItem/${itemId}`);
            fetchWishlistItems();
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const filteredWishlistItems = wishlistItems.filter(item =>
        item.product.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section>
            <div className="bg-white mx-10">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <div className="row cart-wrapper">
                                <div className="col-sm-12 col-md-12">
                                    <div className="col-12">
                                        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 col-12">
                                            <div className="input-group">
                                                <input
                                                    type="search"
                                                    placeholder="Search in the Wishlist"
                                                    aria-describedby="button-addon1"
                                                    className="form-control border-0 bg-light"
                                                    onChange={handleSearch}
                                                    value={searchQuery}
                                                />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-link text-primary"><FaSearch /></button>
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredWishlistItems.map((item, index) => (
                                                    <tr key={index} className="product-row">
                                                        <td>
                                                            <figure className="product-image-container">
                                                                <img
                                                                    src={item.product.show_img1}
                                                                    alt="Product"
                                                                    className="product-image"
                                                                    style={{ maxWidth: 80 }}
                                                                />
                                                            </figure>
                                                        </td>
                                                        <td className="product-col">
                                                            <h5 className="product-title">{item.product.Title}</h5>
                                                        </td>
                                                        <td className="text-right text-danger" onClick={() => handleRemoveItemClick(item._id)}>
                                                            <IoRemoveCircle />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Wishlist;
