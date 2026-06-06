import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/User.js";
import { Member } from "./models/Member.js";
import { Event } from "./models/Event.js";
import { News } from "./models/News.js";
import { DocModel as Document } from "./models/Document.js";
import { Gallery } from "./models/Gallery.js";
import { Notification } from "./models/Notification.js";
import { Contact } from "./models/Contact.js";
import { Opportunity } from "./models/Opportunity.js";
import { Resource } from "./models/Resource.js";
import { Alumni } from "./models/Alumni.js";
import { Payment } from "./models/Payment.js";
import connectDB from "./config/database.js";

async function seed() {
  try {
    await connectDB();

    console.log("Clearing existing data...");
    const collections = [
      User,
      Member,
      Event,
      News,
      Document,
      Gallery,
      Notification,
      Contact,
      Opportunity,
      Resource,
      Alumni,
      Payment,
    ];
    await Promise.all(
      collections.map((model) => (model as any).deleteMany({})),
    );
    console.log("All collections cleared.");

    // ── Admin User ─────────────────────────────────────────────
    console.log("Creating admin user...");
    const adminPassword = await bcrypt.hash("superadmin123", 10);
    const admin = await User.create({
      email: "gbaabsuperadmin@gmail.com",
      password: adminPassword,
      firstName: "Super",
      lastName: "Admin",
      role: "superadmin",
      isActive: true,
    });
    console.log(`✓ Admin created: ${admin.email}`);

    // ── Sample Members ─────────────────────────────────────────
    console.log("Creating sample members...");
    const memberData = [
      {
        email: "kwesi.agyeman@gbaabw.com",
        firstName: "Kwesi",
        lastName: "Agyeman",
        role: "admin" as const,
        department: "Executive",
        designation: "President",
        phone: "+233-20-111-0001",
        bio: "Dedicated leader with 10+ years of community service.",
      },
      {
        email: "ama.boateng@gbaabw.com",
        firstName: "Ama",
        lastName: "Boateng",
        role: "admin" as const,
        department: "Executive",
        designation: "Vice President",
        phone: "+233-20-111-0002",
        bio: "Passionate about education and youth empowerment.",
      },
      {
        email: "kojo.asare@gbaabw.com",
        firstName: "Kojo",
        lastName: "Asare",
        role: "admin" as const,
        department: "Administration",
        designation: "General Secretary",
        phone: "+233-20-111-0003",
        bio: "Organized and detail-oriented administrator.",
      },
      {
        email: "efua.nyarko@gbaabw.com",
        firstName: "Efua",
        lastName: "Nyarko",
        role: "student" as const,
        department: "Finance",
        designation: "Treasurer",
        phone: "+233-20-111-0004",
        bio: "Finance professional with expertise in nonprofit accounting.",
      },
      {
        email: "yaw.mensah@gbaabw.com",
        firstName: "Yaw",
        lastName: "Mensah",
        role: "student" as const,
        department: "Events",
        designation: "Events Coordinator",
        phone: "+233-20-111-0005",
        bio: "Creative event planner with great organizational skills.",
      },
      {
        email: "aba.otoo@gbaabw.com",
        firstName: "Aba",
        lastName: "Otoo",
        role: "admin" as const,
        department: "Communications",
        designation: "Communications Lead",
        phone: "+233-20-111-0006",
        bio: "Media and communications specialist.",
      },
    ];

    const memberPassword = await bcrypt.hash("member123", 10);
    const createdUsers = await User.create(
      memberData.map(
        (m: {
          email: string;
          firstName: string;
          lastName: string;
          role: string;
        }) => ({
          email: m.email,
          password: memberPassword,
          firstName: m.firstName,
          lastName: m.lastName,
          role: m.role,
          isActive: true,
        }),
      ),
    );

    const members = await Member.create(
      createdUsers.map(
        (
          u: { _id: any; firstName: any; lastName: any; email: any },
          i: number,
        ) => ({
          userId: u._id,
          fullName: `${u.firstName} ${u.lastName}`,
          email: u.email,
          phone: memberData[i].phone,
          membershipNumber: `GBA/${String(i + 1).padStart(4, "0")}/${new Date().getFullYear()}`,
          membershipStatus: "active" as const,
          joinDate: new Date(Date.now() - (6 - i) * 30 * 24 * 60 * 60 * 1000),
          department: memberData[i].department,
          designation: memberData[i].designation,
          bio: memberData[i].bio,
          profileImage: `https://ui-avatars.com/api/?name=${u.firstName}+${u.lastName}&background=2563eb&color=fff`,
          isPublic: true,
        }),
      ),
    );

    console.log(`✓ ${members.length} members created`);

    // ── Sample Events ──────────────────────────────────────────
    console.log("Creating sample events...");
    const now = new Date();
    const events = await Event.create([
      {
        title: "Annual General Meeting 2026",
        description:
          "Join us for the annual general meeting where we review the past year and plan for the future. All members are expected to attend.",
        date: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 61 * 24 * 60 * 60 * 1000),
        location: "GBAABW Headquarters, Accra",
        organizer: admin._id,
        attendees: [
          admin._id,
          ...createdUsers.slice(0, 3).map((u: { _id: any }) => u._id),
        ],
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        category: "conference",
        status: "upcoming",
        maxAttendees: 200,
        isPublic: true,
      },
      {
        title: "Leadership Workshop Series",
        description:
          "A hands-on workshop aimed at developing leadership skills among members. Topics include public speaking, team management, and strategic planning.",
        date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        location: "Virtual via Zoom",
        organizer: createdUsers[0]._id,
        attendees: createdUsers.map((u) => u._id),
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
        category: "workshop",
        status: "completed",
        maxAttendees: 50,
        isPublic: true,
      },
      {
        title: "Community Outreach Program",
        description:
          "Giving back to the community through education and mentorship. Volunteers will visit local schools to speak with students.",
        date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
        location: "Various Schools, Greater Accra Region",
        organizer: createdUsers[1]._id,
        attendees: [
          createdUsers[0]._id,
          createdUsers[2]._id,
          createdUsers[4]._id,
        ],
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
        category: "social",
        status: "upcoming",
        maxAttendees: 100,
        isPublic: true,
      },
      {
        title: "Financial Literacy Training",
        description:
          "A training session covering personal finance, investment basics, and retirement planning. Open to all members and their families.",
        date: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        endDate: new Date(
          now.getTime() + 30 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
        ),
        location: "GBAABW Conference Room, Accra",
        organizer: createdUsers[3]._id,
        attendees: [],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        category: "training",
        status: "upcoming",
        maxAttendees: 30,
        isPublic: true,
      },
    ]);
    console.log(`✓ ${events.length} events created`);

    // ── Sample News ────────────────────────────────────────────
    console.log("Creating sample news...");
    const news = await News.create([
      {
        title: "Announcing the 2026 Executive Committee Elections",
        content:
          "We are pleased to announce that nominations are now open for the 2026 Executive Committee elections. All active members are eligible to vote. The election period runs from March 1 to March 15, 2026.",
        author: admin._id,
        image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c",
        category: "announcement",
        status: "published",
        views: 145,
        isPublic: true,
        publishedAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
      },
      {
        title: "The Impact of Community Associations on Local Development",
        content:
          "In this article, we explore how community associations like GBAABW contribute to local development through education, mentorship, and economic empowerment programs.",
        author: createdUsers[0]._id,
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
        category: "article",
        status: "published",
        views: 89,
        isPublic: true,
        publishedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Member Spotlight: Ama Boateng's Journey in Public Service",
        content:
          "Get to know Ama Boateng, our Vice President, and learn about her inspiring journey in public service and community development over the past decade.",
        author: createdUsers[2]._id,
        image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
        category: "blog",
        status: "published",
        views: 210,
        isPublic: true,
        publishedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Important Update: Membership Dues for 2026",
        content:
          "This is a reminder that annual membership dues for 2026 are now due. Please make your payments by January 31st to avoid any disruption in your membership status.",
        author: admin._id,
        image: "",
        category: "update",
        status: "published",
        views: 67,
        isPublic: true,
        publishedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ ${news.length} news items created`);

    // ── Sample Documents ───────────────────────────────────────
    console.log("Creating sample documents...");
    const documents = await Document.create([
      {
        title: "GBAABW Constitution",
        description:
          "The official constitution of the Ghanaian Association of Business and Academic Women. Revised in 2025.",
        fileUrl: "https://docs.google.com/document/d/sample-constitution",
        fileType: "pdf",
        category: "constitution",
        uploadedBy: admin._id,
        accessLevel: "public",
        downloads: 340,
        tags: ["constitution", "governance", "bylaws"],
      },
      {
        title: "Executive Committee Meeting Minutes - January 2026",
        description:
          "Minutes from the January 2026 executive committee meeting.",
        fileUrl: "https://docs.google.com/document/d/sample-minutes",
        fileType: "pdf",
        category: "minutes",
        uploadedBy: createdUsers[2]._id,
        accessLevel: "members",
        downloads: 56,
        tags: ["minutes", "executive", "meeting"],
      },
      {
        title: "Membership Registration Form",
        description: "Form for new members to register with GBAABW.",
        fileUrl: "https://docs.google.com/document/d/sample-form",
        fileType: "doc",
        category: "form",
        uploadedBy: admin._id,
        accessLevel: "public",
        downloads: 120,
        tags: ["membership", "registration", "form"],
      },
    ]);
    console.log(`✓ ${documents.length} documents created`);

    // ── Sample Gallery Albums ──────────────────────────────────
    console.log("Creating sample gallery albums...");
    const galleries = await Gallery.create([
      {
        title: "2025 Annual Banquet",
        description:
          "Photos from our spectacular annual banquet held in December 2025.",
        type: "photo",
        images: [
          {
            url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
            caption: "Opening ceremony",
            uploadedBy: admin._id,
          },
          {
            url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
            caption: "Keynote address",
            uploadedBy: admin._id,
          },
          {
            url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
            caption: "Award presentation",
            uploadedBy: createdUsers[4]._id,
          },
          {
            url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
            caption: "Group photo",
            uploadedBy: createdUsers[4]._id,
          },
        ],
        videos: [],
        coverImage:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
        category: "event",
        uploadedBy: admin._id,
        isPublic: true,
      },
      {
        title: "Community Outreach Highlights",
        description:
          "A video compilation of our community outreach activities throughout the year.",
        type: "video",
        images: [],
        videos: [
          {
            url: "https://www.youtube.com/watch?v=sample-outreach",
            title: "Outreach Summary 2025",
            uploadedBy: admin._id,
          },
        ],
        coverImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
        category: "event",
        uploadedBy: createdUsers[1]._id,
        isPublic: true,
      },
    ]);
    console.log(`✓ ${galleries.length} gallery albums created`);

    // ── Sample Notifications ──────────────────────────────────
    console.log("Creating sample notifications...");
    const notifications = await Notification.create([
      {
        recipient: admin._id,
        type: "system",
        title: "Welcome to GBAABW",
        message:
          "Welcome to the GBAABW Association Management System. You have been registered as a super admin.",
        link: "/dashboard",
        isRead: true,
        readAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
      },
      {
        recipient: createdUsers[0]._id,
        type: "event",
        title: "Upcoming Event: Annual General Meeting",
        message:
          "Reminder: The Annual General Meeting is scheduled for next month. Please confirm your attendance.",
        link: `/events/${events[0]._id}`,
        isRead: false,
      },
      {
        recipient: createdUsers[3]._id,
        type: "membership",
        title: "Membership Renewal Reminder",
        message:
          "Your annual membership is due for renewal. Please complete payment to maintain active status.",
        link: "/membership/renew",
        isRead: false,
      },
      {
        recipient: admin._id,
        type: "announcement",
        title: "New Contact Form Submission",
        message:
          "A new contact form submission has been received. Please review and respond.",
        link: "/contacts",
        isRead: false,
      },
    ]);
    console.log(`✓ ${notifications.length} notifications created`);

    // ── Sample Contact Submissions ─────────────────────────────
    console.log("Creating sample contact submissions...");
    const contacts = await Contact.create([
      {
        name: "Grace Asare",
        email: "grace.asare@example.com",
        subject: "Membership Inquiry",
        message:
          "Hello, I am interested in joining GBAABW. Could you please send me information about membership requirements and fees?",
        type: "general",
        status: "new",
      },
      {
        name: "Dr. Michael Osei",
        email: "michael.osei@university.edu",
        subject: "Partnership Proposal",
        message:
          "I am writing to propose a partnership between GBAABW and the University of Ghana Business School. We have several collaborative initiatives that may interest your members.",
        type: "suggestion",
        status: "replied",
        repliedBy: admin._id,
        reply:
          "Dear Dr. Osei, thank you for reaching out. We would be delighted to explore partnership opportunities. Please let us know a convenient time for a meeting.",
        repliedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ ${contacts.length} contact submissions created`);

    // ── Sample Opportunities ───────────────────────────────────
    console.log("Creating sample opportunities...");
    const opportunities = await Opportunity.create([
      {
        title: "Summer Internship Program 2026",
        description:
          "A 3-month paid internship program for university students. Interns will gain hands-on experience in project management, community engagement, and administration.",
        type: "internship",
        organization: "GBAABW",
        location: "Accra, Ghana",
        eligibility:
          "Currently enrolled university students with at least one year of study remaining.",
        applicationDeadline: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000),
        applicationLink: "https://gbaabw.com/internship-apply",
        contactEmail: "careers@gbaabw.com",
        postedBy: admin._id,
        status: "active",
        isPublic: true,
      },
      {
        title: "GBAABW Academic Excellence Scholarship",
        description:
          "A merit-based scholarship awarded to outstanding students from the Ghanaian community pursuing higher education.",
        type: "scholarship",
        organization: "GBAABW Education Fund",
        location: "Ghana",
        eligibility:
          "Applicants must be GBAABW members or dependents of members, with a minimum GPA of 3.5.",
        applicationDeadline: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
        applicationLink: "https://gbaabw.com/scholarship-apply",
        contactEmail: "scholarships@gbaabw.com",
        postedBy: createdUsers[0]._id,
        status: "active",
        isPublic: true,
      },
      {
        title: "Community Development Manager",
        description:
          "Full-time position managing community development projects and coordinating with partner organizations.",
        type: "job",
        organization: "GBAABW",
        location: "Accra, Ghana",
        eligibility:
          "Minimum 5 years experience in community development or related field. Master's degree preferred.",
        applicationDeadline: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        applicationLink: "https://gbaabw.com/careers",
        contactEmail: "hr@gbaabw.com",
        postedBy: admin._id,
        status: "active",
        isPublic: true,
      },
    ]);
    console.log(`✓ ${opportunities.length} opportunities created`);

    // ── Sample Resources ───────────────────────────────────────
    console.log("Creating sample resources...");
    const resources = await Resource.create([
      {
        title: "Introduction to Project Management",
        description:
          "A comprehensive study guide covering the fundamentals of project management, including planning, execution, and monitoring.",
        fileUrl: "https://docs.google.com/document/d/sample-pm-guide",
        type: "study_material",
        subject: "Project Management",
        uploadedBy: admin._id,
        downloads: 45,
        isPublic: true,
      },
      {
        title: "Professional Certification Practice Exam",
        description:
          "Sample questions and answers for the Project Management Professional (PMP) certification exam.",
        fileUrl: "https://docs.google.com/document/d/sample-pmp-exam",
        type: "exam",
        subject: "Professional Development",
        uploadedBy: createdUsers[3]._id,
        downloads: 23,
        isPublic: true,
      },
    ]);
    console.log(`✓ ${resources.length} resources created`);

    // ── Sample Alumni Profiles ─────────────────────────────────
    console.log("Creating sample alumni profiles...");
    const alumni = await Alumni.create([
      {
        user: createdUsers[0]._id,
        fullName: "Kwesi Agyeman",
        email: "kwesi.agyeman@gbaabw.com",
        phone: "+233-20-111-0001",
        graduationYear: 2015,
        department: "Business Administration",
        currentPosition: "Senior Project Manager",
        company: "TechCorp Ghana",
        location: "Accra, Ghana",
        bio: "Experienced project manager with a passion for community development and youth mentorship.",
        profileImage:
          "https://ui-avatars.com/api/?name=Kwesi+Agyeman&background=2563eb&color=fff",
        linkedin: "https://linkedin.com/in/kwesiagyeman",
        isMentor: true,
        mentorshipAreas: [
          "Project Management",
          "Leadership",
          "Career Development",
        ],
        isSuccessStory: true,
        successStory:
          "Kwesi started as a junior member and rose to become our President. His leadership transformed the association's outreach programs.",
        isPublic: true,
      },
      {
        user: createdUsers[1]._id,
        fullName: "Ama Boateng",
        email: "ama.boateng@gbaabw.com",
        phone: "+233-20-111-0002",
        graduationYear: 2016,
        department: "Public Administration",
        currentPosition: "Policy Advisor",
        company: "Ministry of Education",
        location: "Accra, Ghana",
        bio: "Dedicated public servant committed to educational policy reform and community empowerment.",
        profileImage:
          "https://ui-avatars.com/api/?name=Ama+Boateng&background=2563eb&color=fff",
        linkedin: "https://linkedin.com/in/amaboateng",
        isMentor: true,
        mentorshipAreas: ["Public Policy", "Education", "Government Relations"],
        isSuccessStory: true,
        successStory:
          "Ama's work in educational policy has directly impacted thousands of students across Ghana.",
        isPublic: true,
      },
      {
        user: createdUsers[4]._id,
        fullName: "Yaw Mensah",
        email: "yaw.mensah@gbaabw.com",
        phone: "+233-20-111-0005",
        graduationYear: 2018,
        department: "Marketing",
        currentPosition: "Events Marketing Manager",
        company: "EventPro Ghana",
        location: "Kumasi, Ghana",
        bio: "Creative marketing professional with expertise in event planning and brand management.",
        profileImage:
          "https://ui-avatars.com/api/?name=Yaw+Mensah&background=2563eb&color=fff",
        linkedin: "https://linkedin.com/in/yawmensah",
        isMentor: false,
        mentorshipAreas: [],
        isSuccessStory: false,
        successStory: "",
        isPublic: true,
      },
    ]);
    console.log(`✓ ${alumni.length} alumni profiles created`);

    // ── Sample Payments ────────────────────────────────────────
    console.log("Creating sample payments...");
    const payments = await Payment.create([
      {
        member: members[0]._id,
        amount: 100,
        currency: "USD",
        paymentType: "membership_fee",
        paymentMethod: "bank_transfer",
        transactionId: "TXN-" + Date.now() + "-001",
        status: "completed",
        receiptUrl: "https://gbaabw.com/receipts/001",
        notes: "Annual membership fee for 2026",
        paymentDate: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
      },
      {
        member: members[1]._id,
        amount: 100,
        currency: "USD",
        paymentType: "membership_fee",
        paymentMethod: "mobile_money",
        transactionId: "TXN-" + Date.now() + "-002",
        status: "completed",
        notes: "Annual membership fee for 2026",
        paymentDate: new Date(now.getTime() - 55 * 24 * 60 * 60 * 1000),
      },
      {
        member: members[2]._id,
        amount: 50,
        currency: "USD",
        paymentType: "event_fee",
        paymentMethod: "cash",
        transactionId: "TXN-" + Date.now() + "-003",
        status: "pending",
        notes: "Leadership Workshop registration fee",
        paymentDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ ${payments.length} payments created`);

    console.log("");
    console.log("═══════════════════════════════════════════");
    console.log("  Database seeded successfully!");
    console.log("═══════════════════════════════════════════");
    console.log("  Superadmin: gbaabsuperadmin@gmail.com / superadmin123");
    console.log("  Admin login: <any admin email> / member123");
    console.log("  Student login: <any student email> / member123");
    console.log("═══════════════════════════════════════════");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

seed();
