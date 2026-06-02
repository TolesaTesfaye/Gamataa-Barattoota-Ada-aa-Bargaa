# Quick Start Guide - Smart Task Management System

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Java 17+ installed
- Node.js 18+ installed
- MySQL 8.0+ running
- Git installed

---

## 1️⃣ Backend Setup (Spring Boot)

### Step 1: Navigate to Backend
```bash
cd demo
```

### Step 2: Configure Database
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=your_password
```

### Step 3: Build & Run
```bash
# Build
mvn clean install

# Run
mvn spring-boot:run
```

✅ Backend running on `http://localhost:8080`

---

## 2️⃣ Frontend Setup (Next.js)

### Step 1: Navigate to Frontend
```bash
cd smart-task-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

✅ Frontend running on `http://localhost:3000`

---

## 3️⃣ Database Setup (MySQL)

### Step 1: Create Database
```bash
mysql -u root -p
```

### Step 2: Create Database
```sql
CREATE DATABASE mydb;
USE mydb;
```

### Step 3: Tables Auto-Created
Spring Boot will automatically create tables on startup.

Or manually create:
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

## 4️⃣ Create Admin User

### Option 1: Via SQL
```sql
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$2a$10$WICpu33wA9rWkPIRnG0YquYMu98o0XNgXpjxxF/wVJsL90v2oHdG.', 'ADMIN');
```

### Option 2: Via Registration
1. Go to `http://localhost:3000/register`
2. Register a user
3. Update role in database:
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
```

---

## 5️⃣ Login & Test

### Admin Login
```
Email: admin@example.com
Password: admin123
```

### User Registration
1. Go to `http://localhost:3000/register`
2. Fill in details
3. Click "Create Account"
4. Automatically logged in

---

## 📱 Test the Application

### User Features
1. ✅ Login to dashboard
2. ✅ Create a task
3. ✅ Edit task
4. ✅ Delete task
5. ✅ View statistics
6. ✅ Search tasks
7. ✅ Filter by status/priority
8. ✅ View profile

### Admin Features
1. ✅ Login as admin
2. ✅ Go to Admin Panel
3. ✅ View all users
4. ✅ View all tasks
5. ✅ Delete users

---

## 🔗 Important URLs

| Page | URL | Access |
|------|-----|--------|
| Landing | http://localhost:3000 | Public |
| Login | http://localhost:3000/login | Public |
| Register | http://localhost:3000/register | Public |
| Dashboard | http://localhost:3000/dashboard | Authenticated |
| Profile | http://localhost:3000/profile | Authenticated |
| Admin | http://localhost:3000/admin | Admin Only |

---

## 🛠️ Troubleshooting

### Backend won't start
```bash
# Check if port 8080 is in use
lsof -i :8080

# Kill process if needed
kill -9 <PID>

# Check MySQL connection
mysql -u root -p -e "SELECT 1"
```

### Frontend won't connect
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run dev
```

### Database issues
```bash
# Check MySQL is running
mysql -u root -p -e "SHOW DATABASES;"

# Recreate database
DROP DATABASE mydb;
CREATE DATABASE mydb;
```

---

## 📊 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Tasks
```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
```

### Admin
```
GET    /api/admin/users
DELETE /api/admin/users/{id}
GET    /api/admin/tasks
```

---

## 🎯 Next Steps

1. ✅ Explore the dashboard
2. ✅ Create and manage tasks
3. ✅ Test admin features
4. ✅ Review code structure
5. ✅ Deploy to production

---

## 📚 Documentation

- `SYSTEM_DOCUMENTATION.md` - Complete system overview
- `FEATURES_CHECKLIST.md` - All implemented features
- `README.md` - Project information

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend (Render/Railway)
```bash
# Push to GitHub
git push origin main
# Connect to Render/Railway
```

---

## 💡 Tips

- Use Chrome DevTools for debugging
- Check browser console for errors
- Check backend logs for API issues
- Use Postman to test API endpoints
- Enable dark mode in browser for better UX

---

## ✅ You're All Set!

Your Smart Task Management System is ready to use. Enjoy! 🎉

For questions or issues, check the documentation files.
