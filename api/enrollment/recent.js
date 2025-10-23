// Vercel serverless function for recent enrollments
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { limit = 50, search = '', status = 'all' } = req.query;

    // Sample data - replace with Google Sheets integration
    const sampleEnrollments = [
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

    let enrollments = [...sampleEnrollments];

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

    // Sort by enrollment date
    enrollments.sort((a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate));
    
    // Apply limit
    const limitedEnrollments = enrollments.slice(0, parseInt(limit));

    res.status(200).json({
      enrollments: limitedEnrollments,
      total: sampleEnrollments.length,
      filtered: enrollments.length,
      page: 1,
      limit: parseInt(limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}