import ProductImages from './ProductImages';
import ProductDetailsWrapper from './ProductDetailsWrapper';

const products = [
    { id: 1, name: 'Oxford in Blue', price: '$125', imageUrl: '/public/photos/newarrivals/Ecru_OCBD.webp' },
    { id: 2, name: 'Oxford in Light Blue', price: '$125', imageUrl: '/public/photos/newarrivals/LightBlue_OCBD.webp' },
    { id: 3, name: 'Oxford in Chambray', price: '$125', imageUrl: '/public/photos/newarrivals/Chambray_OCBD.webp' },
    { id: 4, name: 'Oxford in Green', price: '$125', imageUrl: '/public/photos/newarrivals/Green_OCBD.webp' },
];

const ProductFull = () => {
  return (
    <div className="flex flex-row w-full gap-40">
      <ProductImages products={products} />
      <ProductDetailsWrapper />
    </div>
  );
};

export default ProductFull;

