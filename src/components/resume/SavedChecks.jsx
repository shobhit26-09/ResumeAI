import { useEffect, useRef, useState } from 'react';
import { Download, FolderOpen, Save, Trash2 } from 'lucide-react';
import { CHECKS_KEY, MAX_CHECK_BYTES, readChecks, saveCheck, deleteCheck, replaceChecks, encodeChecks, parseChecks } from '@/lib/saved-checks.js';
import './saved-checks.css';

const storage = { getItem: key => localStorage.getItem(key), setItem: (key, value) => localStorage.setItem(key, value) };
const date = value => new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
export default function SavedChecks({ text, job, busy, onOpen }) {
  const [rows, setRows] = useState([]), [label, setLabel] = useState(''), [error, setError] = useState(''), [notice, setNotice] = useState(''), [pending, setPending] = useState(null), [reading, setReading] = useState(false);
  const fileVersion = useRef(0), confirmation = useRef(null);
  useEffect(() => { if (pending) { confirmation.current?.focus({ preventScroll: true }); confirmation.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } }, [pending]);
  const refresh = () => { try { setRows(readChecks(storage).checks); setError(''); } catch { setError('Saved checks could not be loaded. They have not been overwritten. You can restore a valid backup below.'); } };
  useEffect(() => {
    refresh();
    const changed = event => { if (event.key === CHECKS_KEY || event.key === null) { refresh(); setNotice('The saved-check list changed in another tab. Your open text has not changed.'); } };
    window.addEventListener('storage', changed);
    return () => { fileVersion.current++; window.removeEventListener('storage', changed); };
  }, []);
  const act = fn => { try { fn(); setError(''); } catch (err) { setError(err?.name === 'QuotaExceededError' ? 'Browser storage is full. Nothing was saved. Download a backup or free space before trying again.' : err?.name === 'SecurityError' ? 'Browser storage is unavailable. Your open text still works, but checks cannot be saved here.' : err.message || 'Could not save. Your open text has not changed.'); } };
  const save = () => act(() => {
    const next = saveCheck(storage, { id: crypto.randomUUID(), savedAt: new Date().toISOString(), label: label.trim() || 'Untitled check', resume: text, job });
    setRows(next); setNotice('Saved a separate snapshot. Later edits do not change it.'); setLabel('');
  });
  const download = () => act(() => {
    const current = readChecks(storage).checks;
    if (!current.length) throw new Error('There are no saved checks to download.');
    const url = URL.createObjectURL(new Blob([encodeChecks(current)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'resumeai-saved-checks.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Backup downloaded. It contains personal resume and job text and is not encrypted.');
  });
  const importFile = async file => {
    const version = ++fileVersion.current;
    setReading(true); setPending(null); setNotice(''); setError('');
    try {
      if (file.size > MAX_CHECK_BYTES) throw new Error('Choose a saved-checks backup no larger than 2 MB.');
      const next = parseChecks(await file.text());
      if (version === fileVersion.current) setPending({ type: 'restore', checks: next, expectedRaw: storage.getItem(CHECKS_KEY) });
    } catch (err) { if (version === fileVersion.current) setError(err.message || 'Could not open the backup. Nothing was replaced.'); }
    finally { if (version === fileVersion.current) setReading(false); }
  };
  const confirm = () => act(() => {
    if (pending.type === 'open') { onOpen(pending.row.resume, pending.row.job); setNotice(`Opened ${pending.row.label}. Run the check to calculate a fresh review. Your builder resume was not changed.`); }
    else if (pending.type === 'delete') { setRows(deleteCheck(storage, pending.row.id)); setNotice('Saved snapshot removed. Your open text was not changed.'); }
    else { setRows(replaceChecks(storage, pending.checks, pending.expectedRaw)); setNotice('Saved checks restored. Your open text and builder resume were not changed.'); }
    setPending(null);
  });
  return <section className="card savedChecks" aria-labelledby="saved-checks-title">
    <div className="savedChecksHead"><div><p className="eyebrow">PRIVATE ROLE SNAPSHOTS</p><h2 id="saved-checks-title">Pick up where you left off.</h2><p>Save the exact resume text and job post together. Return after editing to compare the wording yourself. Up to eight snapshots, stored only in this browser.</p></div><FolderOpen size={24} aria-hidden="true" /></div>
    <div className="savedChecksSave"><label htmlFor="check-label">Name this snapshot <span>optional</span><input id="check-label" maxLength={80} value={label} onChange={e => setLabel(e.target.value)} placeholder="Frontend role · first draft" /></label><button className="btn btnPrimary" onClick={save} disabled={busy || text.trim().length <= 50 || reading}><Save size={16}/>Save this check</button></div>
    <p className="subtle">Saving keeps personal resume and job text on this device. Nothing is saved here automatically. A snapshot does not update the builder or submit an application.</p>
    {error && <p role="alert" className="error">{error}</p>}{notice && <p role="status" className="savedChecksNotice">{notice}</p>}
    <ul className="savedChecksList">{rows.map(row => <li key={row.id}><div><b>{row.label}</b><small>{date(row.savedAt)} · {row.job.trim() ? 'With job description' : 'Resume only'}</small></div><div className="savedChecksActions"><button className="btn btnGhost" disabled={busy || reading} onClick={() => { setPending({ type: 'open', row }); setNotice(''); }}>Open<span className="sr-only"> {row.label}</span></button><button className="btn btnGhost" disabled={reading} aria-label={`Remove ${row.label}`} onClick={() => { setPending({ type: 'delete', row }); setNotice(''); }}><Trash2 size={16}/></button></div></li>)}</ul>
    {!rows.length && !error && <p className="subtle">No snapshots saved yet. Add your resume above, then save a check.</p>}
    <div className="savedChecksBackup"><button className="btn btnGhost" disabled={!rows.length || reading} onClick={download}><Download size={16}/>Download saved checks</button><label className="btn btnGhost savedChecksFile">{reading ? 'Reading backup…' : 'Restore saved checks'}<input type="file" accept=".json,application/json" aria-label="Restore saved checks" disabled={reading} onChange={e => { const file = e.target.files?.[0]; if (file) importFile(file); e.target.value = ''; }}/></label></div>
    <p className="subtle">Downloaded backups are not encrypted. Keep them private. Clearing browser data removes saved checks. Builder backups are separate.</p>
    {pending && <div className="savedChecksConfirm" ref={confirmation} tabIndex={-1} role="group" aria-label="Review snapshot action"><h3>{pending.type === 'open' ? `Open ${pending.row.label}?` : pending.type === 'delete' ? `Remove ${pending.row.label}?` : `Restore ${pending.checks.length} saved ${pending.checks.length === 1 ? 'check' : 'checks'}?`}</h3><p>{pending.type === 'open' ? 'This replaces the resume and job text currently open in the checker. Unsaved text will be lost. It does not change the builder.' : pending.type === 'delete' ? 'This removes only this saved snapshot. Keep a downloaded backup if you might need it again.' : `This replaces the entire saved-check list with ${pending.checks.length} snapshots. It does not change your open text or builder resume. Download the current list first if you need it.`}</p>{pending.type === 'restore' && <ul>{pending.checks.map(row => <li key={row.id}>{row.label} · {date(row.savedAt)}</li>)}</ul>}<div className="savedChecksActions"><button className="btn btnGhost" onClick={() => { setPending(null); setNotice('Canceled. Nothing was replaced or removed.'); }}>Cancel</button><button className="btn btnPrimary" disabled={busy || reading} onClick={confirm}>{pending.type === 'open' ? 'Replace open text' : pending.type === 'delete' ? 'Remove snapshot' : 'Replace saved checks'}</button></div></div>}
  </section>;
}
