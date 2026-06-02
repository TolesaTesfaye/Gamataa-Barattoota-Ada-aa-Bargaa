import express, { Router, Request, Response } from "express";
import { News } from "../models/News.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router: Router = express.Router();

// Get all published news
router.get("/", async (req: Request, res: Response) => {
  try {
    const news = await News.find({ status: "published", isPublic: true })
      .populate("author", "firstName lastName")
      .sort({ publishedAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news", error });
  }
});

// Get news by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const newsItem = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true },
    ).populate("author", "firstName lastName");

    if (!newsItem) {
      res.status(404).json({ message: "News not found" });
      return;
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news", error });
  }
});

// Create news (authenticated users)
router.post("/", authenticate, async (req: Request, res: Response) => {
  try {
    const { title, content, category, image } = req.body;

    const news = await News.create({
      title,
      content,
      category,
      image,
      author: req.userId,
      status: "draft",
    });

    res.status(201).json({ message: "News created successfully", news });
  } catch (error) {
    res.status(500).json({ message: "Failed to create news", error });
  }
});

// Publish news (author or admin)
router.post(
  "/:id/publish",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const news = await News.findById(req.params.id);
      if (!news) {
        res.status(404).json({ message: "News not found" });
        return;
      }

      if (req.userId !== news.author.toString() && req.userRole !== "superadmin" && req.userRole !== "admin") {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      news.status = "published";
      news.publishedAt = new Date();
      await news.save();

      res.json({ message: "News published successfully", news });
    } catch (error) {
      res.status(500).json({ message: "Failed to publish news", error });
    }
  },
);

// Update news (author or admin)
router.patch("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      res.status(404).json({ message: "News not found" });
      return;
    }

    if (req.userId !== news.author.toString() && req.userRole !== "superadmin" && req.userRole !== "admin") {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const updates = req.body;
    const updatedNews = await News.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json({ message: "News updated successfully", news: updatedNews });
  } catch (error) {
    res.status(500).json({ message: "Failed to update news", error });
  }
});

// Delete news (author or admin)
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      res.status(404).json({ message: "News not found" });
      return;
    }

    if (req.userId !== news.author.toString() && req.userRole !== "superadmin" && req.userRole !== "admin") {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete news", error });
  }
});

export default router;
