import express, { Router, Request, Response } from 'express';
import { Opportunity } from '../models/Opportunity.js';
import { authenticate } from '../middleware/auth.js';

const router: Router = express.Router();

const ADMIN_ROLES = ['superadmin', 'admin'];

// List active opportunities (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const filter: any = { status: 'active', isPublic: true };

    if (req.query.type) {
      filter.type = req.query.type;
    }

    const opportunities = await Opportunity.find(filter)
      .populate('postedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch opportunities', error });
  }
});

// Get single opportunity
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('postedBy', 'firstName lastName email');

    if (!opportunity) {
      res.status(404).json({ message: 'Opportunity not found' });
      return;
    }

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch opportunity', error });
  }
});

// Create opportunity (authenticated)
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      title, description, type, organization, location,
      eligibility, applicationDeadline, applicationLink, contactEmail,
    } = req.body;

    const opportunity = await Opportunity.create({
      title,
      description,
      type,
      organization,
      location,
      eligibility,
      applicationDeadline,
      applicationLink,
      contactEmail,
      postedBy: req.userId,
    });

    res.status(201).json({ message: 'Opportunity created successfully', opportunity });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create opportunity', error });
  }
});

// Update opportunity (owner or admin)
router.patch('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      res.status(404).json({ message: 'Opportunity not found' });
      return;
    }

    if (req.userId !== opportunity.postedBy.toString() && !ADMIN_ROLES.includes(req.userRole || '')) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const updatedOpportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Opportunity updated successfully', opportunity: updatedOpportunity });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update opportunity', error });
  }
});

// Delete opportunity (owner or admin)
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      res.status(404).json({ message: 'Opportunity not found' });
      return;
    }

    if (req.userId !== opportunity.postedBy.toString() && !ADMIN_ROLES.includes(req.userRole || '')) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    await Opportunity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete opportunity', error });
  }
});

export default router;
