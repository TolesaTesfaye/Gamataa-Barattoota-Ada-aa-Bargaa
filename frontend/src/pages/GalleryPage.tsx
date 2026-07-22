import { useState, useEffect } from "react";
import apiClient from "../services/api";

interface GalleryImage {
  _id: string;
  url: string;
  caption: string;
}

interface Album {
  _id: string;
  title: string;
  description: string;
  category: string;
  images: GalleryImage[];
  createdAt: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  event: "from-blue-600 to-purple-600",
  general: "from-emerald-600 to-teal-600",
  achievement: "from-amber-600 to-orange-600",
  other: "from-pink-600 to-violet-600",
};

function SkeletonCard() {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-1/3" />
        <div className="h-4 bg-gray-700 rounded w-full" />
      </div>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    event: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    general: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    achievement: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    other: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  };
  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${colors[category] || colors.other} capitalize`}
    >
      {category}
    </span>
  );
}

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(
    new Set(),
  );

  const categories = ["all", ...new Set(albums.map((a) => a.category))];

  const filteredAlbums =
    activeCategory === "all"
      ? albums
      : albums.filter((a) => a.category === activeCategory);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await apiClient.get("/gallery");
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setAlbums(data);
        } else {
          setAlbums([]);
          setError("No albums found. Check back later!");
        }
      } catch {
        setError("Failed to load gallery. Please try again later.");
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage || !selectedAlbum) return;
      const currentIndex = selectedAlbum.images.findIndex(
        (img) => img._id === lightboxImage._id,
      );
      if (e.key === "Escape") setLightboxImage(null);
      if (e.key === "ArrowLeft") {
        const prevIndex =
          (currentIndex - 1 + selectedAlbum.images.length) %
          selectedAlbum.images.length;
        setLightboxImage(selectedAlbum.images[prevIndex]);
      }
      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % selectedAlbum.images.length;
        setLightboxImage(selectedAlbum.images[nextIndex]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage, selectedAlbum]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-blue-100 text-xl">
            Browse through our photo albums and memories
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Lightbox
  if (lightboxImage && selectedAlbum) {
    const currentIndex = selectedAlbum.images.findIndex(
      (img) => img._id === lightboxImage._id,
    );
    const handlePrev = () => {
      const prevIndex =
        (currentIndex - 1 + selectedAlbum.images.length) %
        selectedAlbum.images.length;
      setLightboxImage(selectedAlbum.images[prevIndex]);
    };
    const handleNext = () => {
      const nextIndex = (currentIndex + 1) % selectedAlbum.images.length;
      setLightboxImage(selectedAlbum.images[nextIndex]);
    };
    const hasError = imageLoadErrors.has(lightboxImage._id);

    return (
      <div
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        onClick={() => setLightboxImage(null)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLightboxImage(null);
          }}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl transition-colors z-10"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {selectedAlbum.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 text-white/70 hover:text-white transition-colors z-10"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 text-white/70 hover:text-white transition-colors z-10"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
        <div
          className="text-center max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {hasError ? (
            <div className="max-h-[80vh] mx-auto rounded-xl shadow-2xl bg-gray-800 flex items-center justify-center aspect-video">
              <div className="text-center text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p>Image could not be loaded</p>
              </div>
            </div>
          ) : (
            <img
              src={lightboxImage.url}
              alt={lightboxImage.caption}
              className="max-h-[80vh] mx-auto rounded-xl shadow-2xl"
              onError={() =>
                setImageLoadErrors((prev) =>
                  new Set(prev).add(lightboxImage._id),
                )
              }
            />
          )}
          <p className="text-white mt-4 text-lg font-medium">
            {lightboxImage.caption || "Untitled"}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {currentIndex + 1} / {selectedAlbum.images.length}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]" />
        <h1 className="text-5xl font-bold text-white mb-4 relative">Gallery</h1>
        <p className="text-blue-100 text-xl relative">
          Browse through our photo albums and memories
        </p>
      </div>

      {error && (
        <div className="bg-yellow-900/30 border border-yellow-500/30 text-yellow-400 px-5 py-4 rounded-xl flex items-center gap-3">
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Category Filter */}
      {!selectedAlbum && albums.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-blue-500/50 hover:text-white"
              }`}
            >
              {cat === "all"
                ? "All Albums"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}

      {selectedAlbum ? (
        // Album Detail View
        <div>
          <button
            onClick={() => {
              setSelectedAlbum(null);
              setImageLoadErrors(new Set());
            }}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back to Albums</span>
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedAlbum.title}
            </h2>
            <p className="text-gray-400 mb-4 max-w-2xl">
              {selectedAlbum.description}
            </p>
            <CategoryBadge category={selectedAlbum.category} />
            <span className="text-gray-500 text-sm ml-3">
              {selectedAlbum.images.length} photo
              {selectedAlbum.images.length !== 1 ? "s" : ""}
            </span>
          </div>

          {selectedAlbum.images.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-medium">No photos in this album yet</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {selectedAlbum.images.map((image) => {
                const hasError = imageLoadErrors.has(image._id);
                return (
                  <div
                    key={image._id}
                    className="break-inside-avoid cursor-pointer group/image rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                    onClick={() => setLightboxImage(image)}
                  >
                    {hasError ? (
                      <div className="w-full aspect-square bg-gray-800 flex items-center justify-center group-hover/image:scale-105 transition-transform duration-500">
                        <div className="text-center text-gray-500">
                          <svg
                            className="w-10 h-10 mx-auto mb-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-xs">No Image</span>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={image.url}
                        alt={image.caption || "Gallery image"}
                        className="w-full group-hover/image:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={() =>
                          setImageLoadErrors((prev) =>
                            new Set(prev).add(image._id),
                          )
                        }
                      />
                    )}
                    {image.caption && (
                      <p className="text-sm text-gray-400 text-center py-2 bg-gray-800/80 truncate px-2">
                        {image.caption}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        // Album Grid View
        <>
          {filteredAlbums.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <svg
                className="w-16 h-16 mb-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-medium">No albums found</p>
              <p className="text-sm text-gray-600 mt-1">
                {activeCategory !== "all"
                  ? `No albums in the "${activeCategory}" category`
                  : "Albums will appear here once uploaded"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAlbums.map((album) => {
                const firstImage = album.images[0];
                const firstImageHasError =
                  firstImage && imageLoadErrors.has(firstImage._id);
                const gradient =
                  CATEGORY_COLORS[album.category] || CATEGORY_COLORS.other;

                return (
                  <div
                    key={album._id}
                    className="group bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedAlbum(album);
                      setImageLoadErrors(new Set());
                    }}
                  >
                    {firstImage && !firstImageHasError && firstImage.url ? (
                      <img
                        src={firstImage.url}
                        alt={album.title}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() =>
                          setImageLoadErrors((prev) =>
                            new Set(prev).add(firstImage._id),
                          )
                        }
                      />
                    ) : (
                      <div
                        className={`w-full aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}
                      >
                        <div className="text-center text-white/80">
                          <svg
                            className="w-16 h-16 mx-auto mb-2 opacity-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-lg font-bold">
                            {album.title}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {album.title}
                        </h3>
                        <span className="bg-blue-500/10 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-500/20 shrink-0 ml-3">
                          {album.images.length}{" "}
                          {album.images.length === 1 ? "photo" : "photos"}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
                        {album.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <CategoryBadge category={album.category} />
                        <span className="text-gray-500 text-xs">
                          {new Date(album.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
