import { useState, type ReactNode } from "react";
import { emptyEducation, emptyExperience, emptyProject, lines, type Resume } from "@/lib/resume";

type Setter = (fn: (r: Resume) => Resume) => void;

function Field({ label, value, onChange, placeholder, type = "text", wide }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; wide?: boolean }) {
  return <label className={`field ${wide ? "fieldWide" : ""}`}><span>{label}</span><input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} /></label>;
}
function Area({ label, value, onChange, placeholder, hint, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: ReactNode; rows?: number }) {
  return <label className="field fieldWide"><span>{label}</span><textarea rows={rows} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />{hint && <small className="fieldHint">{hint}</small>}</label>;
}

const VERBS = /^(built|shipped|led|reduced|increased|improved|designed|developed|created|launched|rebuilt|added|automated|migrated|optimized|implemented|wrote|delivered|cut|owned|scaled|fixed|introduced|refactored|deployed|integrated|mentored|managed)\b/i;
function BulletHint({ text }: { text: string }) {
  const ls = lines(text);
  if (!ls.length) return <>One result per line. Start with a verb, add a number.</>;
  const n = ls.filter(l => /\d/.test(l)).length, v = ls.filter(l => VERBS.test(l)).length;
  return <><b>{ls.length}</b> bullets · <b className={n ? "ok" : "warn"}>{n}</b> with numbers · <b className={v === ls.length ? "ok" : "warn"}>{v}</b> start with a verb</>;
}

function Panel({ n, title, summary, open, onToggle, children }: { n: number; title: string; summary: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <section className={`panel ${open ? "open" : ""}`}>
      <button className="panelHead" onClick={onToggle} aria-expanded={open}>
        <span className="panelNum">{n}</span>
        <span className="panelTitle">{title}<small>{summary}</small></span>
        <svg className="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && <div className="panelBody">{children}</div>}
    </section>
  );
}

function ItemBar({ label, onRemove, onUp, canRemove, canUp }: { label: string; onRemove: () => void; onUp: () => void; canRemove: boolean; canUp: boolean }) {
  return <div className="itemBar"><span>{label}</span><div>{canUp && <button className="linkBtn" onClick={onUp}>Move up</button>}{canRemove && <button className="linkBtn danger" onClick={onRemove}>Remove</button>}</div></div>;
}

function move<T>(arr: T[], i: number): T[] { const a = [...arr]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a; }

