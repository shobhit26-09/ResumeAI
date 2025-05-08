
import { useState } from "react";
import { X, CheckCircle, AlertTriangle, XCircle, MessageSquare, Award, BarChart } from "lucide-react";
import {
  AnalysisResultData,
  Insight,
  Recommendation
} from "@/services/analyzerService";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface AIAnalysisResultsProps {
  results: AnalysisResultData | null;
  onClose: () => void;
}

export default function AIAnalysisResults({ results, onClose }: AIAnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!results) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />;
      case "negative":
        return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
      default:
        return <MessageSquare className="h-5 w-5 text-blue-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="w-full bg-white border rounded-lg p-6 shadow-md relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">AI Resume Analysis</h2>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">
              <span className={getScoreColor(results.overallScore)}>{results.overallScore}</span>/100
            </span>
            <Award className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <Progress value={results.overallScore} className={getProgressColor(results.overallScore)} />
        <p className="text-sm text-gray-500 mt-2">
          Overall resume score based on content, formatting, keywords, and relevance
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(results.sections).map(([key, section]) => (
              <div key={key} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium capitalize">{key}</h3>
                  <span className={`font-bold ${getScoreColor(section.score)}`}>
                    {section.score}/100
                  </span>
                </div>
                <Progress value={section.score} className={getProgressColor(section.score)} />
              </div>
            ))}
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-3">ATS Compatibility</h3>
            <div className="space-y-3">
              {Object.entries(results.atsScores).map(([key, score]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs capitalize">{key}</span>
                    <span className={`text-xs font-medium ${getScoreColor(score)}`}>
                      {score}/100
                    </span>
                  </div>
                  <Progress value={score} className={getProgressColor(score)} />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-4">
            {results.keyInsights.map((insight: Insight, index: number) => (
              <div key={index} className="flex gap-3 p-3 border rounded-lg">
                {getInsightIcon(insight.type)}
                <div>
                  <p className="text-sm">{insight.text}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-4">
            {results.recommendations.map((recommendation: Recommendation, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-1">{recommendation.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{recommendation.description}</p>
                {recommendation.examples && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs font-medium text-gray-500 mb-1">Example</p>
                    <p className="text-sm">{recommendation.examples}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="keywords">
          <div>
            <h3 className="text-sm font-medium mb-3">Detected Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {results.detectedKeywords.length > 0 ? (
                results.detectedKeywords.map((keyword: string, index: number) => (
                  <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md">
                    {keyword}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">No keywords detected</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
