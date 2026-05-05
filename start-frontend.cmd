@echo off
cd /d "%~dp0client"
echo Starting Shria frontend on http://localhost:5173
npm.cmd run dev -- --host 127.0.0.1
pause

