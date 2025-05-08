
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, AlertCircle, FileText, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeResume } from "@/services/analyzerService";
import { AnalysisResultData } from "@/services/analyzerService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";

interface AIResumeAnalyzerProps {
  resumeData: any;
  onAnalysisComplete: (results: AnalysisResultData) => void;
}

export default function AIResumeAnalyzer({ resumeData, onAnalysisComplete }: AIResumeAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [extractedTextLength, setExtractedTextLength] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResultData | null>(null);
  const { toast } = useToast();

  const handleAnalyzeResume = async () => {
    try {
      setIsAnalyzing(true);
      setProcessingStage("Generating text from resume data");
      setError(null);
      setExtractedTextLength(null);
      
      // Convert resume data to text format for analysis
      const resumeText = generateResumeText(resumeData);
      setExtractedTextLength(resumeText.length);
      
      // Send to AI for analysis
      setProcessingStage("Running AI analysis");
      const results = await analyzeResume(resumeText);
      
      // Store results in local state
      setAnalysisResults(results);
      
      // Pass results back to parent
      onAnalysisComplete(results);
      
      toast({
        title: "Resume analyzed",
        description: "AI analysis complete. Review the suggestions to improve your resume.",
      });
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setError((error as Error).message);
      toast({
        title: "Analysis failed",
        description: "There was a problem analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setProcessingStage(null);
    }
  };

  // Convert resume data to a text format suitable for AI analysis
  const generateResumeText = (data: any): string => {
    const personalInfo = data.personalInfo;
    let text = `Name: ${personalInfo.name || ''}\n`;
    text += `Title: ${personalInfo.title || ''}\n`;
    text += `Email: ${personalInfo.email || ''}\n`;
    text += `Phone: ${personalInfo.phone || ''}\n`;
    text += `Website: ${personalInfo.website || ''}\n\n`;
    text += `Summary:\n${personalInfo.summary || ''}\n\n`;
    
    text += `EXPERIENCE:\n`;
    data.experience.forEach((exp: any, index: number) => {
      if (exp.company || exp.position) {
        text += `${exp.position} at ${exp.company}\n`;
        text += `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}\n`;
        text += `${exp.description || ''}\n\n`;
      }
    });
    
    text += `EDUCATION:\n`;
    data.education.forEach((edu: any, index: number) => {
      if (edu.institution || edu.degree) {
        text += `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}\n`;
        text += `${edu.institution || ''}\n`;
        text += `${edu.startDate || ''} - ${edu.endDate || ''}\n`;
        text += `${edu.description || ''}\n\n`;
      }
    });
    
    text += `SKILLS:\n`;
    data.skills.filter((s: string) => s).forEach((skill: string) => {
      text += `- ${skill}\n`;
    });
    
    text += `\nCERTIFICATIONS:\n`;
    data.certifications.filter((c: any) => c.name || c.url).forEach((cert: any) => {
      text += `- ${cert.name || ''} ${cert.url ? `(${cert.url})` : ''}\n`;
    });
    
    return text;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Score Display */}
        <Card className="w-full md:w-48 h-48 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-white dark:from-indigo-900/40 dark:to-gray-900/60 shadow-md">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full opacity-30 blur-xl bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
            <div className="relative text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {analysisResults?.overallScore || "53"}
            </div>
          </div>
          <div className="text-sm text-muted-foreground mt-2">OVERALL SCORE</div>
          <div className="flex items-center gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < 3 ? "text-amber-500 fill-amber-500" : "text-amber-500/30"}`} />
            ))}
          </div>
        </Card>

        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"},
            {resumeData?.personalInfo?.name?.split(" ")[0] || "there"}.
          </h2>
          <p className="text-muted-foreground">
            Welcome to your resume review. Let's analyze your resume to help you improve it and stand out from the competition.
          </p>

          <Button 
            onClick={handleAnalyzeResume} 
            disabled={isAnalyzing}
            variant="default"
            className="gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 dark:from-indigo-600 dark:to-purple-600 text-white shadow-md"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {processingStage || "Analyzing..."}
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Analyze Resume with AI
              </>
            )}
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Analysis Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {isAnalyzing && (
        <Card className="p-4 bg-muted/40">
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>{processingStage}</span>
          </div>
          {extractedTextLength !== null && (
            <div className="flex items-center text-xs text-muted-foreground gap-2 mt-2">
              <FileText className="h-3 w-3" />
              <span>{extractedTextLength} characters processed</span>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
