
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Legal from "@/components/Legal";
import Navbar from "@/components/Navbar";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Legal />
      </main>
      <Footer />
    </div>
  );
}
