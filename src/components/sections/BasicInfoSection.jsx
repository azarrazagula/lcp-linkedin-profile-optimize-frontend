import React from 'react';
import { SectionCard, FieldLabel, HelperText, inputCls, fileInputCls, IC } from './FormHelpers';

export default function BasicInfoSection({ basicInfo, setBasicInfo, setProfilePhoto, setCoverPhoto, liUrl }) {
  const set = (field, val) => setBasicInfo({ ...basicInfo, [field]: val });

  return (
    <SectionCard
      title="Basic Info"
      icon={IC.user}
      liUrl={liUrl}
      badge="required"
      description="Tell recruiters who you are and what you do. This information appears at the very top of your LinkedIn profile and is the first thing anyone sees."
      tip="A strong, keyword-rich Headline can increase your profile views by 3×. Think of it as your personal slogan."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel value={basicInfo.fullName}>Full Name *</FieldLabel>
          <input className={inputCls} placeholder="e.g. Alex Johnson"
            value={basicInfo.fullName}
            onChange={e => set('fullName', e.target.value)} />
          <HelperText>Use your professional name — the name you go by at work.</HelperText>
        </div>
        <div>
          <FieldLabel value={basicInfo.pronouns}>Pronouns</FieldLabel>
          <select className={inputCls} value={basicInfo.pronouns || ''} onChange={e => set('pronouns', e.target.value)}>
            <option value="">Please select</option>
            <option value="He/Him">He/Him</option>
            <option value="She/Her">She/Her</option>
            <option value="They/Them">They/Them</option>
            <option value="Custom">Custom</option>
          </select>
          <HelperText>Helps colleagues and recruiters address you respectfully.</HelperText>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel value={basicInfo.location}>Location</FieldLabel>
          <input className={inputCls} placeholder="e.g. Chennai, India"
            value={basicInfo.location}
            onChange={e => set('location', e.target.value)} />
          <HelperText>City, State, Country — helps recruiters find local talent.</HelperText>
        </div>
        <div>
          <FieldLabel value={basicInfo.industry}>Industry</FieldLabel>
          <input className={inputCls} placeholder="e.g. Technology, Information and Internet"
            value={basicInfo.industry || ''}
            onChange={e => set('industry', e.target.value)} />
          <HelperText>Your industry helps LinkedIn show you relevant jobs and people.</HelperText>
        </div>
      </div>

      <div>
        <FieldLabel value={basicInfo.headline}>Headline *</FieldLabel>
        <input className={inputCls} placeholder="e.g. Full Stack Developer | React · Node.js · MongoDB"
          value={basicInfo.headline}
          onChange={e => set('headline', e.target.value)} />
        <HelperText>Include your role + top skills. Recruiters search for these keywords.</HelperText>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Profile Photo</FieldLabel>
          <input type="file" accept="image/*"
            onChange={e => setProfilePhoto(e.target.files[0])}
            className={fileInputCls} />
          <HelperText>A professional headshot gets 21× more profile views.</HelperText>
        </div>
        <div>
          <FieldLabel>Cover Photo</FieldLabel>
          <input type="file" accept="image/*"
            onChange={e => setCoverPhoto(e.target.files[0])}
            className={fileInputCls} />
          <HelperText>Use a branded or professional banner image.</HelperText>
        </div>
      </div>

      <div className="mt-4 p-4 rounded-2xl border border-blue-100 bg-blue-50/30 transition-all shadow-3xs">
        <FieldLabel value={basicInfo.linkedinUrl}>LinkedIn Profile URL *</FieldLabel>
        <input 
          className={`${inputCls} ${
            !basicInfo.linkedinUrl 
              ? 'border-amber-300 focus:border-amber-500 focus:ring-amber-500/10 bg-amber-50/10' 
              : '!border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/10 bg-emerald-50/10'
          }`}
          placeholder="https://www.linkedin.com/in/yourname"
          value={basicInfo.linkedinUrl}
          onChange={e => set('linkedinUrl', e.target.value)} 
        />
        
        {!basicInfo.linkedinUrl ? (
          <div className="mt-2.5 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200/60 rounded-xl p-3 font-semibold">
            <span className="text-sm shrink-0">⚠️</span>
            <span>Important: Paste your exact LinkedIn URL here. This unlocks the direct "Edit on LinkedIn" buttons for all sections in the form.</span>
          </div>
        ) : (
          <div className="mt-2.5 flex items-start gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-xl p-3 font-semibold animate-fadeIn">
            <span className="text-sm shrink-0">🎉</span>
            <span>URL Connected! One-click direct edit buttons are now active for all sections.</span>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
