@echo off
echo ========================================
echo   KHOI DONG PHPMYADMIN
echo ========================================
echo.

echo Dang khoi dong phpMyAdmin...
docker-compose up -d phpmyadmin

echo.
echo Cho phpMyAdmin khoi dong...
timeout /t 5 /nobreak

echo.
echo ========================================
echo   HOAN THANH!
echo ========================================
echo.
echo Truy cap: http://localhost:8080
echo Username: tm_user
echo Password: tm_password
echo.
echo Trinh duyet se tu dong mo...
start http://localhost:8080

pause
