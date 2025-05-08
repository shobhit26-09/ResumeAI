
import { Award, Sparkles, Shield, Zap, Bot, FileText, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";

export default function Features() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const features = [
    {
      icon: <Bot className="h-10 w-10" />,
      title: "AI-Powered Resume Writing",
      description: "Our AI assistant refines your resume by re-writing bullet points to highlight your achievements and showcase your impact.",
      image: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "ATS-Friendly Formats",
      description: "All our templates are designed to pass through applicant tracking systems with flying colors.",
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Tailor Your Resume in One Click",
      description: "With a click of a button and a job description paste, get your resume tailored to the job.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600"
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "Impact-Oriented Content",
      description: "Transform your experience into impactful statements that showcase measurable results and achievements.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const featureElements = featuresRef.current?.querySelectorAll(".feature-item");
    if (featureElements) {
      featureElements.forEach((el, index) => {
        (el as HTMLElement).style.animationDelay = `${0.2 * index}s`;
        observer.observe(el);
      });
    }

    const headerElement = featuresRef.current?.querySelector(".feature-header");
    if (headerElement) {
      observer.observe(headerElement);
    }

    return () => {
      if (featureElements) {
        featureElements.forEach((el) => observer.unobserve(el));
      }
      if (headerElement) {
        observer.unobserve(headerElement);
      }
    };
  }, []);

  return (
    <section ref={featuresRef} className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-16 feature-header opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
            Make your resume stand out
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every feature is crafted to help you create a resume that gets noticed by employers and lands you interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-item opacity-0 bg-card rounded-xl p-8 border shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col gap-8">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <div className={`absolute inset-0 bg-gradient-to-tr from-background/40 via-background/20 to-transparent z-10 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-40' : 'opacity-60'}`}></div>
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="flex flex-col items-start">
                  <div className="mb-4 text-primary bg-primary/10 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  
                  <Button 
                    variant="link" 
                    className="mt-6 p-0 text-primary group"
                    onClick={() => navigate(isSignedIn ? "/builder" : "/sign-up")}
                  >
                    <span className="inline-flex items-center">
                      Learn more 
                      <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!isSignedIn && (
          <div className="mt-20 text-center feature-item opacity-0">
            <div className="bg-gradient-to-r from-primary/5 to-indigo-500/5 rounded-xl p-8 md:p-12 max-w-3xl mx-auto border shadow-sm">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to create your professional resume?</h3>
              <p className="text-muted-foreground mb-8">Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder.</p>
              <Button 
                size="lg"
                className="px-8 py-6 text-lg rounded-md bg-gradient-to-r from-primary to-blue hover:opacity-90 transition-all duration-300 text-white shadow-md"
                onClick={() => navigate("/sign-up")}
              >
                Get Started for Free
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
