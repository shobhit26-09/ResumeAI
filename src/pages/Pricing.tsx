
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, CreditCard, Package, Shield, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="inline-block p-2 bg-purple-100 text-purple-700 rounded-lg mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the plan that's right for you and start creating professional resumes today.
              </p>
            </div>

            {/* Pricing Tabs */}
            <div className="max-w-5xl mx-auto mt-8">
              <Tabs defaultValue="monthly" className="mb-8">
                <div className="flex justify-center mb-6">
                  <TabsList>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
                  </TabsList>
                </div>

                {/* Monthly Plans */}
                <TabsContent value="monthly">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Free Plan */}
                    <Card className="border-2 border-border">
                      <CardHeader>
                        <CardTitle className="text-2xl">Free</CardTitle>
                        <CardDescription>Basic resume creation</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">$0</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>1 resume</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Basic templates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>PDF downloads</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">AI suggestions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">Resume analyzer</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Get Started
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Pro Plan */}
                    <Card className="border-2 border-purple-500 relative">
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        POPULAR
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl">Pro</CardTitle>
                        <CardDescription>Advanced resume creation</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">$12</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Unlimited resumes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>All premium templates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Multiple download formats</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Basic AI suggestions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Resume analyzer</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                          Try Free for 7 Days
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Premium Plan */}
                    <Card className="border-2 border-border">
                      <CardHeader>
                        <CardTitle className="text-2xl">Premium</CardTitle>
                        <CardDescription>Professional-grade tools</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">$29</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Everything in Pro</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Advanced AI writing assistant</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Detailed industry insights</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Priority support</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Custom branding</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Start Premium
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                {/* Annual Plans */}
                <TabsContent value="annual">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Free Plan */}
                    <Card className="border-2 border-border">
                      <CardHeader>
                        <CardTitle className="text-2xl">Free</CardTitle>
                        <CardDescription>Basic resume creation</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">$0</span>
                          <span className="text-muted-foreground ml-1">/year</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>1 resume</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Basic templates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>PDF downloads</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">AI suggestions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">Resume analyzer</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Get Started
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Pro Plan */}
                    <Card className="border-2 border-purple-500 relative">
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        MOST POPULAR
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl">Pro</CardTitle>
                        <CardDescription>Advanced resume creation</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">$9.60</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                          <div className="text-sm text-purple-600 font-medium">Billed annually ($115/year)</div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Unlimited resumes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>All premium templates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Multiple download formats</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Basic AI suggestions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Resume analyzer</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                          Try Free for 7 Days
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Premium Plan */}
                    <Card className="border-2 border-border">
                      <CardHeader>
                        <CardTitle className="text-2xl">Premium</CardTitle>
                        <CardDescription>Professional-grade tools</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">$23.20</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                          <div className="text-sm text-purple-600 font-medium">Billed annually ($278/year)</div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Everything in Pro</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Advanced AI writing assistant</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Detailed industry insights</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Priority support</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Custom branding</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Start Premium
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-purple-50 dark:bg-purple-950/10">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Have questions? We've got you covered.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-2">Can I cancel my subscription?</h3>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to your paid features until the end of your billing period.</p>
              </div>
              <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">We offer a 14-day money-back guarantee on all our paid plans. If you're not satisfied, contact our support team for a full refund.</p>
              </div>
              <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-2">Can I switch between plans?</h3>
                <p className="text-muted-foreground">Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new features.</p>
              </div>
              <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through our payment providers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-8 md:p-12 text-white">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:flex-1">
                    <div className="inline-block p-2 bg-white/20 rounded-lg mb-4">
                      <Package className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Looking for an enterprise solution?</h2>
                    <p className="text-lg mb-6 text-white/90">
                      We offer custom plans for organizations with specific needs. Get volume discounts, dedicated support, and more.
                    </p>
                    <Button size="lg" variant="secondary">
                      Contact Sales
                    </Button>
                  </div>
                  <div className="md:flex-1">
                    <div className="bg-white/10 p-6 rounded-lg">
                      <h3 className="text-xl font-medium mb-4">Enterprise features include:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-400" />
                          <span>Volume licensing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-400" />
                          <span>Advanced admin controls</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-400" />
                          <span>Dedicated account manager</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-400" />
                          <span>SSO integration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-400" />
                          <span>Enhanced security features</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-gradient-to-t from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <div className="inline-block p-2 bg-purple-100 text-purple-700 rounded-lg mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Trusted by thousands</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join thousands of job seekers who have found success using our platform.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-12 items-center opacity-70">
              <div className="h-12 w-28 bg-muted/50 rounded"></div>
              <div className="h-12 w-28 bg-muted/50 rounded"></div>
              <div className="h-12 w-28 bg-muted/50 rounded"></div>
              <div className="h-12 w-28 bg-muted/50 rounded"></div>
              <div className="h-12 w-28 bg-muted/50 rounded"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
