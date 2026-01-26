Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SYNC CODE TO MOBILE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/2] Build web app..." -ForegroundColor Yellow
Set-Location frontend
npm run build

Write-Host ""
Write-Host "[2/2] Sync voi Android..." -ForegroundColor Yellow
npx cap sync

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   HOAN THANH!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Code da duoc sync!" -ForegroundColor Green
Write-Host "Mo Android Studio de test: .\open-android-studio.bat" -ForegroundColor Cyan
Write-Host ""
Read-Host "Nhan Enter de dong"
