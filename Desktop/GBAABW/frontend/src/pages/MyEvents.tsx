import { useState, useEffect } from "react";
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
}

export default function MyEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">(
    "upcoming"
  );

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const response = await apiClient.get("/events/my-registrations");
      setEvents(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch your events"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUnregister = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to unregister?")) return;
    try {
      await apiClient.delete(`/events/${eventId}/register`);
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to unregister");
    }
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    if (activeTab === "upcoming") return eventDate >= now;
    if (activeTab === "past") return eventDate < now;
    return true;
  });

  if (loading) {
    return <div className="text-center py-12">Loading your events...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-4xl font-bold text-primary">My Events</h1>

      <div className="flex gap-2">
        {(["upcoming", "past", "all"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded capitalize transition ${
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-gray-600">
          No {activeTab === "all" ? "" : activeTab} events found.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 capitalize">{event.category}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-white capitalize text-sm font-semibold ${
                    event.status === "upcoming"
                      ? "bg-green-500"
                      : event.status === "ongoing"
                        ? "bg-blue-500"
                        : event.status === "completed"
                          ? "bg-gray-500"
                          : "bg-red-500"
                  }`}
                >
                  {event.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <strong className="text-gray-600">Date:</strong>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <strong className="text-gray-600">Location:</strong>
                  <p>{event.location}</p>
                </div>
              </div>

              <button
                onClick={() => handleUnregister(event._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Unregister
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
