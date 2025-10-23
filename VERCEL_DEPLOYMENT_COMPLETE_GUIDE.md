# 🚀 Complete Vercel Deployment Guide - ScholarSync Analytics

## 📋 Overview

This guide will help you deploy your **ScholarSync Analytics** project to Vercel with both frontend and backend functionality.

**Repository**: https://github.com/shivaragula/ScholarSync-Analytics

## 🎯 What We're Deploying

- ✅ **React Frontend** (Student Dashboard)
- ✅ **Node.js Backend** (API Server as Serverless Functions)
- ✅ **Google Sheets Integration** (Real-time data)
- ✅ **Environment Configuration** (Production settings)

---

## 📝 Step 1: Prepare for Vercel Deployment

### 1.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Verify your email address

### 1.2 Update Vercel Configuration

Let me create an optimized `vercel.json` for your project:

```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci",
  "functions": {
    "api/index.js": {
      "runtime": "nodejs18.x"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

## 🚀 Step 2: Deploy Using Vercel Dashboard (Recommended)

### 2.1 Connect GitHub Repository

1. **Login to Vercel Dashboard**
   - Go to https://vercel.com/dashboard
   - Click "New Project"

2. **Import Git Repository**
   - Click "Import Git Repository"
   - Select your GitHub account
   - Find "ScholarSync-Analytics" repository
   - Click "Import"

### 2.2 Configure Project Settings

**Framework Preset**: `Vite`
**Root Directory**: `.` (leave empty)
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm ci`

### 2.3 Set Environment Variables

In the Vercel dashboard, add these environment variables:

```bash
# Required Environment Variables
NODE_ENV=production
VITE_API_BASE_URL=https://your-project-name.vercel.app
VITE_GOOGLE_SPREADSHEET_ID=1TggXSG9WbKut8PSD8f6_c3KNtFyFt49CSpnwIis_pBA
VITE_ENROLLMENT_CSV_URL=https://docs.google.com/spreadsheets/d/1TggXSG9WbKut8PSD8f6_c3KNtFyFt49CSpnwIis_pBA/export?format=csv&gid=542375196

# Optional (if using MongoDB)
VITE_MONGODB_URI=your_mongodb_connection_string
```

**⚠️ Important**: Replace `your-project-name` with your actual Vercel project name.

### 2.4 Deploy

1. Click "Deploy"
2. Wait for the build to complete (2-3 minutes)
3. Your project will be live at `https://your-project-name.vercel.app`

---

## 🛠️ Step 3: Deploy Using Vercel CLI (Alternative)

### 3.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 3.2 Login to Vercel

```bash
vercel login
```

### 3.3 Deploy from Your Project Directory

```bash
# Navigate to your project
cd Student-Dashboard-main

# Deploy to Vercel
vercel

# Follow the prompts:
# ? Set up and deploy "~/Student-Dashboard-main"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? scholarsync-analytics
# ? In which directory is your code located? ./
```

### 3.4 Set Environment Variables via CLI

```bash
# Set production environment variables
vercel env add VITE_API_BASE_URL production
# Enter: https://scholarsync-analytics.vercel.app

vercel env add VITE_GOOGLE_SPREADSHEET_ID production
# Enter: 1TggXSG9WbKut8PSD8f6_c3KNtFyFt49CSpnwIis_pBA

vercel env add VITE_ENROLLMENT_CSV_URL production
# Enter: https://docs.google.com/spreadsheets/d/1TggXSG9WbKut8PSD8f6_c3KNtFyFt49CSpnwIis_pBA/export?format=csv&gid=542375196
```

### 3.5 Deploy to Production

```bash
vercel --prod
```

---

## 🔧 Step 4: Configure Backend API for Vercel

### 4.1 Create Serverless API Function

Vercel will automatically detect your `api/index.js` file. Make sure it exists:

```javascript
// api/index.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// CORS configuration for Vercel
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Your existing API routes here...
// (Copy from your test-server.js)

module.exports = app;
```

### 4.2 Update Package.json for Vercel

Ensure your `package.json` has the correct scripts:

