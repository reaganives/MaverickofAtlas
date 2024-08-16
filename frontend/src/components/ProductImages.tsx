import { useState } from 'react';

const ProductImages = ({ products }) => {
  const [mainImage, setMainImage] = useState(products[0].imageUrl);

  return (
    <div className="flex flex-col py-10">
      <div className="mb-4">
        <div className="w-96 h-auto">
          <img
            src={mainImage}
            alt="Main Product"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {products.slice(0, 3).map((product) => (
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
      </div>
    </div>
  );
};

export default ProductImages;