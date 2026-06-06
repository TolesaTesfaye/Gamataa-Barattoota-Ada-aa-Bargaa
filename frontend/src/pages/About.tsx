import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function About() {
  const [visible, setVisible] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible((p) => ({ ...p, [entry.target.id]: true }))
          }
        }
      },
      { threshold: 0.1 }
    )
    const els = document.querySelectorAll("[data-anim]")
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const values = [
    {
      title: "Amanamummaa",
      desc: "Boca hojii keenyaa hundakeessatti dhugaa fi iftoomina sadarkaa olaanaa eega.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: "Ga'umsa",
      desc: "Karoora fi sagantaa hunda keessatti sadarkaa olaanaa milkeessuu barbaanna.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
    {
      title: "Tokkummaa",
      desc: "Humna walii galuuti fi hariiroo cimaa ijaaruu keessatti amanna.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      title: "Tajaajila",
      desc: "Miseensota keenya fi hawaasa bal'aa tajaajiluuf of kenninee jirra.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      title: "Hooggansa",
      desc: "Hooggantoota jijjiirama fidani fi guddina oofan leenjisnaa fi cimna.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
        </svg>
      ),
    },
    {
      title: "Garagarummaa",
      desc: "Ilaalcha garagaraa fudhannaafi carraa wal-qixaa hundumaaf mijeessina.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
  ]

  const milestones = [
    { year: "2018", title: "Hundeeffame", desc: "GBAABW barattoota Ada'a Bargaa garee muraasaan Yuunivarsiitii Haramaayaa keessatti hundeeffame." },
    { year: "2020", title: "Guddina Miseensotaa", desc: "Baay'inni miseensotaa gara 20tti guddate, sagantaa fi tajaajila adda addaa jalqabe." },
    { year: "2022", title: "Qindaa'ina Haaraa", desc: "Qindaa'inni gamtaa kanaa cimee hooggansi haaraan filatame." },
    { year: "2024", title: "Pilaatformii Dijitaalii", desc: "Pilaatformii dijitaalii fi tajaajila online banne, miseensotaaf tajaajila salphaa fi bal'aa ta'e kennuuf." },
    { year: "2026", title: "Guddina Itti Fufaa", desc: "Miseensota 30 ol qabaachuun guddinaa fi tajaajila hawaasaa irratti hojjechaa jirra." },
  ]

  const animClass = (id: string) =>
    `transition-all duration-700 ease-out ${
      visible[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 py-24 px-4">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
            Waa'ee Keenya
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Barattoota Ada'aa Bargaa Yuunivarsiitii Haramaayaa walitti qabuu, cimsuu fi bakka bu'uuf bara 2018ttii.
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div
          id="mission-vision"
          data-anim
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${animClass("mission-vision")}`}
        >
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/20 rounded-2xl p-8 md:p-10 backdrop-blur-sm hover:border-blue-400/40 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-blue-300 mb-4">Kaayyoo</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Barattoota Ada'aa Bargaa Yuunivarsiitii Haramaayaa qabeenya, hariiroo fi carraa barbaachisan mijeessuun ogummaa isaanii keessatti milkaa'uu fi hawaasa isaanii irratti dhiibbaa gaarii uumuuf.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-900/20 border border-indigo-500/20 rounded-2xl p-8 md:p-10 backdrop-blur-sm hover:border-indigo-400/40 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-indigo-300 mb-4">Mul'ata</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Barataan Ada'aa Bargaa hundinuu gargaarsa, hariiroo fi carraa barbaachisan argatee dandeettii isaa guutuu fi guddina waliigalaa fiduu danda'u.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-900/50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            id="values-heading"
            data-anim
            className={`text-4xl font-bold text-center mb-4 ${animClass("values-heading")}`}
          >
            Bu'uura <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Keenya</span>
          </h2>
          <p
            id="values-sub"
            data-anim
            className={`text-gray-400 text-center max-w-xl mx-auto mb-12 ${animClass("values-sub")}`}
          >
            Hojii keenya hundaa kan nu qajeelchu bu'uuralee
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                id={`val-${i}`}
                data-anim
                className={`group bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 ${animClass(`val-${i}`)}`}
              >
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors mb-4">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                <p className="text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            id="history-heading"
            data-anim
            className={`text-4xl font-bold text-center mb-4 ${animClass("history-heading")}`}
          >
            Daandii <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Keenya</span>
          </h2>
          <p
            id="history-sub"
            data-anim
            className={`text-gray-400 text-center max-w-xl mx-auto mb-16 ${animClass("history-sub")}`}
          >
            Galmee seenaa keenyaa keessaa bu'aa gurguddoo
          </p>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/60 via-indigo-500/60 to-purple-500/60 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0
                const sideId = `ms-${i}`
                return (
                  <div key={m.year} data-anim id={sideId} className={`relative flex flex-col md:flex-row items-start ${animClass(sideId)}`}>
                    <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-gray-900 bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30 z-10`} />

                    <div className={`md:w-1/2 pl-10 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}>
                      <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-3 shadow-lg">
                        {m.year}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2">{m.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{m.desc}</p>
                    </div>

                    <div className="md:hidden absolute left-0 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 border-2 border-gray-900" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 py-20 px-4">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Hawaasa Keenyatti Makamuu
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Miseensa gamtaa barattoota Ada'aa Bargaa ta'iitii hiriyyaa haaraa argadhu.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-white text-indigo-700 font-bold text-lg rounded-full hover:bg-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Har'a Galmee
          </Link>
        </div>
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </section>
    </div>
  )
}
