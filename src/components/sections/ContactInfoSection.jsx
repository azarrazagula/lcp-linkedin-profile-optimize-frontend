import React from 'react';
import { SectionCard, FieldLabel, HelperText, inputCls, textareaCls, IC, MONTHS, DAYS } from './FormHelpers';

export default function ContactInfoSection({ contactInfo, setContactInfo, liUrl, onReload }) {
  const set = (field, val) => setContactInfo({ ...contactInfo, [field]: val });

  const emailId = React.useId();
  const phoneId = React.useId();
  const phoneTypeId = React.useId();
  const addressId = React.useId();
  const birthMonthId = React.useId();
  const birthDayId = React.useId();
  const websiteUrlId = React.useId();
  const websiteTypeId = React.useId();

  return (
    <SectionCard
      title="Contact Info"
      icon={IC.contact}
      liUrl={liUrl}
      badge="recommended"
      description="Help recruiters and clients contact you directly for opportunities, contract roles, or partnerships."
      tip="Adding an active email and phone number makes you 4× more likely to be contacted by headhunters directly."
      onReload={onReload}
    >
      {/* Email */}
      <div>
        <FieldLabel htmlFor={emailId} value={contactInfo.email}>Email</FieldLabel>
        <input id={emailId} type="email" className={inputCls} placeholder="e.g. yourname@example.com"
          value={contactInfo.email || ''}
          onChange={(e) => set('email', e.target.value)} />
        <HelperText>A professional email address for job opportunities.</HelperText>
      </div>

      {/* Phone Number & Phone Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor={phoneId} value={contactInfo.phone}>Phone number</FieldLabel>
          <input id={phoneId} className={inputCls} placeholder="e.g. +91 98765 43210"
            value={contactInfo.phone || ''}
            onChange={(e) => set('phone', e.target.value)} />
          <HelperText>Include your country code for recruiter calls.</HelperText>
        </div>
        <div>
          <FieldLabel htmlFor={phoneTypeId} value={contactInfo.phoneType}>Phone type</FieldLabel>
          <select id={phoneTypeId} className={inputCls}
            value={contactInfo.phoneType || ''}
            onChange={(e) => set('phoneType', e.target.value)}>
            <option value="">Please select</option>
            <option value="Mobile">Mobile</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
          </select>
          <HelperText>Choose 'Mobile' so recruiters know it is your personal number.</HelperText>
        </div>
      </div>

      {/* Address */}
      <div>
        <FieldLabel htmlFor={addressId} value={contactInfo.address}>Address</FieldLabel>
        <textarea id={addressId} className={textareaCls} rows={2} placeholder="e.g. Coimbatore, Tamil Nadu, India"
          value={contactInfo.address || ''}
          onChange={(e) => set('address', e.target.value)} />
        <HelperText>Your location helps match you with local commuting jobs.</HelperText>
      </div>

      {/* Birthday */}
      <div>
        <FieldLabel value={contactInfo.birthMonth && contactInfo.birthDay ? `${contactInfo.birthMonth} ${contactInfo.birthDay}` : ''}>Birthday</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={birthMonthId} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1.5">Month</label>
            <select id={birthMonthId} className={inputCls}
              value={contactInfo.birthMonth || ''}
              onChange={(e) => set('birthMonth', e.target.value)}>
              <option value="">Month</option>
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={birthDayId} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1.5">Day</label>
            <select id={birthDayId} className={inputCls}
              value={contactInfo.birthDay || ''}
              onChange={(e) => set('birthDay', e.target.value)}>
              <option value="">Day</option>
              {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <HelperText>Your connections can see your birthday, but your birth year is hidden.</HelperText>
      </div>

      {/* Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor={websiteUrlId} value={contactInfo.websiteUrl}>Website URL</FieldLabel>
          <input id={websiteUrlId} className={inputCls} placeholder="https://yourportfolio.com"
            value={contactInfo.websiteUrl || ''}
            onChange={(e) => set('websiteUrl', e.target.value)} />
          <HelperText>Link to your portfolio, blog, or personal website.</HelperText>
        </div>
        <div>
          <FieldLabel htmlFor={websiteTypeId} value={contactInfo.websiteType}>Website Type</FieldLabel>
          <select id={websiteTypeId} className={inputCls}
            value={contactInfo.websiteType || ''}
            onChange={(e) => set('websiteType', e.target.value)}>
            <option value="">Please select</option>
            <option value="Personal">Personal</option>
            <option value="Company">Company</option>
            <option value="Portfolio">Portfolio</option>
            <option value="Blog">Blog</option>
            <option value="RSS">RSS</option>
            <option value="Other">Other</option>
          </select>
          <HelperText>Select what this link represents so viewers know what to expect.</HelperText>
        </div>
      </div>
    </SectionCard>
  );
}
