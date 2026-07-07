import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5001/api';
const GOOGLE_CLIENT_ID = '198458891541-96qpce6lkng67mgmu0p25vgol3i1jveq.apps.googleusercontent.com';

export default function LoginPage({ onLoginSuccess, isModal = false }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Check if user previously logged in with Google (returning user flow)
  const [isReturningGoogleUser] = useState(() => {
    return localStorage.getItem('last_login_method') === 'google';
  });
  const [returningUserEmail] = useState(() => {
    return localStorage.getItem('last_user_email') || '';
  });

  // Load Google Identity Services SDK
  useEffect(() => {
    const handleResize = () => {
      if (window.google && window.google.accounts) {
        const calculatedWidth = Math.min(360, Math.max(200, window.innerWidth - 80));

        // Render the button for "Create new account" flow
        const createBtn = document.getElementById('google-create-btn');
        if (createBtn) {
          window.google.accounts.id.renderButton(createBtn, {
            theme: 'filled_blue',
            size: 'large',
            shape: 'pill',
            width: calculatedWidth,
            text: 'signup_with',
          });
        }

        // Render the button for "Continue with" flow (returning user)
        const continueBtn = document.getElementById('google-continue-btn');
        if (continueBtn) {
          window.google.accounts.id.renderButton(continueBtn, {
            theme: 'outline',
            size: 'large',
            shape: 'pill',
            width: calculatedWidth,
            text: 'continue_with',
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);

    if (document.getElementById('google-gsi-script')) {
      // If script already exists, just trigger render
      setTimeout(handleResize, 100);
      return () => window.removeEventListener('resize', handleResize);
    }

    const script = document.createElement('script');
    script.id = 'google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && window.google.accounts) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => {
              if (response.credential) {
                postGoogleTokenToBackend(response.credential);
              }
            },
          });

          // Trigger initial render
          handleResize();
        } catch (e) {
          console.log('Google Identity init:', e);
        }
      }
    };
    document.head.appendChild(script);

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Google OAuth Token Exchange with Backend API
  const postGoogleTokenToBackend = async (token) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: token }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setSuccessMsg(`Welcome, ${data.name || 'User'}!`);
        localStorage.setItem('user_token', data.token);
        localStorage.setItem('user_profile', JSON.stringify(data));
        localStorage.setItem('last_login_method', 'google');
        localStorage.setItem('last_user_email', data.email || '');
        if (onLoginSuccess) onLoginSuccess(data);
      } else {
        setErrorMsg(data.message || 'Google Auth Failed');
      }
    } catch (err) {
      console.error('Google auth error:', err);
      setErrorMsg('Cannot connect to backend. Check if server is running.');
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RETURNING GOOGLE USER → Show "Continue with Google" only
  // ─────────────────────────────────────────────────────────────
  if (isReturningGoogleUser) {
    const cardContent = (
      <div className={`w-full max-w-md backdrop-blur-2xl bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(10,102,194,0.06)] relative z-10 flex flex-col items-center justify-center ${isModal ? '!border-0 !shadow-none !bg-transparent !p-0' : ''}`}>
        {/* Error / Success Banners */}
        {errorMsg && (
          <div className="w-full mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5">
            <svg className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="w-full mb-5 p-3.5 rounded-xl bg-emerald-55 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5">
            <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Google Continue Button */}
        <div className="w-full py-4 flex justify-center">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-slate-500 font-bold animate-pulse">
              <svg className="w-4 h-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting with Google...
            </div>
          ) : (
            <div id="google-continue-btn" className="w-full flex justify-center animate-fadeIn"></div>
          )}
        </div>
      </div>
    );

    if (isModal) return cardContent;

    return (
      <div className="min-h-screen bg-slate-50 bg-grid-pattern flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Brand Header */}
        <div className="mb-8 text-center relative z-10 animate-float">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md">
            <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zM18 17h-2.4v-3.8c0-1.1-.4-1.8-1.3-1.8-.7 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V17H10.4s.1-6.3 0-7h2.4v1c.3-.5 1-1.2 2.3-1.2 1.7 0 3 1.1 3 3.5V17z" />
            </svg>
            Welcome Back
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Continue to <span className="text-blue-600">Your Profile</span>
          </h1>
          {returningUserEmail && (
            <p className="text-slate-500 text-sm font-medium mt-2">{returningUserEmail}</p>
          )}
        </div>

        {cardContent}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // NEW / FIRST TIME USER → Sign Up with Google only
  // ─────────────────────────────────────────────────────────────
  const cardContentNew = (
    <div className={`w-full max-w-md backdrop-blur-2xl bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(10,102,194,0.06)] relative z-10 flex flex-col items-center justify-center text-center ${isModal ? '!border-0 !shadow-none !bg-transparent !p-0' : ''}`}>
      {/* Brand Icon & Heading */}
      <div className="mb-6 flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/25 mb-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zM18 17h-2.4v-3.8c0-1.1-.4-1.8-1.3-1.8-.7 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V17H10.4s.1-6.3 0-7h2.4v1c.3-.5 1-1.2 2.3-1.2 1.7 0 3 1.1 3 3.5V17z" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-slate-800">LinkedIn Profile Optimizer</h2>
        <p className="text-slate-500 text-xs font-semibold mt-1 max-w-[280px]">
          Optimize your professional LinkedIn presence powered by Gemini AI
        </p>
      </div>

      {/* Error / Success Banners */}
      {errorMsg && (
        <div className="w-full mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5 text-left">
          <svg className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="w-full mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5 text-left">
          <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Google Sign In — Create New Account */}
      <div className="w-full py-4 flex justify-center">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500 font-bold animate-pulse">
            <svg className="w-4 h-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting with Google...
          </div>
        ) : (
          <div id="google-create-btn" className="w-full flex justify-center animate-fadeIn"></div>
        )}
      </div>
    </div>
  );

  if (isModal) return cardContentNew;

  return (
    <div className="min-h-screen bg-slate-50 bg-grid-pattern flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      {cardContentNew}
    </div>
  );
}
