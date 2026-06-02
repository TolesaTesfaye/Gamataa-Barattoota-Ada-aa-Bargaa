const committees = [
  {
    id: "cc",
    name: "College of Computing & Informatics (CC)",
    head: "Waasihun Tafarii",
    description:
      "Barattoonni kun barattoota college computing and informatics barataniidha. Dhuguma dubbachuuf boru gama teekinoloojiin uummata keenya kan tajaajilan barattoota kana keessaa ni bahu jennee abdii qabna. Gama kalaqa waa uumuu gara garaan warreen boru uummata keenya boonsan barattoota koolleejjii kana jala jiraniidha.",
    color: "blue",
    members: [
      { name: "Waasihun Tafarii", field: "IT", year: "2nd", phone: "0921323185", campus: "Main", village: "Mugher", entry: "2016", school: "Mugher Community" },
      { name: "Tolesa Tesfaye", field: "Software", year: "3rd", phone: "0975863448", campus: "Main", village: "Ejere Naga'o", entry: "2015", school: "Enchini 2nd School" },
      { name: "Aster Ketema", field: "Computer Science", year: "1st", phone: "0913688115", campus: "Main", village: "Mugher", entry: "2017", school: "Mugher Community" },
      { name: "Sannayit Baqqala", field: "GIS", year: "GC", phone: "0996612005", campus: "Main", village: "Enchini", entry: "2014", school: "Enchini 2nd School" },
      { name: "Tigisti Taklu", field: "GIS", year: "GC", phone: "0980175917", campus: "Main", village: "Mugher", entry: "2014", school: "Mugher Community" },
      { name: "Peniel Bacha", field: "Software", year: "2nd", phone: "0913884804", campus: "Main", village: "Mugher", entry: "2016", school: "Mugher Community" },
      { name: "Daagim Kabbada", field: "Software", year: "3rd", phone: "0910469276", campus: "Main", village: "Mugher", entry: "2015", school: "Mugher Community" },
      { name: "Abbay Caalaa", field: "Software Engineering", year: "1st", phone: "0949324128", campus: "Main", village: "Ulaa Gora", entry: "2017", school: "Reji 2nd School" },
    ],
  },
  {
    id: "health",
    name: "College of Health Sciences (Fayyaa)",
    head: "Tesfaye Abeebee",
    description:
      "Barattoonni kun amma barattoota barnoota fayyaa barataniidha. Isaanis boru gama ogummaa fayyaan ogeessota fayyaa ciccimoo fi warreen rakkina uummata isaanii furan ijoollee qaqqaalii Aanaan Ada'aa Bargaa koolleejjii kana jalaa qabduudha.",
    color: "emerald",
    members: [
      { name: "Tigisti Gonfa", field: "Pharmacy", year: "1st", phone: "0923681415", campus: "Main", village: "Mugher", entry: "2017", school: "Mugher Community" },
      { name: "Tasfaaye Abeebee", field: "Pharmacy", year: "2nd", phone: "0914231118", campus: "Harar", village: "Sanbarro Saggoo", entry: "2016", school: "Reji 2nd School" },
      { name: "Birhaanuu Tolchaa", field: "Medical Lab", year: "2nd", phone: "0940041316", campus: "Harar", village: "Mugher", entry: "2016", school: "Reji 2nd School" },
      { name: "Milkeessa Eshetu", field: "Medical Lab", year: "1st", phone: "0933455580", campus: "Main", village: "Mugher", entry: "2017", school: "Reji 2nd School" },
      { name: "Tasammaa Caalaa", field: "Bio Medical", year: "E", phone: "", campus: "Main", village: "Mugher", entry: "", school: "Mugher Community" },
    ],
  },
  {
    id: "techno",
    name: "College of Engineering & Technology (Techno)",
    head: "Birhaanuu Galataa fi Seefuu Urge",
    description:
      "Barattoonni kuni injineroota warreen barumsa kamiifuu lafee dugdaa ta'an yoo ta'u, Aanaan Ada'aa Bargaa barattoota hedduu fi warreen hangafaa asi qabdi. Injineerri rakkoo biyya isaa sirritti hubatee, furmaata bu'uuraa fi bu'a-qabeessa ta'e uumuun yookiin kalaquun guddina biyyaatiif bu'uura jabaa kaa'a. Ogummaa cimaa, kutannoo fi gumaachi isaan biyyaaf godhan bu'aa guddaa fi kabaja ol'aanaa of keessaa qabuudha. Walumaa galatti, Addunyaan Injiineroota malee sochoo'udhaaf yaaluun rakkina guddaa keessa nama galcha.",
    color: "amber",
    members: [
      { name: "Birhaanuu Galataa", field: "Electrical", year: "2nd", phone: "0912720271", campus: "Techno", village: "Mugher", entry: "2016", school: "Reji 2nd School" },
      { name: "Seefuu Urge", field: "Chemical Engineering", year: "2nd", phone: "0913884804", campus: "Techno", village: "Mugher", entry: "2016", school: "Mugher Community" },
      { name: "Oliiqaa Girmaa", field: "Chemical Engineering", year: "GC", phone: "0910193599", campus: "Techno", village: "Reji", entry: "2013", school: "Mugher Community" },
      { name: "Baayisa Birhaanuu", field: "Chemical Engineering", year: "1st", phone: "0935914102", campus: "Main", village: "Ejere Naga'o", entry: "2017", school: "Enchini 2nd School" },
      { name: "Abdii Addunyaa", field: "Civil Engineering", year: "1st", phone: "0970954616", campus: "Main", village: "Enchini", entry: "2017", school: "Enchini 2nd School" },
      { name: "Magarsaa Dhugumaa", field: "Mechanical Engineering", year: "1st", phone: "0936710168", campus: "Main", village: "Olonkomii", entry: "2017", school: "Enchini 2nd School" },
      { name: "Balaayi Hayiluu", field: "Electrical", year: "1st", phone: "0921710522", campus: "Techno", village: "Haroo Booroo", entry: "2017", school: "Mugher Community" },
      { name: "Iyyuu Birhaanuu", field: "Mechanical Engineering", year: "E", phone: "", campus: "Techno", village: "Mugher", entry: "", school: "Mugher Community" },
      { name: "Haacaaluu Birhaanuu", field: "Electrical", year: "2nd", phone: "0923795979", campus: "Techno", village: "Ejere Naga'o", entry: "2016", school: "Enchini 2nd School" },
    ],
  },
  {
    id: "fb",
    name: "College of Business & Economics (FB)",
    head: "Duulaa Ajjamaa",
    description:
      "Barattoonni kunniin immoo warreen gama bizinasii fi ogummaa hojii uumuu gara garaan boru biyyaa fi gamtaa kana boonsaniidha.",
    color: "purple",
    members: [
      { name: "Duulaa Ajjamaa", field: "Accounting", year: "2nd", phone: "0914411496", campus: "Main", village: "Enchini", entry: "2016", school: "Enchini 2nd School" },
      { name: "Koomartisiin Tsegaye", field: "Eng Language", year: "2nd", phone: "0910902530", campus: "Main", village: "Enchini", entry: "2016", school: "Enchini 2nd School" },
      { name: "Koomartisiin Seifu", field: "Management", year: "2nd", phone: "0914462295", campus: "Main", village: "Ejere Naga'o", entry: "2016", school: "Enchini 2nd School" },
      { name: "Girmaa Tiksee", field: "Economics", year: "2nd", phone: "0956615900", campus: "Main", village: "Reji", entry: "2016", school: "Mugher Community" },
      { name: "Milkeessa Sisaayi", field: "Economics", year: "GC", phone: "0928235719", campus: "Main", village: "Olonkomii", entry: "2014", school: "Enchini 2nd School" },
      { name: "Abineezar", field: "Journalism", year: "2nd", phone: "", campus: "Techno", village: "Enchini", entry: "2016", school: "Enchini 2nd School" },
      { name: "Badhaadhaa Dhaabaa", field: "PADM", year: "2nd", phone: "0952655925", campus: "Main", village: "Iluu Daansee", entry: "2016", school: "Reji 2nd School" },
      { name: "Itsagannat", field: "Accounting", year: "2nd", phone: "0951751066", campus: "Main", village: "Enchini", entry: "2016", school: "Enchini 2nd School" },
      { name: "Tasfaaye Mulgeeta", field: "Educational Plan", year: "2nd", phone: "0937755011", campus: "Main", village: "Ejere Naga'o", entry: "2015", school: "Enchini 2nd School" },
      { name: "Ayyalaa Hayilee", field: "Afaan Oromoo", year: "2nd", phone: "0906573140", campus: "Main", village: "Meettaa Roobii", entry: "2015", school: "Enchini 2nd School" },
    ],
  },
  {
    id: "fresh",
    name: "Barattoota Haaraa (Freshmen)",
    head: "Tolesa Kebede",
    description:
      "Barattoonni kun barattoota jaalalaa fi obbolummaa gamtaa kanaa dhaga'uun mooraa hangafaa fi addaa kan ta'e Yuunivarsiitii Haramaayaa filannoo jalqabaa godhatanii dhufaniidha. Kanaaf gamtaan keenya barattoonni kun akka boru ogummaa gara garaan dhiibbaa tokko malee iddoo fedhii isaanii galanii ofiif maatii akkasumas biyya isaaniif ifa ta'an gamtaan keenya gama danda'u kamiinuu cinaa dhaabbata.",
    color: "rose",
    members: [
      { name: "Tolesa Kabbada", field: "Fresh (Social)", year: "1st", phone: "0912401668", campus: "Techno", village: "Ejere Naga'o", entry: "2015", school: "Enchini 2nd School" },
      { name: "Girmaa Eejersaa", field: "Fresh (Natural)", year: "1st", phone: "0929147463", campus: "Techno", village: "Mugher", entry: "2017", school: "Mugher Community" },
      { name: "Naafyad Taammiru", field: "Fresh (Natural)", year: "1st", phone: "0935888729", campus: "Main", village: "Dhakkuu Kittoo", entry: "2016", school: "Holeta 2nd School" },
      { name: "Abdiisaa Caalaa", field: "Fresh (Social)", year: "1st", phone: "0929979613", campus: "Main", village: "Reji", entry: "2017", school: "Mugher Community" },
      { name: "Bahiru Girmaa", field: "Natural", year: "1st", phone: "", campus: "ECStation", village: "Mugher", entry: "", school: "Mugher Community" },
      { name: "Ayyaantu Dejene", field: "Social", year: "1st", phone: "0992096050", campus: "Main", village: "Mugher", entry: "2017", school: "Mugher Community" },
      { name: "Meelat Hayiluu", field: "Social", year: "1st", phone: "0902667990", campus: "ECStation", village: "Enchini", entry: "2017", school: "Enchini 2nd School" },
    ],
  },
];

