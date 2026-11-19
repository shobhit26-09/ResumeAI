import { useRef, useState } from 'react';
import { createBackup, parseBackup, MAX_BACKUP_BYTES } from '@/lib/resume-storage.js';

export default function ResumeBackup({ resume, template, onRestore }) {
  const input = useRef(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const notify = (text, failed = false) => { setMessage(text); setError(failed); };
  const backup = () => {
    try {
      const url = URL.createObjectURL(new Blob([createBackup(resume, template)], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ResumeAI-backup.json';
      document.body.appendChild(link);
      link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify('Backup downloaded. Keep it private: it contains your resume details.');
    } catch (err) { notify(err.message || 'Backup could not be created.', true); }
  };
  const restore = async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      if (file.size > MAX_BACKUP_BYTES) throw new Error('Choose a backup smaller than 2 MB.');
      const data = parseBackup(await file.text());
      if (!window.confirm(`Replace the current resume with the backup for ${data.resume.basics.name || 'an unnamed resume'}? Download a backup of your current work first if you want to keep it.`)) return;
      onRestore(data);
      notify('Backup restored in the editor. Check the save status before leaving, or keep a downloaded backup.');
    } catch (err) { notify(err.message || 'Backup could not be restored.', true); }
  };
  return <section className="backupPanel" aria-label="Resume backup">
    <div><h2>Keep a copy</h2><p>Your resume stays in this browser. A backup lets you move it to another device or recover it later.</p></div>
    <div className="backupActions">
      <button className="btn btnGhost btnSm" onClick={backup}>Download backup</button>
      <button className="btn btnGhost btnSm" onClick={() => input.current?.click()}>Restore backup</button>
      <input hidden ref={input} type="file" accept="application/json,.json" aria-label="Choose ResumeAI backup" onChange={restore} />
    </div>
    <p className={error ? 'backupMessage backupError' : 'backupMessage'} role={error ? 'alert' : 'status'}>{message}</p>
  </section>;
        }
