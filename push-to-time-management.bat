@echo off
echo ========================================
echo   PUSH TO TIME_MANAGEMENT REPO
echo ========================================
echo.

echo Nhap Personal Access Token cua ban:
set /p TOKEN="Token (ghp_...): "

echo.
echo Dang cap nhat remote URL...
git remote set-url time-management https://%TOKEN%@github.com/trandinhbaokhang118-tdk/Time_Management.git

echo.
echo Dang push code...
git push time-management main

echo.
echo ========================================
echo   HOAN THANH!
echo ========================================
echo.
echo Repository: https://github.com/trandinhbaokhang118-tdk/Time_Management
echo.
pause
