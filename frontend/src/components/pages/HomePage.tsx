import NewArrivalsGrid from "../NewArrivalsGrid";
import LandingPageSlide from "../LandingPageSlide";
import LogoHome from "../LogoHome";
import Navbar from "../Navbar";
import HomeDivider from "../HomeDivider";
import Footer from "../Footer";
import DropdownMenu from "../DropdownMenu";
import NewsLetterSignup from "../Newsletter";
import ShippingBanner from "../ShippingBanner";

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

