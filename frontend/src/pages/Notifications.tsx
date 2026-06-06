import { useState, useEffect } from "react";
import apiClient from "../services/api";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await apiClient.get("/notifications");
      setNotifications(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Beeksisota fudhachuu hin dandeenye"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err: any) {
      console.error("Failed to mark as read", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await apiClient.patch("/notifications/read-all");
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (err: any) {
      console.error("Failed to mark all as read", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Beeksisa kana haquu?")) return;
    try {
      await apiClient.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err: any) {
      console.error("Failed to delete notification", err);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "info":
        return "ℹ️";
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "event":
        return "📅";
      case "message":
        return "✉️";
      default:
        return "🔔";
    }
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = Math.floor((now.getTime() - then.getTime()) / 1000);
    if (diff < 60) return "amma";
    if (diff < 3600) return `${Math.floor(diff / 60)}dak. dura`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}sa'at. dura`;
    return `${Math.floor(diff / 86400)}guyy. dura`;
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (loading) {
    return <div className="text-center py-12">Beeksisota fe'aa jira...</div>;
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
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">Beeksisota</h1>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
          >
            Hunda Kan Dubbifame gochuu ({unreadCount})
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-600">Beeksi hin jiru.</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => !notification.isRead && handleMarkRead(notification._id)}
              className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex items-start gap-4 ${
                !notification.isRead
                  ? "border-l-4 border-primary"
                  : "opacity-75"
              }`}
            >
              <div className="text-2xl">
                {getTypeIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3
                    className={`font-semibold ${
                      !notification.isRead
                        ? "text-primary"
                        : "text-gray-700"
                    }`}
                  >
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {timeAgo(notification.createdAt)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(notification._id);
                }}
                className="text-red-500 hover:text-red-700 transition"
                title="Haqi"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
