import { Link } from "react-router-dom";
import Nav from "@/components/site/Nav";
export default function NotFound() {
  return <div className="app"><Nav /><main className="page nf"><p className="eyebrow">404</p><h1>This page doesn't exist.</h1><p><Link to="/" className="textLink">Back to home</Link></p></main></div>;
}
