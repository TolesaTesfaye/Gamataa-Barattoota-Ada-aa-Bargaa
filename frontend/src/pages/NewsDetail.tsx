import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../services/api";

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  author: any;
  category: string;
  views: number;
  publishedAt: string;
  image: string;
}

const categoryColors: Record<string, string> = {
  news: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  article: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "press release": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  blog: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await apiClient.get(`/news/${id}`);
        setArticle(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden animate-pulse">
          <div className="aspect-[21/9] bg-gray-700" />
          <div className="p-8 space-y-5">
            <div className="h-4 bg-gray-700 rounded w-24" />
            <div className="h-9 bg-gray-700 rounded w-3/4" />
            <div className="h-5 bg-gray-700 rounded w-1/3" />
            <div className="space-y-3 pt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-700 rounded w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-900/30 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-gray-500">
        <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p className="text-lg font-medium">Article not found</p>
        <Link to="/news" className="mt-2 text-blue-400 hover:text-blue-300 transition-colors">
          &larr; Back to News
        </Link>
      </div>
    );
  }

  const catColor = categoryColors[article.category?.toLowerCase()] || "bg-gray-500/20 text-gray-400 border-gray-500/30";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/news"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to News
      </Link>

      <article className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full aspect-[21/9] object-cover"
          />
        ) : (
          <div className="w-full aspect-[21/9] bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-0.5 rounded-full text-xs font-medium border ${catColor}`}>
              {article.category}
            </span>
            <span className="text-gray-500 text-sm">{article.views} views</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-400 pb-6 border-b border-gray-700/50">
            <span>
              By {article.author?.firstName || "Unknown"} {article.author?.lastName || ""}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Draft"}
            </span>
          </div>

          <div className="text-gray-300 leading-relaxed text-lg space-y-4 whitespace-pre-line">
            {article.content}
          </div>

          <div className="pt-6 border-t border-gray-700/50">
            <p className="text-gray-400 font-semibold mb-4">Share this article</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-all border border-gray-600/30"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy Link
                  </>
                )}
              </button>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm transition-all border border-blue-500/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 rounded-lg text-sm transition-all border border-sky-500/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X (Twitter)
              </a>

              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700/20 hover:bg-blue-700/30 text-blue-400 rounded-lg text-sm transition-all border border-blue-700/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
