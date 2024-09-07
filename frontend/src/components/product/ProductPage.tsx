import Navbar from '../layout/Navbar';
import LogoHome from '../logo/LogoHome';
import DropdownMenu from '../layout/DropdownMenu';
import ProductFull from './ProductFull';
import Breadcrumb from '../layout/Breadcrumb';
import MobileNavbar from '../layout/MobileNavbar';



export default function ProductPage () {
    return (
        <div className="w-full flex flex-col items-center bg-white pt-2 px-4 lg:px-0">
            <div className="w-full max-w-screen-lg flex flex-col items-center gap-20">
                <div className="w-full lg:flex hidden">
                    <Navbar />
                </div>
                <div className="w-full lg:hidden">
                    <MobileNavbar />
                </div>
                <div className="w-full flex justify-center">
                    <LogoHome />
                </div>
                <div className="w-full flex flex-col gap-8">
                    <DropdownMenu />
                    <Breadcrumb />
                </div>
                <div className="w-full flex justify-center mb-40">
                    <ProductFull />
                </div>
            </div>
        </div>
    )}