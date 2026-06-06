import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface Attendee {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  category: string;
  status: string;
  attendees: Attendee[];
  maxAttendees: number;
  organizer: string;
}

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

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, token } = useAuthStore();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || "Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const isRegistered =
    user &&
    event?.attendees?.some((a: Attendee | string) =>
      typeof a === "object" ? a._id === user._id : a === user._id,
    );

  const handleRegister = async () => {
    if (!event) return;
    setRegistering(true);
    setRegistrationError(null);
    try {
      if (isRegistered) {
        await apiClient.delete(`/events/${event._id}/register`);
        setEvent((prev) =>
          prev
            ? {
                ...prev,
                attendees: prev.attendees.filter((a: Attendee | string) =>
                  typeof a === "object" ? a._id !== user?._id : a !== user?._id,
                ),
              }
            : prev,
        );
      } else {
        const res = await apiClient.post(`/events/${event._id}/register`);
        setEvent((prev) =>
          prev
            ? {
                ...prev,
                attendees: res.data.attendees || [...prev.attendees, user],
              }
            : prev,
        );
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setRegistrationError(error.response?.data?.message || "Action failed");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden animate-pulse">
          <div className="p-8 space-y-6">
            <div className="h-4 bg-gray-700 rounded w-24" />
            <div className="flex gap-3">
              <div className="h-6 bg-gray-700 rounded-full w-20" />
              <div className="h-6 bg-gray-700 rounded-full w-16" />
            </div>
            <div className="h-9 bg-gray-700 rounded w-3/4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-16" />
                  <div className="h-5 bg-gray-700 rounded w-24" />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-2/3" />
            </div>
            <div className="h-20 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
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
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-gray-500">
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
        <p className="text-lg font-medium">Event not found</p>
        <Link
          to="/events"
          className="mt-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          &larr; Back to Events
        </Link>
      </div>
    );
  }

  const catColor =
    categoryColors[event.category?.toLowerCase()] ||
    "bg-gray-500/20 text-gray-400 border-gray-500/30";
  const statColor =
    statusColors[event.status] ||
    "bg-gray-500/20 text-gray-400 border-gray-500/30";
  const attendeePercent = event.maxAttendees
    ? Math.min((event.attendees.length / event.maxAttendees) * 100, 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/events"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors font-medium"
      >
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Events
      </Link>

      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-medium border ${catColor}`}
                >
                  {event.category}
                </span>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-medium border ${statColor}`}
                >
                  {event.status}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-5 bg-gray-900/50 rounded-xl border border-gray-700/30">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Start Date
              </p>
              <p className="text-white font-medium">
                {new Date(event.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                End Date
              </p>
              <p className="text-white font-medium">
                {event.endDate
                  ? new Date(event.endDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Location
              </p>
              <p className="text-white font-medium">{event.location}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Organizer
              </p>
              <p className="text-white font-medium">
                {event.organizer || "GBAABW"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              About This Event
            </h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Registration</h3>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">
                    {event.attendees.length} attending
                    {event.maxAttendees ? ` / ${event.maxAttendees} max` : ""}
                  </span>
                  {event.maxAttendees && (
                    <span className="text-xs text-gray-500">
                      ({Math.round(attendeePercent)}% full)
                    </span>
                  )}
                </div>
                {event.maxAttendees && (
                  <div className="w-full sm:w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${attendeePercent}%` }}
                    />
                  </div>
                )}
                {isRegistered && (
                  <p className="text-green-400 text-sm font-semibold flex items-center gap-1.5">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    You are registered for this event
                  </p>
                )}
              </div>
              {token && user && (
                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRegistered
                      ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25"
                  }`}
                >
                  {registering ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : isRegistered ? (
                    "Unregister"
                  ) : (
                    "Register"
                  )}
                </button>
              )}
            </div>
            {registrationError && (
              <div className="mt-3 bg-red-900/30 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4 shrink-0"
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
                {registrationError}
              </div>
            )}
            {!token && (
              <p className="text-gray-500 text-sm mt-3">
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Log in
                </Link>{" "}
                to register for this event.
              </p>
            )}
          </div>

          {event.attendees.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                Attendees ({event.attendees.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.attendees.map(
                  (attendee: Attendee | string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-gray-700/50 text-gray-300 px-3 py-1.5 rounded-lg text-sm border border-gray-600/30"
                    >
                      {typeof attendee === "object"
                        ? `${attendee.firstName || ""} ${attendee.lastName || ""}`.trim() ||
                          attendee.email ||
                          `Attendee ${idx + 1}`
                        : `Attendee ${idx + 1}`}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
