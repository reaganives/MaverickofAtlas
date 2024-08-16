import Navbar from '../Navbar';
import LogoHome from '../LogoHome';
import NewsLetterSignup from '../Newsletter';
import AboutBio from '../AboutBio';
import AboutGallery from '../AboutGallery';
import DropdownMenu from '../DropdownMenu';

export default function AboutPage() {
    return (
        <div className="w-full flex flex-col items-center justify-center bg-white pt-2">
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
                <div className="w-full flex justify-center">
                    <AboutBio />
                </div>
                <div className="w-full flex justify-center mb-40">
                    <AboutGallery />
                </div>
            </div>
            <div className="w-full">
                    <NewsLetterSignup />
            </div>
        </div>
    )
}