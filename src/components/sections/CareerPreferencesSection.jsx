import React from 'react';
import { SectionCard, FieldLabel, HelperText, CheckboxRow, inputCls, textareaCls, IC } from './FormHelpers';

export default function CareerPreferencesSection({ careerPreferences, setCareerPreferences, liUrl }) {
  // Helpers to update nested state
  const updateOTW = (field, val) => {
    setCareerPreferences(prev => ({
      ...prev,
      openToWork: {
        ...prev.openToWork,
        [field]: val
      }
    }));
  };

  const updateServices = (field, val) => {
    setCareerPreferences(prev => ({
      ...prev,
      providingServices: {
        ...prev.providingServices,
        [field]: val
      }
    }));
  };

  // Checkbox helpers
  const handleCheckboxToggle = (listField, value, isOTW = true) => {
    const list = isOTW ? careerPreferences.openToWork[listField] : [];
    const updated = list.includes(value)
      ? list.filter(item => item !== value)
      : [...list, value];

    if (isOTW) {
      updateOTW(listField, updated);
    }
  };

  const jobTypesOptions = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
  const workplaceTypesOptions = ['On-site', 'Hybrid', 'Remote'];

  return (
    <SectionCard
      title="Career Preferences"
      icon={IC.career}
      liUrl={liUrl}
      badge="recommended"
      audienceHint="Recommended for Job Seekers & Freelancers"
      description="Specify your work preferences and freelancing options to get better matched with employers or clients."
      tip="Recruiters filter profiles by Open to Work fields. Filling this ensures you show up in relevant search queries."
    >
      {/* Open to Work block */}
      <div className="space-y-4 border-b border-slate-100 pb-5 last:border-0 last:pb-0">
        <h4 className="text-xs font-extrabold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
          <span>💼</span> Open to Work Preferences
        </h4>

        <div>
          <FieldLabel value={careerPreferences.openToWork.desiredTitles}>Desired Job Titles</FieldLabel>
          <input className={inputCls} placeholder="e.g. Full Stack Developer, React Developer"
            value={careerPreferences.openToWork.desiredTitles}
            onChange={e => updateOTW('desiredTitles', e.target.value)} />
          <HelperText>Add up to 5 job roles you are looking for.</HelperText>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Job Types</span>
            <div className="space-y-1.5">
              {jobTypesOptions.map(type => (
                <CheckboxRow
                  key={type}
                  id={`otw-jobtype-${type}`}
                  checked={careerPreferences.openToWork.jobTypes.includes(type)}
                  onChange={() => handleCheckboxToggle('jobTypes', type, true)}
                  label={type}
                />
              ))}
            </div>
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Workplace Types</span>
            <div className="space-y-1.5">
              {workplaceTypesOptions.map(type => (
                <CheckboxRow
                  key={type}
                  id={`otw-worktype-${type}`}
                  checked={careerPreferences.openToWork.workplaceTypes.includes(type)}
                  onChange={() => handleCheckboxToggle('workplaceTypes', type, true)}
                  label={type}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <FieldLabel value={careerPreferences.openToWork.preferredLocations}>Preferred Locations</FieldLabel>
          <input className={inputCls} placeholder="e.g. Chennai, Bengaluru, Remote"
            value={careerPreferences.openToWork.preferredLocations}
            onChange={e => updateOTW('preferredLocations', e.target.value)} />
          <HelperText>Cities you want to work in, or specify 'Remote'.</HelperText>
        </div>

        <div>
          <FieldLabel value={careerPreferences.openToWork.availability}>Availability / Start Date</FieldLabel>
          <select className={inputCls}
            value={careerPreferences.openToWork.availability || ''}
            onChange={e => updateOTW('availability', e.target.value)}>
            <option value="">Please select</option>
            <option value="Immediately">Immediately (actively applying)</option>
            <option value="Flexible">Flexible (just browsing)</option>
          </select>
          <HelperText>Let employers know how soon you can start working.</HelperText>
        </div>
      </div>

      {/* Providing Services block */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-extrabold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
          <span>🛠️</span> Providing Services Section (Freelancers)
        </h4>

        <div>
          <FieldLabel value={careerPreferences.providingServices.servicesOffered}>Services Offered</FieldLabel>
          <input className={inputCls} placeholder="e.g. Web Development, UI/UX Design, Consulting"
            value={careerPreferences.providingServices.servicesOffered}
            onChange={e => updateServices('servicesOffered', e.target.value)} />
          <HelperText>The freelance services you provide.</HelperText>
        </div>

        <div>
          <FieldLabel value={careerPreferences.providingServices.serviceDescription}>Services Description</FieldLabel>
          <textarea className={textareaCls} rows={3}
            placeholder="Describe your services, pricing guidelines, portfolio links, or work terms..."
            value={careerPreferences.providingServices.serviceDescription}
            onChange={e => updateServices('serviceDescription', e.target.value)} />
          <HelperText>Describe your service rates, terms, or freelance portfolio.</HelperText>
        </div>
      </div>
    </SectionCard>
  );
}
