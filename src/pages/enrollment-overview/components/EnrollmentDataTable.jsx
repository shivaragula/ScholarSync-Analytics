import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { useRecentEnrollments } from '../../../hooks/useApi';

const EnrollmentDataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('enrollmentDate');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const { data: apiData, loading, error } = useRecentEnrollments(50, searchTerm, filterStatus);

  // Fallback data for when API is not available
  const fallbackData = [
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
    },
    {
      id: 4,
      studentName: 'David Kim',
      email: 'david.kim@email.com',
      course: 'Business Analytics',
      category: 'Business',
      enrollmentDate: '2024-12-12',
      status: 'Active',
      progress: 30,
      paymentStatus: 'Pending'
    },
    {
      id: 5,
      studentName: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      course: 'Advanced JavaScript',
      category: 'Programming',
      enrollmentDate: '2024-12-11',
      status: 'Active',
      progress: 60,
      paymentStatus: 'Paid'
    }
  ];

  // Use API data if available, otherwise use fallback
  const enrollmentData = apiData?.enrollments || fallbackData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-success bg-success/10';
      case 'Completed':
        return 'text-primary bg-primary/10';
      case 'Inactive':
        return 'text-text-secondary bg-muted';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-success bg-success/10';
      case 'Pending':
        return 'text-warning bg-warning/10';
      case 'Failed':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const filteredData = enrollmentData.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            Recent Enrollments
          </h2>
          <p className="text-sm text-text-secondary">
            Detailed view of student enrollments and progress
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-32"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="inactive">Inactive</option>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-text-secondary text-sm">Student</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary text-sm">Course</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary text-sm">Category</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary text-sm">Enrolled</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary text-sm">Progress</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary text-sm">Payment</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-text-primary text-sm">{item.studentName}</div>
                    <div className="text-xs text-text-secondary">{item.email}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-text-primary">{item.course}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-text-secondary">{item.category}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-text-secondary">{item.enrollmentDate}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-secondary">{item.progress}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(item.paymentStatus)}`}>
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="p-1">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 text-destructive hover:text-destructive">
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary">No enrollments found matching your criteria.</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-text-secondary">
          Showing {filteredData.length} of {enrollmentData.length} enrollments
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} />
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentDataTable;