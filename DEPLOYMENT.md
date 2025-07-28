# Deployment Guide - Sharjah Properties

This guide will help you deploy your real estate platform to production. We'll deploy each component separately for better scalability and management.

## 🚀 Deployment Overview

### Components to Deploy:
1. **Frontend (Client)** - Vercel/Netlify
2. **Backend (API)** - Railway/Render
3. **Admin Panel** - Vercel/Netlify
4. **Database** - MongoDB Atlas

## 📋 Pre-Deployment Checklist

- [ ] All code is committed to GitHub
- [ ] Environment variables are ready
- [ ] MongoDB Atlas account created
- [ ] Vercel/Netlify account ready
- [ ] Railway/Render account ready

## 🗄️ Step 1: Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier is sufficient)

### 2. Configure Database
1. **Create Database User**
   - Go to Database Access
   - Add new database user
   - Username: `sharjah_admin`
   - Password: `your_secure_password`
   - Role: `Read and write to any database`

2. **Configure Network Access**
   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (allow all IPs)
   - Or add specific IPs for security

3. **Get Connection String**
   - Go to Clusters
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

## 🔧 Step 2: Backend Deployment (Railway)

### Option A: Railway (Recommended)

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd backend
   railway init
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set MONGO_URI="your_mongodb_atlas_connection_string"
   railway variables set JWT_SECRET="your_secure_jwt_secret_key"
   railway variables set NODE_ENV="production"
   ```

5. **Deploy**
   ```bash
   railway up
   ```

6. **Get Backend URL**
   ```bash
   railway domain
   ```
   Save this URL for frontend configuration.

### Option B: Render

1. **Connect GitHub Repository**
   - Go to [Render](https://render.com)
   - Connect your GitHub account
   - Select your repository

2. **Create New Web Service**
   - Name: `sharjah-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables**
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secure JWT secret key
   - `NODE_ENV`: `production`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Save the generated URL

## 🌐 Step 3: Frontend Deployment (Vercel)

### 1. Prepare Frontend
1. **Update API URL**
   Create `.env` file in the root directory:
   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```

2. **Build Frontend**
   ```bash
   npm run build
   ```

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy: Yes
# - Which scope: Select your account
# - Link to existing project: No
# - Project name: sharjah-frontend
# - Directory: ./ (current directory)
# - Override settings: No
```

#### Option B: Vercel Dashboard
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set Environment Variables**
   - `VITE_API_URL`: Your backend URL

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

## 🎛️ Step 4: Admin Panel Deployment (Vercel)

### 1. Prepare Admin Panel
1. **Update API URL**
   Create `.env` file in admin-panel directory:
   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```

2. **Build Admin Panel**
   ```bash
   cd admin-panel
   npm run build
   ```

### 2. Deploy to Vercel
```bash
cd admin-panel
vercel

# Follow the prompts:
# - Project name: sharjah-admin
# - Directory: ./ (current directory)
```

## 🔗 Step 5: Update URLs and Test

### 1. Update Frontend API URL
After backend deployment, update the frontend environment variable:
```env
VITE_API_URL=https://your-backend-url.com/api
```

### 2. Update Admin Panel API URL
```env
VITE_API_URL=https://your-backend-url.com/api
```

### 3. Test All Components
- [ ] Frontend loads correctly
- [ ] Admin panel loads correctly
- [ ] Property listings display
- [ ] Contact forms work
- [ ] Image uploads work
- [ ] Admin login works

## 🔒 Step 6: Security & Optimization

### 1. Environment Variables
Ensure all sensitive data is in environment variables:
```env
# Backend
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sharjah
JWT_SECRET=your_very_secure_jwt_secret_key
NODE_ENV=production

# Frontend
VITE_API_URL=https://your-backend-url.com/api
```

### 2. CORS Configuration
Update backend CORS settings in `server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.com', 'https://your-admin-url.com'],
  credentials: true
}));
```

### 3. SSL/HTTPS
- Vercel and Railway provide SSL automatically
- Ensure all URLs use HTTPS

## 📊 Step 7: Monitoring & Maintenance

### 1. Set Up Monitoring
- **Vercel Analytics**: Enable in Vercel dashboard
- **Railway Metrics**: Monitor in Railway dashboard
- **MongoDB Atlas**: Monitor database performance

### 2. Regular Backups
```bash
# Backup MongoDB
mongodump --uri="your_mongodb_atlas_connection_string" --out=backup/

# Restore if needed
mongorestore --uri="your_mongodb_atlas_connection_string" backup/
```

### 3. Performance Optimization
- Enable Vercel edge caching
- Optimize images
- Monitor bundle sizes

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check CORS configuration in backend
   - Ensure frontend URLs are in allowed origins

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check network access settings
   - Ensure database user has correct permissions

3. **Image Upload Issues**
   - Check file upload middleware
   - Verify upload directory permissions
   - Ensure proper file size limits

4. **Environment Variables**
   - Double-check all environment variables
   - Ensure no typos in variable names
   - Restart services after changes

### Debug Commands:
```bash
# Check backend logs
railway logs

# Check frontend build
npm run build

# Test API endpoints
curl https://your-backend-url.com/api/properties
```

## 📞 Support

If you encounter issues during deployment:

1. **Check Logs**: Use platform-specific logging tools
2. **Verify Configuration**: Double-check all settings
3. **Test Locally**: Ensure everything works locally first
4. **Contact Support**: Use platform support channels

## 🎉 Deployment Complete!

Your real estate platform is now live at:
- **Frontend**: https://your-frontend-url.com
- **Admin Panel**: https://your-admin-url.com
- **Backend API**: https://your-backend-url.com

### Next Steps:
1. Test all functionality
2. Set up custom domains (optional)
3. Configure analytics
4. Set up monitoring alerts
5. Create backup schedules

---

**Happy Deploying! 🚀** 