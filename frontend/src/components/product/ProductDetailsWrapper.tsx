import ProductDetails from './ProductDetails';

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

interface ProductDetailsWrapperProps {
  product: Product;
}

const ProductDetailsWrapper: React.FC<ProductDetailsWrapperProps> = ({ product }) => {
  return (
    <div className="relative w-full">
      {/* Set z-index higher here so ProductDetails stays in front */}
      <div className="relative z-10">
        <ProductDetails product={product} />
      </div>
      {/* Set z-index lower here to push RetroIcon behind */}
      <div className="absolute inset-0 bottom-60 -top-16 flex items-center justify-center pointer-events-none z-0 opacity-80">
        {/* <RetroIcon /> */}
        {/* <ArtDecoCity /> */}
      </div>
    </div>
  );
};

export default ProductDetailsWrapper;



