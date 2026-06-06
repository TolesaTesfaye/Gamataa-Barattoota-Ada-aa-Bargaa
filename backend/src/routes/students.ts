import express, { Router, Request, Response } from "express";
import { Student } from "../models/Student.js";
import { User } from "../models/User.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router: Router = express.Router();

// Get all students (public)
router.get("/", async (req: Request, res: Response) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error });
  }
});

// Get student by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student", error });
  }
});

// Create student (authenticated - admin/superadmin)
router.post("/", authenticate, async (req: Request, res: Response) => {
  try {
    const {
      name,
      field,
      year,
      village,
      school,
      phone,
      email,
      telegram,
      entry,
      role,
      message,
      bio,
      image,
    } = req.body;

    const student = await Student.create({
      userId: req.userId,
      name,
      field,
      year,
      village,
      school,
      phone,
      email,
      telegram,
      entry,
      role,
      message,
      bio,
      image,
    });

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Failed to create student", error });
  }
});

// Update student (owner student or superadmin)
router.patch("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    // Check authorization:
    // - Superadmin can edit any student
    // - Student can edit their own profile (if userId matches OR email+fullName+phone match)
    const isSuperadmin = req.userRole === "superadmin";

    // Check by userId first
    const isOwnerByUserId =
      student.userId &&
      req.userId &&
      student.userId.toString() === req.userId.toString();

    // Check by identity (email + fullName + phone match)
    let isOwnerByIdentity = false;
    if (req.userId && !isOwnerByUserId) {
      const currentUser = await User.findById(req.userId);
      if (currentUser) {
        const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
        const studentNameLower = student.name.toLowerCase();
        const fullNameLower = fullName.toLowerCase();
        const studentEmail = student.email?.toLowerCase() || "";
        const userEmail = currentUser.email?.toLowerCase() || "";

        // Flexible name matching (handles nicknames like "(Tolman)")
        const nameMatch =
          studentNameLower.includes(fullNameLower) ||
          fullNameLower.includes(studentNameLower);
        const emailMatch = studentEmail === userEmail;
        const phoneMatch = student.phone === currentUser.phone;

        if (emailMatch && nameMatch && phoneMatch) {
          isOwnerByIdentity = true;
          // Link the userId to student for future edits
          await Student.findByIdAndUpdate(req.params.id, {
            userId: req.userId,
          });
        }
      }
    }

    if (!isOwnerByUserId && !isOwnerByIdentity && !isSuperadmin) {
      res
        .status(403)
        .json({ message: "Access denied: you can only edit your own profile" });
      return;
    }

    const updates = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true },
    );

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update student", error });
  }
});

// Delete student (superadmin only)
router.delete(
  "/:id",
  authenticate,
  authorize(["superadmin"]),
  async (req: Request, res: Response) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete student", error });
    }
  },
);

// Seed initial students from static data (superadmin only)
router.post(
  "/seed",
  authenticate,
  authorize(["superadmin"]),
  async (req: Request, res: Response) => {
    try {
      const { students } = req.body;
      if (!Array.isArray(students) || students.length === 0) {
        res
          .status(400)
          .json({ message: "Please provide an array of students" });
        return;
      }

      // Clear existing and seed
      await Student.deleteMany({});
      const seeded = await Student.insertMany(students);
      res.status(201).json({
        message: `${seeded.length} students seeded successfully`,
        students: seeded,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to seed students", error });
    }
  },
);

export default router;
