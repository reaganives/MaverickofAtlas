import UserInfo from './UserInfo';
import OrderDetails from './OrderDetails';
import { useUserData } from './useUserData';

const UserPage = () => {
  const { userData, orderHistory = [], loading, error } = useUserData();  // Ensure orderHistory is always initialized to an empty array

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading user and order data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col items-center py-8 px-4 md:px-12 border">
      {userData ? (
        <div className="bg-white shadow-md rounded-lg p-8 w-full mb-8">
          <UserInfo
            name={userData.name}
            dob={userData.dob}
            email={userData.email}
            createdAt={userData.createdAt}
          />
        </div>
      ) : (
        <p className="text-lg text-gray-700">No user data found.</p>
      )}

<h2 className="text-2xl font-bold mb-4">Order History</h2>
{orderHistory.length > 0 ? (
  <ul className="w-full max-w-3xl">
    {orderHistory.map(order => (
      <li key={order._id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <OrderDetails
          _id={order._id}
          totalAmount={order.totalAmount}
          orderStatus={order.orderStatus}
          createdAt={order.createdAt}
          items={order.items}
          shipping={order.shipping}
          payment={order.payment}
        />
      </li>
    ))}
  </ul>
) : (
  <p className="text-lg text-gray-700">No order history.</p>
)}

    </div>
  );
};

export default UserPage;





