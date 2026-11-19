export const CHECKS_KEY = 'resumeai.checks.v1';
export const MAX_CHECKS = 8;
export const MAX_CHECK_BYTES = 2 * 1024 * 1024;
const bytes = raw => new TextEncoder().encode(raw).byteLength;
const object = value => value && typeof value === 'object' && !Array.isArray(value);
function text(value, max, name) {
  if (typeof value !== 'string' || value.length > max) throw new Error(`${name} must be text, no longer than ${max.toLocaleString('en-US')} characters.`);
  return value;
}
export function normalizeChecks(value) {
  if (!object(value) || value.format !== 'resumeai-saved-checks' || value.version !== 1 || !Array.isArray(value.checks) || value.checks.length > MAX_CHECKS) throw new Error('Choose a ResumeAI saved-checks backup with up to eight checks. Builder backups use different controls.');
  const seen = new Set();
  return value.checks.map(row => {
    if (!object(row)) throw new Error('One of the saved checks is invalid.');
    const id = text(row.id, 100, 'Check ID');
    if (!/^[a-zA-Z0-9-]{1,100}$/.test(id) || seen.has(id)) throw new Error('Saved checks must have unique valid IDs.');
    seen.add(id);
    const savedAt = text(row.savedAt, 40, 'Saved time');
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(savedAt) || !Number.isFinite(Date.parse(savedAt)) || new Date(savedAt).toISOString() !== savedAt) throw new Error('A saved check has an invalid date.');
    const resume = text(row.resume, 120000, 'Resume'), job = text(row.job, 60000, 'Job description');
    if (resume.trim().length <= 50) throw new Error('A saved check needs readable resume text.');
    return { id, savedAt, label: text(row.label, 80, 'Check name').trim() || 'Untitled check', resume, job };
  });
}
export function encodeChecks(checks) {
  const data = { format: 'resumeai-saved-checks', version: 1, checks };
  const raw = JSON.stringify({ ...data, checks: normalizeChecks(data) });
  if (bytes(raw) > MAX_CHECK_BYTES) throw new Error('Saved checks exceed 2 MB. Remove an older check or shorten the text.');
  return raw;
}
export function parseChecks(raw) {
  if (typeof raw !== 'string' || bytes(raw) > MAX_CHECK_BYTES) throw new Error('Choose a saved-checks backup no larger than 2 MB.');
  let data;
  try { data = JSON.parse(raw); } catch { throw new Error('This is not a readable saved-checks backup.'); }
  return normalizeChecks(data);
}
export function readChecks(storage) {
  const raw = storage.getItem(CHECKS_KEY);
  return { raw, checks: raw === null ? [] : parseChecks(raw) };
}
export function saveCheck(storage, check) {
  const { checks } = readChecks(storage);
  if (checks.length >= MAX_CHECKS) throw new Error('Eight checks are already saved. Download a backup, then remove an older check.');
  if (checks.some(row => row.id === check.id)) throw new Error('This check ID is already saved. Try saving again.');
  const next = [check, ...checks];
  storage.setItem(CHECKS_KEY, encodeChecks(next));
  return next;
}
export function deleteCheck(storage, id) {
  const { checks } = readChecks(storage);
  const next = checks.filter(row => row.id !== id);
  storage.setItem(CHECKS_KEY, encodeChecks(next));
  return next;
}
export function replaceChecks(storage, next, expectedRaw) {
  if (storage.getItem(CHECKS_KEY) !== expectedRaw) throw new Error('Saved checks changed in another tab. Review the current list, then choose the backup again. Nothing was replaced.');
  storage.setItem(CHECKS_KEY, encodeChecks(next));
  return next;
}
