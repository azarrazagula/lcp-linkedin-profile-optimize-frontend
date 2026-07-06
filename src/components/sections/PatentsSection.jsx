import React from 'react';
import { OptionalSectionCard, FieldLabel, CollapsibleItem, AddMoreBtn, DateRow, inputCls, IC } from './FormHelpers';

export default function PatentsSection({ patents, setPatents, updateArr, addItem, removeItem }) {
  const emptyPatent = {
    title: '', patentNumber: '', url: '',
    patentMonth: '', patentYear: '', description: ''
  };

  return (
    <OptionalSectionCard
      title="Patents"
      icon={IC.patent}
      badge="optional"
      description="List patents you've filed, received, or contributed to as an inventor."
      tip="Patents showcase elite problem-solving, innovative design capabilities, and high-value research skills."
    >
      <div className="space-y-4">
        {patents.map((patent, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={patent.title}
            subtitle={patent.patentNumber ? `Patent #: ${patent.patentNumber}` : ''}
            canRemove={patents.length > 1}
            onRemove={() => removeItem(setPatents, i)}
          >
            <div>
              <FieldLabel value={patent.title}>Patent Title *</FieldLabel>
              <input className={inputCls} placeholder="e.g. System for automated LinkedIn profile optimization"
                value={patent.title}
                onChange={(e) => updateArr(setPatents, i, 'title', e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel value={patent.patentNumber}>Patent Number</FieldLabel>
                <input className={inputCls} placeholder="e.g. US-123456-A"
                  value={patent.patentNumber}
                  onChange={(e) => updateArr(setPatents, i, 'patentNumber', e.target.value)} />
              </div>
              <div>
                <FieldLabel value={patent.url}>Patent URL / Link</FieldLabel>
                <input className={inputCls} placeholder="https://patents.google.com/patent/..."
                  value={patent.url}
                  onChange={(e) => updateArr(setPatents, i, 'url', e.target.value)} />
              </div>
            </div>

            <div>
              <FieldLabel value={patent.patentMonth && patent.patentYear ? `${patent.patentMonth} ${patent.patentYear}` : ''}>Filing / Issue Date</FieldLabel>
              <DateRow
                monthVal={patent.patentMonth}
                yearVal={patent.patentYear}
                onMonthChange={(e) => updateArr(setPatents, i, 'patentMonth', e.target.value)}
                onYearChange={(e) => updateArr(setPatents, i, 'patentYear', e.target.value)}
              />
            </div>

            <div>
              <FieldLabel value={patent.description}>Description</FieldLabel>
              <textarea className={inputCls} rows={2}
                placeholder="Briefly explain the invention, technology area, or utility..."
                value={patent.description || ''}
                onChange={(e) => updateArr(setPatents, i, 'description', e.target.value)} />
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setPatents, emptyPatent)} label="Add Patent" />
      </div>
    </OptionalSectionCard>
  );
}
