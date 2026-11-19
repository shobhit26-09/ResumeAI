const clean = value => typeof value === 'string' ? value.replace(/\r/g, '').trim() : '';
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function matcher(term) { return new RegExp(`(^|[^a-z0-9])(${escape(term)})(?=[^a-z0-9]|$)`, 'i'); }
function excerpt(line, term) {
  const match = matcher(term).exec(line); if (!match) return '';
  const index = match.index + match[1].length, start = Math.max(0, index - 85), end = Math.min(line.length, index + term.length + 135);
  return `${start ? '…' : ''}${line.slice(start, end).trim()}${end < line.length ? '…' : ''}`;
}
const noise = new Set(['required', 'preferred', 'essential', 'experience', 'knowledge', 'bonus', 'proficiency', 'requirements', 'qualification', 'qualifications', 'responsibilities', 'candidate', 'candidates']);
const aliases = { 'react.js': 'react', 'node.js': 'node', 'postgresql': 'postgres', 'golang': 'go' };
export function jobEvidence(resume, job, terms = []) {
  const source = clean(job).split(/\n+/).filter(Boolean), lines = clean(resume).split(/\n+/).filter(Boolean);
  const seen = new Set();
  return terms.filter(term => typeof term === 'string' && term.trim().length > 0 && !noise.has(term.toLowerCase()) && term.length <= 80 && !/[\r\n]/.test(term)).filter(term => { const key = aliases[term.toLowerCase()] || term.toLowerCase(); if (seen.has(key)) return false; seen.add(key); return true; }).slice(0, 24).map(term => {
    const matches = source.filter(line => matcher(term).test(line));
    if (!matches.length) return null;
    const resumeLine = lines.find(line => matcher(term).test(line)) || '';
    const jobLine = matches.find(line => /\brequired\b|\bmust\b|\bessential\b/i.test(line)) || matches[0];
    const optional = /\bpreferred\b|\bbonus\b|\bnice.to.have\b|\boptional\b|\ba plus\b/i.test(jobLine);
    const required = /\brequired\b|\bmust\b|\bessential\b/i.test(jobLine);
    const requirementNegated = /\bnot\s+(?:strictly\s+)?(?:required|essential)\b|\bno\b.{0,50}\brequired\b/i.test(jobLine);
    const context = requirementNegated ? 'Requirement wording needs review' : optional && required ? 'Mixed wording, review the post' : optional ? 'Preferred or optional wording' : required ? 'Required wording in this line' : 'Mentioned in the job post';
    const match = resumeLine ? matcher(term).exec(resumeLine) : null;
    const before = match ? resumeLine.slice(Math.max(0, match.index - 45), match.index) : '';
    const negated = /\b(no|not|without|lack|lacking|unfamiliar)\b[^.!?;]*$/i.test(before);
    return { term, context, jobQuote: excerpt(jobLine, term), resumeQuote: excerpt(resumeLine, term), state: !resumeLine ? 'not-found' : negated ? 'review' : 'mentioned' };
  }).filter(Boolean).sort((a, b) => ({ "not-found": 0, review: 1, mentioned: 2 }[a.state] - { "not-found": 0, review: 1, mentioned: 2 }[b.state]));
}
const markdownText = value => value.replace(/[\\`*_{}[\]()#+.!<>|~-]/g, '\\$&');
export function evidencePlan(rows) {
  return ['# ResumeAI job evidence review', '', 'Private working notes. This is a text comparison, not an ATS prediction, eligibility decision or verification of experience. A missing phrase does not prove a missing skill. Add or change a claim only if it is true.', '', ...rows.flatMap(row => [`## ${markdownText(row.term)}`, row.context, `Job wording: ${markdownText(row.jobQuote)}`, row.resumeQuote ? `Resume wording: ${markdownText(row.resumeQuote)}` : 'Resume wording: No exact text match found.', `Next review: ${row.state === 'not-found' ? 'If you have a real example, add it in context. Otherwise record this as a gap instead of inventing experience.' : row.state === 'review' ? 'Review the surrounding negative wording. A keyword alone does not show you meet this requirement.' : 'Check that this mention is backed by a specific example you can explain.'}`, ''])].join('\n');
}
