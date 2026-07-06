import React from 'react';
import { SectionCard, FieldLabel, inputCls, IC } from './FormHelpers';

export default function OpenToWorkSection({ openToWork, setOpenToWork, liUrl }) {
  const toggleJobType = (type) => {
    const current = openToWork.jobTypes || [];
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    setOpenToWork({ ...openToWork, jobTypes: updated });
  };

  const toggleLocationType = (type) => {
    const current = openToWork.locationTypes || [];
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    setOpenToWork({ ...openToWork, locationTypes: updated });
  };

  return (
    <SectionCard title="Open to Work Preferences" icon={IC.target} liUrl={liUrl}>
      <div>
        <FieldLabel>Job Titles (comma-separated)</FieldLabel>
        <input className={inputCls} placeholder="e.g. Full Stack Developer, React Developer, MERN Stack Developer"
          value={openToWork.jobTitles || ''}
          onChange={(e) => setOpenToWork({ ...openToWork, jobTitles: e.target.value })} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Job Types */}
        <div>
          <FieldLabel>Job Types</FieldLabel>
          <div className="space-y-2 mt-1.5">
            {['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'].map((type) => (
              <label key={type} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input type="checkbox"
                  checked={(openToWork.jobTypes || []).includes(type)}
                  onChange={() => toggleJobType(type)}
                  className="w-4 h-4 accent-blue-500 rounded cursor-pointer" />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Location Types */}
        <div>
          <FieldLabel>Location Types</FieldLabel>
          <div className="space-y-2 mt-1.5">
            {['On-site', 'Hybrid', 'Remote'].map((type) => (
              <label key={type} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input type="checkbox"
                  checked={(openToWork.locationTypes || []).includes(type)}
                  onChange={() => toggleLocationType(type)}
                  className="w-4 h-4 accent-blue-500 rounded cursor-pointer" />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Target Locations</FieldLabel>
          <input className={inputCls} placeholder="e.g. Chennai, Bengaluru, Remote"
            value={openToWork.targetLocations || ''}
            onChange={(e) => setOpenToWork({ ...openToWork, targetLocations: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Start Date</FieldLabel>
          <select className={inputCls}
            value={openToWork.startDate || 'Immediately'}
            onChange={(e) => setOpenToWork({ ...openToWork, startDate: e.target.value })}>
            <option value="Immediately">Immediately (I'm actively applying)</option>
            <option value="Flexible">Flexible (I'm casually browsing)</option>
          </select>
        </div>
      </div>
    </SectionCard>
  );
}
