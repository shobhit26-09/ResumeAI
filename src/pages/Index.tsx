import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, CloudOff, Download, Eye, FileSearch, Gauge, PenLine, Save, Sparkles, Target, X } from "lucide-react";
import Nav from "@/components/site/Nav";
import SiteFooter from "@/components/site/SiteFooter";
import CountUp from "@/components/site/CountUp";
import { ResumePaper } from "@/components/resume/ResumePaper";
import { ScoreRing } from "@/components/resume/Report";
import { sampleResume, saveTemplate, templates, type TemplateId } from "@/lib/resume";
import { useReveal } from "@/lib/useReveal";

const ats = [
  { n: "Greenhouse", f: "greenhouse.svg" }, { n: "Lever", f: "lever.png" }, { n: "Workday", f: "workday.svg" }, { n: "Ashby", f: "ashby.svg" },
];

// Real quotes only. Add entries once people share them; the section stays hidden while empty.
type Review = { quote: string; name: string; role: string };
const reviews: Review[] = [];

const features = [
  { icon: Eye, tone: "blue", t: "Live A4 preview", d: "See the real page update as you type, side by side with the editor." },
  { icon: Save, tone: "teal", t: "Autosave", d: "Every change is saved in your browser. Close the tab and pick up later." },
  { icon: Download, tone: "amber", t: "Text-based PDF", d: "Selectable text that applicant tracking systems can actually parse." },
  { icon: Gauge, tone: "green", t: "ATS score", d: "A 0-100 score across structure, impact, keywords and readability." },
  { icon: Target, tone: "rose", t: "Job keyword match", d: "Paste a job post and see which of its keywords you're missing." },
  { icon: PenLine, tone: "sky", t: "Bullet coach", d: "Counts lines that open with a verb and include a number as you write." },
];

const fixes = [
  { flag: "Weak phrase", before: "Responsible for the company website.", after: "Rebuilt the company website in React, cutting load time by 40%." },
  { flag: "No number", before: "Improved the onboarding flow for new users.", after: "Redesigned onboarding, lifting week-one activation from 22% to 31%." },
  { flag: "No action verb", before: "Worked on internal tools with the ops team.", after: "Shipped 3 internal tools that saved the ops team 6 hours a week." },
];

const tours = [
  { id: "builder", label: "Resume builder", url: "/builder", img: "/shots/builder.webp", t: "Write it with a live preview", d: "Simple sections on the left, the real page on the right. Autosaves as you type, and switches template without losing a word." },
  { id: "check", label: "ATS check", url: "/analyzer", img: "/shots/report.webp", t: "Score it against the job", d: "Upload a PDF, paste the job post, and get a score with every point explained, plus the keywords you're missing." },
  { id: "templates", label: "Templates", url: "/templates", img: "/shots/templates.webp", t: "Pick a clean, ATS-safe layout", d: "Classic, Modern and Compact. Single column, standard headings, real text." },
];

const tints = ["tintBlue", "tintTeal", "tintAmber"];

