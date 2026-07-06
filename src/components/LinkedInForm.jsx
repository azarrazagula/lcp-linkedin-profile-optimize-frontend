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
      currentlyWorking: false, startDate: '', endDate: '', description: '',
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
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);

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

  // ── Array Helper Functions ────────────────────────────────────────────────
  const updateArr = (setter, i, field, val) =>
    setter((prev) => prev.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)));
  const addItem = (setter, tmpl) => setter((prev) => [...prev, { ...tmpl }]);
  const removeItem = (setter, i) => setter((prev) => prev.filter((_, idx) => idx !== i));

  const handleSkillKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();
      const s = skillInput.trim().replace(/,$/, '');
      if (s && !skills.includes(s)) setSkills((p) => [...p, s]);
      setSkillInput('');
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onGenerate) {
      onGenerate({
        basicInfo, contactInfo,
        profilePhoto, coverPhoto, about,
        experiences, educations, skills, projects, certifications, languages
      });
    }
  };

  // ── Dynamic LinkedIn URLs ───────────────────────────────────────────────────
  const LI = getLIUrls(basicInfo.linkedinUrl);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 1. Basic Info */}
      <BasicInfoSection
        basicInfo={basicInfo}
        setBasicInfo={setBasicInfo}
        setProfilePhoto={setProfilePhoto}
        setCoverPhoto={setCoverPhoto}
        liUrl={LI.intro}
      />

      {/* 1b. Contact Info */}
      <ContactInfoSection
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        liUrl={LI.contact}
      />

      {/* 2. About */}
      <AboutSection
        about={about}
        setAbout={setAbout}
        liUrl={LI.about}
      />

      {/* 3. Experience */}
      <ExperienceSection
        experiences={experiences}
        setExperiences={setExperiences}
        updateArr={updateArr}
        addItem={addItem}
        removeItem={removeItem}
        liUrl={LI.experience}
      />

      {/* 4. Education */}
      <EducationSection
        educations={educations}
        setEducations={setEducations}
        updateArr={updateArr}
        addItem={addItem}
        removeItem={removeItem}
        liUrl={LI.education}
      />

      {/* 5. Skills */}
      <SkillsSection
        skills={skills}
        setSkills={setSkills}
        skillInput={skillInput}
        setSkillInput={setSkillInput}
        handleSkillKeyDown={handleSkillKeyDown}
        liUrl={LI.skills}
      />

      {/* 6. Projects */}
      <ProjectsSection
        projects={projects}
        setProjects={setProjects}
        updateArr={updateArr}
        addItem={addItem}
        removeItem={removeItem}
        liUrl={LI.projects}
      />

      {/* 7. Certifications */}
      <CertificationsSection
        certifications={certifications}
        setCertifications={setCertifications}
        updateArr={updateArr}
        addItem={addItem}
        removeItem={removeItem}
        liUrl={LI.certifications}
      />

      {/* 8. Languages */}
      <LanguagesSection
        languages={languages}
        setLanguages={setLanguages}
        liUrl={LI.languages}
      />

      {/* Generate Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 px-6 rounded-2xl font-bold text-base bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}
