import { useState } from "react";
import apiClient from "../services/api";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Address",
    value: (
      <>
        Yuunivarsiitii Haramaayaa<br />Haramaayaa, Oromiyaa, Itoophiyaa
      </>
    ),
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Phone",
    value: "+251 91 234 5678",
    href: "tel:+251912345678",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email",
    value: "adaabargaa@student.haramaya.edu.et",
    href: "mailto:adaabargaa@student.haramaya.edu.et",
  },
];

const socialLinks = [
  { label: "Facebook", icon: "fb", color: "hover:bg-blue-600" },
  { label: "Twitter", icon: "tw", color: "hover:bg-sky-500" },
  { label: "LinkedIn", icon: "li", color: "hover:bg-blue-700" },
  { label: "Instagram", icon: "ig", color: "hover:bg-pink-600" },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "General Inquiry",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setValidationErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Maqaa barbaachisa";
    if (!formData.email.trim()) errors.email = "Emailii barbaachisa";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Emailiin sirrii miti";
    if (!formData.subject.trim()) errors.subject = "Mataduree barbaachisa";
    if (!formData.message.trim()) errors.message = "Ergaa barbaachisa";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      await apiClient.post("/contact", formData);
      setSuccess("Ergaa kee ergameera!");
      setFormData({ name: "", email: "", subject: "", message: "", type: "General Inquiry" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Ergaan kee ergamuu dadhabe. YaIi!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white rounded-2xl p-12 text-center shadow-lg">
        <h1 className="text-5xl font-bold mb-4">Nu Qunnami</h1>
        <p className="text-xl text-blue-100">Gaaffii yoo qabaattan ykn wanni nu bira akka ga'u yoo barbaaddan nu qunnamaa.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          {contactInfo.map((info) => (
            <div key={info.title} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{info.title}</h3>
                  {info.href ? (
                    <a href={info.href} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{info.value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Nu Hordofi</h3>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className={`w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center font-bold text-xs uppercase tracking-wider transition-all ${s.color} hover:text-white dark:hover:text-white`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Ergii Nuuf Ergi</h2>

            {success && (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 px-5 py-3.5 rounded-xl mb-6 flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-5 py-3.5 rounded-xl mb-6 flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Maqaa Kee</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                  placeholder="Maqaa guutuu kee"
                />
                {validationErrors.name && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{validationErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Emailii</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                  placeholder="adaabargaa@student.com"
                />
                {validationErrors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{validationErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Mata Duree</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                  placeholder="Waa'ee maalii?"
                />
                {validationErrors.subject && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{validationErrors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Gosa Ergaa</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                >
                  <option value="General Inquiry">Gaaffii Waliigalaa</option>
                  <option value="Membership">Miseensummaa</option>
                  <option value="Partnership">Hojiirra Ooluu</option>
                  <option value="Press">Miidiyaa</option>
                  <option value="Other">Kan biraa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Ergaa</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition resize-y"
                  placeholder="Ergaa kee asitti barreessi..."
                />
                {validationErrors.message && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{validationErrors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-10 py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 dark:shadow-blue-500/10"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Ergaa Ergaa...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Ergaa Ergi
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
