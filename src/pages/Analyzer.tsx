
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileUp, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnalysisResult from "@/components/AnalysisResult";
import { useToast } from "@/hooks/use-toast";

export default function Analyzer() {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a resume file to analyze",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false);
      
      // Mock analysis results
      setResults({
        overallScore: 76,
        sections: {
          content: { score: 82 },
          formatting: { score: 68 },
          keywords: { score: 91 },
          relevance: { score: 63 },
        },
        keyInsights: [
          { type: "positive", text: "Strong professional experience section with quantifiable achievements." },
          { type: "warning", text: "Education section could be more detailed with relevant coursework." },
          { type: "negative", text: "Missing keywords that are commonly found in job descriptions for this role." },
          { type: "positive", text: "Good use of action verbs throughout the resume." },
        ],
        recommendations: [
          {
            category: "content",
            title: "Add more quantifiable achievements",
            description: "Include specific metrics, percentages, or other numerical data to demonstrate your impact.",
            examples: "Instead of 'Increased sales', use 'Increased regional sales by 27% over 6 months'."
          },
          {
            category: "keywords",
            title: "Include more industry-specific keywords",
            description: "Your resume is missing some important keywords that recruiters look for.",
            examples: "Consider adding terms like 'project management', 'agile methodology', or 'data analysis'."
          },
          {
            category: "formatting",
            title: "Improve section organization",
            description: "The structure of your resume could be more clear with better section hierarchy.",
            examples: "Use consistent headings and ensure proper spacing between sections."
          },
          {
            category: "content",
            title: "Strengthen your summary statement",
            description: "Your professional summary should concisely highlight your most relevant experience and skills.",
            examples: "Experienced project manager with 5+ years leading cross-functional teams and delivering enterprise software solutions."
          },
          {
            category: "keywords",
            title: "Tailor skills section to the job",
            description: "Customize your skills section to match the requirements in the job description.",
            examples: "For a marketing role, highlight skills like 'content strategy', 'SEO', and 'campaign management'."
          },
        ],
        atsScores: {
          readability: 85,
          keywords: 72,
          formatting: 90
        },
        detectedKeywords: [
          "React",
          "JavaScript",
          "Product Management",
          "Agile",
          "Team Leadership",
          "UI/UX",
          "Customer Experience",
          "A/B Testing"
        ]
      });

      toast({
        title: "Analysis complete",
        description: "Your resume has been analyzed successfully",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container px-4 py-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-3">Resume Analyzer</h1>
            <p className="text-lg text-muted-foreground">
              Get instant AI-powered insights on how to improve your resume
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="mb-8 p-8 border rounded-lg bg-muted/30">
              <div className="text-center mb-6">
                <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h2 className="text-xl font-medium mb-2">Upload Your Resume</h2>
                <p className="text-muted-foreground">
                  Support file types: PDF, DOCX, or TXT (Max 5MB)
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc,.txt"
                  className="cursor-pointer"
                />
                <Button 
                  onClick={handleUpload} 
                  disabled={!file || loading}
                  className="w-full sm:w-auto"
                >
                  {loading ? "Analyzing..." : "Analyze Resume"}
                  {!loading && <Upload className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>

            <AnalysisResult results={results} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
