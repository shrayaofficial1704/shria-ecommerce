@echo off
cd /d "%~dp0"
echo Starting Shria website...
echo.

if not exist "server\node_modules" (
  echo Installing backend dependencies...
  call npm.cmd install --prefix server
)

if not exist "client\node_modules" (
  echo Installing frontend dependencies...
  call npm.cmd install --prefix client
)

start "Shria Backend" cmd /k call "%~dp0start-backend.cmd"
start "Shria Frontend" cmd /k call "%~dp0start-frontend.cmd"

echo.
echo Two terminal windows are opening:
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Open this in your browser:
echo http://localhost:5173/catalog
echo.
start "" "http://localhost:5173/catalog"
