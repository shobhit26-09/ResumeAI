
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Templates() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
            Resume Templates
          </h1>
          
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Templates page content coming soon...
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
