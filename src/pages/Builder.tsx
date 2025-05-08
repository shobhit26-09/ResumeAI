
import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Builder() {
  const { isSignedIn } = useUser();
  const { toast } = useToast();
  const resumeRef = useRef(null);
  
  const [resumeData, setResumeData] = useState(() => {
    const templateData = sessionStorage.getItem("selectedTemplate");
    if (templateData) {
      sessionStorage.removeItem("selectedTemplate");
      return JSON.parse(templateData);
    }
    
    return {
      personalInfo: {
        name: "",
        title: "",
        email: "",
        phone: "",
        website: "",
        summary: "",
      },
      experience: [
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
      education: [
        {
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      skills: [""],
      certifications: [{
        name: "",
        url: ""
      }],
    };
  });

  const updatePreview = (data) => {
    setResumeData(data);
  };

  const handleDownload = async () => {
    if (!resumeRef.current) {
      toast({
        title: "Error",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we generate your resume...",
      });

      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.personalInfo.name || 'resume'}.pdf`);
      
      toast({
        title: "Resume downloaded",
        description: "Your resume has been downloaded as a PDF",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "There was a problem generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <ResumeForm updatePreview={updatePreview} />
            </div>

            <div className="w-full lg:w-1/2 sticky top-24 h-fit">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Preview</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden shadow-sm" ref={resumeRef}>
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
