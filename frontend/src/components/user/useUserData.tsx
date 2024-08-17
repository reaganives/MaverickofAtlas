import { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

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

  useEffect(() => {
    const fetchUserDataAndOrders = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get('/users/me');
        const user = userResponse.data.user;
        setUserData(user);

        // Fetch user orders
        const orderResponse = await axios.get(`/orders/user/${user._id}`);
        const orders = orderResponse.data.orders;

        // Fetch detailed items, shipping, and payment for each order
        const orderDetailsPromises = orders.map(async (order: Order) => {
          try {
            // Fetch shipping and payment details
            const shippingUrl = `/shipping/${order._id}`;
            const paymentUrl = `/payments/${order._id}`;
            const shippingResponse = await axios.get(shippingUrl);
            const paymentResponse = await axios.get(paymentUrl);

            // Populate items in the order (we assume items are already populated in the order response)
            return {
              ...order,
              shipping: shippingResponse.data.shipping,
              payment: paymentResponse.data.payment,
            };
          } catch (err) {
            console.error(`Error fetching shipping or payment for order ${order._id}`, err);
            return { ...order }; // Return the order even if shipping/payment fails
          }
        });

        const detailedOrders = await Promise.all(orderDetailsPromises);
        setOrderHistory(detailedOrders);
      } catch (err) {
        setError('Failed to load user, order, shipping, or payment data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndOrders();
  }, []);

  return { userData, orderHistory, loading, error };
};

