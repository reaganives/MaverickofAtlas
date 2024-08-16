import { Link } from 'react-router-dom';

export default function LoginFormHelper() {
    return (
        <>
            <div className="flex justify-between px-32">
                <a href="/reset-password" className="text-xs hover:underline font-noto text-ivyPurple p-2 mt-2">
                    Forgot your password?
                </a>
            </div>
            <div className="mt-8 flex justify-center">
                <Link to="/register">
                    <button className='btn py-0.5 px-4 tracking-widest text-xs text-white bg-ivyPurple'>
                        Register for an account
                    </button>
                </Link>
            </div>
        </>
    );
}
