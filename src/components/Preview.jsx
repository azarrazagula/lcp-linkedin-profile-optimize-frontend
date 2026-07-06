import React from 'react';

export default function Preview({ formData }) {
  const getInitials = (name) => {
    if (!name) return 'AZ';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const skillsList = formData.skills
    ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'];

  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-400">
        <span className="flex items-center gap-2 text-white">
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zM18 17h-2.4v-3.8c0-1.1-.4-1.8-1.3-1.8-.7 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V17H10.4s.1-6.3 0-7h2.4v1c.3-.5 1-1.2 2.3-1.2 1.7 0 3 1.1 3 3.5V17z"/>
          </svg>
          Live LinkedIn Profile Preview
        </span>
        <span className="flex items-center gap-1 text-emerald-400 text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Real-time Update
        </span>
      </div>

      {/* LinkedIn Cover Photo */}
      <div className="h-28 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      </div>

      {/* Profile Info Container */}
      <div className="px-6 pb-6 relative">
        {/* Avatar */}
        <div className="-mt-14 mb-4 flex justify-between items-end">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 shadow-xl relative z-10">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-extrabold text-2xl border-2 border-slate-800">
              {getInitials(formData.fullName)}
            </div>
          </div>
          <button
            disabled
            className="px-4 py-1.5 rounded-full bg-blue-600 text-white font-semibold text-xs border border-blue-400/30 opacity-90 cursor-default"
          >
            Connect
          </button>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
              {formData.fullName || 'Azar Ibrahim'}
              <svg className="w-4 h-4 text-blue-400 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </h3>
            <p className="text-sm font-medium text-slate-300 mt-1 leading-snug">
              {formData.currentRole || 'MERN Stack Developer | Ex-Sales | Building Products That Convert'}
            </p>
            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {formData.location || 'Chennai, Tamil Nadu, India'} • <span className="text-blue-400 font-semibold cursor-pointer">Contact info</span>
            </p>
          </div>

          {/* About Section */}
          <div className="pt-3 border-t border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">About</h4>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              {formData.about ||
                'Full stack developer with sales background. I build web applications that don\'t just work — they convert users and scale effectively.'}
            </p>
          </div>

          {/* Skills Chips */}
          <div className="pt-3 border-t border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Featured Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {skillsList.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-blue-300 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
