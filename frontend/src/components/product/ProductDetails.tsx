import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  style: string;
  color: string;
  size: string;
}

interface Collection {
  availableColors: string[];
  availableSizes: string[];
  items: Item[];
}

const ProductDetails: React.FC = () => {
  const { collectionName } = useParams<{ collectionName: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get(`/collections/${collectionName}`);
        setCollection(response.data.collection);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching collection:', err);
        setError('Failed to load collection data.');
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionName]);

  const handleColorSizeSelection = () => {
    const item = collection?.items.find(
      (item) => item.color === selectedColor && item.size === selectedSize
    );
    setSelectedItem(item || null);
  };

  const handleAddToCart = async () => {
    if (!selectedItem) return;

    try {
      const userId = localStorage.getItem('userId'); // Replace with actual user authentication method
      const response = await axios.post('/cart/add', {
        userId,
        collectionId: selectedItem.collection, // Assuming collection is tied to item
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
      });

      // Redirect to cart page upon success
      navigate('/cart');
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError('Failed to add item to cart.');
    }
  };

  useEffect(() => {
    handleColorSizeSelection();
  }, [selectedColor, selectedSize]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full mt-6 lg:mt-0">
      {collection && (
        <>
          <h1 className="text-md font-noto font-semibold tracking-wider text-ivyPurple pb-1">
            {collectionName.toUpperCase()}
          </h1>

          <p className="flex justify-end font-noto text-md mt-10 tracking-wide text-ivyPurple mb-2">
            PRICE: ${selectedItem?.price || 'Select size and color'} (Tax Included)
          </p>

          <div className="bg-white py-1 my-3">
            <div className="h-px bg-ivyPurple/30"></div>
          </div>

          {/* Star Rating */}
          <div className="flex flex-col gap-4">
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
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Please select</option>
                {collection.availableColors.map((color, index) => (
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
                onChange={(e) => setSelectedSize(e.target.value)}
                disabled={!selectedColor}
              >
                <option value="">Please select</option>
                {collection.availableSizes.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white py-1 my-3">
            <div className="h-px bg-ivyPurple/30"></div>
          </div>

          {/* Add to Cart Button */}
          <div className="w-100 flex flex-col justify-center">
            <div className="flex justify-center p-2">
              <div className="flex justify-center pt-2 px-5 rounded-full bg-white w-1/2">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className="bg-ivyPurple text-white px-6 py-4 rounded-lg w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-1 p-2">
              <button className="w-1/4 rounded-md shadow-md font-noto tracking-wider bg-orange-300/90 hover:bg-orange-300/80 hover:scale-105 transition text-white py-2 text-xs">
                Contact Us
              </button>
            </div>
          </div>

          <div className="h-px bg-ivyPurple/30 mt-6"></div>
          <div className="text-xs font-poiret italic text-ivyPurple/65 tracking-wider flex px-1 mb-6 justify-end">
            <p>Maverick of Atlas</p>
          </div>
          <div className="pb-6">
            <a href="#" className="text-xs tracking-tight bg-white text-bvBlue/80 hover:underline">
              Measurement Guide
            </a>
          </div>

          <div className="mt-6 text-xs">
            <div className="flex flex-col gap-6 font-quicksand tracking-tight">
              <p className="text-ivyPurple">Product Name / {selectedItem?.name}</p>
              <p className="text-ivyPurple">Product Code / 03-001</p>
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











