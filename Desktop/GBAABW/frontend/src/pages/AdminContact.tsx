import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
  status: string;
  createdAt: string;
}

const STATUSES = ["pending", "read", "replied", "closed"];
const TYPES = ["All", "general", "feedback", "complaint", "inquiry", "support"];

export default function AdminContact() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (user?.role !== "superadmin" && user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await apiClient.get("/contact");
      setContacts(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch contact submissions"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await apiClient.patch(`/contact/${id}`, { status });
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c))
      );
      if (selected?._id === id) {
        setSelected({ ...selected, status });
      }
      setSuccess("Status updated.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !replyText.trim()) return;
    setSending(true);
    setError(null);
    try {
      await apiClient.post(`/contact/${selected._id}/reply`, {
        message: replyText,
      });
      setSuccess("Reply sent!");
      setReplyText("");
      handleStatusChange(selected._id, "replied");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const filtered = contacts.filter((c) => {
    const matchesType = filterType === "All" || c.type === filterType;
    const matchesStatus =
      filterStatus === "All" || c.status === filterStatus;
    return matchesType && matchesStatus;
  });

  if (loading) {
    return <div className="text-center py-12">Loading contact submissions...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-4xl font-bold text-primary">
        Contact Management
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

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Type
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-y-auto max-h-[600px]">
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-gray-600">
              No submissions found.
            </p>
          ) : (
            <div className="divide-y divide-gray-200">
              {filtered.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => {
                    setSelected(contact);
                    if (contact.status === "pending") {
                      handleStatusChange(contact._id, "read");
                    }
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                    selected?._id === contact._id
                      ? "bg-blue-50 border-l-4 border-primary"
                      : contact.status === "pending"
                        ? "bg-yellow-50"
                        : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {contact.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        contact.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : contact.status === "read"
                            ? "bg-blue-100 text-blue-700"
                            : contact.status === "replied"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {contact.subject}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {contact.type} &middot;{" "}
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {selected ? (
            <>
              <h3 className="text-xl font-bold text-primary mb-2">
                {selected.subject}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                From: {selected.name} ({selected.email})
              </p>
              <div className="mb-4">
                <span
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    selected.type === "general"
                      ? "bg-gray-100 text-gray-700"
                      : selected.type === "feedback"
                        ? "bg-green-100 text-green-700"
                        : selected.type === "complaint"
                          ? "bg-red-100 text-red-700"
                          : selected.type === "inquiry"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {selected.type}
                </span>
                <span
                  className={`ml-2 px-3 py-1 rounded text-xs font-semibold ${
                    selected.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : selected.status === "read"
                        ? "bg-blue-100 text-blue-700"
                        : selected.status === "replied"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {selected.status}
                </span>
              </div>
              <p className="text-gray-700 mb-6 whitespace-pre-wrap">
                {selected.message}
              </p>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Change Status
                </label>
                <select
                  value={selected.status}
                  onChange={(e) =>
                    handleStatusChange(selected._id, e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleReply}>
                <label className="block text-gray-700 font-semibold mb-2">
                  Reply
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  placeholder="Write your reply..."
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                  required
                />
                <button
                  type="submit"
                  disabled={sending || !replyText.trim()}
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send Reply"}
                </button>
              </form>
            </>
          ) : (
            <p className="text-gray-600 text-center py-12">
              Select a submission to view details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
