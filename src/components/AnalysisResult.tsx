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
  Filter,
  BarChart4,
  BookText,
  BookMarked,
  BarChart,
  LayoutDashboard,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnalysisResultData, Insight, Recommendation } from "@/services/analyzerService";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisResultProps {
  results: AnalysisResultData | null;
}

export default function AnalysisResult({ results }: AnalysisResultProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  if (!results) {
    return (
      <div className="flex items-center justify-center h-96 border rounded-lg bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 shadow-sm">
        <div className="text-center space-y-3">
          <BarChart4 className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <p className="text-lg text-muted-foreground">Upload your resume to see analysis</p>
          <p className="text-sm text-muted-foreground/70">
            Get AI-powered insights and recommendations
          </p>
        </div>
      </div>
    );
  }

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-500 dark:text-green-400";
    if (score >= 60) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  const progressColor = (score: number) => {
    if (score >= 80) return "bg-green-500 dark:bg-green-400";
    if (score >= 60) return "bg-yellow-500 dark:bg-yellow-400";
    return "bg-red-500 dark:bg-red-400";
  };
  
  const scoreGradient = (score: number) => {
    if (score >= 80) return "bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500";
    if (score >= 60) return "bg-gradient-to-r from-amber-500 to-yellow-600 dark:from-amber-400 dark:to-yellow-500";
    return "bg-gradient-to-r from-red-500 to-rose-600 dark:from-red-400 dark:to-rose-500";
  };

  const filteredRecommendations = activeFilter 
    ? results.recommendations.filter(rec => rec.category === activeFilter)
    : results.recommendations;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto bg-indigo-50 dark:bg-indigo-950">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <LayoutDashboard className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Lightbulb className="h-4 w-4" />
            <span>Insights</span>
          </TabsTrigger>
          <TabsTrigger value="ats" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <TrendingUp className="h-4 w-4" />
            <span>ATS Score</span>
          </TabsTrigger>
        </TabsList>
      
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-1 md:col-span-2 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex-row justify-between items-center pb-2 space-y-0 border-b dark:border-gray-700">
                <CardTitle className="text-xl flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                  Resume Analysis
                </CardTitle>
                <div className={`text-2xl font-bold ${scoreColor(results.overallScore)}`}>
                  {results.overallScore}/100
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span className="text-sm font-medium">{results.overallScore}%</span>
                  </div>
                  <Progress
                    value={results.overallScore}
                    className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700"
                    indicatorClassName={`${scoreGradient(results.overallScore)} rounded-full`}
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
                        className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700"
                        indicatorClassName={`${scoreGradient(section.score)} rounded-full`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-muted/50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookText className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                  Key Insights
                </CardTitle>
                <CardDescription>Areas to focus on improving</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.keyInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 hover:bg-muted/50 dark:hover:bg-gray-700/50 rounded-md transition-colors">
                    {insight.type === "positive" ? (
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                    ) : insight.type === "warning" ? (
                      <AlertCircle className="h-5 w-5 text-yellow-500 dark:text-yellow-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm">{insight.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex-row justify-between items-center border-b dark:border-gray-700">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Detailed suggestions for improvement</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeFilter === null ? "secondary" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveFilter(null)}
                  className="flex items-center gap-1.5 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  <Filter className="h-3.5 w-3.5" />
                  All
                </Button>
                <Button 
                  variant={activeFilter === "content" ? "secondary" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveFilter("content")}
                  className="flex items-center gap-1.5 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  <FileText className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                  Content
                </Button>
                <Button 
                  variant={activeFilter === "keywords" ? "secondary" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveFilter("keywords")}
                  className="flex items-center gap-1.5 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  <Target className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
                  Keywords
                </Button>
                <Button 
                  variant={activeFilter === "formatting" ? "secondary" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveFilter("formatting")}
                  className="flex items-center gap-1.5 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  <PieChart className="h-3.5 w-3.5 text-orange-500 dark:text-orange-400" />
                  Formatting
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
                {filteredRecommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all bg-gradient-to-r from-card to-muted/30 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
                    <div className="flex gap-3 items-start">
                      {rec.category === "content" ? (
                        <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                      ) : rec.category === "keywords" ? (
                        <Target className="h-5 w-5 text-purple-500 dark:text-purple-400 shrink-0 mt-0.5" />
                      ) : rec.category === "formatting" ? (
                        <PieChart className="h-5 w-5 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                      ) : (
                        <Sparkles className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium text-sm">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                        {rec.examples && (
                          <div className="mt-2 pl-4 border-l-2 border-indigo-500/20 dark:border-indigo-400/20">
                            <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">Example:</span>
                            <p className="text-sm italic">{rec.examples}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <CollapsibleContent className="space-y-4">
                  {filteredRecommendations.slice(3).map((rec, index) => (
                    <div key={index + 3} className="p-4 border rounded-lg hover:shadow-md transition-all bg-gradient-to-r from-card to-muted/30 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
                      <div className="flex gap-3 items-start">
                        {rec.category === "content" ? (
                          <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                        ) : rec.category === "keywords" ? (
                          <Target className="h-5 w-5 text-purple-500 dark:text-purple-400 shrink-0 mt-0.5" />
                        ) : rec.category === "formatting" ? (
                          <PieChart className="h-5 w-5 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                        ) : (
                          <Sparkles className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h4 className="font-medium text-sm">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                          {rec.examples && (
                            <div className="mt-2 pl-4 border-l-2 border-indigo-500/20 dark:border-indigo-400/20">
                              <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">Example:</span>
                              <p className="text-sm italic">{rec.examples}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>

                {filteredRecommendations.length > 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center mx-auto dark:text-gray-300 dark:hover:text-white"
                  >
                    {isOpen ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" /> Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" /> Show More Recommendations
                      </>
                    )}
                  </Button>
                )}
              </Collapsible>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ats" className="space-y-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                ATS Compatibility
              </CardTitle>
              <CardDescription>How well your resume performs with Applicant Tracking Systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg flex flex-col items-center bg-gradient-to-br from-card to-muted/50 shadow-sm dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
                  <div className={`text-3xl font-bold mb-2 ${scoreColor(results.atsScores.readability)}`}>
                    {results.atsScores.readability}%
                  </div>
                  <Progress
                    value={results.atsScores.readability}
                    className="h-1.5 w-full max-w-32 mb-2 rounded-full bg-gray-200 dark:bg-gray-700"
                    indicatorClassName={`${progressColor(results.atsScores.readability)} rounded-full`}
                  />
                  <p className="text-sm text-center font-medium">Readability</p>
                </div>
                <div className="p-4 border rounded-lg flex flex-col items-center bg-gradient-to-br from-card to-muted/50 shadow-sm dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
                  <div className={`text-3xl font-bold mb-2 ${scoreColor(results.atsScores.keywords)}`}>
                    {results.atsScores.keywords}%
                  </div>
                  <Progress
                    value={results.atsScores.keywords}
                    className="h-1.5 w-full max-w-32 mb-2 rounded-full bg-gray-200 dark:bg-gray-700"
                    indicatorClassName={`${progressColor(results.atsScores.keywords)} rounded-full`}
                  />
                  <p className="text-sm text-center font-medium">Keyword Matching</p>
                </div>
                <div className="p-4 border rounded-lg flex flex-col items-center bg-gradient-to-br from-card to-muted/50 shadow-sm dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
                  <div className={`text-3xl font-bold mb-2 ${scoreColor(results.atsScores.formatting)}`}>
                    {results.atsScores.formatting}%
                  </div>
                  <Progress
                    value={results.atsScores.formatting}
                    className="h-1.5 w-full max-w-32 mb-2 rounded-full bg-gray-200 dark:bg-gray-700"
                    indicatorClassName={`${progressColor(results.atsScores.formatting)} rounded-full`}
                  />
                  <p className="text-sm text-center font-medium">Formatting</p>
                </div>
              </div>

              <div className="mt-6 p-5 border rounded-lg bg-gradient-to-r from-card to-muted/30 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                  Industry Keywords Detected
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.detectedKeywords.length > 0 ? (
                    results.detectedKeywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700">
                        {keyword}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No relevant keywords detected</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
