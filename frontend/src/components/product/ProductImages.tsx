import { useState, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

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
    <div className="flex flex-col py-4"> {/* Reduced padding from py-10 to py-4 */}
      {/* Main Image */}
      <div className="mb-2"> {/* Reduced margin-bottom from mb-4 to mb-2 */}
        <div className="w-96 flex jusitfy-center items-center" style={{ height: '530px' }}> {/* Adjust the size as needed */}
          {mainImage && (
            <Zoom>
              <img
                src={mainImage}
                alt="Main Product"
                className="object-contain w-full h-full cursor-pointer transition duration-300 transform hover:scale-105"
              />
            </Zoom>
          )}
        </div>
      </div>

      {/* Thumbnail Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-24 h-24 hover:ring-2 ring-black mt-4"
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
          {/* {products[3] && (
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
          )} */}
        </div>
      )}
    </div>
  );
};

export default ProductImages;






