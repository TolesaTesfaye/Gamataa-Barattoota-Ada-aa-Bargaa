import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/User.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

async function createSuperAdmin() {
  try {
    await connectDB();

    console.log("Setting up superadmin...");
    
    const email = "gbaabsuperadmin@gmail.com";
    const password = "superadmin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    let admin = await User.findOne({ email });

    if (admin) {
      console.log("Superadmin already exists. Updating password and role...");
      admin.password = hashedPassword;
      admin.role = "superadmin";
      admin.firstName = "Super";
      admin.lastName = "Admin";
      admin.isActive = true;
      await admin.save();
    } else {
      console.log("Creating new superadmin...");
      admin = await User.create({
        email,
        password: hashedPassword,
        firstName: "Super",
        lastName: "Admin",
        role: "superadmin",
        isActive: true,
      });
    }

    console.log(`✓ Superadmin successfully setup: ${email} / ${password}`);

  } catch (error) {
    console.error("Failed to setup superadmin:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

createSuperAdmin();
