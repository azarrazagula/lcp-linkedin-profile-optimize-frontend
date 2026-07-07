import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, IC } from './FormHelpers';

export default function CoursesSection({ courses, setCourses, updateArr, addItem, removeItem }) {
  const emptyCourse = {
    name: '', associatedWith: '', courseNumber: ''
  };

  return (
    <OptionalSectionCard
      title="Courses"
      icon={IC.course}
      badge="optional"
      description="Add relevant coursework you completed during school, university, bootcamps, or online platforms."
      tip="Listing specialized courses (e.g., 'Advanced Algorithms') shows your theoretical strength to recruiters."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel value={course.name}>Course Name *</FieldLabel>
                <input className={inputCls} placeholder="e.g. Data Structures and Algorithms"
                  value={course.name}
                  onChange={(e) => updateArr(setCourses, i, 'name', e.target.value)} />
                <HelperText>The name of the course or subject.</HelperText>
              </div>
              <div>
                <FieldLabel value={course.associatedWith}>Associated With</FieldLabel>
                <input className={inputCls} placeholder="e.g. Boston University, Self-Employed"
                  value={course.associatedWith}
                  onChange={(e) => updateArr(setCourses, i, 'associatedWith', e.target.value)} />
                <HelperText>The school or college where you took this course.</HelperText>
              </div>
            </div>

            <div>
              <FieldLabel value={course.courseNumber}>Course Number</FieldLabel>
              <input className={inputCls} placeholder="e.g. CS-101"
                value={course.courseNumber || ''}
                onChange={(e) => updateArr(setCourses, i, 'courseNumber', e.target.value)} />
              <HelperText>The course code or number, if applicable.</HelperText>
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
