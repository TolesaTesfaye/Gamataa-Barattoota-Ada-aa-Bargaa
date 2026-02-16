# Smart Task Management System - Architecture Overview

## 🏗️ System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER (Browser)                          │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Next.js Frontend (Port 3000)                  │  │
│  │                                                                  │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │  │
│  │  │   Login     │  │  Dashboard  │  │    Admin    │             │  │
│  │  │   Register  │  │   Profile   │  │   Panel     │             │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘             │  │
│  │                                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────┐  │  │
│  │  │              React Components & Context                 │  │  │
│  │  │  - Navbar  - TaskForm  - TaskList  - Chart             │  │  │
│  │  │  - AuthContext (User State Management)                 │  │  │
│  │  └──────────────────────────────────────────────────────────┘  │  │
│  │                                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────┐  │  │
│  │  │              Services (API Calls)                        │  │  │
│  │  │  - api.ts (Axios with JWT interceptor)                 │  │  │
│  │  │  - auth.ts (Login/Register)                            │  │  │
│  │  │  - tasks.ts (CRUD operations)                          │  │  │
│  │  └──────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│                    ↓ REST API (JSON + JWT Token)                        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER (Server)                         │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │              Spring Boot Backend (Port 8080)                     │  │
│  │                                                                  │  │
│  │  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │                    Controllers                          │   │  │
│  │  │  - AuthController (/api/auth/*)                        │   │  │
│  │  │  - TaskController (/api/tasks/*)                       │   │  │
│  │  │  - AdminController (/api/admin/*)                      │   │  │
│  │  └─────────────────────────────────────────────────────────┘   │  │
│  │                           ↓                                     │  │
│  │  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │                    Services                             │   │  │
│  │  │  - AuthService (Register, Login, JWT)                  │   │  │
│  │  │  - TaskService (CRUD, User Tasks)                      │   │  │
│  │  │  - UserService (Admin operations)                      │   │  │
│  │  └─────────────────────────────────────────────────────────┘   │  │
│  │                           ↓                                     │  │
│  │  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │                  Repositories                           │   │  │
│  │  │  - UserRepository (JPA)                                │   │  │
│  │  │  - TaskRepository (JPA)                                │   │  │
│  │  └─────────────────────────────────────────────────────────┘   │  │
│  │                                                                  │  │
│  │  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │              Security & Configuration                  │   │  │
│  │  │  - SecurityConfig (Spring Security)                    │   │  │
│  │  │  - JwtService (Token generation)                       │   │  │
│  │  │  - JwtAuthenticationFilter (Token validation)          │   │  │
│  │  │  - CustomUserDetailsService (User loading)            │   │  │
│  │  │  - CorsConfig (Cross-origin requests)                 │   │  │
│  │  │  - PasswordEncoder (BCrypt)                            │   │  │
│  │  └─────────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│                    ↓ JDBC/Hibernate (SQL Queries)                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                      DATA LAYER (Database)                              │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                  MySQL Database (Port 3306)                      │  │
│  │                                                                  │  │
│  │  ┌──────────────────────┐      ┌──────────────────────┐        │  │
│  │  │    USERS TABLE       │      │    TASKS TABLE       │        │  │
│  │  ├──────────────────────┤      ├──────────────────────┤        │  │
│  │  │ id (PK)              │      │ id (PK)              │        │  │
│  │  │ name                 │      │ title                │        │  │
│  │  │ email (UNIQUE)       │      │ description          │        │  │
│  │  │ password (BCrypt)    │      │ status (TODO/...)    │        │  │
│  │  │ role (USER/ADMIN)    │      │ priority (LOW/...)   │        │  │
│  │  │ created_at           │      │ user_id (FK) ────────┼────┐   │  │
│  │  └──────────────────────┘      │ created_at           │    │   │  │
│  │                                │ due_date             │    │   │  │
│  │                                └──────────────────────┘    │   │  │
│  │                                                            │   │  │
│  │                                    ┌─────────────────────┘   │  │
│  │                                    │ Foreign Key Relationship│  │
│  │                                    ↓                        │  │
│  │                            One User → Many Tasks           │  │
│  │                            (Cascade Delete)                │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                          │
└─────────────────────────────────────────────────────────────────┘

1. REGISTRATION
   ┌──────────────┐
   │ User enters  │
   │ credentials  │
   └──────┬───────┘
          │
          ↓
   ┌──────────────────────────┐
   │ Frontend validates input │
   │ (React Hook Form)        │
   └──────┬───────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ POST /api/auth/register              │
   │ {name, email, password}              │
   └──────┬───────────────────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ Backend receives request             │
   │ Validates input                      │
   └──────┬───────────────────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ Hash password with BCrypt            │
   │ (10 rounds)                          │
   └──────┬───────────────────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ Save user to database                │
   │ role = USER (default)                │
   └──────┬───────────────────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ Generate JWT token                   │
   │ (Header.Payload.Signature)           │
   └──────┬───────────────────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ Return token to frontend             │
   │ {token, userId, name, email, role}   │
   └──────┬───────────────────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ Frontend stores token in localStorage│
   │ Redirect to dashboard                │
   └──────────────────────────────────────┘

2. LOGIN
   ┌──────────────┐
   │ User enters  │
   │ email & pwd  │
   └──────┬───────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ POST /api/auth/login                 │
   │ {email, password}                    │
   └──────┬───────────────────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ Find user by email in database       │
   └──────┬───────────────────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ Compare password with stored hash    │
   │ using BCrypt.matches()               │
   └──────┬───────────────────────────────┘
          │
          ├─ Match ──→ Generate JWT token
          │
          └─ No Match ──→ Return "Bad credentials"
                         ↓
                    Frontend shows error

3. AUTHENTICATED REQUESTS
   ┌──────────────────────────────────────┐
   │ Frontend makes API request           │
   │ Authorization: Bearer {token}        │
   └──────┬───────────────────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ JwtAuthenticationFilter intercepts   │
   │ Extracts token from header           │
   └──────┬───────────────────────────────┘
          │
          ↓
   ┌──────────────────────────────────────┐
   │ JwtService validates token           │
   │ - Signature check                    │
   │ - Expiration check                   │
   └──────┬───────────────────────────────┘
          │
          ├─ Valid ──→ Extract user info
          │           ↓
          │           Load user from database
          │           ↓
          │           Set SecurityContext
          │           ↓
          │           Process request
          │
          └─ Invalid ──→ Return 401 Unauthorized
```

---

## 🔄 Request/Response Cycle

```
┌─────────────────────────────────────────────────────────────────┐
│                  REQUEST/RESPONSE CYCLE                         │
└─────────────────────────────────────────────────────────────────┘

FRONTEND                          BACKEND                    DATABASE
   │                                 │                           │
   │  1. User Action                 │                           │
   │  (Create Task)                  │                           │
   │                                 │                           │
   ├─ 2. Validate Input ─────────────┤                           │
   │  (React Hook Form)              │                           │
   │                                 │                           │
   ├─ 3. API Call ──────────────────→│                           │
   │  POST /api/tasks                │                           │
   │  {title, description, ...}      │                           │
   │  Authorization: Bearer {token}  │                           │
   │                                 │                           │
   │                                 ├─ 4. Validate Token ──────┤
   │                                 │  (JwtAuthenticationFilter)│
   │                                 │                           │
   │                                 ├─ 5. Check Authorization ─┤
   │                                 │  (Role-based)             │
   │                                 │                           │
   │                                 ├─ 6. Validate Input ──────┤
   │                                 │  (Jakarta Validation)     │
   │                                 │                           │
   │                                 ├─ 7. Business Logic ──────┤
   │                                 │  (TaskService)            │
   │                                 │                           │
   │                                 ├─ 8. Database Query ─────→│
   │                                 │  INSERT INTO tasks        │
   │                                 │                           │
   │                                 │←─ 9. Query Result ────────┤
   │                                 │  (Task ID, created_at)    │
   │                                 │                           │
   │←─ 10. Response ────────────────┤                           │
   │  200 OK                         │                           │
   │  {id, title, description, ...}  │                           │
   │                                 │                           │
   ├─ 11. Update UI ────────────────┤                           │
   │  Add task to list               │                           │
   │  Show success notification      │                           │
   │                                 │                           │
   └─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                              │
└─────────────────────────────────────────────────────────────────┘

Layer 1: FRONTEND VALIDATION
├─ Input validation (React Hook Form)
├─ Type checking (TypeScript)
├─ HTTPS enforcement
└─ XSS prevention

Layer 2: TRANSPORT SECURITY
├─ HTTPS/TLS encryption
├─ JWT in Authorization header
├─ CORS validation
└─ No sensitive data in URL

Layer 3: AUTHENTICATION
├─ BCrypt password hashing (10 rounds)
├─ JWT token generation
├─ Token signature verification
├─ Token expiration
└─ Secure token storage

Layer 4: AUTHORIZATION
├─ Role-based access control
├─ @PreAuthorize annotations
├─ Method-level security
└─ Resource-level security

Layer 5: BACKEND VALIDATION
├─ Input validation (Jakarta Validation)
├─ SQL injection prevention (Parameterized queries)
├─ Business logic validation
└─ Error handling

Layer 6: DATABASE SECURITY
├─ Encrypted passwords
├─ Foreign key constraints
├─ Unique constraints
└─ Cascade delete rules
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATA FLOW                                  │
└─────────────────────────────────────────────────────────────────┘

USER REGISTRATION
User Input
    ↓
Frontend Validation
    ↓
API Call (POST /api/auth/register)
    ↓
Backend Validation
    ↓
Password Hashing (BCrypt)
    ↓
Database Insert
    ↓
JWT Generation
    ↓
Response to Frontend
    ↓
Store Token (localStorage)
    ↓
Redirect to Dashboard

TASK CREATION
User Input
    ↓
Frontend Validation
    ↓
API Call (POST /api/tasks)
    ↓
JWT Validation
    ↓
Authorization Check
    ↓
Backend Validation
    ↓
Business Logic
    ↓
Database Insert
    ↓
Response to Frontend
    ↓
Update UI
    ↓
Show Success Message

TASK RETRIEVAL
User Navigates to Dashboard
    ↓
Frontend Loads
    ↓
API Call (GET /api/tasks)
    ↓
JWT Validation
    ↓
Authorization Check
    ↓
Database Query
    ↓
Response to Frontend
    ↓
Render Task List
    ↓
Display Statistics
    ↓
Show Charts
```

---

## 🔗 Component Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                  COMPONENT RELATIONSHIPS                        │
└─────────────────────────────────────────────────────────────────┘

AuthContext (Global State)
    ├─ user (User object)
    ├─ token (JWT token)
    ├─ login() (Function)
    ├─ register() (Function)
    ├─ logout() (Function)
    └─ isLoading (Boolean)

Navbar Component
    ├─ Uses: AuthContext
    ├─ Shows: User info, Navigation links
    ├─ Actions: Logout, Navigate
    └─ Responsive: Mobile menu

Dashboard Page
    ├─ Uses: AuthContext, TaskService
    ├─ Components: TaskForm, TaskList, Chart
    ├─ State: tasks, filteredTasks, searchQuery
    ├─ Features: Search, Filter, Create, Edit, Delete
    └─ Charts: Status distribution, Priority distribution

Admin Page
    ├─ Uses: AuthContext, TaskService
    ├─ Components: User table, Task list
    ├─ Features: View users, Delete users, View tasks
    └─ Authorization: ADMIN only

Profile Page
    ├─ Uses: AuthContext
    ├─ Shows: User information
    ├─ Displays: ID, Name, Email, Role
    └─ Read-only

TaskForm Component
    ├─ Uses: React Hook Form, TaskService
    ├─ Props: task (optional), onSuccess, onCancel
    ├─ Features: Create/Edit task
    └─ Validation: Title required, etc.

TaskList Component
    ├─ Props: tasks, onEdit, onDelete, showUser
    ├─ Features: Display tasks, Edit, Delete
    └─ Styling: Status badges, Priority colors

Chart Component
    ├─ Uses: Recharts
    ├─ Props: data, colors, title
    └─ Type: Pie chart
```

---

## 🎯 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                  DEPLOYMENT ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────┘

PRODUCTION ENVIRONMENT

┌─────────────────────────────────────────────────────────────────┐
│                        CDN / Load Balancer                      │
└─────────────────────────────────────────────────────────────────┘
                    ↓                           ↓
        ┌───────────────────┐      ┌───────────────────┐
        │  Frontend Server  │      │  Backend Server   │
        │  (Vercel/Netlify) │      │  (Render/Railway) │
        │  - Next.js Build  │      │  - Spring Boot    │
        │  - Static Files   │      │  - API Endpoints  │
        │  - SSL/TLS        │      │  - SSL/TLS        │
        └───────────────────┘      └───────────────────┘
                    ↓                           ↓
        ┌───────────────────────────────────────────┐
        │      Database Server (Cloud MySQL)       │
        │      - Automated backups                 │
        │      - Replication                       │
        │      - SSL/TLS encryption                │
        └───────────────────────────────────────────┘
```

---

This architecture provides a **scalable, secure, and maintainable** solution for task management! 🚀
