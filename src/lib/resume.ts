import { useEffect, useRef, useState, type SetStateAction } from "react";
import { readStoredResume, RESUME_KEY, TEMPLATE_KEY, validTemplate } from './resume-storage.js';

export type Experience = { role: string; company: string; location: string; start: string; end: string; bullets: string };
export type Education = { school: string; degree: string; start: string; end: string; details: string };
export type Project = { name: string; link: string; tech: string; bullets: string };
export type Resume = {
  basics: { name: string; title: string; email: string; phone: string; location: string; links: string; summary: string };
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: string;
  certifications: string;
};
export type TemplateId = "classic" | "modern" | "compact";

export const emptyExperience = (): Experience => ({ role: "", company: "", location: "", start: "", end: "", bullets: "" });
export const emptyEducation = (): Education => ({ school: "", degree: "", start: "", end: "", details: "" });
export const emptyProject = (): Project => ({ name: "", link: "", tech: "", bullets: "" });

export const emptyResume = (): Resume => ({
  basics: { name: "", title: "", email: "", phone: "", location: "", links: "", summary: "" },
  experience: [emptyExperience()],
  projects: [emptyProject()],
  education: [emptyEducation()],
  skills: "",
  certifications: "",
});

// Clearly fictional sample used for templates and the home page.
export const sampleResume: Resume = {
  basics: {
    name: "Shobhit Gupta",
    title: "Your headline",
    email: "you@example.com",
    phone: "Your phone number",
    location: "City, Country",
    links: "your-website.example · linkedin.com/in/your-name",
    summary: "Add a short summary of your experience, strengths, and goals.",
  },
  experience: [
    { role: "Frontend Engineer", company: "Northwind Labs", location: "Remote", start: "Jan 2024", end: "Present", bullets: "Rebuilt the checkout flow in React and TypeScript, cutting median load time from 3.1s to 1.4s\nIntroduced a shared component library used across 4 product teams\nAdded end-to-end tests for payments, reducing release rollbacks by 60%" },
    { role: "Software Engineering Intern", company: "Blue Harbor", location: "Bengaluru", start: "Jun 2023", end: "Dec 2023", bullets: "Built an internal analytics dashboard with charts for 12 KPIs\nFixed 40+ accessibility issues flagged in an audit" },
  ],
  projects: [
    { name: "Split Ledger", link: "splitledger.example.com", tech: "React, Node.js, PostgreSQL", bullets: "Expense-sharing app with real-time balances and CSV export\nServes 300+ monthly users from a single small instance" },
  ],
  education: [
    { school: "Savitribai Phule Pune University", degree: "B.E. in Computer Engineering", start: "2019", end: "2023", details: "" },
  ],
  skills: "React, TypeScript, JavaScript, Next.js, Node.js, PostgreSQL, Tailwind CSS, Jest, Playwright, Git",
  certifications: "",
};

export const templates: { id: TemplateId; name: string; note: string }[] = [
  { id: "classic", name: "Classic", note: "Serif headings, centered header. Safe for any industry." },
  { id: "modern", name: "Modern", note: "Clean sans-serif with a blue accent. Good for tech roles." },
  { id: "compact", name: "Compact", note: "Tighter spacing to fit more on one page." },
];

export function loadResume(): Resume {
  return readStoredResume({ getItem: key => localStorage.getItem(key) }, emptyResume).resume;
}

export function useStoredResume() {
  const [initial] = useState(() => readStoredResume({ getItem: key => localStorage.getItem(key) }, emptyResume));
  const [resume, setResumeState] = useState<Resume>(initial.resume);
  const touched = useRef(false);
  const setResume = (value: SetStateAction<Resume>) => { touched.current = true; setResumeState(value); };
  const [template, setTemplate] = useState<TemplateId>(() => {
    try { return validTemplate(localStorage.getItem(TEMPLATE_KEY)); } catch { return 'modern'; }
  });
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [saveError, setSaveError] = useState(initial.error);
  const [templateError, setTemplateError] = useState('');
  const lastSaved = useRef(JSON.stringify(initial.resume));
  const lastWriteSucceeded = useRef(!initial.error);
  const latest = useRef(resume);
  latest.current = resume;
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const serialized = JSON.stringify(resume);
    if (!touched.current || (serialized === lastSaved.current && lastWriteSucceeded.current)) { setSaving(false); return; }
    setSaving(true);
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(RESUME_KEY, serialized);
        lastSaved.current = serialized; lastWriteSucceeded.current = true;
        setSavedAt(Date.now()); setSaveError('');
      } catch {
        setSaveError('Changes are not saved on this device. Download a backup before leaving this page.');
      } finally { setSaving(false); }
    }, 400);
    return () => clearTimeout(id);
  }, [resume]);
  useEffect(() => {
    try { localStorage.setItem(TEMPLATE_KEY, template); setTemplateError(''); }
    catch { setTemplateError('Template preference could not be saved. Download a backup to keep it.'); }
  }, [template]);
  useEffect(() => {
    const flush = () => {
      const serialized = JSON.stringify(latest.current);
      if (!touched.current || (serialized === lastSaved.current && lastWriteSucceeded.current)) return true;
      try {
        localStorage.setItem(RESUME_KEY, serialized);
        lastSaved.current = serialized; lastWriteSucceeded.current = true;
        return true;
      } catch { return false; }
    };
    const warn = (event: BeforeUnloadEvent) => {
      if (!flush()) { event.preventDefault(); event.returnValue = ''; }
    };
    window.addEventListener('beforeunload', warn);
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('beforeunload', warn);
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  return { resume, setResume, template, setTemplate, savedAt, saving, saveError: saveError || templateError };
}

export function saveResume(r: Resume) { localStorage.setItem(RESUME_KEY, JSON.stringify(r)); }
export function saveTemplate(t: TemplateId) {
  try { localStorage.setItem(TEMPLATE_KEY, t); } catch { /* The builder exposes storage failure. */ }
}

export const lines = (s: string) => s.split("\n").map(l => l.replace(/^[\s•\-*]+/, "").trim()).filter(Boolean);

export function resumeToText(r: Resume): string {
  const b = r.basics;
  const out: string[] = [b.name, b.title, [b.email, b.phone, b.location, b.links].filter(Boolean).join(" | ")];
  if (b.summary) out.push("", "SUMMARY", b.summary);
  const exp = r.experience.filter(e => e.role || e.company);
  if (exp.length) { out.push("", "EXPERIENCE"); exp.forEach(e => { out.push(`${e.role} - ${e.company} ${e.start} - ${e.end}`); lines(e.bullets).forEach(l => out.push(`• ${l}`)); }); }
  const pr = r.projects.filter(p => p.name);
  if (pr.length) { out.push("", "PROJECTS"); pr.forEach(p => { out.push(`${p.name} ${p.tech}`); lines(p.bullets).forEach(l => out.push(`• ${l}`)); }); }
  const ed = r.education.filter(e => e.school || e.degree);
  if (ed.length) { out.push("", "EDUCATION"); ed.forEach(e => out.push(`${e.degree} - ${e.school} ${e.start} - ${e.end} ${e.details}`)); }
  if (r.skills) out.push("", "SKILLS", r.skills);
  if (r.certifications) out.push("", "CERTIFICATIONS", r.certifications);
  return out.join("\n");
}
