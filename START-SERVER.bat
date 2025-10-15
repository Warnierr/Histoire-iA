@echo off
echo ========================================
echo   RELIGIOUS MAP - Serveur de Developpement
echo ========================================
echo.

cd /d "%~dp0"
echo Repertoire: %CD%
echo.

echo Verification de node_modules...
if not exist "node_modules" (
    echo Installation des dependances...
    call npm install
)

echo.
echo Demarrage du serveur Next.js...
echo Ouvrez votre navigateur sur: http://localhost:3000
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

call npm run dev

pause

