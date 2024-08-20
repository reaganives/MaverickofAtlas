import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ViewAll from './ViewAll';
import axios from '../../axiosConfig'; // Ensure this path is correct

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  style: string;
  collection: { name: string };  // The populated collection with its name
}

export default function NewArrivalsGrid() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get('/items/newarrivals'); // Ensure that this route populates the collection data
        setItems(response.data);
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
    <motion.div
      className="w-full flex flex-col justify-center mb-20"
      initial={{ x: -175, opacity: 0 }}  // Start off-screen at the left
      animate={{ x: 0, opacity: 1 }}  // Animate to its normal position
      transition={{ type: 'spring', stiffness: 70 }}  // Smooth spring effect
    >
      <div className="text-xs font-semibold tracking-wide font-noto text-ivyPurple mb-4">
        NEW ARRIVALS
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Slice the items array to show only the first 36 items */}
        {items.slice(0, 16).map((item) => (
          <div key={item._id} className="flex flex-col items-center">
            <Link to={`/collections/${item.collection.name}`}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="object-cover mb-2 hover:ring-4 ring-black cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="text-end mt-8">
        <ViewAll />
      </div>
    </motion.div>
  );
}



