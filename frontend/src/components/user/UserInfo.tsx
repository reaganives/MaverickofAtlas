import React from 'react';

interface UserInfoProps {
  name: string;
  dob: Date;
  email: string;
  createdAt: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, dob, email, createdAt }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 w-full">
    <div className="w-full">
      <h1 className="text-xs font-quicksand tracking-wider font-bold mb-2">YES, HELLO</h1>
      <h2 className="text-3xl text-ivyPurple font-bold font-noto w-fit tracking-wide">{name}</h2>
      <div className="w-full h-px bg-ivyPurple mt-5"></div>
      <p className="text-xs font-noto text-ivyPurple mb-8">Account Info</p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Date of Birth:</strong> {new Date(dob).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Email:</strong> {email}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Joined:</strong> {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default UserInfo;