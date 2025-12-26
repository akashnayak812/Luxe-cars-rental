# Deployment Guide - Luxe Cars Rental

## 🚀 Quick Start Deployment

### Backend Deployment (Railway)

1. **Sign up/Login to [Railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select this repository
   - Railway will auto-detect the configuration from `railway.json`

3. **Configure Environment Variables**
   ```
   NODE_ENV=production
   PORT=8000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental
   JWT_SECRET=your_secure_random_string_here
   FRONTEND_URL=https://your-app.vercel.app
   ```

4. **MongoDB Setup**
   - Option A: Add MongoDB service in Railway (click "Add Service" → "Database" → "MongoDB")
   - Option B: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended for production)
   
   For MongoDB Atlas:
   - Create free cluster at mongodb.com
   - Get connection string
   - Add to `MONGO_URI` in Railway

5. **Deploy**
   - Click "Deploy"
   - Copy your Railway URL: `https://your-app.up.railway.app`

### Frontend Deployment (Vercel)

1. **Sign up/Login to [Vercel.com](https://vercel.com)**

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Build Settings**
   - Framework Preset: **Next.js**
   - Root Directory: **apps/web**
   - Build Command: `npm install && npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
   ```

5. **Deploy**
   - Click "Deploy"
   - Your app will be live at: `https://your-app.vercel.app`

## 📋 Post-Deployment Checklist

### Backend
- [ ] Environment variables configured
- [ ] MongoDB connected successfully
- [ ] Check Railway logs for errors
- [ ] Test API endpoint: `https://your-app.up.railway.app/`
- [ ] Test health check: `https://your-app.up.railway.app/health`

### Frontend
- [ ] Environment variables configured
- [ ] NEXT_PUBLIC_API_URL points to Railway backend
- [ ] Firebase credentials added
- [ ] Test the live site
- [ ] Check browser console for errors

## 🔧 CLI Deployment (Alternative Method)

### Backend - Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project or create new
railway init

# Add environment variables
railway variables set NODE_ENV=production
railway variables set PORT=8000
railway variables set MONGO_URI=your_mongo_uri
railway variables set JWT_SECRET=your_jwt_secret

# Deploy
railway up
```

### Frontend - Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd apps/web

# Login
vercel login

# Deploy to production
vercel --prod
```

## 🔄 Update Deployment

### Auto-Deploy (Recommended)
- Both Railway and Vercel support automatic deployments
- Push to main branch → Auto-deploy
- Push to other branches → Preview deployments

### Manual Deploy
```bash
# Railway
cd server && railway up

# Vercel
cd apps/web && vercel --prod
```

## 🐛 Troubleshooting

### Backend Issues

**Port errors:**
- Ensure Railway's `PORT` environment variable is set
- Server binds to `0.0.0.0:${PORT}`

**Database connection failed:**
- Check `MONGO_URI` is correct
- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Railway)
- Check database user permissions

**CORS errors:**
- Update `FRONTEND_URL` in Railway
- Verify Vercel domain is whitelisted

### Frontend Issues

**API calls failing:**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check Railway backend is running
- Open browser DevTools → Network tab

**Build errors:**
- Check all dependencies in package.json
- Verify Node version compatibility
- Clear Vercel build cache and redeploy

**Environment variables not working:**
- Must start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new variables
- Check Vercel dashboard for typos

## 📊 Monitoring

### Railway
- View logs: Project → Deployments → Logs
- Monitor metrics: Project → Metrics
- Check health: `https://your-app.up.railway.app/health`

### Vercel
- View logs: Project → Deployments → View Function Logs
- Analytics: Project → Analytics
- Speed Insights: Project → Speed Insights

## 🔐 Security Recommendations

1. **Never commit .env files** - Already in .gitignore
2. **Use strong JWT secrets** - Generate with: `openssl rand -base64 32`
3. **Enable HTTPS only** - Both platforms handle this automatically
4. **Rotate secrets regularly** - Update JWT_SECRET, Firebase keys
5. **Monitor logs** - Check for suspicious activity

## 💰 Cost Estimates

### Railway (Backend)
- Free Tier: $5 credit/month
- Hobby Plan: $5/month
- Recommended: Hobby Plan for production

### Vercel (Frontend)
- Free Tier: Generous limits for personal projects
- Pro Plan: $20/month if needed
- Recommended: Free tier is sufficient to start

### MongoDB Atlas
- Free Tier: 512MB storage (good for testing)
- Shared Cluster: ~$9/month
- Recommended: Free tier to start, upgrade as needed

## 📞 Support

- Railway: https://railway.app/help
- Vercel: https://vercel.com/support
- MongoDB: https://www.mongodb.com/cloud/atlas/support

---

**Your URLs after deployment:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-project.up.railway.app`
- Admin Panel: `https://your-project.vercel.app/admin/login`

🎉 Happy Deploying!
