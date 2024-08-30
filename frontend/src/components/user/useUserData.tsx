import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';  // Import isAxiosError from axios
import axios from '../../axiosConfig'; // Import axios from config/axios

interface User {
  _id: string;
  name: string;
  dob: Date;
  email: string;
  createdAt: string;
}

interface Item {
  _id: string;
  name: string;
  size: string;
  color: string;
  style: string;
  price: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  items: { item: Item; quantity: number }[]; // Adjusted to include detailed item data
}

interface Shipping {
  carrier: string;
  trackingNumber: string;
  shippingStatus: string;
  shippedAt: string;
}

interface Payment {
  method: string;
  amount: number;
  paymentStatus: string;
  refundStatus: string;
}

export const useUserData = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [orderHistory, setOrderHistory] = useState<(Order & { shipping?: Shipping; payment?: Payment })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDataAndOrders = async () => {
    try {
      const userResponse = await axios.get('/auth/me');
      const user = userResponse.data.user;
      setUserData(user);

      try {
        const orderResponse = await axios.get(`/orders/user/${user._id}`);
        const orders: Order[] = orderResponse.data.orders || [];

        if (orders.length === 0) {
          setOrderHistory([]); // Handle case where there are no orders
        } else {
          const orderDetailsPromises = orders.map(async (order: Order) => {
            try {
              const [shippingResponse, paymentResponse] = await Promise.all([
                axios.get(`/shipping/${order._id}`),
                axios.get(`/payments/${order._id}`),
              ]);

              return {
                ...order,
                shipping: shippingResponse.data.shipping,
                payment: paymentResponse.data.payment,
              };
            } catch (err) {
              if (err instanceof Error) {
                console.error(`Error fetching shipping or payment for order ${order._id}`, err.message);
              } else {
                console.error(`Unknown error fetching shipping or payment for order ${order._id}`, err);
              }
              return { ...order }; // Return the order even if shipping/payment fails
            }
          });

          const detailedOrders = await Promise.all(orderDetailsPromises);
          setOrderHistory(detailedOrders);
        }
      } catch (orderError) {
        if (isAxiosError(orderError) && orderError.response?.status === 404) {
          setOrderHistory([]); // No orders found
        } else {
          throw orderError; // Re-throw other errors
        }
      }
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401) {
        try {
          await axios.post('/auth/refresh-token');
          await fetchUserDataAndOrders();
        } catch (refreshError) {
          if (refreshError instanceof Error) {
            console.error('Token refresh failed:', refreshError.message);
          } else {
            console.error('Unknown error during token refresh:', refreshError);
          }
          setError('Session expired. Please log in again.');
        }
      } else {
        if (err instanceof Error) {
          console.error('Error fetching user or order data:', err.message);
        } else {
          console.error('Unknown error fetching user or order data:', err);
        }
        setError('Failed to load user or order data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDataAndOrders();
  }, []);

  return { userData, orderHistory, loading, error };
};