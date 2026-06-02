import express, { Router, Request, Response } from 'express';
import { Payment } from '../models/Payment.js';
import { Member } from '../models/Member.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router: Router = express.Router();

const ADMIN_ROLES = ['superadmin', 'admin'];

// Get payment statistics (admin only)
router.get('/stats', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const [totalStats, pendingStats, byType] = await Promise.all([
      Payment.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
      ]),
      Payment.aggregate([
        { $match: { status: 'pending' } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
      ]),
      Payment.aggregate([
        { $group: { _id: '$paymentType', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      totalCollected: totalStats[0]?.total || 0,
      totalCount: totalStats[0]?.count || 0,
      pendingTotal: pendingStats[0]?.total || 0,
      pendingCount: pendingStats[0]?.count || 0,
      byType,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment stats', error });
  }
});

// Get current user's payments
router.get('/my', authenticate, async (req: Request, res: Response) => {
  try {
    const member = await Member.findOne({ userId: req.userId });
    if (!member) {
      res.status(404).json({ message: 'Member profile not found' });
      return;
    }

    const payments = await Payment.find({ member: member._id })
      .populate('member', 'fullName membershipNumber')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error });
  }
});

// List all payments (admin only)
router.get('/', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find()
      .populate('member', 'fullName email membershipNumber')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error });
  }
});

// Create payment record
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { amount, currency, paymentType, paymentMethod, transactionId, receiptUrl, notes, paymentDate } = req.body;

    const member = await Member.findOne({ userId: req.userId });
    if (!member) {
      res.status(404).json({ message: 'Member profile not found. Please create a member profile first.' });
      return;
    }

    const payment = await Payment.create({
      member: member._id,
      amount,
      currency,
      paymentType,
      paymentMethod,
      transactionId,
      receiptUrl,
      notes,
      paymentDate,
    });

    res.status(201).json({ message: 'Payment recorded successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment', error });
  }
});

// Get single payment
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('member', 'fullName email membershipNumber');

    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    // Members can only view their own payments
    if (!ADMIN_ROLES.includes(req.userRole || '')) {
      const member = await Member.findOne({ userId: req.userId });
      if (!member || payment.member.toString() !== member._id.toString()) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment', error });
  }
});

// Update payment status (admin only)
router.patch('/:id/status', authenticate, authorize(ADMIN_ROLES), async (req: Request, res: Response) => {
  try {
    const { status, transactionId, receiptUrl, notes } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status, transactionId, receiptUrl, notes },
      { new: true }
    ).populate('member', 'fullName email membershipNumber');

    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    res.json({ message: 'Payment status updated successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update payment status', error });
  }
});

export default router;
