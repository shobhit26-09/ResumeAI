
import {
  AlertCircle,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  PieChart,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function AnalysisResult({ results }) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!results) {
    return (
      <div className="flex items-center justify-center h-96 border rounded-lg bg-muted/30">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Upload your resume to see analysis</p>
        </div>
      </div>
    );
  }

  const scoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const progressColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="flex-row justify-between items-center pb-2 space-y-0">
            <CardTitle className="text-xl">Resume Analysis</CardTitle>
            <div className={`text-2xl font-bold ${scoreColor(results.overallScore)}`}>
              {results.overallScore}/100
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Overall Score</span>
                <span className="text-sm font-medium">{results.overallScore}%</span>
              </div>
              <Progress
                value={results.overallScore}
                className="h-2"
                indicatorClassName={progressColor(results.overallScore)}
              />
            </div>

            <div className="space-y-4">
              {Object.entries(results.sections).map(([key, section]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm capitalize">{key}</span>
                    <span className={`text-sm font-medium ${scoreColor(section.score)}`}>
                      {section.score}%
                    </span>
                  </div>
                  <Progress
                    value={section.score}
                    className="h-1.5"
                    indicatorClassName={progressColor(section.score)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Insights</CardTitle>
            <CardDescription>Areas to focus on improving</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.keyInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2">
                {insight.type === "positive" ? (
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                ) : insight.type === "warning" ? (
                  <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                )}
                <p className="text-sm">{insight.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Recommendations</CardTitle>
          <CardDescription>Detailed suggestions for improvement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
            {results.recommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex gap-3 items-start">
                  {rec.category === "content" ? (
                    <FileText className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  ) : rec.category === "keywords" ? (
                    <Target className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  ) : rec.category === "formatting" ? (
                    <PieChart className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                    {rec.examples && (
                      <div className="mt-2 pl-4 border-l-2 border-muted">
                        <span className="text-xs font-medium">Example:</span>
                        <p className="text-sm italic">{rec.examples}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <CollapsibleContent className="space-y-4">
              {results.recommendations.slice(3).map((rec, index) => (
                <div key={index + 3} className="p-4 border rounded-lg">
                  <div className="flex gap-3 items-start">
                    {rec.category === "content" ? (
                      <FileText className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    ) : rec.category === "keywords" ? (
                      <Target className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                    ) : rec.category === "formatting" ? (
                      <PieChart className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                    ) : (
                      <Sparkles className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-medium text-sm">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      {rec.examples && (
                        <div className="mt-2 pl-4 border-l-2 border-muted">
                          <span className="text-xs font-medium">Example:</span>
                          <p className="text-sm italic">{rec.examples}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CollapsibleContent>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center mx-auto"
            >
              {isOpen ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" /> Show More
                </>
              )}
            </Button>
          </Collapsible>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ATS Compatibility</CardTitle>
          <CardDescription>How well your resume performs with Applicant Tracking Systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg flex flex-col items-center">
              <div className={`text-2xl font-bold mb-2 ${scoreColor(results.atsScores.readability)}`}>
                {results.atsScores.readability}%
              </div>
              <p className="text-sm text-center">Readability</p>
            </div>
            <div className="p-4 border rounded-lg flex flex-col items-center">
              <div className={`text-2xl font-bold mb-2 ${scoreColor(results.atsScores.keywords)}`}>
                {results.atsScores.keywords}%
              </div>
              <p className="text-sm text-center">Keyword Matching</p>
            </div>
            <div className="p-4 border rounded-lg flex flex-col items-center">
              <div className={`text-2xl font-bold mb-2 ${scoreColor(results.atsScores.formatting)}`}>
                {results.atsScores.formatting}%
              </div>
              <p className="text-sm text-center">Formatting</p>
            </div>
          </div>

          <div className="mt-4 p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              Industry Keywords Detected
            </h4>
            <div className="flex flex-wrap gap-2">
              {results.detectedKeywords.map((keyword, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-primary/10 rounded-md">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
