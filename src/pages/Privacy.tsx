
import LegalLayout from "@/components/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy">
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            At ResumeAI, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
          </p>
          <p>
            By using ResumeAI, you consent to the data practices described in this policy. We may update this policy periodically, and we'll notify you of any significant changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p>
            We collect the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> When you create an account, we collect your name, email address, and other contact details.
            </li>
            <li>
              <strong>Resume Data:</strong> Information you provide when creating or uploading resumes, including your work history, education, skills, and other professional details.
            </li>
            <li>
              <strong>Usage Information:</strong> We collect data about how you interact with our platform, including pages visited, features used, and time spent.
            </li>
            <li>
              <strong>Device Information:</strong> We collect information about the device you use to access our service, including browser type, IP address, and operating system.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>
            We use your information for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our services</li>
            <li>To personalize your experience on our platform</li>
            <li>To improve our website and services</li>
            <li>To communicate with you about updates, support, or promotional offers</li>
            <li>To analyze usage patterns and optimize performance</li>
            <li>To detect, prevent, and address technical issues or security breaches</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p>
            We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure storage, and regular security assessments.
          </p>
          <p>
            While we strive to use commercially acceptable means to protect your personal data, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Third Parties</h2>
          <p>
            We do not sell your personal information to third parties. We may share your information with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Service Providers:</strong> Companies that assist us in operating our website, conducting business, or servicing you.
            </li>
            <li>
              <strong>Analytics Partners:</strong> To help us understand how our users interact with our services.
            </li>
            <li>
              <strong>Legal Requirements:</strong> To comply with legal obligations, such as responding to a subpoena or court order.
            </li>
          </ul>
          <p>
            Any third parties with whom we share your data are obligated to keep it secure and confidential.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access the personal information we hold about you</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your data</li>
            <li>The right to restrict or object to our processing of your data</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent at any time</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
          <p>
            For more information about how we use cookies, please see our <Link to="/cookies" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">Cookie Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
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
