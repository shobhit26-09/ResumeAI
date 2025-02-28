
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

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { userId, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!userId) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/builder" 
              element={
                <ProtectedRoute>
                  <Builder />
                </ProtectedRoute>
              } 
            />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route 
              path="/sign-in/*" 
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <SignIn 
                    routing="path" 
                    path="/sign-in" 
                    signUpUrl="/sign-up"
                    redirectUrl="/"
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
                    redirectUrl="/"
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
