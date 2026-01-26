@echo off
echo ========================================
echo   SETUP MOBILE APP - CAPACITOR
echo ========================================
echo.

echo [1/6] Cai dat Capacitor...
cd frontend
call npm install @capacitor/core @capacitor/cli

echo.
echo [2/6] Khoi tao Capacitor project...
call npx cap init TimeManager com.timemanager.app --web-dir=dist

echo.
echo [3/6] Cai dat Android platform...
call npm install @capacitor/android
call npx cap add android

echo.
echo [4/6] Cai dat native plugins...
call npm install @capacitor/push-notifications
call npm install @capacitor/local-notifications
call npm install @capacitor/storage
call npm install @capacitor/app
call npm install @capacitor/haptics
call npm install @capacitor/status-bar
call npm install @capacitor/splash-screen

echo.
echo [5/6] Build web app...
call npm run build

echo.
echo [6/6] Sync voi Android...
call npx cap sync

echo.
echo ========================================
echo   HOAN THANH!
echo ========================================
echo.
echo Buoc tiep theo:
echo 1. Mo Android Studio: npx cap open android
echo 2. Doi cho Gradle sync xong
echo 3. Chay app tren emulator hoac device
echo.
pause
