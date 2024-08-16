import React from 'react';
import Navbar from '../Navbar';
import LogoHome from '../LogoHome';
import DropdownMenu from '../DropdownMenu';
import ProductFull from '../ProductFull';
import HomeDivider from '../HomeDivider';
import Footer from '../Footer';


export default function ProductPage () {
    return (
        <div className="w-full flex flex-col items-center justify-center bg-white pt-2">
            <div className="w-full max-w-screen-lg flex flex-col items-center gap-20">
                <div className="w-full">
                    <Navbar />
                </div>
                <div className="w-full flex justify-center">
                    <LogoHome />
                </div>
                <div className="w-full">
                    <DropdownMenu />
                </div>
                <div className="w-full flex justify-center mb-40">
                    <ProductFull />
                </div>
            </div>
        </div>
    )}