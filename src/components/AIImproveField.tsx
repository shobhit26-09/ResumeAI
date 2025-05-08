
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Wand2, Loader2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIImproveFieldProps {
  value: string;
  onChange: (value: string) => void;
  fieldName: string;
  fieldType: "input" | "textarea";
  placeholder?: string;
  className?: string;
}

export default function AIImproveField({
  value,
  onChange,
  fieldName,
  fieldType = "input",
  placeholder = "",
  className = "",
}: AIImproveFieldProps) {
  const [isImproving, setIsImproving] = useState(false);
  const [improvedText, setImprovedText] = useState("");
  const [showImprovedText, setShowImprovedText] = useState(false);
  const { toast } = useToast();

  const handleImproveWithAI = async () => {
    if (!value.trim()) {
      toast({
        title: "Cannot improve empty content",
        description: "Please write something first before using AI to improve it.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsImproving(true);
      
      // Generate context-specific prompt based on field name
      const prompt = generatePromptForField(fieldName, value);
      
      // Call the Gemini API using the API key
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=AIzaSyAEvHNa-fRhkLRnEyLHhR2Cp9t8memXYSg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to improve text");
      }

      const improvedContent = data.candidates[0]?.content?.parts[0]?.text || "";
      
      setImprovedText(improvedContent);
      setShowImprovedText(true);
      
      toast({
        title: "AI Improvement Ready",
        description: "Review and apply the suggested improvement.",
      });
    } catch (error) {
      console.error("Error improving text:", error);
      toast({
        title: "Failed to improve text",
        description: "There was a problem connecting to the AI service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImproving(false);
    }
  };

  const generatePromptForField = (fieldName: string, content: string): string => {
    let contextPrompt = "";
    
    switch(fieldName.toLowerCase()) {
      case "summary":
        contextPrompt = `Improve this professional summary to be more compelling and highlight key strengths. Make it concise, professional, and tailored for a resume (max 3-4 sentences):`;
        break;
      case "position":
      case "title":
        contextPrompt = `Improve this job title to be more professional and impactful while maintaining accuracy:`;
        break;
      case "description":
        if (fieldName.includes("experience")) {
          contextPrompt = `Improve this job description to highlight achievements and impact. Use strong action verbs and quantify results where possible:`;
        } else if (fieldName.includes("education")) {
          contextPrompt = `Improve this education description to highlight relevant coursework, achievements, or projects:`;
        } else {
          contextPrompt = `Improve this description to be more professional and concise:`;
        }
        break;
      default:
        contextPrompt = `Improve the following text to be more professional and effective for a resume:`;
    }
    
    return `${contextPrompt}\n\n"${content}"\n\nProvide ONLY the improved text without any explanations, comments, or quotation marks. Maintain the same general length.`;
  };

  const applyImprovement = () => {
    onChange(improvedText);
    setShowImprovedText(false);
    toast({
      title: "Improvement applied",
      description: "The AI-improved text has been applied to your resume.",
    });
  };

  const cancelImprovement = () => {
    setShowImprovedText(false);
  };

  // Render the component with the improved text preview when available
  return (
    <div className="relative">
      {fieldType === "input" ? (
        <div className="flex">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`${className} flex-1`}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="ml-2"
            onClick={handleImproveWithAI}
            disabled={isImproving || !value.trim()}
          >
            {isImproving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={className}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={handleImproveWithAI}
            disabled={isImproving || !value.trim()}
          >
            {isImproving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {isImproving ? "Improving..." : "Improve with AI"}
          </Button>
        </div>
      )}

      {showImprovedText && (
        <div className="mt-2 p-3 bg-secondary/50 border rounded-md">
          <div className="text-sm font-medium mb-1">AI Suggestion:</div>
          <div className="text-sm mb-2">{improvedText}</div>
          <div className="flex gap-2">
            <Button size="sm" onClick={applyImprovement} className="gap-1">
              <Check className="h-3 w-3" />
              Apply
            </Button>
            <Button size="sm" variant="outline" onClick={cancelImprovement} className="gap-1">
              <X className="h-3 w-3" />
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
