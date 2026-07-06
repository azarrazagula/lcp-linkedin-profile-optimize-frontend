import React, { useState } from 'react';
import { SectionCard, FieldLabel, HelperText, TagInput, CheckboxRow, inputCls, textareaCls, IC } from './FormHelpers';

export default function CareerPreferencesSection({ careerPreferences, setCareerPreferences }) {
  const [titleInput, setTitleInput] = useState('');
  const [locInput, setLocInput] = useState('');
  const [serviceInput, setServiceInput] = useState('');

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

  // Job Titles tags
  const handleTitleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && titleInput.trim()) {
      e.preventDefault();
      const val = titleInput.trim().replace(/,$/, '');
      if (val && !careerPreferences.openToWork.desiredTitles.includes(val)) {
        updateOTW('desiredTitles', [...careerPreferences.openToWork.desiredTitles, val]);
      }
      setTitleInput('');
    }
  };

  const removeTitle = (idx) => {
    updateOTW('desiredTitles', careerPreferences.openToWork.desiredTitles.filter((_, i) => i !== idx));
  };

  // Locations tags
  const handleLocKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && locInput.trim()) {
      e.preventDefault();
      const val = locInput.trim().replace(/,$/, '');
      if (val && !careerPreferences.openToWork.preferredLocations.includes(val)) {
        updateOTW('preferredLocations', [...careerPreferences.openToWork.preferredLocations, val]);
      }
      setLocInput('');
    }
  };

  const removeLoc = (idx) => {
    updateOTW('preferredLocations', careerPreferences.openToWork.preferredLocations.filter((_, i) => i !== idx));
  };

  // Services tags
  const handleServiceKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && serviceInput.trim()) {
      e.preventDefault();
      const val = serviceInput.trim().replace(/,$/, '');
      if (val && !careerPreferences.providingServices.servicesOffered.includes(val)) {
        updateServices('servicesOffered', [...careerPreferences.providingServices.servicesOffered, val]);
      }
      setServiceInput('');
    }
  };

  const removeService = (idx) => {
    updateServices('servicesOffered', careerPreferences.providingServices.servicesOffered.filter((_, i) => i !== idx));
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
          <FieldLabel value={careerPreferences.openToWork.desiredTitles.length > 0 ? careerPreferences.openToWork.desiredTitles.join(', ') : ''}>Desired Job Titles</FieldLabel>
          <TagInput
            tags={careerPreferences.openToWork.desiredTitles}
            tagInput={titleInput}
            setTagInput={setTitleInput}
            onKeyDown={handleTitleKeyDown}
            onRemove={removeTitle}
            placeholder="e.g. Full Stack Developer, React Developer"
          />
          <HelperText>Add up to 5 job titles to let recruiters know what roles you want.</HelperText>
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
          <FieldLabel value={careerPreferences.openToWork.preferredLocations.length > 0 ? careerPreferences.openToWork.preferredLocations.join(', ') : ''}>Preferred Locations</FieldLabel>
          <TagInput
            tags={careerPreferences.openToWork.preferredLocations}
            tagInput={locInput}
            setTagInput={setLocInput}
            onKeyDown={handleLocKeyDown}
            onRemove={removeLoc}
            placeholder="e.g. Chennai, Bengaluru, Remote"
          />
          <HelperText>Add locations you want to work in or specify Remote.</HelperText>
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
          <HelperText>Let recruiters know how soon you are ready to join.</HelperText>
        </div>
      </div>

      {/* Providing Services block */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-extrabold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
          <span>🛠️</span> Providing Services Section (Freelancers-க்கு)
        </h4>

        <div>
          <FieldLabel value={careerPreferences.providingServices.servicesOffered.length > 0 ? careerPreferences.providingServices.servicesOffered.join(', ') : ''}>Services Offered</FieldLabel>
          <TagInput
            tags={careerPreferences.providingServices.servicesOffered}
            tagInput={serviceInput}
            setTagInput={setServiceInput}
            onKeyDown={handleServiceKeyDown}
            onRemove={removeService}
            placeholder="e.g. Web Development, UI/UX Design, Consulting"
          />
          <HelperText>List the service offerings you provide to clients.</HelperText>
        </div>

        <div>
          <FieldLabel value={careerPreferences.providingServices.serviceDescription}>Services Description</FieldLabel>
          <textarea className={textareaCls} rows={3}
            placeholder="Describe your services, pricing guidelines, portfolio links, or work terms..."
            value={careerPreferences.providingServices.serviceDescription}
            onChange={e => updateServices('serviceDescription', e.target.value)} />
          <HelperText>Briefly explain your freelance offerings and work style.</HelperText>
        </div>
      </div>
    </SectionCard>
  );
}
