import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductImages from './ProductImages';
import ProductDetailsWrapper from './ProductDetailsWrapper';
import axios from '../../axiosConfig';

export default function ProductFull() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/shopify/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product data.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <div className="flex flex-col items-center lg:flex-row w-full gap-16 lg:gap-52">
      {/* Pass the images array as a prop to ProductImages */}
      <ProductImages products={product.images} />
      <ProductDetailsWrapper product={product} />
    </div>
  );
}
