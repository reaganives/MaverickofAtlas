import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // For getting route parameters
import axios from '../../axiosConfig';
import AddToCartButton from './AddToCartButton';

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

const ProductPageTest: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();  // Get the itemId from the URL
  const [product, setProduct] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/items/${itemId}`);  // Make sure this is the correct backend route
        setProduct(response.data.item);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product data.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);  // Fetch product when itemId changes

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-page w-full max-w-4xl mx-auto p-8">
      {product ? (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover" />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-2">${product.price}</p>
            <p className="text-md mb-4">{product.description}</p>

            {/* Add to Cart Button */}
            <AddToCartButton
              itemId={product._id}
              size={product.size}
              color={product.color}
              style={product.style}
            />
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductPageTest;
