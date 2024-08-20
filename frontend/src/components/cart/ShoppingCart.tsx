import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useShoppingCart } from './ShoppingCartLogic';

export default function ShoppingCart() {
  const { cartItems, loading, emptyCartMessage, handleQuantityChange, handleRemoveItem } = useShoppingCart();

  if (loading) {
    return <p>Loading cart items...</p>;
  }

  return (
    <div className="w-full bg-white text-ivyPurple">
      {/* Shopping Cart Title */}
      <h1 className="text-2xl font-noto font-semibold">Shopping Cart</h1>
      <div className="w-full h-px bg-ivyPurple mb-8 mt-4"></div>

      {/* Notification Banner */}
      <div className="bg-[#fffce8] border border-blue-200 text-blue-300 px-4 py-3 rounded gap-4 relative mb-6 flex items-center">
        <NotificationsActiveIcon className="text-blue-200/90" />
        <p className="text-sm font-quicksand">Items in cart are not reserved. Check out now before they sell out.</p>
      </div>

      {/* Display the empty cart message if there are no items */}
      {emptyCartMessage ? (
        <p>{emptyCartMessage}</p>
      ) : (
        cartItems.map(({ item, quantity, size, color, style }) => (
          <div key={`${item._id}-${size}-${color}-${style}`} className="flex justify-between mb-6">
            {/* Product Info */}
            <div className="flex gap-6">
              {/* Product Image */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-32 h-32 object-cover"
              />

              {/* Product Details */}
              <div>
                <h2 className="font-semibold font-noto text-lg">{item.name}</h2>
                <div className="flex flex-col gap-1">
                  <p className="mt-1 text-sm font-noto text-zinc-400">Size: <span className="font-semibold font-noto text-ivyPurple">{item.size}</span></p>
                  <p className="text-sm font-noto text-zinc-400">Color: <span className="font-semibold font-noto text-ivyPurple">{item.color}</span></p>
                  <p className="text-sm font-noto text-zinc-400">Style: <span className="font-noto text-ivyPurple">{item.style}</span></p>
                </div>

                {/* Price and Quantity */}
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-lg font-semibold font-noto">${item.price}</span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center mt-4 space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, quantity - 1, size, color, style)}
                    className="border px-2 py-1 font-noto"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, quantity + 1, size, color, style)}
                    className="border px-2 py-1 font-noto"
                  >
                    +
                  </button>
                </div>
                {/* Remove Item Button */}
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 mt-2 underline"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Subtotal Section */}
            <div className="flex flex-col pl-8 border-l border-ivyPurple/30">
              <div className="flex justify-between mb-4">
                <p className="text-lg font-semibold font-noto tracking-wide">Subtotal</p>
                <p className="text-lg font-noto">${(item.price * quantity).toFixed(2)}</p>
              </div>
              <div className="w-full h-px bg-ivyPurple/30"></div>
              <p className="mt-4 text-sm font-noto">Pay in 4 interest-free installments of <span className="font-semibold">${(item.price * quantity / 4).toFixed(2)}</span></p>
            </div>
          </div>
        ))
      )}

      {/* Checkout Buttons */}
      <div className="mt-8 flex flex-col gap-2 items-center">
        <button className="w-full bg-ivyPurple text-white py-2 w-full font-roboto flex items-center justify-center space-x-2">
          <FontAwesomeIcon icon={faLock} className="mr-2" />
          <span className="tracking-wider text-sm py-1">CHECKOUT</span>
        </button>
        <button className="w-full bg-indigo-600 text-white py-2 mt-2 w-full font-quicksand">Shop Pay</button>
      </div>
    </div>
  );
}








