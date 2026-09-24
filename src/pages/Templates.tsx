import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "@/components/site/Nav";
import SiteFooter from "@/components/site/SiteFooter";
import { ResumePaper } from "@/components/resume/ResumePaper";
import { loadResume, sampleResume, saveTemplate, templates, type TemplateId } from "@/lib/resume";

export default function Templates() {
  const nav = useNavigate();
  useEffect(() => { document.title = "Templates · ResumeAI"; }, []);
  const mine = loadResume();
  const data = mine.basics.name ? mine : sampleResume;
  const use = (id: TemplateId) => { saveTemplate(id); nav("/builder"); };
  return (
    <div className="app">
      <Nav />
      <main className="page">
        <div className="pageHead"><p className="eyebrow">Templates</p><h1>Three layouts. All ATS&#8209;safe.</h1><p>Single column, standard headings, real text. {mine.basics.name ? "Previews show your own resume." : "Previews use a sample resume; yours will replace it."}</p></div>
        <div className="tplGrid">{templates.map(t => (
          <button className="tpl" key={t.id} onClick={() => use(t.id)}>
            <div className="tplThumb"><div className="tplPaper"><ResumePaper data={data} template={t.id} /></div></div>
            <div className="tplMeta"><div><h3>{t.name}</h3><p>{t.note}</p></div><span className="btn btnGhost btnSm">Use</span></div>
          </button>
        ))}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
