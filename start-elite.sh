#!/bin/bash

# ELITE.AI Quick Start - Mac/Linux

echo ""
echo "╔════════════════════════════════════════╗"
echo "║      ELITE.AI - MASTERY SYSTEM v1.0    ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js not found!"
    echo "Download from: https://nodejs.org/"
    echo ""
    exit 1
fi

node_version=$(node --version)
echo "✓ Node.js detected: $node_version"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Check if database exists
if [ ! -f "elite-ai.db" ]; then
    echo "Initializing database..."
    npm run db:init
    echo ""
fi

echo "✓ All systems ready"
echo ""
echo "🚀 Starting ELITE.AI Server..."
echo ""
echo "   Access at: http://localhost:3001"
echo "   Press Ctrl+C to stop"
echo ""

npm start
