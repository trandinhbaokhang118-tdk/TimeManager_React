@echo off
echo ========================================
echo    TIME MANAGER - DUNG
echo ========================================
echo.

echo Dung Backend va Frontend...
taskkill /F /IM node.exe 2>nul
echo Node processes: Stopped
echo.

echo Dung Docker containers...
docker-compose stop
echo Docker: Stopped
echo.

echo ========================================
echo    DA DUNG TAT CA!
echo ========================================
pause
