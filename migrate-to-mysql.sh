#!/bin/bash

echo "🔄 CHUYỂN ĐỔI SANG MYSQL"
echo "========================"
echo ""

# Step 1: Stop old containers
echo "📦 Bước 1: Dừng containers cũ..."
docker-compose down -v
echo "✅ Đã dừng PostgreSQL"
echo ""

# Step 2: Start MySQL
echo "🚀 Bước 2: Khởi động MySQL..."
docker-compose up -d
echo "⏳ Chờ MySQL khởi động (15 giây)..."
sleep 15
echo "✅ MySQL đã sẵn sàng"
echo ""

# Step 3: Check MySQL status
echo "🔍 Bước 3: Kiểm tra MySQL..."
docker-compose ps
echo ""

# Step 4: Setup database
echo "🗄️ Bước 4: Tạo database schema..."
cd backend
npx prisma migrate dev --name init_mysql
echo "✅ Database schema đã tạo"
echo ""

# Step 5: Generate Prisma Client
echo "⚙️ Bước 5: Generate Prisma Client..."
npx prisma generate
echo "✅ Prisma Client đã generate"
echo ""

# Done
echo "🎉 HOÀN THÀNH!"
echo "=============="
echo ""
echo "📊 Thông tin:"
echo "  - MySQL: http://localhost:3306"
echo "  - phpMyAdmin: http://localhost:8080"
echo "  - User: tm_user"
echo "  - Pass: tm_password"
echo ""
echo "🚀 Khởi động backend:"
echo "  cd backend && npm run dev"
echo ""
