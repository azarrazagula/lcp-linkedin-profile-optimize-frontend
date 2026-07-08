import React, { useState, useEffect } from 'react';
import { SectionCard, FieldLabel, HelperText, inputCls, IC, isValidLinkedInUrl } from './FormHelpers';

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




export default function BasicInfoSection({ basicInfo, setBasicInfo, liUrl }) {
  const set = (field, val) => setBasicInfo({ ...basicInfo, [field]: val });

  const fullNameId = React.useId();
  const pronounsId = React.useId();
  const countryRegionId = React.useId();
  const industryId = React.useId();
  const postalCodeId = React.useId();
  const cityId = React.useId();
  const headlineId = React.useId();
  const linkedinUrlId = React.useId();

  const showCity = !!basicInfo.postalCode && !!basicInfo.postalCode.trim();
  const [dynamicCities, setDynamicCities] = useState([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  useEffect(() => {
    const postcode = basicInfo.postalCode?.trim();
    if (!postcode) {
      setDynamicCities([]);
      return;
    }

    // If it's a 6-digit Indian PIN code, fetch matching post offices/districts dynamically
    if (/^\d{6}$/.test(postcode)) {
      fetch(`https://api.postalpincode.in/pincode/${postcode}`)
        .then(res => res.json())
        .then(data => {
          if (data && data[0] && data[0].Status === 'Success') {
            const offices = data[0].PostOffice || [];
            const names = new Set();
            offices.forEach(office => {
              if (office.District && office.District !== 'NA') {
                names.add(office.District);
              }
            });
            setDynamicCities(Array.from(names).sort());
          }
        })
        .catch(err => {
          console.error("Error fetching PIN code:", err);
          setDynamicCities(getCitiesByPostalCode(postcode));
        });
    } else {
      setDynamicCities(getCitiesByPostalCode(postcode));
    }
  }, [basicInfo.postalCode]);

  const cities = dynamicCities.length > 0 ? dynamicCities : getCitiesByPostalCode(basicInfo.postalCode);

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
          <FieldLabel htmlFor={fullNameId} value={basicInfo.fullName}>Full Name *</FieldLabel>
          <input id={fullNameId} className={inputCls} placeholder="e.g. Alex Johnson"
            value={basicInfo.fullName}
            onChange={e => set('fullName', e.target.value)} />
          <HelperText>Use the name you go by at work.</HelperText>
        </div>
        <div>
          <FieldLabel htmlFor={pronounsId} value={basicInfo.pronouns}>Pronouns</FieldLabel>
          <select id={pronounsId} className={inputCls} value={basicInfo.pronouns || ''} onChange={e => set('pronouns', e.target.value)}>
            <option value="">Please select</option>
            <option value="He/Him">He/Him</option>
            <option value="She/Her">She/Her</option>
            <option value="They/Them">They/Them</option>
            <option value="Custom">Custom</option>
          </select>
          <HelperText>Help others know how to address you.</HelperText>
        </div>
      </div>

      {/* Row 2: Country/Region & Industry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor={countryRegionId} value={basicInfo.countryRegion}>Country/Region *</FieldLabel>
          <input id={countryRegionId} className={inputCls} placeholder="e.g. India"
            value={basicInfo.countryRegion || ''}
            onChange={e => set('countryRegion', e.target.value)} />
          <HelperText>Your current country of residence.</HelperText>
        </div>
        <div>
          <FieldLabel htmlFor={industryId} value={basicInfo.industry}>Industry</FieldLabel>
          <input 
            id={industryId}
            className={inputCls} 
            placeholder="e.g. Software Development"
            value={basicInfo.industry || ''}
            onChange={e => set('industry', e.target.value)}
          />
          <HelperText>Your professional field to match with relevant jobs.</HelperText>
        </div>
      </div>

      {/* Row 3: Postal Code & City (Dynamic reveal) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor={postalCodeId} value={basicInfo.postalCode}>Postal Code</FieldLabel>
          <input id={postalCodeId} className={inputCls} placeholder="e.g. 641026"
            value={basicInfo.postalCode || ''}
            onChange={e => {
              set('postalCode', e.target.value);
              // Clear city if postcode is cleared
              if (!e.target.value.trim()) {
                setBasicInfo(prev => ({ ...prev, postalCode: '', city: '' }));
              }
            }} />
          <HelperText>Enter your 6-digit PIN code to find jobs in your area.</HelperText>
        </div>
        {showCity && (
          <div className="animate-fadeIn relative">
            <FieldLabel htmlFor={cityId} value={basicInfo.city}>City *</FieldLabel>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none z-10">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                id={cityId}
                className={`${inputCls} !pl-11`} 
                placeholder="e.g. Coimbatore"
                value={basicInfo.city || ''}
                onChange={e => set('city', e.target.value)}
                onFocus={() => setShowCitySuggestions(true)}
                onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
              />
              {showCitySuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200/80 rounded-2xl shadow-lg max-h-60 overflow-y-auto z-50 py-1.5 animate-fadeIn">
                  {cities.filter(c => 
                    !basicInfo.city || 
                    c.toLowerCase().includes(basicInfo.city.toLowerCase())
                  ).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onMouseDown={() => set('city', c)}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors block"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <HelperText>Your current city. This will show on your public profile.</HelperText>
          </div>
        )}
      </div>

      {/* Row 4: Headline */}
      <div>
        <FieldLabel htmlFor={headlineId} value={basicInfo.headline}>Headline *</FieldLabel>
        <input id={headlineId} className={inputCls} placeholder="e.g. Full Stack Developer | React · Node.js · MongoDB"
          value={basicInfo.headline}
          onChange={e => set('headline', e.target.value)} />
        <HelperText>Your job title and key skills.</HelperText>
      </div>



      {/* Row 6: LinkedIn Profile URL */}
      <div className="mt-4 p-4 rounded-2xl border border-blue-100 bg-blue-50/30 transition-all shadow-3xs">
        <FieldLabel htmlFor={linkedinUrlId}>LinkedIn Profile URL *</FieldLabel>
        <input 
          id={linkedinUrlId}
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
          <div className="mt-2.5 flex items-start gap-2 text-xs text-amber-900 bg-amber-50 border border-amber-200/60 rounded-xl p-3 font-semibold">
            <span className="text-sm shrink-0">⚠️</span>
            <span>Important: Paste your exact LinkedIn URL here. This unlocks the direct "Edit on LinkedIn" buttons for all sections in the form.</span>
          </div>
        ) : !isValidLinkedInUrl(basicInfo.linkedinUrl) ? (
          <div className="mt-2.5 flex items-start gap-2 text-xs text-rose-900 bg-rose-50 border border-rose-200/60 rounded-xl p-3 font-semibold animate-fadeIn">
            <span className="text-sm shrink-0">❌</span>
            <span>Invalid LinkedIn URL. Please enter a valid profile link (e.g. https://www.linkedin.com/in/yourname).</span>
          </div>
        ) : (
          <div className="mt-2.5 flex items-start gap-2 text-xs text-emerald-900 bg-emerald-50 border border-emerald-200/60 rounded-xl p-3 font-semibold animate-fadeIn">
            <span className="text-sm shrink-0">🎉</span>
            <span>URL Connected! One-click direct edit buttons are now active for all sections.</span>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
