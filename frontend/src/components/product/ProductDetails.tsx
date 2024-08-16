import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';


const ProductDetails = () => {
  return (
    <div className="w-full mt-6 lg:mt-0">
      <h1 className="text-md font-noto font-semibold tracking-wider text-ivyPurple pb-1">
        OXFORD COTTON BUTTON DOWN
      </h1>
      <p className="flex flex-end font-noto justify-end text-md mt-10 tracking-wide text-ivyPurple mb-2">
        PRICE: $95 (Tax Included)
      </p>

      <div className="bg-white py-1 my-3">
        <div className="h-px bg-ivyPurple/30"></div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-start items-center">
          <div className="text-lg flex cursor-pointer">
            {[...Array(4)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="gray"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.571 8.332 1.209-6.042 5.885 1.427 8.311-7.385-3.882-7.385 3.882 1.427-8.311-6.042-5.885 8.332-1.209z" />
              </svg>
            ))}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="gray"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.024l2.516 5.18 5.718.83-4.134 4.04.975 5.685-5.075-2.662-5.075 2.662.975-5.685-4.134-4.04 5.718-.83 2.516-5.18m0-2.024l-3.668 7.571-8.332 1.209 6.042 5.885-1.427 8.311 7.385-3.882 7.385 3.882-1.427-8.311 6.042-5.885-8.332-1.209-3.668-7.571z" />
            </svg>
          </div>
          <p className="ml-2 text-xs text-gray-600 cursor-pointer hover:underline py-1 pr-1 rounded bg-white">
            (230 reviews)
          </p>
        </div>
        <div className="flex">
          <div className="font-novo text-bvPink/80 text-xs tracking-normal flex items-center gap-2 py-1 pr-4 rounded bg-white">
            <p>Follow us: </p>
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://twitter.com/maverickofatlas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white py-1 my-3">
        <div className="h-px bg-ivyPurple/30"></div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-2 bg-white py-1 pr-2 rounded-full">
          <label className="block font-semibold text-ivyPurple tracking-wider mb-1 text-sm font-noto">
            Color:
          </label>
          <select className="flex justify-center border z-50 border-black font-noto rounded-lg p-1 text-sm cursor-pointer">
            <option>Please select</option>
            <option>Cambridge Navy</option>
            <option>Chicago White</option>
            <option>Sunset Blue</option>
            <option>Ivy Green</option>
            <option>Pittsburgh Red</option>
          </select>
        </div>
      </div>

      <div className="bg-white py-1 my-3">
        <div className="h-px bg-ivyPurple/30"></div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white py-1 pr-2 rounded-full">
          <label className="block font-semibold text-ivyPurple tracking-wider mb-1 text-sm font-noto">
            Size:
          </label>
          <select className="flex justify-center border dropdown dropdown-bottom border-black font-noto rounded-lg p-1 text-sm cursor-pointer">
            <option>Please select</option>
            <option>38</option>
            <option>40</option>
            <option>42</option>
            <option>44</option>
            <option>46</option>
          </select>
        </div>
      </div>

      <div className="bg-white py-1 my-3">
        <div className="h-px bg-ivyPurple/30"></div>
      </div>

      <div className="w-100 flex flex-col justify-center">
        <div className="flex justify-center p-2">
          <div className="flex justify-center pt-2 px-5 rounded-full bg-white">
            <button className="group w-full px-12 bg-ivyPurple shadow-md text-white tracking-widest font-noto py-2.5 hover:bg-ivyPurple/93 transition-all ease-in-out text-sm">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-1 p-2">
          <button className="w-1/4 rounded-md shadow-md font-noto tracking-wider bg-orange-300/90 hover:bg-orange-300/80 hover:scale-105 transition text-white py-2 text-xs">
            Contact Us
          </button>
        </div>
      </div>

      <div className="h-px bg-ivyPurple/30 mt-6"></div>
      <div className="text-xs font-poiret italic text-ivyPurple/65 tracking-wider flex px-1 mb-6 justify-end ">
        <p>Maverick of Atlas</p>
      </div>
      <div className="pb-6">
        <a
          href=""
          className="text-xs tracking-tight bg-white text-bvBlue/80 hover:underline "
        >
          Measurement Guide
        </a>
      </div>

      <div className="mt-6 text-xs">
        <div className="flex flex-col gap-6 font-quicksand tracking-tight">
          <p className="text-ivyPurple">Product Name / OXFORD COTTON BUTTON DOWN</p>
          <p className="text-ivyPurple">Product Code / 03-001</p>
          <p className="text-ivyPurple">Material / 100% Oxford Cotton</p>
          <p className="text-ivyPurple">Color / Available in several colors</p>
          <p className="text-ivyPurple">Location / North America and EU</p>
          <p className="text-ivyPurple">Manufacturing / Made in Portugal</p>
          <p className="text-ivyPurple">Shipping / Free Shipping on all orders inside of the US</p>
          <p className="text-ivyPurple">Maintenance / Hand wash or machine wash</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;