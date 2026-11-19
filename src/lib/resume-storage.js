const fields = {
  basics: ['name', 'title', 'email', 'phone', 'location', 'links', 'summary'],
  experience: ['role', 'company', 'location', 'start', 'end', 'bullets'],
  projects: ['name', 'link', 'tech', 'bullets'],
  education: ['school', 'degree', 'start', 'end', 'details'],
};
export const RESUME_KEY = 'resumeai.resume.v2';
export const TEMPLATE_KEY = 'resumeai.template.v2';
export const MAX_BACKUP_BYTES = 2 * 1024 * 1024;
export const validTemplate = value => ['classic', 'modern', 'compact'].includes(value) ? value : 'modern';
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
function text(value) {
  if (value === undefined) return '';
  if (typeof value !== 'string' || value.length > 100000) throw new Error('Resume fields must be text, no longer than 100,000 characters.');
  return value;
}
function record(value, keys) {
  if (!object(value)) throw new Error('This file does not contain a valid resume.');
  return Object.fromEntries(keys.map(key => [key, text(value[key])]));
}
// Rebuild known fields, rather than merging untrusted JSON into the UI's state.
export function normalizeResume(value) {
  if (!object(value) || !object(value.basics)) throw new Error('This file does not contain a valid resume.');
  const result = { basics: record(value.basics, fields.basics) };
  for (const section of ['experience', 'projects', 'education']) {
    const rows = value[section];
    if (rows !== undefined && (!Array.isArray(rows) || rows.length > 200)) throw new Error('Resume sections must be lists with no more than 200 entries.');
    result[section] = rows === undefined ? [record({}, fields[section])] : rows.map(row => record(row, fields[section]));
  }
  result.skills = text(value.skills);
  result.certifications = text(value.certifications);
  return result;
}
export function createBackup(resume, template) {
  const raw = JSON.stringify({ format: 'resumeai-backup', version: 1, exportedAt: new Date().toISOString(), template: validTemplate(template), resume: normalizeResume(resume) }, null, 2);
  if (new TextEncoder().encode(raw).byteLength > MAX_BACKUP_BYTES) throw new Error('This resume is too large for a 2 MB backup. Shorten its text before exporting.');
  return raw;
}
export function parseBackup(raw) {
  if (new TextEncoder().encode(raw).byteLength > MAX_BACKUP_BYTES) throw new Error('Choose a backup smaller than 2 MB.');
  let data;
  try { data = JSON.parse(raw); } catch { throw new Error('This is not a readable JSON backup.'); }
  if (!object(data) || data.format !== 'resumeai-backup' || data.version !== 1) throw new Error('Choose a ResumeAI backup (version 1). PDF files cannot be restored here.');
  if (!['classic', 'modern', 'compact'].includes(data.template)) throw new Error('The backup has an unknown template.');
  return { resume: normalizeResume(data.resume), template: data.template };
}
export function readStoredResume(storage, fallback) {
  try {
    const raw = storage.getItem(RESUME_KEY);
    return { resume: raw === null ? fallback() : normalizeResume(JSON.parse(raw)), error: '' };
  } catch {
    return { resume: fallback(), error: 'Saved resume could not be loaded. It has not been overwritten. Restore a backup, or edit to start a new saved copy.' };
  }
  }
