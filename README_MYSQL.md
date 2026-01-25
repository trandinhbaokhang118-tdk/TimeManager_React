# 🚀 TIME MANAGER - MYSQL VERSION

## ⚡ Khởi động nhanh

### Cách 1: Script tự động (Khuyên dùng)
```bash
start-app.bat
```

### Cách 2: Thủ công
```bash
# Terminal 1: MySQL
docker-compose up -d

# Terminal 2: Backend
cd backend
npm run dev

# Terminal 3: Frontend
cd frontend
npm run dev
```

---

## 🌐 Truy cập

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **phpMyAdmin**: http://localhost:8080
  - User: `tm_user`
  - Pass: `tm_password`

---

## 📊 Database Info

```
Host: localhost
Port: 3306
Database: time_manager
User: tm_user
Password: tm_password
```

---

## 🛑 Dừng ứng dụng

```bash
stop-app.bat
```

Hoặc:
```bash
docker-compose down
```

---

## 🔄 Reset Database

```bash
cd backend
npx prisma migrate reset
```

---

## 📚 Documentation

- **Setup Complete**: `MYSQL_SETUP_COMPLETE.md`
- **Quick Start**: `QUICK_START_MYSQL.md`
- **Migration Guide**: `MYSQL_MIGRATION_GUIDE.md`
- **Chatbot Guide**: `AI_CHATBOT_GUIDE.md`

---

## ✨ Features

- ✅ User Authentication (JWT)
- ✅ Task Management (CRUD)
- ✅ Tags & Categories
- ✅ Time Blocks
- ✅ Reminders & Notifications
- ✅ Dashboard & Analytics
- ✅ Calendar View
- ✅ Focus Mode (Pomodoro)
- ✅ AI Chatbot Assistant
- ✅ Admin Panel
- ✅ Dark/Light Mode
- ✅ Responsive Design

---

## 🎨 Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- TailwindCSS
- Zustand (State)
- React Query
- React Router

### Backend
- NestJS
- Prisma ORM
- MySQL 8.0
- JWT Auth
- OpenAI API

### DevOps
- Docker
- Docker Compose
- phpMyAdmin

---

## 🔧 Troubleshooting

### Port đã được sử dụng
```bash
# Đổi port trong docker-compose.yml
ports:
  - "3307:3306"  # MySQL
  - "8081:80"    # phpMyAdmin
```

### Backend không kết nối được MySQL
```bash
# Kiểm tra MySQL đang chạy
docker-compose ps

# Restart MySQL
docker-compose restart mysql
```

### Lỗi Prisma
```bash
cd backend
npx prisma generate
```

---

## 📝 Scripts

- `start-app.bat` - Khởi động tất cả
- `stop-app.bat` - Dừng tất cả
- `migrate-to-mysql.bat` - Migration từ PostgreSQL
- `fix-prisma.bat` - Fix Prisma issues

---

## 🎯 Default Accounts

### Admin (Tạo sau khi chạy seed)
```
Email: admin@timemanager.com
Password: admin123
```

### Test User
```
Email: user@test.com
Password: test123
```

---

## 🔐 Security Notes

### Development
- ✅ Simple passwords OK
- ✅ Expose ports OK
- ✅ phpMyAdmin enabled

### Production
- ❌ Change all passwords
- ❌ Don't expose MySQL port
- ❌ Disable phpMyAdmin
- ❌ Use environment variables
- ❌ Enable SSL/TLS

---

## 📈 Performance

### MySQL Optimization
```yaml
# docker-compose.yml
mysql:
  command: >
    --max_connections=200
    --innodb_buffer_pool_size=512M
```

### Prisma Connection Pool
```typescript
// Already configured in schema.prisma
```

---

## 🆘 Support

### Logs
```bash
# MySQL logs
docker-compose logs mysql

# Backend logs
cd backend && npm run dev

# Frontend logs
cd frontend && npm run dev
```

### Reset Everything
```bash
docker-compose down -v
docker-compose up -d
cd backend
npx prisma migrate dev --name init_mysql
npm run dev
```

---

## 🎉 Success!

Bạn đã setup thành công Time Manager với MySQL!

**Enjoy coding!** 🚀

---

**Version**: 2.0.0 (MySQL)  
**Date**: January 23, 2026  
**Status**: ✅ Production Ready
