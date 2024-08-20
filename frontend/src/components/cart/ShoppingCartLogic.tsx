import { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

export const useShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyCartMessage, setEmptyCartMessage] = useState('');

  const userId = localStorage.getItem('userId');

  const fetchCartItems = async () => {
    if (!userId) {
      setEmptyCartMessage('Your cart is currently empty.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`/cart/${userId}`);
      const cartData = response.data;

      // Check if the cart is empty
      if (cartData.items.length === 0) {
        setEmptyCartMessage('Your cart is currently empty.');
      } else {
        // For each cart item, fetch the corresponding inventories for the item
        const populatedCartItems = await Promise.all(
          cartData.items.map(async (cartItem) => {
            const itemId = cartItem.item._id;
            const itemResponse = await axios.get(`/items/${itemId}`);
            const itemData = itemResponse.data;

            // Ensure inventories are defined before finding the matching inventory
            const inventory =
              itemData.inventories?.find(
                (inv) => inv.size === cartItem.size && inv.color === cartItem.color
              ) || null; // Set inventory to null if not found

            return {
              ...cartItem,
              item: itemData, // Include the populated item data
              inventory, // Include the corresponding inventory or null
            };
          })
        );

        setCartItems(populatedCartItems);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setEmptyCartMessage('Failed to load cart items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Function to handle quantity changes
  const handleQuantityChange = async (itemId, newQuantity, size, color, style) => {
    try {
      const cartResponse = await axios.get(`/cart/${userId}`);
      const cartId = cartResponse.data._id;

      await axios.put(`/cart/${cartId}/item/${itemId}/quantity`, { newQuantity });

      // Update the local state to reflect the new quantity
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.item._id === itemId && item.size === size && item.color === color && item.style === style
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Function to handle item removal
  const handleRemoveItem = async (itemId) => {
    try {
      const cartResponse = await axios.get(`/cart/${userId}`);
      const cartId = cartResponse.data._id;

      await axios.delete(`/cart/${cartId}/item/${itemId}`);

      // Re-fetch the updated cart items after removing the item
      fetchCartItems();
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






