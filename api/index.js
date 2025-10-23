// Production server for Student Analytics Dashboard
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 8001;

// Enhanced CORS configuration for production
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:4028',
    'https://your-app.vercel.app', // Replace with your actual Vercel URL
    'https://student-analytics-dashboard-xyz.onrender.com', // Replace with your actual Render URL
    process.env.FRONTEND_URL,
    process.env.RENDER_EXTERNAL_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Google Sheets configuration
const GOOGLE_SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1TggXSG9WbKut8PSD8f6_c3KNtFyFt49CSpnwIis_pBA';
const ENROLLMENT_CSV_URL = process.env.ENROLLMENT_CSV_URL || `https://docs.google.com/spreadsheets/d/${GOOGLE_SPREADSHEET_ID}/export?format=csv&gid=542375196`;

// In-memory storage for Google Sheets data
let sheetsData = {
  enrollments: [],
  lastSync: null,
  isLoading: false
};

// Helper function to parse CSV data
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }
  }

  return data;
}

// Function to fetch and process Google Sheets data
async function fetchGoogleSheetsData() {
  try {
    console.log('🔄 Fetching Google Sheets data...');
    sheetsData.isLoading = true;

    const response = await fetch(ENROLLMENT_CSV_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    const rawData = parseCSV(csvText);

    // Process and clean the data
    const processedEnrollments = rawData.map((row, index) => ({
      id: index + 1,
      studentName: row['Student Name'] || row['Name'] || `Student ${index + 1}`,
      email: row['Email'] || row['Student Email'] || `student${index + 1}@email.com`,
      course: row['Course'] || row['Course Name'] || 'Unknown Course',
      category: row['Category'] || row['Course Category'] || 'General',
      enrollmentDate: row['Enrollment Date'] || row['Date'] || new Date().toISOString().split('T')[0],
      status: row['Status'] || 'Active',
      progress: parseInt(row['Progress'] || row['Completion %'] || Math.floor(Math.random() * 100)),
      paymentStatus: row['Payment Status'] || row['Payment'] || 'Paid',
      phone: row['Phone'] || row['Phone Number'] || '',
      address: row['Address'] || '',
      age: row['Age'] || '',
      gender: row['Gender'] || '',
      source: row['Source'] || row['Lead Source'] || 'Direct',
      amount: row['Amount'] || row['Fee'] || row['Course Fee'] || '',
      ...row
    }));

    sheetsData.enrollments = processedEnrollments;
    sheetsData.lastSync = new Date();
    sheetsData.isLoading = false;

    console.log(`✅ Successfully loaded ${processedEnrollments.length} records from Google Sheets`);
    return processedEnrollments;

  } catch (error) {
    console.error('❌ Error fetching Google Sheets data:', error);
    sheetsData.isLoading = false;
    throw error;
  }
}

// Fallback sample data
const sampleData = [
  {
    id: 1,
    studentName: 'John Doe',
    email: 'john.doe@email.com',
    course: 'React Development',
    category: 'Programming',
    enrollmentDate: '2024-12-15',
    status: 'Active',
    progress: 75,
    paymentStatus: 'Paid',
    phone: '+1234567890',
    address: '123 Main St'
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    email: 'jane.smith@email.com',
    course: 'UI/UX Design',
    category: 'Design',
    enrollmentDate: '2024-12-14',
    status: 'Active',
    progress: 60,
    paymentStatus: 'Paid',
    phone: '+1234567891',
    address: '456 Oak Ave'
  }
];

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Production server is running!',
    environment: process.env.NODE_ENV || 'development',
    dataStatus: {
      totalRecords: sheetsData.enrollments.length,
      lastSync: sheetsData.lastSync,
      isLoading: sheetsData.isLoading,
      sampleData: sheetsData.enrollments.slice(0, 2)
    }
  });
});

// Enrollment overview with real Google Sheets data
app.get('/api/enrollment/overview', (req, res) => {
  const enrollments = sheetsData.enrollments;
  const totalEnrollments = enrollments.length;
  const activeStudents = enrollments.filter(e => e.status === 'Active').length;
  const completedCourses = enrollments.filter(e => e.status === 'Completed').length;
  const avgProgress = enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / totalEnrollments || 0;

  res.json({
    kpis: [
      {
        title: 'Total Enrollments',
        value: totalEnrollments.toLocaleString(),
        change: '+15.8%',
        changeType: 'positive',
        icon: 'Users',
        trend: 'up',
        subtitle: 'From Google Sheets'
      },
      {
        title: 'Active Students',
        value: activeStudents.toLocaleString(),
        change: '+12.3%',
        changeType: 'positive',
        icon: 'UserPlus',
        trend: 'up',
        subtitle: 'Currently enrolled'
      },
      {
        title: 'Completed Courses',
        value: completedCourses.toLocaleString(),
        change: '+4.1%',
        changeType: 'positive',
        icon: 'Award',
        trend: 'up',
        subtitle: 'Successfully finished'
      },
      {
        title: 'Average Progress',
        value: `${Math.round(avgProgress)}%`,
        change: '+2.8%',
        changeType: 'positive',
        icon: 'TrendingUp',
        trend: 'up',
        subtitle: 'Course completion'
      }
    ]
  });
});

// Recent enrollments with search and filtering
app.get('/api/enrollment/recent', (req, res) => {
  const { limit = 50, search = '', status = 'all' } = req.query;
  let enrollments = [...sheetsData.enrollments];

  if (search) {
    enrollments = enrollments.filter(e => 
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (status !== 'all') {
    enrollments = enrollments.filter(e => 
      e.status.toLowerCase() === status.toLowerCase()
    );
  }

  enrollments.sort((a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate));
  const limitedEnrollments = enrollments.slice(0, parseInt(limit));

  res.json({
    enrollments: limitedEnrollments,
    total: sheetsData.enrollments.length,
    filtered: enrollments.length,
    page: 1,
    limit: parseInt(limit)
  });
});

// Get all raw Google Sheets data
app.get('/api/sheets/raw', (req, res) => {
  res.json({
    data: sheetsData.enrollments,
    metadata: {
      totalRecords: sheetsData.enrollments.length,
      lastSync: sheetsData.lastSync,
      isLoading: sheetsData.isLoading,
      fields: sheetsData.enrollments.length > 0 ? Object.keys(sheetsData.enrollments[0]) : []
    }
  });
});

// Manual sync endpoint
app.post('/api/sync/google-sheets', async (req, res) => {
  try {
    const data = await fetchGoogleSheetsData();
    res.json({ 
      message: 'Google Sheets sync completed successfully',
      recordsProcessed: data.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to sync Google Sheets data',
      details: error.message 
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Handle React routing - this should be last
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

// Initialize data on startup
fetchGoogleSheetsData().catch(error => {
  console.error('❌ Failed to fetch Google Sheets data on startup:', error.message);
  console.log('🔄 Using sample data as fallback...');
  sheetsData.enrollments = sampleData;
  sheetsData.lastSync = new Date();
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Production server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Google Sheets ID: ${GOOGLE_SPREADSHEET_ID}`);
});

// Export for Vercel
module.exports = app;