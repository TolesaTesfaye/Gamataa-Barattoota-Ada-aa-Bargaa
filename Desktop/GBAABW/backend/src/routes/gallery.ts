import express, { Router, Request, Response } from 'express';
import { Gallery } from '../models/Gallery.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router: Router = express.Router();

const ADMIN_ROLES = ['superadmin', 'admin'];

// Get all public galleries
router.get('/', async (req: Request, res: Response) => {
  try {
    const galleries = await Gallery.find({ isPublic: true })
      .populate('uploadedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch galleries', error });
  }
});

// Get single gallery with images/videos
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findById(req.params.id)
      .populate('uploadedBy', 'firstName lastName')
      .populate('images.uploadedBy', 'firstName lastName')
      .populate('videos.uploadedBy', 'firstName lastName');

    if (!gallery) {
      res.status(404).json({ message: 'Gallery not found' });
      return;
    }

    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gallery', error });
  }
});

// Create gallery (admin only)
router.post('/', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const { title, description, type, coverImage, category } = req.body;

    const gallery = await Gallery.create({
      title,
      description,
      type,
      coverImage,
      category,
      uploadedBy: req.userId,
    });

    res.status(201).json({ message: 'Gallery created successfully', gallery });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create gallery', error });
  }
});

// Add image to gallery (admin)
router.post('/:id/images', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      res.status(404).json({ message: 'Gallery not found' });
      return;
    }

    const { url, caption } = req.body;
    gallery.images.push({ url, caption, uploadedBy: req.userId as any });
    await gallery.save();

    res.json({ message: 'Image added successfully', gallery });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add image', error });
  }
});

// Add video to gallery (admin)
router.post('/:id/videos', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      res.status(404).json({ message: 'Gallery not found' });
      return;
    }

    const { url, title } = req.body;
    gallery.videos.push({ url, title, uploadedBy: req.userId as any });
    await gallery.save();

    res.json({ message: 'Video added successfully', gallery });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add video', error });
  }
});

// Remove image from gallery (admin)
router.delete('/:id/images/:imageId', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      res.status(404).json({ message: 'Gallery not found' });
      return;
    }

    gallery.images = gallery.images.filter(
      (img: any) => img._id.toString() !== req.params.imageId
    );
    await gallery.save();

    res.json({ message: 'Image removed successfully', gallery });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove image', error });
  }
});

// Update gallery (admin)
router.patch('/:id', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!gallery) {
      res.status(404).json({ message: 'Gallery not found' });
      return;
    }

    res.json({ message: 'Gallery updated successfully', gallery });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update gallery', error });
  }
});

// Delete gallery (admin)
router.delete('/:id', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      res.status(404).json({ message: 'Gallery not found' });
      return;
    }

    res.json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete gallery', error });
  }
});

export default router;
