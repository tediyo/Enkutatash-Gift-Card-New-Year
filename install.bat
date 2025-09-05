@echo off
echo 🌺 Setting up Enkutatash Greeting Card Creator...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
    echo.
    echo 🚀 To start the development server, run:
    echo    npm run dev
    echo.
    echo 🌐 Then open http://localhost:3000 in your browser
    echo.
    echo Happy Enkutatash! 🎉
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

pause
