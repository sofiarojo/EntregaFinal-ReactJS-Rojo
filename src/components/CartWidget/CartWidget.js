import { HiShoppingCart } from "react-icons/hi";
import './CartWidget.css';
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../../context/CartContext';


const CartWidget = () => {
    const { getQuantity } = useContext(CartContext);

    return ( 
        <Link to = './cart'>
            <div className="carrito">
                <h4> <HiShoppingCart/> <button style={{ backgroundColor: '#0f0e17', color: '#ff8906', border: 'none' }}>{getQuantity()}</button> </h4>
            </div>
        </Link>
    );
};

export default CartWidget;