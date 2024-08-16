import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface PersonalInfoProps {
    name: string;
    setName: (value: string) => void;
    dob: { month: string; day: string; year: string };
    setDob: (dob: { month: string; day: string; year: string }) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ name, setName, dob, setDob }) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const years = Array.from({ length: new Date().getFullYear() - 1924 + 1 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className='flex flex-col w-full gap-2'>
            <h1 className='font-noto font-semibold text-lg text-ivyPurple tracking-wide'>Personal</h1>
            <div className="w-full h-px bg-ivyPurple"></div>
            <h2 className='font-noto text-md text-ivyPurple mt-2'>Name</h2>
            <label className="input input-bordered flex items-start gap-2">
                <FontAwesomeIcon
                    icon={faUser}
                    className="h-3 w-3 opacity-70 pt-2"
                />
                <input 
                    type="text" 
                    className="grow px-2 border border-ivyPurple/10 mb-4" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
            </label>
            <div className='flex flex-col gap-2'>
                <h2 className="text-ivyPurple font-noto">Date of Birth</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <select 
                        className="grow px-2 border border-ivyPurple/10"
                        value={dob.month}
                        onChange={(e) => setDob({ ...dob, month: e.target.value })}
                        required
                    >
                        <option value="">Month</option>
                        {months.map((month, index) => (
                            <option key={index} value={index + 1}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select 
                        className="grow px-2 border border-ivyPurple/10"
                        value={dob.day}
                        onChange={(e) => setDob({ ...dob, day: e.target.value })}
                        required
                    >
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <select 
                        className="grow px-2 border border-ivyPurple/10"
                        value={dob.year}
                        onChange={(e) => setDob({ ...dob, year: e.target.value })}
                        required
                    >
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
};

export default PersonalInfo;
