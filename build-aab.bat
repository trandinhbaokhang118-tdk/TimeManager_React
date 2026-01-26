@echo off
echo ========================================
echo   BUILD AAB (GOOGLE PLAY)
echo ========================================
echo.

echo [1/3] Build web app...
cd frontend
call npm run build

echo.
echo [2/3] Sync voi Android...
call npx cap sync

echo.
echo [3/3] Build AAB...
cd android
call gradlew bundleRelease

echo.
echo ========================================
echo   HOAN THANH!
echo ========================================
echo.
echo AAB file tai:
echo frontend\android\app\build\outputs\bundle\release\app-release.aab
echo.
echo File nay dung de upload len Google Play Store!
echo.
pause
