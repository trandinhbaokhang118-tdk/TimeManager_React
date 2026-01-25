# 🚀 BẮT ĐẦU VỚI MYSQL

## ⚡ Chạy ngay trong 3 bước

### Bước 1: Chạy script tự động
```bash
# Windows
migrate-to-mysql.bat

# Linux/Mac
chmod +x migrate-to-mysql.sh
./migrate-to-mysql.sh
```

### Bước 2: Khởi động backend
```bash
cd backend
npm run dev
```

### Bước 3: Khởi động frontend
```bash
cd frontend
npm run dev
```

## ✅ Xong! Truy cập:

- 🌐 **Frontend**: http://localhost:5173
- 🔧 **Backend API**: http://localhost:3000
- 🗄️ **phpMyAdmin**: http://localhost:8080
  - User: `tm_user`
  - Pass: `tm_password`

---

## 📚 Tài liệu

- **Quick Start**: `QUICK_START_MYSQL.md`
- **Chi tiết**: `MYSQL_MIGRATION_GUIDE.md`
- **Hoàn thành**: `MYSQL_MIGRATION_COMPLETE.md`

---

## 🆘 Cần giúp?

```bash
# Xem logs MySQL
docker-compose logs mysql

# Xem logs backend
cd backend && npm run dev

# Reset database
cd backend && npx prisma migrate reset
```

---

**Chúc bạn thành công!** 🎉
