# Luxe Cars Rental - Deployment Configurations

This directory contains all the necessary deployment configurations for your Car Rental platform.

## 📁 Configuration Files Overview

### Root Level
- **vercel.json** - Vercel deployment configuration for frontend
- **railway.json** - Railway deployment configuration for backend
- **.env.production.example** - Backend environment variables template
- **DEPLOYMENT.md** - Complete deployment guide
- **setup-deploy.sh** - Quick setup script

### Frontend (`apps/web/`)
- **.env.production.example** - Frontend environment variables template
- **next.config.ts** - Next.js configuration with deployment optimizations

### Backend (`server/`)
- **server.js** - Enhanced with CORS, health checks, and production settings
- **package.json** - Contains production start scripts

## 🎯 Quick Deployment Steps

### Option 1: Using Vercel Dashboard (Recommended for Frontend)

1. Go to [vercel.com](https://vercel.com)
2. Import repository
3. Set **Root Directory**: `apps/web`
4. Add environment variables from `.env.production.example`
5. Deploy

### Option 2: Using Railway Dashboard (Recommended for Backend)

1. Go to [railway.app](https://railway.app)
2. Import repository
3. Add environment variables from `.env.production.example`
4. Deploy (configuration auto-detected from `railway.json`)

### Option 3: Using CLI

```bash
# Make setup script executable
chmod +x setup-deploy.sh

# Run setup
./setup-deploy.sh

# Deploy frontend
cd apps/web && npx vercel --prod

# Deploy backend
cd server && npx railway up
```

## 🔐 Environment Variables Checklist

### Backend (Railway)
- [ ] `NODE_ENV=production`
- [ ] `PORT=8000`
- [ ] `MONGO_URI` (from MongoDB Atlas)
- [ ] `JWT_SECRET` (generate with: `openssl rand -base64 32`)
- [ ] `FRONTEND_URL` (your Vercel URL)

### Frontend (Vercel)
- [ ] `NEXT_PUBLIC_API_URL` (your Railway URL)
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`

## 📖 Documentation

For complete deployment instructions, troubleshooting, and best practices, see:
- [DEPLOYMENT.md](../DEPLOYMENT.md) - Full deployment guide

## 🆘 Need Help?

- Check [DEPLOYMENT.md](../DEPLOYMENT.md) for troubleshooting
- Railway docs: https://docs.railway.app
- Vercel docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas

## ✅ Deployment Checklist

Before deploying, ensure:
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Database (MongoDB) ready
- [ ] Firebase project setup
- [ ] Git repository pushed to GitHub
- [ ] Both platforms connected to GitHub

After deployment:
- [ ] Test all API endpoints
- [ ] Verify frontend can reach backend
- [ ] Check authentication works
- [ ] Test car booking flow
- [ ] Monitor logs for errors

---

**Pro Tip**: Deploy backend first, get the Railway URL, then deploy frontend with that URL in `NEXT_PUBLIC_API_URL`.
