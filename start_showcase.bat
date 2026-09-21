@echo off
title CNC Router 3D Web Showcase - Akbar Darma Saputra
echo =====================================================================
echo  AUTODESK INVENTOR CNC ROUTER 3D WEB SHOWCASE
echo  Karya: Akbar Darma Saputra, S.Tr.T. (Mechatronics Engineering PENS)
echo =====================================================================
echo.
echo  Membuka browser di http://localhost:8080 ...
echo  Tekan Ctrl+C di jendela ini untuk mematikan server lokal.
echo.
start "" "http://localhost:8080"
python -m http.server 8080
pause
