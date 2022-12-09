import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import {addToDb, getStoredCart} from "../../utilities/fakedb";
import "./Shop.css";

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
        
    useEffect( () =>{
        fetch("https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            });   
    }, [])

    useEffect(() => {
        if(products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for(const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                if(addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
        }
    },[products])

    const addToCartHandle = (product) => {
        const newCart = [...cart,product];
        setCart(newCart);
        // save on local storage for now
        addToDb(product.key);
    }

    const handleSearch = event => {
        const searchText = event.target.value;
        const matchProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchProducts);
        console.log(matchProducts.length);
    }

    return (
        <>
            <div className="search-container">
                <input onChange={handleSearch} type="text" placeholder="Do Search"/>
            </div>
            <div className="shop-container">
                <div className="product-container">
                    <h3>Products: {products.length} </h3>

                    {
                        displayProducts.map((product,i) => <Product 
                        product={product} 
                        key={i} 
                        addToCartHandle={addToCartHandle} 
                        />)
                    }
                    
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;