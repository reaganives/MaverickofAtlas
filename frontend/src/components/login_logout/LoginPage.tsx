import DropdownMenu from "../layout/DropdownMenu";
import LogoHome from "../logo/LogoHome";
import Navbar from "../layout/Navbar";
import LoginFull from "./LoginFull";
import MobileNavbar from "../layout/MobileNavbar";
import Breadcrumb from "../layout/Breadcrumb";

export default function LoginPage () {
    return( 
        <div className="w-full min-h-screen flex flex-col items-center bg-white pt-2 px-4 lg:px-0">
            <div className="w-full max-w-screen-xl flex flex-col items-center gap-20">
                <div className="w-full hidden lg:flex">
                    <Navbar />
                </div>
                <div className="w-full lg:hidden">
                    <MobileNavbar />
                </div>
                <div className="w-full flex justify-center items-center">
                    <LogoHome />
                </div>
                <div className="w-full flex flex-col gap-8">
                    <DropdownMenu />
                    <Breadcrumb />
                </div>
                <div className="w-4/5 flex justify-center mb-40">
                    <LoginFull />
                </div>
            </div>
        </div>
    )
}