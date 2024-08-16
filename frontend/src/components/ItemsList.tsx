import { useEffect, useState } from 'react';
import axios from '../axiosConfig';

interface Item {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);  // Initialize items as an array

  useEffect(() => {
    axios.get('/items')
      .then((response) => {
        console.log('Response data:', response.data);  // Ensure data is being logged correctly
        setItems(Array.isArray(response.data) ? response.data : []);  // Safeguard for array response
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.length > 0 ? (
          items.map(item => (
            <li key={item._id}>
              <h3>{item.name} - ${item.price}</h3>
              <p>{item.description}</p>
              <img src={item.imageUrl} alt={item.name} width="200" />
            </li>
          ))
        ) : (
          <p>No items found</p>
        )}
      </ul>
    </div>
  );
}

export default ItemsList;


