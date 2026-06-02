import express, { Router, Request, Response } from 'express';
import { Alumni } from '../models/Alumni.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router: Router = express.Router();

const ADMIN_ROLES = ['superadmin', 'admin'];

// List mentors
router.get('/mentors', async (req: Request, res: Response) => {
  try {
    const mentors = await Alumni.find({ isMentor: true, isPublic: true })
      .select('fullName email department currentPosition company bio profileImage mentorshipAreas')
      .sort({ fullName: 1 });

    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mentors', error });
  }
});

// List success stories
router.get('/success-stories', async (req: Request, res: Response) => {
  try {
    const stories = await Alumni.find({ isSuccessStory: true, isPublic: true })
      .select('fullName graduationYear department currentPosition company successStory profileImage')
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch success stories', error });
  }
});

// List all public alumni
router.get('/', async (req: Request, res: Response) => {
  try {
    const alumni = await Alumni.find({ isPublic: true })
      .populate('user', 'firstName lastName email')
      .sort({ graduationYear: -1 });

    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch alumni', error });
  }
});

// Get single alumni
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const alumni = await Alumni.findById(req.params.id)
      .populate('user', 'firstName lastName email');

    if (!alumni) {
      res.status(404).json({ message: 'Alumni not found' });
      return;
    }

    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch alumni', error });
  }
});

// Create alumni profile (authenticated)
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      fullName, email, phone, graduationYear, department,
      currentPosition, company, location, bio, profileImage, linkedin,
      mentorshipAreas, isSuccessStory, successStory,
    } = req.body;

    // Check if alumni profile already exists for this user
    const existing = await Alumni.findOne({ user: req.userId });
    if (existing) {
      res.status(409).json({ message: 'Alumni profile already exists for this user' });
      return;
    }

    const alumni = await Alumni.create({
      user: req.userId,
      fullName,
      email,
      phone,
      graduationYear,
      department,
      currentPosition,
      company,
      location,
      bio,
      profileImage,
      linkedin,
      mentorshipAreas,
      isSuccessStory,
      successStory,
    });

    res.status(201).json({ message: 'Alumni profile created successfully', alumni });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create alumni profile', error });
  }
});

// Update alumni (owner or admin)
router.patch('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    if (!alumni) {
      res.status(404).json({ message: 'Alumni not found' });
      return;
    }

    if (req.userId !== alumni.user.toString() && !ADMIN_ROLES.includes(req.userRole || '')) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Alumni profile updated successfully', alumni: updatedAlumni });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update alumni profile', error });
  }
});

// Delete alumni (admin only)
router.delete('/:id', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const alumni = await Alumni.findByIdAndDelete(req.params.id);
    if (!alumni) {
      res.status(404).json({ message: 'Alumni not found' });
      return;
    }

    res.json({ message: 'Alumni deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete alumni', error });
  }
});

// Toggle mentor status (admin)
router.post('/:id/mentor', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    if (!alumni) {
      res.status(404).json({ message: 'Alumni not found' });
      return;
    }

    alumni.isMentor = !alumni.isMentor;
    if (req.body.mentorshipAreas) {
      alumni.mentorshipAreas = req.body.mentorshipAreas;
    }
    await alumni.save();

    res.json({ message: `Mentor status ${alumni.isMentor ? 'enabled' : 'disabled'}`, alumni });
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle mentor status', error });
  }
});

export default router;
