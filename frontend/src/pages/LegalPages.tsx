import { Link } from "react-router-dom";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  lastUpdated: string;
  effectiveDate: string;
  sections: LegalSection[];
};

function LegalPage({
  title,
  intro,
  lastUpdated,
  effectiveDate,
  sections,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
          >
            <span aria-hidden="true">&larr;</span>
            Back to home
          </Link>
        </div>
        <div className="overflow-hidden rounded-3xl border border-gray-200/70 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:border-gray-700/70 dark:bg-gray-800/80">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white sm:p-10">
            <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-blue-50 sm:text-lg">
              {intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-blue-100">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                Last updated: {lastUpdated}
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                Effective date: {effectiveDate}
              </span>
            </div>
          </div>

          <div className="space-y-8 p-6 sm:p-8 lg:p-10">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-gray-200/70 bg-gray-50/70 p-6 dark:border-gray-700/70 dark:bg-gray-900/40"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-gray-700 dark:text-gray-300 sm:text-base">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.title}-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-6 text-sm leading-7 text-blue-800 dark:border-blue-800/70 dark:bg-blue-900/20 dark:text-blue-200">
              <h2 className="text-lg font-semibold">Questions or concerns?</h2>
              <p className="mt-2">
                Please contact us using the{" "}
                <Link to="/contact" className="font-semibold underline">
                  contact page
                </Link>{" "}
                if you need clarification about this policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This Privacy Policy explains how Gamtaa Barattoota Aanaa Ada'a Bargaa (GBAABW) collects, uses, and protects personal information when you use our platform."
      lastUpdated="22 July 2026"
      effectiveDate="22 July 2026"
      sections={[
        {
          title: "1. Information We Collect",
          paragraphs: [
            "We may collect personal details you provide directly, such as your name, email address, student details, profile information, and content you submit through forms.",
            "We also collect technical data such as browser type, device information, and usage activity to improve performance and security.",
          ],
        },
        {
          title: "2. How We Use Your Information",
          paragraphs: [
            "Your information is used to provide and manage your account, support student community features, respond to requests, and maintain platform safety.",
            "We may also use aggregated data for analytics and service improvement without identifying individuals.",
          ],
        },
        {
          title: "3. Data Sharing and Disclosure",
          paragraphs: [
            "We do not sell your personal information. Data is shared only when necessary for service operation, legal compliance, or protection of user safety and platform integrity.",
            "Authorized administrators may access relevant data for moderation and support in line with organizational responsibilities.",
          ],
        },
        {
          title: "4. Data Security and Retention",
          paragraphs: [
            "We apply reasonable technical and organizational safeguards to protect your information against unauthorized access, disclosure, alteration, or loss.",
            "Personal data is retained only as long as needed for service and legal obligations, then securely removed or anonymized.",
          ],
        },
        {
          title: "5. Your Rights",
          paragraphs: [
            "You may request access to your data, correction of inaccurate information, or deletion of your account data where applicable.",
            "You can contact us at any time if you have concerns about privacy practices or wish to exercise your rights.",
          ],
        },
      ]}
    />
  );
}

export function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These Terms of Service govern your use of the GBAABW platform. By accessing or using the platform, you agree to follow these terms."
      lastUpdated="22 July 2026"
      effectiveDate="22 July 2026"
      sections={[
        {
          title: "1. Eligibility and Account Responsibility",
          paragraphs: [
            "You are responsible for maintaining accurate account information and protecting your login credentials.",
            "You must not impersonate others or use another person's account without permission.",
          ],
        },
        {
          title: "2. Acceptable Use",
          paragraphs: [
            "You agree to use the platform respectfully and lawfully. Harassment, hate speech, fraud, and any harmful or illegal activities are prohibited.",
            "You must not attempt to disrupt system operation, bypass security controls, or misuse platform features.",
          ],
        },
        {
          title: "3. Content and Conduct",
          paragraphs: [
            "You are responsible for content you submit. Content that violates community standards may be removed by administrators.",
            "By submitting content, you grant GBAABW permission to display and manage it within community operations.",
          ],
        },
        {
          title: "4. Service Availability",
          paragraphs: [
            "We work to keep the platform available and reliable, but we cannot guarantee uninterrupted access at all times.",
            "Features may be updated, limited, or removed when necessary for maintenance, compliance, or improvement.",
          ],
        },
        {
          title: "5. Termination",
          paragraphs: [
            "Accounts may be suspended or terminated for serious or repeated violations of these terms.",
            "You may stop using the platform at any time. Some records may be retained where required for legal or operational reasons.",
          ],
        },
      ]}
    />
  );
}