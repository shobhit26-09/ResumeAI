
import { Shield, Lock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Legal() {
  return (
    <section className="section-padding bg-muted/10">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-slide-in">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Data is Secure with Us
          </h2>
          <p className="text-lg text-muted-foreground">
            We take privacy and security seriously. Your information is protected with industry-leading security measures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">Data Protection</h3>
            <p className="text-muted-foreground">
              Your resume data is encrypted and protected according to industry standards. We never share your information with third parties without your consent.
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">Privacy First</h3>
            <p className="text-muted-foreground">
              Our privacy policy is designed to give you control over your data. We're transparent about what data we collect and how we use it.
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">Clear Terms</h3>
            <p className="text-muted-foreground">
              Our Terms of Service are written in clear language, so you understand exactly what you're agreeing to when using our platform.
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="space-x-4">
            <Button variant="outline" className="border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300" asChild>
              <Link to="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" className="border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300" asChild>
              <Link to="/terms">Terms of Service</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
