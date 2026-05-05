@echo off
cd /d "%~dp0server"
echo Starting Shria backend on http://localhost:5000
npm.cmd run dev
pause

