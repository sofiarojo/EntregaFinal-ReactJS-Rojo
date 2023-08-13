import { HiShoppingCart } from "react-icons/hi";
import './CartWidget.css';
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../../context/CartContext';


const CartWidget = () => {
    const { getQuantity } = useContext(CartContext);

    return ( 
        <Link to="./cart" className="cart-link">
        <div className="carrito">
            <h4>
                <HiShoppingCart className="cart-icon" />
                <button className="cart-button">{getQuantity()}</button>
            </h4>
        </div>
    </Link>

    );
};

export default CartWidget;