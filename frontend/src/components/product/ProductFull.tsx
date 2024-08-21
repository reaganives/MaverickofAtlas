import { useParams } from 'react-router-dom';
import ProductImages from './ProductImages';
import ProductDetailsWrapper from './ProductDetailsWrapper';

const oxfords = [
  { id: 1, name: 'Oxford in Blue', price: '$125', imageUrl: '/public/photos/newarrivals/Ecru_OCBD.webp' },
  { id: 2, name: 'Oxford in Light Blue', price: '$125', imageUrl: '/public/photos/newarrivals/LightBlue_OCBD.webp' },
  { id: 3, name: 'Oxford in Chambray', price: '$125', imageUrl: '/public/photos/newarrivals/Chambray_OCBD.webp' },
  { id: 4, name: 'Oxford in Green', price: '$125', imageUrl: '/public/photos/newarrivals/Green_OCBD.webp' },
];

const polos = [
  { id: 5, name: 'Polo in Blue', price: '$125', imageUrl: '/public/photos/newarrivals/Blue_Polo.webp' },
  { id: 6, name: 'Polo in Light Blue', price: '$125', imageUrl: '/public/photos/newarrivals/Brown_Polo.webp' }
];

const anoraks = [
  { id: 7, name: 'Anorak in Blue', price: '$125', imageUrl: '/public/photos/newarrivals/Madras_Anorak.webp' },
  { id: 8, name: 'Anorak in Light Blue', price: '$125', imageUrl: '/public/photos/newarrivals/Madras_Anorak2.webp' }
];

const vintages22 = [
  { id: 9, name: 'S22 in Blue', price: '$125', imageUrl: '/public/photos/newarrivals/S-22.webp' },
];

const belts = [
  { id: 10, name: 'Belt in Blue', price: '$125', imageUrl: '/public/photos/newarrivals/belt.webp' },
];

const socks = [
  { id: 11, name: 'Socks in Blue', price: '$125', imageUrl: '/public/photos/newarrivals/socks.webp' },
];

const collections = {
  oxfords,
  polos,
  anoraks,
  vintages22,
  belts,
  socks
};

const ProductFull = () => {
  const { collectionName } = useParams<{ collectionName: string }>();

  // Get products based on the collection name from the URL, default to empty array
  const products = collections[collectionName.toLowerCase()] || [];

  return (
    <div className="flex flex-row w-full gap-52">
      <ProductImages products={products} />
      <ProductDetailsWrapper />
    </div>
  );
};

export default ProductFull;


