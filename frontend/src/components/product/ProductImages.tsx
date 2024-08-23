import { useState, useEffect } from 'react';

interface ProductImage {
  id: string;
  src: string;
}

interface ProductImagesProps {
  products: ProductImage[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ products = [] }) => {
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    if (products.length > 0) {
      setMainImage(products[0].src);  // Set the main image to the first image initially
    }
  }, [products]);

  return (
    <div className="flex flex-col py-10">
      {/* Main Image */}
      <div className="mb-4">
        <div className="w-96 h-auto">
          {mainImage && (
            <img
              src={mainImage}
              alt="Main Product"
              className="object-contain w-full h-full"
            />
          )}
        </div>
      </div>

      {/* Thumbnail Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-24 h-24 hover:ring-2 ring-black"
              onMouseEnter={() => setMainImage(product.src)}
            >
              <img
                src={product.src}
                alt="Thumbnail"
                className="object-cover w-full h-full cursor-pointer"
              />
            </div>
          ))}

          {/* Render the fourth image if it exists */}
          {products[3] && (
            <div
              key={products[3].id}
              className="w-24 h-24 hover:ring-2 transition ring-black col-start-1 row-start-2"
              onMouseEnter={() => setMainImage(products[3].src)}
            >
              <img
                src={products[3].src}
                alt="Thumbnail"
                className="object-cover w-full h-full transition cursor-pointer"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductImages;


