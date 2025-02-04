import { useState } from 'react';
import { ApplicationPageProps } from '../types.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ApplicationPage: React.FC<ApplicationPageProps> = ({ userName }) => {
  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      window.location.reload();
    } catch {
      console.log('Failed to log out');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-100 shadow">
        <h2 className="text-xl font-semibold">Easy Generator</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h1 className="text-3xl font-bold text-center">
            Welcome {userName ?? 'Guest'}! to the application
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
