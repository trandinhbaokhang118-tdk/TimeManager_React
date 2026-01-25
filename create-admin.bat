@echo off
echo ========================================
echo    TAO TAI KHOAN ADMIN CHINH THUC
echo ========================================
echo.
cd backend
call npx ts-node scripts/create-admin.ts
echo.
pause
