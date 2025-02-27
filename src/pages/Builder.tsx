
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Builder() {
  const { toast } = useToast();
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
    certifications: [""],
  });

  const updatePreview = (data) => {
    console.log("Preview data updated:", data);
    setResumeData(data);
  };

  const handleDownload = () => {
    toast({
      title: "Resume downloaded",
      description: "Your resume has been downloaded as a PDF",
    });
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
              <div className="border rounded-lg overflow-hidden shadow-sm">
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
