import { Link } from "react-router-dom";

export default function PublicLanding() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <img src="/asset/Picture1.png" alt="GBAABW logo" className="h-8 sm:h-9 w-auto rounded-full group-hover:scale-105 transition-transform duration-300" />
              <span className="hidden sm:inline text-sm sm:text-base font-bold text-gray-900 dark:text-white tracking-tight">
                GBAABW
              </span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Seeni
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 hover:scale-[1.02]"
              >
                Jalqabi
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-24 sm:pb-28">
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/background/Picture37.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-0">
          <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium tracking-wide animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Hundeeffame Bara 2018
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-6 sm:mb-8 tracking-tight">
            Gamtaa Barattoota
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
              Aanaa Ada'aa Bargaa
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
            Tokkummaan nu walitti qabu barattoota Ada'a Bargaa Yuunivarsiitii
            Haramaayaa keessatti wal baruuf, wal gargaaruu fi wal jajjabeessuuf
            dhaabbatan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <Link
              to="/register"
              className="group relative inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-blue-700 font-bold text-base sm:text-lg rounded-xl shadow-2xl hover:shadow-[0_20px_50px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
                <span className="relative z-10">Hawaasa Keenyatti Makamuu</span>
              <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-white/30 text-white font-semibold text-base sm:text-lg rounded-xl hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Seeni
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-28 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold tracking-wide mb-4">
              WAAN NU HOJJENNU
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 tracking-tight">
              Waan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Nu</span> Hojjennu
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Barattoota Ada'a Bargaa Yuunivarsiitii Haramaayaa gidduu gamtaa,
              walgargaarsa fi guddina ogummaa mirkaneessuuf tattaafanna.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              { title: "Walgargaarsa Barumsaa", desc: "Barattoota waliif gargaarsa barnootaa kennuu fi qabxii wal qooduun qormaata keessatti milkaa'uu dandeessu.", color: "blue", path: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
              { title: "Guddina Ogummaa", desc: "Leenjii fi oddubbii adda addaa qopheessinee barattootni ogummaa isaanii ittiin guddisuu danda'an.", color: "indigo", path: "M4.26 10.147a60.438 60.438 0 0-.965 1.938m-.965-1.938a60.392 60.392 0 01-.766 1.433M4.26 10.147a60.438 60.438 0 01-.766 1.433m1.532-2.18c.16-.31.324-.618.492-.921a60.697 60.697 0 015.702-1.238m10.23 2.397a61.62 61.62 0 01-1.845 3.478m-1.383 2.112A60.557 60.557 0 0112 21a60.557 60.557 0 01-6.442-4.238m4.606.845a59.686 59.686 0 00-2.242-2.352m0 0A59.612 59.612 0 0112 12a59.614 59.614 0 016.078 3.503m-9.714-2.893a59.66 59.66 0 010-6.633m9.714 6.633A59.66 59.66 0 0112 5.367M3.615 10.682a60.464 60.464 0 01.645-1.261m.645 1.261a60.464 60.464 0 01.645-1.261M6.15 5.1a60.627 60.627 0 011.414.504" },
              { title: "Aadaa fi Afaan Oromoo", desc: "Aadaa fi afaan keenya kabajuu fi tumsuun dhaloota itti aanuuf dhaamsa isaanii dabarsuu barbaanna.", color: "amber", path: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" },
              { title: "Tajaajila Hawaasaa", desc: "Ganda keenya keessatti tajaajila fi gargaarsa hawaasaa kennuun hawaasa irratti dhiibbaa gaarii uumuu barbaanna.", color: "emerald", path: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
              { title: "Gorsa fi Qajeelfama", desc: "Barattoota sadarkaa olaanaatti geessan gorsa fi qajeelfama kennuun warra itti aanuuf karaa banuu barbaanna.", color: "purple", path: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" },
              { title: "Meeshaalee Barumsaa", desc: "Meeshaalee barnootaa, yaadanno fi qajeelfama barumsaa qopheessinee isiniif dhiheessina.", color: "rose", path: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" },
            ].map((item, i) => (
              <div key={i} className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-gray-900/30 hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-transparent overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/50 to-transparent dark:from-blue-900/10 rounded-bl-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 dark:bg-${item.color}-900/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-${item.color}-100 dark:group-hover:bg-${item.color}-900/50 transition-all duration-300`}>
                  <svg className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.1),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.05),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs sm:text-sm font-semibold tracking-wide mb-5 sm:mb-6">
              HAR'A MAKAMUU
            </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 sm:mb-6 tracking-tight leading-tight">
            Qophii Gamtaa Keenyatti
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">Makamuu?</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Gamtaa barattoota Ada'a Bargaa keessatti hiriyyaa haaraa argachuu fi
            wal gargaaruun barumsa keessanitti milkaa'uu dandeessu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-blue-700 font-bold text-base sm:text-lg rounded-xl shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-[1.02] transition-all duration-300"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v.5H3V20z" />
              </svg>
              Miseensa Ta'i
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-white/30 text-white font-semibold text-base sm:text-lg rounded-xl hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Nu Qunnami
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img src="/background/Picture37.png" alt="GBAABW Community" className="w-full h-auto object-cover aspect-[4/3]" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl -z-10" />
            </div>
            <div className="max-w-lg">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold tracking-wide mb-4">
                WAA'EE KEEENYA
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
                Waa'ee <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Gamtaa</span>
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6" />
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg mb-6">
                GAMTAA BARATTOTA AANAA ADA'A BARGAA bara 2018tti hundeeffame.
                Kaayyoon keenya barattoota Ada'a Bargaa Yuunivarsiitii Haramaayaa
                keessatti walitti qabuu fi waliif gargaarsa kennuudha.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm sm:text-base mb-8">
                Gamtaa kana keessatti barattoonni wal beeku, muuxannoo walfakkaatu qoodatu, fi
                barumsa isaanii keessatti wal jajjabeessu.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {[
                  { value: "2018", label: "Hundeeffame" },
                  { value: "30+", label: "Miseensota" },
                  { value: "5", label: "Koreewwan" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <img src="/asset/Picture1.png" alt="GBAABW" className="h-8 w-auto rounded-full opacity-80" />
              <span className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} GBAABW. Mirgi hundi eegameera.
              </span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/login" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Seeni</Link>
              <Link to="/register" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Galmee</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
