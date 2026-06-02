import { useState, useEffect } from "react";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface Alumni {
  _id: string;
  email: string;
  fullName: string;
  graduationYear: number;
  profession: string;
  company: string;
  linkedinUrl: string;
  story: string;
  isMentor: boolean;
  isSuccessStory: boolean;
  status: string;
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

function SkeletonCard() {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden animate-pulse">
      <div className="p-6 space-y-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto" />
        <div className="h-5 bg-gray-700 rounded w-2/3 mx-auto" />
        <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto" />
        <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto" />
        <div className="flex justify-center gap-2">
          <div className="h-6 bg-gray-700 rounded-full w-16" />
          <div className="h-6 bg-gray-700 rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}

export default function AlumniNetwork() {
  const { user } = useAuthStore();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "mentors" | "stories">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    graduationYear: new Date().getFullYear(),
    profession: "",
    company: "",
    linkedinUrl: "",
    story: "",
    isMentor: false,
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await apiClient.get("/alumni");
      setAlumni(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch alumni");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await apiClient.post("/alumni", registerForm);
      setSuccess("Your alumni registration has been submitted for approval!");
      setRegisterForm({
        graduationYear: new Date().getFullYear(),
        profession: "",
        company: "",
        linkedinUrl: "",
        story: "",
        isMentor: false,
      });
      setShowRegisterForm(false);
      fetchAlumni();
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const userHasAlumni = alumni.some((a) => a.email === user?.email);

  const filtered = alumni.filter((a) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "mentors" && a.isMentor) ||
      (activeTab === "stories" && a.isSuccessStory);
    const matchesSearch =
      a.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(a.graduationYear).includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Alumni Network</h1>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Alumni Network</h1>
        <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-900/30 border border-green-500/30 text-green-400 px-5 py-4 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{success}</span>
        </div>
      )}

      {user && !userHasAlumni && (
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Not registered as an alumni yet?</h3>
              <p className="text-gray-400 text-sm mt-1">Join the alumni network to connect with fellow Ghanaian legal professionals.</p>
            </div>
            <button
              onClick={() => setShowRegisterForm(!showRegisterForm)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shrink-0"
            >
              {showRegisterForm ? "Cancel" : "Register as Alumni"}
            </button>
          </div>

          {showRegisterForm && (
            <form onSubmit={handleRegister} className="mt-6 space-y-4 border-t border-gray-700/50 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Graduation Year *</label>
                  <input
                    type="number"
                    value={registerForm.graduationYear}
                    onChange={(e) => setRegisterForm({ ...registerForm, graduationYear: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Profession *</label>
                  <input
                    type="text"
                    value={registerForm.profession}
                    onChange={(e) => setRegisterForm({ ...registerForm, profession: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    placeholder="e.g. Solicitor, Barrister"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Company / Firm</label>
                  <input
                    type="text"
                    value={registerForm.company}
                    onChange={(e) => setRegisterForm({ ...registerForm, company: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    placeholder="e.g. Freshfields, Linklaters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">LinkedIn URL</label>
                  <input
                    type="url"
                    value={registerForm.linkedinUrl}
                    onChange={(e) => setRegisterForm({ ...registerForm, linkedinUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Brief Story / Bio</label>
                <textarea
                  value={registerForm.story}
                  onChange={(e) => setRegisterForm({ ...registerForm, story: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                  placeholder="Share a brief summary of your career journey..."
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${registerForm.isMentor ? "bg-blue-600 border-blue-600" : "border-gray-600 group-hover:border-gray-500"}`}>
                  {registerForm.isMentor && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={registerForm.isMentor}
                  onChange={(e) => setRegisterForm({ ...registerForm, isMentor: e.target.checked })}
                  className="hidden"
                />
                <span className="text-sm text-gray-300">I am available to mentor fellow alumni</span>
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : "Submit Registration"}
              </button>
            </form>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-1 bg-gray-800/60 rounded-lg p-1 border border-gray-700/50">
          {(["all", "mentors", "stories"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              {tab === "all" ? "All" : tab === "mentors" ? "Mentors" : "Success Stories"}
            </button>
          ))}
        </div>

        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, profession, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-800/60 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full sm:w-72"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-lg font-medium">No alumni registered</p>
          <p className="text-sm text-gray-600 mt-1">Be the first to join the alumni network</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <div
              key={a._id}
              className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mb-4">
                  {a.fullName?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <h3 className="text-lg font-bold text-white">{a.fullName}</h3>
                <p className="text-gray-400 text-sm">Class of {a.graduationYear}</p>
                {a.profession && (
                  <p className="text-gray-300 text-sm mt-2 font-medium">{a.profession}</p>
                )}
                {a.company && (
                  <p className="text-gray-500 text-xs mt-0.5">{a.company}</p>
                )}
              </div>

              {(a.story || a.linkedinUrl) && (
                <div className="mt-4 pt-4 border-t border-gray-700/50 space-y-2">
                  {a.story && (
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{a.story}</p>
                  )}
                  {a.linkedinUrl && (
                    <a
                      href={a.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[a.status] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
                  {a.status || "unknown"}
                </span>
                {a.isMentor && (
                  <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    Mentor
                  </span>
                )}
                {a.isSuccessStory && (
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    Success Story
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
