import { useState } from "react";

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const CATEGORIES = ["All", "Membership", "Events", "Resources", "General", "About"] as const;

const faqs: FAQ[] = [
  { id: 1, category: "Membership", question: "Akkamittan miseensa Gamtaa Barattoota Ada'a Bargaa ta'uu danda'a?", answer: "Fuula jalqabaa irratti 'Register' ykn 'Miseensa Ta'i' jedhu irratti cuqaasuun galmaa'uu dandeessa. Pdf ykn seenaa kee guutii erga booddee, hooggansa gamtaa keenyaan mirkanaa'ee bilbilaan ykn emailiin siif deebii kennama." },
  { id: 2, category: "Membership", question: "Miseensummaa kafaltii qabaa?", answer: "Miseensummaan keenya bilisa. Barattoota Ada'a Bargaa hundinuu Yuunivarsiitii Haramaayaa keessatti miseensa ta'uu ni danda'u. Kafaltiin tokko iyyuu hin jiru." },
  { id: 3, category: "Membership", question: "Miseensa ta'uuf maal barbaachisa?", answer: "Barataa Ada'a Bargaa kan Yuunivarsiitii Haramaayaa ta'uu qabda. Pdf fi fakkii kee galmeessuu fi yeroo hunda isaanii nyaachisanii fi dhuganii namatti fakkaatu." },
  { id: 4, category: "Membership", question: "Miseensummaa bu'aawwan maal fa'i?", answer: "Bu'aawwan keessaa: walgahii fi sagantaa adda addaa keessatti hirmaachuu, meeshaalee barnootaa argachuu, gorsa fi qajeelfama barattoota sadarkaa olaanaa irraa argachuu, fi hiriyyaa haaraa wal beekuu." },
  { id: 5, category: "Membership", question: "Akkamittan odeeffannoo koo haaromii danda'a?", answer: "Dubbisee galmee kee irratti odeeffannoo kee, fakkii fi bilbilaa fi email kee haaromsuu dandeessa." },
  { id: 6, category: "Events", question: "Akkamittan sagantaa tokkoof galmaa'uu?", answer: "Fuula 'Events' irratti sagantaa barbaaddee 'Register' irratti cuqaasuun galmaa'i. Erga galmaa'ee booda email siif dhufa." },
  { id: 7, category: "Events", question: "Sagantaawwan kafaltii qabuu?", answer: "Sagantaawwan keenyarra hedduun bilisa. Saamunaa addaa ykn workshopwwan tokko tokko qarshii xiqqoo qabaachuu danda'u, kun fuula sagantaa irratti ibsamee jira." },
  { id: 8, category: "Events", question: "Sagantaawwanii fagoodhaa hirmaachuu danda'aa?", answer: "Eeyyee, sagantaawwan keenya tokko tokko karooraan ykn meetiidhaan hirmaachuu dandeessu. Ibsa sagantaa irratti qophii ilaali." },
  { id: 9, category: "Events", question: "Galmee koo sagantaaf cuftuu danda'aa?", answer: "Eeyyee, fuula sagantaa irratti 'Unregister' cuqaasuun cuftuu dandeessa. Garuu sagantaan erga jalqabee booda cuftuun dadhabaa ta'a." },
  { id: 10, category: "Resources", question: "Meeshaalee barnootaa akkamii argachuu danda'a?", answer: "Meeshaalee barnootaa, yaadanno, fi barreefama leenjii fuula 'Resources' irratti argachuu dandeessa. Dubbisee galmaa'uu qabda." },
  { id: 11, category: "Resources", question: "Akkamittan meeshaalee barumsaa argachuu?", answer: "Meeshaaleen barumsaa fi leenjii sadarkaa olaanaa fuula 'Resources' irratti dubbistoota qofaaf kennameera. Dubbisee galmaa'uun buufachuu dandeessa." },
  { id: 12, category: "General", question: "Gamtaan kun maal?", answer: "Gamtaan Barattoota Aanaa Ada'a Bargaa bara 2018tti Yuunivarsiitii Haramaayaa keessatti hundeeffame. Barattoota Ada'a Bargaa walitti qabuuf, waliif gargaaruuf, fi wal jajjabeessuuf dhaabbate." },
  { id: 13, category: "General", question: "Eennyu gamtaa kana keessatti miseensa ta'uu danda'a?", answer: "Barataan Ada'a Bargaa Yuunivarsiitii Haramaayaa keessatti baratu hundinuu miseensa ta'uu danda'a. Fedhii qabdu yoo qabdan nu qunnamaa." },
  { id: 14, category: "General", question: "Akkamittan gamtaa kana qunnamuu danda'a?", answer: "Fuula 'Nu Qunnami' irratti, email adaabargaa@student.haramaya.edu.etitti, ykn bilbilaan +251 91 234 5678 tiin nu qunnamuu dandeessu." },
  { id: 15, category: "About", question: "Gamtaan kun eessa argama?", answer: "Buufannoon keenya Yuunivarsiitii Haramaayaa keessatti argama. Gamtaan kun barattoota Ada'a Bargaa qofaaf Yuunivarsiitii keessatti hojjata." },
  { id: 16, category: "About", question: "Akkamittan gamtaa kana waliin hojjechuu danda'a?", answer: "Gamtaa keenya waliin hojjechuuf fedhii yoo qabdan, fuula 'Nu Qunnami' irratti 'Partnership' filadhaa. Nu dhaabbata barnootaa, hawaasa fi gamtaa biroo waliin hojjechuuf qophii dha." },
];

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = faqs.filter(f => {
    const matchesCategory = activeCategory === "All" || f.category === activeCategory;
    const matchesSearch = search === "" ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white rounded-2xl p-12 text-center shadow-lg">
        <h1 className="text-5xl font-bold mb-4">Gaaffilee Yeroo Baay'ee Gaafataman</h1>
        <p className="text-xl text-blue-100">Waa'ee Gamtaa Barattoota Ada'a Bargaa odeeffannoo argadhaa</p>
      </div>

      <div className="max-w-xl mx-auto relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Gaaffilee Barbaadi..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl pl-11 pr-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition shadow-lg dark:shadow-gray-900/50"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-500/10"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="max-w-xl mx-auto text-center py-16 px-4">
          <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Gaaffiin tokko iyyuu hin argamne</h3>
          <p className="text-gray-400 dark:text-gray-500">Jecha biraa yaali ykn ramaddii biraa filadhaa.</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-3">
          {filtered.map(faq => (
            <div
              key={faq.id}
              className={`rounded-xl border transition-all ${
                openId === faq.id
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-md dark:shadow-blue-900/20"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow dark:shadow-gray-900/50 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left px-6 py-4 flex justify-between items-center gap-4 transition"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{faq.category}</span>
                  <h3 className={`text-base font-semibold mt-0.5 transition-colors ${
                    openId === faq.id ? "text-blue-800 dark:text-blue-200" : "text-gray-900 dark:text-gray-100"
                  }`}>
                    {faq.question}
                  </h3>
                </div>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180 text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                  }`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-blue-100 dark:border-blue-800/50 pt-4 text-sm">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
