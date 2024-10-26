import RegistrationForm from "./RegistrationForm";
import Navbar from "../layout/Navbar";
import LogoHome from "../logo/LogoHome";
import DropdownMenu from "../layout/DropdownMenu";
import MobileNavbar from "../layout/MobileNavbar";
import Breadcrumb from "../layout/Breadcrumb";

export default function RegistrationPage () {
    return (
        <div className="w-full flex flex-col items-center bg-white pt-2 px-4 lg:px-0">
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
            <div className="w-full flex justify-center mb-40">
                <RegistrationForm />
            </div>
        </div>
    </div>
    )
}