import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function TestScoresSection({ testScores, setTestScores, updateArr, addItem, removeItem, liUrl, onOptimize, optimizingField, onReload }) {
  const emptyScore = {
    name: '', score: '', associatedWith: '', testMonth: '', testYear: '', description: ''
  };

  return (
    <OptionalSectionCard
      title="Test Scores"
      icon={IC.test}
      liUrl={liUrl}
      badge="optional"
      audienceHint="Recommended for Students"
      description="List standardized test scores (e.g., GRE, GMAT, SAT, TOEFL, or specialized examinations) that showcase your analytical abilities."
      tip="High test scores show analytical capabilities and academic potential, especially useful for university admissions or entry-level roles."
      onReload={onReload}
    >
      <div className="space-y-4">
        {testScores.map((scoreObj, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={scoreObj.name}
            subtitle={scoreObj.score ? `Score: ${scoreObj.score}` : ''}
            canRemove={testScores.length > 1}
            onRemove={() => removeItem(setTestScores, i)}
          >
            <div className="space-y-4">
              {/* Title */}
              <div>
                <FieldLabel htmlFor={`score-name-${i}`} value={scoreObj.name}>Title *</FieldLabel>
                <input id={`score-name-${i}`} className={inputCls} placeholder="Ex: GRE, GMAT, TOEFL"
                  value={scoreObj.name}
                  onChange={(e) => updateArr(setTestScores, i, 'name', e.target.value)} />
                <HelperText>The name of the exam or test.</HelperText>
              </div>

              {/* Associated with */}
              <div>
                <FieldLabel htmlFor={`score-associatedWith-${i}`} value={scoreObj.associatedWith}>Associated with</FieldLabel>
                <input id={`score-associatedWith-${i}`} className={inputCls} placeholder="Ex: Boston University"
                  value={scoreObj.associatedWith || ''}
                  onChange={(e) => updateArr(setTestScores, i, 'associatedWith', e.target.value)} />
                <HelperText>The school, college, or company associated with this test.</HelperText>
              </div>

              {/* Score */}
              <div>
                <FieldLabel htmlFor={`score-val-${i}`} value={scoreObj.score}>Score *</FieldLabel>
                <input id={`score-val-${i}`} className={inputCls} placeholder="Ex: 330/340, Band 8.5"
                  value={scoreObj.score}
                  onChange={(e) => updateArr(setTestScores, i, 'score', e.target.value)} />
                <HelperText>Your test score or percentile.</HelperText>
              </div>

              {/* Test date */}
              <div>
                <FieldLabel value={scoreObj.testMonth && scoreObj.testYear ? `${scoreObj.testMonth} ${scoreObj.testYear}` : ''}>Test date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`score-testMonth-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Month</label>
                    <select id={`score-testMonth-${i}`} className={inputCls} value={scoreObj.testMonth || ''} onChange={(e) => updateArr(setTestScores, i, 'testMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`score-testYear-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Year *</label>
                    <select id={`score-testYear-${i}`} className={inputCls} value={scoreObj.testYear || ''} onChange={(e) => updateArr(setTestScores, i, 'testYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <FieldLabel htmlFor={`score-description-${i}`} value={scoreObj.description}>Description</FieldLabel>
                <div className="relative">
                  <textarea id={`score-description-${i}`} className={`${textareaCls} !pb-12`} rows={3}
                    placeholder="Ex: Percentiles or sections breakdown (e.g. Quantitative: 170, Verbal: 160)..."
                    value={scoreObj.description || ''}
                    onChange={(e) => updateArr(setTestScores, i, 'description', e.target.value)} />
                  {scoreObj.description && scoreObj.description.trim() && (
                    <button
                      type="button"
                      disabled={optimizingField?.type === 'testScore' && optimizingField?.index === i}
                      onClick={() => onOptimize('testScore', i)}
                      className="absolute bottom-2.5 right-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {optimizingField?.type === 'testScore' && optimizingField?.index === i ? (
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
                <HelperText>Any additional details about the test or your performance.</HelperText>
              </div>
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setTestScores, emptyScore)} label="Add Test Score" />
      </div>
    </OptionalSectionCard>
  );
}
