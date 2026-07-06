import React from 'react';
import { SectionCard, FieldLabel, inputCls, IC } from './FormHelpers';

export default function BasicInfoSection({ basicInfo, setBasicInfo, setProfilePhoto, setCoverPhoto, liUrl }) {
  return (
    <SectionCard title="Basic Info" icon={IC.user} liUrl={liUrl}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel value={basicInfo.fullName}>Full Name *</FieldLabel>
          <input className={inputCls} placeholder="John Doe"
            value={basicInfo.fullName}
            onChange={(e) => setBasicInfo({ ...basicInfo, fullName: e.target.value })} />
        </div>
        <div>
          <FieldLabel value={basicInfo.pronouns}>Pronouns</FieldLabel>
          <select className={inputCls}
            value={basicInfo.pronouns || ''}
            onChange={(e) => setBasicInfo({ ...basicInfo, pronouns: e.target.value })}>
            <option value="">Please select</option>
            <option value="He/Him">He/Him</option>
            <option value="She/Her">She/Her</option>
            <option value="They/Them">They/Them</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel value={basicInfo.location}>Location</FieldLabel>
          <input className={inputCls} placeholder="Chennai, India"
            value={basicInfo.location}
            onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })} />
        </div>
        <div>
          <FieldLabel value={basicInfo.industry}>Industry</FieldLabel>
          <input className={inputCls} placeholder="Ex: Technology, Information and Internet"
            value={basicInfo.industry || ''}
            onChange={(e) => setBasicInfo({ ...basicInfo, industry: e.target.value })} />
        </div>
      </div>

      <div>
        <FieldLabel value={basicInfo.headline}>Headline *</FieldLabel>
        <input className={inputCls} placeholder="Full Stack Developer | React · Node.js · MongoDB"
          value={basicInfo.headline}
          onChange={(e) => setBasicInfo({ ...basicInfo, headline: e.target.value })} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Profile Photo</FieldLabel>
          <input type="file" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])}
            className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-600/30 cursor-pointer" />
        </div>
        <div>
          <FieldLabel>Cover Photo</FieldLabel>
          <input type="file" accept="image/*" onChange={(e) => setCoverPhoto(e.target.files[0])}
            className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-600/30 cursor-pointer" />
        </div>
      </div>

      <div>
        <FieldLabel value={basicInfo.linkedinUrl}>LinkedIn Profile URL *</FieldLabel>
        <input className={inputCls} placeholder="https://linkedin.com/in/yourname"
          value={basicInfo.linkedinUrl}
          onChange={(e) => setBasicInfo({ ...basicInfo, linkedinUrl: e.target.value })} />
      </div>
    </SectionCard>
  );
}
