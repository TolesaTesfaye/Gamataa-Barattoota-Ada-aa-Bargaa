import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface Opportunity {
  _id: string;
  title: string;
  description: string;
  organization: string;
  location: string;
  deadline: string;
  type: string;
  applyLink: string;
  isActive: boolean;
  createdAt: string;
}

const TYPES = ["Internship", "Scholarship", "Job", "Research"];
const EMPTY_FORM = {
  title: "",
  description: "",
  organization: "",
  location: "",
  deadline: "",
  type: "Internship",
  applyLink: "",
};

export default function AdminOpportunities() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.role !== "superadmin" && user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await apiClient.get("/opportunities");
      setOpportunities(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch opportunities"
      );
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setFormData(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (opp: Opportunity) => {
    setEditing(opp);
    setFormData({
      title: opp.title,
      description: opp.description,
      organization: opp.organization,
      location: opp.location || "",
      deadline: opp.deadline ? opp.deadline.substring(0, 10) : "",
      type: opp.type,
      applyLink: opp.applyLink || "",
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
        await apiClient.patch(`/opportunities/${editing._id}`, formData);
        setSuccess("Opportunity updated!");
      } else {
        await apiClient.post("/opportunities", formData);
        setSuccess("Opportunity created!");
      }
      setShowForm(false);
      setEditing(null);
      fetchOpportunities();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to save opportunity"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this opportunity?")) return;
    try {
      await apiClient.delete(`/opportunities/${id}`);
      setOpportunities((prev) => prev.filter((o) => o._id !== id));
      setSuccess("Opportunity deleted.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await apiClient.patch(`/opportunities/${id}`, {
        isActive: !current,
      });
      setOpportunities((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, isActive: !current } : o
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to toggle");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading opportunities...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">
          Opportunity Management
        </h1>
        <button
          onClick={openCreate}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
        >
          Create Opportunity
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
            {editing ? "Edit Opportunity" : "Create Opportunity"}
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
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                rows={4}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organization: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Apply Link
              </label>
              <input
                type="url"
                value={formData.applyLink}
                onChange={(e) =>
                  setFormData({ ...formData, applyLink: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
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
                Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {opportunities.map((opp) => (
              <tr key={opp._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{opp.title}</td>
                <td className="px-6 py-4 text-gray-600">
                  {opp.organization}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-primary text-white px-2 py-1 rounded text-xs">
                    {opp.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActive(opp._id, opp.isActive)}
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      opp.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {opp.isActive ? "Active" : "Expired"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(opp)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(opp._id)}
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
        {opportunities.length === 0 && (
          <p className="text-center py-8 text-gray-600">
            No opportunities found.
          </p>
        )}
      </div>
    </div>
  );
}
