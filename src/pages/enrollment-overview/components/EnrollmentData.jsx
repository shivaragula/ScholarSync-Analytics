import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EnrollmentDataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'enrollmentDate', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const enrollmentData = [
    {
      id: 'ENR-2025-001',
      studentName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      course: 'Computer Science Fundamentals',
      category: 'Undergraduate',
      enrollmentDate: '2025-10-17',
      amount: 2500,
      status: 'Active',
      paymentStatus: 'Paid',
      campus: 'Main Campus'
    },
    {
      id: 'ENR-2025-002',
      studentName: 'Michael Chen',
      email: 'michael.chen@email.com',
      course: 'Data Analytics Certificate',
      category: 'Certificate',
      enrollmentDate: '2025-10-17',
      amount: 1800,
      status: 'Active',
      paymentStatus: 'Pending',
      campus: 'Online'
    },
    {
      id: 'ENR-2025-003',
      studentName: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      course: 'MBA in Marketing',
      category: 'Graduate',
      enrollmentDate: '2025-10-16',
      amount: 4200,
      status: 'Active',
      paymentStatus: 'Paid',
      campus: 'North Campus'
    },
    {
      id: 'ENR-2025-004',
      studentName: 'David Thompson',
      email: 'david.thompson@email.com',
      course: 'Professional Development Workshop',
      category: 'Continuing Ed',
      enrollmentDate: '2025-10-16',
      amount: 850,
      status: 'Pending',
      paymentStatus: 'Pending',
      campus: 'Main Campus'
    },
    {
      id: 'ENR-2025-005',
      studentName: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      course: 'Engineering Physics',
      category: 'Undergraduate',
      enrollmentDate: '2025-10-15',
      amount: 3200,
      status: 'Active',
      paymentStatus: 'Paid',
      campus: 'South Campus'
    },
    {
      id: 'ENR-2025-006',
      studentName: 'James Miller',
      email: 'james.miller@email.com',
      course: 'Digital Marketing Certification',
      category: 'Certificate',
      enrollmentDate: '2025-10-15',
      amount: 1500,
      status: 'Active',
      paymentStatus: 'Overdue',
      campus: 'Online'
    },
    {
      id: 'ENR-2025-007',
      studentName: 'Anna Kowalski',
      email: 'anna.kowalski@email.com',
      course: 'Master of Education',
      category: 'Graduate',
      enrollmentDate: '2025-10-14',
      amount: 3800,
      status: 'Active',
      paymentStatus: 'Paid',
      campus: 'Main Campus'
    },
    {
      id: 'ENR-2025-008',
      studentName: 'Robert Garcia',
      email: 'robert.garcia@email.com',
      course: 'Business Analytics',
      category: 'Undergraduate',
      enrollmentDate: '2025-10-14',
      amount: 2800,
      status: 'Withdrawn',
      paymentStatus: 'Refunded',
      campus: 'North Campus'
    },
    {
      id: 'ENR-2025-009',
      studentName: 'Jennifer Lee',
      email: 'jennifer.lee@email.com',
      course: 'Leadership Development',
      category: 'Continuing Ed',
      enrollmentDate: '2025-10-13',
      amount: 950,
      status: 'Active',
      paymentStatus: 'Paid',
      campus: 'Online'
    },
    {
      id: 'ENR-2025-010',
      studentName: 'Thomas Anderson',
      email: 'thomas.anderson@email.com',
      course: 'Software Engineering',
      category: 'Undergraduate',
      enrollmentDate: '2025-10-13',
      amount: 3500,
      status: 'Active',
      paymentStatus: 'Pending',
      campus: 'Main Campus'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Withdrawn', label: 'Withdrawn' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Undergraduate', label: 'Undergraduate' },
    { value: 'Graduate', label: 'Graduate' },
    { value: 'Certificate', label: 'Certificate' },
    { value: 'Continuing Ed', label: 'Continuing Education' }
  ];

  const pageSizeOptions = [
    { value: 10, label: '10 per page' },
    { value: 25, label: '25 per page' },
    { value: 50, label: '50 per page' }
  ];

  const filteredData = useMemo(() => {
    return enrollmentData?.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item?.studentName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.course?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item?.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item?.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter]);

  const sortedData = useMemo(() => {
    if (!sortConfig?.key) return filteredData;
    
    return [...filteredData]?.sort((a, b) => {
      if (sortConfig?.key === 'amount') {
        return sortConfig?.direction === 'asc' ? a?.amount - b?.amount : b?.amount - a?.amount;
      }
      
      if (sortConfig?.key === 'enrollmentDate') {
        return sortConfig?.direction === 'asc' 
          ? new Date(a.enrollmentDate) - new Date(b.enrollmentDate)
          : new Date(b.enrollmentDate) - new Date(a.enrollmentDate);
      }
      
      const aValue = a?.[sortConfig?.key]?.toString()?.toLowerCase();
      const bValue = b?.[sortConfig?.key]?.toString()?.toLowerCase();
      
      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData?.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData?.length / pageSize);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle' },
      'Pending': { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock' },
      'Withdrawn': { color: 'text-error', bg: 'bg-error/10', icon: 'XCircle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.['Pending'];
    
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color} ${config?.bg}`}>
        <Icon name={config?.icon} size={12} />
        <span>{status}</span>
      </div>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusConfig = {
      'Paid': { color: 'text-success', bg: 'bg-success/10' },
      'Pending': { color: 'text-warning', bg: 'bg-warning/10' },
      'Overdue': { color: 'text-error', bg: 'bg-error/10' },
      'Refunded': { color: 'text-text-secondary', bg: 'bg-muted' }
    };
    
    const config = statusConfig?.[paymentStatus] || statusConfig?.['Pending'];
    
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${config?.color} ${config?.bg}`}>
        {paymentStatus}
      </span>
    );
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Student Name', 'Email', 'Course', 'Category', 'Enrollment Date', 'Amount', 'Status', 'Payment Status', 'Campus'];
    const csvContent = [
      headers?.join(','),
      ...sortedData?.map(row => [
        row?.id,
        `"${row?.studentName}"`,
        row?.email,
        `"${row?.course}"`,
        row?.category,
        row?.enrollmentDate,
        row?.amount,
        row?.status,
        row?.paymentStatus,
        `"${row?.campus}"`
      ]?.join(','))
    ]?.join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enrollment-data-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Enrollment Records</h3>
            <p className="text-sm text-text-secondary">
              {sortedData?.length} of {enrollmentData?.length} enrollments
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search students, courses, or IDs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="sm:w-64"
            />
            
            <div className="flex space-x-2">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-32"
              />
              
              <Select
                options={categoryOptions}
                value={categoryFilter}
                onChange={setCategoryFilter}
                className="w-40"
              />
              
              <Button
                variant="outline"
                iconName="Download"
                onClick={exportToCSV}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {[
                { key: 'id', label: 'Enrollment ID' },
                { key: 'studentName', label: 'Student' },
                { key: 'course', label: 'Course' },
                { key: 'category', label: 'Category' },
                { key: 'enrollmentDate', label: 'Date' },
                { key: 'amount', label: 'Amount' },
                { key: 'status', label: 'Status' },
                { key: 'paymentStatus', label: 'Payment' }
              ]?.map((column) => (
                <th
                  key={column?.key}
                  className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-muted transition-colors duration-150"
                  onClick={() => handleSort(column?.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column?.label}</span>
                    <Icon 
                      name={
                        sortConfig?.key === column?.key 
                          ? sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' :'ChevronsUpDown'
                      } 
                      size={14} 
                      className={sortConfig?.key === column?.key ? 'text-primary' : 'text-text-secondary'}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData?.map((enrollment) => (
              <tr key={enrollment?.id} className="hover:bg-muted/30 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-primary">{enrollment?.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{enrollment?.studentName}</div>
                    <div className="text-sm text-text-secondary">{enrollment?.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{enrollment?.course}</div>
                    <div className="text-sm text-text-secondary">{enrollment?.campus}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-text-primary">{enrollment?.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-text-primary">
                    {new Date(enrollment.enrollmentDate)?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-text-primary">
                    ${enrollment?.amount?.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(enrollment?.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPaymentStatusBadge(enrollment?.paymentStatus)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Select
              options={pageSizeOptions}
              value={pageSize}
              onChange={(value) => {
                setPageSize(value);
                setCurrentPage(1);
              }}
              className="w-32"
            />
            
            <span className="text-sm text-text-secondary">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData?.length)} of {sortedData?.length} results
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              iconPosition="right"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentDataTable;