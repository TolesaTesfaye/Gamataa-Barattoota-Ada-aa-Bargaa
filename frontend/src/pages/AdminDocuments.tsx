import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface Document {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  category: string;
  accessLevel: string;
  downloads: number;
  createdAt: string;
}

const CATEGORIES = [
  "Constitution",
  "Minutes",
  "Reports",
  "Forms",
  "Academic",
  "Other",
];
const ACCESS_LEVELS = ["public", "members", "admin"];

export default function AdminDocuments() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fileUrl: "",
    category: "Other",
    accessLevel: "public",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user?.role !== "superadmin" && user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await apiClient.get("/documents");
      setDocuments(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch documents"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(null);
    try {
      await apiClient.post("/documents", formData);
      setSuccess("Document uploaded!");
      setFormData({
        title: "",
        description: "",
        fileUrl: "",
        category: "Other",
        accessLevel: "public",
      });
      setShowUpload(false);
      fetchDocuments();
    } catch (err: any) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await apiClient.delete(`/documents/${id}`);
      setDocuments((prev) => prev.filter((d) => d._id !== id));
      setSuccess("Document deleted.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleAccessChange = async (id: string, accessLevel: string) => {
    try {
      await apiClient.patch(`/documents/${id}`, { accessLevel });
      setDocuments((prev) =>
        prev.map((d) => (d._id === id ? { ...d, accessLevel } : d))
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update access");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading documents...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">
          Document Management
        </h1>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
        >
          {showUpload ? "Cancel" : "Upload Document"}
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

      {showUpload && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-primary mb-4">
            Upload Document
          </h3>
          <form onSubmit={handleUpload} className="space-y-4">
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
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                File URL
              </label>
              <input
                type="text"
                value={formData.fileUrl}
                onChange={(e) =>
                  setFormData({ ...formData, fileUrl: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Access Level
                </label>
                <select
                  value={formData.accessLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      accessLevel: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {ACCESS_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
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
                Access
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Downloads
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{doc.title}</td>
                <td className="px-6 py-4 text-sm capitalize">
                  {doc.category}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={doc.accessLevel}
                    onChange={(e) =>
                      handleAccessChange(doc._id, e.target.value)
                    }
                    className="px-2 py-1 border rounded text-sm"
                  >
                    {ACCESS_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {doc.downloads}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {documents.length === 0 && (
          <p className="text-center py-8 text-gray-600">
            No documents found.
          </p>
        )}
      </div>
    </div>
  );
}
