import express, { Router, Request, Response } from "express";
import { Event } from "../models/Event.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router: Router = express.Router();

// Get all public events
router.get("/", async (req: Request, res: Response) => {
  try {
    const events = await Event.find({ isPublic: true })
      .populate("organizer", "firstName lastName")
      .populate("attendees", "firstName lastName")
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
});

// Get event by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "firstName lastName email")
      .populate("attendees", "firstName lastName");
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch event", error });
  }
});

// Create event (authenticated users)
router.post("/", authenticate, async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      date,
      endDate,
      location,
      category,
      maxAttendees,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      endDate,
      location,
      category,
      maxAttendees,
      organizer: req.userId,
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error });
  }
});

// Register for event
router.post(
  "/:id/register",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      // Check if already registered
      if (event.attendees.includes(req.userId as any)) {
        res.status(400).json({ message: "Already registered for this event" });
        return;
      }

      // Check max attendees
      if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
        res.status(400).json({ message: "Event is full" });
        return;
      }

      event.attendees.push(req.userId as any);
      await event.save();

      res.json({ message: "Registered for event successfully", event });
    } catch (error) {
      res.status(500).json({ message: "Failed to register for event", error });
    }
  },
);

// Unregister from event
router.post(
  "/:id/unregister",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const event = await Event.findByIdAndUpdate(
        req.params.id,
        { $pull: { attendees: req.userId } },
        { new: true },
      );

      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      res.json({ message: "Unregistered from event successfully", event });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to unregister from event", error });
    }
  },
);

// Update event (organizer or admin)
router.patch("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    if (req.userId !== event.organizer.toString() && req.userRole !== "superadmin" && req.userRole !== "admin") {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const updates = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error });
  }
});

// Delete event (organizer or admin)
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    if (req.userId !== event.organizer.toString() && req.userRole !== "superadmin" && req.userRole !== "admin") {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error });
  }
});

export default router;
