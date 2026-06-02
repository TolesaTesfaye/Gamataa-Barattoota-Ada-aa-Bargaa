import { useState, useEffect } from "react";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface Document {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  category: string;
  downloads: number;
  createdAt: string;
}

const CATEGORIES = ["All", "Form", "Report", "Policy", "Minutes", "Other"];

const categoryColors: Record<string, string> = {
  Form: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Report: "bg-green-500/20 text-green-400 border-green-500/30",
  Policy: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Minutes: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

function FileIcon({ fileType, category }: { fileType: string; category: string }) {
  const type = (fileType || category || "").toLowerCase();
  if (type.includes("pdf"))
    return (
      <svg className="w-10 h-10 text-red-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm-8.5 7.5A1.5 1.5 0 0110 11H8.5V7.5h1a1.5 1.5 0 010 3zM16 11h-1.5v2H13V7.5h3a1.5 1.5 0 010 3zm-2.5 0a1.5 1.5 0 01-1.5 1.5h-1V11h1a.5.5 0 000-1h-.5V8.5h.5a.5.5 0 010 1H11V7.5h1a1.5 1.5 0 011.5 1.5v2zm3-3.5H15v3h1.5a.5.5 0 000-1H16V8.5h.5a.5.5 0 000-1z" />
      </svg>
    );
  if (type.includes("doc") || type.includes("word"))
    return (
      <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm1 15H9v-2h6v2zm0-4H9v-2h6v2zm-2-4V3.5L18.5 9H13z" />
      </svg>
    );
  if (type.includes("xls") || type.includes("sheet"))
    return (
      <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM9.998 14.01L12 11.01l2.002 3 .002.002H11.99l.002 2.003h2.003l-1.997 2.997-2.003-2.997h-2l1.997-2.997L9.998 14.01z" />
      </svg>
    );
  if (type.includes("form"))
    return (
      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    );
  if (type.includes("report"))
    return (
      <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  if (type.includes("policy"))
    return (
      <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  return (
    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden animate-pulse">
      <div className="p-6 space-y-4">
        <div className="h-10 w-10 bg-gray-700 rounded-lg" />
        <div className="h-5 bg-gray-700 rounded w-1/4" />
        <div className="h-6 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-4 bg-gray-700 rounded w-24" />
          <div className="h-9 bg-gray-700 rounded w-28" />
        </div>
      </div>
    </div>
  );
}

export default function Documents() {
  const { token } = useAuthStore();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    fileUrl: "",
    category: "Other",
  });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await apiClient.get("/documents");
      setDocuments(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      await apiClient.post(`/documents/${id}/download`);
      setDocuments((prev) =>
        prev.map((doc) =>
          doc._id === id ? { ...doc, downloads: doc.downloads + 1 } : doc
        )
      );
    } catch (err: any) {
      console.error("Download count failed", err);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(null);
    try {
      await apiClient.post("/documents", uploadData);
      setSuccess("Document uploaded successfully!");
      setUploadData({ title: "", description: "", fileUrl: "", category: "Other" });
      setShowUpload(false);
      fetchDocuments();
    } catch (err: any) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const filtered = documents.filter((doc) => {
    const matchesCategory =
      activeCategory === "All" || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Document Repository</h1>
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

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800/60 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
          />
        </div>
        {token && (
          <button
            onClick={() => setShowUpload(!showUpload)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              showUpload
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25"
            }`}
          >
            {showUpload ? "Cancel" : "Upload Document"}
          </button>
        )}
      </div>

      {showUpload && (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Upload Document</h3>
          <form onSubmit={handleUpload} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Title
              </label>
              <input
                type="text"
                value={uploadData.title}
                onChange={(e) =>
                  setUploadData({ ...uploadData, title: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Description
              </label>
              <textarea
                value={uploadData.description}
                onChange={(e) =>
                  setUploadData({ ...uploadData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                File URL
              </label>
              <input
                type="text"
                value={uploadData.fileUrl}
                onChange={(e) =>
                  setUploadData({ ...uploadData, fileUrl: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Category
              </label>
              <select
                value={uploadData.category}
                onChange={(e) =>
                  setUploadData({ ...uploadData, category: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
              >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      )}

      <div className="flex gap-1 bg-gray-800/60 rounded-lg p-1 border border-gray-700/50 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium">No documents found</p>
          <p className="text-sm text-gray-600 mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => {
            const catColor =
              categoryColors[doc.category] ||
              "bg-gray-500/20 text-gray-400 border-gray-500/30";
            return (
              <div
                key={doc._id}
                className="group bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6 space-y-4">
                  <FileIcon fileType={doc.fileType} category={doc.category} />

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${catColor}`}
                    >
                      {doc.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {doc.title}
                  </h3>

                  {doc.description && (
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {doc.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {doc.downloads}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(doc.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      window.open(doc.fileUrl, "_blank", "noopener,noreferrer");
                      handleDownload(doc._id);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
