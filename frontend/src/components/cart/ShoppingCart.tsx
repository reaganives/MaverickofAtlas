import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import axios from '../../axiosConfig';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);  // Cart items default to an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subtotal, setSubtotal] = useState(0);

  // Helper function to calculate subtotal
  const calculateSubtotal = (items: any[]) => {
    return items.reduce((acc, item) => {
      const price = parseFloat(item.merchandise.price.amount);
      const quantity = item.quantity;
      return acc + price * quantity;
    }, 0).toFixed(2);
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get('/shopify/cart');
      const fetchedItems = response?.data?.lines?.edges || [];

      // Ensure all properties (like color, size) are preserved correctly
      const updatedItems = fetchedItems.map(({ node }) => ({
        id: node.id,
        quantity: node.quantity,
        merchandise: {
          ...node.merchandise,
          color: node.merchandise.selectedOptions?.find(option => option.name === 'Color')?.value || 'N/A',
          size: node.merchandise.selectedOptions?.find(option => option.name === 'Size')?.value || 'N/A',
        },
      }));

      setCartItems(updatedItems);
      setSubtotal(calculateSubtotal(updatedItems));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveItem = async (lineItemId: string) => {
    try {
      await axios.post('/shopify/cart/remove', { lineItemId });
      fetchCart();  // Re-fetch the cart to ensure properties are preserved
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart.');
    }
  };

  const handleUpdateQuantity = async (lineItemId: string, newQuantity: number) => {
    try {
      await axios.post('/shopify/cart/update', { lineItemId, quantity: newQuantity });
      fetchCart();  // Re-fetch the cart to ensure properties are preserved
    } catch (err) {
      console.error('Error updating item quantity:', err);
      setError('Failed to update item quantity.');
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/shopify/checkout');
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;  // Redirect to Shopify checkout
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20 mb-96 w-full">
        <p className="text-ivyPurple text-xs py-.5 px-2 tracking-widest font-roboto">Loading Cart...</p>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="w-full bg-white text-ivyPurple">
        <h1 className="text-2xl font-noto font-semibold">Shopping Cart</h1>
        <div className="w-full h-px bg-ivyPurple mb-8 mt-4"></div>
        <div className="flex justify-center mt-20 mb-96 w-full">
          <p className="text-ivyPurple text-xs py-.5 px-2 tracking-widest font-noto">Cart is currently empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-ivyPurple">
      <h1 className="text-2xl font-noto font-semibold">Shopping Cart</h1>
      <div className="w-full h-px bg-ivyPurple mb-8 mt-4"></div>

      <div className="bg-[#fffce8] border border-blue-200 text-blue-300 px-4 py-3 rounded gap-4 relative mb-6 flex items-center">
        <NotificationsActiveIcon className="text-blue-200/90" />
        <p className="text-sm font-quicksand">Items in cart are strictly a demonstration of functionality. Checkout is disabled on account of this being merely a portfolio site.</p>
      </div>

      {cartItems.map(({ id, quantity, merchandise }) => {
        const { price, product, color, size } = merchandise;
        const productName = product?.title || merchandise.title || 'Unnamed Product';

        return (
          <div key={id} className="flex justify-between mb-6">
            <div className="flex gap-4">
              <img
                src={product?.images?.edges?.[0]?.node.src || ''}
                alt={productName}
                className="w-32 h-32 object-cover"
              />
              <div>
                <h2 className="font-semibold font-noto text-lg">{productName}</h2>
                <div className="flex flex-col gap-1">
                  <p className="mt-1 text-sm font-noto text-zinc-400">Price: <span className="font-semibold font-noto text-ivyPurple">${price?.amount || '0.00'}0</span></p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleUpdateQuantity(id, quantity - 1)} disabled={quantity <= 1}>-</button>
                    <p className="text-sm font-noto text-zinc-400">Quantity: <span className="font-noto text-ivyPurple">{quantity}</span></p>
                    <button onClick={() => handleUpdateQuantity(id, quantity + 1)}>+</button>
                  </div>
                  <p className="text-sm font-noto text-zinc-400">Color: <span className="font-noto text-ivyPurple">{color}</span></p>
                  <p className="text-sm font-noto text-zinc-400">Size: <span className="font-noto text-ivyPurple">{size}</span></p>
                </div>
                <button
                  onClick={() => handleRemoveItem(id)}
                  className="text-red-500 mt-2 underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-8 flex flex-col gap-2 items-center">
        <div className="w-full flex justify-end pr-8 border-t pt-4 border-ivyPurple">
          <p className="text-lg font-semibold font-noto">Subtotal: <span className="text-ivyPurple">${subtotal}</span></p>
        </div>
        <button 
          className="w-full bg-ivyPurple text-white py-2 w-full font-roboto flex items-center justify-center space-x-2 mt-4 cursor-not-allowed" 
          // onClick={handleCheckout}
          >
          <FontAwesomeIcon icon={faLock} className="mr-2" />
          <span className="tracking-wider text-sm py-1">CHECKOUT</span>
        </button>
      </div>
    </div>
  );
}






