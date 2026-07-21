import { useEffect, useState, useCallback } from "react";
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

const COLOR_THEMES: Record<
  string,
  {
    gradient: string;
    darkGradient: string;
    accent: string;
    darkAccent: string;
    badge: string;
    darkBadge: string;
    headerBg: string;
    ring: string;
    icon: string;
    darkIcon: string;
  }
> = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    darkGradient: "dark:from-blue-700 dark:to-blue-800",
    accent: "text-blue-600",
    darkAccent: "dark:text-blue-400",
    badge: "bg-blue-50 text-blue-700",
    darkBadge: "dark:bg-blue-900/30 dark:text-blue-300",
    headerBg: "bg-blue-50 dark:bg-blue-900/20",
    ring: "ring-blue-400",
    icon: "text-blue-500",
    darkIcon: "dark:text-blue-400",
  },
  emerald: {
    gradient: "from-emerald-500 to-emerald-600",
    darkGradient: "dark:from-emerald-700 dark:to-emerald-800",
    accent: "text-emerald-600",
    darkAccent: "dark:text-emerald-400",
    badge: "bg-emerald-50 text-emerald-700",
    darkBadge: "dark:bg-emerald-900/30 dark:text-emerald-300",
    headerBg: "bg-emerald-50 dark:bg-emerald-900/20",
    ring: "ring-emerald-400",
    icon: "text-emerald-500",
    darkIcon: "dark:text-emerald-400",
  },
  amber: {
    gradient: "from-amber-500 to-amber-600",
    darkGradient: "dark:from-amber-700 dark:to-amber-800",
    accent: "text-amber-600",
    darkAccent: "dark:text-amber-400",
    badge: "bg-amber-50 text-amber-700",
    darkBadge: "dark:bg-amber-900/30 dark:text-amber-300",
    headerBg: "bg-amber-50 dark:bg-amber-900/20",
    ring: "ring-amber-400",
    icon: "text-amber-500",
    darkIcon: "dark:text-amber-400",
  },
  purple: {
    gradient: "from-purple-500 to-purple-600",
    darkGradient: "dark:from-purple-700 dark:to-purple-800",
    accent: "text-purple-600",
    darkAccent: "dark:text-purple-400",
    badge: "bg-purple-50 text-purple-700",
    darkBadge: "dark:bg-purple-900/30 dark:text-purple-300",
    headerBg: "bg-purple-50 dark:bg-purple-900/20",
    ring: "ring-purple-400",
    icon: "text-purple-500",
    darkIcon: "dark:text-purple-400",
  },
  rose: {
    gradient: "from-rose-500 to-rose-600",
    darkGradient: "dark:from-rose-700 dark:to-rose-800",
    accent: "text-rose-600",
    darkAccent: "dark:text-rose-400",
    badge: "bg-rose-50 text-rose-700",
    darkBadge: "dark:bg-rose-900/30 dark:text-rose-300",
    headerBg: "bg-rose-50 dark:bg-rose-900/20",
    ring: "ring-rose-400",
    icon: "text-rose-500",
    darkIcon: "dark:text-rose-400",
  },
};

const MEMBER_FIELDS: { key: keyof Member; label: string; icon: string }[] = [
  { key: "name", label: "Maqaa", icon: "👤" },
  { key: "field", label: "Ogummaa", icon: "⚙️" },
  { key: "year", label: "Waggaa", icon: "📅" },
  { key: "phone", label: "Bilbilaa", icon: "📞" },
  { key: "campus", label: "Kampus", icon: "🏛️" },
  { key: "village", label: "Gandaa", icon: "🏘️" },
  { key: "entry", label: "Seenaa", icon: "📖" },
  { key: "school", label: "Mana Barnootaa", icon: "🏫" },
];

