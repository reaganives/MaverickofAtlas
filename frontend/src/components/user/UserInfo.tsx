import React from 'react';

interface UserInfoProps {
  name: string;
  dob: Date;
  email: string;
  createdAt: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, dob, email, createdAt }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
    <div className="">
      <h1 className="text-xs font-quicksand tracking-wider font-bold mb-2">YES, HELLO</h1>
      <h2 className="text-3xl bg-ivyPurple text-white px-2 font-semibold font-noto">{name}</h2>
      <div className="w-full h-px bg-ivyPurple mt-10"></div>
      <p className="text-xs font-noto text-ivyPurple">Account Info</p>
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