import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import apiClient from "../services/api";

interface Member {
  name: string;
  field: string;
  year: string;
  phone: string;
  campus: string;
  village: string;
  entry: string;
  school: string;
}

interface Committee {
  _id: string;
  id: string;
  name: string;
  head: string;
  description: string;
  color: string;
  members: Member[];
  academicYear: string;
}

const colorMap: Record<
  string,
  {
    bg: string;
    darkBg: string;
    text: string;
    darkText: string;
    border: string;
    darkBorder: string;
    badge: string;
    darkBadge: string;
  }
> = {
  blue: {
    bg: "bg-blue-100",
    darkBg: "dark:bg-blue-900/50",
    text: "text-blue-600",
    darkText: "dark:text-blue-400",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-800",
    badge: "bg-blue-50",
    darkBadge: "dark:bg-blue-900/30",
  },
  emerald: {
    bg: "bg-emerald-100",
    darkBg: "dark:bg-emerald-900/50",
    text: "text-emerald-600",
    darkText: "dark:text-emerald-400",
    border: "border-emerald-200",
    darkBorder: "dark:border-emerald-800",
    badge: "bg-emerald-50",
    darkBadge: "dark:bg-emerald-900/30",
  },
  amber: {
    bg: "bg-amber-100",
    darkBg: "dark:bg-amber-900/50",
    text: "text-amber-600",
    darkText: "dark:text-amber-400",
    border: "border-amber-200",
    darkBorder: "dark:border-amber-800",
    badge: "bg-amber-50",
    darkBadge: "dark:bg-amber-900/30",
  },
  purple: {
    bg: "bg-purple-100",
    darkBg: "dark:bg-purple-900/50",
    text: "text-purple-600",
    darkText: "dark:text-purple-400",
    border: "border-purple-200",
    darkBorder: "dark:border-purple-800",
    badge: "bg-purple-50",
    darkBadge: "dark:bg-purple-900/30",
  },
  rose: {
    bg: "bg-rose-100",
    darkBg: "dark:bg-rose-900/50",
    text: "text-rose-600",
    darkText: "dark:text-rose-400",
    border: "border-rose-200",
    darkBorder: "dark:border-rose-800",
    badge: "bg-rose-50",
    darkBadge: "dark:bg-rose-900/30",
  },
};