```json
{
  "scripts": {
    "build": "vite build",
    "start": "vite preview",
    "dev": "vite",
    "server": "node server.js",
    "vercel-build": "npm run build"
  }
}
```

---

## 🌐 Step 5: Verify Deployment

### 5.1 Check Your Live Site

1. **Visit your Vercel URL**: `https://your-project-name.vercel.app`
2. **Test all features**:
   - ✅ Dashboard loads correctly
   - ✅ Google Sheets data displays
   - ✅ Charts and visualizations work
   - ✅ Search and filtering functions
   - ✅ Export functionality works

### 5.2 Test API Endpoints

Visit these URLs to test your API:
- `https://your-project-name.vercel.app/api/health`
- `https://your-project-name.vercel.app/api/enrollment/overview`
- `https://your-project-name.vercel.app/api/enrollment/recent`

### 5.3 Check Browser Console

1. Open Developer Tools (F12)
2. Check Console tab for any errors
3. Verify API calls are successful

---

## 🔄 Step 6: Set Up Automatic Deployments

### 6.1 GitHub Integration

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update dashboard features"
git push origin main

# Vercel will automatically deploy the changes
```

### 6.2 Preview Deployments

- **Every push** to any branch creates a preview deployment
- **Main branch** pushes deploy to production
- **Pull requests** get their own preview URLs

---

## 🐛 Step 7: Troubleshooting Common Issues

### 7.1 Build Errors

**Error**: `Module not found`
**Solution**: 
```bash
# Ensure all dependencies are in package.json
npm install --save missing-package-name
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
```

### 7.2 API Connection Issues

**Error**: API calls failing
**Solution**:
1. Check environment variables in Vercel dashboard
2. Ensure `VITE_API_BASE_URL` matches your Vercel domain
3. Verify CORS settings in your API

### 7.3 Google Sheets Access

**Error**: No data loading
**Solution**:
1. Verify Google Sheet is publicly viewable
2. Test CSV URL directly in browser
3. Check spreadsheet ID is correct

### 7.4 Environment Variables Not Working

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Ensure all variables are set for "Production"
3. Redeploy after adding variables

---

## 📊 Step 8: Performance Optimization

### 8.1 Enable Analytics

1. Go to Vercel Dashboard → Your Project → Analytics
2. Enable Web Analytics
3. Monitor performance metrics

### 8.2 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS settings

### 8.3 Caching Configuration

Add to your `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=60, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

---

## 🎯 Step 9: Final Checklist

### ✅ Pre-Deployment Checklist

- [ ] GitHub repository is up to date
- [ ] All environment variables are configured
- [ ] Google Sheets is publicly accessible
- [ ] `vercel.json` is properly configured
- [ ] API endpoints are working locally

### ✅ Post-Deployment Checklist

- [ ] Site loads correctly at Vercel URL
- [ ] All dashboard features work
- [ ] Google Sheets data displays
- [ ] API endpoints respond correctly
- [ ] No console errors
- [ ] Mobile responsiveness works

---

## 🚀 Your Live URLs

After successful deployment, you'll have:

- **Production URL**: `https://your-project-name.vercel.app`
- **API Base URL**: `https://your-project-name.vercel.app/api`
- **GitHub Repository**: `https://github.com/shivaragula/ScholarSync-Analytics`

---

## 📞 Support & Next Steps

### 🔗 Useful Links

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Deployment Guide**: https://vitejs.dev/guide/static-deploy.html
- **Your Vercel Dashboard**: https://vercel.com/dashboard

### 🎯 Next Steps After Deployment

1. **Share Your Project**:
   - Add live URL to your resume
   - Share on LinkedIn
   - Include in portfolio

2. **Monitor Performance**:
   - Check Vercel Analytics
   - Monitor API response times
   - Track user engagement

3. **Continuous Improvement**:
   - Add new features
   - Optimize performance
   - Gather user feedback

---

**🎉 Congratulations! Your ScholarSync Analytics project is now live on Vercel!**

**Live Demo**: `https://your-project-name.vercel.app`