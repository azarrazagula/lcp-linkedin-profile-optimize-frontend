import React, { useState } from 'react';
import { getLIUrls } from './sections/FormHelpers';
import BasicInfoSection from './sections/BasicInfoSection';
import ContactInfoSection from './sections/ContactInfoSection';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import CertificationsSection from './sections/CertificationsSection';
import LanguagesSection from './sections/LanguagesSection';

// New Sections
import JobPreferenceSection from './sections/JobPreferenceSection';
import VolunteerSection from './sections/VolunteerSection';
import AwardsSection from './sections/AwardsSection';
import CoursesSection from './sections/CoursesSection';
import RecommendationsSection from './sections/RecommendationsSection';
import OrganizationsSection from './sections/OrganizationsSection';
import PublicationsSection from './sections/PublicationsSection';
import PatentsSection from './sections/PatentsSection';
import TestScoresSection from './sections/TestScoresSection';

export default function LinkedInForm({ onGenerate, loading }) {
  // Section 1: Basic Info
  const [basicInfo, setBasicInfo] = useState({
    fullName: '', pronouns: '', industry: '', headline: '', location: '', linkedinUrl: '',
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  // Section 1b: Contact Info
  const [contactInfo, setContactInfo] = useState({
    email: '', phone: '', phoneType: '', address: '', birthMonth: '', birthDay: '', websiteUrl: '', websiteType: ''
  });

  // Section 2: About
  const [about, setAbout] = useState('');

  // Section 3: Experience
  const [experiences, setExperiences] = useState([
    {
      jobTitle: '', company: '', employmentType: '', location: '', locationType: '',
      currentlyWorking: false, startMonth: '', startYear: '', description: '',
      profileHeadline: '', foundVia: ''
    },
  ]);

  // Section 4: Education
  const [educations, setEducations] = useState([
    {
      school: '', degree: '', fieldOfStudy: '',
      startMonth: '', startYear: '', endMonth: '', endYear: '',
      grade: '', activities: '', description: ''
    },
  ]);

  // Section 5: Skills
  const [skills, setSkills] = useState('');

  // Section 6: Projects
  const [projects, setProjects] = useState([
    {
      name: '', description: '', currentlyWorking: false,
      startMonth: '', startYear: '', endMonth: '', endYear: ''
    },
  ]);

  // Section 7: Certifications
  const [certifications, setCertifications] = useState([
    {
      name: '', issuedBy: '',
      issueMonth: '', issueYear: '',
      expirationMonth: '', expirationYear: '',
      credentialId: '', credentialUrl: ''
    },
  ]);

  // Section 8: Languages
  const [languages, setLanguages] = useState('');

  // Section 9: Job Preferences
  const [jobPreferences, setJobPreferences] = useState({
    desiredTitles: '',
    locationTypes: [],
    preferredLocations: '',
    noticePeriod: '',
    expectedSalary: '',
  });

  // Optional Section 1: Volunteer
  const [volunteerExp, setVolunteerExp] = useState([
    { organization: '', role: '', cause: '', currentlyVolunteering: false, startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' }
  ]);

  // Optional Section 2: Awards
  const [awards, setAwards] = useState([
    { title: '', associatedWith: '', issuer: '', issueMonth: '', issueYear: '', description: '' }
  ]);

  // Optional Section 3: Courses
  const [courses, setCourses] = useState([
    { name: '', associatedWith: '', courseNumber: '' }
  ]);

  // Optional Section 4: Recommendations
  const [recommendations, setRecommendations] = useState([
    { recommenderName: '', relationship: '', text: '' }
  ]);

  // Optional Section 5: Organizations
  const [organizations, setOrganizations] = useState([
    { name: '', position: '', currentlyMember: false, startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' }
  ]);

  // Optional Section 6: Publications
  const [publications, setPublications] = useState([
    { title: '', publisher: '', url: '', pubMonth: '', pubYear: '', description: '' }
  ]);

  // Optional Section 7: Patents
  const [patents, setPatents] = useState([
    { title: '', patentNumber: '', url: '', patentMonth: '', patentYear: '', description: '' }
  ]);

  // Optional Section 8: Test Scores
  const [testScores, setTestScores] = useState([
    { name: '', score: '', testMonth: '', testYear: '', description: '' }
  ]);

  // ── Array Helper Functions ────────────────────────────────────────────────
  const updateArr = (setter, i, field, val) =>
    setter((prev) => prev.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)));
  const addItem = (setter, tmpl) => setter((prev) => [...prev, { ...tmpl }]);
  const removeItem = (setter, i) => setter((prev) => prev.filter((_, idx) => idx !== i));

  // handleSkillKeyDown is removed since skills is now a simple text input

  // ── Profile Completion Score Calculation ──────────────────────────────────
  const calculateProgress = () => {
    let score = 0;

    // Required (Total: 70 pts)
    if (basicInfo.fullName.trim()) score += 10;
    if (basicInfo.headline.trim()) score += 10;
    if (basicInfo.linkedinUrl.trim()) score += 10;
    if (about.trim()) score += 10;
    const skillsCount = typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean).length : (Array.isArray(skills) ? skills.length : 0);
    if (skillsCount >= 3) score += 10;
    if (experiences.some(exp => exp.jobTitle.trim() && exp.company.trim())) score += 10;
    if (educations.some(edu => edu.school.trim())) score += 10;

    // Recommended (Total: 20 pts)
    if (contactInfo.email.trim() || contactInfo.phone.trim()) score += 5;
    if (certifications.some(c => c.name.trim())) score += 5;
    if (languages.trim()) score += 5;
    const desiredTitlesCount = typeof jobPreferences.desiredTitles === 'string' ? jobPreferences.desiredTitles.split(',').map(s => s.trim()).filter(Boolean).length : 0;
    if (desiredTitlesCount > 0) score += 5;

    // Standout / Optional (Total: 10 pts)
    if (projects.some(p => p.name.trim())) score += 4;
    if (volunteerExp.some(v => v.organization.trim())) score += 1;
    if (awards.some(a => a.title.trim())) score += 1;
    if (courses.some(c => c.name.trim())) score += 1;
    if (recommendations.some(r => r.recommenderName.trim())) score += 1;
    if (organizations.some(o => o.name.trim())) score += 1;
    if (publications.some(p => p.title.trim())) score += 1;

    return Math.min(score, 100);
  };

  const completionPct = calculateProgress();

  const getCompletionBadge = (pct) => {
    if (pct < 20) return { label: 'Starter', emoji: '🥚', color: 'text-slate-400 border-slate-200 bg-slate-50' };
    if (pct < 40) return { label: 'Getting Started', emoji: '🌱', color: 'text-amber-600 border-amber-200 bg-amber-50' };
    if (pct < 60) return { label: 'Good Progress', emoji: '📈', color: 'text-blue-600 border-blue-200 bg-blue-50' };
    if (pct < 80) return { label: 'Professional', emoji: '💼', color: 'text-emerald-600 border-emerald-200 bg-emerald-50' };
    if (pct < 100) return { label: 'Strong Candidate', emoji: '🌟', color: 'text-indigo-600 border-indigo-200 bg-indigo-50' };
    return { label: 'Outstanding Profile', emoji: '🏆', color: 'text-purple-600 border-purple-200 bg-purple-50' };
  };

  const badgeInfo = getCompletionBadge(completionPct);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onGenerate) {
      const skillsArray = typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean) : skills;
      const desiredTitlesArray = typeof jobPreferences.desiredTitles === 'string' ? jobPreferences.desiredTitles.split(',').map(s => s.trim()).filter(Boolean) : [];
      const preferredLocationsArray = typeof jobPreferences.preferredLocations === 'string' ? jobPreferences.preferredLocations.split(',').map(s => s.trim()).filter(Boolean) : [];

      onGenerate({
        basicInfo, contactInfo,
        profilePhoto, coverPhoto, about,
        experiences, educations,
        skills: skillsArray,
        projects, certifications, languages,
        careerPreferences: {
          openToWork: {
            desiredTitles: desiredTitlesArray,
            jobTypes: [],
            workplaceTypes: jobPreferences.locationTypes,
            preferredLocations: preferredLocationsArray,
            availability: jobPreferences.noticePeriod,
          },
          providingServices: {
            servicesOffered: [],
            serviceDescription: '',
          }
        },
        volunteerExp, awards, courses, recommendations,
        organizations, publications, patents, testScores
      });
    }
  };

  // ── Dynamic LinkedIn URLs ───────────────────────────────────────────────────
  const LI = getLIUrls(basicInfo.linkedinUrl);

  return (
    <div className="space-y-6">
      {/* Sticky Progress Indicator */}
      <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
        <div className="flex items-center gap-2">
          <span className="text-xl">{badgeInfo.emoji}</span>
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">Profile Completeness</h4>
            <span className={`inline-block text-[10px] font-extrabold border px-1.5 py-0.5 rounded-md mt-0.5 ${badgeInfo.color}`}>
              {badgeInfo.label} ({completionPct}%)
            </span>
          </div>
        </div>
        <div className="flex-1 w-full max-w-md">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPct}%` }}
            ></div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Basic Info */}
        <BasicInfoSection
          basicInfo={basicInfo}
          setBasicInfo={setBasicInfo}
          setProfilePhoto={setProfilePhoto}
          setCoverPhoto={setCoverPhoto}
          liUrl={LI.intro}
        />

        {/* 2. Contact Info */}
        <ContactInfoSection
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
          liUrl={LI.contact}
        />

        {/* 3. About */}
        <AboutSection
          about={about}
          setAbout={setAbout}
          liUrl={LI.about}
        />

        {/* 4. Experience */}
        <ExperienceSection
          experiences={experiences}
          setExperiences={setExperiences}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
          liUrl={LI.experience}
        />

        {/* 5. Education */}
        <EducationSection
          educations={educations}
          setEducations={setEducations}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
          liUrl={LI.education}
        />

        {/* 6. Skills */}
        <SkillsSection
          skills={skills}
          setSkills={setSkills}
          liUrl={LI.skills}
        />

        {/* 7. Projects */}
        <ProjectsSection
          projects={projects}
          setProjects={setProjects}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
          liUrl={LI.projects}
        />

        {/* 8. Certifications */}
        <CertificationsSection
          certifications={certifications}
          setCertifications={setCertifications}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
          liUrl={LI.certifications}
        />

        {/* 9. Languages */}
        <LanguagesSection
          languages={languages}
          setLanguages={setLanguages}
          liUrl={LI.languages}
        />

        {/* 10. Job Preferences */}
        <JobPreferenceSection
          jobPreferences={jobPreferences}
          setJobPreferences={setJobPreferences}
        />

        {/* 11. Volunteer Experience */}
        <VolunteerSection
          volunteerExp={volunteerExp}
          setVolunteerExp={setVolunteerExp}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
          liUrl={LI.volunteer}
        />

        {/* 12. Awards */}
        <AwardsSection
          awards={awards}
          setAwards={setAwards}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
          experiences={experiences}
          educations={educations}
          liUrl={LI.awards}
        />

        {/* 13. Courses */}
        <CoursesSection
          courses={courses}
          setCourses={setCourses}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
        />

        {/* 14. Recommendations */}
        <RecommendationsSection
          recommendations={recommendations}
          setRecommendations={setRecommendations}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
        />

        {/* 15. Organizations */}
        <OrganizationsSection
          organizations={organizations}
          setOrganizations={setOrganizations}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
        />

        {/* 16. Publications */}
        <PublicationsSection
          publications={publications}
          setPublications={setPublications}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
        />

        {/* 17. Patents */}
        <PatentsSection
          patents={patents}
          setPatents={setPatents}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
        />

        {/* 18. Test Scores */}
        <TestScoresSection
          testScores={testScores}
          setTestScores={setTestScores}
          updateArr={updateArr}
          addItem={addItem}
          removeItem={removeItem}
        />

        {/* Generate Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl font-bold text-base bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating with Gemini AI...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate with AI
            </>
          )}
        </button>
      </form>
    </div>
  );
}
