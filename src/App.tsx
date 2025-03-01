
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Builder from "./pages/Builder";
import Analyzer from "./pages/Analyzer";
import NotFound from "./pages/NotFound";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import GDPR from "./pages/GDPR";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route 
              path="/sign-in/*" 
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <SignIn 
                    routing="path" 
                    path="/sign-in" 
                    signUpUrl="/sign-up"
                    redirectUrl="/builder"
                  />
                </div>
              } 
            />
            <Route 
              path="/sign-up/*" 
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <SignUp 
                    routing="path" 
                    path="/sign-up" 
                    signInUrl="/sign-in"
                    redirectUrl="/builder"
                  />
                </div>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
