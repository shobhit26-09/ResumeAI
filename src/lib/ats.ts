export type Status = "pass" | "warn" | "fail";
export type Check = { id: string; status: Status; title: string; detail: string };
export type Category = { id: string; label: string; score: number; checks: Check[] };
export type Report = {
  score: number;
  categories: Category[];
  keywords: { mode: "job" | "skills"; found: string[]; missing: string[] };
  stats: { words: number; bullets: number; quantified: number; actionLed: number };
};

const ACTION = "accelerated achieved added analyzed architected automated boosted built championed coded collaborated completed configured consolidated created cut debugged decreased delivered deployed designed developed drove eliminated enabled engineered enhanced established expanded fixed implemented improved increased initiated integrated introduced launched led maintained managed mentored migrated modernized optimized organized owned partnered planned produced prototyped rebuilt redesigned reduced refactored released replaced resolved restructured revamped scaled secured shipped simplified solved spearheaded standardized streamlined tested trained transformed tuned upgraded wrote".split(" ");
const WEAK = ["responsible for", "worked on", "helped with", "duties included", "tasked with", "involved in", "assisted in"];
const SKILLS = ["react", "react.js", "next.js", "vue", "angular", "svelte", "javascript", "typescript", "html", "css", "sass", "tailwind", "redux", "node.js", "node", "express", "nestjs", "python", "django", "flask", "fastapi", "java", "spring", "kotlin", "swift", "c++", "c#", ".net", "go", "golang", "rust", "php", "laravel", "ruby", "rails", "sql", "mysql", "postgresql", "postgres", "mongodb", "redis", "graphql", "rest", "docker", "kubernetes", "aws", "azure", "gcp", "firebase", "supabase", "git", "github", "ci/cd", "jest", "cypress", "playwright", "webpack", "vite", "figma", "linux", "machine learning", "pandas", "numpy", "tensorflow", "pytorch", "data structures", "algorithms", "system design", "microservices", "agile", "scrum", "accessibility", "seo", "websockets", "socket.io", "testing", "unit testing"];
const STOP = new Set("a an and are as at be by for from has have in is it its of on or that the this to was were will with you your we our they their who what which when where how all any can may must should would could about into over under more most such than then there these those also other using use used work working team teams strong good great ability experience years year plus etc role job candidate candidates looking join including include new within across well per based".split(" "));

const SECTIONS: Record<string, RegExp> = {
  summary: /^(professional\s+)?(summary|profile|objective|about( me)?)\b/i,
  experience: /^(work\s+|professional\s+)?(experience|employment|work history)\b/i,
  education: /^(education|academics?|academic background)\b/i,
  skills: /^(technical\s+)?(skills|technologies|tech stack|core competencies)\b/i,
  projects: /^(personal\s+|key\s+|academic\s+)?projects?\b/i,
};

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const pct = (a: number, b: number) => (b ? a / b : 0);

function isBullet(l: string) { return /^[•\-*▪◦●–]\s*/.test(l); }
function stripBullet(l: string) { return l.replace(/^[•\-*▪◦●–]\s*/, "").trim(); }

