import React, { useContext } from "react";
import { shopcontext } from "../components/context/Shopcontext";
import './Css/Product.css'
import Header from "../components/Header/Header";

function ProductPage() {
    const context = useContext(shopcontext);
    const { products, addtoCart } = context || {};


    return (
        <div className="flex">
            <Header />
            <h2>Products</h2>
            <div className="flex">
                <ul>
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                            <li key={product._id}>
                                <strong>{product.productName}</strong> - {product.price}
                                {product.image && <img src={product.image} alt="" />}
                                <div className="btn">
                                    <button onClick={() => addtoCart && addtoCart(product._id)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ProductPage;
