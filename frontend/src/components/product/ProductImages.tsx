import { useState, useEffect } from 'react';

const ProductImages = ({ products }) => {
  const [mainImage, setMainImage] = useState('');

  // Ensure the main image is set when the products array is updated
  useEffect(() => {
    if (products.length > 0) {
      setMainImage(products[0].imageUrl);
    }
  }, [products]);

  return (
    <div className="flex flex-col py-10">
      {/* Main Image */}
      <div className="mb-4">
        <div className="w-96 h-auto">
          <img
            src={mainImage}
            alt="Main Product"
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 gap-2">
        {products.slice(0, 3).map((product, index) => (
          <div
            key={product.id}
            className="w-24 h-24 hover:ring-2 ring-black"
            onMouseEnter={() => setMainImage(product.imageUrl)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-full cursor-pointer"
            />
          </div>
        ))}

        {/* Render the fourth image if it exists */}
        {products[3] && (
          <div
            key={products[3].id}
            className="w-24 h-24 hover:ring-2 transition ring-black col-start-1 row-start-2"
            onMouseEnter={() => setMainImage(products[3].imageUrl)}
          >
            <img
              src={products[3].imageUrl}
              alt={products[3].name}
              className="object-cover w-full h-full transition cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImages;