export function analyze(text: string, job = ""): Report {
  const raw = text.replace(/\r/g, "");
  const ls = raw.split("\n").map(l => l.trim()).filter(Boolean);
  const lower = raw.toLowerCase();
  const words = (raw.match(/[A-Za-z0-9][A-Za-z0-9+#.'/-]*/g) || []).length;

  // Structure
  const found: Record<string, boolean> = {};
  for (const [k, re] of Object.entries(SECTIONS)) found[k] = ls.some(l => l.length < 40 && re.test(l.replace(/[:|]/g, "").trim()));
  const email = /[\w.+-]+@[\w-]+\.[\w.]+/.test(raw);
  const phone = /(\+?\d[\d\s().-]{8,}\d)/.test(raw);
  const link = /(linkedin\.com|github\.com|https?:\/\/|www\.|\.dev\b|\.io\b|portfolio)/i.test(raw);
  const structure: Check[] = [
    { id: "exp", status: found.experience ? "pass" : "fail", title: found.experience ? "Experience section found" : "No experience section heading", detail: found.experience ? "ATS software can map your roles to the right field." : "Add a heading called \"Experience\" so parsers can find your roles. Internships and contract work count." },
    { id: "edu", status: found.education ? "pass" : "fail", title: found.education ? "Education section found" : "No education section heading", detail: found.education ? "Degree and school will be parsed correctly." : "Add an \"Education\" heading with degree, school and dates." },
    { id: "skills", status: found.skills ? "pass" : "warn", title: found.skills ? "Skills section found" : "No skills section", detail: found.skills ? "Recruiters filter on this section first." : "A plain \"Skills\" list is the easiest place for keyword filters to match you." },
    { id: "summary", status: found.summary ? "pass" : "warn", title: found.summary ? "Summary found" : "No summary", detail: found.summary ? "A short summary helps a recruiter place you in seconds." : "Two lines on who you are and what you build. Optional, but it helps." },
    { id: "contact", status: email && phone ? "pass" : email || phone ? "warn" : "fail", title: email && phone ? "Email and phone present" : "Contact details incomplete", detail: email && phone ? (link ? "Plus a profile or portfolio link." : "Consider adding a LinkedIn, GitHub or portfolio link.") : `Missing: ${[!email && "email", !phone && "phone"].filter(Boolean).join(" and ")}.` },
  ];
  const structureScore = clamp((found.experience ? 30 : 0) + (found.education ? 20 : 0) + (found.skills ? 20 : 0) + (found.summary ? 10 : 0) + (email ? 8 : 0) + (phone ? 7 : 0) + (link ? 5 : 0));

  // Impact
  let bullets = ls.filter(isBullet).map(stripBullet);
  if (bullets.length < 3) bullets = ls.filter(l => l.split(/\s+/).length >= 6 && /^[A-Z]/.test(l) && !/@/.test(l));
  const actionLed = bullets.filter(b => ACTION.includes(b.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, ""))).length;
  const quantified = bullets.filter(b => /\d/.test(b)).length;
  const weakHits = WEAK.filter(w => lower.includes(w));
  const firstPerson = (raw.match(/\b(I|me|my)\b/g) || []).length;
  const aRatio = pct(actionLed, bullets.length), qRatio = pct(quantified, bullets.length);
  const impact: Check[] = [
    { id: "verbs", status: aRatio >= 0.6 ? "pass" : aRatio >= 0.3 ? "warn" : "fail", title: `${actionLed} of ${bullets.length} bullets start with an action verb`, detail: aRatio >= 0.6 ? "Good. Lead with what you did." : "Start bullets with verbs like Built, Shipped, Reduced, Led instead of descriptions." },
    { id: "numbers", status: qRatio >= 0.4 ? "pass" : qRatio >= 0.2 ? "warn" : "fail", title: `${quantified} of ${bullets.length} bullets include a number`, detail: qRatio >= 0.4 ? "Numbers make results believable." : "Add scale or results: users, load time, %, count of features, team size." },
    { id: "weak", status: weakHits.length ? "warn" : "pass", title: weakHits.length ? `Weak phrasing: "${weakHits.slice(0, 2).join("\", \"")}"` : "No filler phrases", detail: weakHits.length ? "Replace with the result you produced." : "Your bullets read as outcomes, not duties." },
    { id: "pronouns", status: firstPerson > 2 ? "warn" : "pass", title: firstPerson > 2 ? `${firstPerson} first-person pronouns` : "No first-person pronouns", detail: firstPerson > 2 ? "Drop \"I\" and \"my\". Resumes are written in implied first person." : "Reads the way recruiters expect." },
  ];
  const impactScore = bullets.length ? clamp(aRatio * 45 + Math.min(qRatio / 0.5, 1) * 40 + (weakHits.length ? 0 : 10) + (firstPerson > 2 ? 0 : 5)) : 10;

  // Keywords
  let kw: Report["keywords"];
  let keywordScore: number;
  const has = (t: string) => new RegExp(`(^|[^a-z0-9])${t.replace(/[.+#/]/g, m => "\\" + m)}([^a-z0-9]|$)`, "i").test(lower);
  if (job.trim().length > 40) {
    const jl = job.toLowerCase();
    const skillTerms = SKILLS.filter(s => new RegExp(`(^|[^a-z0-9])${s.replace(/[.+#/]/g, m => "\\" + m)}([^a-z0-9]|$)`).test(jl));
    const freq: Record<string, number> = {};
    (jl.match(/[a-z][a-z0-9+#.-]{2,}/g) || []).forEach(w => { w = w.replace(/[.-]+$/, ""); if (!STOP.has(w) && w.length > 3) freq[w] = (freq[w] || 0) + 1; });
    const common = Object.entries(freq).filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).map(([w]) => w).slice(0, 12);
    const terms = Array.from(new Set([...skillTerms, ...common])).slice(0, 24);
    const f = terms.filter(has), m = terms.filter(t => !has(t));
    kw = { mode: "job", found: f, missing: m };
    keywordScore = clamp(pct(f.length, terms.length) * 100);
  } else {
    const f = Array.from(new Set(SKILLS.filter(has).map(s => s.replace(/^node$/, "node.js").replace(/^postgres$/, "postgresql"))));
    kw = { mode: "skills", found: f, missing: [] };
    keywordScore = clamp(Math.min(f.length / 10, 1) * 85 + (found.skills ? 15 : 0));
  }
  const keywords: Check[] = [kw.mode === "job"
    ? { id: "match", status: keywordScore >= 70 ? "pass" : keywordScore >= 45 ? "warn" : "fail", title: `Matches ${kw.found.length} of ${kw.found.length + kw.missing.length} job keywords`, detail: kw.missing.length ? "Add the missing terms you genuinely have experience with, in context, not as a list dump." : "Strong overlap with the job description." }
    : { id: "skills", status: kw.found.length >= 8 ? "pass" : kw.found.length >= 4 ? "warn" : "fail", title: `${kw.found.length} recognised technical skills`, detail: "Paste a job description to see exactly which of its keywords you're missing." }];

  // Readability
  const avgBullet = bullets.length ? bullets.reduce((s, b) => s + b.split(/\s+/).length, 0) / bullets.length : 0;
  const lengthOk = words >= 250 && words <= 900;
  const read: Check[] = [
    { id: "length", status: lengthOk ? "pass" : words < 250 ? "fail" : "warn", title: `${words} words`, detail: lengthOk ? "A good length for one to two pages." : words < 250 ? "Too thin. Add projects, results and skills so there's something to evaluate." : "Long. Early-career resumes read best on one page." },
    { id: "bulletlen", status: !bullets.length ? "warn" : avgBullet >= 8 && avgBullet <= 28 ? "pass" : "warn", title: bullets.length ? `Bullets average ${Math.round(avgBullet)} words` : "No bullet points detected", detail: !bullets.length ? "Break experience into bullets so each result stands on its own." : avgBullet > 28 ? "Some bullets run long. Aim for one line, two at most." : avgBullet < 8 ? "Bullets are very short. Say what you did and what changed." : "Easy to scan." },
  ];
  const readScore = clamp((lengthOk ? 60 : words < 250 ? 20 : 40) + (bullets.length ? (avgBullet >= 8 && avgBullet <= 28 ? 40 : 25) : 10));

  const categories: Category[] = [
    { id: "structure", label: "Structure", score: structureScore, checks: structure },
    { id: "impact", label: "Impact", score: impactScore, checks: impact },
    { id: "keywords", label: "Keywords", score: keywordScore, checks: keywords },
    { id: "readability", label: "Readability", score: readScore, checks: read },
  ];
  const score = clamp(structureScore * 0.3 + impactScore * 0.3 + keywordScore * 0.25 + readScore * 0.15);
  return { score, categories, keywords: kw, stats: { words, bullets: bullets.length, quantified, actionLed } };
}

export async function pdfToText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  const worker = (await import("pdfjs-dist/build/pdf.worker.min.js?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = worker;
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const out: string[] = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const rows = new Map<number, { x: number; s: string }[]>();
    for (const it of content.items as { str: string; transform: number[] }[]) {
      if (!it.str.trim()) continue;
      const y = Math.round(it.transform[5] / 3) * 3;
      if (!rows.has(y)) rows.set(y, []);
      rows.get(y)!.push({ x: it.transform[4], s: it.str });
    }
    [...rows.entries()].sort((a, b) => b[0] - a[0]).forEach(([, r]) => out.push(r.sort((a, b) => a.x - b.x).map(i => i.s).join(" ").replace(/\s+/g, " ").trim()));
  }
  return out.join("\n");
}
