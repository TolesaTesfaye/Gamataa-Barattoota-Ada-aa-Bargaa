import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-0">
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(60, 170, 182, 0.15),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(89, 167, 231, 0.2),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(62, 170, 161, 0.1),transparent_50%)] animate-pulse"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-white/90 text-sm font-medium tracking-wide">
            Hundeeffame Bara 2018
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Gamtaa Barattoota Aanaa Ada'aa Bargaa
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 dark:text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
            Tokkummaan nu walitti qabu barattoota Ada'a Bargaa Yuunivarsiitii
            Haramaayaa keessatti wal baruuf, wal gargaaruu fi wal jajjabeessuuf
            dhaabbatan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/waaee"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 dark:bg-gray-900 dark:text-blue-400 font-semibold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Waa'ee Keenya</span>
              <svg
                className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      <section className="relative -mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 text-center hover:shadow-2xl dark:hover:shadow-gray-900/80 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-7 h-7 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              30+
            </div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
              Barattoota
            </div>
          </div>
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 text-center hover:shadow-2xl dark:hover:shadow-gray-900/80 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-7 h-7 text-indigo-600 dark:text-indigo-400"
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
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              5
            </div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
              Koreewwan
            </div>
          </div>
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 text-center hover:shadow-2xl dark:hover:shadow-gray-900/80 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-7 h-7 text-amber-600 dark:text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              10+
            </div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
              Mana Barumsaa
            </div>
          </div>
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 text-center hover:shadow-2xl dark:hover:shadow-gray-900/80 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-7 h-7 text-emerald-600 dark:text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              30
            </div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
              Gandoo
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Waan Nuti Hojjennu
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Barattoota Ada'a Bargaa Yuunivarsiitii Haramaayaa gidduu gamtaa,
              walgargaarsa fi guddina ogummaa mirkaneessuuf tattaafanna.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-md dark:shadow-gray-900/30 hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50">
              <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Walgargaarsa Barumsaa
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Barattoota waliif gargaarsa barnootaa kennuu fi qabxii wal
                qooduun qormaata keessatti milkaa'uu dandeessu.
              </p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-md dark:shadow-gray-900/30 hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/50">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0-.965 1.938m-.965-1.938a60.392 60.392 0 01-.766 1.433M4.26 10.147a60.438 60.438 0 01-.766 1.433m1.532-2.18c.16-.31.324-.618.492-.921a60.697 60.697 0 015.702-1.238m10.23 2.397a61.62 61.62 0 01-1.845 3.478m-1.383 2.112A60.557 60.557 0 0112 21a60.557 60.557 0 01-6.442-4.238m4.606.845a59.686 59.686 0 00-2.242-2.352m0 0A59.612 59.612 0 0112 12a59.614 59.614 0 016.078 3.503m-9.714-2.893a59.66 59.66 0 010-6.633m9.714 6.633A59.66 59.66 0 0112 5.367M3.615 10.682a60.464 60.464 0 01.645-1.261m.645 1.261a60.464 60.464 0 01.645-1.261M6.15 5.1a60.627 60.627 0 011.414.504"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Guddina Ogummaa
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Leenjii fi oddubbii adda addaa qopheessinee barattootni ogummaa
                isaanii ittiin guddisuu danda'an.
              </p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-md dark:shadow-gray-900/30 hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-amber-100 dark:hover:border-amber-900/50">
              <div className="w-12 h-12 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-amber-600 dark:text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Aadaa fi Afaan Oromoo
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Aadaa fi afaan keenya kabajuu fi tumsuun dhaloota itti aanuuf
                dhaamsa isaanii dabarsuu barbaanna.
              </p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-md dark:shadow-gray-900/30 hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/50">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Tajaajila Hawaasaa
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Ganda keenya keessatti tajaajila fi gargaarsa hawaasaa kennuun
                hawaasa irratti dhiibbaa gaarii uumuu barbaanna.
              </p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-md dark:shadow-gray-900/30 hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-purple-100 dark:hover:border-purple-900/50">
              <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Gorsa fi Qajeelfama
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Barattoota sadarkaa olaanaatti geessan gorsa fi qajeelfama
                kennuun warra itti aanuuf karaa banuu barbaanna.
              </p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-md dark:shadow-gray-900/30 hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-rose-100 dark:hover:border-rose-900/50">
              <div className="w-12 h-12 rounded-lg bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-rose-600 dark:text-rose-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Meeshaalee Barumsaa
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Meeshaalee barnootaa, yaadanno fi qajeelfama barumsaa
                qopheessinee isiniif dhiheessina.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Qophii Gamtaa Keenyatti Makamuu?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 dark:text-white/70 max-w-2xl mx-auto mb-10">
            Gamtaa barattoota Ada'a Bargaa keessatti hiriyyaa haaraa argachuu fi
            wal gargaaruun barumsa keessanitti milkaa'uu dandeessu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/waaee"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 dark:bg-gray-900 dark:text-blue-400 font-semibold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Gamoo Deemi
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/30 dark:border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 dark:hover:bg-white/5 hover:border-white/50 dark:hover:border-white/30 transition-all duration-300"
            >
              Nu Qunnami
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Waa'ee Gamtaa
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg">
              GAMTAA BARATTOTA AANAA ADA'A BARGAA bara 2018tti hundeeffame.
              Kaayyoon keenya barattoota Ada'a Bargaa Yuunivarsiitii Haramaayaa
              keessatti walitti qabuu fi waliif gargaarsa kennuudha. Gamtaa kana
              keessatti barattoonni wal beeku, muuxannoo walfakkaatu qoodatu, fi
              barumsa isaanii keessatti wal jajjabeessu.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <svg
                  className="w-5 h-5 text-blue-500 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21v-6a2 2 0 012-2h2a2 2 0 012 2v6m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v12m-8 0H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3"
                  />
                </svg>
                <span>Yuunivarsiitii Haramaayaa</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <svg
                  className="w-5 h-5 text-blue-500 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Barattoota 30+</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <svg
                  className="w-5 h-5 text-blue-500 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0-.965 1.938m-.965-1.938a60.392 60.392 0 01-.766 1.433M4.26 10.147a60.438 60.438 0 01-.766 1.433m1.532-2.18c.16-.31.324-.618.492-.921a60.697 60.697 0 015.702-1.238m10.23 2.397a61.62 61.62 0 01-1.845 3.478m-1.383 2.112A60.557 60.557 0 0112 21a60.557 60.557 0 01-6.442-4.238m4.606.845a59.686 59.686 0 00-2.242-2.352m0 0A59.612 59.612 0 0112 12a59.614 59.614 0 016.078 3.503m-9.714-2.893a59.66 59.66 0 010-6.633m9.714 6.633A59.66 59.66 0 0112 5.367M3.615 10.682a60.464 60.464 0 01.645-1.261m.645 1.261a60.464 60.464 0 01.645-1.261M6.15 5.1a60.627 60.627 0 011.414.504"
                  />
                </svg>
                <span>Afaan Oromoo fi Aadaa</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
