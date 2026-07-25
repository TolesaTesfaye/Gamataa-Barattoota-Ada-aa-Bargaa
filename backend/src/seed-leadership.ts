import mongoose from "mongoose";
import dotenv from "dotenv";
import { Member } from "./models/Member.js";
import { User } from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/gbaabw";

const leadershipData = [
  {
    fullName: "Dr. Sarah Mensah",
    email: "s.mensah@gbaabw.org",
    phone: "+251 91 234 5001",
    department: "Executive",
    designation: "President",
    bio: "Over 20 years of experience in professional development and organizational leadership, driving the association's strategic vision.",
    profileImage: "",
    isPublic: true,
  },
  {
    fullName: "James Osei",
    email: "j.osei@gbaabw.org",
    phone: "+251 91 234 5002",
    department: "Executive",
    designation: "Vice President",
    bio: "Expert in strategic planning and community engagement with a passion for youth mentorship and member development.",
    profileImage: "",
    isPublic: true,
  },
  {
    fullName: "Ama Serwaa",
    email: "a.serwaa@gbaabw.org",
    phone: "+251 91 234 5003",
    department: "Finance",
    designation: "Treasurer",
    bio: "Accredited accountant with extensive experience in non-profit financial management and regulatory compliance.",
    profileImage: "",
    isPublic: true,
  },
  {
    fullName: "Kwame Asante",
    email: "k.asante@gbaabw.org",
    phone: "+251 91 234 5004",
    department: "Administration",
    designation: "Secretary",
    bio: "Dedicated administrator committed to operational excellence, governance, and delivering exceptional member services.",
    profileImage: "",
    isPublic: true,
  },
  {
    fullName: "Akua Nyarko",
    email: "a.nyarko@gbaabw.org",
    phone: "+251 91 234 5005",
    department: "Programs",
    designation: "Programs Director",
    bio: "Passionate about designing impactful programs that drive professional growth and community engagement across the UK.",
    profileImage: "",
    isPublic: true,
  },
  {
    fullName: "Yaw Adjei",
    email: "y.adjei@gbaabw.org",
    phone: "+251 91 234 5006",
    department: "Communications",
    designation: "Communications Lead",
    bio: "Seasoned communications professional specializing in public relations, digital media, and brand strategy.",
    profileImage: "",
    isPublic: true,
  },
];

async function seedLeadership() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find or create a system user for leadership members
    let systemUser = await User.findOne({ email: "system@gbaabw.org" });
    
    if (!systemUser) {
      console.log("Creating system user for leadership members...");
      systemUser = await User.create({
        firstName: "System",
        lastName: "Admin",
        email: "system@gbaabw.org",
        password: "not-used-" + Date.now(), // Random password, not used for login
        role: "admin",
        isVerified: true,
      });
      console.log("✅ System user created");
    }

    // Delete existing leadership members (based on email domain)
    const leaderEmails = leadershipData.map((l) => l.email);
    await Member.deleteMany({ email: { $in: leaderEmails } });
    console.log("🗑️  Removed existing leadership members");

    // Create leadership members
    const members = await Promise.all(
      leadershipData.map(async (leader) => {
        const membershipNumber = `GBAA-LEAD-${Date.now()}-${Math.floor(
          Math.random() * 1000
        )}`;
        
        return Member.create({
          userId: systemUser!._id,
          fullName: leader.fullName,
          email: leader.email,
          phone: leader.phone,
          membershipNumber,
          membershipStatus: "active",
          department: leader.department,
          designation: leader.designation,
          bio: leader.bio,
          profileImage: leader.profileImage,
          isPublic: leader.isPublic,
          joinDate: new Date(),
        });
      })
    );

    console.log(`✅ Created ${members.length} leadership members:`);
    members.forEach((member) => {
      console.log(`   - ${member.fullName} (${member.designation})`);
    });

    console.log("\n🎉 Leadership seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding leadership:", error);
    process.exit(1);
  }
}

seedLeadership();
