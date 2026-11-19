import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { draftChecklist, hasDraftContent } from '../src/lib/workspace.js';
describe('workspace checkpoints describe content, not hiring readiness', () => {
 it('does not pretend an empty resume is ready', () => { assert.equal(draftChecklist().filter(x => x.done).length, 0); assert.equal(hasDraftContent({}), false); });
 it('requires all three contact basics', () => { assert.equal(draftChecklist({ basics: { name: 'Demo' } })[0].done, false); assert.equal(draftChecklist({ basics: { name: 'Demo', title: 'Developer', email: 'demo@example.com' } })[0].done, true); });
 it('accepts project evidence without claiming employment', () => { assert.equal(draftChecklist({ projects: [{ name: 'Demo project', bullets: 'Wrote tests for a form' }] })[1].done, true); });
 it('requires supporting text rather than a title alone', () => { assert.equal(draftChecklist({ experience: [{ role: 'Developer' }] })[1].done, false); });
 it('ignores whitespace-only fields', () => { assert.equal(hasDraftContent({ basics: { name: '   ' } }), false); assert.equal(draftChecklist({ skills: '  ' })[2].done, false); });
 it('recognizes started work without giving it a score', () => { assert.equal(hasDraftContent({ projects: [{ bullets: 'First detail' }] }), true); assert.deepEqual(Object.keys(draftChecklist()[0]).sort(), ['detail', 'done', 'id', 'title']); });
});
