@echo off
echo ========================================
echo   PUSH CODE LEN GITHUB
echo ========================================
echo.

echo [1/6] Khoi tao Git repository...
git init

echo.
echo [2/6] Them remote repository...
git remote add origin https://github.com/trandinhbaokhang118-tdk/TimeManager_React.git

echo.
echo [3/6] Them tat ca files...
git add .

echo.
echo [4/6] Commit code...
git commit -m "Initial commit: TimeManager React App with Landing Page"

echo.
echo [5/6] Doi ten branch thanh main...
git branch -M main

echo.
echo [6/6] Push len GitHub...
git push -u origin main

echo.
echo ========================================
echo   HOAN THANH!
echo ========================================
echo.
echo Code da duoc push len:
echo https://github.com/trandinhbaokhang118-tdk/TimeManager_React
echo.
pause
