import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';
import { addDoc, doc, getDoc, collection, getFirestore } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import './Checkout.css';

export const Checkout = () => {
  const cartContext = useContext(CartContext);
  const [orderId, setOrderId] = useState();
  const [buyer, setBuyer] = useState({
    Nombre: "",
    Email: "",
    Telefono: ""
  });

  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyer({
      ...buyer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyer.Nombre || !buyer.Email || !buyer.Telefono) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const { isValid, message } = await validateCart();
    if (!isValid) {
      alert(message);
      return;
    }

    const total = cart.reduce((acum, unItem) => acum + unItem.price * unItem.cant, 0);
    const dia = new Date();
    const data = { buyer, cart, total, dia };
    const orderId = await generateOrder(data);

    Swal.fire({
      title: '¡Tu compra se realizó con éxito!',
      text: `El ID de tu compra es: ${orderId}`,
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        cartContext.clearCart();
        setOrderId(orderId);
        navigate("/");
      }
    });
  };

  const validateCart = async () => {
    const querydb = getFirestore();
    for (const product of cart) {
      const itemDoc = doc(querydb, "items", product.id);
      const itemSnapshot = await getDoc(itemDoc);
      if (itemSnapshot.exists()) {
        const stockReal = itemSnapshot.data().stock;
        if (stockReal < product.cant) {
          return {
            isValid: false,
            message: "No hay suficiente stock."
          };
        }
      }
    }

    return {
      isValid: true,
      message: ""
    };
  };

  const generateOrder = async (data) => {
    const querydb = getFirestore();
    const queryCollection = collection(querydb, "Orders");
    const order = await addDoc(queryCollection, data);
    
    return order.id;
  };

  return (
    <div className="checkout-container">
      {!orderId ? (
        <form onSubmit={handleSubmit} className="checkout-form">
          <h1>Ingresa tus Datos:</h1>
          <input
            type="text"
            name="Nombre"
            placeholder="Nombre"
            value={buyer.Nombre}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={buyer.Email}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="Telefono"
            placeholder="Teléfono"
            value={buyer.Telefono}
            onChange={handleInputChange}
            required
          />
          <input type="submit" value="Confirmar Compra" className="submit-button"/>
        </form>
      ) : null}
    </div>
  );
};

export default Checkout;