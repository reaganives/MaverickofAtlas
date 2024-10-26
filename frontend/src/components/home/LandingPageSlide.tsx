import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { useMemo } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import DropdownMenu from "../layout/DropdownMenu";

const images = [
  '/photos/carousel/Arrivals.avif',
  '/photos/carousel/ArrivalsAlt.jpeg',
  '/photos/carousel/featured.jpeg',
  '/photos/carousel/featuredAlt.jpeg',
];

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  direction: 'next' | 'prev';
}

function Arrow({ className, style, onClick, direction }: ArrowProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick && onClick();
    }
  };

  return (
    <div
      className={className}
      style={{ ...style, display: 'block', color: '#160323' }}
      onClick={onClick}
      role="button"
      aria-label={direction === 'next' ? 'Next slide' : 'Previous slide'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {direction === 'next' ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
    </div>
  );
}

export default function LandingPageSlide() {
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      fade: false,
      cssEase: 'ease',
      nextArrow: <Arrow direction="next" />,
      prevArrow: <Arrow direction="prev" />,
    }),
    []
  );

  return (
    <motion.div
      className="m:w-full flex items-center justify-center rounded-lg"
      initial={{ x: '10vh', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 70 }}
    >
      <div className="relative w-full flex flex-col max-w-7xl px-0">
        {/* DropdownMenu positioned above the slider */}
        <div className="relative w-fit z-50">
          <DropdownMenu />
        </div>
        <Slider {...settings} className="relative z-10">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Carousel slide ${index + 1}`}
                className="w-full object-cover lg:h-[500px] h-[270px] object-center brightness-[70%]"
              />
            </div>
          ))}
        </Slider>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-30">
          <h1 className="text-lg md:text-4xl lg:text-6xl font-poiret tracking-wide p-1">
            FOR THOSE WITH THE EYES TO SEE
          </h1>
          <h2 className="text-md sm:text-xl font-poiret mt-2 italic">
            from Maverick of Atlas
          </h2>
          <h3 className="text-xs sm:text-sm mt-1">EST. 2024</h3>
        </div>
      </div>
    </motion.div>
  );
}