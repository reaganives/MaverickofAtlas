import React from 'react';

interface UserInfoProps {
  name: string;
  dob: Date;
  email: string;
  createdAt: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, dob, email, createdAt }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
    <div className="text-lg">
      <h1 className="text-3xl font-bold mb-2">Welcome, {name}</h1>
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

