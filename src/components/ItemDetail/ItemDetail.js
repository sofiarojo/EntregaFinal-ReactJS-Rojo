import "./ItemDetail.css";
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";


const ItemDetail = ({item}) => {
  const {addItem} = useContext(CartContext)
  
  const handleOnAdd = (count) => {
    addItem({ id: item.id, price: item.price, title: item.name, img: item.img }, count)
  };

  return (
    <div className='row'>
      <div className='card col-md-4 offset-md-4'>
        <img src={item.img} className='img-fluid'alt={item.name} height="350px" width="350px"/>
        <h2>{item.title}</h2>
        <p>{item.level}</p>
        <p className="item-price"> $ {item.price}</p>
        <p className="item-stock"> Cantidad: {item.stock}</p>
        <ItemCount stock={item.stock} initial={1} onAdd={handleOnAdd} className='item-count'/>
      </div>
    </div>
  );
}

export default ItemDetail;
