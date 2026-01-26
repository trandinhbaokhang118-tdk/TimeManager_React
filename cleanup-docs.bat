@echo off
echo ========================================
echo   DON DEP CAC FILE MD KHONG CAN THIET
echo ========================================
echo.

echo Dang xoa cac file update/status logs...

REM Xoa cac file update logs
del /Q BEAUTIFUL_WEB_COMPLETE.md 2>nul
del /Q BEFORE_AFTER_COMPARISON.md 2>nul
del /Q BUGFIX_REPORT.md 2>nul
del /Q CHATBOT_DEMO.md 2>nul
del /Q CHATBOT_UI_UPDATE.md 2>nul
del /Q COLOR_SUMMARY.md 2>nul
del /Q CRITICAL_BUGS_FIXED.md 2>nul
del /Q CUSTOM_COLORS_READY.md 2>nul
del /Q DARK_MODE_GRADIENT_UPDATE.md 2>nul
del /Q DARK_MODE_PERFECT.md 2>nul
del /Q DATETIME_PICKER_UPDATE.md 2>nul
del /Q DONE_MYSQL.md 2>nul
del /Q FEATURE_UPDATE.md 2>nul
del /Q FINAL_IMPLEMENTATION.md 2>nul
del /Q FINAL_UPDATE.md 2>nul
del /Q FIX_ROUTING_BUTTONS.md 2>nul
del /Q IMPLEMENTATION_STATUS.md 2>nul
del /Q LANDING_AS_HOMEPAGE.md 2>nul
del /Q LANDING_PAGE_CREATED.md 2>nul
del /Q LANDING_PAGE_TESTING.md 2>nul
del /Q LOGIN_THEME_UPDATE.md 2>nul
del /Q MOBILE_UI_IMPROVEMENTS.md 2>nul
del /Q MYSQL_MIGRATION_COMPLETE.md 2>nul
del /Q MYSQL_SETUP_COMPLETE.md 2>nul
del /Q PHASE1_COMPLETED.md 2>nul
del /Q PHASE2_COMPLETED.md 2>nul
del /Q PHASE2_3_4_PLAN.md 2>nul
del /Q POSTGRESQL_CLEANUP.md 2>nul
del /Q QUICK_ADD_FIXED.md 2>nul
del /Q QUICK_FIX.md 2>nul
del /Q RELOAD_FIX.md 2>nul
del /Q THEME_FIX_SUMMARY.md 2>nul

REM Xoa cac file duplicate/redundant
del /Q README_MYSQL.md 2>nul
del /Q START_HERE_MYSQL.md 2>nul
del /Q AI_CHATBOT_IMPLEMENTATION.md 2>nul
del /Q AI_SCHEDULE_FEATURE_PLAN.md 2>nul
del /Q HUONG_DAN_PUSH_GITHUB.md 2>nul
del /Q MOBILE_APP_SUMMARY.md 2>nul
del /Q PROJECT_DOCUMENTATION.md 2>nul
del /Q PROJECT_OVERVIEW.md 2>nul
del /Q QUICK_REFERENCE.md 2>nul
del /Q test-ai-chatbot.md 2>nul
del /Q tieuchuanuiux.md 2>nul

echo.
echo ========================================
echo   HOAN THANH!
echo ========================================
echo.
echo Da xoa cac file khong can thiet!
echo.
echo Cac file quan trong da duoc giu lai:
echo - README.md
echo - CHANGELOG.md
echo - FEATURES.md
echo - ARCHITECTURE.md
echo - CREATE_YOUR_ADMIN.md
echo - SETUP_OPENAI_API.md
echo - QUICK_START_MYSQL.md
echo - MYSQL_MIGRATION_GUIDE.md
echo - TESTING_GUIDE.md
echo - TROUBLESHOOTING.md
echo - SOCIAL_LOGIN_GUIDE.md
echo - PLANNER_GUIDE.md
echo - ADMIN_GUIDE.md
echo - ADMIN_ACCOUNT_GUIDE.md
echo - AI_CHATBOT_GUIDE.md
echo - COLOR_SYSTEM_GUIDE.md
echo - GALAXY_THEME_GUIDE.md
echo - UIUX_IMPLEMENTATION.md
echo - HUONG_DAN_XEM_DATABASE.md
echo - MOBILE_APP_ROADMAP.md
echo - GOOGLE_PLAY_CHECKLIST.md
echo - CAPACITOR_SETUP_GUIDE.md
echo - ANDROID_CUSTOMIZATION_GUIDE.md
echo - PRIVACY_POLICY.md
echo - NEXT_STEPS.md
echo.
pause
