
import React, { useState } from "react";
import { FileUp, Upload, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onAnalyze: () => Promise<void>;
  file: File | null;
  loading: boolean;
  error: string | null;
  processingStage: string | null;
}

export default function FileUpload({ 
  onFileSelect, 
  onAnalyze, 
  file, 
  loading, 
  error,
  processingStage 
}: FileUploadProps) {
  const { toast } = useToast();
  const [localLoading, setLocalLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Show toast for PDF files to set expectations
      if (selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf')) {
        toast({
          title: "PDF file detected",
          description: "PDF processing may take a moment for best results",
        });
      }
      
      onFileSelect(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a resume file to analyze",
        variant: "destructive",
      });
      return;
    }
    
    setLocalLoading(true);
    try {
      await onAnalyze();
    } finally {
      setLocalLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.name.toLowerCase().endsWith('.pdf') ||
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
          selectedFile.name.toLowerCase().endsWith('.docx') ||
          selectedFile.type === 'application/msword' || 
          selectedFile.name.toLowerCase().endsWith('.doc') ||
          selectedFile.type === 'text/plain' || 
          selectedFile.name.toLowerCase().endsWith('.txt')) {
            
        if (selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf')) {
          toast({
            title: "PDF file detected",
            description: "PDF processing may take a moment for best results",
          });
        }
        
        onFileSelect(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, DOCX, or TXT file",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="mb-8 p-8 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all dark:bg-gray-800/80 dark:border-gray-700">
      <div className="text-center mb-6">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-400/20 flex items-center justify-center mx-auto mb-3 text-indigo-500 dark:text-indigo-400">
          <FileUp className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-medium mb-2">Upload Your Resume</h2>
        <p className="text-muted-foreground">
          Upload your resume in PDF, DOC, DOCX, or TXT format for best results
        </p>
      </div>

      <div 
        className={`p-6 border-2 border-dashed rounded-lg mb-6 transition-all text-center ${
          dragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-muted'
        } ${file ? 'bg-indigo-500/5' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex items-center gap-2 justify-center">
            <Check className="h-5 w-5 text-green-500" />
            <span className="font-medium">{file.name}</span>
            <span className="text-xs text-muted-foreground">
              ({(file.size / 1024).toFixed(1)} KB)
            </span>
          </div>
        ) : (
          <>
            <p className="mb-2">
              Drag & drop your resume file here, or click to browse
            </p>
            <div className="relative w-full max-w-xs mx-auto">
              <Input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.docx,.doc,.txt"
                className="cursor-pointer opacity-0 absolute inset-0 w-full h-full"
                disabled={loading || localLoading}
              />
              <Button
                variant="outline"
                className="w-full"
                disabled={loading || localLoading}
              >
                Browse files
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
        <Button 
          onClick={handleAnalyze} 
          disabled={!file || loading || localLoading}
          className="w-full shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white"
          size="lg"
        >
          {loading || localLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {processingStage || "Analyzing..."}
            </>
          ) : (
            <>
              Analyze Resume
              <Upload className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {loading && (
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
            <div className={`flex items-center space-x-2 ${processingStage === "Reading file" ? "text-indigo-500 dark:text-indigo-400 font-medium" : ""}`}>
              <div className={`h-2 w-2 rounded-full ${processingStage === "Reading file" ? "bg-indigo-500 dark:bg-indigo-400 animate-pulse" : "bg-muted-foreground"}`}></div>
              <span>Reading file</span>
            </div>
            <div className="hidden sm:block h-0.5 w-6 bg-muted"></div>
            <div className={`flex items-center space-x-2 ${processingStage === "Extracting text" ? "text-indigo-500 dark:text-indigo-400 font-medium" : ""}`}>
              <div className={`h-2 w-2 rounded-full ${processingStage === "Extracting text" ? "bg-indigo-500 dark:bg-indigo-400 animate-pulse" : "bg-muted-foreground"}`}></div>
              <span>Extracting text</span>
            </div>
            <div className="hidden sm:block h-0.5 w-6 bg-muted"></div>
            <div className={`flex items-center space-x-2 ${processingStage === "Analyzing with AI" ? "text-indigo-500 dark:text-indigo-400 font-medium" : ""}`}>
              <div className={`h-2 w-2 rounded-full ${processingStage === "Analyzing with AI" ? "bg-indigo-500 dark:bg-indigo-400 animate-pulse" : "bg-muted-foreground"}`}></div>
              <span>AI analysis</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
