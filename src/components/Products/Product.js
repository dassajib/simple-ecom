import React from 'react';
import "./Product.css";

const Product = (props) => {
    const {img, name, seller, price, stock} = props.product;
    // console.log(props)
    return (
        <div className="product">
            <img src={img} alt="" srcset="" className="img"/>
            <div>
                <h4 className="product-name">Ptoduct Name : {name}</h4>
                <p>by : {seller}</p>
                <p>Price : {price}$ </p>
                <small>Only {stock} remaining in stock</small> <br></br>
                <button onClick={() => props.addToCartHandle(props.product)} className="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;