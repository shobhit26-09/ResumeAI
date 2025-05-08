
import { useState } from "react";
import { format } from "date-fns";
import { Clock, BarChart4, Save, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SavedAnalysis, deleteSavedAnalysis } from "@/services/analyzerService";
import { useToast } from "@/hooks/use-toast";

interface SavedAnalysesProps {
  savedAnalyses: SavedAnalysis[];
  onAnalysisSelect: (analysis: SavedAnalysis) => void;
  onDeleteAnalysis: (id: string) => void;
  currentAnalysisId?: string;
}

export default function SavedAnalyses({
  savedAnalyses,
  onAnalysisSelect,
  onDeleteAnalysis,
  currentAnalysisId
}: SavedAnalysesProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteAnalysis(id);
    toast({
      title: "Analysis deleted",
      description: "The saved analysis has been removed",
    });
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          View Saved Analyses
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Saved Resume Analyses
          </DialogTitle>
        </DialogHeader>
        
        {savedAnalyses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <BarChart4 className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No saved analyses yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Analyses will be saved automatically when you analyze a resume
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {savedAnalyses.map((analysis) => (
                <Card 
                  key={analysis.id} 
                  className={`cursor-pointer hover:border-primary/50 transition-colors ${
                    currentAnalysisId === analysis.id ? "border-primary/70 bg-primary/5" : ""
                  }`}
                  onClick={() => {
                    onAnalysisSelect(analysis);
                    setIsDialogOpen(false);
                  }}
                >
                  <CardHeader className="py-3 px-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {analysis.filename}
                        </CardTitle>
                        <CardDescription className="text-xs flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {format(new Date(analysis.timestamp), "MMM d, yyyy 'at' h:mm a")}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`text-lg font-bold ${scoreColor(analysis.overallScore)}`}>
                          {analysis.overallScore}/100
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={(e) => handleDelete(analysis.id, e)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-0 px-4 pb-3">
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAnalysisSelect(analysis);
                          setIsDialogOpen(false);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
