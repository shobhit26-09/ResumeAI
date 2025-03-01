import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { FileText, Sparkles } from "lucide-react";

export default function Hero() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/builder");
  };

  const handleAnalyzeResume = () => {
    navigate("/analyzer");
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center pt-20 section-padding overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-in">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
              <span className="text-sm font-medium tracking-wider uppercase text-purple-500">
                AI-Powered Resume Builder
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Create Outstanding Resumes with AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-lg">
              Build, analyze, and optimize your resume with intelligent insights for better job opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={handleGetStarted}
              >
                <FileText className="mr-2 h-5 w-5" /> Create Resume
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                onClick={handleAnalyzeResume}
              >
                <Sparkles className="mr-2 h-5 w-5" /> Analyze Resume
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs">
                  JD
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs">
                  RW
                </div>
                <div className="h-8 w-8 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-white text-xs">
                  KL
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">500+</span> professionals using ResumeAI today
              </p>
            </div>
          </div>
          
          {/* Right Image Section */}
          <div className="relative animate-fade-in">
            {/* Glowing Background Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl blur-xl opacity-30 animate-pulse"></div>

            {/* Resume Builder Preview */}
            <div className="relative bg-card border rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Resume builder preview" 
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Overlay Text Banner */}
              <div className="absolute top-6 left-6 bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-white">
                  🚀 Smart Resumes, Smarter Careers
                </h3>
              </div>

              {/* Gradient Overlay for a Modern Look */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-4">
                    
                    <div className="space-y-2">
                    </div>
                    <div className="pt-4 flex justify-end">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating AI Feature Card */}
            <div 
              className="absolute -bottom-4 -right-4 bg-white dark:bg-card p-4 rounded-lg shadow-lg border flex items-center gap-3 animate-fade-in" 
              style={{ animationDelay: "0.5s" }}
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">AI-powered suggestions</p>
                <p className="text-xs text-muted-foreground">Optimize your resume content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
