import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

interface Variant {
  id: string;
  size: string;
  color: string;
  price: string;
  imageUrl: string;
  available: boolean;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  variants: Variant[];
}

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/shopify/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product data.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const sizes = product?.variants
      .filter(variant => variant.color === color)
      .map(variant => variant.size) || [];
    setAvailableSizes(sizes);
    setSelectedSize(''); // Reset size when color changes
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const variant = product?.variants.find(v => v.color === selectedColor && v.size === size) || null;
    setSelectedVariant(variant);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setAdding(true);

    try {
      const response = await axios.post('/shopify/cart/add', {
        variantId: selectedVariant.id,
        quantity: quantity,
      });

      if (response.status === 200) {
        // Store the cart token in cookies instead of localStorage
        const cartToken = response.data.cart_token;
        Cookies.set('shopifyCartToken', cartToken, { expires: 7, secure: true, sameSite: 'Strict' });

        // Redirect to the cart page after successful addition
        navigate('/cart');
      }
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError('Failed to add item to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full mt-6 lg:mt-0">
      {product && (
        <>
          <h1 className="text-md font-noto font-semibold tracking-wider text-ivyPurple pb-1">
            {product.name.toUpperCase()}
          </h1>

          <p className="flex justify-end font-noto text-md mt-10 tracking-wide text-ivyPurple mb-2">
            PRICE: ${selectedVariant?.price || 'Select size and color'} (Tax Included)
          </p>
          <div className="bg-white py-1 my-3">
            <div className="h-px bg-ivyPurple/30"></div>
          </div>

          {/* Star Rating */}
          <div className="flex justify-start items-center">
            <div className="text-lg flex cursor-pointer">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="gray"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.571 8.332 1.209-6.042 5.885 1.427 8.311-7.385-3.882-7.385 3.882 1.427-8.311-6.042-5.885 8.332-1.209z" />
                </svg>
              ))}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="gray"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.024l2.516 5.18 5.718.83-4.134 4.04.975 5.685-5.075-2.662-5.075 2.662.975-5.685-4.134-4.04 5.718-.83 2.516-5.18m0-2.024l-3.668 7.571-8.332 1.209 6.042 5.885-1.427 8.311 7.385-3.882 7.385 3.882-1.427-8.311 6.042-5.885-8.332-1.209-3.668-7.571z" />
              </svg>
            </div>
            <p className="ml-2 text-xs text-gray-600 cursor-pointer hover:underline py-1 pr-1 rounded bg-white">
              (230 reviews)
            </p>
          </div>

          <div className="flex">
            <div className="font-novo text-bvPink/80 text-xs tracking-normal flex items-center gap-2 py-1 pr-4 rounded bg-white">
              <p>Follow us: </p>
              <a
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="https://twitter.com/maverickofatlas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </a>
            </div>
          </div>

          <div className="bg-white py-1 my-3">
            <div className="h-px bg-ivyPurple/30"></div>
          </div>

          {/* Color Selection */}
          <div className="flex items-center">
            <div className="flex items-center gap-2 bg-white py-1 pr-2 rounded-full">
              <label className="block font-semibold text-ivyPurple tracking-wider mb-1 text-sm font-noto">
                Color:
              </label>
              <select
                className="flex justify-center border z-50 border-black font-noto rounded-lg p-1 text-sm cursor-pointer"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
              >
                <option value="">Please select</option>
                {[...new Set(product.variants.map(v => v.color))].map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white py-1 my-3">
            <div className="h-px bg-ivyPurple/30"></div>
          </div>

          {/* Size Selection */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-white py-1 pr-2 rounded-full">
              <label className="block font-semibold text-ivyPurple tracking-wider mb-1 text-sm font-noto">
                Size:
              </label>
              <select
                className="flex justify-center border dropdown dropdown-bottom border-black font-noto rounded-lg p-1 text-sm cursor-pointer"
                value={selectedSize}
                onChange={(e) => handleSizeChange(e.target.value)}
                disabled={!selectedColor}
              >
                <option value="">Please select</option>
                {availableSizes.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity Selector */}
          {/* <div className="flex items-center mb-4">
            <button
              onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
              className="px-2 py-1 border border-gray-300"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="px-2 py-1 border border-gray-300"
            >
              +
            </button>
          </div> */}
          <div className="bg-white py-1 my-3">
            <div className="h-px bg-ivyPurple/30"></div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex flex-col justify-center items-center bg-white py-1">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor || !selectedVariant?.available || adding}
              className="bg-ivyPurple text-white px-6 py-4 rounded-md w-1/2"
            >
              {adding ? 'Adding...' : selectedVariant?.available ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          <div className="bg-white py-1 my-3">
            <div className="h-px bg-ivyPurple/30"></div>
          </div>

          {/* Additional Product Info */}
          <div className="mt-6 text-xs">
            <div className="flex flex-col gap-6 font-quicksand tracking-tight">
              <p className="text-ivyPurple">Product Name / {product.name}</p>
              <p className="text-ivyPurple">Product Code / {product._id}</p>
              <p className="text-ivyPurple">Material / 100% Oxford Cotton</p>
              <p className="text-ivyPurple">Color / {selectedColor}</p>
              <p className="text-ivyPurple">Size / {selectedSize}</p>
              <p className="text-ivyPurple">Manufacturing / Made in Portugal</p>
              <p className="text-ivyPurple">Shipping / Free Shipping on all orders inside of the US</p>
              <p className="text-ivyPurple">Maintenance / Hand wash or machine wash</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;