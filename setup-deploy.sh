#!/bin/bash

# Luxe Cars Rental - Quick Deployment Setup Script
# This script helps you prepare your project for deployment

echo "🚀 Luxe Cars Rental - Deployment Setup"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running from project root
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
echo ""

# Install root dependencies
npm install

# Install frontend dependencies
cd apps/web
npm install
cd ../..

# Install backend dependencies
cd server
npm install
cd ..

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

echo -e "${YELLOW}Step 2: Setting up environment files...${NC}"
echo ""

# Frontend environment setup
if [ ! -f "apps/web/.env.local" ]; then
    cp apps/web/.env.production.example apps/web/.env.local
    echo -e "${GREEN}✓ Created apps/web/.env.local${NC}"
    echo -e "${YELLOW}  → Please update with your actual values${NC}"
else
    echo -e "${YELLOW}✓ apps/web/.env.local already exists${NC}"
fi

# Backend environment setup
if [ ! -f "server/.env" ]; then
    cp .env.production.example server/.env
    echo -e "${GREEN}✓ Created server/.env${NC}"
    echo -e "${YELLOW}  → Please update with your actual values${NC}"
else
    echo -e "${YELLOW}✓ server/.env already exists${NC}"
fi

echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "======================================"
echo "Next Steps:"
echo "======================================"
echo ""
echo "1. Update environment variables:"
echo "   - apps/web/.env.local (Frontend)"
echo "   - server/.env (Backend)"
echo ""
echo "2. Start development:"
echo "   npm run dev"
echo ""
echo "3. Deploy:"
echo "   - Backend: Push to Railway (see DEPLOYMENT.md)"
echo "   - Frontend: Push to Vercel (see DEPLOYMENT.md)"
echo ""
echo "📖 For detailed deployment instructions, see:"
echo "   ${GREEN}DEPLOYMENT.md${NC}"
echo ""
