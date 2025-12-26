# Premium Car Rental Platform

A production-ready, multi-module Car Rental Platform designed for seamless user experience, featuring a high-performance Mobile User App, Driver Companion App, and comprehensive Admin Dashboard.

## 🚀 Key Features

### 📱 User Mobile App (React Native + Expo)
-   **Modern UI/UX**: Built with NativeWind (TailwindCSS) and smooth animations using React Native Reanimated.
-   **Car Discovery**: Interactive list and map views for browsing vehicles.
-   **Booking Flow**: Seamless booking experience with real-time availability.
-   **Security**: Secure Authentication with JWT and OTP.

### 🚗 Driver App
-   **Real-time assignment**: Drivers receive booking requests instantly.
-   **Earnings Dashboard**: Track daily and weekly earnings.

### 💻 Admin Dashboard (Next.js)
-   **Fleet Management**: Add, update, and track vehicle status.
-   **Analytics**: Visual insights into revenue and booking trends.

## 🛠 Tech Stack

-   **Frontend**: React Native (Expo), NativeWind, Reanimated, Lucide Icons.
-   **Web/Admin**: Next.js 14, Tailwind CSS, Framer Motion.
-   **Backend**: Node.js, Express, MongoDB, Redis, JWT.
-   **DevOps**: Monorepo architecture, Docker ready.

## 📂 Project Structure

```
/apps
  /mobile   # User & Driver Mobile App
  /admin    # Admin Web Dashboard
/server     # Node.js backend API
```

## 🚀 Getting Started

### Development Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment Variables**:
    
    **Backend (server/.env)**:
    ```bash
    cd server
    cp env.example .env
    ```
    Edit `.env` and add:
    - `PORT=8000`
    - `MONGO_URI=your_mongodb_connection_string`
    - `JWT_SECRET=your_secure_jwt_secret`

    **Frontend (apps/web/.env.local)**:
    ```bash
    cd apps/web
    cp env.local.example .env.local
    ```
    Add your Firebase configuration

3.  **Start Backend**:
    ```bash
    cd server
    npm run dev
    ```

4.  **Start Admin Dashboard**:
    ```bash
    cd apps/web
    npm run dev
    ```

## 🌐 Production Deployment Guide

### Deployment Options

Choose your preferred platform for backend deployment:

| Platform | Guide | Best For |
|----------|-------|----------|
| 🎨 **Render** | [DEPLOYMENT_RENDER.md](./DEPLOYMENT_RENDER.md) | Free tier, side projects |
| 🚂 **Railway** | [DEPLOYMENT.md](./DEPLOYMENT.md) | Production apps, no cold starts |

Both use **Vercel** for frontend deployment.

### Quick Deploy

1. **Setup Script** (One-time setup):
   ```bash
   chmod +x setup-deploy.sh
   ./setup-deploy.sh
   ```

