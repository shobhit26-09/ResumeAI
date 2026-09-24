import type { Report, Status } from "@/lib/ats";

export function ScoreRing({ score, size = 132 }: { score: number; size?: number }) {
  const r = 52, c = 2 * Math.PI * r;
  const tone = score >= 75 ? "good" : score >= 50 ? "mid" : "low";
  return (
    <div className={`scoreRing ring-${tone}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r={r} className="ringTrack" /><circle cx="60" cy="60" r={r} className="ringFill" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} /></svg>
      <div className="ringLabel"><b>{score}</b><span>/ 100</span></div>
    </div>
  );
}

const Icon = ({ s }: { s: Status }) => s === "pass"
  ? <svg className="ci ci-pass" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/><path d="M4.5 8.2l2.3 2.3 4.7-4.9" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
  : s === "warn" ? <svg className="ci ci-warn" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/><path d="M8 4.2v4.6M8 11.3v.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
  : <svg className="ci ci-fail" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/><path d="M5.4 5.4l5.2 5.2M10.6 5.4l-5.2 5.2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round"/></svg>;

export function Verdict({ score }: { score: number }) {
  return <>{score >= 80 ? "Ready to send." : score >= 65 ? "Close. A few fixes will lift it." : score >= 45 ? "Needs work before you apply." : "Likely to be filtered out."}</>;
}

export default function ReportView({ report, compact }: { report: Report; compact?: boolean }) {
  return (
    <div className={`report ${compact ? "reportCompact" : ""}`}>
      <div className="reportTop">
        <ScoreRing score={report.score} size={compact ? 104 : 132} />
        <div className="reportSummary">
          <p className="eyebrow">ATS score</p>
          <h3><Verdict score={report.score} /></h3>
          <div className="bars">{report.categories.map(c => (
            <div className="bar" key={c.id}><span>{c.label}</span><i><em style={{ width: `${c.score}%` }} className={c.score >= 75 ? "good" : c.score >= 50 ? "mid" : "low"} /></i><b>{c.score}</b></div>
          ))}</div>
        </div>
      </div>
      {!compact && <>
        <div className="kwBlock">
          <div className="kwHead"><h4>{report.keywords.mode === "job" ? "Job keywords" : "Skills we recognised"}</h4>{report.keywords.mode === "job" && <span>{report.keywords.found.length} found · {report.keywords.missing.length} missing</span>}</div>
          <div className="chips">{report.keywords.found.map(k => <span className="chip chipOk" key={k}>{k}</span>)}{report.keywords.missing.map(k => <span className="chip chipMiss" key={k}>{k}</span>)}{!report.keywords.found.length && !report.keywords.missing.length && <span className="muted">None detected.</span>}</div>
        </div>
        <div className="checkCols">{report.categories.map(c => (
          <div className="checkGroup" key={c.id}>
            <h4>{c.label}<span>{c.score}</span></h4>
            <ul>{c.checks.map(ch => <li key={ch.id}><Icon s={ch.status} /><div><b>{ch.title}</b><p>{ch.detail}</p></div></li>)}</ul>
          </div>
        ))}</div>
      </>}
    </div>
  );
}
