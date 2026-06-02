import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface DashboardStats {
  events: { upcoming: number; ongoing: number; completed: number; total: number };
  news: { published: number; draft: number; total: number };
  documents: number;
  galleries: number;
  alumni: number;
  payments: { totalRevenue: number; pending: number };
  contacts: { unread: number; total: number };
  opportunities: { active: number; total: number };
}

export default function LeaderDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/dashboard");
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await apiClient.get("/dashboard/stats");
      setStats(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats
    ? [
        { label: "Upcoming Events", value: stats.events.upcoming, color: "bg-purple-500" },
        { label: "Ongoing Events", value: stats.events.ongoing, color: "bg-blue-500" },
        { label: "Published News", value: stats.news.published, color: "bg-green-500" },
        { label: "Draft News", value: stats.news.draft, color: "bg-yellow-500" },
        { label: "Documents", value: stats.documents, color: "bg-indigo-500" },
        { label: "Gallery Albums", value: stats.galleries, color: "bg-pink-500" },
        { label: "Alumni", value: stats.alumni, color: "bg-teal-500" },
        { label: "Unread Messages", value: stats.contacts.unread, color: "bg-red-500" },
        { label: "Active Opportunities", value: stats.opportunities.active, color: "bg-cyan-500" },
        { label: "Pending Payments", value: stats.payments.pending, color: "bg-rose-500" },
      ]
    : [];

  const maxValue = Math.max(...statCards.map((s) => s.value), 1);

  const quickActions = [
    { label: "Manage Events", path: "/admin/events", color: "bg-purple-600" },
    { label: "News & Updates", path: "/admin/news", color: "bg-yellow-600" },
    { label: "Gallery", path: "/admin/gallery", color: "bg-pink-600" },
    { label: "Documents", path: "/admin/documents", color: "bg-indigo-600" },
    { label: "Alumni", path: "/admin/alumni", color: "bg-teal-600" },
    { label: "Opportunities", path: "/admin/opportunities", color: "bg-orange-600" },
    { label: "Contact", path: "/admin/contact", color: "bg-red-600" },
  ];

  if (loading) return <div className="text-center py-12 text-gray-500">Loading dashboard...</div>;

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage content and community engagement</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          admin
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            <div className="mt-3 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
              <div className={`${stat.color} rounded-full h-1.5 transition-all`} style={{ width: `${(stat.value / maxValue) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={`${action.color} text-white px-4 py-3 rounded-lg hover:opacity-90 transition text-sm font-semibold`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
