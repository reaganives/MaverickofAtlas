import NewArrivalsGrid from "./NewArrivalsGrid";
import LandingPageSlide from "./LandingPageSlide";
import LogoHome from "../logo/LogoHome";
import Navbar from "../layout/Navbar";
import HomeDivider from "../layout/HomeDivider";
import Footer from "../layout/Footer";
import DropdownMenu from "../layout/DropdownMenu";
import NewsLetterSignup from "./Newsletter";
import ShippingBanner from "../layout/ShippingBanner";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white pt-2">
            <div className="w-full max-w-screen-lg flex flex-col items-center gap-20">
                <div className="w-full">
                    <Navbar />
                </div>
                <div className="w-full flex justify-center">
                    <LogoHome />
                </div>
                <div className="w-full">
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

