import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, IC } from './FormHelpers';

export default function CoursesSection({ courses, setCourses, updateArr, addItem, removeItem, liUrl, onReload }) {
  const emptyCourse = {
    name: '', associatedWith: '', courseNumber: ''
  };

  return (
    <OptionalSectionCard
      title="Courses"
      icon={IC.course}
      liUrl={liUrl}
      badge="optional"
      description="Add relevant coursework you completed during school, university, bootcamps, or online platforms."
      tip="Listing specialized courses (e.g., 'Advanced Algorithms') shows your theoretical strength to recruiters."
      onReload={onReload}
    >
      <div className="space-y-4">
        {courses.map((course, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={course.name}
            subtitle={course.associatedWith ? `Associated with: ${course.associatedWith}` : ''}
            canRemove={courses.length > 1}
            onRemove={() => removeItem(setCourses, i)}
          >
            <div className="space-y-4">
              {/* Course name */}
              <div>
                <FieldLabel htmlFor={`course-name-${i}`} value={course.name}>Course name *</FieldLabel>
                <input id={`course-name-${i}`} className={inputCls} placeholder="Ex: World History"
                  value={course.name}
                  onChange={(e) => updateArr(setCourses, i, 'name', e.target.value)} />
                <HelperText>The name of the course or subject.</HelperText>
              </div>

              {/* Number */}
              <div>
                <FieldLabel htmlFor={`course-number-${i}`} value={course.courseNumber}>Number</FieldLabel>
                <input id={`course-number-${i}`} className={inputCls} placeholder="Ex: HIST 101"
                  value={course.courseNumber || ''}
                  onChange={(e) => updateArr(setCourses, i, 'courseNumber', e.target.value)} />
                <HelperText>The course code or number, if applicable.</HelperText>
              </div>

              {/* Associated with */}
              <div>
                <FieldLabel htmlFor={`course-associatedWith-${i}`} value={course.associatedWith}>Associated with</FieldLabel>
                <input id={`course-associatedWith-${i}`} className={inputCls} placeholder="Ex: Boston University"
                  value={course.associatedWith}
                  onChange={(e) => updateArr(setCourses, i, 'associatedWith', e.target.value)} />
                <HelperText>The school, university, or company where you took this course.</HelperText>
              </div>
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setCourses, emptyCourse)} label="Add Course" />
      </div>
    </OptionalSectionCard>
  );
}
