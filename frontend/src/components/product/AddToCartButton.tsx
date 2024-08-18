import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

interface AddToCartButtonProps {
  itemId: string;
  size: string;
  color: string;
  style: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ itemId, size, color, style }) => {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stockLevel, setStockLevel] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch item stock on mount
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`/inventory/item/${itemId}`);
        setStockLevel(response.data.stockLevel);
      } catch (err) {
        setError('Error fetching stock');
      }
    };
    fetchStock();
  }, [itemId]);

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId'); // Fetch the user ID from local storage

    if (!userId) {
      setError('User not logged in');
      return;
    }

    // Check if stock is available before adding to cart
    if (stockLevel !== null && quantity > stockLevel) {
      setError('Insufficient stock available');
      return;
    }

    setAdding(true);
    setError(null);

    try {
      // Fetch or create the user's cart
      const cartResponse = await axios.get(`/cart/${userId}`);
      const cartId = cartResponse.data._id;

      // Post to add the item to the cart
      await axios.post(`/cart/${cartId}/item/${itemId}`, {
        userId,
        itemId,
        quantity,
        size,
        color,
        style,
      });

      setAdding(false);

      // Redirect to the cart page after successful addition
      navigate(`/cart`);
    } catch (err) {
      setAdding(false);
      setError('Failed to add item to cart');
      console.error('Error adding item to cart:', err);
    }
  };

  return (
    <div className="add-to-cart-button">
      {/* Display any error messages */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Stock Warning */}
      {stockLevel !== null && stockLevel <= 0 && <p className="text-red-500">Out of stock</p>}

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
          disabled={stockLevel !== null && quantity >= stockLevel}
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-6 py-2 rounded"
        disabled={adding || stockLevel === 0}
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default AddToCartButton;




