import React, { useState, useEffect, useRef } from 'react';
import LinkedInForm from './LinkedInForm';
import LoginPage from './LoginPage';
import UserProfile from './UserProfile';
import Footer from './Footer';
import gsap from 'gsap';

export default function Home({ currentUser, onLoginSuccess, onLogout }) {
  // Modal flow states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // FAQ accordion & filter state
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // GSAP Magnetic button ref
  const signInBtnRef = useRef(null);

  useEffect(() => {
    const btn = signInBtnRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.45,
        y: y * 0.45,
        duration: 0.12,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: 'power3.out'
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [currentUser]);

  const handleLoginSuccessWrapper = (userData) => {
    onLoginSuccess(userData);
    setShowLoginModal(false);
  };

  const faqs = [
    {
      q: "What is the LinkedIn Profile Optimizer?",
      a: "It is a MERN-stack wizard application powered by Gemini AI that helps you draft, optimize, and organize your LinkedIn profile data step-by-step to attract recruiters.",
      category: "General"
    },
    {
      q: "Does this application sync directly with my LinkedIn account?",
      a: "LinkedIn does not permit third-party apps to directly edit user profiles due to security restrictions. Instead, this tool provides direct one-click \"Edit on LinkedIn\" buttons linking to your profile settings, making it incredibly easy to copy-paste the optimized text.",
      category: "General"
    },
    {
      q: "How do I use the AI optimization features?",
      a: "Sign in to your account, fill in your profile details, and click the \"✨ AI\" buttons next to text fields. The optimizer analyzes your overall profile context and uses Gemini AI to rewrite summaries, headlines, and descriptions with key search terms.",
      category: "AI Optimizer"
    },
    {
      q: "Is my profile data secure?",
      a: "Yes, all profile data is stored locally and securely. Data is sent to the Gemini API only when you request an AI optimization.",
      category: "Security"
    }
  ];

  const filteredFaqs = faqs.filter(faq => activeCategory === 'All' || faq.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#faf8f0] pb-0 font-sans selection:bg-slate-900 selection:text-[#faf8f0]">

      {/* ── Top Navbar ───────────────────────────────────────────────────── */}
      <nav className="backdrop-blur-xl bg-[#faf8f0]/85 border-b border-slate-950 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zM18 17h-2.4v-3.8c0-1.1-.4-1.8-1.3-1.8-.7 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V17H10.4s.1-6.3 0-7h2.4v1c.3-.5 1-1.2 2.3-1.2 1.7 0 3 1.1 3 3.5V17z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">
                LinkedIn Profile <span className="text-blue-600">Optimizer</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {currentUser ? (
              <>
                <div 
                  onClick={() => setShowProfileModal(true)}
                  className="hidden sm:flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-slate-950 text-xs font-bold cursor-pointer hover:bg-slate-50 transition-all"
                  title="View Profile"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-slate-800">{currentUser?.name || 'User'}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="py-1.5 px-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-xs font-extrabold border border-slate-950 shadow-3xs transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                ref={signInBtnRef}
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-2 rounded-full border border-slate-950 bg-slate-950 text-[#faf8f0] text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center justify-center min-w-[90px] h-9"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 mb-16">

        {/* LinkedIn Profile Optimizer Form */}
        <LinkedInForm />

        {/* FAQ Accordion Section (GSAP Showcase style) */}
        <div className="bg-[#faf8f0] border border-slate-950 rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
              &#123; Frequently Asked Questions &#125;
            </h2>
            <p className="text-xs text-slate-650 font-bold max-w-md mx-auto leading-relaxed">
              Got questions about the LinkedIn Profile Optimizer? Filter by category or browse all details below.
            </p>
          </div>

          {/* Filter Pills (Mimics GSAP category pills) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            {['All', 'General', 'AI Optimizer', 'Security'].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveFaq(null);
                  }}
                  className={`px-5 py-2.5 rounded-full border border-slate-950 text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-3xs ${
                    isActive 
                      ? 'bg-slate-950 text-[#faf8f0]' 
                      : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Accordion List */}
          <div className="space-y-4 max-w-2xl mx-auto pt-2">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-950 rounded-2xl bg-white overflow-hidden transition-all duration-300 shadow-3xs"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-extrabold text-xs sm:text-sm text-slate-900 hover:text-slate-950 transition-colors cursor-pointer select-none"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-slate-950 transform transition-transform duration-300 text-[10px] ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-60 border-t border-slate-950 bg-slate-50/20' : 'max-h-0'
                    }`}
                  >
                    <p className="p-4 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />

      {/* ── Login Modal Overlay ──────────────────────────────────────────── */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-[28px] shadow-2xl p-6 sm:p-8 animate-slideUp overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowLoginModal(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* LoginPage as inner content */}
            <div className="mt-2">
              <LoginPage onLoginSuccess={handleLoginSuccessWrapper} isModal={true} />
            </div>
          </div>
        </div>
      )}

      {/* ── User Profile Modal Overlay ────────────────────────────────────── */}
      {showProfileModal && (
        <div 
          onClick={() => setShowProfileModal(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white border border-slate-200/80 rounded-[32px] shadow-2xl animate-slideUp overflow-hidden cursor-default"
          >
            <UserProfile onClose={() => setShowProfileModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
