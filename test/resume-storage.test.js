import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeResume, parseBackup, createBackup, readStoredResume, validTemplate, MAX_BACKUP_BYTES } from '../src/lib/resume-storage.js';
const minimal = () => ({ basics: { name: 'Test Person' } });
const full = () => normalizeResume(minimal());
describe('validated device-local resume and backup', () => {
  it('fills missing nested fields without trusting extra properties', () => {
    const result = normalizeResume({ ...minimal(), unrelated: 'discard', basics: { name: 'Test Person', unrelated: 'discard' } });
    assert.equal(result.basics.email, ''); assert.equal(result.experience[0].role, '');
    assert.equal(result.unrelated, undefined); assert.equal(result.basics.unrelated, undefined);
  });
  it('round-trips text, Unicode, all sections and template', () => {
    const resume = full(); resume.basics.name = 'Résumé 测试'; resume.projects = [{ name: 'A', tech: 'JS', link: 'https://example.com', bullets: 'One\nTwo' }];
    assert.deepEqual(parseBackup(createBackup(resume, 'compact')), { resume, template: 'compact' });
  });
  it('preserves intentionally empty sections', () => assert.deepEqual(normalizeResume({ ...minimal(), projects: [] }).projects, []));
  it('never creates a backup too large for its own restore path', () => {
    const resume = full(); resume.experience = Array.from({ length: 25 }, () => ({ role: 'Role', company: '', location: '', start: '', end: '', bullets: 'x'.repeat(100000) }));
    assert.throws(() => createBackup(resume, 'modern'), /too large/);
  });
  it('rejects malformed JSON without throwing a native parser message', () => assert.throws(() => parseBackup('{'), /readable JSON/));
  it('rejects other apps and newer formats', () => {
    for (const v of [{}, { format: 'resumeai-backup', version: 2 }, { format: 'other', version: 1 }]) assert.throws(() => parseBackup(JSON.stringify(v)), /version 1/);
  });
  it('rejects invalid templates rather than silently changing them', () => assert.throws(() => parseBackup(JSON.stringify({ format: 'resumeai-backup', version: 1, template: 'wrong', resume: full() })), /unknown template/));
  it('rejects oversized files by UTF-8 byte length', () => assert.throws(() => parseBackup('测'.repeat(MAX_BACKUP_BYTES / 2)), /2 MB/));
  it('rejects unsafe shapes that previously crashed the editor', () => {
    for (const v of [null, [], {}, { basics: null }, { basics: {}, projects: null }, { basics: {}, experience: ['bad'] }, { basics: { name: 42 } }]) assert.throws(() => normalizeResume(v));
  });
  it('bounds imported field and section lengths', () => {
    assert.throws(() => normalizeResume({ basics: { summary: 'x'.repeat(100001) } }));
    assert.throws(() => normalizeResume({ basics: {}, experience: Array.from({ length: 201 }, () => ({})) }));
  });
  it('reads existing v2 storage with missing fields', () => {
    const result = readStoredResume({ getItem: () => JSON.stringify(minimal()) }, full);
    assert.equal(result.resume.basics.name, 'Test Person'); assert.equal(result.error, '');
  });
  it('never writes or overwrites malformed saved data while loading', () => {
    const storage = { getItem: () => '{broken', setItem: () => assert.fail('must not write') };
    assert.match(readStoredResume(storage, full).error, /not been overwritten/);
  });
  it('handles blocked storage and invalid template preferences', () => {
    const result = readStoredResume({ getItem: () => { throw new Error('Blocked'); } }, full);
    assert.match(result.error, /could not be loaded/); assert.equal(validTemplate('bad'), 'modern');
  });
});
