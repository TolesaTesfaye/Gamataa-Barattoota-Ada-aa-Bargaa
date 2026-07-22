import mongoose from "mongoose";
import { News } from "./models/News.js";
import { User } from "./models/User.js";
import connectDB from "./config/database.js";

async function seedNews() {
  try {
    await connectDB();
    console.log("✓ MongoDB connected successfully");

    // Check if news already exist
    const existingCount = await News.countDocuments();
    if (existingCount > 0) {
      console.log(
        `Database already has ${existingCount} news items. Skipping news seed.`,
      );
      await mongoose.disconnect();
      return;
    }

    // Find or create a default author (admin user)
    let author = await User.findOne({ role: "superadmin" });
    if (!author) {
      author = await User.findOne({ role: "admin" });
    }
    if (!author) {
      author = await User.findOne();
    }

    if (!author) {
      console.log(
        "⚠ No users found. Please create a user first before seeding news.",
      );
      await mongoose.disconnect();
      return;
    }

    console.log(`Using author: ${author.firstName} ${author.lastName}`);

    const newsItems = [
      {
        title: "Gara Bara 2017 Bilisummaa Olaantummaa Barattootaa",
        content:
          "Aannan Ada'aa Bargaa barattoota addaa addaa hirmaatan haala gaarii mirkaneessee bara 2017 akka bilisummaa fi olaantummaan ittiin argaman dandeessisu hojii eegalame. Bara kana barattoonni koolleejjii baratan 300 ol ta'an hirmaatanii badhaasa argatan. Hojii kun tumsa abbootii mana barumsaa, hoggansa barumsaa fi hojjettoota hojii arggamanii ta'e hojjetame.",
        category: "announcement",
        status: "published",
        isPublic: true,
        publishedAt: new Date("2017-09-15T10:00:00Z"),
        author: author._id,
        image: "",
        views: 245,
      },
      {
        title: "Magaalaa Ada'aa Bargaa: Iddoo Barumsa Olaantummaa",
        content:
          "Magaalaan Ada'aa Bargaa iddoo barumsa olaantummaa ta'ee beekamti. Kun barattootaa koolleejjii fiuniversiteewwan naannoo keenyaa barbaadan. Barumsi odeeffannoo teeknikaa, fayyaa, inijinering, barnoota hojii, fi kkf kan biroo hunda kan dabalatudha. Naannoon kun biyya keessa tarkaanfii olaanaa fudhateera.",
        category: "article",
        status: "published",
        isPublic: true,
        publishedAt: new Date("2017-10-20T08:30:00Z"),
        author: author._id,
        image: "",
        views: 189,
      },
      {
        title: "Dorgommii Weeraa: Barattoonni Koolleejjii Kana Mo'atan",
        content:
          "Dorgommii weeraa naannoo Harargee keessatti barattoonni Aanaan Ada'aa Bargaa baay'ee mo'atan. Kana keessaa dorgommii teeknika, barnoota afaan, fi al tolchuu hirmaatan. Barattoonni kana badhaasa argatanii bulchiinsa magaalattii fi abbootiin mana barumsaa galateeffatan.",
        category: "blog",
        status: "published",
        isPublic: true,
        publishedAt: new Date("2017-11-05T14:00:00Z"),
        author: author._id,
        image: "",
        views: 312,
      },
      {
        title: "Hamannoo Guddina Pirojektoonni Gaggeeffamoo",
        content:
          "Bara kana gaggeeffamaa jiru pirojektoonni guddina naannoo adda addaa hirmaatoodha. Hojii eenyummaa, hojii daangaa, barnoota ummataaf bobbaasu, fi kkf kan biroon hirmaatoodha. Gaggeeffamni kun bara dhufu kan itti fufuudha.",
        category: "update",
        status: "published",
        isPublic: true,
        publishedAt: new Date("2017-12-10T09:00:00Z"),
        author: author._id,
        image: "",
        views: 156,
      },
      {
        title: "Yaada Barataa: Koolleejjii Keenya Bara Itti Aanu",
        content:
          "Bara 2018 koolleejjii keenya cimsuun beekamti godha. Barataa haaraan dabalataa barachuun ni danda'ama. Konooneen harka qooda barnootaatiif nama gargaara. Imala kana hordofuun barbaachisaa dha.",
        category: "blog",
        status: "published",
        isPublic: true,
        publishedAt: new Date("2018-01-20T11:00:00Z"),
        author: author._id,
        image: "",
        views: 278,
      },
      {
        title: "Tumsa Uummataaf: Waldaan Guddina Ada'aa Bargaa",
        content:
          "Waldaan guddina Ada'aa Bargaa hojii gurguruu fi hirmaachisuu eegale. Uummata naannoo kanaa hirmaachisuun jijjiirrama gaarii fidanii jiru. Hojiin kun biyyaaf bu'aa guddaa qaba.",
        category: "announcement",
        status: "draft",
        isPublic: false,
        publishedAt: null,
        author: author._id,
        image: "",
        views: 0,
      },
      {
        title: "Hojii Gaggeeffamaa: Gama Barnoota Fayyaatiin",
        content:
          "Barattoonni barnoota fayyaa hirmaatanii hojii barnootaaf bobbaasuun ni jiru. Kunis ummataaf tajaajila fayyaa gaarii argamsiisuuf barbaachisaa dha.",
        category: "article",
        status: "published",
        isPublic: true,
        publishedAt: new Date("2018-03-08T07:45:00Z"),
        author: author._id,
        image: "",
        views: 198,
      },
      {
        title: "Koree Koolleejjii Onnolanii: Galmeen Kanaaf",
        content:
          "Koreen koolleejjii onnolanii filannoo gaggeessudha. Barattoonni filannoo godhachuun appaayintii isaanii godhachuu ni danda'u. Batchii qofa waan ta'ef yeroo barbaachisu hojjetamuu qaba.",
        category: "announcement",
        status: "archived",
        isPublic: true,
        publishedAt: new Date("2018-04-15T13:00:00Z"),
        author: author._id,
        image: "",
        views: 421,
      },
    ];

    await News.insertMany(newsItems);
    console.log(
      `✓ ${newsItems.length} news items created successfully (${newsItems.filter((n) => n.status === "published").length} published, ${newsItems.filter((n) => n.status === "draft").length} drafts, ${newsItems.filter((n) => n.status === "archived").length} archived)`,
    );

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("Error seeding news:", error);
    process.exit(1);
  }
}

seedNews();
