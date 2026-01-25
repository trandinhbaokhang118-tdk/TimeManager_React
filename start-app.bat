@echo off
echo ========================================
echo    TIME MANAGER - KHOI DONG
echo ========================================
echo.

REM Check Docker
echo [1/4] Kiem tra Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker chua cai dat!
    pause
    exit /b 1
)
echo Docker: OK
echo.

REM Start MySQL
echo [2/4] Khoi dong MySQL...
docker-compose up -d mysql phpmyadmin
timeout /t 5 /nobreak >nul
echo MySQL: OK
echo.

REM Start Backend
echo [3/4] Khoi dong Backend...
start "Backend API" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
echo Backend: Starting...
echo.

REM Start Frontend
echo [4/4] Khoi dong Frontend...
start "Frontend App" cmd /k "cd frontend && npm run dev"
echo Frontend: Starting...
echo.

echo ========================================
echo    HOAN THANH!
echo ========================================
echo.
echo Truy cap:
echo   Frontend:   http://localhost:5173
echo   Backend:    http://localhost:3000
echo   phpMyAdmin: http://localhost:8080
echo.
echo Dang nhap phpMyAdmin:
echo   User: tm_user
echo   Pass: tm_password
echo.
pause
