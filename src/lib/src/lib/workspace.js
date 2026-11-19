const has = value => typeof value === 'string' && value.trim().length > 0;
export function draftChecklist(resume = {}) {
  const basics = resume.basics || {};
  return [
    { id: 'basics', title: 'Make it easy to contact you', detail: 'Name, headline and email', done: [basics.name, basics.title, basics.email].every(has) },
    { id: 'evidence', title: 'Show what you have done', detail: 'At least one experience or project with a supporting bullet', done: [...(resume.experience || []), ...(resume.projects || [])].some(row => has(row?.role || row?.name) && has(row?.bullets)) },
    { id: 'skills', title: 'Name your relevant skills', detail: 'Use skills you can explain with real examples', done: has(resume.skills) },
    { id: 'education', title: 'Add your education', detail: 'School and qualification', done: (resume.education || []).some(row => has(row?.school) && has(row?.degree)) },
  ];
}
export const hasDraftContent = resume => Boolean(resume && (has(resume.basics?.name) || has(resume.basics?.summary) || has(resume.skills) || [...(resume.experience || []), ...(resume.projects || [])].some(row => has(row?.role || row?.name) || has(row?.bullets))));
