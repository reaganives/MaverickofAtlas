import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axiosConfig'; // Ensure this path is correct

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
        const response = await axios.get(`/shopify/collections/${collectionHandle}`);
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

  if (loading) {
    return <div className="flex justify-center mt-20 mb-96 w-full"><p className="text-ivyPurple text-xs py-.5 px-2 tracking-widest font-roboto mb-96">Loading Items...</p></div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <motion.div
      className="w-full flex flex-col justify-center mb-20"
      initial={{ x: -175, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 70 }}
    >
      <div className="text-xs font-semibold tracking-wide font-noto text-ivyPurple mb-4">
        {collectionHandle?.toUpperCase()}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <Link to={`/${collectionHandle}/${getProductIdFromGlobalId(item.id)}`}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover mb-2 hover:ring-4 ring-black cursor-pointer scale-95"
              />
            </Link>
            <div className="text-center">
              <p className="font-noto text-md font-semibold">{item.title}</p>
              {item.variants.length > 0 && (
                <p className="font-noto text-sm text-gray-500">${item.variants[0].price}0</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}





