import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "@/components/site/Nav";
import Editor from "@/components/resume/Editor";
import { ResumePaper } from "@/components/resume/ResumePaper";
import { emptyResume, resumeToText, templates, useStoredResume } from "@/lib/resume";
import { analyze } from "@/lib/ats";

export default function Builder() {
  const { resume, setResume, template, setTemplate, savedAt } = useStoredResume();
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [scale, setScale] = useState(1);
  const stage = useRef<HTMLDivElement>(null);
  const nav = useNavigate();
  const score = analyze(resumeToText(resume)).score;
  const hasContent = !!(resume.basics.name || resume.experience.some(e => e.role));

  useEffect(() => {
    const el = stage.current; if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, (el.clientWidth - 2) / 794)));
    ro.observe(el); return () => ro.disconnect();
  }, [tab]);
  useEffect(() => { document.title = "Builder · ResumeAI"; }, []);

  const download = () => {
    const prev = document.title;
    document.title = (resume.basics.name || "resume").replace(/\s+/g, "_") + "_Resume";
    window.print();
    setTimeout(() => { document.title = prev; }, 500);
  };

  return (
    <div className="app builderPage">
      <Nav />
      <div className="toolbar">
        <div className="toolbarInner">
          <div className="seg" role="tablist" aria-label="Template">{templates.map(t => <button key={t.id} role="tab" aria-selected={template === t.id} className={template === t.id ? "on" : ""} onClick={() => setTemplate(t.id)}>{t.name}</button>)}</div>
          <div className="mobileTabs seg"><button className={tab === "edit" ? "on" : ""} onClick={() => setTab("edit")}>Edit</button><button className={tab === "preview" ? "on" : ""} onClick={() => setTab("preview")}>Preview</button></div>
          <div className="toolbarRight">
            <span className="saved">{savedAt ? "Saved on this device" : ""}</span>
            {hasContent && <button className="scorePill" onClick={() => nav("/analyzer?from=builder")} title="Open full ATS check"><i className={score >= 75 ? "good" : score >= 50 ? "mid" : "low"} />ATS {score}</button>}
            <button className="btn btnPrimary btnSm" onClick={download}>Download<span className="dlLong">&nbsp;PDF</span></button>
          </div>
        </div>
      </div>
      <main className="builder">
        <div className={`builderEdit ${tab === "edit" ? "" : "hideMobile"}`}>
          <div className="editIntro"><h1>Your resume</h1><p>Changes save automatically on this device. No account needed.</p>
            {!hasContent && <button className="linkBtn" onClick={() => { import("@/lib/resume").then(m => setResume(JSON.parse(JSON.stringify(m.sampleResume)))); }}>Fill with a sample to see how it works</button>}
            {hasContent && <button className="linkBtn danger" onClick={() => { if (confirm("Clear everything and start over?")) setResume(emptyResume()); }}>Start over</button>}
          </div>
          <Editor resume={resume} set={fn => setResume(fn)} />
          <p className="editFoot">Want feedback? <Link to="/analyzer?from=builder">Run the full ATS check</Link></p>
        </div>
        <div className={`builderPreview ${tab === "preview" ? "" : "hideMobile"}`}>
          <div className="stage" ref={stage}>
            <div className="paperScale" style={{ zoom: scale }}>
              <ResumePaper data={resume} template={template} placeholder />
            </div>
          </div>
        </div>
      </main>
      <div className="printOnly"><ResumePaper data={resume} template={template} /></div>
    </div>
  );
}
