// Mock data that matches the expected API response format
// This serves as documentation for your backend API responses

export const mockEnrollmentOverview = {
  kpis: [
    {
      title: 'Total Enrollments',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      trend: 'up',
      subtitle: 'This month'
    },
    {
      title: 'New Students',
      value: '485',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'UserPlus',
      trend: 'up',
      subtitle: 'This month'
    },
    {
      title: 'Course Completion',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'Award',
      trend: 'up',
      subtitle: 'Average rate'
    },
    {
      title: 'Revenue per Student',
      value: '$485',
      change: '-1.2%',
      changeType: 'negative',
      icon: 'DollarSign',
      trend: 'down',
      subtitle: 'Average'
    }
  ]
};

export const mockEnrollmentTrends = {
  trends: [
    { month: 'Jul 2024', enrollments: 485, newStudents: 142, completions: 398 },
    { month: 'Aug 2024', enrollments: 520, newStudents: 156, completions: 425 },
    { month: 'Sep 2024', enrollments: 565, newStudents: 178, completions: 462 },
    { month: 'Oct 2024', enrollments: 598, newStudents: 189, completions: 485 },
    { month: 'Nov 2024', enrollments: 642, newStudents: 201, completions: 512 },
    { month: 'Dec 2024', enrollments: 685, newStudents: 218, completions: 548 }
  ]
};

export const mockEnrollmentCategories = {
  categories: [
    { name: 'Programming', value: 1247, color: '#3b82f6', percentage: 43.8 },
    { name: 'Design', value: 856, color: '#10b981', percentage: 30.1 },
    { name: 'Business', value: 485, color: '#f59e0b', percentage: 17.0 },
    { name: 'Marketing', value: 259, color: '#ef4444', percentage: 9.1 }
  ]
};

export const mockRecentEnrollments = {
  enrollments: [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      course: 'React Development Bootcamp',
      category: 'Programming',
      enrollmentDate: '2024-12-15',
      status: 'Active',
      progress: 75,
      paymentStatus: 'Paid'
    },
    {
      id: 2,
      studentName: 'Michael Chen',
      email: 'michael.chen@email.com',
      course: 'UI/UX Design Fundamentals',
      category: 'Design',
      enrollmentDate: '2024-12-14',
      status: 'Active',
      progress: 45,
      paymentStatus: 'Paid'
    },
    {
      id: 3,
      studentName: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      course: 'Digital Marketing Strategy',
      category: 'Marketing',
      enrollmentDate: '2024-12-13',
      status: 'Completed',
      progress: 100,
      paymentStatus: 'Paid'
    }
  ],
  total: 2847,
  page: 1,
  limit: 50
};

export const mockRevenueMetrics = {
  metrics: [
    {
      title: 'Total Revenue',
      value: '$1,247,500',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'DollarSign',
      trend: 'up',
      subtitle: 'This month'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '$89,250',
      change: '+8.7%',
      changeType: 'positive',
      icon: 'TrendingUp',
      trend: 'up',
      subtitle: 'MRR'
    },
    {
      title: 'Average Order Value',
      value: '$485',
      change: '+3.2%',
      changeType: 'positive',
      icon: 'CreditCard',
      trend: 'up',
      subtitle: 'Per transaction'
    },
    {
      title: 'Conversion Rate',
      value: '12.4%',
      change: '-0.8%',
      changeType: 'negative',
      icon: 'Target',
      trend: 'down',
      subtitle: 'Visitor to customer'
    }
  ]
};