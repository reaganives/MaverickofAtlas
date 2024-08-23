import DropdownMenu from "../layout/DropdownMenu";
import LogoHome from "../logo/LogoHome";
import Navbar from "../layout/Navbar";
import ResetPasswordForm from "./ResetPasswordForm"


export default function ResetPassPage () {
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
                    <ResetPasswordForm />
                </div>
            </div>
        </div>
    )
}