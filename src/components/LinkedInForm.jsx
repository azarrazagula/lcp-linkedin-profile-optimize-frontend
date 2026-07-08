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
import OrganizationsSection from './sections/OrganizationsSection';
import PublicationsSection from './sections/PublicationsSection';
import PatentsSection from './sections/PatentsSection';
import TestScoresSection from './sections/TestScoresSection';

export default function LinkedInForm() {
  const [optimizingField, setOptimizingField] = useState(null); // e.g. { type: 'headline', index: null }
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(prev => prev && prev.message === message ? null : prev);
    }, 4000);
  };

  const handleFieldOptimize = async (type, index = null) => {
    const activeToken = localStorage.getItem('user_token');
    if (!activeToken) {
      showNotification('warning', 'Please Sign In first to use AI features!');
      return;
    }

    // Set loading indicator
    setOptimizingField({ type, index });

    try {
      // Compile the entire current form state to send to Gemini for contextual optimization
      const formData = {
        basicInfo,
        contactInfo,
        about,
        experiences,
        educations,
        skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean) : skills,
        projects,
        certifications,
        languages,
        volunteerExp,
        awards,
        courses,
        organizations,
        publications,
        patents,
        testScores
      };

      const res = await fetch('http://localhost:5001/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': activeToken ? `Bearer ${activeToken}` : '',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        if (type === 'headline') {
          setBasicInfo(prev => ({ ...prev, headline: data.headline }));
        } else if (type === 'about') {
          setAbout(data.about);
        } else if (type === 'skills') {
          setSkills(Array.isArray(data.skills) ? data.skills.join(', ') : data.skills);
        } else if (type === 'experience' && index !== null) {
          setExperiences(prev => prev.map((exp, idx) => idx === index ? { ...exp, description: data.experiences[idx]?.description || exp.description } : exp));
        } else if (type === 'project' && index !== null) {
          setProjects(prev => prev.map((proj, idx) => idx === index ? { ...proj, description: data.projects[idx]?.description || proj.description } : proj));
        } else if (type === 'education' && index !== null) {
          setEducations(prev => prev.map((edu, idx) => idx === index ? { ...edu, description: data.educations[idx]?.description || edu.description } : edu));
        } else if (type === 'volunteer' && index !== null) {
          setVolunteerExp(prev => prev.map((vol, idx) => idx === index ? { ...vol, description: data.volunteerExp[idx]?.description || vol.description } : vol));
        } else if (type === 'award' && index !== null) {
          setAwards(prev => prev.map((aw, idx) => idx === index ? { ...aw, description: data.awards[idx]?.description || aw.description } : aw));
        } else if (type === 'organization' && index !== null) {
          setOrganizations(prev => prev.map((org, idx) => idx === index ? { ...org, description: data.organizations[idx]?.description || org.description } : org));
        } else if (type === 'publication' && index !== null) {
          setPublications(prev => prev.map((pub, idx) => idx === index ? { ...pub, description: data.publications[idx]?.description || pub.description } : pub));
        } else if (type === 'patent' && index !== null) {
          setPatents(prev => prev.map((pat, idx) => idx === index ? { ...pat, description: data.patents[idx]?.description || pat.description } : pat));
        } else if (type === 'testScore' && index !== null) {
          setTestScores(prev => prev.map((ts, idx) => idx === index ? { ...ts, description: data.testScores[idx]?.description || ts.description } : ts));
        }
      } else {
        showNotification('error', data.message || 'AI Optimization failed.');
      }
    } catch (error) {
      console.error('AI field optimize error:', error);
      showNotification('error', 'Cannot connect to backend server. Make sure it is running on port 5001.');
    } finally {
      setOptimizingField(null);
    }
  };

  // Slider wizard states
  const [currentStep, setCurrentStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState('forward'); // 'forward' or 'backward'

  const STEPS = [
    'Basic Info',
    'Contact Info',
    'Education',
    'Skills',
    'Projects',
    'Experience',
    'About',
    'Languages',
    'Certifications',
    'Preferences',
    'Volunteer',
    'Awards',
    'Courses',
    'Organizations',
    'Publications',
    'Patents',
    'Test Scores'
  ];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicInfoSection
            basicInfo={basicInfo}
            setBasicInfo={setBasicInfo}
            liUrl={LI.intro}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 1:
        return (
          <ContactInfoSection
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
            liUrl={LI.contact}
          />
        );
      case 2:
        return (
          <EducationSection
            educations={educations}
            setEducations={setEducations}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            liUrl={LI.education}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 3:
        return (
          <SkillsSection
            skills={skills}
            setSkills={setSkills}
            liUrl={LI.skills}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 4:
        return (
          <ProjectsSection
            projects={projects}
            setProjects={setProjects}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            liUrl={LI.projects}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 5:
        return (
          <ExperienceSection
            experiences={experiences}
            setExperiences={setExperiences}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            liUrl={LI.experience}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 6:
        return (
          <AboutSection
            about={about}
            setAbout={setAbout}
            liUrl={LI.about}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 7:
        return (
          <LanguagesSection
            languages={languages}
            setLanguages={setLanguages}
            liUrl={LI.languages}
          />
        );
      case 8:
        return (
          <CertificationsSection
            certifications={certifications}
            setCertifications={setCertifications}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            liUrl={LI.certifications}
          />
        );
      case 9:
        return (
          <JobPreferenceSection
            jobPreferences={jobPreferences}
            setJobPreferences={setJobPreferences}
          />
        );
      case 10:
        return (
          <VolunteerSection
            volunteerExp={volunteerExp}
            setVolunteerExp={setVolunteerExp}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            liUrl={LI.volunteer}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 11:
        return (
          <AwardsSection
            awards={awards}
            setAwards={setAwards}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            experiences={experiences}
            educations={educations}
            liUrl={LI.awards}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 12:
        return (
          <CoursesSection
            courses={courses}
            setCourses={setCourses}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            liUrl={LI.courses}
          />
        );
      case 13:
        return (
          <OrganizationsSection
            organizations={organizations}
            setOrganizations={setOrganizations}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            experiences={experiences}
            educations={educations}
            liUrl={LI.organizations}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 14:
        return (
          <PublicationsSection
            publications={publications}
            setPublications={setPublications}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            liUrl={LI.publications}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 15:
        return (
          <PatentsSection
            patents={patents}
            setPatents={setPatents}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            liUrl={LI.patents}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      case 16:
        return (
          <TestScoresSection
            testScores={testScores}
            setTestScores={setTestScores}
            updateArr={updateArr}
            addItem={addItem}
            removeItem={removeItem}
            liUrl={LI.testScores}
            onOptimize={handleFieldOptimize}
            optimizingField={optimizingField}
          />
        );
      default:
        return null;
    }
  };


  // Section 1: Basic Info
  const [basicInfo, setBasicInfo] = useState({
    fullName: '', pronouns: '', industry: '', headline: '', location: '', linkedinUrl: '',
  });

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
      foundVia: ''
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

  // Optional Section 5: Organizations
  const [organizations, setOrganizations] = useState([
    { name: '', position: '', associatedWith: '', currentlyMember: false, startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' }
  ]);

  // Optional Section 6: Publications
  const [publications, setPublications] = useState([
    { title: '', publisher: '', url: '', pubDate: '', pubMonth: '', pubYear: '', description: '', author: '' }
  ]);

  // Optional Section 7: Patents
  const [patents, setPatents] = useState([
    { title: '', patentNumber: '', url: '', patentDate: '', patentMonth: '', patentYear: '', description: '', inventor: '' }
  ]);

  // Optional Section 8: Test Scores
  const [testScores, setTestScores] = useState([
    { name: '', score: '', associatedWith: '', testMonth: '', testYear: '', description: '' }
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
    if (projects.some(p => p.name.trim())) score += 5;
    if (volunteerExp.some(v => v.organization.trim())) score += 1;
    if (awards.some(a => a.title.trim())) score += 1;
    if (courses.some(c => c.name.trim())) score += 1;
    if (organizations.some(o => o.name.trim())) score += 1;
    if (publications.some(p => p.title.trim())) score += 1;

    return Math.min(score, 100);
  };

  const completionPct = calculateProgress();

  const getCompletionBadge = (pct) => {
    if (pct < 20) return { label: 'Starter', emoji: '🥚', color: 'text-slate-600 border-slate-200 bg-slate-50' };
    if (pct < 40) return { label: 'Getting Started', emoji: '🌱', color: 'text-amber-600 border-amber-200 bg-amber-50' };
    if (pct < 60) return { label: 'Good Progress', emoji: '📈', color: 'text-blue-600 border-blue-200 bg-blue-50' };
    if (pct < 80) return { label: 'Professional', emoji: '💼', color: 'text-emerald-600 border-emerald-200 bg-emerald-50' };
    if (pct < 100) return { label: 'Strong Candidate', emoji: '🌟', color: 'text-indigo-600 border-indigo-200 bg-indigo-50' };
    return { label: 'Outstanding Profile', emoji: '🏆', color: 'text-purple-600 border-purple-200 bg-purple-50' };
  };

  const badgeInfo = getCompletionBadge(completionPct);

  // ── Dynamic LinkedIn URLs ───────────────────────────────────────────────────
  const LI = getLIUrls(basicInfo.linkedinUrl);

  return (
    <div className="space-y-6">
      {/* Sticky Progress Indicator */}
      <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
        <div className="flex items-center gap-2">
          <span className="text-xl">{badgeInfo.emoji}</span>
          <div>
            <h2 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">Profile Completeness</h2>
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

      <style>{`
        @keyframes slideInRight {
          0% { transform: translateX(30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          0% { transform: translateX(-30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Slide-in Animated Section Container */}
      <div className="space-y-4">

        <div key={currentStep} className={slideDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {renderStepContent(currentStep)}
          </form>
        </div>

        {/* Wizard Navigation Footer */}
        <div className="flex justify-between items-center p-4 bg-white border border-slate-200/80 rounded-2xl shadow-3xs">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => {
              setSlideDirection('backward');
              setCurrentStep(prev => prev - 1);
            }}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-3xs hover:scale-105 active:scale-95"
          >
            ← Previous
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-1.5 overflow-x-auto max-w-[120px] sm:max-w-md scrollbar-none py-1">
            {STEPS.map((label, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSlideDirection(idx > currentStep ? 'forward' : 'backward');
                  setCurrentStep(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentStep ? 'w-5 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                title={label}
              />
            ))}
          </div>

          <button
            type="button"
            disabled={currentStep === STEPS.length - 1}
            onClick={() => {
              setSlideDirection('forward');
              setCurrentStep(prev => prev + 1);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Premium custom floating notification card */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-[9999] animate-slideUp">
          <div className={`backdrop-blur-xl bg-white/90 border ${notification.type === 'error' ? 'border-rose-200 shadow-rose-500/10' :
            notification.type === 'warning' ? 'border-amber-200 shadow-amber-500/10' :
              'border-blue-200 shadow-blue-500/10'
            } p-4 rounded-2xl shadow-xl flex items-start gap-3 max-w-sm border-l-4 ${notification.type === 'error' ? 'border-l-rose-500' :
              notification.type === 'warning' ? 'border-l-amber-500' :
                'border-l-blue-500'
            } transition-all duration-300`}>
            <span className="text-base shrink-0 mt-0.5">
              {notification.type === 'error' ? '❌' :
                notification.type === 'warning' ? '⚠️' :
                  '✨'}
            </span>
            <div className="flex-1 space-y-0.5">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                {notification.type === 'error' ? 'Error' :
                  notification.type === 'warning' ? 'Alert' :
                    'Success'}
              </h4>
              <p className="text-[11px] text-slate-600 font-bold leading-normal">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
