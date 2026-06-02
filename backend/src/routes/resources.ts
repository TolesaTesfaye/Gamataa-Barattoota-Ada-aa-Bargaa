import express, { Router, Request, Response } from 'express';
import { Resource } from '../models/Resource.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router: Router = express.Router();

const ADMIN_ROLES = ['superadmin', 'admin'];

// List public resources
router.get('/', async (req: Request, res: Response) => {
  try {
    const filter: any = { isPublic: true };

    if (req.query.type) {
      filter.type = req.query.type;
    }

    const resources = await Resource.find(filter)
      .populate('uploadedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resources', error });
  }
});

// Get single resource
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('uploadedBy', 'firstName lastName');

    if (!resource) {
      res.status(404).json({ message: 'Resource not found' });
      return;
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resource', error });
  }
});

// Create resource (admin only)
router.post('/', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const { title, description, fileUrl, type, subject } = req.body;

    const resource = await Resource.create({
      title,
      description,
      fileUrl,
      type,
      subject,
      uploadedBy: req.userId,
    });

    res.status(201).json({ message: 'Resource created successfully', resource });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create resource', error });
  }
});

// Delete resource (admin only)
router.delete('/:id', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);

    if (!resource) {
      res.status(404).json({ message: 'Resource not found' });
      return;
    }

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resource', error });
  }
});

// Increment download count
router.post('/:id/download', async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!resource) {
      res.status(404).json({ message: 'Resource not found' });
      return;
    }

    res.json({ message: 'Download counted', downloads: resource.downloads });
  } catch (error) {
    res.status(500).json({ message: 'Failed to count download', error });
  }
});

export default router;
