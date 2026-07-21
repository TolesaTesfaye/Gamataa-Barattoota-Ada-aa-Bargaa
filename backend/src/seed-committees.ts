import mongoose from "mongoose";
import { Committee } from "./models/Committee.js";
import connectDB from "./config/database.js";

async function seedCommittees() {
  try {
    await connectDB();
    console.log("✓ MongoDB connected successfully");

    // Check if committees already exist
    const existingCount = await Committee.countDocuments();
    if (existingCount > 0) {
      console.log(
        `Database already has ${existingCount} committees. Skipping committee seed.`,
      );
      await mongoose.disconnect();
      return;
    }

    console.log("Seeding committees...");

    const committees = [
      {
        name: "KOREE KOOLLEEJJII CI",
        head: "Wasihun Teferi",
        description:
          "Barattoonni kun barattoota college computing and informatics barataniidha. Dhuguma dubbachuuf boru gama teekinoloojiin uummata keenya kan tajaajilan barattoota kana keessaa ni bahu jennee abdii qabna. Gama kalaqa waa uumuu gara garaan warreen boru uummata keenya boonsan barattoota koolleejjii kana jala jiraniidha.",
        color: "blue",
        academicYear: "2017",
        members: [
          {
            name: "Wasihun Teferi",
            field: "IT",
            year: "2nd",
            phone: "0921323185",
            campus: "main",
            village: "mugher",
            entry: "2016",
            school: "mugher community",
          },
          {
            name: "Tolesa Tesfaye",
            field: "software",
            year: "3rd",
            phone: "0975863448",
            campus: "main",
            village: "Ejere Naga'o",
            entry: "2015",
            school: "Enchini 2nd school",
          },
          {
            name: "Aster Ketema",
            field: "computer science",
            year: "1st",
            phone: "0913688115",
            campus: "main",
            village: "mugher",
            entry: "2017",
            school: "mugher community",
          },
          {
            name: "Sannayit Baqqala",
            field: "GIS GC",
            year: "",
            phone: "0996612005",
            campus: "main",
            village: "Enchini",
            entry: "2014",
            school: "Enchini 2nd school",
          },
          {
            name: "Tigisti Taklu",
            field: "GIS GC",
            year: "",
            phone: "0980175917",
            campus: "main",
            village: "mugher",
            entry: "2014",
            school: "mugher community",
          },
          {
            name: "peniel Bacha",
            field: "software",
            year: "2nd",
            phone: "0913884804",
            campus: "main",
            village: "mugher",
            entry: "2016",
            school: "mugher community",
          },
          {
            name: "Daagim kabbada",
            field: "software",
            year: "3rd",
            phone: "0910469276",
            campus: "main",
            village: "mugher",
            entry: "2015",
            school: "mugher community",
          },
          {
            name: "Abbay Caalaa",
            field: "software Engineering",
            year: "1st",
            phone: "0949324128",
            campus: "main",
            village: "ulaa Gora",
            entry: "2017",
            school: "Reji 2nd school",
          },
        ],
      },
      {
        name: "KOREE KOOLLEEJJII FAYYAA",
        head: "Tesfaye Abebe",
        description:
          "Barattoonni kun amma barattoota barnoota fayyaa barataniidha. Isaanis boru gama ogummaa fayyaan ogeessota fayyaa ciccimoo fi warreen rakkina uummata isaanii furan ijoollee qaqqaalii Aanaan Ada'aa Bargaa koolleejjii kana jalaa qabduudha.",
        color: "emerald",
        academicYear: "2017",
        members: [
          {
            name: "Tigisti Gonfa",
            field: "Pharmacy",
            year: "1st",
            phone: "0923681415",
            campus: "main",
            village: "mugher",
            entry: "2017",
            school: "mugher community",
          },
          {
            name: "Tasfaaye Abeebe",
            field: "Pharmacy",
            year: "2nd",
            phone: "0914231118",
            campus: "harar",
            village: "senbaro sego",
            entry: "2016",
            school: "Reji 2nd school",
          },
          {
            name: "Birhanuu Tolcha",
            field: "Medical lab",
            year: "2nd",
            phone: "0940041316",
            campus: "harar",
            village: "mugher",
            entry: "2016",
            school: "Reji 2nd school",
          },
          {
            name: "Milkeessa Eshetu",
            field: "Medical lab",
            year: "1st",
            phone: "0933455580",
            campus: "main",
            village: "mugher",
            entry: "2017",
            school: "Reji 2nd school",
          },
          {
            name: "Tassamma Caalaa",
            field: "bio medical E",
            year: "",
            phone: "",
            campus: "main",
            village: "mugher",
            entry: "",
            school: "mugher community",
          },
        ],
      },
      {
        name: "KOREE MOORAA TEchNO",
        head: "Birhaanuu Galataa fi Seefuu Urge",
        description:
          "Barattoonni kuni injineroota warreen barumsa kamiifuu lafee dugdaa ta'an yoo ta'u, Aanaan Ada'aa Bargaa barattoota hedduu fi warreen hangafaa asi qabdi. Injineerri rakkoo biyya isaa sirritti hubatee, furmaata bu'uuraa fi bu'a-qabeessa ta'e uumuun yookiin kalaquun guddina biyyaatiif bu'uura jabaa kaa'a. Ogummaa cimaa, kutannoo fi gumaachi isaan biyyaaf godhan bu'aa guddaa fi kabaja ol'aanaa of keessaa qabuudha. Fakkeenyaaf yoo ilaalle, humna elektirikaa har'a Addunyaan itti fayyadamtu irraa eegalee hanga Konkolaataa, Xiyyaara, Roobootii fi maashinoota ofiin socho'aniitti hundi isaanii hojii injineroonni kalaqaniidha. Kun ammoo, bu'aa yeroo dheeraa fi jijjiirrama lafa qabatee itti fufu fiduu agarsiisa. Injineroonni waan salphaa irratti osoo hin taane, rakkoo bal'aa fi bu'uura qabu sirritti qorachuun, furmaata itti fufaa uumu. Sochii, guddinaa fi badhaadhina Addunyaa kanaa keessatti gahee isaanii malee yaaduun ni ulfaata. Walumaa galatti, Addunyaan Injiineroota malee sochoo'udhaaf yaaluun rakkina guddaa keessa nama galcha.",
        color: "amber",
        academicYear: "2017",
        members: [
          {
            name: "Birhanuu Galata",
            field: "Electrical",
            year: "2nd",
            phone: "0912720271",
            campus: "techno",
            village: "mugher",
            entry: "2016",
            school: "Reji 2nd school",
          },
          {
            name: "Seefu Urgea",
            field: "chemical Engineering",
            year: "2nd",
            phone: "0913884804",
            campus: "techno",
            village: "mugher",
            entry: "2016",
            school: "mugher community",
          },
          {
            name: "Oliiqaa Girma",
            field: "chemical Engineering GC",
            year: "",
            phone: "0910193599",
            campus: "techno",
            village: "Reji",
            entry: "2013",
            school: "mugher community",
          },
          {
            name: "Baayisa Birhanuu",
            field: "chemical Engineering",
            year: "1st",
            phone: "0935914102",
            campus: "main",
            village: "Ejere Naga'o",
            entry: "2017",
            school: "Enchini 2nd school",
          },
          {
            name: "Abdii Addunya",
            field: "civil Engineering",
            year: "1st",
            phone: "0970954616",
            campus: "main",
            village: "mugher",
            entry: "2017",
            school: "Reji 2nd school",
          },
          {
            name: "Magarsaa Dhuguma",
            field: "M Engineering",
            year: "2nd",
            phone: "0936710168",
            campus: "techno",
            village: "mugher",
            entry: "2016",
            school: "mugher community",
          },
          {
            name: "Balaayi Hayiluu",
            field: "Electrical",
            year: "2nd",
            phone: "0921710522",
            campus: "main",
            village: "mugher",
            entry: "2016",
            school: "mugher community",
          },
          {
            name: "Iyyu Birhanuu",
            field: "Mechanical Engineering",
            year: "2nd",
            phone: "0912345679",
            campus: "main",
            village: "mugher",
            entry: "2016",
            school: "Reji 2nd school",
          },
          {
            name: "Hacaalu Birhanuu",
            field: "Electrical",
            year: "2nd",
            phone: "0923795979",
            campus: "main",
            village: "mugher",
            entry: "2016",
            school: "Enchini 2nd school",
          },
        ],
      },
    ];

    await Committee.insertMany(committees);
    console.log(`✓ ${committees.length} committees created successfully`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("Error seeding committees:", error);
    process.exit(1);
  }
}

seedCommittees();
