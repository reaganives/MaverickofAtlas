import NewArrivalsGrid from "./NewArrivalsGrid";
import LandingPageSlide from "./LandingPageSlide";
import LogoHome from "../logo/LogoHome";
import Navbar from "../layout/Navbar";
import HomeDivider from "../layout/HomeDivider";
import Footer from "../layout/Footer";
import DropdownMenu from "../layout/DropdownMenu";
import NewsLetterSignup from "./Newsletter";
import ShippingBanner from "../layout/ShippingBanner";
import MobileNavbar from "../layout/MobileNavbar";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white pt-2 px-4 lg:px-0">
            <div className="w-full max-w-screen-lg flex flex-col items-center gap-20">
                <div className="w-full hidden lg:flex">
                    <Navbar />
                </div>
                <div className="w-full lg:hidden">
                    <MobileNavbar />
                </div>
                <div className="w-full flex justify-center items-center">
                    <LogoHome />
                </div>
                <div className="w-full px-4">
                    <LandingPageSlide />
                </div>
                <div className="w-full">
                    <NewArrivalsGrid />
                </div>
            </div>
            <div className="w-full">
                    <NewsLetterSignup />
            </div>
        </div>
    );
}

