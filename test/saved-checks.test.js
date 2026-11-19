import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CHECKS_KEY, normalizeChecks, encodeChecks, parseChecks, readChecks, saveCheck, deleteCheck, replaceChecks } from '../src/lib/saved-checks.js';
const row = (id = 'test-1') => ({ id, label: 'Frontend role · version 1', savedAt: '2026-11-19T13:40:00.000Z', resume: 'Fictional Candidate\nBuilt accessible React forms with repeatable tests and documented user flows.', job: 'React is required. Testing is preferred.' });
const data = checks => ({ format: 'resumeai-saved-checks', version: 1, checks });
function memory(initial = null) { let value = initial; return { getItem: key => { assert.equal(key, CHECKS_KEY); return value; }, setItem: (key, next) => { assert.equal(key, CHECKS_KEY); value = next; } }; }
describe('private role snapshots', () => {
  it('round-trips exact resume/job/Unicode without trusting extra properties', () => { const r = row(); r.extra = 'not retained'; const result = parseChecks(encodeChecks([r])); assert.deepEqual(result, [row()]); });
  it('does not write while loading absent storage', () => { const s = memory(); s.setItem = () => assert.fail(); assert.deepEqual(readChecks(s), { raw: null, checks: [] }); });
  it('does not replace corrupt storage when saving', () => { const s = memory('{bad'); assert.throws(() => saveCheck(s, row()), /readable/); assert.equal(s.getItem(CHECKS_KEY), '{bad'); });
  it('never claims a quota write succeeded', () => { const s = memory(); s.setItem = () => { throw new DOMException('full', 'QuotaExceededError'); }; assert.throws(() => saveCheck(s, row()), { name: 'QuotaExceededError' }); });
  it('propagates blocked storage for a visible error', () => assert.throws(() => readChecks({ getItem() { throw new DOMException('blocked', 'SecurityError'); } }), { name: 'SecurityError' }));
  it('prepends a separate snapshot and keeps the earlier text unchanged', () => { const s = memory(); saveCheck(s, row()); const next = { ...row('test-2'), resume: row().resume + ' New true detail.' }; saveCheck(s, next); assert.deepEqual(readChecks(s).checks, [next, row()]); });
  it('reads the latest list before saving rather than a stale UI array', () => { const s = memory(encodeChecks([row('other-tab')])); saveCheck(s, row()); assert.equal(readChecks(s).checks.length, 2); });
  it('removes only the selected snapshot from the latest list', () => { const s = memory(encodeChecks([row(), row('other-tab')])); assert.deepEqual(deleteCheck(s, row().id), [row('other-tab')]); });
  it('limits a list to eight snapshots without silently evicting old work', () => { const s = memory(encodeChecks(Array.from({ length: 8 }, (_, i) => row('test-' + i)))); const original = s.getItem(CHECKS_KEY); assert.throws(() => saveCheck(s, row('ninth')), /Eight/); assert.equal(s.getItem(CHECKS_KEY), original); });
  it('rejects duplicate IDs on import and save', () => { assert.throws(() => normalizeChecks(data([row(), row()])), /unique/); assert.throws(() => saveCheck(memory(encodeChecks([row()])), row()), /already saved/); });
  it('rejects unknown formats, arrays, malformed records and newer versions', () => { for (const d of [[], null, {}, { ...data([]), version: 2 }, data([null]), data([{}])]) assert.throws(() => parseChecks(JSON.stringify(d))); });
  it('bounds all imported fields and refuses invalid types', () => { for (const [key, value] of [['resume', 'a'.repeat(120001)], ['job', 'a'.repeat(60001)], ['label', 'a'.repeat(81)], ['resume', {}], ['job', null]]) assert.throws(() => normalizeChecks(data([{ ...row(), [key]: value }]))); });
  it('rejects invalid and normalized-overflow dates', () => { for (const savedAt of ['tomorrow', '2026-02-30T13:40:00.000Z', '2026-11-19', 123]) assert.throws(() => normalizeChecks(data([{ ...row(), savedAt }]))); });
  it('rejects unsafe IDs and unreadable resume text', () => { for (const r of [{ ...row(), id: '__proto__' }, { ...row(), id: '' }, { ...row(), resume: 'short' }]) assert.throws(() => normalizeChecks(data([r]))); });
  it('bounds backup UTF-8 bytes on both export and import', () => { const checks = Array.from({ length: 8 }, (_, i) => ({ ...row('large-' + i), resume: '界'.repeat(120000), job: '界'.repeat(60000) })); assert.throws(() => encodeChecks(checks), /2 MB/); assert.throws(() => parseChecks('界'.repeat(700000)), /2 MB/); });
  it('a valid backup can always restore its own exported contents', () => { const r = { ...row(), resume: '界'.repeat(120000), job: '界'.repeat(60000) }; assert.deepEqual(parseChecks(encodeChecks([r])), [r]); });
  it('replaces the whole list only when storage matches the reviewed version', () => { const original = encodeChecks([row()]), s = memory(original); replaceChecks(s, [row('restored')], original); assert.deepEqual(readChecks(s).checks, [row('restored')]); });
  it('a conflict leaves newer work untouched', () => { const s = memory(encodeChecks([row('newer')])), before = s.getItem(CHECKS_KEY); assert.throws(() => replaceChecks(s, [], encodeChecks([row()])), /another tab/); assert.equal(s.getItem(CHECKS_KEY), before); });
  it('permits an explicitly reviewed empty backup and recovery from corruption', () => { const s = memory('{bad'); replaceChecks(s, [], '{bad'); assert.deepEqual(readChecks(s).checks, []); });
  it('does not write a partially invalid restore', () => { const s = memory(), before = s.getItem(CHECKS_KEY); assert.throws(() => replaceChecks(s, [row(), { bad: true }], before)); assert.equal(s.getItem(CHECKS_KEY), before); });
});
