import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  category: string;
  status: string;
  attendees: string[];
  maxAttendees: number;
}

const tabLabels: Record<string, string> = {
  all: "Hunda",
  upcoming: "Dhufu",
  ongoing: "Adeemsa",
  completed: "Xumurame",
};

const statusColors: Record<string, string> = {
  upcoming: "bg-green-500/20 text-green-400 border-green-500/30",
  ongoing: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const categoryColors: Record<string, string> = {
  conference: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  workshop: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  social: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  meeting: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  seminar: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  webinar: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
};

function SkeletonCard() {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden animate-pulse">
      <div className="p-6 space-y-4">
        <div className="h-5 bg-gray-700 rounded w-1/4" />
        <div className="h-7 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-2/3" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-700 rounded-full w-20" />
          <div className="h-6 bg-gray-700 rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get("/events");
        setEvents(response.data);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(
          error.response?.data?.message || "Taateewwan fudhachuu hin dandeenye",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = events.filter((event) => {
    const matchesTab = activeTab === "all" || event.status === activeTab;
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Taateewwan</h1>
        <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-1 bg-gray-800/60 rounded-lg p-1 border border-gray-700/50">
          {["all", "upcoming", "ongoing", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              {tabLabels[tab] || tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Taateewwan barbaadi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-800/60 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full sm:w-64"
          />
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl flex items-center gap-3">
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg font-medium">Taateewwan hin argamne</p>
          <p className="text-sm text-gray-600 mt-1">
            Barbaaduu fi geengoo kee fooyyessi
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => {
            const catColor =
              categoryColors[event.category?.toLowerCase()] ||
              "bg-gray-500/20 text-gray-400 border-gray-500/30";
            const statColor =
              statusColors[event.status] ||
              "bg-gray-500/20 text-gray-400 border-gray-500/30";
            return (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="group block bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${catColor}`}
                    >
                      {event.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statColor}`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(event.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.attendees.length}
                      {event.maxAttendees ? `/${event.maxAttendees}` : ""}{" "}
                      hirmaataa
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
