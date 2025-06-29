@echo off
echo 🚀 Starting ForumPlus application...

:: Start frontend in background
echo 📱 Starting frontend application...
cd app
start "Frontend" cmd /k "npm run dev"

:: Wait a moment for frontend to start
timeout /t 3 /nobreak >nul

:: Start backend
echo 🔧 Starting backend server...
cd ..\server

:: Activate virtual environment and start FastAPI server
echo 🐍 Activating Python virtual environment and starting server...
start "Backend" cmd /k ".pyenv\Scripts\activate && fastapi dev main.py"

:: Display information
echo.
echo ✅ Services are starting in separate windows!
echo 📱 Frontend: http://localhost:5173 (typically)
echo 🔧 Backend: http://localhost:8000 (typically)
echo.
echo Close the respective command windows to stop each service.
pause 