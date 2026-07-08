import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC } from './FormHelpers';

export default function PatentsSection({ patents, setPatents, updateArr, addItem, removeItem, liUrl, onOptimize, optimizingField }) {
  const emptyPatent = {
    title: '', patentNumber: '', url: '', patentDate: '', patentMonth: '', patentYear: '', description: '', inventor: ''
  };

  return (
    <OptionalSectionCard
      title="Patents"
      icon={IC.patent}
      liUrl={liUrl}
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
            <div className="space-y-4">
              {/* Patent title */}
              <div>
                <FieldLabel htmlFor={`patent-title-${i}`} value={patent.title}>Patent title *</FieldLabel>
                <input id={`patent-title-${i}`} className={inputCls} placeholder="Ex: Technologies for ascribing..."
                  value={patent.title}
                  onChange={(e) => updateArr(setPatents, i, 'title', e.target.value)} />
                <HelperText>The title of the patent.</HelperText>
              </div>

              {/* Patent or application number */}
              <div>
                <FieldLabel htmlFor={`patent-number-${i}`} value={patent.patentNumber}>Patent or application number *</FieldLabel>
                <input id={`patent-number-${i}`} className={inputCls} placeholder="Ex: US 9229900"
                  value={patent.patentNumber}
                  onChange={(e) => updateArr(setPatents, i, 'patentNumber', e.target.value)} />
                <HelperText>The unique patent number or application number.</HelperText>
              </div>

              {/* Inventor */}
              <div>
                <FieldLabel htmlFor={`patent-inventor-${i}`} value={patent.inventor}>Inventor</FieldLabel>
                <input id={`patent-inventor-${i}`} className={inputCls} placeholder="Ex: Search for people / Enter inventor name"
                  value={patent.inventor || ''}
                  onChange={(e) => updateArr(setPatents, i, 'inventor', e.target.value)} />
                <HelperText>Specify inventors or contributors to the patent.</HelperText>
              </div>

              {/* Issue date */}
              <div>
                <FieldLabel htmlFor={`patent-date-${i}`} value={patent.patentDate}>Issue date</FieldLabel>
                <input id={`patent-date-${i}`} type="date" className={inputCls}
                  value={patent.patentDate || ''}
                  onChange={(e) => updateArr(setPatents, i, 'patentDate', e.target.value)} />
                <HelperText>Select the filing or issue date of the patent.</HelperText>
              </div>

              {/* Patent URL */}
              <div>
                <FieldLabel htmlFor={`patent-url-${i}`} value={patent.url}>Patent URL</FieldLabel>
                <input id={`patent-url-${i}`} className={inputCls} placeholder="https://patents.google.com/patent/..."
                  value={patent.url}
                  onChange={(e) => updateArr(setPatents, i, 'url', e.target.value)} />
                <HelperText>Link to view the patent documents online.</HelperText>
              </div>

              {/* Description */}
              <div>
                <FieldLabel htmlFor={`patent-description-${i}`} value={patent.description}>Description</FieldLabel>
                <div className="relative">
                  <textarea id={`patent-description-${i}`} className={`${textareaCls} !pb-12`} rows={3}
                    placeholder="Briefly explain the invention, technology area, or utility..."
                    value={patent.description || ''}
                    onChange={(e) => updateArr(setPatents, i, 'description', e.target.value)} />
                  {patent.description && patent.description.trim() && (
                    <button
                      type="button"
                      disabled={optimizingField?.type === 'patent' && optimizingField?.index === i}
                      onClick={() => onOptimize('patent', i)}
                      className="absolute bottom-2.5 right-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {optimizingField?.type === 'patent' && optimizingField?.index === i ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Optimizing...</span>
                        </>
                      ) : (
                        <>
                          <span>✨</span>
                          <span>Optimize with AI</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <HelperText>Describe the invention and what problem it solves.</HelperText>
              </div>
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
