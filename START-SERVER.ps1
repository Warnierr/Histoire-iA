# RELIGIOUS MAP - Script de Demarrage
# =====================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RELIGIOUS MAP - Serveur de Developpement" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Aller dans le repertoire du script
Set-Location $PSScriptRoot
Write-Host "Repertoire: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Verifier node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dependances..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "Demarrage du serveur Next.js..." -ForegroundColor Green
Write-Host "Ouvrez votre navigateur sur: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arreter le serveur" -ForegroundColor Gray
Write-Host ""

npm run dev

