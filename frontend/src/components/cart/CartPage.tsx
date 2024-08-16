import React from 'react';
import Navbar from '../layout/Navbar';
import LogoHome from '../logo/LogoHome';
import DropdownMenu from '../layout/DropdownMenu';
import ShoppingCart from './ShoppingCart';


export default function CartPage() {
    return(
        <div className="w-full flex flex-col items-center bg-white pt-2">
            <div className="w-full max-w-screen-lg flex flex-col items-center gap-20">
                <div className="w-full">
                    <Navbar />
                </div>
                <div className="w-full flex justify-center">
                    <LogoHome />
                </div>
                <div className="w-full flex">
                    <DropdownMenu />
                </div>
                <div className="w-full flex mb-40">
                    <ShoppingCart />
                </div>
            </div>
        </div>
    )}