import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  size: string;
  color: string;
  style: string;
}

const NewArrivalsLogic: React.FC = () => {
  const [newArrivals, setNewArrivals] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get('/items/newarrivals');
        setNewArrivals(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch new arrivals');
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return <p>Loading new arrivals...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>New Arrivals</h1>
      <div className="grid grid-cols-3 gap-4">
        {newArrivals.map(item => (
          <div key={item._id} className="border p-4">
            <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover" />
            <h2 className="font-bold">{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Size: {item.size}</p>
            <p>Color: {item.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsLogic;
