
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Legal from "@/components/Legal";
import Navbar from "@/components/Navbar";
import { Bot, Star, FileText } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Testimonial section */}
        <section className="py-16 bg-primary/5">
          <div className="container max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Loved by thousands of job seekers</h2>
              <div className="flex justify-center">
                <div className="flex text-yellow-500 text-xl">
                  <Star className="fill-yellow-500" />
                  <Star className="fill-yellow-500" />
                  <Star className="fill-yellow-500" />
                  <Star className="fill-yellow-500" />
                  <Star className="fill-yellow-500" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">JD</div>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-xs text-muted-foreground">Marketing Specialist</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">"The AI suggestions helped me highlight achievements I hadn't considered. Got interviews at 3 companies within a week!"</p>
                <div className="mt-4 flex text-yellow-500">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                </div>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 font-bold">AS</div>
                  <div>
                    <div className="font-medium">Amy Smith</div>
                    <div className="text-xs text-muted-foreground">Software Developer</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">"The one-click tailoring feature is a game-changer. I was able to customize my resume for different job applications in minutes!"</p>
                <div className="mt-4 flex text-yellow-500">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                </div>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 font-bold">TJ</div>
                  <div>
                    <div className="font-medium">Tom Jackson</div>
                    <div className="text-xs text-muted-foreground">Project Manager</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">"After struggling to get responses, I revamped my resume with ResumeAI and landed my dream job at a Fortune 500 company!"</p>
                <div className="mt-4 flex text-yellow-500">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Features />
        
        {/* How it works section */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How it works</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Create your professional resume in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold mb-2">1</div>
                <h3 className="text-xl font-medium mb-2">Choose a template</h3>
                <p className="text-muted-foreground">Select from our collection of professional, ATS-friendly templates</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold mb-2">2</div>
                <h3 className="text-xl font-medium mb-2">Add your information</h3>
                <p className="text-muted-foreground">Fill in your details or let our AI assistant help you optimize your content</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold mb-2">3</div>
                <h3 className="text-xl font-medium mb-2">Download and apply</h3>
                <p className="text-muted-foreground">Download your perfect resume in PDF format and start applying to jobs</p>
              </div>
            </div>
          </div>
        </section>
        
        <Legal />
      </main>
      <Footer />
    </div>
  );
}
