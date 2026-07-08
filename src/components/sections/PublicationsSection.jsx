import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC } from './FormHelpers';

export default function PublicationsSection({ publications, setPublications, updateArr, addItem, removeItem, liUrl, onOptimize, optimizingField }) {
  const emptyPub = {
    title: '', publisher: '', url: '', pubDate: '', pubMonth: '', pubYear: '', description: '', author: ''
  };

  return (
    <OptionalSectionCard
      title="Publications"
      icon={IC.pub}
      liUrl={liUrl}
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
            <div className="space-y-4">
              {/* Title */}
              <div>
                <FieldLabel htmlFor={`pub-title-${i}`} value={pub.title}>Title *</FieldLabel>
                <input id={`pub-title-${i}`} className={inputCls} placeholder="Ex: Giving and receiving feedback"
                  value={pub.title}
                  onChange={(e) => updateArr(setPublications, i, 'title', e.target.value)} />
                <HelperText>The title of your paper, article, or book.</HelperText>
              </div>

              {/* Publication/Publisher */}
              <div>
                <FieldLabel htmlFor={`pub-publisher-${i}`} value={pub.publisher}>Publication/Publisher</FieldLabel>
                <input id={`pub-publisher-${i}`} className={inputCls} placeholder="Ex: Harvard Business Review"
                  value={pub.publisher}
                  onChange={(e) => updateArr(setPublications, i, 'publisher', e.target.value)} />
                <HelperText>The journal, website, or publishing company.</HelperText>
              </div>

              {/* Publication date */}
              <div>
                <FieldLabel htmlFor={`pub-date-${i}`} value={pub.pubDate}>Publication date</FieldLabel>
                <input id={`pub-date-${i}`} type="date" className={inputCls}
                  value={pub.pubDate || ''}
                  onChange={(e) => updateArr(setPublications, i, 'pubDate', e.target.value)} />
                <HelperText>Select the date this work was published.</HelperText>
              </div>

              {/* Author */}
              <div>
                <FieldLabel htmlFor={`pub-author-${i}`} value={pub.author}>Author</FieldLabel>
                <input id={`pub-author-${i}`} className={inputCls} placeholder="Add author or contributors"
                  value={pub.author || ''}
                  onChange={(e) => updateArr(setPublications, i, 'author', e.target.value)} />
                <HelperText>Specify authors or contributors to the publication.</HelperText>
              </div>

              {/* Publication URL */}
              <div>
                <FieldLabel htmlFor={`pub-url-${i}`} value={pub.url}>Publication URL</FieldLabel>
                <input id={`pub-url-${i}`} className={inputCls} placeholder="https://journal.com/article"
                  value={pub.url}
                  onChange={(e) => updateArr(setPublications, i, 'url', e.target.value)} />
                <HelperText>Link to read the publication online.</HelperText>
              </div>

              {/* Description */}
              <div>
                <FieldLabel htmlFor={`pub-description-${i}`} value={pub.description}>Description</FieldLabel>
                <div className="relative">
                  <textarea id={`pub-description-${i}`} className={`${textareaCls} !pb-12`} rows={3}
                    placeholder="Give a short summary of the publication, key findings, or impact..."
                    value={pub.description || ''}
                    onChange={(e) => updateArr(setPublications, i, 'description', e.target.value)} />
                  {pub.description && pub.description.trim() && (
                    <button
                      type="button"
                      disabled={optimizingField?.type === 'publication' && optimizingField?.index === i}
                      onClick={() => onOptimize('publication', i)}
                      className="absolute bottom-2.5 right-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {optimizingField?.type === 'publication' && optimizingField?.index === i ? (
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
                <HelperText>Summarize the topic and findings of your publication.</HelperText>
              </div>
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
