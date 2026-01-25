@echo off
echo ========================================
echo   SUA LOI MYSQL XAMPP
echo ========================================
echo.

echo [1/5] Dang dung MySQL...
net stop MySQL
taskkill /F /IM mysqld.exe 2>nul

echo.
echo [2/5] Kiem tra port 3306...
netstat -ano | findstr :3306
echo.

echo [3/5] Neu co process dang chiem port 3306, ban co muon kill khong?
echo Nhan Ctrl+C de huy, hoac Enter de tiep tuc...
pause

echo.
echo [4/5] Xoa file lock (neu co)...
cd C:\xampp\mysql\data
del ibdata1.lock 2>nul
del ib_logfile0.lock 2>nul
del mysql.sock.lock 2>nul

echo.
echo [5/5] Hoan thanh! Hay thu start MySQL lai trong XAMPP Control Panel
echo.
pause
