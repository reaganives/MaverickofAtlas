import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

interface Order {
  _id: string;
  status: string;
  totalAmount: number;
}

interface User {
  name: string;
  dob: Date;
  email: string;
}

const UserPage = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user details and order history
    axios.get('/users/me')
      .then(response => {
        setUserData(response.data.user);
        setOrderHistory(response.data.orders);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching user data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>User Account Information</h1>
      {userData && (
        <>
          <p>Name: {userData.name}</p>
            <p>Date of Birth: {userData.dob}</p>
          <p>Email: {userData.email}</p>
        </>
      )}

      <h2>Order History</h2>
      {orderHistory.length > 0 ? (
        <ul>
          {orderHistory.map(order => (
            <li key={order._id}>
              Order #{order._id} - {order.status} - ${order.totalAmount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default UserPage;

