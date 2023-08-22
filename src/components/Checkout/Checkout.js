import './Checkout.css';
import {addDoc,doc,getDoc,collection,getFirestore} from 'firebase/firestore';
import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export const Checkout = () => {
  const cartContext = useContext(CartContext);
  const [orderId, setOrderId] = useState();
  const [buyer, setBuyer] = useState({
    Nombre: "",
    Email: "",
    Telefono: ""
  });

  const { cart } = useContext(CartContext);

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
    setOrderId(orderId);
    cartContext.clearCart();
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
          <input type="submit" value="Confirmar Compra" className="submit-button" />
        </form>
      ) : (
        <div className="order-success">
          <h1>✨¡Tu compra se realizó con éxito!✨</h1>
          <h2>El ID de tu compra es: {orderId} </h2>
          <h3>¡En breve nos pondremos en contacto contigo!</h3>
        </div>
      )}
    </div>
  );
};

export default Checkout;
