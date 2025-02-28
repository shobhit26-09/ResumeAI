
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
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
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const resumeRef = useRef(null);
  const [resumeData, setResumeData] = useState({
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
  });

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  // If still loading auth state, show loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If no user ID after loading, don't render the page
  if (!userId) {
    return null;
  }

  const updatePreview = (data) => {
    console.log("Preview data updated:", data);
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
      
      // Calculate dimensions for PDF (A4 format)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210; // A4 width in mm
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
