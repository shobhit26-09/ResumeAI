import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Download, FileText, GraduationCap, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DirectEditResume from "@/components/DirectEditResume";

export default function Templates() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("minimalist");

  const templates = [
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Clean and elegant design focusing on readability",
      previewImageUrl: "/placeholder.svg",
      prefilledData: {
        personalInfo: {
          name: "Grace Jackson",
          title: "Senior UX Designer & Product Experience Lead",
          email: "grace.jackson@example.com",
          phone: "(555) 123-4567",
          website: "gracejackson.design",
          summary: "Experienced UX Designer with 8+ years specializing in creating intuitive digital experiences. Proven track record of increasing user engagement and satisfaction through data-driven design decisions.",
        },
        experience: [
          {
            company: "TechVision Studios",
            position: "Senior UX Designer",
            startDate: "2021-01",
            endDate: "",
            current: true,
            description: "Lead designer for enterprise SaaS platform serving 1M+ users. Increased user engagement by 45% through redesigned navigation and workflow optimizations.",
          },
          {
            company: "DesignCraft Inc.",
            position: "UX Designer",
            startDate: "2018-03",
            endDate: "2020-12",
            current: false,
            description: "Spearheaded the redesign of mobile app interface resulting in 60% improvement in user satisfaction scores and 32% decrease in task completion time.",
          }
        ],
        education: [
          {
            institution: "Design Institute of Technology",
            degree: "Master of Arts",
            field: "User Experience Design",
            startDate: "2016-09",
            endDate: "2018-05",
            description: "Focus on human-computer interaction and cognitive psychology in design.",
          }
        ],
        skills: ["User Research", "Wireframing", "Prototyping", "Figma", "Adobe XD", "User Testing", "Design Systems", "Information Architecture", "Accessibility", "Design Thinking"],
        certifications: [
          {
            name: "Google UX Design Professional Certificate",
            url: "https://www.coursera.org/professional-certificates/google-ux-design"
          },
          {
            name: "Certified Usability Analyst (CUA)",
            url: "https://www.humanfactors.com/certification/"
          }
        ],
      }
    },
    {
      id: "professional",
      name: "Professional",
      description: "Modern and impactful layout for senior roles",
      previewImageUrl: "/placeholder.svg",
      prefilledData: {
        personalInfo: {
          name: "Brandon Hale",
          title: "Senior Business Development Director | Network & Pharma Expertise",
          email: "brandon.hale@example.com",
          phone: "(555) 987-6543",
          website: "linkedin.com/in/brandonhale",
          summary: "Strategic business development executive with 12+ years of experience in pharmaceutical and healthcare industries. Proven record of building successful partnerships and driving revenue growth through innovative solutions.",
        },
        experience: [
          {
            company: "PharmaTech Global",
            position: "Senior Business Development Director",
            startDate: "2019-06",
            endDate: "",
            current: true,
            description: "Orchestrated partnerships generating $50M+ in revenue through strategic alliances with major healthcare providers. Led cross-functional teams in developing and implementing market expansion strategies.",
          },
          {
            company: "HealthCare Solutions",
            position: "Business Development Manager",
            startDate: "2016-03",
            endDate: "2019-05",
            current: false,
            description: "Developed and executed business growth strategies resulting in 85% increase in market share across key regions. Managed client portfolio worth $30M annually.",
          }
        ],
        education: [
          {
            institution: "Harvard Business School",
            degree: "Master of Business Administration",
            field: "Healthcare Management",
            startDate: "2014-09",
            endDate: "2016-05",
            description: "Specialized in healthcare innovation and strategic management.",
          }
        ],
        skills: ["Strategic Planning", "Partnership Development", "Contract Negotiation", "Market Analysis", "Healthcare Industry", "Revenue Growth", "Team Leadership", "Project Management", "Client Relations", "Business Strategy"],
        certifications: [
          {
            name: "Certified Business Development Professional (CBDP)",
            url: "https://www.businessdevelopment.org/certification"
          }
        ],
      }
    },
    {
      id: "technical",
      name: "Technical",
      description: "Optimized for tech and engineering roles",
      previewImageUrl: "/placeholder.svg",
      prefilledData: {
        personalInfo: {
          name: "Violet Rodriguez",
          title: "Sr. Software Engineer | Full-Stack Development | Cloud Solutions",
          email: "violet.rodriguez@example.com",
          phone: "(555) 234-5678",
          website: "github.com/violetdev",
          summary: "Full-stack software engineer with expertise in cloud architecture and distributed systems. Passionate about building scalable solutions and mentoring junior developers.",
        },
        experience: [
          {
            company: "CloudTech Systems",
            position: "Senior Software Engineer",
            startDate: "2020-04",
            endDate: "",
            current: true,
            description: "Lead developer for cloud-native applications serving millions of users. Implemented microservices architecture reducing system latency by 40%. Mentored junior developers and established coding standards.",
          },
          {
            company: "DevSync Solutions",
            position: "Software Engineer",
            startDate: "2017-06",
            endDate: "2020-03",
            current: false,
            description: "Developed and maintained RESTful APIs and backend services. Improved application performance by 60% through optimization and caching strategies.",
          }
        ],
        education: [
          {
            institution: "Stanford University",
            degree: "Master of Science",
            field: "Computer Science",
            startDate: "2015-09",
            endDate: "2017-06",
            description: "Focus on distributed systems and cloud computing.",
          }
        ],
        skills: ["JavaScript/TypeScript", "Python", "React", "Node.js", "AWS", "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "CI/CD", "System Design", "Microservices"],
        certifications: [
          {
            name: "AWS Solutions Architect Professional",
            url: "https://aws.amazon.com/certification/"
          },
          {
            name: "Kubernetes Certified Application Developer",
            url: "https://www.cncf.io/certification/ckad/"
          }
        ],
      }
    }
  ];

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleUseTemplate = () => {
    if (!isSignedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to use this template",
      });
      navigate("/sign-in");
      return;
    }

    const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
    if (selectedTemplateData) {
      sessionStorage.setItem("selectedTemplate", JSON.stringify(selectedTemplateData.prefilledData));
      navigate("/builder");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Professional Resume Templates</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our expertly designed templates to create a standout resume
            </p>
          </div>

          <Tabs defaultValue="minimalist" value={selectedTemplate} onValueChange={handleSelectTemplate} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 max-w-md mx-auto">
              <TabsTrigger value="minimalist">Minimalist</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            {templates.map((template) => (
              <TabsContent key={template.id} value={template.id}>
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-8 lg:col-span-9">
                    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
                      <div className="p-1 max-h-[800px] overflow-y-auto">
                        <DirectEditResume 
                          template={templates.find(t => t.id === template.id)} 
                          onSave={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-4 lg:col-span-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Professional layout</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Customizable sections</span>
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">ATS-friendly format</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Button 
                          className="w-full" 
                          onClick={handleUseTemplate}
                        >
                          Use This Template
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            toast({
                              title: "Coming soon",
                              description: "This feature will be available soon",
                            });
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Example
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
