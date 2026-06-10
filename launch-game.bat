@echo off
echo.
echo  FIFA VAR GAME - Local Server Launcher
echo  ======================================
echo  Starting server on http://localhost:8000
echo  Opening browser...
echo.
start http://localhost:8000/var-or-not-to-var.html
python -m http.server 8000
pause
