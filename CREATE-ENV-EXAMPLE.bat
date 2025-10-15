@echo off
cd /d "%~dp0"

echo # RELIGIOUS MAP - Variables d'Environnement > .env.example
echo # Copiez ce fichier en .env et remplissez vos cles >> .env.example
echo. >> .env.example
echo # BASE DE DONNEES POSTGRESQL >> .env.example
echo DATABASE_URL="postgresql://postgres:password@localhost:5432/religious_map" >> .env.example
echo. >> .env.example
echo # OPENROUTER API pour le chat IA >> .env.example
echo # Obtenez votre cle sur: https://openrouter.ai/ >> .env.example
echo OPENROUTER_API_KEY="sk-or-v1-VOTRE_CLE_ICI" >> .env.example
echo. >> .env.example
echo # OPENAI API pour les embeddings >> .env.example
echo OPENAI_API_KEY="sk-VOTRE_CLE_ICI" >> .env.example
echo. >> .env.example
echo # CONFIGURATION NEXT.JS >> .env.example
echo NEXT_PUBLIC_SITE_URL="http://localhost:3000" >> .env.example
echo NEXT_PUBLIC_APP_NAME="Religious Map" >> .env.example

echo Fichier .env.example cree avec succes!
pause

