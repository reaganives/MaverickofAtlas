import React from 'react';
import PersonalInfo from './PersonalInfo';
import AccountInfo from './AccountInfo';

interface FormFieldsProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  dob: { month: string; day: string; year: string };
  setDob: React.Dispatch<React.SetStateAction<{ month: string; day: string; year: string }>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  verifyPassword: string;
  setVerifyPassword: React.Dispatch<React.SetStateAction<string>>;
}

const FormFields: React.FC<FormFieldsProps> = ({ name, setName, dob, setDob, email, setEmail, password, setPassword, verifyPassword, setVerifyPassword }) => {
  return (
    <div className='flex flex-col lg:flex-row justify-center py-4 px-12 lg:gap-40 gap-16'>
      {/* Personal Info */}
      <PersonalInfo
        name={name}
        setName={setName}
        dob={dob}
        setDob={setDob}
      />

      {/* Account Info */}
      <AccountInfo
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        verifyPassword={verifyPassword}
        setVerifyPassword={setVerifyPassword}
      />
    </div>
  );
};

export default FormFields;
