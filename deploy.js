#!/usr/bin/env node

// Simple deployment script
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting deployment process...');

// Step 1: Build the React app
console.log('📦 Building React app...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ React app built successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Check if dist folder exists
if (!fs.existsSync('dist')) {
  console.error('❌ Build folder (dist) not found!');
  process.exit(1);
}

console.log('✅ Build folder created successfully!');

// Step 3: Instructions for deployment
console.log('\n🎯 Deployment Options:');
console.log('\n1. VERCEL (Recommended):');
console.log('   npm install -g vercel');
console.log('   vercel --prod');

console.log('\n2. NETLIFY:');
console.log('   - Go to netlify.com');
console.log('   - Drag & drop the "dist" folder');

console.log('\n3. HEROKU:');
console.log('   git add .');
console.log('   git commit -m "Deploy to production"');
console.log('   git push heroku main');

console.log('\n📋 Don\'t forget to:');
console.log('   - Set environment variables in your hosting platform');
console.log('   - Update CORS origins in server.js');
console.log('   - Test the deployed app');

console.log('\n🎉 Ready for deployment!');