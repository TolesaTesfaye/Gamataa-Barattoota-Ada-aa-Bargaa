import express, { Router, Request, Response } from 'express';
import { Member } from '../models/Member.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router: Router = express.Router();

// Get all public members
router.get('/', async (req: Request, res: Response) => {
  try {
    const members = await Member.find({ isPublic: true })
      .populate('userId', 'firstName lastName email')
      .sort({ joinDate: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch members', error });
  }
});

// Get member by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const member = await Member.findById(req.params.id).populate(
      'userId',
      'firstName lastName email'
    );
    if (!member) {
      res.status(404).json({ message: 'Member not found' });
      return;
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch member', error });
  }
});

// Create member (admin or authenticated user)
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, department, designation, bio, profileImage } = req.body;

    const membershipNumber = `GBAA-${Date.now()}`;

    const member = await Member.create({
      userId: req.userId,
      fullName,
      email,
      phone,
      membershipNumber,
      department,
      designation,
      bio,
      profileImage,
    });

    res.status(201).json({ message: 'Member created successfully', member });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create member', error });
  }
});

// Update member
router.patch('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      res.status(404).json({ message: 'Member not found' });
      return;
    }

    // Check authorization
    if (req.userId !== member.userId.toString() && req.userRole !== 'superadmin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const updates = req.body;
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, updates, { new: true });

    res.json({ message: 'Member updated successfully', member: updatedMember });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update member', error });
  }
});

// Delete member (superadmin only)
router.delete('/:id', authenticate, authorize(['superadmin']), async (req: Request, res: Response) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      res.status(404).json({ message: 'Member not found' });
      return;
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete member', error });
  }
});

export default router;
