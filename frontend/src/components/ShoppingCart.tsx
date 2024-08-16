import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function ShoppingCart() {
    return (
        <div className="w-full bg-white text-ivyPurple">
            {/* Shopping Cart Title */}
            <h1 className="text-2xl font-noto font-semibold">Shopping Cart</h1>
            <div className="w-full h-px bg-ivyPurple mb-8 mt-4"></div>

            {/* Notification Banner */}
            <div className="bg-[#fffce8] border border-blue-200 text-blue-300 px-4 py-3 rounded gap-4 relative mb-6 flex items-center">
                <NotificationsActiveIcon className="text-blue-200/90" />
                <p className="text-sm font-quicksand">Items in cart are not reserved. Check out now before they sell out.</p>
            </div>

            {/* Cart Section */}
            <div className="flex justify-between">
                {/* Product Info */}
                <div className="flex gap-6">
                    {/* Product Image */}
                    <img
                        src="/photos/newarrivals/Blue_OCBD.webp"  // Replace with the correct image path
                        alt="Floral Eyelet Leisure Shirt"
                        className="w-32 h-32 object-cover"
                    />

                    {/* Product Details */}
                    <div>
                        <h2 className="font-semibold font-noto text-lg">OXFORD COTTON BUTTON DOWN</h2>
                        <div className="flex flex-col gap-1">
                        <p className="mt-1 text-sm font-noto text-zinc-400">Size: <span className="font-semibold font-noto text-ivyPurple">L</span></p>
                        <p className="text-sm font-noto text-zinc-400">Color: <span className="font-semibold font-noto text-ivyPurple">Navy</span></p>
                        <p className="text-sm font-noto text-zinc-400">Style:<span className="font-noto text-ivyPurple"> SH1950949-805</span></p>
                        </div>
                        {/* Price and Quantity */}
                        <div className="mt-4 flex items-center space-x-2">
                            <span className="text-lg font-semibold font-noto">$129</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center mt-4 space-x-2">
                            <button className="border px-2 py-1 font-noto">-</button>
                            <span>1</span>
                            <button className="border px-2 py-1 font-noto">+</button>
                        </div>
                    </div>
                </div>

                {/* Subtotal Section */}
                <div className="flex flex-col pl-8 border-l border-ivyPurple/30">
                    <div className="flex justify-between mb-4">
                    <p className="text-lg font-semibold font-noto tracking-wide">Subtotal</p>
                    <p className="text-lg font-noto">$129</p>
                    </div>
                    <div className="w-full h-px bg-ivyPurple/30"></div>
                    {/* Payment Options */}
                    <p className="mt-4 text-sm font-noto">Pay in 4 interest-free installments of <span className="font-semibold">$32.25</span></p>
                    <div className="flex justify-center w-full"> 
                       <p>with <span className="text-indigo-600">Shop Pay <a className="underline text-sm">learn more</a></span></p>
                    </div>
                    {/* Buttons */}
                    <div className="mt-8 flex flex-col gap-2 items-center">
                    <button className="w-full bg-ivyPurple text-white py-2 w-full font-roboto flex items-center justify-center space-x-2">
                        <FontAwesomeIcon icon={faLock} className="mr-2" />
                        <span className="tracking-wider text-sm py-1">CHECKOUT</span>
                    </button>
                        <button className="w-full bg-indigo-600 text-white py-2 mt-2 w-full font-quicksand">Shop Pay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
