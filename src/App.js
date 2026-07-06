import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Home from './components/Home';

const API_BASE_URL = 'http://localhost:5001/api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Session Persistence: Verify user_token & user_profile on application mount
  useEffect(() => {
    const verifyStoredSession = async () => {
      const savedToken = localStorage.getItem('user_token');
      const savedProfile = localStorage.getItem('user_profile');

      if (!savedToken) {
        setLoadingSession(false);
        return;
      }

      // Try restoring local profile first for fast startup
      if (savedProfile) {
        try {
          setCurrentUser(JSON.parse(savedProfile));
        } catch (e) {
          console.error('Error parsing stored user profile:', e);
        }
      }

      // Verify token with backend GET /api/auth/me
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${savedToken}`,
          },
        });

        if (res.ok) {
          const userData = await res.json();
          setCurrentUser({
            ...userData,
            token: savedToken,
          });
          localStorage.setItem('user_profile', JSON.stringify({ ...userData, token: savedToken }));
        } else {
          // Token expired or invalid
          console.warn('Session token invalid or expired. Logging out.');
          handleLogout();
        }
      } catch (err) {
        console.warn('Backend reachability check for /api/auth/me:', err.message);
      } finally {
        setLoadingSession(false);
      }
    };

    verifyStoredSession();
  }, []);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_profile');
    setCurrentUser(null);
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-dark-bg bg-grid-pattern flex flex-col items-center justify-center text-white">
        <svg className="w-8 h-8 animate-spin text-blue-500 mb-3" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-sm font-semibold text-slate-400">Verifying session...</span>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-dark-bg text-slate-100 font-sans">
      {currentUser ? (
        <Home currentUser={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
