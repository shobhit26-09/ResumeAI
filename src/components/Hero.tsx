
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";

export default function Hero() {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (userId) {
      navigate("/builder");
    } else {
      navigate("/sign-up");
    }
  };

  const handleAnalyzeResume = () => {
    navigate("/analyzer");
  };

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
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                {userId ? "Create Resume" : "Get Started"}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={handleAnalyzeResume}
              >
                Analyze Resume
              </Button>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-card border rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1644982647711-9129d2ed7ceb?q=80&w=1000" 
                alt="Resume builder preview" 
                className="w-full h-auto object-cover rounded-xl opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-4">
                    <div className="h-8 rounded-md bg-white/30 w-2/3"></div>
                    <div className="space-y-2">
                      <div className="h-4 rounded-md bg-white/30 w-full"></div>
                      <div className="h-4 rounded-md bg-white/30 w-5/6"></div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <div className="h-8 rounded-md bg-white/50 w-1/3"></div>
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
