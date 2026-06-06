import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { students as staticStudents } from "../data/students";
import apiClient from "../services/api";

interface StudentItem {
  _id?: string;
  id?: string;
  userId?: string;
  name: string;
  field: string;
  year: string;
  village: string;
  school: string;
  phone: string;
  email?: string;
  telegram?: string;
  entry: string;
  role: string;
  message: string;
  bio: string;
  image?: string;
}

export default function StudentProfiles() {
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await apiClient.get("/students");
      const apiData: StudentItem[] = response.data;
      if (apiData && apiData.length > 0) {
        // Merge: API data overrides static data by _id or id match.
        // Remaining static students are appended.
        const merged: StudentItem[] = staticStudents.map((s) => ({
          ...s,
          entry: (s as any).entry || "",
          bio: (s as any).bio || "",
        }));
        for (const apiStudent of apiData) {
          const a = apiStudent as any;
          // Try matching by _id, id, or identity (name + phone)
          const idx = merged.findIndex(
            (s) =>
              (s._id && s._id === a._id) ||
              (s.id && s.id === a.id) ||
              (s.name === a.name && s.phone === a.phone),
          );
          if (idx !== -1) {
            // Override: replace static entry with the DB record
            merged[idx] = { ...merged[idx], ...a };
          } else {
            merged.push(a);
          }
        }
        setStudents(merged);
      } else {
        setStudents(staticStudents);
      }
    } catch {
      // Fall back to static data
      setStudents(staticStudents);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative bg-gradient-to-br from-teal-700 via-teal-800 to-cyan-900 dark:from-teal-900 dark:via-cyan-950 dark:to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium tracking-wide">
            Barattoota Ada'a Bargaa
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            BARATTOOTAN
          </h1>
          <p className="text-lg sm:text-xl text-teal-200 max-w-3xl mx-auto leading-relaxed">
            Barattootan wal yaa barru — eenyummaa, seenaa fi dhaamsa isaanii
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
                Yeroo daataa barattootaa kana akkasittiin keenyu dhaloonni gara
                boodaa dhufan eenyummaa barattoota asitti baratanii darbanii fi
                asitti barachaa jiranii maal akka hojjatan, maal barachaa akka
                turan, tokkummaa akkamii akka qabaachaa turan, eessaa akka
                dhufan walii walii isaanii akka baran gochuuf daataa kana
                keenye.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading students...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((s, idx) => (
                <div
                  key={s._id || s.id || idx}
                  className="bg-white dark:bg-gray-800 rounded-b-2xl rounded-tr-2xl shadow-lg dark:shadow-gray-900/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 hover:scale-[1.02] group"
                >
                  <div className="absolute bottom-0 left-0 h-0.5 bg-teal-500 w-0 group-hover:w-full transition-all duration-300 ease-out z-10"></div>
                  <div className="flex">
                    {s.image ? (
                      <div className="w-[120px] shrink-0 overflow-hidden">
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-full h-[120px] object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="w-[120px] h-[120px] shrink-0 bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {s.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 p-3 min-w-0">
                      <div className="flex items-start justify-between mb-0.5">
                        <div className="min-w-0 flex-1">
                          <h2 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                            {s.name}
                          </h2>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            {s.field} · {s.year}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                          <span className="text-[10px] font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/50 px-2 py-0.5 rounded-full">
                            {s.role}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                            {s.village}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                            {s.school}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
                        {s.phone}
                      </p>
                      {s.email && (
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
                          {s.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="px-3 pb-3 border-t border-gray-100 dark:border-gray-700 pt-2 mx-3">
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-5">
                      {s.message}
                    </p>
                  </div>
                  <div className="px-3 pb-3">
                    <Link
                      to={`/students/${s._id || s.id}`}
                      className="inline-flex items-center justify-center w-full gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      View Detail
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
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
