import {getFirestore, collection, getDocs, where, query, limit} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';

const ItemListContainer = () => {
  const [item, setItem] = useState([]);
  const {id} = useParams();

  const getData = async (categoria) => {
    const querydb = getFirestore();
    const queryCollection = categoria ? query(collection(querydb, 'items'), where("categoryId", "==", categoria), limit(8)) : collection(querydb, 'items');
    const res = await getDocs(queryCollection)
    const datos = res.docs.map(i => ({id: i.id, ...i.data() }));
    setItem(datos);
  }

  useEffect(() => {
    getData(id)
  }, [id])

  return (
    <div>
      <div>
        <ItemList item={item}/>
      </div>
    </div>
  );
}

export default ItemListContainer;