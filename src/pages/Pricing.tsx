
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gradient-to-b dark:from-background dark:via-background/80 dark:to-background">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-24">
          <div className="container px-4">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-center">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Choose the plan that's right for you
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="rounded-xl border bg-card p-8">
                <h3 className="text-2xl font-semibold mb-2">Free</h3>
                <p className="text-muted-foreground mb-4">Perfect to get started</p>
                <div className="text-4xl font-bold mb-6">$0/mo</div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>1 Resume</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Basic Templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Export as PDF</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>

              {/* Pro Plan */}
              <div className="rounded-xl border bg-card p-8 ring-2 ring-primary">
                <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                <p className="text-muted-foreground mb-4">For serious job seekers</p>
                <div className="text-4xl font-bold mb-6">$9/mo</div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Unlimited Resumes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Premium Templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>AI Suggestions</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>ATS Analysis</span>
                  </li>
                </ul>
                <Button className="w-full">Upgrade to Pro</Button>
              </div>

              {/* Enterprise Plan */}
              <div className="rounded-xl border bg-card p-8">
                <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
                <p className="text-muted-foreground mb-4">For teams & businesses</p>
                <div className="text-4xl font-bold mb-6">Contact us</div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Custom Branding</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Team Management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Priority Support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