export default function Koreewwan() {
  const { user } = useAuthStore();
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCell, setEditingCell] = useState<{
    committeeId: string;
    memberIndex: number;
    field: keyof Member;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editingCommitteeField, setEditingCommitteeField] = useState<{
    committeeId: string;
    field: string;
  } | null>(null);
  const [editCommitteeValue, setEditCommitteeValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [addingMember, setAddingMember] = useState<string | null>(null);
  const [newMember, setNewMember] = useState<Member>({
    name: "",
    field: "",
    year: "",
    phone: "",
    campus: "",
    village: "",
    entry: "",
    school: "",
  });

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  useEffect(() => {
    fetchCommittees();
  }, []);

  const fetchCommittees = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/committees");
      setCommittees(res.data);
    } catch (err: unknown) {
      setError("Failed to load committees");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (
    committeeId: string,
    memberIndex: number,
    field: keyof Member,
    value: string,
  ) => {
    setEditingCell({ committeeId, memberIndex, field });
    setEditValue(value);
  };

  const saveCell = async () => {
    if (!editingCell) return;
    const { committeeId, memberIndex, field } = editingCell;
    try {
      setSaving(true);
      const committee = committees.find(
        (c) => c._id === committeeId || c.id === committeeId,
      );
      if (!committee) return;
      const updatedMembers = [...committee.members];
      updatedMembers[memberIndex] = {
        ...updatedMembers[memberIndex],
        [field]: editValue,
      };
      await apiClient.patch(`/committees/${committeeId}`, {
        members: updatedMembers,
      });
      setCommittees((prev) =>
        prev.map((c) =>
          c._id === committeeId || c.id === committeeId
            ? { ...c, members: updatedMembers }
            : c,
        ),
      );
      setEditingCell(null);
      setEditValue("");
    } catch (err) {
      console.error("Failed to save", err);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const startEditCommitteeField = (
    committeeId: string,
    field: string,
    value: string,
  ) => {
    setEditingCommitteeField({ committeeId, field });
    setEditCommitteeValue(value);
  };

  const saveCommitteeField = async () => {
    if (!editingCommitteeField) return;
    const { committeeId, field } = editingCommitteeField;
    try {
      setSaving(true);
      await apiClient.patch(`/committees/${committeeId}`, {
        [field]: editCommitteeValue,
      });
      setCommittees((prev) =>
        prev.map((c) =>
          c._id === committeeId || c.id === committeeId
            ? { ...c, [field]: editCommitteeValue }
            : c,
        ),
      );
      setEditingCommitteeField(null);
      setEditCommitteeValue("");
    } catch (err) {
      console.error("Failed to save", err);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const deleteMember = async (committeeId: string, memberIndex: number) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      setSaving(true);
      const committee = committees.find(
        (c) => c._id === committeeId || c.id === committeeId,
      );
      if (!committee) return;
      const updatedMembers = committee.members.filter(
        (_, i) => i !== memberIndex,
      );
      await apiClient.patch(`/committees/${committeeId}`, {
        members: updatedMembers,
      });
      setCommittees((prev) =>
        prev.map((c) =>
          c._id === committeeId || c.id === committeeId
            ? { ...c, members: updatedMembers }
            : c,
        ),
      );
    } catch (err) {
      console.error("Failed to delete member", err);
      alert("Failed to delete member");
    } finally {
      setSaving(false);
    }
  };

  const addMember = async (committeeId: string) => {
    if (!newMember.name.trim()) {
      alert("Member name is required");
      return;
    }
    try {
      setSaving(true);
      const committee = committees.find(
        (c) => c._id === committeeId || c.id === committeeId,
      );
      if (!committee) return;
      const updatedMembers = [...committee.members, { ...newMember }];
      await apiClient.patch(`/committees/${committeeId}`, {
        members: updatedMembers,
      });
      setCommittees((prev) =>
        prev.map((c) =>
          c._id === committeeId || c.id === committeeId
            ? { ...c, members: updatedMembers }
            : c,
        ),
      );
      setAddingMember(null);
      setNewMember({
        name: "",
        field: "",
        year: "",
        phone: "",
        campus: "",
        village: "",
        entry: "",
        school: "",
      });
    } catch (err) {
      console.error("Failed to add member", err);
      alert("Failed to add member");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading committees...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchCommittees}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-violet-900 dark:from-indigo-900 dark:via-violet-950 dark:to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium tracking-wide">
            Bara 2017
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            KOREEWWAN
          </h1>
          <p className="text-lg sm:text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
            Koreewwan bara 2017 fi maatii isaanii — Daataan barattoota
            koolleejjii isaanii waliin
          </p>
        </div>
      </div>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 mb-12">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                <strong className="text-gray-900 dark:text-white">
                  Hubachiisa:
                </strong>{" "}
                Gucni armaan gadii kun daataa barattootaa kan bara 2017 yookiin
                kan yeroo dookimentiin kun itti barreeffameedha. Kanaaf guca
                kana keessatti barattoota koolleejjii isaanii waliin
                walsimsiisudhaan kan bara baraan osoo boca isaa isa duraa gadi
                hin dhiisisin kan haaromfamuudha.
                {isAdmin && (
                  <span className="block mt-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    ✏️ Admin mode: Cuqaasuun bakka fedhettii gulaaluu dandeessu.
                  </span>
                )}
              </p>
            </div>
          </div>

          {committees.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Committees not found. Please seed the database.
              </p>
            </div>
          )}

          {committees.map((committee) => {
            const cId = committee._id || committee.id;
            const c = colorMap[committee.color] || colorMap.blue;
            return (
              <div key={cId} className="mb-16 last:mb-0">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl ${c.bg} ${c.darkBg} flex items-center justify-center shrink-0`}
                  >
                    <svg
                      className={`w-6 h-6 ${c.text} ${c.darkText}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    {isAdmin &&
                    editingCommitteeField?.committeeId === cId &&
                    editingCommitteeField?.field === "name" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editCommitteeValue}
                          onChange={(e) =>
                            setEditCommitteeValue(e.target.value)
                          }
                          className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-bold"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveCommitteeField();
                            if (e.key === "Escape")
                              setEditingCommitteeField(null);
                          }}
                        />
                        <button
                          onClick={saveCommitteeField}
                          className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                          disabled={saving}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => setEditingCommitteeField(null)}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                          {committee.name}
                        </h2>
                        {isAdmin && (
                          <button
                            onClick={() =>
                              startEditCommitteeField(
                                cId,
                                "name",
                                committee.name,
                              )
                            }
                            className="p-1 text-gray-400 hover:text-indigo-500 transition rounded"
                            title="Edit name"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    )}
                    {isAdmin &&
                    editingCommitteeField?.committeeId === cId &&
                    editingCommitteeField?.field === "head" ? (
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          value={editCommitteeValue}
                          onChange={(e) =>
                            setEditCommitteeValue(e.target.value)
                          }
                          className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveCommitteeField();
                            if (e.key === "Escape")
                              setEditingCommitteeField(null);
                          }}
                        />
                        <button
                          onClick={saveCommitteeField}
                          className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                          disabled={saving}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => setEditingCommitteeField(null)}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        Too'ataa:{" "}
                        <span className="font-semibold">{committee.head}</span>
                        {isAdmin && (
                          <button
                            onClick={() =>
                              startEditCommitteeField(
                                cId,
                                "head",
                                committee.head,
                              )
                            }
                            className="ml-2 p-0.5 text-gray-400 hover:text-indigo-500 transition rounded align-middle"
                            title="Edit head"
                          >
                            <svg
                              className="w-3.5 h-3.5 inline"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 mb-6">
                  {isAdmin &&
                  editingCommitteeField?.committeeId === cId &&
                  editingCommitteeField?.field === "description" ? (
                    <div className="flex items-start gap-2">
                      <textarea
                        value={editCommitteeValue}
                        onChange={(e) => setEditCommitteeValue(e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm leading-relaxed"
                        rows={3}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.ctrlKey)
                            saveCommitteeField();
                          if (e.key === "Escape")
                            setEditingCommitteeField(null);
                        }}
                      />
                      <button
                        onClick={saveCommitteeField}
                        className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded shrink-0"
                        disabled={saving}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setEditingCommitteeField(null)}
                        className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded shrink-0"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                        {committee.description}
                      </p>
                      {isAdmin && (
                        <button
                          onClick={() =>
                            startEditCommitteeField(
                              cId,
                              "description",
                              committee.description,
                            )
                          }
                          className="p-1 text-gray-400 hover:text-indigo-500 transition rounded shrink-0 mt-0.5"
                          title="Edit description"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="overflow-x-auto rounded-2xl shadow-lg dark:shadow-gray-900/50">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`${c.bg} ${c.darkBg}`}>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                          Maqaa
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                          Ogummaa
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                          Waggaa
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                          Bilbilaa
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                          Kampus
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                          Gandaa
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                          Seenaa
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                          Mana Barnootaa
                        </th>
                        {isAdmin && (
                          <th className="text-center px-4 py-3 font-semibold text-gray-900 dark:text-white w-20">
                            Action
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {committee.members.map((m, i) => {
                        const cellClass =
                          "px-4 py-3 text-gray-700 dark:text-gray-300";
                        const cellEditClass = "px-4 py-3";
                        const isEditing =
                          editingCell?.committeeId === cId &&
                          editingCell?.memberIndex === i;

                        const renderCell = (
                          field: keyof Member,
                          value: string,
                          className = "",
                        ) => {
                          const currentlyEditing =
                            isEditing && editingCell?.field === field;
                          return (
                            <td className={`${cellClass} ${className}`}>
                              {isAdmin && currentlyEditing ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) =>
                                      setEditValue(e.target.value)
                                    }
                                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                    autoFocus
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") saveCell();
                                      if (e.key === "Escape")
                                        setEditingCell(null);
                                    }}
                                  />
                                  <button
                                    onClick={saveCell}
                                    className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                                    disabled={saving}
                                    title="Save"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => setEditingCell(null)}
                                    className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                                    title="Cancel"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 group">
                                  <span>{value || "—"}</span>
                                  {isAdmin && (
                                    <button
                                      onClick={() =>
                                        startEdit(cId, i, field, value)
                                      }
                                      className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-400 hover:text-indigo-500 transition rounded"
                                      title="Edit"
                                    >
                                      <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 16.802a4.5 4.5 0 01-1.897 1.13L4.5 18.5l0.932-3.115a4.5 4.5 0 011.13-1.897l9.3-9.301z"
                                        />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        };

                        return (
                          <tr
                            key={i}
                            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            {renderCell(
                              "name",
                              m.name,
                              "font-medium text-gray-900 dark:text-white",
                            )}
                            {renderCell("field", m.field)}
                            <td className={cellClass}>
                              {isAdmin &&
                              isEditing &&
                              editingCell?.field === "year" ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) =>
                                      setEditValue(e.target.value)
                                    }
                                    className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                    autoFocus
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") saveCell();
                                      if (e.key === "Escape")
                                        setEditingCell(null);
                                    }}
                                  />
                                  <button
                                    onClick={saveCell}
                                    className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                                    disabled={saving}
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => setEditingCell(null)}
                                    className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 group">
                                  <span
                                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${c.badge} ${c.darkBadge} ${c.text} ${c.darkText}`}
                                  >
                                    {m.year || "—"}
                                  </span>
                                  {isAdmin && (
                                    <button
                                      onClick={() =>
                                        startEdit(cId, i, "year", m.year)
                                      }
                                      className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-400 hover:text-indigo-500 transition rounded"
                                      title="Edit"
                                    >
                                      <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 16.802a4.5 4.5 0 01-1.897 1.13L4.5 18.5l0.932-3.115a4.5 4.5 0 011.13-1.897l9.3-9.301z"
                                        />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                            {renderCell("phone", m.phone)}
                            {renderCell("campus", m.campus)}
                            {renderCell("village", m.village)}
                            {renderCell("entry", m.entry)}
                            {renderCell("school", m.school)}
                            {isAdmin && (
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => deleteMember(cId, i)}
                                  className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                                  title="Delete member"
                                  disabled={saving}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {isAdmin && (
                  <div className="mt-4">
                    {addingMember === cId ? (
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                          Add New Member
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          {(
                            [
                              "name",
                              "field",
                              "year",
                              "phone",
                              "campus",
                              "village",
                              "entry",
                              "school",
                            ] as (keyof Member)[]
                          ).map((field) => (
                            <div key={field}>
                              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 capitalize">
                                {field}
                              </label>
                              <input
                                type="text"
                                value={newMember[field]}
                                onChange={(e) =>
                                  setNewMember((prev) => ({
                                    ...prev,
                                    [field]: e.target.value,
                                  }))
                                }
                                placeholder={`Enter ${field}`}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => addMember(cId)}
                            disabled={saving || !newMember.name.trim()}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition disabled:opacity-50 text-sm font-medium"
                          >
                            {saving ? "Saving..." : "Add Member"}
                          </button>
                          <button
                            onClick={() => {
                              setAddingMember(null);
                              setNewMember({
                                name: "",
                                field: "",
                                year: "",
                                phone: "",
                                campus: "",
                                village: "",
                                entry: "",
                                school: "",
                              });
                            }}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAddingMember(cId)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-xl hover:border-indigo-400 hover:text-indigo-500 transition w-full justify-center text-sm font-medium"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        Add New Member
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
