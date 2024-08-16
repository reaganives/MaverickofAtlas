import Navbar from '../Navbar'
import LogoHome from '../LogoHome'
import DropdownMenu from '../DropdownMenu'  
import ResetPassForm from '../ResetPassForm'

export default function ResetPassPage () {
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
                    <ResetPassForm />
                </div>
            </div>
        </div>
    )
}

