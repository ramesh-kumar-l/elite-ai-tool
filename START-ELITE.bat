@echo off
REM ELITE.AI Quick Start - Windows

color 0A
title ELITE.AI - Personal Mastery System

echo.
echo ╔════════════════════════════════════════╗
echo ║      ELITE.AI - MASTERY SYSTEM v1.0    ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    color 0C
    echo ERROR: Node.js not found!
    echo Download from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js detected
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check if database exists
if not exist elite-ai.db (
    echo Initializing database...
    call npm run db:init
    echo.
)

echo ✓ All systems ready
echo.
echo 🚀 Starting ELITE.AI Server...
echo.
echo    Access at: http://localhost:3001
echo    Press Ctrl+C to stop
echo.

call npm start

pause
