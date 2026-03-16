#!/bin/bash
set -e

echo "[v0] Fixing dependencies..."

# Check if node_modules exists
if [ -d "node_modules" ]; then
  echo "[v0] node_modules exists, checking for next..."
  if [ -f "node_modules/.bin/next" ]; then
    echo "[v0] next binary found!"
    exit 0
  else
    echo "[v0] next binary missing, removing node_modules..."
    rm -rf node_modules
  fi
fi

# Try pnpm first
if command -v pnpm &> /dev/null; then
  echo "[v0] Using pnpm to install dependencies..."
  pnpm install
  exit 0
fi

# Try npm as fallback
if command -v npm &> /dev/null; then
  echo "[v0] Using npm to install dependencies..."
  npm install
  exit 0
fi

echo "[v0] ERROR: Neither pnpm nor npm found!"
exit 1