const colorMap: Record<string, { bg: string; darkBg: string; text: string; darkText: string; border: string; darkBorder: string; badge: string; darkBadge: string }> = {
  blue: {
    bg: "bg-blue-100", darkBg: "dark:bg-blue-900/50",
    text: "text-blue-600", darkText: "dark:text-blue-400",
    border: "border-blue-200", darkBorder: "dark:border-blue-800",
    badge: "bg-blue-50", darkBadge: "dark:bg-blue-900/30",
  },
  emerald: {
    bg: "bg-emerald-100", darkBg: "dark:bg-emerald-900/50",
    text: "text-emerald-600", darkText: "dark:text-emerald-400",
    border: "border-emerald-200", darkBorder: "dark:border-emerald-800",
    badge: "bg-emerald-50", darkBadge: "dark:bg-emerald-900/30",
  },
  amber: {
    bg: "bg-amber-100", darkBg: "dark:bg-amber-900/50",
    text: "text-amber-600", darkText: "dark:text-amber-400",
    border: "border-amber-200", darkBorder: "dark:border-amber-800",
    badge: "bg-amber-50", darkBadge: "dark:bg-amber-900/30",
  },
  purple: {
    bg: "bg-purple-100", darkBg: "dark:bg-purple-900/50",
    text: "text-purple-600", darkText: "dark:text-purple-400",
    border: "border-purple-200", darkBorder: "dark:border-purple-800",
    badge: "bg-purple-50", darkBadge: "dark:bg-purple-900/30",
  },
  rose: {
    bg: "bg-rose-100", darkBg: "dark:bg-rose-900/50",
    text: "text-rose-600", darkText: "dark:text-rose-400",
    border: "border-rose-200", darkBorder: "dark:border-rose-800",
    badge: "bg-rose-50", darkBadge: "dark:bg-rose-900/30",
  },
};

