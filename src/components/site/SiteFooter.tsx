import { Link } from "react-router-dom";
import { Logo } from "./Nav";
export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="footInner">
        <div><Logo /><p>Free resume builder and ATS check. Everything stays in your browser.</p></div>
        <nav><Link to="/builder">Builder</Link><Link to="/analyzer">ATS check</Link><Link to="/templates">Templates</Link><a href="https://github.com/shobhit26-09/ResumeAI" target="_blank" rel="noreferrer">Source</a></nav>
      </div>
      <div className="footBase">© {new Date().getFullYear()} ResumeAI · Built by <a href="https://shobhitgupta.netlify.app/" target="_blank" rel="noreferrer">Shobhit Gupta</a></div>
    </footer>
  );
}
