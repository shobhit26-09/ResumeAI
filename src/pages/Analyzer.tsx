
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileUpload from "@/components/analyzer/FileUpload";
import AnalysisResult from "@/components/AnalysisResult";
import SavedAnalyses from "@/components/SavedAnalyses";
import { useToast } from "@/hooks/use-toast";
import { 
  analyzeResume, 
  extractTextFromFile, 
  AnalysisResultData, 
  saveAnalysisToStorage, 
  getSavedAnalyses, 
  deleteSavedAnalysis, 
  SavedAnalysis 
} from "@/services/analyzerService";

export default function Analyzer() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResultData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [currentSavedAnalysisId, setCurrentSavedAnalysisId] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      const analyses = getSavedAnalyses();
      setSavedAnalyses(analyses);
    } catch (error) {
      console.error("Error loading saved analyses:", error);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResults(null);
    setProcessingStage("Reading file");
    setCurrentSavedAnalysisId(undefined);

    try {
      console.log("Analyzing file:", file.name, "Type:", file.type, "Size:", file.size);
      
      setProcessingStage("Extracting text");
      const fileContent = await extractTextFromFile(file);
      
      if (!fileContent || fileContent.trim().length < 50) {
        throw new Error("Could not extract sufficient text from the file. Please try another file format.");
      }

      setProcessingStage("Analyzing with AI");
      const analysisResults = await analyzeResume(fileContent);
      
      if (!analysisResults) {
        throw new Error("Failed to get analysis results from AI");
      }
      
      const savedAnalysis = saveAnalysisToStorage(analysisResults, file.name);
      
      setResults(analysisResults);
      setProcessingStage(null);
      setCurrentSavedAnalysisId(savedAnalysis.id);
      
      setSavedAnalyses(getSavedAnalyses());
      
      toast({
        title: "Analysis complete",
        description: "Your resume has been analyzed successfully with Gemini AI",
      });
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setError((error as Error).message);
      setProcessingStage(null);
      
      toast({
        title: "Analysis failed",
        description: (error as Error).message || "An error occurred while analyzing your resume",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnalysisSelect = (analysis: SavedAnalysis) => {
    setResults(analysis.results);
    setCurrentSavedAnalysisId(analysis.id);
    setFile(null);
    setError(null);
    
    toast({
      title: "Analysis loaded",
      description: `Loaded analysis for "${analysis.filename}"`,
    });
  };

  const handleDeleteAnalysis = (id: string) => {
    deleteSavedAnalysis(id);
    
    if (id === currentSavedAnalysisId) {
      setResults(null);
      setCurrentSavedAnalysisId(undefined);
    }
    
    setSavedAnalyses(getSavedAnalyses());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 py-8">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h1 className="text-4xl font-bold mb-3 gradient-text">
              Resume Analyzer
            </h1>
            <p className="text-lg text-muted-foreground">
              Get instant AI-powered insights on how to improve your resume
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <SavedAnalyses 
              savedAnalyses={savedAnalyses}
              onAnalysisSelect={handleAnalysisSelect}
              onDeleteAnalysis={handleDeleteAnalysis}
              currentAnalysisId={currentSavedAnalysisId}
            />
          </div>

          <div className="max-w-5xl mx-auto">
            <FileUpload
              onFileSelect={setFile}
              onAnalyze={handleAnalyze}
              file={file}
              loading={loading}
              error={error}
              processingStage={processingStage}
            />

            {results && currentSavedAnalysisId && savedAnalyses.length > 0 && (
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span>
                    Analysis saved on {new Date(savedAnalyses.find(a => a.id === currentSavedAnalysisId)?.timestamp || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <AnalysisResult results={results} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
