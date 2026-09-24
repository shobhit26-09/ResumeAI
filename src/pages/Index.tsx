import { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "@/components/site/Nav";
import SiteFooter from "@/components/site/SiteFooter";
import { ResumePaper } from "@/components/resume/ResumePaper";
import ReportView from "@/components/resume/Report";
import { sampleResume, resumeToText } from "@/lib/resume";
import { analyze } from "@/lib/ats";

export default function Index() {
  useEffect(() => { document.title = "ResumeAI · Free resume builder and ATS check"; }, []);
  const report = analyze(resumeToText(sampleResume));
  return (
    <div className="app">
      <Nav />
      <main>
        <section className="hero">
          <div className="heroCopy">
            <p className="eyebrow">Free · No sign-up · Private</p>
            <h1>A resume that gets past the filter.</h1>
            <p className="lead">Write it with live guidance, pick a clean template, and download a text-based PDF that applicant tracking systems can read. Then check it against the job you want.</p>
            <div className="heroCtas"><Link to="/builder" className="btn btnPrimary">Start building</Link><Link to="/analyzer" className="btn btnGhost">Check an existing resume</Link></div>
            <ul className="heroFacts"><li>Autosaves in your browser</li><li>Real text PDF, not an image</li><li>Your data never leaves your device</li></ul>
          </div>
          <div className="heroVisual" aria-hidden="true">
            <div className="heroPaper"><ResumePaper data={sampleResume} template="modern" /></div>
            <div className="heroScore card"><ReportView report={report} compact /></div>
          </div>
        </section>

        <section className="band">
          <div className="steps">
            <div><span>01</span><h3>Write</h3><p>Fill in simple sections. Each bullet list shows how many lines start with a verb and include a number, the two things recruiters scan for.</p></div>
            <div><span>02</span><h3>Choose a look</h3><p>Three single-column templates built for ATS parsing: Classic, Modern and Compact. Switch anytime without losing work.</p></div>
            <div><span>03</span><h3>Check and export</h3><p>Score the resume against a job post, fix what's missing, then download a PDF with selectable text.</p></div>
          </div>
        </section>

        <section className="split">
          <div>
            <p className="eyebrow">ATS check</p>
            <h2>Every point in the score is explained.</h2>
            <p>No black box. The check looks at structure, contact details, action verbs, quantified results, length and keyword overlap with the job description, and tells you exactly what to change.</p>
            <Link to="/analyzer" className="textLink">Run a check →</Link>
          </div>
          <div className="card miniChecks">
            {report.categories.flatMap(c => c.checks).slice(0, 5).map(ch => (
              <div key={ch.id} className={`miniCheck s-${ch.status}`}><i /><div><b>{ch.title}</b><p>{ch.detail}</p></div></div>
            ))}
          </div>
        </section>

        <section className="cta">
          <h2>Start with a blank page or a sample.</h2>
          <p>It takes about ten minutes to get a first version you can send.</p>
          <Link to="/builder" className="btn btnPrimary">Open the builder</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
