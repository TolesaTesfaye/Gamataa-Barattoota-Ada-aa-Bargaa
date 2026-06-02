import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface Alumni {
  _id: string;
  fullName: string;
  email: string;
  graduationYear: number;
  position: string;
  company: string;
  photo: string;
  bio: string;
  isMentor: boolean;
  isSuccessStory: boolean;
  status: string;
  createdAt: string;
}

export default function AdminAlumni() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editing, setEditing] = useState<Alumni | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    position: "",
    company: "",
    photo: "",
    bio: "",
    graduationYear: new Date().getFullYear(),
  });

  useEffect(() => {
    if (user?.role !== "superadmin" && user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await apiClient.get("/alumni");
      setAlumni(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch alumni");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await apiClient.patch(`/alumni/${id}`, { status: "approved" });
      setAlumni((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "approved" } : a))
      );
      setSuccess("Alumni approved.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to approve");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await apiClient.patch(`/alumni/${id}`, { status: "rejected" });
      setAlumni((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "rejected" } : a))
      );
      setSuccess("Alumni rejected.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reject");
    }
  };

  const toggleMentor = async (id: string, current: boolean) => {
    try {
      await apiClient.patch(`/alumni/${id}`, { isMentor: !current });
      setAlumni((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, isMentor: !current } : a
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to toggle mentor");
    }
  };

  const toggleStory = async (id: string, current: boolean) => {
    try {
      await apiClient.patch(`/alumni/${id}`, {
        isSuccessStory: !current,
      });
      setAlumni((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, isSuccessStory: !current } : a
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to toggle story");
    }
  };

  const openEdit = (a: Alumni) => {
    setEditing(a);
    setEditForm({
      fullName: a.fullName,
      position: a.position || "",
      company: a.company || "",
      photo: a.photo || "",
      bio: a.bio || "",
      graduationYear: a.graduationYear,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      await apiClient.patch(`/alumni/${editing._id}`, editForm);
      setSuccess("Profile updated!");
      setEditing(null);
      fetchAlumni();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading alumni...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-4xl font-bold text-primary">
        Alumni Management
      </h1>

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

      {editing && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-primary mb-4">
            Edit Alumni Profile
          </h3>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={editForm.fullName}
                onChange={(e) =>
                  setEditForm({ ...editForm, fullName: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Position
                </label>
                <input
                  type="text"
                  value={editForm.position}
                  onChange={(e) =>
                    setEditForm({ ...editForm, position: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={editForm.company}
                  onChange={(e) =>
                    setEditForm({ ...editForm, company: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Photo URL
              </label>
              <input
                type="text"
                value={editForm.photo}
                onChange={(e) =>
                  setEditForm({ ...editForm, photo: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Bio
              </label>
              <textarea
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Mentor
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Story
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {alumni.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{a.fullName}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {a.graduationYear}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded text-white text-xs font-semibold ${
                      a.status === "approved"
                        ? "bg-green-500"
                        : a.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleMentor(a._id, a.isMentor)}
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      a.isMentor
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {a.isMentor ? "Yes" : "No"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStory(a._id, a.isSuccessStory)}
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      a.isSuccessStory
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {a.isSuccessStory ? "Yes" : "No"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {a.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(a._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(a._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => openEdit(a)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {alumni.length === 0 && (
          <p className="text-center py-8 text-gray-600">
            No alumni registrations found.
          </p>
        )}
      </div>
    </div>
  );
}
