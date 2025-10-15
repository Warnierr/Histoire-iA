@echo off
chcp 65001 >nul
echo ========================================
echo   RELIGIOUS MAP - Installation et Demarrage
echo ========================================
echo.

cd /d "%~dp0"
echo Dossier actuel: %CD%
echo.

echo [1/4] Installation des dependances...
call npm install
if errorlevel 1 goto error

echo.
echo [2/4] Installation de tailwindcss-animate...
call npm install -D tailwindcss-animate
if errorlevel 1 goto error

echo.
echo [3/4] Generation du client Prisma...
call npx prisma generate
if errorlevel 1 goto error

echo.
echo [4/4] Demarrage du serveur Next.js...
echo.
echo ===========================================
echo   Serveur demarre !
echo   Ouvrez: http://localhost:3000
echo ===========================================
echo.
call npm run dev

:error
echo.
echo ERREUR lors de l'installation/demarrage
pause