export default function Koreewwan() {
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
            Koreewwan bara 2017 fi maatii isaanii — Daataan barattoota koolleejjii isaanii waliin
          </p>
        </div>
      </div>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 mb-12">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                <strong className="text-gray-900 dark:text-white">Hubachiisa:</strong> Gucni armaan gadii kun daataa barattootaa kan bara 2017 yookiin kan yeroo dookimentiin kun itti barreeffameedha. Kanaaf guca kana keessatti barattoota koolleejjii isaanii waliin walsimsiisudhaan kan bara baraan osoo boca isaa isa duraa gadi hin dhiisisin kan haaromfamuudha.
              </p>
            </div>
          </div>

          {committees.map((committee) => {
            const c = colorMap[committee.color];
            return (
              <div key={committee.id} className="mb-16 last:mb-0">
                <div className={`flex items-center gap-4 mb-6`}>
                  <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.darkBg} flex items-center justify-center shrink-0`}>
                    <svg className={`w-6 h-6 ${c.text} ${c.darkText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{committee.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Too'ataa: <span className="font-semibold">{committee.head}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 sm:p-8 mb-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{committee.description}</p>
                </div>

                <div className="overflow-x-auto rounded-2xl shadow-lg dark:shadow-gray-900/50">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`${c.bg} ${c.darkBg}`}>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Maqaa</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Ogummaa</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Waggaa</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Bilbilaa</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Kampus</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Gandaa</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Seenaa</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Mana Barnootaa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {committee.members.map((m, i) => (
                        <tr key={i} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{m.name}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{m.field}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${c.badge} ${c.darkBadge} ${c.text} ${c.darkText}`}>{m.year}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{m.phone || "—"}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{m.campus}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{m.village}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{m.entry || "—"}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{m.school}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
