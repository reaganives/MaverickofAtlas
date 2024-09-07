import Navbar from '../layout/Navbar';
import DropdownMenu from '../layout/DropdownMenu';
import LogoHome from '../logo/LogoHome';
import UserPage from './UserPage';
import Breadcrumb from '../layout/Breadcrumb';
import MobileNavbar from '../layout/MobileNavbar';


export default function Dashboard() {
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
                <div className="w-full flex">
                    <UserPage />
                </div>
            </div>
        </div>
    )
}