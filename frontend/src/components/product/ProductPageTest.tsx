
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../axiosConfig';  // Import your Axios configuration

function ProductPage() {
  const { category, itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch the product data using Axios
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/items/${itemId}`);
        setProduct(response.data);
        setSelectedColor(response.data.color); // Default to the item's color
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [itemId]);

  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);

    // Reset size and selected item when color changes
    setSelectedSize('');
    setSelectedItem(null);
  };

  const handleSizeChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size);

    // Find the exact item that matches the selected color and size
    const item = product.items.find(item => item.color === selectedColor && item.size === size);
    setSelectedItem(item);
  };

  const handleAddToCart = async () => {
    if (!selectedItem) {
      alert('Please select a color and size.');
      return;
    }

    try {
      // Example API call to add item to cart using Axios
      await axios.post('/cart', { itemId: selectedItem._id, quantity: 1 });
      console.log(`Item added to cart:`, selectedItem);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div>
      <h1>{product?.name}</h1>
      <img src={selectedItem?.imageUrl} alt={selectedItem?.name || 'Product'} />

      {/* Dropdown for selecting color */}
      <label>
        Color:
        <select value={selectedColor} onChange={handleColorChange}>
          <option value="">Select a color</option>
          {product?.availableColors.map(color => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown for selecting size */}
      <label>
        Size:
        <select value={selectedSize} onChange={handleSizeChange} disabled={!selectedColor}>
          <option value="">Select a size</option>
          {product?.availableSizes.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      {/* Display stock level */}
      {selectedItem && (
        <p>
          Stock available: {selectedItem?.inventory?.stockLevel || 'Out of Stock'}
        </p>
      )}

      <button onClick={handleAddToCart} disabled={!selectedSize || !selectedItem?.inventory?.stockLevel}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductPage;
