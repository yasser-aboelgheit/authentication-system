import { useState, useEffect } from 'react';
import { Page } from './types.ts';
import SignIn from './pages/Signin.tsx';
import ApplicationPage from './pages/ApplicationPage.tsx';
import SignUp from './pages/Signup.tsx';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Main Auth Container Component
const AuthSystem = () => {
  const [currentPage, setCurrentPage] = useState<Page>('signin');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (currentPage == 'signup') {
      return;
    }
    fetch(`${BASE_URL}/auth/get-user`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(async (res) => {
        if (res.ok) {
          const name = await res.text();
          setUserName(name);
          setCurrentPage('app');
        } else {
          setCurrentPage('signin');
        }
      })
      .catch(() => setCurrentPage('signin'))
      .finally(() => setLoading(false));
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <SignUp onNavigate={setCurrentPage} />;
      case 'signin':
        return <SignIn onNavigate={setCurrentPage} />;
      case 'app':
        return <ApplicationPage userName={userName} />;
    }
  };
  if (loading) {
    return <div>loading</div>;
  }
  return <div className="min-h-screen bg-gray-50">{renderPage()}</div>;
};

export default AuthSystem;
