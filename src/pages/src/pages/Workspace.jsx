import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, FileText, ShieldCheck, Download, Target } from 'lucide-react';
import Nav from '@/components/site/Nav';
import SiteFooter from '@/components/site/SiteFooter';
import { emptyResume, resumeToText } from '@/lib/resume';
import { readStoredResume, TEMPLATE_KEY, validTemplate } from '@/lib/resume-storage.js';
import { draftChecklist, hasDraftContent } from '@/lib/workspace.js';
import { analyze } from '@/lib/ats';
import { ResumePaper } from '@/components/resume/ResumePaper';

export default function Workspace() {
  const [stored] = useState(() => readStoredResume({ getItem: key => localStorage.getItem(key) }, emptyResume));
  const [template] = useState(() => { try { return validTemplate(localStorage.getItem(TEMPLATE_KEY)); } catch { return 'modern'; } });
  const resume = stored.resume;
  const started = hasDraftContent(resume);
  const checks = draftChecklist(resume);
  const done = checks.filter(item => item.done).length;
  const text = resumeToText(resume);
  const report = text.trim().length > 50 && started ? analyze(text) : null;
  useEffect(() => { document.title = 'Your workspace · ResumeAI'; }, []);
  return <div className="app workspacePage"><Nav /><main className="workspaceMain">
    <header className="workspaceHeading"><div><p className="eyebrow">YOUR WORKSPACE</p><h1>A clearer path to your next application.</h1><p>Write your story. Check it against the role. Leave with a resume you can explain.</p></div><span className="workspacePrivacy"><ShieldCheck size={16} /> Stored in this browser</span></header>
    {stored.error && <p role="alert" className="saveWarning">{stored.error}</p>}
    <div className="workspaceGrid"><section className="draftCard" aria-labelledby="draft-title">
      <div className="draftContent"><p className="workspaceKicker"><FileText size={16} /> YOUR RESUME</p><h2 id="draft-title">{started ? resume.basics.name || 'Untitled resume' : 'Start with your story.'}</h2><p>{started ? resume.basics.title || 'Add a headline that fits the role you want.' : 'No blank-page pressure. Add your details, experience or projects, and watch the page take shape.'}</p><div className="draftProgress"><span>{done} of {checks.length} draft sections started</span><span>Not a readiness score</span></div><div className="workspaceTrack" role="progressbar" aria-label="Draft sections started" aria-valuenow={done} aria-valuemin={0} aria-valuemax={checks.length}><i style={{ width: `${done / checks.length * 100}%` }} /></div><Link to="/builder" className="btn btnPrimary">{started ? 'Continue editing' : 'Create your resume'}<ArrowRight size={17} /></Link><p className="draftNote">No account or subscription. Keep a downloaded backup before switching devices.</p></div>
      <div className="workspacePaper" aria-hidden="true">{started ? <div className="workspacePaperScale"><ResumePaper data={resume} template={template} /></div> : <div className="blankPaper"><span>Your name</span><i/><i/><b>EXPERIENCE & PROJECTS</b><i/><i/><i/><b>SKILLS</b><i/></div>}</div>
    </section><aside className="workspaceReview"><p className="workspaceKicker">A USEFUL NEXT STEP</p><h2>{done === checks.length ? 'Bring a real job description.' : checks.find(item => !item.done)?.title}</h2><p>{done === checks.length ? 'Check the keywords and requirements for the role. A complete-looking resume still needs a human review.' : 'Small, specific details beat a page of claims. These checkpoints help you build a first draft.'}</p><ul>{checks.map(item => <li key={item.id}><span className={item.done ? 'checkpoint done' : 'checkpoint'}>{item.done ? <Check size={13} /> : ''}</span><div><b>{item.title}</b><small>{item.detail}</small></div></li>)}</ul><Link to={started ? '/analyzer?from=builder' : '/builder'}>{started ? 'Review this draft' : 'Start the first section'} <ArrowRight size={15}/></Link></aside></div>
    <section className="workspaceSteps" aria-labelledby="workflow-title"><div className="workspaceSectionTitle"><h2 id="workflow-title">From first draft to final PDF.</h2><p>One connected workflow, with you in control.</p></div><div className="workflowCards"><Link to="/builder"><span>01 <FileText size={18}/></span><h3>Write and shape</h3><p>Build your resume with a live page preview, three layouts and private backup controls.</p><b>Open the builder <ArrowRight size={15}/></b></Link><Link to={started ? '/analyzer?from=builder' : '/analyzer'}><span>02 <Target size={18}/></span><h3>Check the fit</h3><p>Bring the job description. See explained structure checks and keyword overlap, not a promise of interviews.</p><b>Check your resume <ArrowRight size={15}/></b></Link><Link to="/builder"><span>03 <Download size={18}/></span><h3>Review and export</h3><p>Check the details and page breaks, then use Download PDF in the builder. Keep a backup for later edits.</p><b>Review the final page <ArrowRight size={15}/></b></Link></div></section>
    <section className="workspaceDisclosure"><ShieldCheck size={20}/><div><h2>Your words stay yours.</h2><p>This app works on this device. Backups contain your personal details and are not encrypted. Scores are transparent writing checks, not a prediction of how an employer will rank you.{report ? ` Your current draft's rule-based structure score is ${report.score}/100; open the check to see the reasons.` : ''}</p></div></section>
  </main><SiteFooter/></div>;
}
