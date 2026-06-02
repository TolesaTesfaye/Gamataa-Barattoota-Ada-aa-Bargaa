import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import memberRoutes from './routes/members.js';
import eventRoutes from './routes/events.js';
import newsRoutes from './routes/news.js';
import documentRoutes from './routes/documents.js';
import galleryRoutes from './routes/gallery.js';
import paymentRoutes from './routes/payments.js';
import alumniRoutes from './routes/alumni.js';
import notificationRoutes from './routes/notifications.js';
import contactRoutes from './routes/contact.js';
import opportunityRoutes from './routes/opportunities.js';
import resourceRoutes from './routes/resources.js';
import dashboardRoutes from './routes/dashboard.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler (must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`✓ Server running at http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
