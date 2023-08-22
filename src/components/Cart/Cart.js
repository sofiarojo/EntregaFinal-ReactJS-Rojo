import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

export const Cart = () => {
  const { cart, removeItem, addItem, getCartTotal } = useContext(CartContext);

  const handleIncrease = (item) => {
    if (item.cant < 5) {
      addItem(item, item.cant + 1);
    }
  };

  const handleDecrease = (item) => {
    if (item.cant > 1) {
      addItem(item, item.cant - 1);
    }
  };

  return (
    <>
      <h1>Verifica tu pedido:</h1>
      <hr />
      <div className="cart-table">
        <div className="cart-row cart-header">
          <div className="cart-details2">Compra</div>
          <div className="cart-details2">Nombre</div>
          <div className="cart-details2">Precio Unitario</div>
          <div className="cart-details2">Cantidad</div>
          <div className="cart-details2">Precio Total</div>
          <div className="cart-details2">Acciones</div>
        </div>
        {cart.map((item) => (
          <div key={item.id} className="cart-row">
            <div className="cart-item">
              <img
                src={item.img}
                alt={item.title}
                className="cart-thumbnail"
              />
            </div>
            <div className="cart-details">{item.title}</div>
            <div className="cart-details">$ {item.price}</div>
            <div className="cart-details">
              <button className='operacion' onClick={() => handleDecrease(item)}>-</button>
              {item.cant}
              <button className='operacion' onClick={() => handleIncrease(item)}>+</button>
            </div>
            <div className="cart-details">$ {item.price * item.cant}</div>
            <div className="cart-details">
              <button onClick={() => removeItem(item.id)}>
                Eliminar Producto
              </button>
            </div>
          </div>
        ))}
      </div>
      {cart.length === 0 ? (
        <h2>Su carrito se encuentra vacío.</h2>
      ) : (
        <div>
          <div className="cart-total">
            <h3>Total a pagar: ${getCartTotal()}</h3>
            <Link to="/checkout">
              <button>Finalizar Compra</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