export default function Koreewwan() {
  const { user } = useAuthStore();
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editModal, setEditModal] = useState<{
    type: "committee" | "member" | "add-member";
    committeeId: string;
    memberIndex?: number;
    field?: string;
  } | null>(null);
  const [editFormData, setEditFormData] = useState<Record<string, string>>({});
  const [expandedCommittees, setExpandedCommittees] = useState<Set<string>>(
    new Set(),
  );

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  useEffect(() => {
    fetchCommittees();
  }, []);

  const fetchCommittees = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await apiClient.get("/committees");
      setCommittees(res.data);
    } catch (err: unknown) {
      setError("Committees failed to load. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedCommittees((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openEditCommittee = (committee: Committee) => {
    setEditModal({
      type: "committee",
      committeeId: committee._id || committee.id,
    });
    setEditFormData({
      name: committee.name,
      head: committee.head,
      description: committee.description,
      color: committee.color,
    });
  };

  const openEditMember = (
    committeeId: string,
    memberIndex: number,
    member: Member,
  ) => {
    setEditModal({ type: "member", committeeId, memberIndex });
    setEditFormData({ ...member });
  };

  const openAddMember = (committeeId: string) => {
    setEditModal({ type: "add-member", committeeId });
    setEditFormData({
      name: "",
      field: "",
      year: "",
      phone: "",
      campus: "",
      village: "",
      entry: "",
      school: "",
    });
  };

  const closeModal = () => {
    setEditModal(null);
    setEditFormData({});
  };

  const handleSave = useCallback(async () => {
    if (!editModal) return;
    const { committeeId, type, memberIndex } = editModal;

    try {
      setSaving(true);

      if (type === "committee") {
        const { name, head, description, color } = editFormData;
        const body: Record<string, string> = {};
        if (name !== undefined) body.name = name;
        if (head !== undefined) body.head = head;
        if (description !== undefined) body.description = description;
        if (color !== undefined) body.color = color;

        const res = await apiClient.patch(`/committees/${committeeId}`, body);
        setCommittees((prev) =>
          prev.map((c) =>
            (c._id || c.id) === committeeId
              ? { ...c, ...res.data.committee }
              : c,
          ),
        );
      } else if (type === "member" && memberIndex !== undefined) {
        const committee = committees.find(
          (c) => (c._id || c.id) === committeeId,
        );
        if (!committee) return;

        const updatedMembers = [...committee.members];
        updatedMembers[memberIndex] = editFormData as unknown as Member;
        await apiClient.patch(`/committees/${committeeId}`, {
          members: updatedMembers,
        });
        setCommittees((prev) =>
          prev.map((c) =>
            (c._id || c.id) === committeeId
              ? { ...c, members: updatedMembers }
              : c,
          ),
        );
      } else if (type === "add-member") {
        if (!editFormData.name?.trim()) {
          alert("Member name is required");
          return;
        }
        const committee = committees.find(
          (c) => (c._id || c.id) === committeeId,
        );
        if (!committee) return;

        const updatedMembers = [
          ...committee.members,
          editFormData as unknown as Member,
        ];
        await apiClient.patch(`/committees/${committeeId}`, {
          members: updatedMembers,
        });
        setCommittees((prev) =>
          prev.map((c) =>
            (c._id || c.id) === committeeId
              ? { ...c, members: updatedMembers }
              : c,
          ),
        );
      }

      closeModal();
    } catch (err) {
      console.error("Failed to save", err);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }, [editModal, editFormData, committees]);

  const deleteMember = async (committeeId: string, memberIndex: number) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      setSaving(true);
      const committee = committees.find((c) => (c._id || c.id) === committeeId);
      if (!committee) return;

      const updatedMembers = committee.members.filter(
        (_, i) => i !== memberIndex,
      );
      await apiClient.patch(`/committees/${committeeId}`, {
        members: updatedMembers,
      });
      setCommittees((prev) =>
        prev.map((c) =>
          (c._id || c.id) === committeeId
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

  const updateField = (key: string, value: string) => {
    setEditFormData((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Loading committees...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
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
          </div>
          <p className="text-red-500 text-lg mb-4 font-medium">{error}</p>
          <button
            onClick={fetchCommittees}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium shadow-lg shadow-indigo-500/25"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-violet-900 dark:from-indigo-900 dark:via-violet-950 dark:to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium tracking-wide backdrop-blur-sm">
            Bara 2017
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
            KOREEWWAN
          </h1>
          <p className="text-lg sm:text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
            Koreewwan bara 2017 fi maatii isaanii — Daataan barattoota
            koolleejjii isaanii waliin
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16 relative z-10">
        {/* Notice Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-6 mb-12 border border-gray-100 dark:border-gray-700">
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
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                <strong className="text-gray-900 dark:text-white">
                  Hubachiisa:
                </strong>{" "}
                Gucni armaan gadii kun daataa barattootaa kan bara 2017 yookiin
                kan yeroo dookimentiin kun itti barreeffameedha. Kanaaf guca
                kana keessatti barattoota koolleejjii isaanii waliin
                walsimsiisudhaan kan bara baraan osoo boca isaa isa duraa gadi
                hin dhiisisin kan haaromfamuudha.
              </p>
              {isAdmin && (
                <span className="inline-block mt-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-lg">
                  ✏️ Admin mode — Click the edit button on any committee to
                  modify
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Committees */}
        {committees.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
              Committees not found
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Please seed the database with committee data.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {committees.map((committee) => {
              const cId = committee._id || committee.id;
              const theme = COLOR_THEMES[committee.color] || COLOR_THEMES.blue;
              const isExpanded = expandedCommittees.has(cId);

              return (
                <div
                  key={cId}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl dark:hover:shadow-gray-900/70"
                >
                  {/* Committee Header */}
                  <div
                    className={`${theme.headerBg} p-6 sm:p-8 cursor-pointer select-none`}
                    onClick={() => toggleExpanded(cId)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.gradient} ${theme.darkGradient} flex items-center justify-center shrink-0 shadow-lg`}
                        >
                          <svg
                            className="w-7 h-7 text-white"
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
                        <div className="min-w-0">
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white truncate">
                            {committee.name}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Too'ataa:{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {committee.head || "—"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {isAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditCommittee(committee);
                            }}
                            className="p-2 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition shadow-sm border border-gray-200 dark:border-gray-600"
                            title="Edit committee"
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
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                        )}
                        <button
                          className={`p-2 rounded-xl transition shadow-sm border border-gray-200 dark:border-gray-600 ${
                            isExpanded
                              ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                              : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                          }`}
                        >
                          <svg
                            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Description (always visible as preview) */}
                    <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2">
                      {committee.description || "No description available."}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${theme.badge} ${theme.darkBadge}`}
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {committee.members.length} Members
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {committee.academicYear}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Members Section */}
                  {isExpanded && (
                    <div className="p-6 sm:p-8 border-t border-gray-100 dark:border-gray-700">
                      {/* Stats Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {MEMBER_FIELDS.slice(0, 4).map(
                          ({ key, label, icon }) => {
                            const filledCount = committee.members.filter(
                              (m) => m[key as keyof Member],
                            ).length;
                            return (
                              <div
                                key={key}
                                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center"
                              >
                                <span className="text-lg mb-1 block">
                                  {icon}
                                </span>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {filledCount}/{committee.members.length}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  {label}
                                </p>
                              </div>
                            );
                          },
                        )}
                      </div>

                      {/* Members Grid */}
                      {committee.members.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                          <p className="text-gray-500 dark:text-gray-400">
                            No members in this committee yet.
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {committee.members.map((m, i) => (
                            <div
                              key={i}
                              className="group relative bg-gray-50 dark:bg-gray-700/30 rounded-xl p-5 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md"
                            >
                              {/* Admin Actions */}
                              {isAdmin && (
                                <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => openEditMember(cId, i, m)}
                                    className="p-1.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition shadow-sm border border-gray-200 dark:border-gray-600"
                                    title="Edit member"
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
                                  <button
                                    onClick={() => deleteMember(cId, i)}
                                    className="p-1.5 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-lg hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition shadow-sm border border-gray-200 dark:border-gray-600"
                                    title="Delete member"
                                    disabled={saving}
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
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              )}

                              {/* Member Info */}
                              <div className="flex items-center gap-3 mb-3">
                                <div
                                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${theme.gradient} ${theme.darkGradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                                >
                                  {(m.name || "?").charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                                    {m.name || "—"}
                                  </p>
                                  <p
                                    className={`text-xs ${theme.accent} ${theme.darkAccent}`}
                                  >
                                    {m.field || "No field"}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-1.5 text-xs">
                                {m.year && (
                                  <span
                                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${theme.badge} ${theme.darkBadge} mr-1.5`}
                                  >
                                    {m.year}
                                  </span>
                                )}
                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                  <span>📞</span>
                                  <span>{m.phone || "—"}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                  <span>🏛️</span>
                                  <span>{m.campus || "—"}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                  <span>🏘️</span>
                                  <span>{m.village || "—"}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                  <span>🏫</span>
                                  <span>{m.school || "—"}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Member Button (Admin) */}
                      {isAdmin && (
                        <button
                          onClick={() => openAddMember(cId)}
                          disabled={saving}
                          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-700/30 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-xl hover:border-indigo-400 hover:text-indigo-500 dark:hover:border-indigo-600 dark:hover:text-indigo-400 transition font-medium"
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
        )}
      </section>

      {/* Modal */}
      {editModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editModal.type === "committee"
                  ? "Edit Committee"
                  : editModal.type === "add-member"
                    ? "Add New Member"
                    : "Edit Member"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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

            <div className="p-6 space-y-4">
              {editModal.type === "committee" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.name || ""}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Head
                    </label>
                    <input
                      type="text"
                      value={editFormData.head || ""}
                      onChange={(e) => updateField("head", e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editFormData.description || ""}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Color Theme
                    </label>
                    <div className="flex gap-3">
                      {["blue", "emerald", "amber", "purple", "rose"].map(
                        (color) => (
                          <button
                            key={color}
                            onClick={() => updateField("color", color)}
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${COLOR_THEMES[color].gradient} ${
                              editFormData.color === color
                                ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-indigo-500 scale-110"
                                : ""
                            } transition-all`}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {MEMBER_FIELDS.map(({ key, label, icon }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {icon} {label}
                      </label>
                      <input
                        type="text"
                        value={editFormData[key] || ""}
                        onChange={(e) => updateField(key, e.target.value)}
                        placeholder={`Enter ${label}`}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 shadow-lg shadow-indigo-500/25"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
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
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {saving && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-slide-up">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
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
          <span className="text-sm font-medium">Saving changes...</span>
        </div>
      )}
    </div>
  );
}
