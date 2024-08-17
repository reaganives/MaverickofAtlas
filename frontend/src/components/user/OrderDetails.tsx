import React from 'react';

interface OrderItem {
  item: {
    _id: string;
    name: string;
    size: string;
    color: string;
    style: string;
    price: number;
  };
  quantity: number;
}

interface OrderDetailsProps {
  _id: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  items: OrderItem[];  // Ensure items are passed correctly
  shipping?: {
    carrier: string;
    trackingNumber: string;
    shippingStatus: string;
    shippedAt: string;
  };
  payment?: {
    method: string;
    amount: number;
    paymentStatus: string;
    refundStatus: string;
  };
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  _id,
  totalAmount,
  orderStatus,
  createdAt,
  items = [],  // Ensure items array is handled properly
  shipping,
  payment,
}) => (
  <div className="flex flex-col space-y-4">
    {/* Order Information */}
    <div className="mb-4">
      <p className="text-sm font-bold">Order ID: {_id}</p>
      <p className="text-sm">Total Amount: ${totalAmount}</p>
      <p className="text-sm">Order Status: {orderStatus}</p>
      <p className="text-sm">Order Date: {new Date(createdAt).toLocaleDateString()}</p>
    </div>

    {/* Order Items */}
    <div className="order-items mb-4">
      <h4 className="font-semibold text-sm">Order Items</h4>
      {items.length > 0 ? (
        <ul className="text-sm">
          {items.map((itemObj, index) => (
            <li key={index} className="mb-4">
              <p><strong>Product Name:</strong> {itemObj.item.name}</p>
              <p><strong>Quantity:</strong> {itemObj.quantity}</p>
              <p><strong>Size:</strong> {itemObj.item.size}</p>
              <p><strong>Color:</strong> {itemObj.item.color}</p>
              <p><strong>Style:</strong> {itemObj.item.style}</p>
              <p><strong>Price:</strong> ${itemObj.item.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No items found for this order.</p>
      )}
    </div>

    {/* Shipping Information */}
    {shipping ? (
      <div className="shipping-info mb-4">
        <h4 className="font-semibold text-sm">Shipping Details</h4>
        <p className="text-sm">Carrier: {shipping.carrier}</p>
        <p className="text-sm">Tracking Number: {shipping.trackingNumber}</p>
        <p className="text-sm">Shipping Status: {shipping.shippingStatus}</p>
        <p className="text-sm">Shipped At: {new Date(shipping.shippedAt).toLocaleDateString()}</p>
      </div>
    ) : (
      <p className="text-sm text-gray-500">Shipping information not available</p>
    )}

    {/* Payment Information */}
    {payment ? (
      <div className="payment-info">
        <h4 className="font-semibold text-sm">Payment Details</h4>
        <p className="text-sm">Payment Method: {payment.method}</p>
        <p className="text-sm">Payment Amount: ${payment.amount}</p>
        <p className="text-sm">Payment Status: {payment.paymentStatus}</p>
        <p className="text-sm">Refund Status: {payment.refundStatus}</p>
      </div>
    ) : (
      <p className="text-sm text-gray-500">Payment information not available</p>
    )}
  </div>
);

export default OrderDetails;







