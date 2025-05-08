import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  BriefcaseIcon, 
  GraduationCapIcon, 
  Award, 
  Code, 
  User, 
  Phone, 
  Mail, 
  Link as LinkIcon,
  Plus,
  Trash2,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AIImproveField from "./AIImproveField";
import { AnalysisResultData } from "@/services/analyzerService";

export default function ResumeForm({ updatePreview }) {
  const { toast } = useToast();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResultData | null>(null);

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    updatePreview(formData);
  }, []);

  const handleChange = (section, field, value, index = null) => {
    const newData = { ...formData };
    
    if (index !== null) {
      newData[section][index][field] = value;
    } else if (section === "skills") {
      newData[section][index] = value;
    } else if (section === "certifications") {
      newData[section][index][field] = value;
    } else {
      newData[section] = {
        ...newData[section],
        [field]: value,
      };
    }
    
    setFormData(newData);
    updatePreview(newData);
  };

  const handleArrayChange = (section, index, value) => {
    const newData = { ...formData };
    newData[section][index] = value;
    setFormData(newData);
    updatePreview(newData);
  };

  const handleCertificationChange = (index, field, value) => {
    const newData = { ...formData };
    newData.certifications[index][field] = value;
    setFormData(newData);
    updatePreview(newData);
  };

  const addItem = (section) => {
    const newData = { ...formData };
    
    if (section === "experience") {
      newData.experience = [
        ...newData.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ];
    } else if (section === "education") {
      newData.education = [
        ...newData.education,
        {
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ];
    } else if (section === "skills") {
      newData[section] = [...newData[section], ""];
    } else if (section === "certifications") {
      newData.certifications = [...newData.certifications, {
        name: "",
        url: ""
      }];
    }
    
    setFormData(newData);
    updatePreview(newData);
  };

  const removeItem = (section, index) => {
    const newData = { ...formData };
    newData[section].splice(index, 1);
    setFormData(newData);
    updatePreview(newData);
  };

  const handleCurrentJobToggle = (index, checked) => {
    const newData = { ...formData };
    newData.experience[index].current = checked;
    if (checked) {
      newData.experience[index].endDate = "";
    }
    setFormData(newData);
    updatePreview(newData);
  };

  const saveResume = () => {
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully.",
    });
  };

  const handleAnalysisComplete = (results: AnalysisResultData) => {
    setAnalysisResults(results);
    setShowAnalysis(true);
  };

  const handleCloseAnalysis = () => {
    setShowAnalysis(false);
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Build Your Resume</h2>
        <div className="flex gap-2">
          <Button onClick={saveResume}>Save Resume</Button>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="personal" className="flex gap-2 items-center">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex gap-2 items-center">
            <BriefcaseIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Experience</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex gap-2 items-center">
            <GraduationCapIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Education</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex gap-2 items-center">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <AIImproveField
                value={formData.personalInfo.name}
                onChange={(value) => handleChange("personalInfo", "name", value)}
                fieldName="name"
                fieldType="input"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Professional Title</label>
              <AIImproveField
                value={formData.personalInfo.title}
                onChange={(value) => handleChange("personalInfo", "title", value)}
                fieldName="title"
                fieldType="input"
                placeholder="Frontend Developer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="john@example.com"
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleChange("personalInfo", "email", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="(123) 456-7890"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleChange("personalInfo", "phone", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Website</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="www.johndoe.com"
                  value={formData.personalInfo.website}
                  onChange={(e) => handleChange("personalInfo", "website", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Professional Summary</label>
            <AIImproveField
              value={formData.personalInfo.summary}
              onChange={(value) => handleChange("personalInfo", "summary", value)}
              fieldName="summary"
              fieldType="textarea"
              placeholder="Write a professional summary..."
              className="min-h-[120px]"
            />
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6 animate-fade-in">
          {formData.experience.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4 relative">
              <div className="absolute top-4 right-4">
                {formData.experience.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem("experience", index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
              
              <h3 className="font-medium">Experience #{index + 1}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Company</label>
                  <Input
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) =>
                      handleChange("experience", "company", e.target.value, index)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Position</label>
                  <AIImproveField
                    value={exp.position}
                    onChange={(value) => handleChange("experience", "position", value, index)}
                    fieldName="experience-position"
                    fieldType="input"
                    placeholder="Your Position"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Date</label>
                  <Input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleChange("experience", "startDate", e.target.value, index)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleChange("experience", "endDate", e.target.value, index)
                    }
                    disabled={exp.current}
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox 
                      id={`current-job-${index}`}
                      checked={exp.current}
                      onCheckedChange={(checked) => 
                        handleCurrentJobToggle(index, checked === true)
                      }
                    />
                    <Label htmlFor={`current-job-${index}`}>Current position</Label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <AIImproveField
                  value={exp.description}
                  onChange={(value) => handleChange("experience", "description", value, index)}
                  fieldName="experience-description"
                  fieldType="textarea"
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-[120px]"
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => addItem("experience")}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Experience
          </Button>
        </TabsContent>

        <TabsContent value="education" className="space-y-6 animate-fade-in">
          {formData.education.map((edu, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4 relative">
              <div className="absolute top-4 right-4">
                {formData.education.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem("education", index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
              
              <h3 className="font-medium">Education #{index + 1}</h3>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Institution</label>
                <AIImproveField
                  value={edu.institution}
                  onChange={(value) => handleChange("education", "institution", value, index)}
                  fieldName="education-institution"
                  fieldType="input"
                  placeholder="University Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Degree</label>
                  <AIImproveField
                    value={edu.degree}
                    onChange={(value) => handleChange("education", "degree", value, index)}
                    fieldName="education-degree"
                    fieldType="input"
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Field of Study</label>
                  <AIImproveField
                    value={edu.field}
                    onChange={(value) => handleChange("education", "field", value, index)}
                    fieldName="education-field"
                    fieldType="input"
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Date</label>
                  <Input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleChange("education", "startDate", e.target.value, index)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <Input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleChange("education", "endDate", e.target.value, index)
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <AIImproveField
                  value={edu.description}
                  onChange={(value) => handleChange("education", "description", value, index)}
                  fieldName="education-description"
                  fieldType="textarea"
                  placeholder="Additional information about your education..."
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => addItem("education")}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Education
          </Button>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6 animate-fade-in">
          <div className="p-4 border rounded-lg space-y-4">
            <h3 className="font-medium">Skills</h3>
            <div className="space-y-3">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <AIImproveField
                    value={skill}
                    onChange={(value) => handleArrayChange("skills", index, value)}
                    fieldName="skill"
                    fieldType="input"
                    placeholder="e.g. JavaScript, Project Management, etc."
                  />
                  {formData.skills.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("skills", index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => addItem("skills")}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Skill
            </Button>
          </div>

          <div className="p-4 border rounded-lg space-y-4">
            <h3 className="font-medium">Certifications & Awards</h3>
            <div className="space-y-3">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex gap-2">
                    <AIImproveField
                      value={cert.name}
                      onChange={(value) => handleCertificationChange(index, "name", value)}
                      fieldName="certification-name"
                      fieldType="input"
                      placeholder="e.g. AWS Certified Developer"
                    />
                    {formData.certifications.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem("certifications", index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 relative">
                      <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="https://certification-url.com"
                        value={cert.url}
                        onChange={(e) => handleCertificationChange(index, "url", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => addItem("certifications")}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Certification
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
