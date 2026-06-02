# GBAABW Association Website

A full-stack MERN (MongoDB, Express, React, Node.js) application for the GBAABW Association. This platform enables members to manage their profiles, discover events, read news, and engage with the association community.

## Features

- **User Authentication**: Secure registration and login system
- **User Roles**: Support for admin, moderator, and regular user roles
- **Member Management**: Complete member profiles with directories
- **Event Management**: Create, manage, and register for events
- **News & Articles**: Publish and manage news updates
- **Admin Dashboard**: Comprehensive admin panel for content management
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Project Structure

```
GBAABW/
├── backend/           # Node.js + Express API
│   ├── src/
│   │   ├── config/    # Database configuration
│   │   ├── models/    # MongoDB schemas
│   │   ├── routes/    # API endpoints
│   │   ├── middleware/# Auth and error handling
│   │   └── index.ts   # Server entry point
│   ├── .env.example   # Environment variables template
│   ├── package.json
│   └── tsconfig.json
└── frontend/          # React + TypeScript frontend
    ├── src/
    │   ├── components/ # React components
    │   ├── pages/     # Page components
    │   ├── services/  # API client
    │   ├── store/     # Zustand state management
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── tailwind.config.js
```

## Prerequisites

- Node.js 16+ and npm
- MongoDB (local or MongoDB Atlas)
- Git

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Configure in `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/gbaabw
PORT=5000
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

If running locally:

```bash
mongod
```

Or use MongoDB Atlas connection string in `.env`

### 4. Run Backend

```bash
# Development with auto-reload
npm run dev

# Production build
npm run build
npm start
```

Backend runs on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Create Environment File

Create `.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Frontend

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Users

- `GET /api/users` - List all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

### Members

- `GET /api/members` - List all public members
- `GET /api/members/:id` - Get member details
- `POST /api/members` - Create member profile
- `PATCH /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member (admin only)

### Events

- `GET /api/events` - List all public events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event
- `POST /api/events/:id/register` - Register for event
- `POST /api/events/:id/unregister` - Unregister from event
- `PATCH /api/events/:id` - Update event (organizer/admin)
- `DELETE /api/events/:id` - Delete event (organizer/admin)

### News

- `GET /api/news` - List published news
- `GET /api/news/:id` - Get news details
- `POST /api/news` - Create news (requires auth)
- `POST /api/news/:id/publish` - Publish news (author/admin)
- `PATCH /api/news/:id` - Update news (author/admin)
- `DELETE /api/news/:id` - Delete news (author/admin)

## Authentication

The app uses JWT (JSON Web Tokens) for authentication:

1. User logs in or registers
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in API requests via Authorization header
5. Frontend redirects to login if token is invalid

## Technologies Used

### Backend

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

### Frontend

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client

## Development Workflow

### 1. Start MongoDB

```bash
mongod
```

### 2. Start Backend

```bash
cd backend
npm run dev
```

### 3. Start Frontend (in new terminal)

```bash
cd frontend
npm run dev
```

### 4. Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- API Health Check: http://localhost:5000/api/health

## Testing the Application

### Test Account (if seed data exists)

- Email: admin@gbaabw.com
- Password: (check `.env.example`)

### Manual Testing Flow

1. Register a new account at `/register`
2. Login at `/login`
3. View members at `/members`
4. Browse events at `/events`
5. Read news at `/news`
6. Access dashboard at `/dashboard`
7. Access admin panel at `/admin` (admin role only)

## Deployment

### Backend Deployment (e.g., Railway, Render, Heroku)

1. Set environment variables in deployment platform
2. Deploy from git repository
3. Ensure MongoDB URI is set for production database

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set API URL environment variable

## Performance Optimization

- Frontend uses Vite for fast builds
- Backend implements proper indexing on MongoDB
- Pagination implemented for list endpoints
- Image optimization recommended for production

## Security Considerations

- ✓ Password hashing with bcryptjs
- ✓ JWT token expiration
- ✓ CORS configuration
- ✓ Environment variables for secrets
- ✓ Input validation
- Consider adding rate limiting in production
- Consider adding HTTPS/SSL certificates
- Consider adding request logging

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### CORS Errors

- Check `FRONTEND_URL` in backend `.env`
- Ensure it matches actual frontend URL

### Frontend API Errors

- Check `VITE_API_URL` in frontend `.env.local`
- Verify backend is running on correct port

## Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m "Add feature"`
3. Push to branch: `git push origin feature/feature-name`
4. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please open an issue on the repository.

## Next Steps

1. Set up environment variables in both backend and frontend
2. Install dependencies: `npm install` in both folders
3. Start MongoDB
4. Run `npm run dev` in backend folder
5. Run `npm run dev` in frontend folder
6. Open http://localhost:5173 in your browser

Happy coding! 🚀
