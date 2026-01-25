@echo off
echo ========================================
echo    CHUYEN DOI SANG MYSQL
echo ========================================
echo.

REM Step 1: Stop old containers
echo [1/5] Dung containers cu...
docker-compose down -v
echo Da dung PostgreSQL
echo.

REM Step 2: Start MySQL
echo [2/5] Khoi dong MySQL...
docker-compose up -d
echo Cho MySQL khoi dong (15 giay)...
timeout /t 15 /nobreak >nul
echo MySQL da san sang
echo.

REM Step 3: Check MySQL status
echo [3/5] Kiem tra MySQL...
docker-compose ps
echo.

REM Step 4: Setup database
echo [4/5] Tao database schema...
cd backend
call npx prisma migrate dev --name init_mysql
echo Database schema da tao
echo.

REM Step 5: Generate Prisma Client
echo [5/5] Generate Prisma Client...
call npx prisma generate
echo Prisma Client da generate
echo.

REM Done
echo ========================================
echo    HOAN THANH!
echo ========================================
echo.
echo Thong tin:
echo   - MySQL: http://localhost:3306
echo   - phpMyAdmin: http://localhost:8080
echo   - User: tm_user
echo   - Pass: tm_password
echo.
echo Khoi dong backend:
echo   cd backend
echo   npm run dev
echo.
pause
