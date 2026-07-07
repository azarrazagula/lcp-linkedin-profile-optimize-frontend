import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5001/api';
const GOOGLE_CLIENT_ID = '198458891541-96qpce6lkng67mgmu0p25vgol3i1jveq.apps.googleusercontent.com';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  // Email & Password Auth API Call
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setSuccessMsg('Signed in successfully!');
        localStorage.setItem('user_token', data.token);
        localStorage.setItem('user_profile', JSON.stringify(data));
        localStorage.setItem('last_login_method', 'email');
        localStorage.setItem('last_user_email', data.email || email);
        if (onLoginSuccess) onLoginSuccess(data);
      } else {
        setErrorMsg(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Email login error:', err);
      setErrorMsg('Cannot connect to backend server');
    } finally {
      setLoading(false);
    }
  };

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

        {/* Continue with Google Card */}
        <div className="w-full max-w-md backdrop-blur-2xl bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(10,102,194,0.06)] relative z-10">

          {/* Error / Success Banners */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5">
              <svg className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-55 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5">
              <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Google Continue Button */}
          <div className="flex flex-col items-center justify-center py-4">
            <div id="google-continue-btn" className="w-full flex justify-center"></div>
          </div>

          {/* Divider */}
          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold">Or sign in with email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Small link to switch to email login */}
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('last_login_method');
              localStorage.removeItem('last_user_email');
              window.location.reload();
            }}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Sign in with Email & Password
          </button>

          <div className="mt-6 text-center text-xs text-slate-400 font-medium">
            Powered by Node.js, Express, MongoDB & Gemini AI
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // NEW / FIRST TIME USER → Email Sign In + Create Account (Google)
  // ─────────────────────────────────────────────────────────────
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
          AI LinkedIn Profile Optimizer
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Elevate Your <span className="text-blue-600">Professional Identity</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium mt-2 max-w-sm mx-auto">
          Access your optimized LinkedIn suite powered by Gemini AI
        </p>
      </div>

      {/* Main Glass Card */}
      <div className="w-full max-w-md backdrop-blur-2xl bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(10,102,194,0.06)] relative z-10">

        {/* Error / Success Banners */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5">
            <svg className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5">
            <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Email & Password Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium shadow-xs"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.979 9.979 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.692-4.692a3 3 0 00-4.243-4.243" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </>
            ) : (
              <>
                Sign In
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold">Or create a new account</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Google Sign In — Create New Account */}
        <div className="flex flex-col items-center justify-center">
          <div id="google-create-btn" className="w-full flex justify-center"></div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-400 font-medium">
          Powered by Node.js, Express, MongoDB & Gemini AI
        </div>
      </div>
    </div>
  );
}
