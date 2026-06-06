import express, { Router, Request, Response } from "express";
import { Committee } from "../models/Committee.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router: Router = express.Router();

// Get all committees
router.get("/", async (req: Request, res: Response) => {
  try {
    const { academicYear } = req.query;
    const filter: Record<string, string> = {};
    if (academicYear) filter.academicYear = academicYear as string;
    const committees = await Committee.find(filter).sort({ createdAt: -1 });
    res.json(committees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch committees", error });
  }
});

// Get a single committee by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const committee = await Committee.findById(req.params.id);
    if (!committee) {
      res.status(404).json({ message: "Committee not found" });
      return;
    }
    res.json(committee);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch committee", error });
  }
});

// Create a new committee (admin or superadmin)
router.post(
  "/",
  authenticate,
  authorize(["admin", "superadmin"]),
  async (req: Request, res: Response) => {
    try {
      const { name, head, description, color, members, academicYear } =
        req.body;
      const committee = await Committee.create({
        name,
        head,
        description,
        color,
        members,
        academicYear: academicYear || "2017",
      });
      res
        .status(201)
        .json({ message: "Committee created successfully", committee });
    } catch (error) {
      res.status(500).json({ message: "Failed to create committee", error });
    }
  },
);

// Update a committee (admin or superadmin)
router.patch(
  "/:id",
  authenticate,
  authorize(["admin", "superadmin"]),
  async (req: Request, res: Response) => {
    try {
      const committee = await Committee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!committee) {
        res.status(404).json({ message: "Committee not found" });
        return;
      }
      res.json({ message: "Committee updated successfully", committee });
    } catch (error) {
      res.status(500).json({ message: "Failed to update committee", error });
    }
  },
);

// Delete a committee (superadmin only)
router.delete(
  "/:id",
  authenticate,
  authorize(["superadmin"]),
  async (req: Request, res: Response) => {
    try {
      const committee = await Committee.findByIdAndDelete(req.params.id);
      if (!committee) {
        res.status(404).json({ message: "Committee not found" });
        return;
      }
      res.json({ message: "Committee deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete committee", error });
    }
  },
);

export default router;
