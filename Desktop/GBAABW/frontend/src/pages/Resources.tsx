import { useState, useEffect } from "react";
import apiClient from "../services/api";

interface Resource {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  category: string;
  downloads: number;
  createdAt: string;
}

const CATEGORIES = ["All", "Document", "Guide", "Template", "Reference"];

const categoryColors: Record<string, string> = {
  Document: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Guide: "bg-green-500/20 text-green-400 border-green-500/30",
  Template: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Reference: "bg-amber-500/20 text-amber-400 border-amber-500/30",
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
  if (type.includes("guide"))
    return (
      <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  if (type.includes("template"))
    return (
      <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    );
  if (type.includes("reference"))
    return (
      <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await apiClient.get("/resources");
      setResources(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch resources");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      await apiClient.post(`/resources/${id}/download`);
      setResources((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, downloads: r.downloads + 1 } : r
        )
      );
    } catch (err: any) {
      console.error("Download count failed", err);
    }
  };

  const filtered = resources.filter((r) => {
    const matchesCategory =
      activeCategory === "All" || r.category === activeCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-8 md:p-12">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Study Resources
          </h1>
          <p className="text-blue-200 text-lg max-w-xl">
            Access legal guides, templates, reference materials and documents curated for GBA UK members.
          </p>
        </div>
        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800/60 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
          />
        </div>
      </div>

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

      {error && (
        <div className="bg-red-900/30 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-lg font-medium">No resources available</p>
          <p className="text-sm text-gray-600 mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource) => {
            const catColor =
              categoryColors[resource.category] ||
              "bg-gray-500/20 text-gray-400 border-gray-500/30";
            return (
              <div
                key={resource._id}
                className="group bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6 space-y-4">
                  <FileIcon fileType={resource.fileType} category={resource.category} />

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${catColor}`}
                    >
                      {resource.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {resource.title}
                  </h3>

                  {resource.description && (
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {resource.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {resource.downloads} downloads
                    </span>

                    <a
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleDownload(resource._id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
