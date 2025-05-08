
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, Twitter, Copyright, PhoneCall, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-gradient-to-b from-muted/20 to-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="col-span-1 md:col-span-5">
            <Link to="/" className="inline-block mb-4">
              <span className="font-bold text-2xl bg-gradient-to-r from-primary via-indigo-500 to-blue-600 bg-clip-text text-transparent">ResumeAI</span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Create professional resumes with AI-powered insights. Build, analyze, and improve your resume for better job opportunities.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <PhoneCall className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Mail className="h-4 w-4" />
              <span>contact@resumeai.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>San Francisco, CA</span>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-medium text-base mb-4 text-foreground">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/builder" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform">Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform">Resume Analyzer</span>
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform">Templates</span>
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform">Pricing</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-medium text-base mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform">Cookie Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/gdpr" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform">GDPR Compliance</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground flex items-center">
            <Copyright className="h-4 w-4 mr-1" /> {currentYear} ResumeAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors h-8 w-8 flex items-center justify-center rounded-full border hover:border-primary">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors h-8 w-8 flex items-center justify-center rounded-full border hover:border-primary">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors h-8 w-8 flex items-center justify-center rounded-full border hover:border-primary">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors h-8 w-8 flex items-center justify-center rounded-full border hover:border-primary">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
