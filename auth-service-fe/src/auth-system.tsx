import React, { useState } from 'react';
import { Alert, AlertDescription } from './components/ui/alert.tsx';

// Type definitions
type AuthError = {
  message: string;
  field?: string;
};

type Page = 'signin' | 'signup' | 'app';

// Main Auth Container Component
const AuthSystem = () => {
  const [currentPage, setCurrentPage] = useState<Page>('signin');
  
  const renderPage = () => {
    // call function to check if cookie valid
    // will call the backend with the cookie JWT, to validate
    // or use interceptor
    switch (currentPage) {
      case 'signup':
        return <SignUp onNavigate={setCurrentPage} />;
      case 'signin':
        return <SignIn onNavigate={setCurrentPage} />;
      case 'app':
        return <ApplicationPage />;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderPage()}</div>;
};

// SignUp Component
const SignUp = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [error, setError] = useState<AuthError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log("WILL TRY");
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include', // Include cookies in the request
      });
      console.log("TRIED");

      if (response.ok) {
        onNavigate('app');
      } else {
        const data = await response.json();
        setError({ message: data.message });
      }
    } catch (err) {
      setError({ message: 'Failed to sign up. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('signin')}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// SignIn Component
const SignIn = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<AuthError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        onNavigate('app');
      } else {
        const data = await response.json();
        setError({ message: data.message });
      }
    } catch (err) {
      setError({ message: 'Failed to sign in. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('signup')}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Need an account? Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Application Page Component
const ApplicationPage = () => {
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included in the logout request
      });
      console.log('Logged out');
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
            Welcome to the application
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;