export default function Index() {
  useEffect(() => { document.title = "ResumeAI · Free resume builder and ATS check"; }, []);
  useReveal();
  const nav = useNavigate();
  const [pick, setPick] = useState<TemplateId>("modern");
  const [tour, setTour] = useState(0);
  const use = (id: TemplateId) => { saveTemplate(id); nav("/builder"); };

  return (
    <div className="app home">
      <Nav />
      <main>
        <section className="hero2">
          <div className="glow g1" /><div className="glow g2" /><div className="glow g3" />
          <div className="hero2Inner">
            <div className="hero2Copy reveal">
              <span className="pill"><Sparkles size={14} /> Free · No sign-up · Private</span>
              <h1>Land more interviews with a resume that <span className="grad">gets past the filter.</span></h1>
              <p className="lead">Write with live guidance, pick a clean template, and download a PDF that applicant tracking systems can read. Then check it against the job you want.</p>
              <div className="heroCtas"><Link to="/builder" className="btn btnPrimary btnLg">Build your resume <ArrowRight size={18} /></Link><Link to="/analyzer" className="btn btnGhost btnLg">Get your ATS score</Link></div>
              <ul className="ticks"><li><Check size={16} />Autosaves in your browser</li><li><Check size={16} />Real text PDF</li><li><Check size={16} />Nothing leaves your device</li></ul>
            </div>
            <div className="collage reveal">
              <div className="cBack"><ResumePaper data={sampleResume} template="classic" /></div>
              <div className="cFront"><ResumePaper data={sampleResume} template={pick} /></div>
              <div className="cPicker card">
                <b>Template</b>
                <div className="cOpts">{templates.map(t => <button key={t.id} className={pick === t.id ? "on" : ""} onClick={() => setPick(t.id)}><span className={`sw sw-${t.id}`} />{t.name}</button>)}</div>
              </div>
              <div className="cScore card"><ScoreRing score={90} size={64} /><div><b>ATS score</b><span>Ready to send</span></div></div>
              <div className="floatChip"><Save size={14} /> Saved on this device</div>
            </div>
          </div>
        </section>

        <section className="atsStrip reveal">
          <p>Made to parse cleanly in the systems recruiters use</p>
          <div className="logos">{ats.map(a => <img key={a.n} src={`/logos/${a.f}`} alt={a.n} title={a.n} className={`lg-${a.n.toLowerCase()}`} />)}</div>
        </section>

        <section className="tplSec">
          <div className="secHead center reveal"><h2>Pick a template and build your resume in minutes.</h2></div>
          <div className="tplRow">{templates.map((t, i) => (
            <button key={t.id} className={`tplCard ${tints[i]} reveal`} style={{ transitionDelay: `${i * 80}ms` }} onClick={() => use(t.id)}>
              <div className="tplCardPaper"><ResumePaper data={sampleResume} template={t.id} /></div>
              <div className="tplCardMeta"><h3>{t.name}</h3><p>{t.note}</p><span className="useLink">Use this template <ArrowRight size={15} /></span></div>
            </button>
          ))}</div>
        </section>

        <section className="statsSec">
          <div className="statTiles reveal">
            <div className="tile1"><b><CountUp to={16} /></b><span>checks, each explained</span></div>
            <div className="tile2"><b><CountUp to={75} suffix="+" /></b><span>skills recognised</span></div>
            <div className="tile3"><b><CountUp to={0} /></b><span>sign-ups needed</span></div>
            <div className="tile4"><b><CountUp to={100} suffix="%" /></b><span>runs in your browser</span></div>
          </div>
          <div className="statCopy reveal">
            <p className="eyebrow">Why ResumeAI</p>
            <h2>Built for the filter. Written for the <span className="grad">human.</span></h2>
            <p>Most resumes are read by software before a person ever sees them. ResumeAI gives you layouts that software can parse and guidance that makes each line worth reading: verbs up front, numbers that prove impact, and the keywords the job actually asks for.</p>
            <p>No account and no upload. Your resume lives in your browser, and the PDF you download is real text, not a picture of text.</p>
          </div>
        </section>

        <section className="dark">
          <div className="darkInner">
            <div className="darkCopy reveal">
              <p className="eyebrow">ATS check</p>
              <h2>Resumes optimised for applicant tracking systems.</h2>
              <p>Drop in a PDF, paste the job description, and get a score where every point is explained. No black box, and your file never leaves the browser.</p>
              <ul className="darkList"><li><FileSearch size={18} />Reads the text in your PDF, and warns you if it's a scanned image</li><li><Target size={18} />Shows found and missing keywords from the job post</li><li><CloudOff size={18} />Runs on your device, with no server involved</li></ul>
              <Link to="/analyzer" className="btn btnLight btnLg">Get your free score <ArrowRight size={18} /></Link>
            </div>
            <div className="darkCard reveal">
              <div className="browser"><div className="bBar"><i /><i /><i /><span>ATS check</span></div><img src="/shots/report.webp" alt="ATS check report with score, keywords and explained checks" /></div>
              <div className="phone darkPhone"><img src="/shots/mobile.webp" alt="" /></div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="secHead reveal"><p className="eyebrow">Everything you need</p><h2>From blank page to a resume you can send.</h2></div>
          <div className="featGrid">{features.map((f, i) => (
            <div className="feat reveal" key={f.t} style={{ transitionDelay: `${(i % 3) * 70}ms` }}><span className={`tile t-${f.tone}`}><f.icon size={20} /></span><h3>{f.t}</h3><p>{f.d}</p></div>
          ))}</div>
        </section>

        <section className="sec fixesSec">
          <div className="fixBlob" aria-hidden="true" />
          <div className="secHead reveal"><p className="eyebrow">What the check catches</p><h2>Small rewrites, big difference.</h2><p>Examples of what the ATS check flags in a bullet, and the kind of rewrite it points you toward.</p></div>
          <div className="fixGrid">{fixes.map((f, i) => (
            <figure className="fix reveal" key={f.flag} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="flag">{f.flag}</span>
              <p className="before"><X size={15} />{f.before}</p>
              <p className="after"><Check size={15} />{f.after}</p>
            </figure>
          ))}</div>
        </section>

        {reviews.length > 0 && (
          <section className="sec">
            <div className="secHead reveal"><p className="eyebrow">From people who used it</p><h2>What users say.</h2></div>
            <div className="fixGrid">{reviews.map(r => <figure className="fix reveal" key={r.name}><blockquote>"{r.quote}"</blockquote><figcaption><b>{r.name}</b> · {r.role}</figcaption></figure>)}</div>
          </section>
        )}

        <section className="tour">
          <div className="tourInner">
            <div className="secHead center reveal"><h2>One place for your whole resume.</h2><p>Build it, check it, and pick the look, all without an account.</p></div>
            <div className="tourTabs reveal" role="tablist">{tours.map((t, i) => <button key={t.id} role="tab" aria-selected={tour === i} className={tour === i ? "on" : ""} onClick={() => setTour(i)}>{t.label}</button>)}</div>
            <div className="tourBody reveal">
              <div className="tourCopy"><h3>{tours[tour].t}</h3><p>{tours[tour].d}</p><Link to={tours[tour].url} className="textLink light">Open {tours[tour].label.toLowerCase()} <ArrowRight size={15} /></Link></div>
              <div className="browser tourShot"><div className="bBar"><i /><i /><i /><span>{tours[tour].label}</span></div><img key={tours[tour].img} src={tours[tour].img} alt={tours[tour].label} /></div>
            </div>
          </div>
        </section>

        <section className="ctaBand reveal">
          <div className="ctaInner"><h2>Your next interview starts with one page.</h2><p>Free, no sign-up, and it stays on your device.</p><Link to="/builder" className="btn btnLight btnLg">Build your resume <ArrowRight size={18} /></Link></div>
          <div className="ctaPaper" aria-hidden="true"><ResumePaper data={sampleResume} template="modern" /></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
