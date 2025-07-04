#!/bin/bash

# NASA API Backend Starter Template Setup Script
echo "🚀 Setting up NASA API Backend Starter Template..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed. Please install Yarn first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

# Create .env file from example
if [ ! -f .env ]; then
    echo "🔧 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created! Please edit it and add your NASA API key."
else
    echo "ℹ️  .env file already exists."
fi

# Build the project
echo "🔨 Building TypeScript..."
yarn build

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file and add your NASA API key from https://api.nasa.gov/"
echo "2. Run 'yarn dev' to start the development server"
echo "3. Visit http://localhost:5000 to test your API"
echo ""
echo "Happy coding! 🚀" 