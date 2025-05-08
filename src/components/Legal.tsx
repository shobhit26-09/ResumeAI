
import { useEffect, useRef } from "react";
import { Check, Shield, Lock } from "lucide-react";

export default function Legal() {
  const legalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const legalItems = legalRef.current?.querySelectorAll(".legal-item");
    if (legalItems) {
      legalItems.forEach((el, index) => {
        // Cast el to HTMLElement to correctly use the style property
        (el as HTMLElement).style.animationDelay = `${0.15 * index}s`;
        observer.observe(el);
      });
    }

    return () => {
      if (legalItems) {
        legalItems.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const legalItems = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Privacy Policy",
      description: "We take your privacy seriously. Our Resume AI tool ensures your data remains protected and confidential."
    },
    {
      icon: <Check className="h-5 w-5" />,
      title: "Terms of Service",
      description: "By using our service, you agree to our terms which are designed to provide the best experience for all users."
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Data Security",
      description: "Your resume data is encrypted and securely stored. We do not share your information with third parties."
    }
  ];

  return (
    <section ref={legalRef} className="py-16 bg-background border-t">
      <div className="container max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">Your data is secure with us</h2>
          <p className="text-muted-foreground">We prioritize your privacy and data security</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {legalItems.map((item, index) => (
            <div key={index} className="legal-item opacity-0 bg-muted/10 p-6 rounded-lg border border-muted/20 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium">{item.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
