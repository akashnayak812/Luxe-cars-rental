# 🚀 Deploy to Render - Complete Guide

This guide walks you through deploying your Luxe Cars Rental application to Render (Backend) and Vercel (Frontend).

---

## 📋 Prerequisites

1. ✅ GitHub account with your code pushed
2. ✅ Render account ([render.com](https://render.com))
3. ✅ Vercel account ([vercel.com](https://vercel.com))
4. ✅ MongoDB Atlas account ([mongodb.com](https://www.mongodb.com/cloud/atlas))
5. ✅ Firebase project ([firebase.google.com](https://firebase.google.com))

---

## 🗄️ STEP 1: Setup MongoDB Database

### 1.1 Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Sign Up"** or **"Sign In"**
3. Click **"Create"** → **"Shared"** (Free tier)
4. Choose **AWS** provider
5. Select region closest to you (Oregon for Render)
6. Cluster Name: `car-rental-cluster`
7. Click **"Create Cluster"**

### 1.2 Create Database User

1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `car-rental-admin`
5. Password: Generate strong password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **"Add User"**

### 1.3 Allow Network Access

1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.4 Get Connection String

1. Click **"Database"** → **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://car-rental-admin:<password>@car-rental-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name `/car-rental` before the `?`:
   ```
   mongodb+srv://car-rental-admin:yourpassword@car-rental-cluster.xxxxx.mongodb.net/car-rental?retryWrites=true&w=majority
   ```
6. **Save this connection string!**

---

## 🔥 STEP 2: Setup Firebase

### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Project name: `luxe-cars-rental`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### 2.2 Enable Authentication

1. Click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Enable **Email/Password**
4. Click **"Save"**

### 2.3 Create Web App

1. In Project Overview, click **Web icon** (</>)
2. App nickname: `luxe-cars-web`
3. Click **"Register app"**
4. Copy the Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "luxe-cars-rental.firebaseapp.com",
     projectId: "luxe-cars-rental",
     storageBucket: "luxe-cars-rental.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
5. **Save this configuration!**

---

## 🎨 STEP 3: Deploy Backend to Render

### 3.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get Started"**
3. Sign up with **GitHub** (recommended)
4. Authorize Render to access your repositories

### 3.2 Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select `Luxe-cars-rental` repository
4. Click **"Connect"**

### 3.3 Configure Service Settings

Fill in the following settings:

**Basic Settings:**
- **Name**: `luxe-cars-backend` (or your preferred name)
- **Region**: Oregon (US West) - closest to free tier MongoDB
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- **Free** (or Starter if you need more resources)

### 3.4 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add each one:

```env
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb+srv://car-rental-admin:yourpassword@cluster.mongodb.net/car-rental?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_random_string_minimum_32_characters
FRONTEND_URL=https://your-app.vercel.app
```

**Generate JWT Secret:**
```bash
# Run in your terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3.5 Deploy

1. Click **"Create Web Service"**
2. Render will start building (takes 3-5 minutes)
3. Once complete, you'll get a URL like:
   ```
   https://luxe-cars-backend.onrender.com
   ```
4. **Save this URL!**

### 3.6 Test Backend

```bash
# Open in browser:
https://luxe-cars-backend.onrender.com/health

# Should see: {"status":"ok"}
```

**⚠️ Important Note:** Render free tier spins down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

---

## ▲ STEP 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Continue with **GitHub**
4. Authorize Vercel

### 4.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Find `Luxe-cars-rental` repository
3. Click **"Import"**

### 4.3 Configure Build Settings

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: Click **"Edit"** → Enter `apps/web`
3. **Build Command**: `npm install && npm run build`
4. **Output Directory**: `.next`
5. **Install Command**: `npm install`

### 4.4 Add Environment Variables

Click **"Environment Variables"** and add:

```env
NEXT_PUBLIC_API_URL=https://luxe-cars-backend.onrender.com
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=luxe-cars-rental.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=luxe-cars-rental
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=luxe-cars-rental.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Use your actual Render URL and Firebase values**

### 4.5 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your site will be live at:
   ```
   https://luxe-cars-rental.vercel.app
   ```
4. **Save this URL!**

---

## 🔄 STEP 5: Update CORS Configuration

### 5.1 Update Render Backend

1. Go to **Render Dashboard**
2. Click your web service
3. Click **"Environment"** tab
4. Update `FRONTEND_URL` with your actual Vercel URL:
   ```
   FRONTEND_URL=https://luxe-cars-rental.vercel.app
   ```
5. Click **"Save Changes"**
6. Render will automatically redeploy

---

## ✅ STEP 6: Test Your Deployment

### 6.1 Test Backend Health

```bash
# Open in browser:
https://luxe-cars-backend.onrender.com/health
```

**Expected Response:**
```json
{"status":"ok"}
```

**Note:** First load may take 30-60 seconds if service was sleeping.

### 6.2 Test Frontend

1. Open your Vercel URL
2. Check homepage loads
3. Verify images display
4. Test navigation

### 6.3 Test Authentication

1. Go to: `https://your-vercel-url.vercel.app/auth/signup`
2. Create test account
3. Try logging in

### 6.4 Test API Connection

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Navigate through site
4. Check API calls show 200 status codes

---

## 🐛 Troubleshooting

### Common Issues

**❌ "Service Unavailable" or slow first load**
```bash
# This is normal for Render free tier
# Service spins down after 15 minutes of inactivity
# First request takes 30-60 seconds to wake up

# Solution: Consider upgrading to paid plan for always-on service
```

**❌ "Cannot connect to database"**
```bash
# Check:
1. MongoDB Atlas IP whitelist includes 0.0.0.0/0
2. MONGO_URI is correct in Render environment
3. Database user credentials are correct
4. Network tab in Atlas shows "Active"
```

**❌ "Build failed"**
```bash
# Check Render logs:
1. Dashboard → Your Service → Logs
2. Look for npm install errors
3. Verify all dependencies are in package.json
4. Check Node version compatibility
```

**❌ CORS errors**
```bash
# Update Render environment:
FRONTEND_URL=https://luxe-cars-rental.vercel.app  # No trailing slash!

# Save and wait for auto-redeploy
```

**❌ "API calls timing out"**
```bash
# Render free tier limitation:
# If service is sleeping, first request takes time

# Solutions:
1. Implement loading states in frontend
2. Add timeout handling
3. Upgrade to Render paid plan ($7/month)
```

### Frontend Issues

**❌ "API calls failing"**
```bash
# Check Vercel environment variables:
NEXT_PUBLIC_API_URL=https://luxe-cars-backend.onrender.com  # No trailing slash!

# Redeploy after fixing:
Vercel Dashboard → Deployments → ••• → Redeploy
```

**❌ Build errors**
```bash
# Common fixes:
1. Clear build cache: Settings → Clear Cache
2. Check all dependencies are installed
3. Verify environment variables are set
4. Redeploy
```

---

## 📊 STEP 7: Monitor Your Deployment

### Render Monitoring

```bash
# View logs:
Dashboard → Your Service → Logs (real-time)

# Check metrics:
Dashboard → Metrics (CPU, Memory, Bandwidth)

# View events:
Dashboard → Events (deploys, restarts)
```

### Vercel Monitoring

```bash
# View logs:
Dashboard → Deployments → Latest → View Function Logs

# Check analytics:
Dashboard → Analytics

# Speed insights:
Dashboard → Speed Insights
```

---

## 💰 Cost Comparison

### Render Free Tier
- ✅ Free forever
- ✅ 750 hours/month
- ✅ 512MB RAM
- ⚠️ Spins down after 15min inactivity
- ⚠️ 30-60s cold start time

### Render Starter ($7/month)
- ✅ Always on (no cold starts)
- ✅ 512MB RAM
- ✅ Better for production

### Vercel (Frontend)
- ✅ Free tier: Generous for personal projects
- ✅ 100GB bandwidth
- ✅ Always fast

### MongoDB Atlas
- ✅ Free: 512MB storage
- ✅ Good for development/testing

**Total Cost:**
- **Free**: $0/month (with cold starts)
- **Production**: $7/month Render + Free Vercel/MongoDB

---

## 🔄 Future Updates

### Auto-Deploy from GitHub

Both Render and Vercel auto-deploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update features"
git push origin main

# Auto-deploys to both platforms! 🎉
```

### Manual Redeploy

**Render:**
```bash
Dashboard → Your Service → Manual Deploy → Deploy latest commit
```

**Vercel:**
```bash
Dashboard → Deployments → ••• → Redeploy
```

---

## 🎉 SUCCESS! Your App is Live

### Your URLs:

```bash
🌐 Frontend: https://luxe-cars-rental.vercel.app
🔧 Backend:  https://luxe-cars-backend.onrender.com
👤 Admin:    https://luxe-cars-rental.vercel.app/admin/login
📊 Health:   https://luxe-cars-backend.onrender.com/health
```

### Performance Tips

1. **Handle Cold Starts**: Add loading states for first load
2. **Use Caching**: Implement Redis on Render for better performance
3. **Optimize Images**: Use Next.js Image component
4. **Monitor Logs**: Check Render logs regularly
5. **Consider Upgrade**: If traffic grows, upgrade to Render Starter

---

## 🆚 Render vs Railway

| Feature | Render | Railway |
|---------|--------|---------|
| Free Tier | ✅ Forever free | ✅ $5 credit/month |
| Cold Starts | ⚠️ Yes (15min) | ✅ No |
| Setup | Simple | Simpler |
| Pricing | $7/month starter | $5/month hobby |
| Best For | Side projects | Production apps |

**Recommendation**: 
- Development/Testing: **Render Free**
- Production: **Railway** or **Render Starter**

---

## 📞 Support Links

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Vercel Support**: https://vercel.com/support
- **MongoDB Support**: https://www.mongodb.com/docs/atlas

---

**Congratulations! 🎊 Your Luxe Cars Rental app is live on Render!**
