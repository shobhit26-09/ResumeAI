
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";

export default function Hero() {
  const { isSignedIn } = useUser();

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center pt-20 section-padding overflow-hidden">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Create Outstanding Resumes with AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-lg">
              Build, analyze, and optimize your resume with intelligent insights for better job opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={isSignedIn ? "/builder" : "/sign-up"}>
                <Button size="lg" className="w-full sm:w-auto">
                  {isSignedIn ? "Create Resume" : "Get Started"}
                </Button>
              </Link>
              <Link to="/analyzer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Analyze Resume
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur-xl opacity-20 animate-pulse"></div>
            <div className="relative bg-card border rounded-xl overflow-hidden shadow-xl">
              <div className="p-1">
                <div className="p-6 rounded-lg glass">
                  <div className="space-y-4">
                    <div className="h-8 rounded-md bg-primary/30 w-2/3"></div>
                    <div className="space-y-2">
                      <div className="h-4 rounded-md bg-primary/30 w-full"></div>
                      <div className="h-4 rounded-md bg-primary/30 w-5/6"></div>
                      <div className="h-4 rounded-md bg-primary/30 w-4/6"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 rounded-md bg-primary/30 w-full"></div>
                      <div className="h-4 rounded-md bg-primary/30 w-5/6"></div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <div className="h-8 rounded-md bg-primary/50 w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
