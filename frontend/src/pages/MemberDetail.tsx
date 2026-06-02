import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../services/api";

interface Member {
  _id: string;
  fullName: string;
  email: string;
  department: string;
  designation: string;
  profileImage: string;
  bio: string;
  phone: string;
  membershipNumber?: string;
  membershipStatus?: string;
  joinDate?: string;
}

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function MemberDetail() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await apiClient.get(`/members/${id}`);
        setMember(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch member");
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
            <div className="md:flex">
              <div className="md:w-80 p-8 flex flex-col items-center bg-gray-800/50">
                <div className="w-40 h-40 rounded-full bg-gray-800 mb-4"></div>
                <div className="h-7 w-40 bg-gray-800 rounded mb-2"></div>
                <div className="h-5 w-28 bg-gray-800 rounded"></div>
              </div>
              <div className="flex-1 p-8 space-y-5">
                <div className="h-4 w-24 bg-gray-800 rounded"></div>
                <div className="h-5 w-48 bg-gray-800 rounded"></div>
                <div className="h-4 w-24 bg-gray-800 rounded"></div>
                <div className="h-5 w-56 bg-gray-800 rounded"></div>
                <div className="h-4 w-24 bg-gray-800 rounded"></div>
                <div className="h-5 w-40 bg-gray-800 rounded"></div>
                <div className="h-4 w-24 bg-gray-800 rounded"></div>
                <div className="h-4 w-full bg-gray-800 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-red-900/30 border border-red-800 text-red-300 px-6 py-4 rounded-xl max-w-md text-center">
          <svg className="w-8 h-8 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-gray-400 text-lg">Member not found</p>
          <Link to="/members" className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline">
            Back to members
          </Link>
        </div>
      </div>
    );
  }

  const statusColor = member.membershipStatus === "active"
    ? "bg-green-900/50 text-green-300 border border-green-700"
    : "bg-gray-700/50 text-gray-400 border border-gray-600";

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/members"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Members
        </Link>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-80 p-8 flex flex-col items-center bg-gradient-to-b from-gray-800/50 to-gray-900 border-b md:border-b-0 md:border-r border-gray-800">
              {member.profileImage ? (
                <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-500/20 mb-4">
                  <img
                    src={member.profileImage}
                    alt={member.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center ring-4 ring-blue-500/20 mb-4">
                  <span className="text-5xl font-bold text-white select-none">
                    {getInitials(member.fullName)}
                  </span>
                </div>
              )}
              <h1 className="text-2xl font-bold text-white text-center">{member.fullName}</h1>
              {member.designation && (
                <p className="text-blue-400 font-medium text-center mt-1">{member.designation}</p>
              )}
              {member.department && (
                <p className="text-gray-500 text-sm text-center mt-1 uppercase tracking-wider">{member.department}</p>
              )}
              <div className="mt-6 w-full space-y-2">
                {member.membershipNumber && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Member #</p>
                    <p className="text-gray-300 font-mono text-sm">{member.membershipNumber}</p>
                  </div>
                )}
                {member.membershipStatus && (
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColor}`}>
                      {member.membershipStatus}
                    </span>
                  </div>
                )}
                {member.joinDate && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Joined</p>
                    <p className="text-gray-400 text-sm">{new Date(member.joinDate).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 p-8 space-y-6">
              {member.bio && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Biography</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">{member.bio}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
                {member.email && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Email</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="break-all">{member.email}</span>
                    </a>
                  </div>
                )}

                {member.phone && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Phone</p>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {member.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
