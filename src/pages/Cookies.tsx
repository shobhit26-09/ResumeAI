
import LegalLayout from "@/components/LegalLayout";
import { Link } from "react-router-dom";

export default function Cookies() {
  return (
    <LegalLayout title="Cookie Policy">
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Cookie Policy explains how ResumeAI ("we", "us", or "our") uses cookies and similar technologies on our website. This policy is part of our <Link to="/privacy" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">Privacy Policy</Link>.
          </p>
          <p>
            By using our website, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree to our use of cookies, you should set your browser settings accordingly or not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
          </p>
          <p>
            Cookies help us enhance your experience on our website by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Remembering your preferences and settings</li>
            <li>Understanding how you use our website</li>
            <li>Improving site performance and functionality</li>
            <li>Enabling personalized content and features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
          <p>
            We use the following types of cookies on our website:
          </p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You can disable these by changing your browser settings, but this may affect how the website functions.
          </p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">Performance and Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve the performance and design of our website.
          </p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">Functional Cookies</h3>
          <p>
            These cookies enable enhanced functionality and personalization on our website. They may be set by us or by third-party providers whose services we have added to our pages.
          </p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">Targeting and Advertising Cookies</h3>
          <p>
            These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
          <p>
            Some cookies are placed by third parties on our website. These third parties may include analytics providers, advertising networks, and social media platforms. These third parties may use cookies, web beacons, and similar technologies to collect information about your use of our website and other websites.
          </p>
          <p>
            We do not control these third parties or their use of cookies. We recommend reviewing the privacy policies of these third parties for more information about their cookies and how they use them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
          <p>
            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, delete cookies, or alert you when cookies are being sent. However, if you disable or refuse cookies, please note that some parts of our website may not function properly.
          </p>
          <p>
            The procedures for managing cookies vary depending on which browser you use. Here are links to instructions for some common browsers:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">Microsoft Edge</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Cookie Consent</h2>
          <p>
            When you first visit our website, you will be presented with a cookie banner that allows you to accept or decline non-essential cookies. You can change your preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will become effective when we post the revised policy on our website. We encourage you to review this policy periodically to stay informed about our use of cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> privacy@resumeai.com<br />
            <strong>Address:</strong> 123 AI Street, San Francisco, CA 94105<br />
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
