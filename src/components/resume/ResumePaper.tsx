import { forwardRef } from "react";
import { lines, type Resume, type TemplateId } from "@/lib/resume";

const range = (a: string, b: string) => [a, b].filter(Boolean).join(" – ");

export const ResumePaper = forwardRef<HTMLDivElement, { data: Resume; template: TemplateId; placeholder?: boolean }>(function ResumePaper({ data, template, placeholder }, ref) {
  const b = data.basics;
  const exp = data.experience.filter(e => e.role || e.company || e.bullets);
  const proj = data.projects.filter(p => p.name || p.bullets);
  const edu = data.education.filter(e => e.school || e.degree);
  const skills = data.skills.split(",").map(s => s.trim()).filter(Boolean);
  const contact = [b.email, b.phone, b.location, ...b.links.split("·").map(s => s.trim())].filter(Boolean);
  const empty = !b.name && !exp.length && !edu.length && !skills.length;
  return (
    <div ref={ref} className={`paper paper-${template}`}>
      {empty && placeholder ? (
        <div className="paperEmpty"><p>Your resume appears here as you type.</p><span>Start with your name on the left.</span></div>
      ) : (
        <>
          <header className="pHead">
            <h1>{b.name || "Your Name"}</h1>
            {b.title && <p className="pTitle">{b.title}</p>}
            {contact.length > 0 && <p className="pContact">{contact.map((c, i) => <span key={i}>{c}</span>)}</p>}
          </header>
          {b.summary && <section><h2>Summary</h2><p className="pText">{b.summary}</p></section>}
          {exp.length > 0 && <section><h2>Experience</h2>{exp.map((e, i) => (
            <div className="pItem" key={i}>
              <div className="pRow"><p><b>{e.role}</b>{e.company && <>{e.role ? ", " : ""}{e.company}</>}{e.location && <span className="pMuted"> · {e.location}</span>}</p><span className="pDate">{range(e.start, e.end)}</span></div>
              {lines(e.bullets).length > 0 && <ul>{lines(e.bullets).map((l, j) => <li key={j}>{l}</li>)}</ul>}
            </div>))}</section>}
          {proj.length > 0 && <section><h2>Projects</h2>{proj.map((p, i) => (
            <div className="pItem" key={i}>
              <div className="pRow"><p><b>{p.name}</b>{p.tech && <span className="pMuted"> · {p.tech}</span>}</p>{p.link && <span className="pDate">{p.link}</span>}</div>
              {lines(p.bullets).length > 0 && <ul>{lines(p.bullets).map((l, j) => <li key={j}>{l}</li>)}</ul>}
            </div>))}</section>}
          {edu.length > 0 && <section><h2>Education</h2>{edu.map((e, i) => (
            <div className="pItem" key={i}>
              <div className="pRow"><p><b>{e.degree}</b>{e.school && <>{e.degree ? ", " : ""}{e.school}</>}</p><span className="pDate">{range(e.start, e.end)}</span></div>
              {e.details && <p className="pText">{e.details}</p>}
            </div>))}</section>}
          {skills.length > 0 && <section><h2>Skills</h2><p className="pText">{skills.join(" · ")}</p></section>}
          {data.certifications && <section><h2>Certifications</h2><ul>{lines(data.certifications).map((l, j) => <li key={j}>{l}</li>)}</ul></section>}
        </>
      )}
    </div>
  );
});
