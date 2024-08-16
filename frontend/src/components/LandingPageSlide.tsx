import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import DropdownMenu from "./DropdownMenu";

const images = [
    '/photos/carousel/Arrivals.avif',
    '/photos/carousel/ArrivalsAlt.jpeg',
    '/photos/carousel/featured.jpeg',
    '/photos/carousel/featuredAlt.jpeg'
];

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", color: "#160323" }}
            onClick={onClick}
        >
            <ArrowForwardIosIcon />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", color: "#160323" }}
            onClick={onClick}
        >
            <ArrowBackIosIcon />
        </div>
    );
}

export default function LandingPageSlide() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: false,
        cssEase: 'linear',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <motion.div
            className="w-full flex items-center justify-center"
            initial={{ x: '10vh', opacity: 0 }}  // Start off-screen at the bottom
            animate={{ x: 0, opacity: 1 }}  // Animate to its normal position
            transition={{ type: 'spring', stiffness: 70 }}  // Smooth spring effect with a delay
        >
            <div className="relative w-full flex flex-col max-w-6xl">
                {/* Ensure DropdownMenu is positioned and layered above the slider */}
                <div className="relative w-fit z-50">
                    <DropdownMenu />
                </div>
                <Slider {...settings} className="relative z-10">
                    {images.map((img, index) => (
                        <div key={index} className="relative">
                            <img 
                                src={img} 
                                alt={`Slide ${index}`} 
                                className="w-full object-cover object-center brightness-75" 
                                style={{ height: '480px' }} 
                            />
                        </div>
                    ))}
                </Slider>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-30">
                    <div className="text-2xl sm:text-4xl md:text-5xl font-poiret font-bold tracking-wide p-1">
                        FOR THOSE WITH THE EYES TO SEE
                    </div>
                    <div className="text-md sm:text-base font-poiret mt-2 italic">
                       from Maverick of Atlas
                    </div>
                    <div className="text-xs sm:text-sm mt-1">
                        EST. 2024
                    </div>
                </div>
            </div>
        </motion.div>
    );
}





