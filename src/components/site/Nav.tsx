import { Link, NavLink } from "react-router-dom";

export function Logo() {
  return <Link to="/" className="logo" aria-label="ResumeAI home"><span className="logoMark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 11h6M9 14.5h6M9 18h3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span><span>Resume<b>AI</b></span></Link>;
}

export default function Nav() {
  return (
    <header className="nav">
      <div className="navInner">
        <Logo />
        <nav className="navLinks">
          <NavLink to="/workspace">Workspace</NavLink>
          <NavLink to="/builder">Builder</NavLink>
          <NavLink to="/analyzer">ATS check</NavLink>
          <NavLink to="/templates">Templates</NavLink>
        </nav>
        <Link to="/workspace" className="btn btnPrimary btnSm">Your workspace</Link>
      </div>
    </header>
  );
}
