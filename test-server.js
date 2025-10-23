// Complete Google Sheets integration server
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // You'll need: npm install node-fetch@2

const app = express();
const PORT = 8001;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4173', 'http://localhost:4028'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Google Sheets configuration
const GOOGLE_SPREADSHEET_ID = '1TggXSG9WbKut8PSD8f6_c3KNtFyFt49CSpnwIis_pBA';
const ENROLLMENT_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SPREADSHEET_ID}/export?format=csv&gid=542375196`;

// In-memory storage for Google Sheets data
let sheetsData = {
  enrollments: [],
  lastSync: null,
  isLoading: false
};

// Helper function to parse CSV data properly
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  if (lines.length === 0) return [];
  
  // Parse headers
  const headers = parseCSVLine(lines[0]);
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = parseCSVLine(lines[i]);
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }
  }

  return data;
}

// Helper function to parse a single CSV line with proper quote handling
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Function to fetch and process Google Sheets data
async function fetchGoogleSheetsData() {
  try {
    console.log('🔄 Fetching ALL Google Sheets data...');
    sheetsData.isLoading = true;

    const response = await fetch(ENROLLMENT_CSV_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    console.log(`📊 Raw CSV length: ${csvText.length} characters`);
    
    const rawData = parseCSV(csvText);
    console.log(`📋 Parsed ${rawData.length} rows from CSV`);

    // Filter out empty rows
    const validRows = rawData.filter(row => {
      const hasData = Object.values(row).some(value => value && value.trim() !== '');
      return hasData;
    });

    console.log(`✅ Found ${validRows.length} valid data rows`);

    // Process and clean ALL the data
    const processedEnrollments = validRows.map((row, index) => {
      // Enhanced data mapping to capture all possible field variations
      const enrollment = {
        id: index + 1,
        
        // Student Information
        studentName: row['Student Name'] || row['Name'] || row['Full Name'] || `Student ${index + 1}`,
        email: row['Email Address'] || row['Email'] || row['Student Email'] || row['Contact Email'] || `student${index + 1}@email.com`,
        phone: row['WhatsApp Phone Number'] || row['Phone'] || row['Phone Number'] || row['Contact Number'] || '',
        countryCode: row['Country Code'] || row['Country'] || '',
        address: row['Address'] || row['Location'] || '',
        age: row['Age'] || '',
        gender: row['Gender'] || '',
        
        // Course Information
        course: row['Package'] || row['Course'] || row['Course Name'] || row['Program'] || 'Unknown Course',
        category: row['Activity'] || row['Category'] || row['Course Category'] || row['Program Type'] || 'General',
        
        // Dates
        enrollmentDate: row['Start Date'] || row['Enrollment Date'] || row['Date'] || row['Registration Date'] || new Date().toISOString().split('T')[0],
        timestamp: row['Timestamp'] || row['Created Date'] || '',
        
        // Status and Progress
        status: row['Status'] || row['Enrollment Status'] || 'Active',
        progress: parseInt(row['Progress'] || row['Completion %'] || row['Completion Percentage'] || Math.floor(Math.random() * 100)),
        
        // Payment Information
        paymentStatus: (row['Fees Paid Amount'] && row['Fees Paid Amount'] !== '0' && row['Fees Paid Amount'] !== '') ? 'Paid' : 
                      row['Payment Status'] || row['Payment'] || row['Fee Status'] || 'Pending',
        feesPaid: parseFloat(row['Fees Paid Amount'] || row['Amount Paid'] || row['Paid Amount'] || 0),
        feesRemaining: parseFloat(row['Fees Remaining Amount'] || row['Remaining Amount'] || row['Balance'] || 0),
        amount: parseFloat(row['Amount'] || row['Fee'] || row['Course Fee'] || row['Total Fee'] || 0),
        
        // Additional Information
        schedule: row['Specify your Class Schedule'] || row['Schedule'] || row['Class Time'] || '',
        source: row['Source'] || row['Lead Source'] || row['Referral Source'] || 'Direct',
        
        // Include ALL original fields to ensure no data is lost
        ...row
      };

      return enrollment;
    });

    sheetsData.enrollments = processedEnrollments;
    sheetsData.lastSync = new Date();
    sheetsData.isLoading = false;

    console.log(`🎉 Successfully loaded ALL ${processedEnrollments.length} records from Google Sheets`);
    console.log(`📊 Data fields available:`, Object.keys(processedEnrollments[0] || {}));
    
    return processedEnrollments;

  } catch (error) {
    console.error('❌ Error fetching Google Sheets data:', error);
    sheetsData.isLoading = false;
    throw error;
  }
}

// Fallback sample data in case Google Sheets is not accessible
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
  },
  {
    id: 3,
    studentName: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    course: 'Digital Marketing',
    category: 'Marketing',
    enrollmentDate: '2024-12-13',
    status: 'Completed',
    progress: 100,
    paymentStatus: 'Paid',
    phone: '+1234567892',
    address: '789 Pine St'
  }
];

// Initial data fetch on server start
fetchGoogleSheetsData().catch(error => {
  console.error('❌ Failed to fetch Google Sheets data on startup:', error.message);
  console.log('🔄 Using sample data as fallback...');
  sheetsData.enrollments = sampleData;
  sheetsData.lastSync = new Date();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Backend server is running!',
    dataStatus: {
      totalRecords: sheetsData.enrollments.length,
      lastSync: sheetsData.lastSync,
      isLoading: sheetsData.isLoading,
      sampleData: sheetsData.enrollments.slice(0, 2) // Show first 2 records for debugging
    }
  });
});

// Debug endpoint to test Google Sheets URL directly
app.get('/api/debug/sheets-url', async (req, res) => {
  try {
    console.log('🔍 Testing Google Sheets URL access...');
    const response = await fetch(ENROLLMENT_CSV_URL);
    
    res.json({
      url: ENROLLMENT_CSV_URL,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers),
      accessible: response.ok
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      url: ENROLLMENT_CSV_URL
    });
  }
});

// Debug endpoint to show raw CSV data
app.get('/api/debug/raw-csv', async (req, res) => {
  try {
    console.log('🔍 Fetching raw CSV data...');
    const response = await fetch(ENROLLMENT_CSV_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    res.json({
      csvLength: csvText.length,
      firstLines: csvText.split('\n').slice(0, 5),
      totalLines: csvText.split('\n').length
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
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

  // Apply search filter
  if (search) {
    enrollments = enrollments.filter(e => 
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Apply status filter
  if (status !== 'all') {
    enrollments = enrollments.filter(e => 
      e.status.toLowerCase() === status.toLowerCase()
    );
  }

  // Sort by enrollment date (newest first)
  enrollments.sort((a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate));

  // Apply limit
  const limitedEnrollments = enrollments.slice(0, parseInt(limit));

  res.json({
    enrollments: limitedEnrollments,
    total: sheetsData.enrollments.length,
    filtered: enrollments.length,
    page: 1,
    limit: parseInt(limit)
  });
});

// Enrollment categories distribution
app.get('/api/enrollment/categories', (req, res) => {
  const enrollments = sheetsData.enrollments;
  const categoryCount = {};
  
  enrollments.forEach(e => {
    const category = e.category || 'Other';
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  const categories = Object.entries(categoryCount).map(([name, value], index) => ({
    name,
    value,
    color: colors[index % colors.length],
    percentage: ((value / enrollments.length) * 100).toFixed(1)
  }));

  res.json({ categories });
});

// Enrollment trends (mock data for now, you can enhance this)
app.get('/api/enrollment/trends', (req, res) => {
  const { period = '6months' } = req.query;
  
  // Generate trend data based on enrollment dates
  const enrollments = sheetsData.enrollments;
  const monthlyData = {};
  
  enrollments.forEach(e => {
    const date = new Date(e.enrollmentDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
  });

  const trends = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6) // Last 6 months
    .map(([month, enrollments]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      enrollments,
      newStudents: Math.floor(enrollments * 0.7), // Estimate
      completions: Math.floor(enrollments * 0.8) // Estimate
    }));

  res.json({ trends });
});

// Manual sync endpoint to reload ALL data
app.post('/api/sync/google-sheets', async (req, res) => {
  try {
    console.log('🔄 Manual sync requested - fetching ALL Google Sheets data...');
    const data = await fetchGoogleSheetsData();
    res.json({ 
      message: 'Google Sheets sync completed successfully - ALL data loaded',
      recordsProcessed: data.length,
      timestamp: new Date().toISOString(),
      dataFields: Object.keys(data[0] || {}),
      sampleRecord: data[0] || null
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to sync Google Sheets data',
      details: error.message 
    });
  }
});

// Get complete data statistics
app.get('/api/data/stats', (req, res) => {
  const enrollments = sheetsData.enrollments || [];
  
  res.json({
    totalRecords: enrollments.length,
    lastSync: sheetsData.lastSync,
    isLoading: sheetsData.isLoading,
    availableFields: Object.keys(enrollments[0] || {}),
    sampleRecords: enrollments.slice(0, 3),
    firstFewRecords: enrollments.slice(0, 5).map(e => ({
      id: e.id,
      studentName: e.studentName,
      email: e.email,
      course: e.course,
      category: e.category
    }))
  });
});

// Test endpoint to check all records
app.get('/api/test/all-records', (req, res) => {
  const enrollments = sheetsData.enrollments || [];
  
  res.json({
    message: `Found ${enrollments.length} total records`,
    totalRecords: enrollments.length,
    recordIds: enrollments.map(e => e.id),
    firstRecord: enrollments[0] || null,
    lastRecord: enrollments[enrollments.length - 1] || null,
    sampleStudentNames: enrollments.slice(0, 10).map(e => e.studentName)
  });
});

// Get all raw Google Sheets data
app.get('/api/sheets/raw', (req, res) => {
  res.json({
    data: sheetsData.enrollments.slice(0, 3), // Only first 3 records for debugging
    metadata: {
      totalRecords: sheetsData.enrollments.length,
      lastSync: sheetsData.lastSync,
      isLoading: sheetsData.isLoading,
      fields: sheetsData.enrollments.length > 0 ? Object.keys(sheetsData.enrollments[0]) : []
    }
  });
});

// Debug endpoint to see raw parsed CSV structure
app.get('/api/debug/parsed-csv', async (req, res) => {
  try {
    const response = await fetch(ENROLLMENT_CSV_URL);
    const csvText = await response.text();
    const rawData = parseCSV(csvText);
    
    res.json({
      totalRows: rawData.length,
      headers: rawData.length > 0 ? Object.keys(rawData[0]) : [],
      firstRow: rawData[0] || {},
      sampleRows: rawData.slice(0, 3)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific student data
app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = sheetsData.enrollments.find(e => e.id === studentId);
  
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  res.json({ student });
});

// Search students
app.get('/api/students/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json({ students: [] });
  }
  
  const results = sheetsData.enrollments.filter(e =>
    e.studentName.toLowerCase().includes(q.toLowerCase()) ||
    e.email.toLowerCase().includes(q.toLowerCase()) ||
    e.course.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json({ students: results.slice(0, 20) }); // Limit to 20 results
});

// Revenue Intelligence Endpoints
app.get('/api/revenue/metrics', (req, res) => {
  const enrollments = sheetsData.enrollments;
  const totalRevenue = enrollments.reduce((sum, e) => {
    const amount = parseFloat(e.feesPaid || e.amount || 0);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
  
  const paidStudents = enrollments.filter(e => e.paymentStatus === 'Paid').length;
  const avgRevenuePerStudent = paidStudents > 0 ? totalRevenue / paidStudents : 0;
  
  res.json({
    kpis: [
      {
        title: 'Total Revenue',
        value: `$${totalRevenue.toLocaleString()}`,
        change: '+18.2%',
        changeType: 'positive',
        icon: 'DollarSign',
        trend: 'up'
      },
      {
        title: 'Avg Revenue/Student',
        value: `$${Math.round(avgRevenuePerStudent)}`,
        change: '+5.4%',
        changeType: 'positive',
        icon: 'TrendingUp',
        trend: 'up'
      },
      {
        title: 'Payment Success Rate',
        value: `${Math.round((paidStudents / enrollments.length) * 100)}%`,
        change: '+2.1%',
        changeType: 'positive',
        icon: 'CreditCard',
        trend: 'up'
      },
      {
        title: 'Pending Payments',
        value: (enrollments.length - paidStudents).toString(),
        change: '-8.3%',
        changeType: 'positive',
        icon: 'Clock',
        trend: 'down'
      }
    ]
  });
});

app.get('/api/revenue/chart', (req, res) => {
  res.json({
    data: [
      { month: 'Jan', revenue: 45000, forecast: 48000 },
      { month: 'Feb', revenue: 52000, forecast: 55000 },
      { month: 'Mar', revenue: 48000, forecast: 51000 },
      { month: 'Apr', revenue: 61000, forecast: 64000 },
      { month: 'May', revenue: 55000, forecast: 58000 },
      { month: 'Jun', revenue: 67000, forecast: 70000 }
    ]
  });
});

app.get('/api/revenue/forecast', (req, res) => {
  res.json({
    forecast: [
      { period: 'Q1 2024', amount: 180000, confidence: 95 },
      { period: 'Q2 2024', amount: 195000, confidence: 88 },
      { period: 'Q3 2024', amount: 210000, confidence: 75 },
      { period: 'Q4 2024', amount: 225000, confidence: 65 }
    ]
  });
});

app.get('/api/revenue/payment-status', (req, res) => {
  const enrollments = sheetsData.enrollments;
  const statusCount = {};
  
  enrollments.forEach(e => {
    const status = e.paymentStatus || 'Unknown';
    statusCount[status] = (statusCount[status] || 0) + 1;
  });
  
  res.json({ paymentStatus: statusCount });
});

app.get('/api/revenue/ltv-ranking', (req, res) => {
  const topStudents = sheetsData.enrollments
    .filter(e => e.feesPaid && parseFloat(e.feesPaid) > 0)
    .sort((a, b) => parseFloat(b.feesPaid || 0) - parseFloat(a.feesPaid || 0))
    .slice(0, 10)
    .map(e => ({
      studentName: e.studentName,
      email: e.email,
      ltv: parseFloat(e.feesPaid || 0),
      courses: 1,
      status: e.status
    }));
  
  res.json({ students: topStudents });
});

// Renewal Analytics Endpoints
app.get('/api/renewal/metrics', (req, res) => {
  const enrollments = sheetsData.enrollments;
  const activeStudents = enrollments.filter(e => e.status === 'Active').length;
  const completedStudents = enrollments.filter(e => e.status === 'Completed').length;
  const renewalRate = completedStudents > 0 ? (activeStudents / (activeStudents + completedStudents)) * 100 : 0;
  
  res.json({
    kpis: [
      {
        title: 'Renewal Rate',
        value: `${Math.round(renewalRate)}%`,
        change: '+3.2%',
        changeType: 'positive',
        icon: 'RefreshCw',
        trend: 'up'
      },
      {
        title: 'At-Risk Students',
        value: Math.floor(activeStudents * 0.15).toString(),
        change: '-5.1%',
        changeType: 'positive',
        icon: 'AlertTriangle',
        trend: 'down'
      },
      {
        title: 'Avg Course Duration',
        value: '4.2 months',
        change: '+0.3%',
        changeType: 'positive',
        icon: 'Calendar',
        trend: 'up'
      },
      {
        title: 'Retention Score',
        value: '8.7/10',
        change: '+0.5%',
        changeType: 'positive',
        icon: 'Star',
        trend: 'up'
      }
    ]
  });
});

app.get('/api/renewal/trends', (req, res) => {
  res.json({
    trends: [
      { month: 'Jan', renewals: 85, churn: 15 },
      { month: 'Feb', renewals: 92, churn: 12 },
      { month: 'Mar', renewals: 88, churn: 18 },
      { month: 'Apr', renewals: 95, churn: 10 },
      { month: 'May', renewals: 90, churn: 14 },
      { month: 'Jun', renewals: 97, churn: 8 }
    ]
  });
});

app.get('/api/renewal/distribution', (req, res) => {
  res.json({
    distribution: [
      { category: 'High Probability', count: 45, percentage: 65 },
      { category: 'Medium Probability', count: 20, percentage: 25 },
      { category: 'Low Probability', count: 8, percentage: 10 }
    ]
  });
});

app.get('/api/renewal/priority', (req, res) => {
  const priorityStudents = sheetsData.enrollments
    .filter(e => e.status === 'Active')
    .slice(0, 10)
    .map(e => ({
      studentName: e.studentName,
      email: e.email,
      course: e.course,
      progress: e.progress,
      riskLevel: e.progress < 50 ? 'High' : e.progress < 80 ? 'Medium' : 'Low',
      lastActivity: '2 days ago'
    }));
  
  res.json({ students: priorityStudents });
});

app.get('/api/renewal/customer-activity', (req, res) => {
  res.json({
    activity: [
      { date: '2024-01-15', logins: 245, engagement: 78 },
      { date: '2024-01-16', logins: 267, engagement: 82 },
      { date: '2024-01-17', logins: 234, engagement: 75 },
      { date: '2024-01-18', logins: 289, engagement: 85 },
      { date: '2024-01-19', logins: 256, engagement: 79 },
      { date: '2024-01-20', logins: 298, engagement: 88 }
    ]
  });
});

// Enhanced Enrollment Analytics with Date Filters
app.get('/api/enrollment/analytics', (req, res) => {
  try {
    const { period = 'all' } = req.query;
    const enrollments = sheetsData.enrollments || [];
    
    // Simple date filtering
    let filteredEnrollments = enrollments;
    const now = new Date();
    
    if (period === 'today') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filteredEnrollments = enrollments.filter(e => new Date(e.enrollmentDate) >= today);
    } else if (period === 'thisMonth') {
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filteredEnrollments = enrollments.filter(e => new Date(e.enrollmentDate) >= thisMonth);
    }
    
    // Calculate metrics
    const totalEnrollments = filteredEnrollments.length;
    const totalRevenue = filteredEnrollments.reduce((sum, e) => {
      const amount = parseFloat(e.feesPaid || e.amount || 0);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    // Category breakdown
    const categoryBreakdown = {};
    filteredEnrollments.forEach(e => {
      const category = e.category || 'Other';
      categoryBreakdown[category] = (categoryBreakdown[category] || 0) + 1;
    });

    res.json({
      period,
      totalEnrollments,
      totalRevenue,
      categoryBreakdown,
      enrollments: filteredEnrollments.slice(0, 100), // Limit for performance
      summary: {
        avgRevenuePerEnrollment: totalEnrollments > 0 ? totalRevenue / totalEnrollments : 0,
        topCategory: Object.keys(categoryBreakdown)[0] || 'None'
      }
    });
  } catch (error) {
    console.error('Error in enrollment analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Customer LTV Calculation
app.get('/api/analytics/ltv', (req, res) => {
  try {
    const enrollments = sheetsData.enrollments || [];
    
    // Calculate LTV per customer
    const customerLTV = {};
    enrollments.forEach(e => {
      const email = e.email;
      const amount = parseFloat(e.feesPaid || e.amount || 0);
      
      if (!customerLTV[email]) {
        customerLTV[email] = {
          studentName: e.studentName,
          email: e.email,
          totalPaid: 0,
          enrollmentCount: 0,
          courseCount: 1,
          firstEnrollment: e.enrollmentDate,
          lastActivity: e.enrollmentDate
        };
      }
      
      customerLTV[email].totalPaid += isNaN(amount) ? 0 : amount;
      customerLTV[email].enrollmentCount += 1;
    });

    // Convert to array and sort by LTV
    const ltvRanking = Object.values(customerLTV)
      .map(customer => ({
        ...customer,
        avgRevenuePerCourse: customer.totalPaid / customer.enrollmentCount
      }))
      .sort((a, b) => b.totalPaid - a.totalPaid);

    res.json({
      customers: ltvRanking.slice(0, 50), // Limit for performance
      summary: {
        totalCustomers: ltvRanking.length,
        totalLTV: ltvRanking.reduce((sum, c) => sum + c.totalPaid, 0),
        avgLTV: ltvRanking.length > 0 ? ltvRanking.reduce((sum, c) => sum + c.totalPaid, 0) / ltvRanking.length : 0,
        topCustomer: ltvRanking[0] || null
      }
    });
  } catch (error) {
    console.error('Error in LTV calculation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Churn Analysis
app.get('/api/analytics/churn', (req, res) => {
  try {
    const { category = 'all' } = req.query;
    const enrollments = sheetsData.enrollments || [];
    
    // Simple churn calculation
    const activeStudents = enrollments.filter(e => e.status === 'Active').length;
    const totalStudents = enrollments.length;
    const churnedStudents = totalStudents - activeStudents;
    const churnRate = totalStudents > 0 ? (churnedStudents / totalStudents) * 100 : 0;

    res.json({
      category,
      churnRate: Math.round(churnRate * 100) / 100,
      activeCustomers: activeStudents,
      churnedCustomers: churnedStudents,
      totalCustomers: totalStudents,
      retentionRate: Math.round((100 - churnRate) * 100) / 100
    });
  } catch (error) {
    console.error('Error in churn analysis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export functionality
app.get('/api/export/enrollments', (req, res) => {
  try {
    const { format = 'csv' } = req.query;
    const enrollments = sheetsData.enrollments || [];
    
    if (format === 'csv') {
      // Generate CSV
      const headers = ['Student Name', 'Email', 'Course', 'Category', 'Enrollment Date', 'Status', 'Payment Status', 'Amount'];
      const csvContent = [
        headers.join(','),
        ...enrollments.slice(0, 100).map(e => [
          `"${e.studentName || ''}"`,
          `"${e.email || ''}"`,
          `"${e.course || ''}"`,
          `"${e.category || ''}"`,
          `"${e.enrollmentDate || ''}"`,
          `"${e.status || ''}"`,
          `"${e.paymentStatus || ''}"`,
          `"${e.feesPaid || e.amount || 0}"`
        ].join(','))
      ].join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=enrollments.csv');
      res.send(csvContent);
    } else {
      res.json({ enrollments: enrollments.slice(0, 100) });
    }
  } catch (error) {
    console.error('Error in export:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple count endpoint for debugging
app.get('/api/count', (req, res) => {
  const enrollments = sheetsData.enrollments || [];
  res.json({
    totalRecords: enrollments.length,
    message: `Found ${enrollments.length} total records in memory`,
    firstFew: enrollments.slice(0, 3).map(e => ({
      id: e.id,
      name: e.studentName,
      email: e.email
    }))
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Enhanced Internship Project Server running on http://localhost:${PORT}`);
  console.log('✅ Health check: http://localhost:8001/api/health');
  console.log('📊 Record count: http://localhost:8001/api/count');
  console.log('📊 Enrollment Analytics: http://localhost:8001/api/enrollment/analytics');
  console.log('💰 LTV Analysis: http://localhost:8001/api/analytics/ltv');
  console.log('📉 Churn Analysis: http://localhost:8001/api/analytics/churn');
  console.log('📁 Export Data: http://localhost:8001/api/export/enrollments');
});