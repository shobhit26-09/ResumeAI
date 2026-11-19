import { useMemo, useState } from 'react';
import { ArrowDownToLine, FileSearch, Check, Search } from 'lucide-react';
import { jobEvidence, evidencePlan } from '@/lib/job-evidence.js';

export default function JobEvidence({ text, job, terms }) {
  const rows = useMemo(() => jobEvidence(text, job, terms), [text, job, terms]);
  const [expanded, setExpanded] = useState(false), [error, setError] = useState('');
  if (!rows.length) return null;
  const found = rows.filter(row => row.state === 'mentioned').length;
  function download() {
    try {
      const url = URL.createObjectURL(new Blob([evidencePlan(rows)], { type: 'text/markdown;charset=utf-8' }));
      const a = document.createElement('a'); a.href = url; a.download = 'ResumeAI-job-evidence.md'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); setError('');
    } catch { setError('The review could not be downloaded. Your resume has not changed.'); }
  }
  return <section className="evidenceReview" aria-labelledby="evidence-title"><header><div><p className="eyebrow"><FileSearch size={15}/> JOB EVIDENCE REVIEW</p><h2 id="evidence-title">Go beyond a keyword count.</h2><p>See the job's wording beside your own. A text match is a starting point, not proof that you meet a requirement.</p></div><button className="btn btnGhost btnSm" onClick={download}><ArrowDownToLine size={15}/> Download review</button></header>
    <p className="evidenceSummary">{found} of {rows.length} terms have a matching mention without an obvious negative qualifier. This is not an eligibility or hiring score.</p>
    <div className="evidenceRows">{(expanded ? rows : rows.slice(0, 6)).map(row => <article key={row.term} className={`evidenceRow evidence-${row.state}`}><div className="evidenceRowTitle"><h3>{row.term}</h3><span>{row.state === 'mentioned' ? <Check size={13}/> : <Search size={13}/>} {row.state === 'mentioned' ? 'Mention found, verify the example' : row.state === 'review' ? 'Review surrounding wording' : 'No exact wording match'}</span></div><p className="evidenceContext">{row.context}</p><div className="evidenceQuotes"><div><b>IN THE JOB POST</b><blockquote>{row.jobQuote}</blockquote></div><div><b>IN YOUR RESUME</b>{row.resumeQuote ? <blockquote>{row.resumeQuote}</blockquote> : <p>No exact match in the text you supplied. This does not prove you lack the skill.</p>}</div></div><p className="evidenceNext">{row.state === 'not-found' ? 'If you have a real example, make it clear. If not, leave the claim out and treat it as a gap.' : row.state === 'review' ? 'Read the qualifier carefully. This mention may say you do not have the experience.' : 'Could you explain a specific task or result behind this mention? Keep the wording honest.'}</p></article>)}</div>
    {rows.length > 6 && <button className="btn btnGhost btnSm evidenceMore" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Show fewer terms' : `Review all ${rows.length} terms`}</button>}
    <p className="evidencePrivacy">Nothing here rewrites your resume. This review stays in this browser; the download includes resume excerpts and job wording. Keep it private. Only terms recognized by this checker are compared, and required/preferred labels are simple wording hints.</p>{error && <p className="error" role="alert">{error}</p>}
  </section>;
}
