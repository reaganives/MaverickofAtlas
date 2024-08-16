import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

interface AccountInfoProps {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    verifyPassword: string;
    setVerifyPassword: (value: string) => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ email, setEmail, password, setPassword, verifyPassword, setVerifyPassword }) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className='flex flex-col gap-2 w-full'>
            <h1 className='font-noto font-semibold text-lg text-ivyPurple tracking-wide'>Account</h1>
            <div className="w-full h-px bg-ivyPurple"></div>
            <h2 className='font-noto text-md mt-2 text-ivyPurple'>Email</h2>
            <label className="input input-bordered flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-ivyPurple opacity-70" />
                <input 
                    type="email" 
                    className="grow px-2 border border-ivyPurple/10" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
            </label>
            <h2 className='font-noto text-md text-ivyPurple'>Password</h2>
            <label className="input input-bordered flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} className="text-ivyPurple opacity-70" />
                <input
                    type={passwordVisible ? "text" : "password"}
                    className="grow px-2 border border-ivyPurple/10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} className="text-ivyPurple opacity-70" />
                <input
                    type={passwordVisible ? "text" : "password"}
                    className="grow px-2 border border-ivyPurple/10"
                    placeholder="Verify Password"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    required
                />
                <FontAwesomeIcon
                    icon={passwordVisible ? faEye : faEyeSlash}
                    className="cursor-pointer opacity-70"
                    onClick={togglePasswordVisibility}
                />
            </label>
        </div>
    );
};

export default AccountInfo;

