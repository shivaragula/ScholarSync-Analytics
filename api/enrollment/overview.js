// Vercel serverless function for enrollment overview
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
    // Sample data for now - you can integrate with Google Sheets later
    const kpis = [
      {
        title: 'Total Enrollments',
        value: '1,234',
        change: '+15.8%',
        changeType: 'positive',
        icon: 'Users',
        trend: 'up',
        subtitle: 'From Google Sheets'
      },
      {
        title: 'Active Students',
        value: '987',
        change: '+12.3%',
        changeType: 'positive',
        icon: 'UserPlus',
        trend: 'up',
        subtitle: 'Currently enrolled'
      },
      {
        title: 'Completed Courses',
        value: '156',
        change: '+4.1%',
        changeType: 'positive',
        icon: 'Award',
        trend: 'up',
        subtitle: 'Successfully finished'
      },
      {
        title: 'Average Progress',
        value: '73%',
        change: '+2.8%',
        changeType: 'positive',
        icon: 'TrendingUp',
        trend: 'up',
        subtitle: 'Course completion'
      }
    ];

    res.status(200).json({ kpis });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}