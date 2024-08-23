import React from 'react';
import ProductDetails from './ProductDetails';
import RetroIcon from '../logo/RetroIcon';
import ArtDecoCity from '../logo/ArtDecoCity';

const ProductDetailsWrapper = () => {
  return (
    <div className="relative w-full">
      {/* Set z-index higher here so ProductDetails stays in front */}
      <div className="relative z-10">
        <ProductDetails />
      </div>
      {/* Set z-index lower here to push RetroIcon behind */}
      <div className="absolute inset-0 bottom-60 -top-3 left-4 flex items-center justify-center pointer-events-none z-0">
        <RetroIcon />
        {/* <ArtDecoCity /> */}
      </div>
    </div>
  );
};

export default ProductDetailsWrapper;

