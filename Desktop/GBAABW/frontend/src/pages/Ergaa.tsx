const leaders = [
  {
    name: "Oliiqaa Girmaa",
    field: "Chemical Engineering",
    year: "Waggaa 5ffaa",
    message:
      'Tokkummaan siidaa jaalalaa barattoota Aanaa keenyaan mooraa yuunivarsiitii Haramaayaa keessatti jalqabe kun gara hawaasa keenyattii fi kan birootti ce\'uun madda furmaataa fi galma gahiinsaa gama barnootaan barattoota keenyaf akka karaa ta\'uuf hawwii koo isa guddaadha.',
  },
  {
    name: "Tolasaa Tasfaayee",
    field: "Software Engineering",
    year: "Waggaa 3ffaa",
    message:
      "Hiikaan jireenyaa gaafa ati obboleessa yookin obboleetti keef jiraattu siif gala. Yeroon akkas jedhu biqiltuun tokko biqiltuu tahuu isaa gaafa gaaddisaaf da'oo isaa hubattu dadhabbiin ykn humni biqiltuu sanatti bahe sitti muldhata. Kanaaf wanti nuti akka gatii hin qabneetti ilaallu boru gati guddaa qaba. Tokkummaan kun wanta nuti eessattuu irra deebinee hin arganneedha. Yaa hiriyoota koo waliif, waliin akkasumas waloon yaa jabaannu, yaa ceenun dhaamsa hiriyummaa kan koodha.",
  },
  {
    name: "Birhaanuu Tolchaa",
    field: "Medical Laboratory",
    year: "Waggaa 2ffaa",
    message:
      "Tokkummaan humna! Humna irra kan darbe immoo eenyummaadha. Labatni eenyummaa isaa beeku immoo waan gochuu qabu godhee isa hojjachuuf dhalate hojjatee seenaa boollaa olitti hafee jiraatu dalaguun dhaloota dhufuun leellifamaa, akkasumas ashaaraa hin badne dhalootaaf bu'uuressa. Tokkummaan jalqabame kun burqaa hin gogne irraa dhoo'uun foolii tokkummaa fi jaalalaan Aanaa fi biyyaa keenya akka urgeessu nan abdadha. Jabaadhaa wajjin seenaa hojjanna.",
  },
  {
    name: "Tasfaayee Abeebee",
    field: "Pharmacy",
    year: "Waggaa 2ffaa",
    message:
      "Akkuma Oromoon mixiin walqabattee laga ceeti jedhee bu'aa tokkummaa ibsu, tokkummaan bu'uura milka'inaa fi jabinaati. Kanaafuu tokkummaadhaa gara milka'inaatti haa deemnuun dhaamsa koo isa obbolummaati. Tokkummaadhaan wal haa deeggarru, wal haa jajjabeessinu, wal haa tumsinu! Wal wajjin gara milka'inaatti yaa deemnu!!!",
  },
  {
    name: "Girmaa Tiksee",
    field: "Economics",
    year: "Waggaa 2ffaa",
    message:
      "Tokkummaan keenya jabaatee labata dhufu bira akka ga'uuf tumsa akka goonu, muudannoo nutti dhufu keessa darbuuf, kaayyoo keenya irratti kutannoo qabaachuun, ofiif qofa osoo hin ta'in waliif yaaduun dhaloota mul'ata gaarii qaban akka oomishnu jechuun dhaamsa koo isa angafaati. Akkasumas dhaaba keenya akka jabeessinu, tokkummaan kunis nu harka gahee akka hin laafne jechaa, Tokkummaan kun akka ifaa dhaloota biroo biratti ol bahee akka mul'atuuf ga'ee akka taphannu. Isa keessaas gammachuu, jaalalli, tokkummaani fi injifannoon akka burqu adaraan isiniif dhaamudha. Tokko ta'uun humna, waliin ta'uun injifannoodha.",
  },
  {
    name: "Haacaaluu Birhaanuu",
    field: "Electrical Engineering",
    year: "Waggaa 2ffaa",
    message:
      "Tokkummaan humna. Humni immoo ijaaruu, diiguu, harkisuu, dhiibuu, cabsuu, jabeessuu danda'a. Akkasumas tokkummaan jaalala; jaalalli immoo karaa dhalli namaa ittiin gammadee waliin jiraatudha. Waan hundas of keessaa qaba, iddoon nutii dhamdhama jaalala obbolummaa waliin dhamdhamne kun onnee dhaloota dhufuu keessatti siidaa seenaa ta'ee akka jiraatuuf jaalala har'a gidduu keenyatti mul'ate kana jabeessinee yaa kunuunsinuun dhaamsa kooti.",
  },
  {
    name: "Birhaanuu Galataa",
    field: "Electrical and Computer Engineering",
    year: "Waggaa 3ffaa",
    message:
      'Tokkummaan keenya miidhaginaa fi jabina keenya mirkaneessa. Publilius Syrus tokkummaa akka kana jedhee ibsa; "Where there is unity there is always victory." kana jechuun bakka tokkummaan jiru, injifannoon ni jira. Wanti guddaan tokko nama tokkorraa hin dhalatu. Garuu waloon yoo hojjetame, dhugumaan bu\'aa ol\'aanaa fiduu danda\'a. Akkuma mammaaksi Oromoo jedhu: "Tokkummaan humna, tokkoon alagatu si saama." Kana jechuun, yoo waliin dhaabbannuu fi tokkummaan sochoonu, rakkina kamiyyuu ni injifanna jechuudha. Tokkummaan keenya Aanaa Ada\'aa Bargaa keessatti dhalatee hanga Yuunivarsiitii ga\'e, har\'as jijjiirama guddinaa qabatamaa mul\'isaa dhufeera. Yeroo rakkoon nutti dhufu, tokko taanee waliin rakkoo dagannee; yeroo gammachuun dhufus, tokko taanee wal faarsina. Wanti tokkoon dadhabamu, waloon ni salphata. Kanaafuu, tokkummaan keenya mallattoo jaalalaa, waliif yaaduu fi waliif gargaarsaa ta\'ee jira. Waan haaraa ijaaruu fi seenaa galmeessuu kan dandeenyu, tokkummaan yoo nu bira jiraate qofa. Yoo wal jabeessine, yoo wal gargaarru, yoo waliif taane, egaa daandii milka\'inaa hedduu ni ceena. "Tokkummaan marge, diina cabsee injifannoo argamsiisa."',
  },
];

export default function Ergaa() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative bg-gradient-to-br from-amber-700 via-amber-800 to-orange-900 dark:from-amber-900 dark:via-orange-950 dark:to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium tracking-wide">
            Hangafoota Irraa
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            ERGAA GABAABAA
          </h1>
          <p className="text-lg sm:text-xl text-amber-200 max-w-2xl mx-auto leading-relaxed">
            Dhaamsa jaalalaa fi tokkummaa hangafoota gamtaa Ada'a Bargaa irraa
          </p>
        </div>
      </div>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-bold text-sm shrink-0">
                        {index + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        {leader.name}
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:shrink-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium">
                      {leader.field}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                      {leader.year}
                    </span>
                  </div>
                </div>
                <div className="relative pl-6 border-l-4 border-amber-400 dark:border-amber-500">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg italic">
                    "{leader.message}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
