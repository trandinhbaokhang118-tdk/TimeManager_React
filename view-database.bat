@echo off
echo ========================================
echo   XEM CO SO DU LIEU MYSQL
echo ========================================
echo.
echo Dang ket noi vao database: time_manager
echo Username: tm_user
echo.

mysql -u tm_user -ptm_password -h localhost time_manager

pause
