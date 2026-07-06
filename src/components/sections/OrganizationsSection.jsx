import React from 'react';
import { OptionalSectionCard, FieldLabel, CollapsibleItem, AddMoreBtn, CheckboxRow, DateRow, inputCls, IC } from './FormHelpers';

export default function OrganizationsSection({ organizations, setOrganizations, updateArr, addItem, removeItem }) {
  const emptyOrg = {
    name: '', position: '', currentlyMember: false,
    startMonth: '', startYear: '', endMonth: '', endYear: '', description: ''
  };

  return (
    <OptionalSectionCard
      title="Organizations"
      icon={IC.org}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel value={org.name}>Organization Name *</FieldLabel>
                <input className={inputCls} placeholder="e.g. IEEE, Toastmasters"
                  value={org.name}
                  onChange={(e) => updateArr(setOrganizations, i, 'name', e.target.value)} />
              </div>
              <div>
                <FieldLabel value={org.position}>Position / Role</FieldLabel>
                <input className={inputCls} placeholder="e.g. Member, Vice President"
                  value={org.position}
                  onChange={(e) => updateArr(setOrganizations, i, 'position', e.target.value)} />
              </div>
            </div>

            <div className="flex items-center gap-2.5 py-1">
              <CheckboxRow
                id={`org-current-${i}`}
                checked={org.currentlyMember}
                onChange={(e) => updateArr(setOrganizations, i, 'currentlyMember', e.target.checked)}
                label="I am currently a member of this organization"
              />
            </div>

            <div>
              <FieldLabel value={org.startMonth && org.startYear ? `${org.startMonth} ${org.startYear}` : ''}>Start date</FieldLabel>
              <DateRow
                monthVal={org.startMonth}
                yearVal={org.startYear}
                onMonthChange={(e) => updateArr(setOrganizations, i, 'startMonth', e.target.value)}
                onYearChange={(e) => updateArr(setOrganizations, i, 'startYear', e.target.value)}
              />
            </div>

            {!org.currentlyMember && (
              <div>
                <FieldLabel value={org.endMonth && org.endYear ? `${org.endMonth} ${org.endYear}` : ''}>End date</FieldLabel>
                <DateRow
                  monthVal={org.endMonth}
                  yearVal={org.endYear}
                  onMonthChange={(e) => updateArr(setOrganizations, i, 'endMonth', e.target.value)}
                  onYearChange={(e) => updateArr(setOrganizations, i, 'endYear', e.target.value)}
                />
              </div>
            )}

            <div>
              <FieldLabel value={org.description}>Description</FieldLabel>
              <textarea className={inputCls} rows={2}
                placeholder="Describe your role, key contributions, or events organized..."
                value={org.description || ''}
                onChange={(e) => updateArr(setOrganizations, i, 'description', e.target.value)} />
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