export default function Editor({ resume, set }: { resume: Resume; set: Setter }) {
  const [open, setOpen] = useState<string>("basics");
  const t = (id: string) => setOpen(o => (o === id ? "" : id));
  const b = resume.basics;
  const setB = (k: keyof Resume["basics"]) => (v: string) => set(r => ({ ...r, basics: { ...r.basics, [k]: v } }));
  const upd = <K extends "experience" | "projects" | "education">(key: K, i: number, patch: Partial<Resume[K][number]>) =>
    set(r => ({ ...r, [key]: (r[key] as Resume[K]).map((x, j) => (j === i ? { ...x, ...patch } : x)) }));
  const count = (n: number, w: string) => (n ? `${n} ${w}${n > 1 ? "s" : ""}` : "Not started");

  return (
    <div className="editor">
      <Panel n={1} title="Basics" summary={b.name ? `${b.name}${b.title ? " · " + b.title : ""}` : "Name, contact, summary"} open={open === "basics"} onToggle={() => t("basics")}>
        <div className="grid2">
          <Field label="Full name" value={b.name} onChange={setB("name")} placeholder="Aarav Mehta" />
          <Field label="Headline" value={b.title} onChange={setB("title")} placeholder="Frontend Engineer" />
          <Field label="Email" type="email" value={b.email} onChange={setB("email")} placeholder="you@email.com" />
          <Field label="Phone" value={b.phone} onChange={setB("phone")} placeholder="+91 98765 43210" />
          <Field label="Location" value={b.location} onChange={setB("location")} placeholder="City, Country" />
          <Field label="Links" value={b.links} onChange={setB("links")} placeholder="github.com/you · linkedin.com/in/you" />
        </div>
        <Area label="Summary" rows={3} value={b.summary} onChange={setB("summary")} placeholder="Two lines on who you are and what you build." hint={`${b.summary.split(/\s+/).filter(Boolean).length} words · aim for 25–50`} />
      </Panel>

      <Panel n={2} title="Experience" summary={count(resume.experience.filter(e => e.role || e.company).length, "role")} open={open === "exp"} onToggle={() => t("exp")}>
        {resume.experience.map((e, i) => (
          <div className="item" key={i}>
            <ItemBar label={e.role || e.company || `Role ${i + 1}`} canUp={i > 0} canRemove={resume.experience.length > 1} onUp={() => set(r => ({ ...r, experience: move(r.experience, i) }))} onRemove={() => set(r => ({ ...r, experience: r.experience.filter((_, j) => j !== i) }))} />
            <div className="grid2">
              <Field label="Role" value={e.role} onChange={v => upd("experience", i, { role: v })} placeholder="Software Engineer" />
              <Field label="Company" value={e.company} onChange={v => upd("experience", i, { company: v })} placeholder="Company" />
              <Field label="Start" value={e.start} onChange={v => upd("experience", i, { start: v })} placeholder="Jan 2024" />
              <Field label="End" value={e.end} onChange={v => upd("experience", i, { end: v })} placeholder="Present" />
              <Field label="Location" wide value={e.location} onChange={v => upd("experience", i, { location: v })} placeholder="Remote" />
            </div>
            <Area label="What you did" value={e.bullets} onChange={v => upd("experience", i, { bullets: v })} placeholder={"Built …\nReduced … by 40%"} hint={<BulletHint text={e.bullets} />} />
          </div>
        ))}
        <button className="addBtn" onClick={() => set(r => ({ ...r, experience: [...r.experience, emptyExperience()] }))}>+ Add role</button>
      </Panel>

      <Panel n={3} title="Projects" summary={count(resume.projects.filter(p => p.name).length, "project")} open={open === "proj"} onToggle={() => t("proj")}>
        {resume.projects.map((p, i) => (
          <div className="item" key={i}>
            <ItemBar label={p.name || `Project ${i + 1}`} canUp={i > 0} canRemove={resume.projects.length > 1} onUp={() => set(r => ({ ...r, projects: move(r.projects, i) }))} onRemove={() => set(r => ({ ...r, projects: r.projects.filter((_, j) => j !== i) }))} />
            <div className="grid2">
              <Field label="Name" value={p.name} onChange={v => upd("projects", i, { name: v })} placeholder="Project name" />
              <Field label="Link" value={p.link} onChange={v => upd("projects", i, { link: v })} placeholder="project.dev" />
              <Field label="Tech" wide value={p.tech} onChange={v => upd("projects", i, { tech: v })} placeholder="React, Node.js, PostgreSQL" />
            </div>
            <Area label="Highlights" value={p.bullets} onChange={v => upd("projects", i, { bullets: v })} placeholder={"What it does\nWhat you built and the result"} hint={<BulletHint text={p.bullets} />} />
          </div>
        ))}
        <button className="addBtn" onClick={() => set(r => ({ ...r, projects: [...r.projects, emptyProject()] }))}>+ Add project</button>
      </Panel>

      <Panel n={4} title="Education" summary={count(resume.education.filter(e => e.school).length, "entry")} open={open === "edu"} onToggle={() => t("edu")}>
        {resume.education.map((e, i) => (
          <div className="item" key={i}>
            <ItemBar label={e.school || `Education ${i + 1}`} canUp={i > 0} canRemove={resume.education.length > 1} onUp={() => set(r => ({ ...r, education: move(r.education, i) }))} onRemove={() => set(r => ({ ...r, education: r.education.filter((_, j) => j !== i) }))} />
            <div className="grid2">
              <Field label="Degree" value={e.degree} onChange={v => upd("education", i, { degree: v })} placeholder="B.Tech, Computer Science" />
              <Field label="School" value={e.school} onChange={v => upd("education", i, { school: v })} placeholder="University" />
              <Field label="Start" value={e.start} onChange={v => upd("education", i, { start: v })} placeholder="2021" />
              <Field label="End" value={e.end} onChange={v => upd("education", i, { end: v })} placeholder="2025" />
            </div>
            <Area label="Details (optional)" rows={2} value={e.details} onChange={v => upd("education", i, { details: v })} placeholder="Relevant coursework, honours" />
          </div>
        ))}
        <button className="addBtn" onClick={() => set(r => ({ ...r, education: [...r.education, emptyEducation()] }))}>+ Add education</button>
      </Panel>

      <Panel n={5} title="Skills & certifications" summary={resume.skills ? `${resume.skills.split(",").filter(s => s.trim()).length} skills` : "Not started"} open={open === "skills"} onToggle={() => t("skills")}>
        <Area label="Skills" rows={3} value={resume.skills} onChange={v => set(r => ({ ...r, skills: v }))} placeholder="React, TypeScript, Node.js, SQL, Git" hint="Separate with commas. List what you'd be happy to be interviewed on." />
        <Area label="Certifications (optional)" rows={2} value={resume.certifications} onChange={v => set(r => ({ ...r, certifications: v }))} placeholder="One per line" />
      </Panel>
    </div>
  );
}
