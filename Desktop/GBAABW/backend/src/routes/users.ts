import express, { Router, Request, Response } from 'express';
import { User } from '../models/User.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router: Router = express.Router();

// Get all users (superadmin only)
router.get('/', authenticate, authorize(['superadmin']), async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

// Get user by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
});

// Update user
router.patch('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    // Users can only update their own profile
    if (req.userId !== req.params.id && req.userRole !== 'superadmin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const { firstName, lastName, isActive, role } = req.body;
    const updateData: any = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (isActive !== undefined && req.userRole === 'superadmin') updateData.isActive = isActive;
    if (role && req.userRole === 'superadmin') updateData.role = role;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select(
      '-password'
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
});

// Delete user (superadmin only)
router.delete('/:id', authenticate, authorize(['superadmin']), async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
});

export default router;
