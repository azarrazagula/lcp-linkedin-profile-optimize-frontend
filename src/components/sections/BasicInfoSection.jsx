import React, { useState } from 'react';
import { SectionCard, FieldLabel, HelperText, inputCls, fileInputCls, IC, isValidLinkedInUrl } from './FormHelpers';

// Maps postal code prefixes to list of matching cities
const getCitiesByPostalCode = (postcode) => {
  if (!postcode) return [];
  const code = postcode.trim();
  
  if (code.startsWith('641')) {
    return ['Coimbatore', 'Greater Coimbatore Area', 'Pollachi', 'Tiruppur'];
  }
  if (code.startsWith('600')) {
    return ['Chennai', 'Greater Chennai Area', 'Tambaram', 'Ambattur'];
  }
  if (code.startsWith('560')) {
    return ['Bengaluru', 'Bengaluru East', 'Bengaluru South'];
  }
  if (code.startsWith('400')) {
    return ['Mumbai', 'Mumbai Suburban', 'Thane', 'Navi Mumbai'];
  }
  if (code.startsWith('110')) {
    return ['New Delhi', 'Delhi', 'Dwarka', 'Rohini'];
  }
  if (code.startsWith('6')) {
    return ['Coimbatore', 'Chennai', 'Madurai', 'Trichy', 'Salem'];
  }
  return ['Chennai', 'Coimbatore', 'Bengaluru', 'Mumbai', 'New Delhi', 'Hyderabad', 'Pune', 'Kolkata'];
};

// Official LinkedIn Industry options
const INDUSTRIES = [
  "Accounting",
  "Airlines/Aviation",
  "Alternative Dispute Resolution",
  "Alternative Medicine",
  "Animation",
  "Apparel & Fashion",
  "Architecture & Planning",
  "Arts and Crafts",
  "Automotive",
  "Aviation & Aerospace",
  "Banking",
  "Biotechnology",
  "Broadcast Media",
  "Building Materials",
  "Business Supplies and Equipment",
  "Capital Markets",
  "Chemicals",
  "Civic & Social Organization",
  "Civil Engineering",
  "Commercial Real Estate",
  "Computer & Network Security",
  "Computer Games",
  "Computer Hardware",
  "Computer Networking",
  "Computer Software",
  "Construction",
  "Consumer Electronics",
  "Consumer Goods",
  "Consumer Services",
  "Cosmetics",
  "Dairy",
  "Defense & Space",
  "Design",
  "Education Management",
  "E-Learning",
  "Electrical/Electronic Manufacturing",
  "Entertainment",
  "Environmental Services",
  "Events Services",
  "Executive Office",
  "Facilities Services",
  "Farming",
  "Financial Services",
  "Fine Art",
  "Fishery",
  "Food & Beverages",
  "Food Production",
  "Fund-Raising",
  "Furniture",
  "Gambling & Casinos",
  "Glass, Ceramics & Concrete",
  "Government Administration",
  "Government Relations",
  "Graphic Design",
  "Health, Wellness and Fitness",
  "Higher Education",
  "Hospital & Health Care",
  "Hospitality",
  "Human Resources",
  "Import and Export",
  "Individual & Family Services",
  "Industrial Automation",
  "Information Services",
  "Information Technology and Services",
  "Insurance",
  "International Affairs",
  "International Trade and Development",
  "Internet",
  "Investment Banking",
  "Investment Management",
  "Judiciary",
  "Law Enforcement",
  "Law Practice",
  "Legal Services",
  "Legislative Office",
  "Leisure, Travel & Tourism",
  "Libraries",
  "Logistics and Supply Chain",
  "Luxury Goods & Jewelry",
  "Machinery",
  "Management Consulting",
  "Maritime",
  "Market Research",
  "Marketing and Advertising",
  "Mechanical or Industrial Engineering",
  "Media Production",
  "Medical Devices",
  "Medical Practice",
  "Mental Health Care",
  "Military",
  "Mining & Metals",
  "Motion Pictures and Film",
  "Museums and Institutions",
  "Music",
  "Nanotechnology",
  "Newspapers",
  "Non-Profit Organization Management",
  "Oil & Energy",
  "Online Media",
  "Outsourcing/Offshoring",
  "Package/Freight Delivery",
  "Packaging and Containers",
  "Paper & Forest Products",
  "Performing Arts",
  "Pharmaceuticals",
  "Philanthropy",
  "Photography",
  "Plastics",
  "Political Organization",
  "Primary/Secondary Education",
  "Printing",
  "Professional Training & Coaching",
  "Program Development",
  "Public Policy",
  "Public Relations and Communications",
  "Public Safety",
  "Publishing",
  "Railroad Manufacture",
  "Ranching",
  "Real Estate",
  "Recreational Facilities and Services",
  "Religious Institutions",
  "Renewables & Environment",
  "Research",
  "Restaurants",
  "Retail",
  "Security and Investigations",
  "Semiconductors",
  "Shipbuilding",
  "Sporting Goods",
  "Sports",
  "Staffing and Recruiting",
  "Supermarkets",
  "Telecommunications",
  "Textiles",
  "Think Tanks",
  "Tobacco",
  "Translation and Localization",
  "Transportation/Trucking/Railroad",
  "Utilities",
  "Venture Capital & Private Equity",
  "Veterinary",
  "Warehousing",
  "Wholesale",
  "Wine and Spirits",
  "Wireless",
  "Writing and Editing"
];


