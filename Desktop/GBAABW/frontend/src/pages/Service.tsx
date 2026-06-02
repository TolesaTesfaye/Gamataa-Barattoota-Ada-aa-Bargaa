export default function Service() {
  const services = [
    { title: "Gargaarsa Barnootaa", desc: "Barattoota keenyaaf gargaarsa barnootaa, meeshaalee barumsaa fi qajeelfama kennuun milkaa'ina isaanii argisiifna." },
    { title: "Gorsa fi Qajeelfama", desc: "Barattoota sadarkaa olaanaa irraa gorsa fi qajeelfama kennuun karaa isaanii qajeelchuuf tattaafanna." },
    { title: "Walitti Dhufeenya Hawaasaa", desc: "Walgahii fi sagantaa adda addaa karaa tassine barattoonni wal baranii fi tokkummaa isaanii cimsu." },
    { title: "Tajaajila Hawaasaa", desc: "Ganda keenya keessatti tajaajila hawaasaa kennuun hawaasa irratti dhiibbaa gaarii uumuu barbaanna." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-800 dark:to-teal-900 text-white rounded-2xl p-12 text-center shadow-lg">
        <h1 className="text-5xl font-bold mb-4">Tajaajila</h1>
        <p className="text-xl text-emerald-100">Tajaajila fi gargaarsa gamtaan keenya kennu</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        {services.map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{s.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}