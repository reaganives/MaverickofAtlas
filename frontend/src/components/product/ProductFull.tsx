import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductImages from './ProductImages';
import ProductDetailsWrapper from './ProductDetailsWrapper';
import axios from '../../axiosConfig';

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
  images: Array<{ src: string }>;
}

export default function ProductFull() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
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
    <div className="flex flex-row items-center justify-between lg:flex-row w-full lg:gap-60 px-16">
      {/* Pass the images array as a prop to ProductImages */}
      <ProductImages products={product.images} />
      <ProductDetailsWrapper product={product} />
    </div>
  );
}
