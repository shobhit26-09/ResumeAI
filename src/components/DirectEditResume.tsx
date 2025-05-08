
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DirectEditResumeProps {
  template: any;
  onSave: (updatedData: any) => void;
}

const DirectEditResume = ({ template, onSave }: DirectEditResumeProps) => {
  const [resumeData, setResumeData] = useState(template.prefilledData);
  const resumeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Enable content editable for specific elements
  useEffect(() => {
    if (resumeRef.current) {
      const editableElements = resumeRef.current.querySelectorAll('.editable');
      editableElements.forEach(element => {
        element.setAttribute('contenteditable', 'true');
        element.classList.add('hover:bg-blue-50', 'focus:bg-blue-50', 'focus:outline-none', 'px-1', 'transition-colors', 'rounded', 'dark:hover:bg-blue-900/30', 'dark:focus:bg-blue-900/30');
      });
    }
  }, [resumeRef.current]);

  // Handle content changes
  const handleContentChange = () => {
    if (!resumeRef.current) return;

    const newData = { ...resumeData };
    
    // Personal info
    const nameElement = resumeRef.current.querySelector('[data-field="name"]');
    if (nameElement) newData.personalInfo.name = nameElement.textContent || '';
    
    const titleElement = resumeRef.current.querySelector('[data-field="title"]');
    if (titleElement) newData.personalInfo.title = titleElement.textContent || '';
    
    const summaryElement = resumeRef.current.querySelector('[data-field="summary"]');
    if (summaryElement) newData.personalInfo.summary = summaryElement.textContent || '';
    
    const emailElement = resumeRef.current.querySelector('[data-field="email"]');
    if (emailElement) newData.personalInfo.email = emailElement.textContent || '';
    
    const phoneElement = resumeRef.current.querySelector('[data-field="phone"]');
    if (phoneElement) newData.personalInfo.phone = phoneElement.textContent || '';
    
    const websiteElement = resumeRef.current.querySelector('[data-field="website"]');
    if (websiteElement) newData.personalInfo.website = websiteElement.textContent || '';
    
    // Experience - more complex, would need to handle multiple entries
    const experienceElements = resumeRef.current.querySelectorAll('[data-section="experience"]');
    experienceElements.forEach((expElement, index) => {
      if (index >= newData.experience.length) return;
      
      const positionEl = expElement.querySelector('[data-field="position"]');
      if (positionEl) newData.experience[index].position = positionEl.textContent || '';
      
      const companyEl = expElement.querySelector('[data-field="company"]');
      if (companyEl) newData.experience[index].company = companyEl.textContent || '';
      
      const descriptionEl = expElement.querySelector('[data-field="description"]');
      if (descriptionEl) newData.experience[index].description = descriptionEl.textContent || '';
    });
    
    // Education
    const educationElements = resumeRef.current.querySelectorAll('[data-section="education"]');
    educationElements.forEach((eduElement, index) => {
      if (index >= newData.education.length) return;
      
      const institutionEl = eduElement.querySelector('[data-field="institution"]');
      if (institutionEl) newData.education[index].institution = institutionEl.textContent || '';
      
      const degreeEl = eduElement.querySelector('[data-field="degree"]');
      if (degreeEl) newData.education[index].degree = degreeEl.textContent || '';
      
      const fieldEl = eduElement.querySelector('[data-field="field"]');
      if (fieldEl) newData.education[index].field = fieldEl.textContent || '';
      
      const descriptionEl = eduElement.querySelector('[data-field="description"]');
      if (descriptionEl) newData.education[index].description = descriptionEl.textContent || '';
    });
    
    // Skills
    const skillElements = resumeRef.current.querySelectorAll('[data-field="skill"]');
    const skills: string[] = [];
    skillElements.forEach(skillEl => {
      skills.push(skillEl.textContent || '');
    });
    newData.skills = skills.filter(skill => skill.trim() !== '');
    
    // Certifications
    const certElements = resumeRef.current.querySelectorAll('[data-section="certification"]');
    certElements.forEach((certElement, index) => {
      if (index >= newData.certifications.length) return;
      
      const nameEl = certElement.querySelector('[data-field="name"]');
      if (nameEl) newData.certifications[index].name = nameEl.textContent || '';
    });
    
    setResumeData(newData);
    onSave(newData);
  };

  const handleSave = () => {
    handleContentChange();
    toast({
      title: "Changes saved",
      description: "Your resume has been updated",
    });
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

      // Temporarily remove contenteditable and styling for clean PDF
      const editableElements = resumeRef.current.querySelectorAll('.editable');
      editableElements.forEach(element => {
        element.removeAttribute('contenteditable');
        element.classList.remove('hover:bg-blue-50', 'focus:bg-blue-50', 'dark:hover:bg-blue-900/30', 'dark:focus:bg-blue-900/30');
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
      
      // Restore contenteditable and styling
      editableElements.forEach(element => {
        element.setAttribute('contenteditable', 'true');
        element.classList.add('hover:bg-blue-50', 'focus:bg-blue-50', 'dark:hover:bg-blue-900/30', 'dark:focus:bg-blue-900/30');
      });
      
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b p-4 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">Click on any text to edit</h3>
          <p className="text-xs text-muted-foreground">Directly edit your resume on the page</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="p-8 w-full bg-white dark:bg-gray-900" ref={resumeRef} onBlur={handleContentChange}>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 editable text-black dark:text-white" data-field="name">
            {resumeData.personalInfo?.name || 'Your Name'}
          </h1>
          <h2 className="text-lg text-gray-700 dark:text-gray-300 mb-3 editable" data-field="title">
            {resumeData.personalInfo?.title || 'Professional Title'}
          </h2>
          
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span className="editable" data-field="email">{resumeData.personalInfo?.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="editable" data-field="phone">{resumeData.personalInfo?.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="editable" data-field="website">{resumeData.personalInfo?.website}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h3 className="text-md font-bold border-b pb-1 mb-2 text-black dark:text-white">Professional Summary</h3>
          <p className="text-sm editable text-gray-800 dark:text-gray-300" data-field="summary">{resumeData.personalInfo?.summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h3 className="text-md font-bold border-b pb-1 mb-2 text-black dark:text-white">Experience</h3>
          
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4" data-section="experience">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold editable text-black dark:text-white" data-field="position">{exp.position}</h4>
                  <h5 className="text-sm editable text-gray-700 dark:text-gray-300" data-field="company">{exp.company}</h5>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
              </div>
              <p className="text-xs mt-1 editable text-gray-800 dark:text-gray-300" data-field="description">{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="text-md font-bold border-b pb-1 mb-2 text-black dark:text-white">Education</h3>
          
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4" data-section="education">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold editable text-black dark:text-white" data-field="institution">{edu.institution}</h4>
                  <h5 className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="editable" data-field="degree">{edu.degree}</span>
                    {edu.field && (
                      <>, <span className="editable" data-field="field">{edu.field}</span></>
                    )}
                  </h5>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
              <p className="text-xs mt-1 editable text-gray-800 dark:text-gray-300" data-field="description">{edu.description}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-md font-bold border-b pb-1 mb-2 text-black dark:text-white">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md editable text-gray-800 dark:text-gray-200"
                data-field="skill"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-md font-bold border-b pb-1 mb-2 text-black dark:text-white">Certifications & Awards</h3>
          <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-300">
            {resumeData.certifications.map((cert, index) => (
              <li key={index} data-section="certification">
                <span className="editable" data-field="name">{cert.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DirectEditResume;
