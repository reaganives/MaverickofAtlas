import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { useMemo } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

import DropdownMenu from "../layout/DropdownMenu";

const images = [
  '/photos/carousel/Arrivals.avif',
  '/photos/carousel/ArrivalsAlt.jpeg',
  '/photos/carousel/featured.jpeg',
  '/photos/carousel/featuredAlt.jpeg',
];

export default function LandingPageSlide() {
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 8000,
      fade: false,
      cssEase: 'ease',
    }),
    []
  );

  return (
    <section className="flex flex-col md:flex-row items-end">
      <motion.div
        className="w-full md:w-3/5 flex items-center justify-center rounded-lg"
        initial={{ y: '-4vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70 }}
      >
        <div className="relative w-full flex flex-col max-w-7xl px-4">
          {/* DropdownMenu positioned above the slider */}
          <div className="relative w-fit z-50">
            <DropdownMenu />
          </div>
          <div className="relative">
            <Slider {...settings} className="relative z-10">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Carousel slide ${index + 1}`}
                    className="w-full object-cover h-64 sm:h-80 object-center brightness-[70%] opacity-95"
                  />
                </div>
              ))}
            </Slider>
            {/* Responsive padding and positioning */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 w-full text-center px-4 sm:px-8 md:px-16 lg:px-28 transform translate-y-4 sm:translate-y-0">
              <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl tracking-widest border py-2">
                FOR THOSE WITH THE EYES TO SEE
              </h1>
              <h2 className="text-md sm:text-xl font-poiret mt-2">
                <span className="italic">from </span>Maverick of Atlas
              </h2>
              <h3 className="text-xs sm:text-sm mt-1 text-end">EST. 2024</h3>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Adjusted second motion.div */}
      <motion.div
        className="w-full md:w-2/5 flex items-center justify-center rounded-lg mt-8 md:mt-0"
        initial={{ x: '4vh', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70 }}
      >
        <div className="relative w-full flex flex-col max-w-7xl px-4">
          {/* Add 'group' class here */}
          <div className="relative overflow-hidden w-full h-64 sm:h-80 md:-translate-y-1.5 group">
            <img
              src={"/photos/carousel/rock.jpg"}
              className="w-full h-full object-cover object-center brightness-[90%] group-hover:saturate-50 grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
              alt="Brand Vision"
            />
            {/* Remove 'pointer-events-none' from the overlay */}
            <div className="absolute inset-0 flex flex-col items-end justify-end text-white z-30 w-full text-center px-4 sm:px-12 pb-4 sm:pb-8 md:translate-x-6 md:translate-y-4">
              <h1 className="text-xl sm:text-2xl md:text-xl font-bold">
                ATLAS UNDERGROUND
              </h1>
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-2 justify-center">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="text-sm hover:text-gray-300" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-sm hover:text-gray-300" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-sm hover:text-gray-300" />
                </a>
                <a
                  href="/learn-more"
                  className="text-sm underline hover:text-gray-300 -translate-y-1"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}