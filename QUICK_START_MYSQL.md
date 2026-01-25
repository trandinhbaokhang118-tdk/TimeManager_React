# ⚡ QUICK START - MYSQL

## 🚀 Chạy ngay trong 3 bước

### 1️⃣ Khởi động MySQL
```bash
docker-compose up -d
```
Chờ 10 giây...

### 2️⃣ Setup Database
```bash
cd backend
npx prisma migrate dev --name init_mysql
npx prisma generate
```

### 3️⃣ Chạy Backend
```bash
npm run dev
```

## ✅ Xong!

- 🗄️ MySQL: http://localhost:3306
- 🎨 phpMyAdmin: http://localhost:8080
- 🚀 Backend API: http://localhost:3000
- 💻 Frontend: http://localhost:5173

## 🔑 Login phpMyAdmin

```
URL: http://localhost:8080
User: tm_user
Pass: tm_password
```

## 🐛 Có lỗi?

```bash
# Reset tất cả
docker-compose down -v
docker-compose up -d
cd backend
npx prisma migrate reset
npm run dev
```

---

**Thế thôi!** 🎉
