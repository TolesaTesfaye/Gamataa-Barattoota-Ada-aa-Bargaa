import express, { Router, Request, Response } from 'express';
import { Contact } from '../models/Contact.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router: Router = express.Router();

const ADMIN_ROLES = ['superadmin', 'admin'];

// Submit contact form (public)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, type } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ message: 'Name, email, and message are required' });
      return;
    }

    const contact = await Contact.create({ name, email, subject, message, type });
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error });
  }
});

// List submissions (admin only)
router.get('/', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error });
  }
});

// Get single submission (admin)
router.get('/:id', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch message', error });
  }
});

// Update status/reply (admin)
router.patch('/:id', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const { status, reply } = req.body;
    const updateData: any = {};

    if (status) updateData.status = status;
    if (reply !== undefined) {
      updateData.reply = reply;
      updateData.repliedBy = req.userId;
      updateData.repliedAt = new Date();
      if (status !== 'closed') updateData.status = 'replied';
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!contact) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }

    res.json({ message: 'Message updated successfully', contact });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update message', error });
  }
});

export default router;
