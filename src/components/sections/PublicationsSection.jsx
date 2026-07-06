import React from 'react';
import { OptionalSectionCard, FieldLabel, CollapsibleItem, AddMoreBtn, DateRow, inputCls, IC } from './FormHelpers';

export default function PublicationsSection({ publications, setPublications, updateArr, addItem, removeItem }) {
  const emptyPub = {
    title: '', publisher: '', url: '',
    pubMonth: '', pubYear: '', description: ''
  };

  return (
    <OptionalSectionCard
      title="Publications"
      icon={IC.pub}
      badge="optional"
      description="Showcase academic papers, books, blog posts, white papers, or research articles you have published."
      tip="Publishing demonstrates subject matter expertise and increases your visibility as a thought leader."
    >
      <div className="space-y-4">
        {publications.map((pub, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={pub.title}
            subtitle={pub.publisher}
            canRemove={publications.length > 1}
            onRemove={() => removeItem(setPublications, i)}
          >
            <div>
              <FieldLabel value={pub.title}>Publication Title *</FieldLabel>
              <input className={inputCls} placeholder="e.g. Scaling React apps using WebWorkers"
                value={pub.title}
                onChange={(e) => updateArr(setPublications, i, 'title', e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel value={pub.publisher}>Publisher / Journal</FieldLabel>
                <input className={inputCls} placeholder="e.g. Medium, IEEE Journal"
                  value={pub.publisher}
                  onChange={(e) => updateArr(setPublications, i, 'publisher', e.target.value)} />
              </div>
              <div>
                <FieldLabel value={pub.url}>Publication URL</FieldLabel>
                <input className={inputCls} placeholder="https://journal.com/article"
                  value={pub.url}
                  onChange={(e) => updateArr(setPublications, i, 'url', e.target.value)} />
              </div>
            </div>

            <div>
              <FieldLabel value={pub.pubMonth && pub.pubYear ? `${pub.pubMonth} ${pub.pubYear}` : ''}>Publication Date</FieldLabel>
              <DateRow
                monthVal={pub.pubMonth}
                yearVal={pub.pubYear}
                onMonthChange={(e) => updateArr(setPublications, i, 'pubMonth', e.target.value)}
                onYearChange={(e) => updateArr(setPublications, i, 'pubYear', e.target.value)}
              />
            </div>

            <div>
              <FieldLabel value={pub.description}>Description</FieldLabel>
              <textarea className={inputCls} rows={2}
                placeholder="Give a short summary of the publication, key findings, or impact..."
                value={pub.description || ''}
                onChange={(e) => updateArr(setPublications, i, 'description', e.target.value)} />
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setPublications, emptyPub)} label="Add Publication" />
      </div>
    </OptionalSectionCard>
  );
}
