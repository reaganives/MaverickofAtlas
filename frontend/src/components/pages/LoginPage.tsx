import DropdownMenu from "../DropdownMenu";
import LogoHome from "../LogoHome";
import Navbar from "../Navbar";
import HomeDivider from "../HomeDivider";
import Footer from "../Footer";
import LoginFull from "../LoginFull";


export default function LoginPage () {
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
                <div className="w-full flex justify-center mb-40">
                    <LoginFull />
                </div>
            </div>
        </div>
    )
}