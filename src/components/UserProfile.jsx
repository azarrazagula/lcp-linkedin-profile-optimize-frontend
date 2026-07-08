import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5001/api';

export default function UserProfile({ onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('user_token');
      if (!token) {
        setError('No token found. Please login again.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          setError('Failed to fetch profile details.');
        }
      } catch (err) {
        setError('Network error. Cannot reach backend.');
      } finally {
        setLoading(false);
      }
    };

    const storedProfile = localStorage.getItem('user_profile');
    if (storedProfile) {
      try {
        setProfile(JSON.parse(storedProfile));
        setLoading(false);
      } catch (e) {
        // Fallback to fetching from network
        fetchProfile();
      }
    } else {
      fetchProfile();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-3">
        <svg className="w-8 h-8 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-xs font-bold text-slate-550">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 text-center">
        <div className="text-rose-500 text-sm font-semibold mb-3">⚠️ {error}</div>
        <button onClick={onClose} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all">
          Close
        </button>
      </div>
    );
  }

  const initials = profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Mesh/Gradient Premium Header Banner */}
      <div className="h-28 w-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 relative">
        {/* Subtle decorative mesh bubbles inside banner */}
        <div className="absolute top-2 left-4 w-12 h-12 bg-white/10 rounded-full blur-md"></div>
        <div className="absolute -bottom-6 right-8 w-16 h-16 bg-indigo-400/25 rounded-full blur-lg"></div>

        {/* Close Button on Banner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/15 hover:bg-black/25 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs z-25 border border-white/10 shadow-sm"
          aria-label="Close profile"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="text-center px-5 pb-6 relative z-10 -mt-12">
        {/* Avatar / Profile Picture with deep overlay shadow */}
        <div className="flex justify-center mb-3">
          {profile?.avatar ? (
            <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-4 border-white flex items-center justify-center text-white text-3xl font-black shadow-lg hover:scale-105 transition-transform duration-300">
              {initials}
            </div>
          )}
        </div>

        {/* User Identity */}
        <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight flex items-center justify-center gap-1">
          {profile?.name}
          <svg className="w-4 h-4 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24" title="Verified Member">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </h3>
        <p className="text-xs text-slate-500 font-bold mt-0.5">{profile?.email}</p>

        {/* Premium Dashboard Metrics Cards */}
        <div className="mt-5">
          <div className="bg-slate-50/70 border border-slate-100 hover:border-slate-200/80 rounded-2xl p-3 text-center transition-all duration-200">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Profile Status</span>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-black text-slate-700">Active</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-900 active:scale-98 text-white text-xs font-black rounded-2xl shadow-md shadow-slate-800/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
