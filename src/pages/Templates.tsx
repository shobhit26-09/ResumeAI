
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Layout, LayoutTemplate, FileText, Award, Download, ArrowRight } from "lucide-react";

export default function Templates() {
  const resumeTemplates = [
    {
      id: 1,
      name: "Professional",
      description: "A clean, traditional template perfect for corporate and business roles.",
      features: ["ATS-optimized", "Clean layout", "Formal design"],
      color: "blue",
      popular: false,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Modern",
      description: "Contemporary design with creative touches for standing out in creative fields.",
      features: ["Creative layout", "Custom sections", "Visual elements"],
      color: "purple",
      popular: true,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Minimalist",
      description: "Simple and elegant design focusing on essential information.",
      features: ["Spacious design", "Focused content", "Easy to scan"],
      color: "slate",
      popular: false,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Executive",
      description: "Premium template for senior professionals and executives.",
      features: ["Leadership focus", "Achievement highlights", "Sophisticated layout"],
      color: "gray",
      popular: false,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Technical",
      description: "Specially designed for tech roles with sections for skills and projects.",
      features: ["Skills matrix", "Project showcase", "Technical focus"],
      color: "green",
      popular: false,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Academic",
      description: "Tailored for academic positions with focus on publications and research.",
      features: ["Publications section", "Research highlights", "Educational focus"],
      color: "amber",
      popular: false,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block p-2 bg-purple-100 text-purple-700 rounded-lg mb-4">
                <LayoutTemplate className="h-6 w-6" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
                Resume Templates
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose from our professionally designed templates to create a standout resume that gets you noticed.
              </p>
            </div>

            {/* Template Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Button variant="outline" className="rounded-full">All Templates</Button>
              <Button variant="outline" className="rounded-full">Professional</Button>
              <Button variant="outline" className="rounded-full">Creative</Button>
              <Button variant="outline" className="rounded-full">Technical</Button>
              <Button variant="outline" className="rounded-full">Academic</Button>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resumeTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-border group">
                  {template.popular && (
                    <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  <div className="h-48 bg-muted/50 relative overflow-hidden">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{template.description}</p>
                    <div className="space-y-2">
                      {template.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4 text-purple-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button>
                      <Layout className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-purple-50 dark:bg-purple-950/10">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-2">ATS-Optimized</h3>
                <p className="text-muted-foreground">All our templates are designed to pass through Applicant Tracking Systems with ease.</p>
              </div>
              <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-2">Multiple Formats</h3>
                <p className="text-muted-foreground">Download your resume in PDF, DOCX, or other formats suitable for different application systems.</p>
              </div>
              <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  <Layout className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-2">Customizable</h3>
                <p className="text-muted-foreground">Easily customize colors, fonts, and layouts to make the template truly yours.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-8 md:p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to create your perfect resume?</h2>
                <p className="text-lg mb-6 text-white/90">
                  Sign up today and get access to all our premium templates and builder tools.
                </p>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
