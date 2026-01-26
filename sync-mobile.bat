@echo off
echo ========================================
echo   SYNC CODE TO MOBILE
echo ========================================
echo.

echo [1/2] Build web app...
cd frontend
call npm run build

echo.
echo [2/2] Sync voi Android...
call npx cap sync

echo.
echo ========================================
echo   HOAN THANH!
echo ========================================
echo.
echo Code da duoc sync!
echo Mo Android Studio de test: open-android-studio.bat
echo.
pause
