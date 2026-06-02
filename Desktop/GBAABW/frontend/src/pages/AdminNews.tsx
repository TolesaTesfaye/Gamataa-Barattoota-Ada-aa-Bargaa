import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  author: any;
  category: string;
  status: string;
  image: string;
  views: number;
  publishedAt: string;
  createdAt: string;
}

const EMPTY_FORM = {
  title: "",
  content: "",
  category: "general",
  image: "",
  status: "draft",
};

export default function AdminNews() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.role !== "superadmin" && user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await apiClient.get("/news");
      setNews(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setFormData(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditing(item);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      image: item.image || "",
      status: item.status,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      if (editing) {
        await apiClient.patch(`/news/${editing._id}`, formData);
        setSuccess("News updated!");
      } else {
        await apiClient.post("/news", formData);
        setSuccess("News created!");
      }
      setShowForm(false);
      setEditing(null);
      fetchNews();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save news");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this news item?")) return;
    try {
      await apiClient.delete(`/news/${id}`);
      setNews((prev) => prev.filter((n) => n._id !== id));
      setSuccess("News deleted.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  };

  const togglePublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      await apiClient.patch(`/news/${id}`, { status: newStatus });
      setNews((prev) =>
        prev.map((n) => (n._id === id ? { ...n, status: newStatus } : n))
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to toggle status");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading news...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">News Management</h1>
        <button
          onClick={openCreate}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
        >
          Create News
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-primary mb-4">
            {editing ? "Edit News" : "Create News"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editing
                    ? "Update"
                    : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{item.title}</td>
                <td className="px-6 py-4">
                  <span className="text-sm capitalize">{item.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded text-white text-xs font-semibold ${
                      item.status === "published"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {item.views}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString()
                    : new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePublish(item._id, item.status)}
                      className={`px-2 py-1 rounded text-xs text-white ${
                        item.status === "published"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {item.status === "published" ? "Draft" : "Publish"}
                    </button>
                    <button
                      onClick={() => openEdit(item)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {news.length === 0 && (
          <p className="text-center py-8 text-gray-600">No news found.</p>
        )}
      </div>
    </div>
  );
}
