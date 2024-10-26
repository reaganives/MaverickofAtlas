import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axiosConfig'; // Ensure this path is correct
import ViewAll from './ViewAll';

interface Variant {
  price: string;
}

interface Item {
  id: string;
  title: string;
  description: string;
  variants: Variant[];
  imageUrl: string;
}

export default function CollectionItemsGrid() {
  const { collectionHandle } = useParams<{ collectionHandle: string }>();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollectionItems = async () => {
      try {
        const response = await axios.get(`/shopify/collections/new-arrivals`);
        console.log(response.data); // Log the data for debugging
        setItems(response.data); // Adjust to match backend response structure
        setLoading(false);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to fetch items');
        setLoading(false);
      }
    };

    fetchCollectionItems();
  }, [collectionHandle]);

  const getProductIdFromGlobalId = (globalId: string) => {
    // Extract the numeric ID from the global ID
    return globalId.split('/').pop();
  };

  const getRepeatedItems = (items: Item[], count: number) => {
    const repeatedItems: Item[] = [];
    let i = 0;
    while (repeatedItems.length < count) {
      repeatedItems.push(items[i % items.length]);
      i++;
    }
    return repeatedItems;
  };

  if (loading) {
    return <div className="flex justify-center mt-20 mb-96 w-full"><p className="text-ivyPurple text-xs py-.5 px-2 tracking-widest font-roboto mb-96">Loading Items...</p></div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const displayedItems = getRepeatedItems(items, 12);

  return (
    <motion.div
      className="w-full flex flex-col justify-center mb-20 px-4 lg:px-0"
      initial={{ x: -175, opacity: 0 }}  // Start off-screen at the left
      animate={{ x: 0, opacity: 1 }}  // Animate to its normal position
      transition={{ type: 'spring', stiffness: 70 }}  // Smooth spring effect
    >
      <div className="text-xs font-semibold tracking-wide font-noto text-ivyPurple mb-4">
        NEW ARRIVALS
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex flex-col items-center">
            <Link to={`/new-arrivals/${getProductIdFromGlobalId(item.id)}`}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover mb-2 hover:ring-4 ring-black cursor-pointer scale-95"
              />
            </Link>
            <div className="text-center">
              <p className="text-xs font-semibold tracking-wider font-noto text-ivyPurple">
                {item.title} 
              </p>
              <p className="text-xs font-quicksand tracking-wide italic text-ivyPurple">
              {item.description}
              </p>
          </div>
          </div>
        ))}
      </div>
      <div className="text-end mt-12 px-2">
        <ViewAll />
      </div>
    </motion.div>
  );
}



