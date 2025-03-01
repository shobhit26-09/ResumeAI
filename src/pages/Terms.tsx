
import LegalLayout from "@/components/LegalLayout";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service">
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms of Service ("Terms") govern your access to and use of ResumeAI's website, services, and applications (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p>
            ResumeAI provides AI-powered resume creation, optimization, and analysis tools designed to help users create professional resumes and improve their job application materials. The Service may include features such as resume templates, content suggestions, formatting tools, and analysis reports.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p>
            To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          <p>
            You must provide accurate and complete information when creating your account and keep your account information updated. We reserve the right to suspend or terminate your account if any information provided is inaccurate or misleading.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
          <p>
            When using our Service, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect the intellectual property rights of others</li>
            <li>Not upload or share any content that is illegal, harmful, threatening, abusive, or otherwise objectionable</li>
            <li>Not attempt to gain unauthorized access to any part of the Service</li>
            <li>Not interfere with or disrupt the Service or servers or networks connected to the Service</li>
            <li>Not use the Service for any fraudulent or deceptive practices</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by ResumeAI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p>
            While you retain ownership of the content you upload to the Service, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content for the purpose of providing and improving the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Subscription and Payments</h2>
          <p>
            Some features of the Service may require a paid subscription. By subscribing to a paid plan, you agree to pay the applicable fees as described on our website. Subscription fees are non-refundable except as required by law or as explicitly stated in these Terms.
          </p>
          <p>
            We may change our fees at any time, but any changes will not apply to your current subscription period. We will provide notice of any fee changes before they take effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, ResumeAI and its directors, employees, partners, agents, suppliers, or affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Disclaimer</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. ResumeAI does not warrant that the Service will be uninterrupted, timely, secure, or error-free. We do not guarantee the accuracy or completeness of any information obtained through the Service.
          </p>
          <p>
            While our AI tools aim to provide helpful suggestions, we do not guarantee that using our Service will result in employment opportunities or improved job prospects.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> legal@resumeai.com<br />
            <strong>Address:</strong> 123 AI Street, San Francisco, CA 94105<br />
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
        </section>

        <p className="mt-8 text-muted-foreground">
          By using ResumeAI, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
        </p>
      </div>
    </LegalLayout>
  );
}
