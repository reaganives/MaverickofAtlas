import { Link } from 'react-router-dom';

export default function LoginFormHelper() {
    return (
        <>
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