export default function BasicInfoSection({ basicInfo, setBasicInfo, setProfilePhoto, setCoverPhoto, liUrl }) {
  const set = (field, val) => setBasicInfo({ ...basicInfo, [field]: val });

  const showCity = !!basicInfo.postalCode && !!basicInfo.postalCode.trim();
  const cities = getCitiesByPostalCode(basicInfo.postalCode);

  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <SectionCard
      title="Basic Info"
      icon={IC.user}
      liUrl={liUrl}
      badge="required"
      description="Tell recruiters who you are and what you do. This information appears at the very top of your LinkedIn profile and is the first thing anyone sees."
      tip="A strong, keyword-rich Headline can increase your profile views by 3×. Think of it as your personal slogan."
    >
      {/* Row 1: Full Name & Pronouns */}
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

      {/* Row 2: Country/Region & Industry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel value={basicInfo.countryRegion}>Country/Region *</FieldLabel>
          <input className={inputCls} placeholder="e.g. India"
            value={basicInfo.countryRegion || ''}
            onChange={e => set('countryRegion', e.target.value)} />
          <HelperText>Where you currently reside.</HelperText>
        </div>
        <div>
          <FieldLabel value={basicInfo.industry}>Industry</FieldLabel>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none z-10">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              className={`${inputCls} !pl-11`} 
              placeholder="e.g. Software Development"
              value={basicInfo.industry || ''}
              onChange={e => set('industry', e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200/80 rounded-2xl shadow-lg max-h-60 overflow-y-auto z-50 py-1.5 animate-fadeIn">
                {INDUSTRIES.filter(ind => 
                  !basicInfo.industry || 
                  ind.toLowerCase().includes(basicInfo.industry.toLowerCase())
                ).slice(0, 10).map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    onMouseDown={() => set('industry', ind)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors block"
                  >
                    {ind}
                  </button>
                ))}
              </div>
            )}
          </div>
          <HelperText>Your industry helps LinkedIn show you relevant jobs and people.</HelperText>
        </div>
      </div>

      {/* Row 3: Postal Code & City (Dynamic reveal) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel value={basicInfo.postalCode}>Postal Code</FieldLabel>
          <input className={inputCls} placeholder="e.g. 641026"
            value={basicInfo.postalCode || ''}
            onChange={e => {
              set('postalCode', e.target.value);
              // Clear city if postcode is cleared
              if (!e.target.value.trim()) {
                setBasicInfo(prev => ({ ...prev, postalCode: '', city: '' }));
              }
            }} />
          <HelperText>Used to determine your location area.</HelperText>
        </div>
        {showCity && (
          <div className="animate-fadeIn">
            <FieldLabel value={basicInfo.city}>City *</FieldLabel>
            <select className={inputCls} value={basicInfo.city || ''} onChange={e => set('city', e.target.value)}>
              <option value="">Select a city</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <HelperText>Select the matching city for your postal code.</HelperText>
          </div>
        )}
      </div>

      {/* Row 4: Headline */}
      <div>
        <FieldLabel value={basicInfo.headline}>Headline *</FieldLabel>
        <input className={inputCls} placeholder="e.g. Full Stack Developer | React · Node.js · MongoDB"
          value={basicInfo.headline}
          onChange={e => set('headline', e.target.value)} />
        <HelperText>Include your role + top skills. Recruiters search for these keywords.</HelperText>
      </div>

      {/* Row 5: Profile & Cover Photo */}
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

      {/* Row 6: LinkedIn Profile URL */}
      <div className="mt-4 p-4 rounded-2xl border border-blue-100 bg-blue-50/30 transition-all shadow-3xs">
        <FieldLabel>LinkedIn Profile URL *</FieldLabel>
        <input 
          className={`${inputCls} ${
            !basicInfo.linkedinUrl
              ? 'border-amber-300 focus:border-amber-500 focus:ring-amber-500/10 bg-amber-50/10'
              : !isValidLinkedInUrl(basicInfo.linkedinUrl)
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10 bg-rose-50/10'
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
        ) : !isValidLinkedInUrl(basicInfo.linkedinUrl) ? (
          <div className="mt-2.5 flex items-start gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200/60 rounded-xl p-3 font-semibold animate-fadeIn">
            <span className="text-sm shrink-0">❌</span>
            <span>Invalid LinkedIn URL. Please enter a valid profile link (e.g. https://www.linkedin.com/in/yourname).</span>
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
