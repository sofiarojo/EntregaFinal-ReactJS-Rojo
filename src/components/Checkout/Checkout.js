import './Checkout.css';
import { addDoc, doc, getDoc, updateDoc, collection, getFirestore } from 'firebase/firestore';
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
  const { Nombre, Email, Telefono } = buyer;

  const { cart } = useContext(CartContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Nombre") {
      if (/^[A-Za-z]+$/.test(value) || value === "") {
        setBuyer({
          ...buyer,
          [name]: value,
        });
      }
    } else if (name === "Telefono") {
      if (/^[0-9]*$/.test(value) || value === "") {
        setBuyer({
          ...buyer,
          [name]: value,
        });
      }
    } else {
      setBuyer({
        ...buyer,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Nombre || !Email || !Telefono) {
      alert("Por favor completa todos los campos de información del comprador.");
      return;
    }

    const isStockSufficient = await checkStockSufficient();
    if (!isStockSufficient) {
      alert("El carrito está vacío o no hay suficiente stock para algún producto.");
      return;
    }

    const total = cart.reduce((acum, unItem) => acum + unItem.price * unItem.cant, 0);
    const dia = new Date();
    const data = { buyer, cart, total, dia };
    await generateOrder(data);
    await updateProductStock();
  };

  const updateProductStock = async () => {
    const querydb = getFirestore();
    for (const product of cart) {
      const itemDoc = doc(querydb, "items", product.id);
      const itemSnapshot = await getDoc(itemDoc);
      if (itemSnapshot.exists()) {
        const stockNuevo = itemSnapshot.data().stock - product.cant;
        await updateDoc(itemDoc, { stock: stockNuevo });
      }
    }
  };

  const checkStockSufficient = async () => {
    const querydb = getFirestore();
    for (const product of cart) {
      const itemDoc = doc(querydb, "items", product.id);
      const itemSnapshot = await getDoc(itemDoc);
      if (itemSnapshot.exists()) {
        const stockReal = itemSnapshot.data().stock;
        if (stockReal < product.cant) {
          return false;
        }
      }
    }
    return true;
  };

  const generateOrder = async (data) => {
    const querydb = getFirestore();
    const queryCollection = collection(querydb, 'Orders');
    localStorage.clear();

    const order = await addDoc(queryCollection, data);
    setOrderId(order.id);
    cartContext.clearCart();
  };

  return (
    <div className="checkout-container">
      <hr />
      {!orderId && (
        <form onSubmit={handleSubmit} className="checkout-form">
          <h1>Ingresa tus Datos:</h1>
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="Nombre"
            placeholder="Nombre"
            value={Nombre}
            onChange={handleInputChange}
            required
          />
          <br />
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={Email}
            onChange={handleInputChange}
            required
          />
          <br />
          <label className="form-label">Teléfono:</label>
          <input
            type="number"
            name="Telefono"
            placeholder="Teléfono"
            value={Telefono}
            onChange={handleInputChange}
            required
          />
          <br />
          <input type="submit" value="Confirmar Compra" className="submit-button" />
        </form>
      )}

      {orderId && (
        <div className="order-success">
          <h1>¡Tu compra se realizó con éxito!</h1>
          <br />
          <h2>El ID de tu compra es: {orderId}</h2>
          <br />
          <br />
          <h3>¡En breve nos pondremos en contacto contigo!</h3>
        </div>
      )}
    </div>
  );
};

export default Checkout;
