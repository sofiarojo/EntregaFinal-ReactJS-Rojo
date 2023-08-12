import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { cart, removeItem } = useContext(CartContext);
  const totalAmount = cart.reduce((total, items) => total + items.price * items.cant, 0);

  return (
    <>
      <h1>VERIFICA TU PEDIDO!</h1>
      <hr />
      <div className="cart-table">
        {cart.map((items) => (
          <div key={items.id} className="cart-row">
            <div className="cart-item">
              <img
                src={items.img}
                alt={items.title}
                className="cart-thumbnail"
              />
            </div>
            <div className="cart-details">{items.title}</div>
            <div className="cart-details">{items.price}</div>
            <div className="cart-details">{items.cant}</div>
            <div className="cart-details">{items.price * items.cant}</div>
            <div className="cart-details">
              <button onClick={() => removeItem(items.id)}>
                Eliminar Producto
              </button>
            </div>
          </div>
        ))}
      </div>
      {cart.length === 0 ? (
        <h1>AUN NO AGREGO NADA AL CARRITO DE COMPRAS.</h1>
      ) : (
        <div>
          <div className="cart-total">
            <h3>Total a pagar: ${totalAmount}</h3>
          </div>
          <Link to="/checkout">
            <button>Finaliza tu Compra</button>
          </Link>
        </div>
      )}
    </>
  );
};