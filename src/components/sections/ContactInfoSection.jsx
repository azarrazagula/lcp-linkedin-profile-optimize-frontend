import React from 'react';
import { SectionCard, FieldLabel, inputCls, textareaCls, IC, MONTHS, DAYS } from './FormHelpers';

export default function ContactInfoSection({ contactInfo, setContactInfo, liUrl }) {
  return (
    <SectionCard title="Contact Info" icon={IC.user} liUrl={liUrl}>
      {/* Email */}
      <div>
        <FieldLabel value={contactInfo.email}>Email</FieldLabel>
        <input type="email" className={inputCls} placeholder="e.g. azarrazagula@gmail.com"
          value={contactInfo.email || ''}
          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} />
      </div>

      {/* Phone Number & Phone Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel value={contactInfo.phone}>Phone number</FieldLabel>
          <input className={inputCls} placeholder="e.g. 6385725727"
            value={contactInfo.phone || ''}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })} />
        </div>
        <div>
          <FieldLabel value={contactInfo.phoneType}>Phone type</FieldLabel>
          <select className={inputCls}
            value={contactInfo.phoneType || ''}
            onChange={(e) => setContactInfo({ ...contactInfo, phoneType: e.target.value })}>
            <option value="">Please select</option>
            <option value="Mobile">Mobile</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
          </select>
        </div>
      </div>

      {/* Address */}
      <div>
        <FieldLabel value={contactInfo.address}>Address</FieldLabel>
        <textarea className={textareaCls} rows={2} placeholder="Ex: Coimbatore, Tamil Nadu, India"
          value={contactInfo.address || ''}
          onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })} />
      </div>

      {/* Birthday */}
      <div>
        <FieldLabel value={contactInfo.birthMonth && contactInfo.birthDay ? `${contactInfo.birthMonth} ${contactInfo.birthDay}` : ''}>Birthday</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block mb-1">Month</span>
            <select className={inputCls}
              value={contactInfo.birthMonth || ''}
              onChange={(e) => setContactInfo({ ...contactInfo, birthMonth: e.target.value })}>
              <option value="">Month</option>
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block mb-1">Day</span>
            <select className={inputCls}
              value={contactInfo.birthDay || ''}
              onChange={(e) => setContactInfo({ ...contactInfo, birthDay: e.target.value })}>
              <option value="">Day</option>
              {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel value={contactInfo.websiteUrl}>Website URL</FieldLabel>
          <input className={inputCls} placeholder="https://yourportfolio.com"
            value={contactInfo.websiteUrl || ''}
            onChange={(e) => setContactInfo({ ...contactInfo, websiteUrl: e.target.value })} />
        </div>
        <div>
          <FieldLabel value={contactInfo.websiteType}>Website Type</FieldLabel>
          <select className={inputCls}
            value={contactInfo.websiteType || ''}
            onChange={(e) => setContactInfo({ ...contactInfo, websiteType: e.target.value })}>
            <option value="">Please select</option>
            <option value="Personal">Personal</option>
            <option value="Company">Company</option>
            <option value="Portfolio">Portfolio</option>
            <option value="Blog">Blog</option>
            <option value="RSS">RSS</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </SectionCard>
  );
}
