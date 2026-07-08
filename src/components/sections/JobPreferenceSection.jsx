import React from 'react';
import { SectionCard, FieldLabel, HelperText, CheckboxRow, inputCls, IC } from './FormHelpers';

export default function JobPreferenceSection({ jobPreferences, setJobPreferences }) {
  const set = (field, val) => {
    setJobPreferences(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleCheckboxToggle = (listField, value) => {
    const list = jobPreferences[listField] || [];
    const updated = list.includes(value)
      ? list.filter(item => item !== value)
      : [...list, value];
    set(listField, updated);
  };

  const desiredTitlesId = React.useId();
  const preferredLocationsId = React.useId();
  const noticePeriodId = React.useId();
  const expectedSalaryId = React.useId();

  return (
    <SectionCard
      title="Job Preferences"
      icon={IC.career}
      badge="recommended"
      audienceHint="Recommended for Job Seekers"
      description="Specify your job search choices and preferences to get optimized recommendations."
      tip="Recruiters filter profiles by Open to Work fields. Filling this ensures you show up in relevant search queries."
    >
      {/* Alert Banner / Instruction */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs font-semibold space-y-1 shadow-3xs">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-950">
          <span>⚠️</span>
          <span className="font-bold">Note: Due to technical limitations, we cannot open this edit page directly on LinkedIn.</span>
        </div>
        <p className="text-amber-900 font-medium leading-relaxed mt-1">
          You will be redirected to your LinkedIn Profile page instead. To edit this: Go to your profile header ➔ click on the <strong>'Open to Work'</strong> box under your name ➔ click the pencil (edit) icon to open the preferences modal.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        {/* Job Titles */}
        <div>
          <FieldLabel htmlFor={desiredTitlesId} value={jobPreferences.desiredTitles}>Job titles *</FieldLabel>
          <input id={desiredTitlesId} className={inputCls} placeholder="e.g. Frontend Developer, Software Engineer"
            value={jobPreferences.desiredTitles}
            onChange={e => set('desiredTitles', e.target.value)} />
          <HelperText>Enter the job titles you are targeting, separated by commas.</HelperText>
        </div>

        {/* Location types */}
        <div>
          <FieldLabel>Location types *</FieldLabel>
          <div className="flex flex-wrap gap-4 py-1">
            {['On-site', 'Hybrid', 'Remote'].map(type => (
              <CheckboxRow
                key={type}
                id={`otw-locType-${type}`}
                checked={jobPreferences.locationTypes.includes(type)}
                onChange={() => handleCheckboxToggle('locationTypes', type)}
                label={type}
              />
            ))}
          </div>
          <HelperText>Select how you want to work.</HelperText>
        </div>

        {/* Locations (on-site) */}
        <div>
          <FieldLabel htmlFor={preferredLocationsId} value={jobPreferences.preferredLocations}>Locations (on-site) *</FieldLabel>
          <input id={preferredLocationsId} className={inputCls} placeholder="e.g. Coimbatore, Tamil Nadu, India"
            value={jobPreferences.preferredLocations}
            onChange={e => set('preferredLocations', e.target.value)} />
          <HelperText>Specify the cities or regions where you want to work.</HelperText>
        </div>

        {/* Notice period */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel htmlFor={noticePeriodId} value={jobPreferences.noticePeriod}>Notice period</FieldLabel>
            <select id={noticePeriodId} className={inputCls}
              value={jobPreferences.noticePeriod || ''}
              onChange={e => set('noticePeriod', e.target.value)}>
              <option value="">Select notice period</option>
              <option value="Immediately">Immediately, I'm actively applying</option>
              <option value="15 days or less">15 days or less</option>
              <option value="30 days">30 days</option>
              <option value="60 days">60 days</option>
              <option value="90 days">90 days</option>
              <option value="Flexible">Flexible, I'm just browsing</option>
            </select>
            <HelperText>Choose how soon you can join a new role.</HelperText>
          </div>

          {/* Expected annual salary */}
          <div>
            <FieldLabel htmlFor={expectedSalaryId} value={jobPreferences.expectedSalary}>Expected annual salary</FieldLabel>
            <select id={expectedSalaryId} className={inputCls}
              value={jobPreferences.expectedSalary || ''}
              onChange={e => set('expectedSalary', e.target.value)}>
              <option value="">Select expected salary</option>
              <option value="₹ 3+ Lakhs">₹ 3+ Lakhs</option>
              <option value="₹ 6+ Lakhs">₹ 6+ Lakhs</option>
              <option value="₹ 10+ Lakhs">₹ 10+ Lakhs</option>
              <option value="₹ 15+ Lakhs">₹ 15+ Lakhs</option>
              <option value="₹ 20+ Lakhs">₹ 20+ Lakhs</option>
              <option value="₹ 25+ Lakhs">₹ 25+ Lakhs</option>
              <option value="₹ 30+ Lakhs">₹ 30+ Lakhs</option>
              <option value="₹ 40+ Lakhs">₹ 40+ Lakhs</option>
              <option value="₹ 50+ Lakhs">₹ 50+ Lakhs</option>
            </select>
            <HelperText>Select your expected annual salary range.</HelperText>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
