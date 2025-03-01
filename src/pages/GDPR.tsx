
import LegalLayout from "@/components/LegalLayout";
import { Link } from "react-router-dom";

export default function GDPR() {
  return (
    <LegalLayout title="GDPR Compliance">
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            At ResumeAI, we are committed to protecting the personal data of our users in compliance with the General Data Protection Regulation (GDPR). This document outlines our approach to GDPR compliance and your rights under this regulation.
          </p>
          <p>
            The GDPR is a regulation in EU law on data protection and privacy that applies to all individuals within the European Union and the European Economic Area. It also addresses the export of personal data outside these areas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Data Controller</h2>
          <p>
            ResumeAI acts as a data controller for the personal information collected through our website and services. As a data controller, we determine the purposes and means of processing personal data.
          </p>
          <p>
            Our contact details are:
          </p>
          <p className="mt-2">
            <strong>Company Name:</strong> ResumeAI Inc.<br />
            <strong>Address:</strong> 123 AI Street, San Francisco, CA 94105, USA<br />
            <strong>Email:</strong> gdpr@resumeai.com<br />
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Data Protection Officer</h2>
          <p>
            We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions regarding this privacy policy and our GDPR compliance efforts. If you have any questions about this policy or our data practices, please contact our DPO at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> dpo@resumeai.com<br />
            <strong>Phone:</strong> +1 (555) 987-6543
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Legal Basis for Processing</h2>
          <p>
            Under the GDPR, we must have a legal basis for processing your personal data. We rely on the following legal bases:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Consent:</strong> You have given clear consent for us to process your personal data for specific purposes.
            </li>
            <li>
              <strong>Contract:</strong> Processing is necessary for the performance of a contract with you or to take steps at your request before entering into a contract.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests or the legitimate interests of a third party, provided those interests are not outweighed by your rights and interests.
            </li>
            <li>
              <strong>Legal Obligation:</strong> Processing is necessary to comply with our legal obligations.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Your GDPR Rights</h2>
          <p>
            Under the GDPR, you have the following rights:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Right to Access:</strong> You have the right to request copies of your personal data.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
            </li>
            <li>
              <strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.
            </li>
            <li>
              <strong>Right to Object to Processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.
            </li>
          </ul>
          <p className="mt-4">
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us using the information provided in the "Data Controller" section.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Data Transfers Outside the EU</h2>
          <p>
            We may transfer your personal data to countries outside the European Economic Area (EEA). When we do, we ensure a similar degree of protection is afforded to your data by ensuring at least one of the following safeguards is implemented:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We will only transfer your personal data to countries that have been deemed to provide an adequate level of protection for personal data by the European Commission.
            </li>
            <li>
              Where we use certain service providers, we may use specific contracts approved by the European Commission which give personal data the same protection it has in Europe.
            </li>
            <li>
              Where we use providers based in the US, we may transfer data to them if they are part of the Privacy Shield, which requires them to provide similar protection to personal data shared between the Europe and the US.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
          <p>
            To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data, and whether we can achieve those purposes through other means, and the applicable legal requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
          <p>
            We have procedures in place to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking Technologies</h2>
          <p>
            Our website uses cookies and similar tracking technologies. Under the GDPR, we request your consent before placing non-essential cookies on your device. You can adjust your cookie preferences at any time through our Cookie Settings tool.
          </p>
          <p>
            For more information on how we use cookies, please see our <Link to="/cookies" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">Cookie Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Complaints</h2>
          <p>
            If you have a concern about our data practices or how we've handled your personal data, you can contact us directly using the information provided in the "Data Controller" section.
          </p>
          <p>
            You also have the right to lodge a complaint with your local data protection authority. For users in the European Union, you can find contact details for your national data protection authority on the European Commission's website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
          <p>
            We may update our GDPR Compliance Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
