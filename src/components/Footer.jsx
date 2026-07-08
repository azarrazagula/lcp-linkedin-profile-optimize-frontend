import React from 'react';

// Custom SVG Icons matching react-icons / heroicons styling
const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 000 20M12 2a14.5 14.5 0 010 20M2 12h20" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          
          {/* COLUMN 1 - Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-slate-900 tracking-tight">
                LinkedIn Optimizer
              </span>
            </div>
            
            <p className="text-[13px] text-slate-550 font-medium leading-relaxed max-w-xs">
              For those who don't know how to create a professional LinkedIn profile — just fill out this form and your optimized profile is ready!
            </p>
            
            {/* Social Icons Row */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com/azarrazagula"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer shadow-3xs"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer shadow-3xs"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/azarrazagula"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer shadow-3xs"
                aria-label="Portfolio"
              >
                <GlobeIcon />
              </a>
            </div>
          </div>
          
          {/* COLUMN 2 - Product */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Product
            </h4>
            <ul className="space-y-2 text-[13px] font-semibold text-slate-550">
              <li>
                <a
                  href="#features"
                  className="hover:text-slate-900 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-slate-900 transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-slate-900 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#get-started"
                  className="hover:text-slate-900 transition-colors"
                >
                  Get started
                </a>
              </li>
            </ul>
          </div>
          
          {/* COLUMN 3 - Legal */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Legal
            </h4>
            <ul className="space-y-2 text-[13px] font-semibold text-slate-550">
              <li>
                <a
                  href="#privacy"
                  className="hover:text-slate-900 transition-colors"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="hover:text-slate-900 transition-colors"
                >
                  Terms of use
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-slate-900 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-200/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px] font-semibold text-slate-550 text-center sm:text-left">
            © 2026 LinkedIn Optimizer. Built by Azar Ibrahim.
          </span>
          <div className="flex gap-4 text-[12px] font-semibold text-slate-550">
            <a href="#privacy" className="hover:text-slate-900 transition-colors">Privacy</a>
            <span className="text-slate-300">·</span>
            <a href="#terms" className="hover:text-slate-900 transition-colors">Terms</a>
            <span className="text-slate-300">·</span>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
