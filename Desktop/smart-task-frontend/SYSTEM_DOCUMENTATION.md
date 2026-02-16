# Smart Task Management System - Complete Documentation

## 📋 Project Overview

A full-stack task management application built with modern technologies for secure, scalable task organization.

**Tech Stack:**
- ✅ **Frontend:** Next.js 14+ (React, TypeScript, Tailwind CSS)
- ✅ **Backend:** Spring Boot 4.0+ (Java, JWT, Spring Security)
- ✅ **Database:** MySQL 8.0+
- ✅ **Authentication:** JWT (JSON Web Tokens)
- ✅ **Charts:** Recharts
- ✅ **Forms:** React Hook Form

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend                          │
│              (http://localhost:3000)                         │
│  - Login/Register Pages                                      │
│  - User Dashboard with Charts                                │
│  - Admin Dashboard                                           │
│  - Task Management                                           │
│  - User Profile                                              │
└────────────────────┬────────────────────────────────────────┘
                     │ REST API (Axios)
                     │ Authorization: Bearer JWT
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Spring Boot Backend                             │
│              (http://localhost:8080)                         │
│  - JWT Authentication                                        │
│  - Role-based Authorization                                  │
│  - Business Logic                                            │
│  - CORS Configuration                                        │
└────────────────────┬────────────────────────────────────────┘
                     │ JDBC/Hibernate
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  MySQL Database                              │
│              (localhost:3306/mydb)                           │
│  - Users Table                                               │
│  - Tasks Table                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 👥 User Roles & Permissions

### 1️⃣ USER Role
- ✅ Register account
- ✅ Login with credentials
- ✅ Create personal tasks
- ✅ Edit own tasks
- ✅ Delete own tasks
- ✅ View personal dashboard
- ✅ View task statistics
- ✅ Search & filter tasks
- ✅ View profile

### 2️⃣ ADMIN Role
- ✅ All USER permissions
- ✅ View all users
- ✅ Delete users
- ✅ View all tasks in system
- ✅ Access admin dashboard
- ✅ View system statistics

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL (BCrypt hashed),
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('TODO', 'IN_PROGRESS', 'DONE') DEFAULT 'TODO',
  priority ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'LOW',
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔐 Authentication Flow

### Registration
```
1. User fills registration form
2. Frontend validates input
3. POST /api/auth/register
4. Backend hashes password with BCrypt
5. User saved to database
6. JWT token generated
7. Token stored in localStorage
8. User redirected to dashboard
```

### Login
```
1. User enters email & password
2. POST /api/auth/login
3. Backend finds user by email
4. BCrypt compares password with hash
5. If match: JWT token generated
6. Token sent to frontend
7. Token stored in localStorage
8. Added to all future requests (Authorization header)
```

### JWT Token Structure
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "sub": "user@example.com",
  "iat": 1234567890,
  "exp": 1234571490
}

Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

---

## 🛣️ API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
```

### User Tasks
```
GET    /api/tasks            - Get user's tasks
POST   /api/tasks            - Create new task
PUT    /api/tasks/{id}       - Update task
DELETE /api/tasks/{id}       - Delete task
```

### Admin Only
```
GET    /api/admin/users      - Get all users
DELETE /api/admin/users/{id} - Delete user
GET    /api/admin/tasks      - Get all tasks
```

---

## 📱 Frontend Pages

### Public Pages
- **`/`** - Landing page
- **`/login`** - Login page
- **`/register`** - Registration page

### Protected Pages (Authenticated Users)
- **`/dashboard`** - User dashboard with tasks & charts
- **`/profile`** - User profile page
- **`/admin`** - Admin dashboard (ADMIN only)

---

## 🎨 Frontend Features

### Dashboard
- 📊 Task statistics (Total, Completed, In Progress, Pending)
- 📈 Charts (Status distribution, Priority distribution)
- 🔍 Search functionality
- 🏷️ Filter by status & priority
- ➕ Create new tasks
- ✏️ Edit tasks
- 🗑️ Delete tasks

### Admin Panel
- 👥 View all users
- 🗑️ Delete users
- 📋 View all tasks
- 📊 System statistics

### User Profile
- 👤 View profile information
- 🆔 User ID
- 📧 Email address
- 🎯 Role information
- 🔒 Security information

---

## 🔧 Backend Structure

```
com.example.demo/
├── config/
│   ├── CorsConfig.java          - CORS configuration
│   └── SecurityConfig.java      - Spring Security setup
├── controller/
│   ├── AuthController.java      - Auth endpoints
│   ├── TaskController.java      - Task endpoints
│   └── AdminController.java     - Admin endpoints
├── service/
│   ├── AuthService.java         - Auth logic
│   ├── TaskService.java         - Task logic
│   └── UserService.java         - User logic
├── repository/
│   ├── UserRepository.java      - User DB queries
│   └── TaskRepository.java      - Task DB queries
├── model/
│   ├── User.java                - User entity
│   ├── Task.java                - Task entity
│   └── Role.java                - Role enum
├── security/
│   ├── JwtService.java          - JWT generation
│   ├── JwtAuthenticationFilter.java - JWT validation
│   └── CustomUserDetailsService.java - User loading
└── dto/
    ├── AuthRequest.java         - Login/Register DTO
    ├── AuthResponse.java        - Auth response DTO
    └── TaskRequest.java         - Task request DTO
```

---

## 🚀 Running the Application

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Backend Setup
```bash
# Navigate to backend project
cd demo

# Build
mvn clean install

# Run
mvn spring-boot:run
# Backend runs on http://localhost:8080
```

### Frontend Setup
```bash
# Navigate to frontend project
cd smart-task-frontend

# Install dependencies
npm install

# Run development server
npm run dev
# Frontend runs on http://localhost:3000
```

### Database Setup
```bash
# Create database
CREATE DATABASE mydb;

# Create tables (Hibernate auto-creates with spring.jpa.hibernate.ddl-auto=update)
# Or manually run the schema above
```

---

## 🔑 Default Admin Credentials

```
Email: admin@example.com
Password: admin123
```

---

## 📊 Key Features

✅ **Secure Authentication**
- BCrypt password hashing
- JWT token-based auth
- Role-based access control

✅ **Task Management**
- Create, read, update, delete tasks
- Task status tracking (TODO, IN_PROGRESS, DONE)
- Priority levels (LOW, MEDIUM, HIGH)
- Due date management

✅ **Dashboard Analytics**
- Task statistics
- Visual charts (Recharts)
- Task filtering & search
- Real-time updates

✅ **Admin Features**
- User management
- System-wide task view
- User deletion
- Admin dashboard

✅ **User Experience**
- Responsive design (Mobile, Tablet, Desktop)
- Intuitive UI with Tailwind CSS
- Form validation (React Hook Form)
- Toast notifications
- Loading states

---

## 🛡️ Security Features

1. **Password Security**
   - BCrypt hashing (10 rounds)
   - Never stored in plaintext

2. **JWT Security**
   - Signed with secret key
   - Token expiration
   - Sent in Authorization header

3. **Authorization**
   - Role-based access control
   - @PreAuthorize annotations
   - Protected endpoints

4. **CORS**
   - Configured for localhost:3000
   - Prevents unauthorized cross-origin requests

5. **Input Validation**
   - Frontend validation (React Hook Form)
   - Backend validation (Jakarta Validation)
   - SQL injection prevention (Parameterized queries)

---

## 🐛 Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify database credentials in `application.properties`
- Check port 8080 is available

### Frontend won't connect to backend
- Ensure backend is running on port 8080
- Check CORS configuration
- Verify API base URL in `src/services/api.ts`

### Login fails with "Bad credentials"
- Verify user exists in database
- Check password hash is correct
- Ensure BCrypt encoder is configured

### Tasks not loading
- Check user is authenticated
- Verify JWT token is valid
- Check user has tasks in database

---

## 📈 Performance Optimization

- ✅ Lazy loading components
- ✅ Optimized database queries
- ✅ Caching with localStorage
- ✅ Efficient state management
- ✅ Minified production builds

---

## 🔄 Future Enhancements

- 📧 Email verification
- 🔑 Password reset functionality
- 📁 File upload support
- 🔔 Real-time notifications
- 🌙 Dark mode toggle
- 📱 Mobile app (React Native)
- 🐳 Docker containerization
- ☁️ Cloud deployment (AWS, Render, Railway)
- 📊 Advanced analytics
- 🤝 Team collaboration features

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Developer Notes

- Clean code architecture
- Follows SOLID principles
- RESTful API design
- Component-based frontend
- Scalable backend structure
- Production-ready code

Perfect for portfolio, learning, or production use!
