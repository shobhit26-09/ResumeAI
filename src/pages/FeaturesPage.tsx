
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Sparkles, Shield, Award, Zap, 
  FileText, PenTool, Download, 
  Search, Clock, Lock 
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered",
      description: "Get intelligent suggestions to improve your resume content and structure."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "ATS-Friendly",
      description: "Ensure your resume passes through applicant tracking systems with optimized formatting."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Professional Templates",
      description: "Choose from our collection of expertly designed and tested resume templates."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Analysis",
      description: "Receive real-time feedback and suggestions as you build your resume."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Multiple Formats",
      description: "Export your resume in various formats including PDF, Word, and plain text."
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Easy Customization",
      description: "Customize every aspect of your resume with our intuitive editor."
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Quick Export",
      description: "Download your resume in seconds, ready for job applications."
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Keyword Optimization",
      description: "Optimize your resume with industry-specific keywords."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Version History",
      description: "Keep track of all your resume versions and changes."
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure Storage",
      description: "Your data is encrypted and securely stored in the cloud."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col dark:bg-gradient-to-b dark:from-background dark:via-background/80 dark:to-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-24">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                Powerful Features
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create professional resumes that stand out and get you hired.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300 hover:bg-background/50 dark:hover:bg-white/5"
                >
                  <div className="mb-6 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
