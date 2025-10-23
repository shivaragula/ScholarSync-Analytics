# 🔧 Troubleshooting Guide

## No Results Showing - Step by Step Fix

### Step 1: Check Backend Server Status

1. **Is the server running?**
   ```bash
   node test-server.js
   ```
   You should see:
   ```
   🚀 Test server running on http://localhost:8001
   🔄 Fetching Google Sheets data...
   ```

2. **Test the health endpoint directly:**
   Open in browser: `http://localhost:8001/api/health`
   
   Should return JSON with server status and data info.

### Step 2: Test Google Sheets Access

1. **Test the debug endpoint:**
   Open: `http://localhost:8001/api/debug/sheets-url`
   
   This will show if the Google Sheets URL is accessible.

2. **Test raw CSV data:**
   Open: `http://localhost:8001/api/debug/raw-csv`
   
   This will show the actual CSV data from Google Sheets.

3. **Test the Google Sheets URL directly:**
   Open: `https://docs.google.com/spreadsheets/d/1TggXSG9WbKut8PSD8f6_c3KNtFyFt49CSpnwIis_pBA/export?format=csv&gid=542375196`
   
   Should download a CSV file with your data.

### Step 3: Check React App Connection

1. **Open browser developer tools** (F12)
2. **Go to Console tab** - look for error messages
3. **Go to Network tab** - check if API calls are being made
4. **Navigate to Google Sheets tab** in your app
5. **Click "Run Tests"** in the API Test Panel

### Step 4: Common Issues & Solutions

#### Issue: "Backend Connection Unavailable"
**Solution:** 
- Make sure backend server is running on port 8001
- Check if another app is using port 8001
- Try restarting the backend server

#### Issue: "Failed to fetch Google Sheets data"
**Solutions:**
1. **Check Google Sheets permissions:**
   - Make sure the sheet is publicly viewable
   - Try opening the CSV URL in an incognito browser window

2. **Check the sheet ID and GID:**
   - Verify the spreadsheet ID in the URL
   - Check if the GID (sheet tab ID) is correct

3. **Network issues:**
   - Check your internet connection
   - Try accessing Google Sheets directly

#### Issue: "No data found" but API works
**Solutions:**
1. **Check CSV format:**
   - Ensure your Google Sheet has headers in the first row
   - Common headers: "Student Name", "Email", "Course", "Status"

2. **Check data parsing:**
   - Look at the raw CSV data in debug endpoint
   - Verify column names match expected format

### Step 5: Manual Testing Commands

Run these in your terminal to test the backend:

```bash
# Test if node-fetch is installed
npm list node-fetch

# Install if missing
npm install node-fetch@2

# Test Google Sheets access
node debug-sheets.js

# Check server logs
node test-server.js
```

### Step 6: Expected Data Flow

1. **Google Sheets** → CSV Export URL
2. **Backend Server** → Fetches CSV → Parses Data → Stores in Memory
3. **React App** → Calls API → Displays Data

### Step 7: Debugging Checklist

- [ ] Backend server running on port 8001
- [ ] Google Sheets URL accessible
- [ ] CSV data contains valid headers
- [ ] React app can reach backend API
- [ ] Browser console shows no errors
- [ ] Network tab shows successful API calls

### Step 8: Quick Fix - Use Sample Data

If Google Sheets is not accessible, the server will automatically use sample data. You should still see 3 sample records in the dashboard.

### Step 9: Get Help

If still not working, check:

1. **Browser Console Errors:** F12 → Console tab
2. **Network Requests:** F12 → Network tab → Look for failed requests
3. **Server Logs:** Check terminal where you ran `node test-server.js`

### Step 10: Reset Everything

If all else fails:

1. **Stop the backend server** (Ctrl+C)
2. **Restart it:** `node test-server.js`
3. **Refresh the React app**
4. **Clear browser cache** (Ctrl+Shift+R)
5. **Check the API Test Panel** in Google Sheets tab

The API Test Panel will show you exactly what's working and what's not! 🔍