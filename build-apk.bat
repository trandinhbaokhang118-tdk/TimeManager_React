@echo off
echo ========================================
echo   BUILD APK RELEASE
echo ========================================
echo.

echo [1/3] Build web app...
cd frontend
call npm run build

echo.
echo [2/3] Sync voi Android...
call npx cap sync

echo.
echo [3/3] Build APK...
cd android
call gradlew assembleRelease

echo.
echo ========================================
echo   HOAN THANH!
echo ========================================
echo.
echo APK file tai:
echo frontend\android\app\build\outputs\apk\release\app-release.apk
echo.
echo Cai dat APK:
echo adb install app\build\outputs\apk\release\app-release.apk
echo.
pause
