# Backend Integration Setup

This guide will help you set up the backend server to work with your React dashboard.

## Backend Server Requirements

Your backend server should run on `http://localhost:8001` and provide the following API endpoints:

### Health Check
- `GET /api/health` - Returns server status

### Enrollment Endpoints
- `GET /api/enrollment/overview` - Returns KPI data
- `GET /api/enrollment/trends?period=6months` - Returns trend data
- `GET /api/enrollment/categories` - Returns category distribution
- `GET /api/enrollment/recent?limit=50&search=&status=all` - Returns recent enrollments

### Revenue Endpoints
- `GET /api/revenue/metrics` - Returns revenue KPIs
- `GET /api/revenue/chart?period=6months` - Returns revenue chart data
- `GET /api/revenue/forecast` - Returns forecast data
- `GET /api/revenue/payment-status` - Returns payment status data
- `GET /api/revenue/ltv-ranking` - Returns LTV ranking data

### Renewal Analytics Endpoints
- `GET /api/renewal/metrics` - Returns renewal KPIs
- `GET /api/renewal/trends?period=6months` - Returns renewal trends
- `GET /api/renewal/distribution` - Returns renewal distribution
- `GET /api/renewal/priority` - Returns priority renewals
- `GET /api/renewal/customer-activity` - Returns customer activity

### Data Sync
- `POST /api/sync/google-sheets` - Triggers Google Sheets sync

## Expected Data Formats

### Enrollment Overview Response
```json
{
  "kpis": [
    {
      "title": "Total Enrollments",
      "value": "2,847",
      "change": "+12.5%",
      "changeType": "positive",
      "icon": "Users",
      "trend": "up",
      "subtitle": "This month"
    }
  ]
}
```

### Recent Enrollments Response
```json
{
  "enrollments": [
    {
      "id": 1,
      "studentName": "Sarah Johnson",
      "email": "sarah.johnson@email.com",
      "course": "React Development Bootcamp",
      "category": "Programming",
      "enrollmentDate": "2024-12-15",
      "status": "Active",
      "progress": 75,
      "paymentStatus": "Paid"
    }
  ]
}
```

## Environment Variables

Make sure your backend uses these environment variables:

```env
MONGODB_URI=mongodb+srv://ShivaRagula:Shiva_power_29%40@cluster0.6igmpow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
GOOGLE_SPREADSHEET_ID=1TggXSG9WbKut8PSD8f6_c3KNtFyFt49CSpnwIis_pBA
ENROLLMENT_CSV_URL=https://docs.google.com/spreadsheets/d/1TggXSG9WbKut8PSD8f6_c3KNtFyFt49CSpnwIis_pBA/export?format=csv&gid=542375196
PORT=8001
NODE_ENV=production
```

## Quick Start Backend Server (Node.js/Express)

If you need a quick backend server, here's a minimal setup:

```javascript
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Example enrollment overview endpoint
app.get('/api/enrollment/overview', async (req, res) => {
  try {
    // Connect to MongoDB and fetch real data
    // For now, return sample data
    res.json({
      kpis: [
        {
          title: 'Total Enrollments',
          value: '2,847',
          change: '+12.5%',
          changeType: 'positive',
          icon: 'Users',
          trend: 'up',
          subtitle: 'This month'
        }
        // Add more KPIs...
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Fallback Behavior

The React app is designed to work with or without the backend:

1. **With Backend**: Fetches real data from your APIs
2. **Without Backend**: Uses fallback data and shows connection errors
3. **Backend Down**: Gracefully degrades to cached/fallback data

## Testing the Integration

1. Start your backend server on port 8001
2. Start the React app with `npm start`
3. Check the DataSyncIndicator in the top-right corner:
   - 🟢 Green "Live" = Backend connected
   - 🔴 Red "Error" = Backend not available
4. Open browser dev tools to see API calls and any errors

## Google Sheets Integration

Your backend should:
1. Fetch data from the Google Sheets CSV URL
2. Parse and store it in MongoDB
3. Provide the `/api/sync/google-sheets` endpoint to trigger manual syncs
4. Optionally set up automatic syncing (e.g., every hour)

The CSV URL provided will give you the enrollment data in CSV format that you can parse and store in your MongoDB database.