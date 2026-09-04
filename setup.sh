#!/usr/bin/env bash
set -e

echo "========================================="
echo "   fstack — Fabio's Stack / Founder's Stack"
echo "========================================="
echo ""

# Ensure Node is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required to install fstack. Please install Node v18+ and rerun."
    exit 1
fi

node bin/fstack.js install "$@"

echo ""
echo "========================================="
echo "✅ fstack successfully installed!"
echo "Use /fstack or /engineer-mode in your agent."
echo "========================================="
