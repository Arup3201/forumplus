#!/bin/bash

# Start ForumPlus App and Server
echo "🚀 Starting ForumPlus application..."

# Function to handle cleanup on script exit
cleanup() {
    echo "🛑 Shutting down services..."
    # Kill background processes
    jobs -p | xargs -r kill
    exit 0
}

# Set trap to handle Ctrl+C
trap cleanup SIGINT SIGTERM

# Start frontend in background
echo "📱 Starting frontend application..."
cd app
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 2

# Start backend
echo "🔧 Starting backend server..."
cd ../server

# Activate virtual environment
echo "🐍 Activating Python virtual environment..."
source .pyenv/bin/activate

# Start FastAPI server
echo "⚡ Starting FastAPI server..."
fastapi dev main.py &
BACKEND_PID=$!

# Display running services
echo ""
echo "✅ Services started successfully!"
echo "📱 Frontend: http://localhost:5173 (typically)"
echo "🔧 Backend: http://localhost:8000 (typically)"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait 