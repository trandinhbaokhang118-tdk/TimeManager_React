@echo off
echo Fixing Prisma Client...
cd backend
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
rmdir /s /q node_modules\.prisma 2>nul
npx prisma generate
echo Done!
pause
