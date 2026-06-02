import { Link } from "react-router-dom";

const categories = [
  { to: "/news", label: "Oduu" },
  { to: "/events", label: "Ta'oota" },
  { to: "/documents", label: "Barruulee" },
  { to: "/gallery", label: "Suuraa" },
  { to: "/faqs", label: "Gaaffilee" },
  { to: "/resources", label: "Qabeenya" },
];

const aboutLinks = [
  { to: "/waaee", label: "Waa'ee Keenya" },
  { to: "/galata", label: "Galata" },
  { to: "/ergaa", label: "Ergaa Gabaabaa" },
  { to: "/yaadannoo", label: "Yaadannoo" },
  { to: "/koreewwan", label: "Koreewwan" },
  { to: "/students", label: "Barattoota" },
  { to: "/contact", label: "Nu Qunnami" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 border-t border-gray-800 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-10">
          <div className="col-span-3 lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white">
              GBAABW
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Gamtaa Barattoota Aanaa Ada'a Bargaa Yuunivarsiitii Haramaayaa
              keessatti barattoota walitti qabuu fi wal gargaaruu fi guddina
              ogummaa isaanii irratti hojjata.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialIcon
                href="https://facebook.com"
                label="Facebook"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </SocialIcon>
              <SocialIcon
                href="https://twitter.com"
                label="Twitter"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </SocialIcon>
              <SocialIcon
                href="https://linkedin.com"
                label="LinkedIn"
                viewBox="0 0 24 24"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </SocialIcon>
              <SocialIcon
                href="https://instagram.com"
                label="Instagram"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Qoodaa
            </h3>
            <ul className="mt-4 space-y-2">
              {categories.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Waa'ee
            </h3>
            <ul className="mt-4 space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden sm:block">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>adaabargaa@student.haramaya.edu.et</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+251 91 234 5678</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Yuunivarsiitii Haramaayaa<br />Haramaayaa, Oromiyaa, Itoophiyaa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Gamtaa Barattoota Aanaa Ada'a Bargaa. Mirgi hundi eegameera.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link to="/faqs" className="hover:text-primary transition-colors">
              Imaammata Icciitii
            </Link>
            <span className="text-gray-700">|</span>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Haala Tajaajila
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
  viewBox,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  viewBox: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox={viewBox}>
        {children}
      </svg>
    </a>
  );
}
