
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { ChevronRight, Stars, Bot, FileText, CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const heroElements = heroRef.current?.querySelectorAll(".animate-on-scroll");
    if (heroElements) {
      heroElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (heroElements) {
        heroElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="container px-4 relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
        <div className="text-left lg:w-1/2 animate-on-scroll opacity-0" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            AI Resume Builder
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-xl mb-8 animate-on-scroll opacity-0" style={{ animationDelay: "0.4s" }}>
            ResumeAI assistant is the easiest way to create a tailored resume containing all the right keywords, improve your writing & highlight your strengths.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 animate-on-scroll opacity-0" style={{ animationDelay: "0.6s" }}>
            <Button 
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-lg rounded-md bg-primary hover:bg-primary/90 transition-all duration-300"
              onClick={() => navigate(isSignedIn ? "/builder" : "/sign-up")}
            >
              Build your resume with AI
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-4 animate-on-scroll opacity-0" style={{ animationDelay: "0.8s" }}>
            <div className="flex items-center justify-center bg-primary/10 p-3 rounded-full">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">ATS-Friendly Templates</p>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Optimized for applicant tracking systems</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 mt-12 lg:mt-0 animate-on-scroll opacity-0" style={{ animationDelay: "1s" }}>
          <div className="relative">
            {/* Ambient lighting effects */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-primary/10 to-blue/10 rounded-[2rem] blur-2xl"></div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-xl blur opacity-75"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80"
                  alt="AI Resume Assistant" 
                  className="w-full h-auto rounded-xl object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                    <Bot className="h-4 w-4 text-primary" />
                    <span>AI Assistant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 space-y-4">
            <div className="grid grid-cols-4 gap-8 items-center justify-items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" 
                alt="Tesla" 
                className="h-6 w-auto object-contain animate-logo-glow" 
                style={{ animationDelay: "0s" }}
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
                alt="Google" 
                className="h-6 w-auto object-contain animate-logo-glow" 
                style={{ animationDelay: "1s" }}
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg" 
                alt="Spotify" 
                className="h-6 w-auto object-contain animate-logo-glow" 
                style={{ animationDelay: "2s" }}
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" 
                alt="Pinterest" 
                className="h-6 w-auto object-contain animate-logo-glow" 
                style={{ animationDelay: "3s" }}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Our resumes get people hired at top companies
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced background elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
    </section>
  );
}
