# GBAABW - Quick Setup Guide

## 1️⃣ Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## 2️⃣ Setup Environment Variables

### Backend (.env)

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/gbaabw
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)

```bash
cd frontend
cp .env.example .env.local
```

File should contain:

```env
VITE_API_URL=http://localhost:5000/api
```

## 3️⃣ Start MongoDB

**Option A: Local MongoDB**

```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**

- Create account at mongodb.com
- Create cluster
- Get connection string
- Use in MONGODB_URI

## 4️⃣ Start Development Servers

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

✓ Backend running on http://localhost:5000

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

✓ Frontend running on http://localhost:5173

## 5️⃣ Test the Application

1. Open http://localhost:5173
2. Click "Register" to create an account
3. Fill in details and submit
4. Login with your credentials
5. Explore: Members, Events, News pages
6. Create a member profile from dashboard
7. (Admin only) Access /admin for admin panel

## 📱 Key Pages

- **Home** - Landing page with quick stats
- **Members** - Browse member directory
- **Events** - View and register for events
- **News** - Read latest news articles
- **Dashboard** - Personal user dashboard
- **Admin** - Admin management panel (admin role only)

## 🔑 Default Credentials (if seed data exists)

Email: admin@gbaabw.com
Password: (from .env ADMIN_PASSWORD)

## 📝 Available Commands

### Backend

```bash
npm run dev      # Development with auto-reload
npm run build    # Build to dist folder
npm start        # Start production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Frontend

```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## ⚠️ Common Issues & Solutions

### MongoDB Connection Failed

- Make sure MongoDB is running (`mongod`)
- Check MONGODB_URI in .env
- For MongoDB Atlas, ensure IP whitelist includes your IP

### Port Already in Use

- Backend: Change PORT in .env
- Frontend: Change port in vite.config.ts

### CORS Error

- Verify FRONTEND_URL in backend .env matches frontend URL
- Check VITE_API_URL in frontend .env.local

### Module Not Found

- Delete node_modules and package-lock.json
- Run `npm install` again

## 🎯 Next Development Steps

1. **Customize Styling** - Update colors in tailwind.config.js
2. **Add Features** - Create new routes and components
3. **Implement Admin Features** - Build admin management pages
4. **Add Image Uploads** - Integrate file upload service
5. **Setup Email** - Configure email notifications
6. **Add Pagination** - Implement pagination for lists
7. **Deploy** - Push to production server

## 📚 Useful Resources

- Express.js: https://expressjs.com
- MongoDB: https://mongodb.com
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- TypeScript: https://typescriptlang.org

## 💡 Pro Tips

- Use VS Code with TypeScript extension for better development
- Install Postman/Thunder Client to test API endpoints
- Check browser console for frontend errors
- Check terminal for backend logs
- Use React DevTools for debugging component state

---

**Ready to start? Run the commands in section 4️⃣ and open http://localhost:5173!** 🚀
