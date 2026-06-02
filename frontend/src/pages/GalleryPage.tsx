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
  images: GalleryImage[];
}

const GRADIENTS = [
  "from-blue-600 to-purple-600",
  "from-emerald-600 to-teal-600",
  "from-orange-600 to-rose-600",
  "from-cyan-600 to-indigo-600",
  "from-pink-600 to-violet-600",
  "from-amber-600 to-red-600",
];

const sampleAlbums: Album[] = [
  {
    _id: "2018",
    title: "2018 Gallery",
    description: "Gabaasa suuraa fi waan cimaa bara 2018 keessatti ta'aniif yaadannoo.",
    images: [
      { _id: "2018-1", url: "/gallery-2018/photo_2026-04-26_22-03-19.jpg", caption: "Walga'ii guddaa bara 2018" },
      { _id: "2018-2", url: "/gallery-2018/photo_2026-06-02_15-32-27.jpg", caption: "Baga gammaddaa fi kabajaa" },
      { _id: "2018-3", url: "/gallery-2018/photo_2026-06-02_15-33-22.jpg", caption: "Itoophiyaa keenya kabajaa" },
      { _id: "2018-4", url: "/gallery-2018/photo_2026-06-02_15-33-29.jpg", caption: "Kabajaa fi kabajaa" },
      { _id: "2018-5", url: "/gallery-2018/photo_2026-06-02_15-33-38.jpg", caption: "Baga gammaddaa" },
      { _id: "2018-6", url: "/gallery-2018/photo_2026-06-02_15-33-44.jpg", caption: "Walqabii fi jaalala" },
      { _id: "2018-7", url: "/gallery-2018/photo_2026-06-02_15-33-51.jpg", caption: "Waliin jiraachuu fi wal gargaaruu" },
      { _id: "2018-8", url: "/gallery-2018/photo_2026-06-02_15-34-03.jpg", caption: "Walitti dhufeenya cimaa" },
    ],
  },
  {
    _id: "s1",
    title: "Annual Conference 2025",
    description: "Highlights from our annual gathering bringing together members from across the UK for a weekend of legal discourse and networking.",
    images: [
      { _id: "si1", url: "", caption: "Keynote address by the president" },
      { _id: "si2", url: "", caption: "Panel discussion on legal reforms" },
      { _id: "si3", url: "", caption: "Networking reception" },
      { _id: "si4", url: "", caption: "Award ceremony" },
    ],
  },
  {
    _id: "s2",
    title: "Community Legal Outreach",
    description: "Giving back to the community through pro bono legal advice clinics held across various London boroughs.",
    images: [
      { _id: "si5", url: "", caption: "Legal advice clinic" },
      { _id: "si6", url: "", caption: "Volunteer solicitors" },
      { _id: "si7", url: "", caption: "Community engagement session" },
    ],
  },
  {
    _id: "s3",
    title: "Professional Development Workshops",
    description: "Continuing legal education sessions covering conveyancing, family law, and commercial litigation.",
    images: [
      { _id: "si8", url: "", caption: "Workshop in progress" },
      { _id: "si9", url: "", caption: "Interactive session" },
      { _id: "si10", url: "", caption: "Certificate presentation" },
      { _id: "si11", url: "", caption: "Group photograph" },
    ],
  },
  {
    _id: "s4",
    title: "Cultural & Social Events",
    description: "Celebrating Ghanaian heritage through our annual cultural night, dinners, and social mixers.",
    images: [
      { _id: "si12", url: "", caption: "Annual dinner gala" },
      { _id: "si13", url: "", caption: "Cultural dance performance" },
      { _id: "si14", url: "", caption: "Members networking" },
    ],
  },
];

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

function GradientPlaceholder({ caption, className }: { caption: string; className?: string }) {
  const hash = caption.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const gradient = GRADIENTS[hash % GRADIENTS.length];
  return (
    <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className || ""}`}>
      <span className="text-white/80 text-sm font-medium px-2 text-center leading-tight">{caption}</span>
    </div>
  );
}

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await apiClient.get("/gallery");
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setAlbums(data);
        } else {
          setAlbums(sampleAlbums);
          setError("No albums from server. Showing sample data.");
        }
      } catch {
        setError("Failed to load gallery. Showing sample data.");
        setAlbums(sampleAlbums);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  if (loading) {
    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-blue-100 text-xl">Browse through our photo albums and memories</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (lightboxImage && selectedAlbum) {
    const currentIndex = selectedAlbum.images.findIndex((img) => img._id === lightboxImage._id);
    const handlePrev = () => {
      const prevIndex = (currentIndex - 1 + selectedAlbum.images.length) % selectedAlbum.images.length;
      setLightboxImage(selectedAlbum.images[prevIndex]);
    };
    const handleNext = () => {
      const nextIndex = (currentIndex + 1) % selectedAlbum.images.length;
      setLightboxImage(selectedAlbum.images[nextIndex]);
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    return (
      <div
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <button
          onClick={() => setLightboxImage(null)}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl transition-colors z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          onClick={handlePrev}
          className="absolute left-4 text-white/70 hover:text-white transition-colors z-10"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 text-white/70 hover:text-white transition-colors z-10"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="text-center max-w-5xl w-full">
          {lightboxImage.url ? (
            <img src={lightboxImage.url} alt={lightboxImage.caption} className="max-h-[80vh] mx-auto rounded-xl shadow-2xl" />
          ) : (
            <GradientPlaceholder caption={lightboxImage.caption} className="max-h-[80vh] aspect-video mx-auto rounded-xl shadow-2xl" />
          )}
          <p className="text-white mt-4 text-lg font-medium">{lightboxImage.caption}</p>
          <p className="text-gray-400 text-sm mt-1">{currentIndex + 1} / {selectedAlbum.images.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]" />
        <h1 className="text-5xl font-bold text-white mb-4 relative">Gallery</h1>
        <p className="text-blue-100 text-xl relative">Browse through our photo albums and memories</p>
      </div>

      {error && (
        <div className="bg-yellow-900/30 border border-yellow-500/30 text-yellow-400 px-5 py-4 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {selectedAlbum ? (
        <div>
          <button
            onClick={() => setSelectedAlbum(null)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Albums</span>
          </button>

          <h2 className="text-3xl font-bold text-white mb-2">{selectedAlbum.title}</h2>
          <p className="text-gray-400 mb-8 max-w-2xl">{selectedAlbum.description}</p>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {selectedAlbum.images.map((image) => (
              <div
                key={image._id}
                className="break-inside-avoid cursor-pointer group/image rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                onClick={() => setLightboxImage(image)}
              >
                {image.url ? (
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full rounded-xl group-hover/image:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <GradientPlaceholder caption={image.caption} className="w-full aspect-square group-hover/image:scale-105 transition-transform duration-500" />
                )}
                <p className="text-sm text-gray-400 text-center py-2 bg-gray-800/80">{image.caption}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {albums.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">No albums yet</p>
              <p className="text-sm text-gray-600 mt-1">Albums will appear here once uploaded</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {albums.map((album) => {
                const firstImage = album.images[0];
                return (
                  <div
                    key={album._id}
                    className="group bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedAlbum(album)}
                  >
                    {firstImage?.url ? (
                      <img
                        src={firstImage.url}
                        alt={album.title}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <GradientPlaceholder caption={album.title} className="w-full aspect-square group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{album.title}</h3>
                        <span className="bg-blue-500/10 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-500/20 shrink-0 ml-3">
                          {album.images.length} {album.images.length === 1 ? "photo" : "photos"}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{album.description}</p>
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
