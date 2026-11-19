import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Nav from "@/components/site/Nav";
import SiteFooter from "@/components/site/SiteFooter";
import ReportView from "@/components/resume/Report";
import { analyze, pdfToText, type Report } from "@/lib/ats";
import { loadResume, resumeToText } from "@/lib/resume";

export default function Analyzer() {
  const [params] = useSearchParams();
  const [text, setText] = useState("");
  const [source, setSource] = useState<string>("");
  const [job, setJob] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const out = useRef<HTMLDivElement>(null);
  const readVersion = useRef(0);

  useEffect(() => () => { readVersion.current++; }, []);
  const replaceText = (value: string, label = "") => {
    readVersion.current++;
    setBusy(false); setError(""); setReport(null); setText(value); setSource(label);
  };

  useEffect(() => { document.title = "ATS check · ResumeAI"; }, []);
  useEffect(() => {
    if (params.get("from") === "builder") { const t = resumeToText(loadResume()); if (t.trim().length > 20) { readVersion.current++; setBusy(false); setReport(null); setError(""); setText(t); setSource("Your resume from the builder"); } }
  }, [params]);

  const readFile = async (f: File) => {
    const version = ++readVersion.current;
    setError(""); setBusy(true); setReport(null); setText(""); setSource("");
    try {
      if (f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")) {
        const t = await pdfToText(f);
        if (t.trim().length < 50) throw new Error("scan");
        if (version === readVersion.current) { setText(t); setSource(f.name); }
      } else if (f.type.startsWith("text/") || f.name.toLowerCase().endsWith(".txt")) { const t = await f.text(); if (version === readVersion.current) { setText(t); setSource(f.name); } }
      else throw new Error("type");
    } catch (e) {
      if (version !== readVersion.current) return;
      setError((e as Error).message === "scan" ? "We couldn't read text from this PDF. It may be a scanned image. This checker does not perform OCR. Export a text PDF from Word, Google Docs or our builder." : (e as Error).message === "type" ? "Upload a PDF or a .txt file, or paste the text below." : "Couldn't open that file. Try another PDF or paste the text.");
    } finally { if (version === readVersion.current) setBusy(false); }
  };

  const run = () => { setReport(analyze(text, job)); setTimeout(() => out.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); };
  const ready = text.trim().length > 50;

  return (
    <div className="app">
      <Nav />
      <main className="page">
        <div className="pageHead"><p className="eyebrow">ATS check</p><h1>See your resume the way a filter does.</h1><p>Upload a PDF and, optionally, paste the job description. You get a score with every point explained. Your file never leaves this browser.</p></div>
        <div className="checkGrid">
          <div className="card">
            <h2 className="cardTitle"><span>1</span>Your resume</h2>
            <div className={`drop ${drag ? "dragging" : ""} ${source ? "loaded" : ""}`} onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) readFile(f); }} onClick={() => input.current?.click()} role="button" tabIndex={0} onKeyDown={e => { if (e.key === "Enter") input.current?.click(); }}>
              <input ref={input} type="file" accept=".pdf,.txt,application/pdf,text/plain" hidden onChange={e => { const f = e.target.files?.[0]; if (f) readFile(f); e.target.value = ""; }} />
              {busy ? <p><b>Reading your file…</b></p> : source ? <><p><b>{source}</b></p><span>{text.split(/\s+/).filter(Boolean).length} words read · click to replace</span></> : <><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0l-4 4m4-4l4 4M5 16v3h14v-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg><p><b>Drop your resume PDF</b> or click to browse</p><span>PDF or .txt</span></>}
            </div>
            {error && <p className="error" role="alert">{error}</p>}
            <details className="paste" open={!!text && !source}><summary>Or paste the text</summary><textarea rows={8} value={text} onChange={e => { replaceText(e.target.value); }} placeholder="Paste your resume text here" /></details>
            <p className="subtle">Built your resume here? <Link to="/analyzer?from=builder" onClick={() => { const t = resumeToText(loadResume()); if (t.trim().length > 20) { readVersion.current++; setBusy(false); setReport(null); setError(""); setText(t); setSource("Your resume from the builder"); } }}>Use it</Link></p>
          </div>
          <div className="card">
            <h2 className="cardTitle"><span>2</span>Job description <em>optional</em></h2>
            <textarea className="jd" rows={11} value={job} onChange={e => { setJob(e.target.value); setReport(null); }} placeholder="Paste the job post to see which of its keywords your resume is missing." />
            <button className="btn btnPrimary btnBlock" disabled={!ready || busy} onClick={run}>{report ? "Run again" : "Check my resume"}</button>
            {!ready && <p className="subtle center">Add your resume to run the check.</p>}
          </div>
        </div>
        <div ref={out}>{report && <div className="card reportCard"><ReportView report={report} /><p className="subtle">Scores come from transparent rules: section headings, contact details, action verbs, numbers in bullets, length and keyword overlap. No resume data is sent anywhere.</p></div>}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