2. **Deploy Backend**:
   - **Option A - Render** (Free): Import on [render.com](https://render.com)
   - **Option B - Railway** ($5/mo): Import on [railway.app](https://railway.app)

3. **Deploy Frontend** to Vercel:
   - Import on [Vercel.com](https://vercel.com)
   - Set Root Directory: `apps/web`
   - Deploy!

### Configuration Files
- [`render.yaml`](render.yaml) - Render deployment config
- [`railway.json`](railway.json) - Railway deployment config
- [`vercel.json`](vercel.json) - Frontend deployment config
- [DEPLOYMENT_RENDER.md](DEPLOYMENT_RENDER.md) - Render deployment guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Railway deployment guide
- [DEPLOYMENT_CONFIG.md](DEPLOYMENT_CONFIG.md) - Configuration overview

---

## 🌐 Original Production Deployment Guide (Manual Setup)

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or MongoDB server)
- Domain name (optional)
- Hosting provider account (Vercel, Railway, Render, etc.)

### Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**:
   - Click "Build a Database"
   - Choose "Free Shared" tier
   - Select a cloud provider and region (choose closest to your users)
   - Click "Create Cluster" (takes 1-3 minutes)

3. **Configure Database Access**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password (save these securely!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for production
   - Or add specific IPs for better security
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)
   - Replace `<username>` and `<password>` with your database credentials
   - Add database name: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/car-rental`

6. **Seed Admin User**:
   ```bash
   cd server
   node seed-admin.js
   ```
   This creates an admin account: `admin@luxecars.com` / `admin123`

### Step 2: Backend Deployment (Railway/Render)

#### Option A: Deploy to Railway

1. **Create Railway Account**:
   - Go to [Railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub and select your repository

3. **Configure Root Directory**:
   - Click on your service
   - Go to "Settings"
   - Set "Root Directory" to `server`

4. **Add Environment Variables**:
   - Go to "Variables" tab
   - Add the following:
     ```
     PORT=8000
     MONGO_URI=your_mongodb_connection_string_from_step1
     JWT_SECRET=your_secure_random_string_here
     NODE_ENV=production
     ```
   - Generate JWT_SECRET: `openssl rand -base64 32` in terminal

5. **Deploy**:
   - Railway will auto-deploy
   - Copy the public URL (e.g., `https://your-app.up.railway.app`)
   - Test: Visit `https://your-app.up.railway.app` - should see "Car Rental API is running"

#### Option B: Deploy to Render

1. **Create Render Account**:
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `car-rental-backend`
     - Root Directory: `server`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`

3. **Add Environment Variables**:
   - Under "Environment", add:
     ```
     PORT=8000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secure_secret
     NODE_ENV=production
     ```

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the URL (e.g., `https://car-rental-backend.onrender.com`)

### Step 3: Frontend Deployment (Vercel)

1. **Create Vercel Account**:
   - Go to [Vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Project**:
   - Framework Preset: `Next.js`
   - Root Directory: `apps/web`
   - Build Command: `npm run build` (or leave default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add:
     ```
     NEXT_PUBLIC_API_URL=your_backend_url_from_step2
     ```
     Example: `NEXT_PUBLIC_API_URL=https://car-rental-backend.onrender.com`
   
   - Add Firebase config (from Firebase Console):
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for build (2-5 minutes)
   - Visit your URL (e.g., `https://your-app.vercel.app`)

### Step 4: Firebase Setup (for Authentication)

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add project"
   - Enter project name, accept terms, click "Continue"

2. **Enable Authentication**:
   - Go to "Authentication" → "Get started"
   - Enable providers:
     - **Email/Password**: Toggle on
     - **Google**: Toggle on, configure support email
     - **Facebook**: Toggle on, get App ID/Secret from Facebook Developers

3. **Get Configuration**:
   - Go to Project Settings (gear icon)
   - Under "Your apps" → Web app
   - Copy configuration values
   - Add to `.env.local` in frontend

4. **Configure Authorized Domains**:
   - In Authentication → Settings → Authorized domains
   - Add your Vercel domain (e.g., `your-app.vercel.app`)

### Step 5: Update CORS Settings

Update `server/server.js` to allow your frontend domain:

```javascript
const cors = require('cors');

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://your-app.vercel.app'  // Add your Vercel URL
    ],
    credentials: true
}));
```

Redeploy backend after this change.

### Step 6: Post-Deployment Testing

1. **Test Backend**:
   ```bash
   curl https://your-backend-url.com
   ```
   Should return: "Car Rental API is running"

2. **Test Admin Login**:
   - Visit `https://your-frontend-url.vercel.app/admin/login`
   - Login with: `admin@luxecars.com` / `admin123`
   - Change password after first login

3. **Test Car Management**:
   - Add a test car from admin dashboard
   - Verify it appears in the cars list

4. **Test User Flow**:
   - Sign up as a regular user
   - Browse cars
   - Test booking flow

### Step 7: Domain Setup (Optional)

1. **Buy Domain** (Namecheap, GoDaddy, etc.)

2. **Configure Frontend Domain** (Vercel):
   - Go to project Settings → Domains
   - Add your domain (e.g., `luxecars.com`)
   - Follow DNS configuration steps

3. **Configure Backend Domain** (Railway/Render):
   - Go to Settings → Networking
   - Add custom domain (e.g., `api.luxecars.com`)
   - Update DNS records as instructed

4. **Update Environment Variables**:
   - Update `NEXT_PUBLIC_API_URL` in Vercel to point to custom backend domain
   - Redeploy frontend

### 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ random characters)
- [ ] Enable MongoDB IP whitelist
- [ ] Set up SSL/HTTPS (automatic on Vercel/Railway/Render)
- [ ] Configure CORS properly
- [ ] Add rate limiting to API endpoints
- [ ] Enable Firebase security rules
- [ ] Set up environment-specific configs
- [ ] Never commit .env files to git

### 📊 Monitoring & Maintenance

1. **Backend Logs**: Check Railway/Render dashboard for errors
2. **Frontend Logs**: Check Vercel deployment logs
3. **Database**: Monitor MongoDB Atlas metrics
4. **Uptime**: Use UptimeRobot or similar service
5. **Backups**: Configure MongoDB automated backups

### 🐛 Common Deployment Issues

**Issue**: Frontend can't connect to backend
- **Fix**: Ensure `NEXT_PUBLIC_API_URL` is correct in Vercel
- **Fix**: Check CORS settings in backend

**Issue**: Database connection fails
- **Fix**: Verify MongoDB IP whitelist includes 0.0.0.0/0
- **Fix**: Check MONGO_URI format and credentials

**Issue**: Authentication not working
- **Fix**: Verify Firebase config in frontend
- **Fix**: Add Vercel domain to Firebase authorized domains

**Issue**: "Module not found" errors
- **Fix**: Ensure correct root directory in Railway/Render
- **Fix**: Check package.json has all dependencies

### 💰 Cost Estimation

**Free Tier (Suitable for testing/portfolio)**:
- MongoDB Atlas: Free (512MB storage)
- Railway/Render: Free tier available
- Vercel: Free (unlimited personal projects)
- Firebase: Free (50K MAU)
- **Total**: $0/month

**Production Tier (For real business)**:
- MongoDB Atlas: $57/month (2GB - 10GB)
- Railway: $5-20/month
- Vercel Pro: $20/month
- Firebase: Pay as you go (~$25-50/month)
- Domain: $12/year
- **Total**: ~$100-150/month

## 🚀 Alternative Deployment Options

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### VPS Deployment (DigitalOcean, AWS EC2)

```bash
# Install Node.js and MongoDB
# Clone repository
git clone your-repo-url
cd car-rental

# Install dependencies
npm install

# Setup PM2 for process management
npm install -g pm2
pm2 start server/server.js --name car-rental-api
pm2 startup
pm2 save

# Setup Nginx reverse proxy
# Configure SSL with Let's Encrypt
```

## 📜 Resume Description

**Car Rental Platform (React Native, Node.js, MongoDB)**
Architected and developed a full-stack car rental ecosystem featuring a high-fidelity mobile app with 60fps animations (Reanimated) and a Next.js admin dashboard. Implemented secure JWT auth, real-time booking management, and a scalable REST API on Node.js/Express handling complex vehicle availability logic.
# Luxe-cars-rental
