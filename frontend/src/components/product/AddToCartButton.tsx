import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

interface AddToCartButtonProps {
  itemId: string;
  collectionId: string;
  size: string;
  color: string;
  style: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ itemId, collectionId, size, color, style }) => {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId'); // Fetch the user ID from local storage
  
    if (!userId) {
      setError('User not logged in');
      return;
    }
  
    try {
      setAdding(true);
      setError(null);
  
      // Make the request to add the item to the cart
      const response = await axios.post('/cart/add', {
        userId,         // Pass the user ID
        collectionId,   // Pass the collection ID
        color,          // Pass the selected color
        size,           // Pass the selected size
        quantity        // Pass the selected quantity
      });
  
      if (response.status === 200) {
        // Redirect to the cart page after successful addition
        navigate(`/cart`);
      }
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError('Failed to add item to cart');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="add-to-cart-button">
      {error && <p className="text-red-500">{error}</p>}

      {/* Quantity Selector */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
          className="px-2 py-1 border border-gray-300"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button
          onClick={() => setQuantity(prev => prev + 1)}
          className="px-2 py-1 border border-gray-300"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-6 py-2 rounded"
        disabled={adding}
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default AddToCartButton;






