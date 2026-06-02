import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import apiClient from "../services/api"

interface Leader {
  _id: string
  fullName: string
  email: string
  department: string
  designation: string
  profileImage: string
  bio: string
}

const sampleLeaders: Leader[] = [
  { _id: "s1", fullName: "Dr. Sarah Mensah", email: "s.mensah@gbaabw.org", department: "Executive", designation: "President", profileImage: "", bio: "Over 20 years of experience in professional development and organizational leadership, driving the association's strategic vision." },
  { _id: "s2", fullName: "James Osei", email: "j.osei@gbaabw.org", department: "Executive", designation: "Vice President", profileImage: "", bio: "Expert in strategic planning and community engagement with a passion for youth mentorship and member development." },
  { _id: "s3", fullName: "Ama Serwaa", email: "a.serwaa@gbaabw.org", department: "Finance", designation: "Treasurer", profileImage: "", bio: "Accredited accountant with extensive experience in non-profit financial management and regulatory compliance." },
  { _id: "s4", fullName: "Kwame Asante", email: "k.asante@gbaabw.org", department: "Administration", designation: "Secretary", profileImage: "", bio: "Dedicated administrator committed to operational excellence, governance, and delivering exceptional member services." },
  { _id: "s5", fullName: "Akua Nyarko", email: "a.nyarko@gbaabw.org", department: "Programs", designation: "Programs Director", profileImage: "", bio: "Passionate about designing impactful programs that drive professional growth and community engagement across the UK." },
  { _id: "s6", fullName: "Yaw Adjei", email: "y.adjei@gbaabw.org", department: "Communications", designation: "Communications Lead", profileImage: "", bio: "Seasoned communications professional specializing in public relations, digital media, and brand strategy." },
]

function getInitials(name: string): string {
  return name.split(" ").map(n => n[0]).join("").toUpperCase()
}

const avatarColors = [
  "from-blue-600 to-blue-800",
  "from-emerald-600 to-emerald-800",
  "from-violet-600 to-violet-800",
  "from-orange-600 to-orange-800",
  "from-teal-600 to-teal-800",
  "from-pink-600 to-pink-800",
]

export default function Leadership() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await apiClient.get("/members")
        const members: Leader[] = response.data
        const filtered = members.filter((m) => {
          const role = (m.designation || "").toLowerCase()
          return (
            role === "president" ||
            role === "vice_president" ||
            role === "secretary" ||
            role === "treasurer" ||
            role === "moderator" ||
            role.includes("lead") ||
            role.includes("director")
          )
        })
        setLeaders(filtered.length > 0 ? filtered : sampleLeaders)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to load leadership data"
        setError(msg)
        setLeaders(sampleLeaders)
      } finally {
        setLoading(false)
      }
    }
    fetchLeaders()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950">
        <div className="bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 py-24 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10">
            <div className="h-12 w-72 bg-white/10 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-6 w-96 bg-white/10 rounded-lg animate-pulse mx-auto" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 animate-pulse">
                <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4" />
                <div className="h-5 w-32 bg-gray-700 rounded mx-auto mb-2" />
                <div className="h-4 w-24 bg-gray-700 rounded mx-auto mb-2" />
                <div className="h-3 w-20 bg-gray-700 rounded mx-auto mb-4" />
                <div className="h-3 w-full bg-gray-700 rounded mb-2" />
                <div className="h-3 w-3/4 bg-gray-700 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 py-24 px-4">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
            Our Leadership
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Meet the dedicated team guiding GBAABW forward with vision and integrity.
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        {error && (
          <div className="flex items-center gap-3 bg-red-900/30 border border-red-500/40 text-red-300 rounded-xl px-6 py-4 mb-8">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span>{error} — showing sample data</span>
          </div>
        )}

        {leaders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <svg className="w-20 h-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <p className="text-xl font-medium">No leadership data found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader, index) => (
              <Link
                key={leader._id}
                to={`/members/${leader._id}`}
                className="group bg-gray-800/40 border border-gray-700/50 rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="p-6 text-center">
                  {leader.profileImage ? (
                    <img
                      src={leader.profileImage}
                      alt={leader.fullName}
                      className="w-24 h-24 object-cover rounded-full mx-auto mb-4 ring-2 ring-gray-600 group-hover:ring-blue-400 transition-all"
                    />
                  ) : (
                    <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br ${avatarColors[index % avatarColors.length]} ring-2 ring-gray-600 group-hover:ring-blue-400 transition-all`}>
                      {getInitials(leader.fullName)}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {leader.fullName}
                  </h3>
                  <p className="text-blue-400 font-semibold text-sm mt-1">{leader.designation}</p>
                  {leader.department && (
                    <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{leader.department}</p>
                  )}
                  {leader.bio && (
                    <p className="text-gray-400 mt-3 text-sm leading-relaxed line-clamp-3">{leader.bio}</p>
                  )}
                </div>
                <div className="border-t border-gray-700/50 px-6 py-3 flex items-center justify-center gap-2 text-gray-400 group-hover:text-blue-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-sm">{leader.email}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
