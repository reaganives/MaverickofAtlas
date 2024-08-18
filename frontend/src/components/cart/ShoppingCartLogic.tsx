import { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

export const useShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyCartMessage, setEmptyCartMessage] = useState('');  // State for empty cart message

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      // If user is not logged in or no userId is found, show empty cart message
      setEmptyCartMessage('Your cart is currently empty.');
      setLoading(false);  // Stop loading since there's no cart to fetch
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/cart/${userId}`);
        if (response.data.items.length === 0) {
          setEmptyCartMessage('Your cart is currently empty.');
        } else {
          setCartItems(response.data.items);  // Set cart items from backend response
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setEmptyCartMessage('Failed to load cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Function to handle quantity changes
  const handleQuantityChange = async (itemId: string, newQuantity: number, size: string, color: string, style: string) => {
    const userId = localStorage.getItem('userId');
    try {
      await axios.post(`/cart/${userId}`, {
        itemId,
        quantity: newQuantity,
        size,
        color,
        style
      });
      setCartItems((prevItems) => 
        prevItems.map(item => 
          item._id === itemId && item.size === size && item.color === color && item.style === style 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    const userId = localStorage.getItem('userId');
  
    try {
      // First, fetch the user's cart to get the cart ID
      const cartResponse = await axios.get(`/cart/${userId}`);
      const cartId = cartResponse.data._id;
  
      // Make a DELETE request to remove the item using the cartId and itemId
      await axios.delete(`/cart/${cartId}/item/${itemId}`);
  
      // Re-fetch the updated cart items after removing the item
      const updatedCartResponse = await axios.get(`/cart/${userId}`);
      setCartItems(updatedCartResponse.data.items); // Update the state with the updated cart items
  
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  

  return {
    cartItems,
    loading,
    emptyCartMessage,
    handleQuantityChange,
    handleRemoveItem,
  };
};

