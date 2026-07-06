import React from 'react';
import { SectionCard, FieldLabel, inputCls, IC } from './FormHelpers';

export default function BasicInfoSection({ basicInfo, setBasicInfo, setProfilePhoto, setCoverPhoto, liUrl }) {
  return (
    <SectionCard title="Basic Info" icon={IC.user} liUrl={liUrl}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Full Name *</FieldLabel>
          <input className={inputCls} placeholder="John Doe"
            value={basicInfo.fullName}
            onChange={(e) => setBasicInfo({ ...basicInfo, fullName: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Location</FieldLabel>
          <input className={inputCls} placeholder="Chennai, India"
            value={basicInfo.location}
            onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })} />
        </div>
      </div>

      <div>
        <FieldLabel>Headline *</FieldLabel>
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
        <FieldLabel>LinkedIn Profile URL *</FieldLabel>
        <input className={inputCls} placeholder="https://linkedin.com/in/yourname"
          value={basicInfo.linkedinUrl}
          onChange={(e) => setBasicInfo({ ...basicInfo, linkedinUrl: e.target.value })} />
      </div>
    </SectionCard>
  );
}
