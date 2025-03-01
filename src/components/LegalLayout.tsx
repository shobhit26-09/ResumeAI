
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-purple-500 transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h1>
          
          <div className="prose prose-purple dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
