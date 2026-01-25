# TimeManager - Tài liệu Dự án Tổng hợp

## 📋 Mục lục

1. [Tổng quan dự án](#tổng-quan-dự-án)
2. [Công nghệ sử dụng](#công-nghệ-sử-dụng)
3. [Cấu trúc dự án](#cấu-trúc-dự-án)
4. [Tính năng](#tính-năng)
5. [Cài đặt & Chạy](#cài-đặt--chạy)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Deployment](#deployment)

---

## 🎯 Tổng quan dự án

**TimeManager** là ứng dụng quản lý thời gian và công việc toàn diện, giúp người dùng tổ chức công việc hiệu quả với giao diện đẹp mắt và nhiều tính năng mạnh mẽ.

### Thông tin cơ bản

- **Tên dự án:** TimeManager
- **Version:** 1.0.0
- **Mô tả:** Ứng dụng quản lý thời gian và năng suất
- **License:** MIT
- **Repository:** [GitHub Link]

### Mục tiêu

- Giúp người dùng quản lý công việc hiệu quả
- Tăng năng suất làm việc với Pomodoro
- Lập kế hoạch dài hạn với Timeline
- Theo dõi tiến độ với Analytics
- Quản lý hệ thống với Admin Panel

---

## 🛠 Công nghệ sử dụng

### Frontend

**Core:**
- React 18.3.1
- TypeScript 5.6.2
- Vite 6.0.1

**UI & Styling:**
- TailwindCSS 3.4.17
- Lucide React (Icons)
- Custom CSS Variables (Galaxy Theme)

**State Management:**
- Zustand (Auth Store)
- TanStack Query (React Query) 5.62.11

**Routing:**
- React Router DOM 7.1.1

**Forms & Validation:**
- React Hook Form 7.54.2
- Zod 3.24.1

**Drag & Drop:**
- @dnd-kit/core 6.3.1
- @dnd-kit/sortable 9.0.0

**HTTP Client:**
- Axios 1.7.9

### Backend

**Core:**
- NestJS 10.4.15
- TypeScript 5.7.2
- Node.js (Latest LTS)

**Database:**
- MySQL 8.0
- Prisma ORM 6.2.1
- phpMyAdmin (Database Management Tool)

**Authentication:**
- JWT (jsonwebtoken)
- Argon2 (Password hashing)
- Passport JWT

**Validation:**
- class-validator
- class-transformer

**API Documentation:**
- Swagger/OpenAPI

**Scheduling:**
- @nestjs/schedule
- node-cron

**OAuth:**
- Google OAuth 2.0
- Facebook OAuth 2.0

**SMS:**
- Twilio (Optional)

### DevOps

**Containerization:**
- Docker
- Docker Compose

**Database Tools:**
- Prisma Studio
- phpMyAdmin (http://localhost:8080)

**Version Control:**
- Git
- GitHub

---

## 📁 Cấu trúc dự án

```
time-manager/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── app/             # App configuration
│   │   │   ├── queryClient.ts
│   │   │   └── router.tsx
│   │   ├── components/      # React components
│   │   │   ├── admin/       # Admin components
│   │   │   ├── auth/        # Auth components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── planner/     # Planner components
│   │   │   └── ui/          # UI components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilities
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin pages
│   │   │   ├── Analytics.tsx
│   │   │   ├── Calendar.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Focus.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Planner.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── Tasks.tsx
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   ├── types/           # TypeScript types
│   │   ├── index.css        # Global styles
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                  # NestJS Backend
│   ├── src/
│   │   ├── admin/           # Admin module
│   │   ├── auth/            # Authentication
│   │   │   ├── decorators/
│   │   │   ├── dto/
│   │   │   ├── guards/
│   │   │   └── strategies/
│   │   ├── common/          # Common utilities
│   │   │   ├── filters/
│   │   │   └── interceptors/
│   │   ├── dashboard/       # Dashboard module
│   │   ├── health/          # Health check
│   │   ├── notifications/   # Notifications
│   │   ├── prisma/          # Prisma service
│   │   ├── reminders/       # Reminders
│   │   ├── scheduler/       # Cron jobs
│   │   ├── tags/            # Tags module
│   │   ├── tasks/           # Tasks module
│   │   ├── time-blocks/     # Time blocks
│   │   ├── users/           # Users module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   ├── migrations/      # Database migrations
│   │   └── schema.prisma    # Database schema
│   ├── uploads/             # File uploads
│   ├── .env                 # Environment variables
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                     # Documentation
│   ├── ADMIN_GUIDE.md
│   ├── OAUTH_SETUP.md
│   ├── PLANNER_GUIDE.md
│   └── SOCIAL_LOGIN_GUIDE.md
│
├── docker-compose.yml        # Docker configuration
├── README.md
└── PROJECT_OVERVIEW.md       # This file
```

Xem chi tiết trong các file:
- `ARCHITECTURE.md` - Kiến trúc hệ thống
- `FEATURES.md` - Danh sách tính năng
- `API_DOCUMENTATION.md` - API endpoints
- `DATABASE_SCHEMA.md` - Cấu trúc database


---

## 🔄 Database Migration: PostgreSQL → MySQL

### Lý do chuyển đổi

Dự án đã chuyển từ **PostgreSQL** sang **MySQL 8.0** vì:
- ✅ Phổ biến và dễ triển khai hơn
- ✅ Hiệu năng tốt cho ứng dụng web
- ✅ phpMyAdmin - công cụ quản lý trực quan
- ✅ Tương thích tốt với hosting providers
- ✅ Community support lớn

### Thông tin MySQL

**Database Configuration:**
```env
DATABASE_URL="mysql://tm_user:tm_password@localhost:3306/time_manager"
```

**Docker Services:**
- MySQL 8.0: `localhost:3306`
- phpMyAdmin: `http://localhost:8080`

**Credentials:**
- User: `tm_user`
- Password: `tm_password`
- Database: `time_manager`

### Prisma Schema

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### Migration Commands

```bash
# Chạy migrations
cd backend
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Reset database (nếu cần)
npx prisma migrate reset
```

### phpMyAdmin Access

1. Mở trình duyệt: `http://localhost:8080`
2. Đăng nhập:
   - Server: `mysql`
   - Username: `tm_user`
   - Password: `tm_password`
3. Chọn database: `time_manager`

### Database Tables

Dự án sử dụng 9 tables chính:
1. `User` - Thông tin người dùng
2. `Task` - Công việc
3. `Tag` - Nhãn phân loại
4. `TaskTag` - Quan hệ Task-Tag
5. `TimeBlock` - Khối thời gian
6. `Reminder` - Nhắc nhở
7. `Notification` - Thông báo
8. `ActivityLog` - Lịch sử hoạt động
9. `_prisma_migrations` - Lịch sử migrations

### Cleanup PostgreSQL

PostgreSQL đã được gỡ bỏ hoàn toàn:
```bash
# Containers đã xóa
docker rm time_manager_postgres
docker rm time_manager_pgadmin

# Volumes đã xóa
docker volume rm time-manager_tm_pgdata

# Ports đã giải phóng
# 5432 (PostgreSQL)
# 5050 (pgAdmin)
```

### Scripts hữu ích

**Khởi động MySQL:**
```bash
docker-compose up -d mysql phpmyadmin
```

**Kiểm tra MySQL:**
```bash
docker-compose exec mysql mysql -u tm_user -ptm_password -e "SHOW DATABASES;"
```

**Backup Database:**
```bash
docker-compose exec mysql mysqldump -u tm_user -ptm_password time_manager > backup.sql
```

**Restore Database:**
```bash
docker-compose exec -T mysql mysql -u tm_user -ptm_password time_manager < backup.sql
```

### Tài liệu liên quan

- `MYSQL_MIGRATION_GUIDE.md` - Hướng dẫn chi tiết migration
- `MYSQL_SETUP_COMPLETE.md` - Kết quả setup
- `QUICK_START_MYSQL.md` - Quick start guide
- `POSTGRESQL_CLEANUP.md` - Cleanup PostgreSQL

---

## 📝 Ghi chú quan trọng

### Environment Variables

**Backend (.env):**
```env
# Database (MySQL)
DATABASE_URL="mysql://tm_user:tm_password@localhost:3306/time_manager"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:5173"

# OpenAI API (for AI Chatbot - Optional)
OPENAI_API_KEY="sk-or-v1-your-api-key-here"
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3000
```

### Docker Services

```yaml
services:
  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    
  phpmyadmin:
    image: phpmyadmin:latest
    ports:
      - "8080:80"
```

### Health Checks

**MySQL:**
```bash
docker-compose exec mysql mysqladmin ping -h localhost -u tm_user -ptm_password
```

**Backend API:**
```bash
curl http://localhost:3000/health
```

**Frontend:**
```bash
curl http://localhost:5173
```

---

## 🎯 Tổng kết

TimeManager hiện đang sử dụng:
- ✅ **MySQL 8.0** - Database chính
- ✅ **phpMyAdmin** - Database management
- ✅ **Prisma ORM** - Database toolkit
- ✅ **Docker Compose** - Container orchestration

Dự án đã loại bỏ hoàn toàn PostgreSQL và chuyển sang MySQL để tối ưu hiệu suất và dễ dàng triển khai.
