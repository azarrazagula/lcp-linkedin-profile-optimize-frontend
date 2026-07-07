import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function OrganizationsSection({ organizations, setOrganizations, updateArr, addItem, removeItem, experiences = [], educations = [], liUrl }) {
  const emptyOrg = {
    name: '', position: '', associatedWith: '', currentlyMember: false,
    startMonth: '', startYear: '', endMonth: '', endYear: '', description: ''
  };

  // Dynamically populate "Associated with" options from Experience companies and Education schools
  const associations = [
    ...experiences.map(exp => exp.company?.trim()).filter(Boolean),
    ...educations.map(edu => edu.school?.trim()).filter(Boolean)
  ];
  const uniqueAssociations = Array.from(new Set(associations));

  return (
    <OptionalSectionCard
      title="Organizations"
      icon={IC.org}
      liUrl={liUrl}
      badge="optional"
      description="List professional associations, student bodies, non-profits, or industry memberships you belong to."
      tip="Membership in professional clubs or societies shows leadership capabilities and industry interest."
    >
      <div className="space-y-4">
        {organizations.map((org, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={org.name}
            subtitle={org.position}
            canRemove={organizations.length > 1}
            onRemove={() => removeItem(setOrganizations, i)}
          >
            <div className="space-y-4">
              {/* Organization name */}
              <div>
                <FieldLabel value={org.name}>Organization name *</FieldLabel>
                <input className={inputCls} placeholder="Ex: IEEE, Toastmasters"
                  value={org.name}
                  onChange={(e) => updateArr(setOrganizations, i, 'name', e.target.value)} />
                <HelperText>The name of the organization you are a member of.</HelperText>
              </div>

              {/* Position held */}
              <div>
                <FieldLabel value={org.position}>Position held</FieldLabel>
                <input className={inputCls} placeholder="Ex: Member, Vice President"
                  value={org.position}
                  onChange={(e) => updateArr(setOrganizations, i, 'position', e.target.value)} />
                <HelperText>Your title or role within the organization.</HelperText>
              </div>

              {/* Associated with */}
              <div>
                <FieldLabel value={org.associatedWith}>Associated with</FieldLabel>
                <select className={inputCls} value={org.associatedWith || ''} onChange={(e) => updateArr(setOrganizations, i, 'associatedWith', e.target.value)}>
                  <option value="">Please select</option>
                  {uniqueAssociations.map((assoc) => (
                    <option key={assoc} value={assoc}>{assoc}</option>
                  ))}
                </select>
                <HelperText>Associate this membership with a job or education from your profile.</HelperText>
              </div>

              {/* Start Date */}
              <div>
                <FieldLabel value={org.startMonth && org.startYear ? `${org.startMonth} ${org.startYear}` : ''}>Start date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                    <select className={inputCls} value={org.startMonth || ''} onChange={(e) => updateArr(setOrganizations, i, 'startMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
                    <select className={inputCls} value={org.startYear || ''} onChange={(e) => updateArr(setOrganizations, i, 'startYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* End Date */}
              <div>
                <FieldLabel value={org.endMonth && org.endYear ? `${org.endMonth} ${org.endYear}` : ''}>End date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                    <select className={inputCls} value={org.endMonth || ''} onChange={(e) => updateArr(setOrganizations, i, 'endMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
                    <select className={inputCls} value={org.endYear || ''} onChange={(e) => updateArr(setOrganizations, i, 'endYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <FieldLabel value={org.description}>Description</FieldLabel>
                <textarea className={textareaCls} rows={3}
                  placeholder="Describe your role, key contributions, or events organized..."
                  value={org.description || ''}
                  onChange={(e) => updateArr(setOrganizations, i, 'description', e.target.value)} />
                <HelperText>Describe your involvement and contributions to the group.</HelperText>
              </div>
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setOrganizations, emptyOrg)} label="Add Organization" />
      </div>
    </OptionalSectionCard>
  );
}
