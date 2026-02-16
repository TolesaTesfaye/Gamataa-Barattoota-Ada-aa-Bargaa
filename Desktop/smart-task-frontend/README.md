# TaskApp - Task Management Frontend

A modern, full-featured task management application built with Next.js, React, and Tailwind CSS.

## Features

- **User Authentication**: Secure JWT-based login and registration
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status and priority
- **Admin Dashboard**: Manage users and view all tasks
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant feedback on task operations
- **Role-based Access**: Different features for users and administrators

## Tech Stack

- **Frontend Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Language**: TypeScript
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskapp-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional, for custom API URL):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Running the Application

Development mode:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

Production build:
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard page
│   ├── dashboard/         # User dashboard page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── Navbar.tsx         # Navigation bar
│   ├── TaskForm.tsx       # Task creation/editing form
│   └── TaskList.tsx       # Task list display
├── context/               # React context
│   └── AuthContext.tsx    # Authentication context
├── services/              # API services
│   ├── api.ts            # Axios instance
│   ├── auth.ts           # Authentication endpoints
│   └── tasks.ts          # Task endpoints
└── lib/                   # Utility functions
    └── utils.ts          # Helper functions
```

## API Endpoints

The frontend communicates with the following backend endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Admin
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/{id}` - Delete user
- `GET /api/admin/tasks` - Get all tasks

## Demo Credentials

For testing purposes, use these credentials:
- **Email**: admin@example.com
- **Password**: password

## Features in Detail

### Dashboard
- View all your tasks
- Create new tasks with title, description, status, priority, and due date
- Edit existing tasks
- Delete tasks
- Filter tasks by status and priority
- Track task completion

### Admin Panel
- View all users in the system
- Delete users
- View all tasks across all users
- See task owner information

### Authentication
- Secure JWT token-based authentication
- Automatic token refresh
- Protected routes
- Role-based access control

## Styling

The application uses Tailwind CSS for styling with a modern, clean design:
- Responsive grid layouts
- Smooth transitions and animations
- Color-coded status and priority badges
- Accessible form inputs
- Mobile-first design

## Error Handling

- Network error handling with user-friendly messages
- Form validation
- Loading states
- Error boundaries
- Graceful fallbacks

## Performance

- Code splitting with Next.js
- Image optimization
- CSS minification
- Efficient re-renders with React Context
- Lazy loading of components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@taskapp.com or open an issue on GitHub.

## Roadmap

- [ ] Dark mode support
- [ ] Task categories/tags
- [ ] Task sharing and collaboration
- [ ] Email notifications
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Recurring tasks
- [ ] Task templates
