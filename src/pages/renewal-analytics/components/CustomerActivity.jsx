import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CustomerActivityTimeline = ({ className = '' }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(0);

  const customers = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    avatarAlt: "Professional headshot of woman with brown hair in business attire smiling at camera",
    course: "Advanced Data Science",
    renewalProbability: 85,
    engagementScore: 92
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: "Professional headshot of Asian man with glasses in navy suit",
    course: "Machine Learning Fundamentals",
    renewalProbability: 72,
    engagementScore: 78
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1719515862094-c6e9354ee7f8",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair in white blouse",
    course: "Digital Marketing Pro",
    renewalProbability: 58,
    engagementScore: 65
  }];


  const activityData = [
  {
    date: "2024-10-17",
    time: "09:30 AM",
    type: "course_access",
    title: "Accessed Module 8: Advanced Analytics",
    description: "Completed 85% of the module content",
    icon: "BookOpen",
    color: "text-success bg-success/10"
  },
  {
    date: "2024-10-16",
    time: "02:15 PM",
    type: "assignment",
    title: "Submitted Final Project",
    description: "Received grade: 94/100 - Excellent work",
    icon: "FileCheck",
    color: "text-success bg-success/10"
  },
  {
    date: "2024-10-15",
    time: "11:45 AM",
    type: "discussion",
    title: "Participated in Forum Discussion",
    description: "Posted 3 replies in \'Machine Learning Best Practices'",
    icon: "MessageCircle",
    color: "text-primary bg-primary/10"
  },
  {
    date: "2024-10-14",
    time: "04:20 PM",
    type: "quiz",
    title: "Completed Chapter 7 Quiz",
    description: "Score: 88% - Above average performance",
    icon: "CheckCircle",
    color: "text-success bg-success/10"
  },
  {
    date: "2024-10-12",
    time: "10:00 AM",
    type: "video",
    title: "Watched Lecture: Neural Networks",
    description: "Viewed 100% - Took detailed notes",
    icon: "Play",
    color: "text-primary bg-primary/10"
  },
  {
    date: "2024-10-10",
    time: "03:30 PM",
    type: "support",
    title: "Contacted Support",
    description: "Question about course renewal options",
    icon: "HelpCircle",
    color: "text-warning bg-warning/10"
  },
  {
    date: "2024-10-08",
    time: "01:15 PM",
    type: "certificate",
    title: "Downloaded Certificate",
    description: "Intermediate Data Science Certificate",
    icon: "Award",
    color: "text-success bg-success/10"
  }];


  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'text-success bg-success/10';
    if (probability >= 60) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getEngagementColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Customer Activity Timeline</h3>
          <p className="text-sm text-text-secondary">Engagement patterns and renewal probability</p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Download">

          Export Timeline
        </Button>
      </div>
      {/* Customer Selector */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {customers?.map((customer, index) =>
          <button
            key={customer?.id}
            onClick={() => setSelectedCustomer(index)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg border transition-all duration-150 whitespace-nowrap ${
            selectedCustomer === index ?
            'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-text-secondary hover:text-text-primary hover:border-primary/50'}`
            }>

              <Image
              src={customer?.avatar}
              alt={customer?.avatarAlt}
              className="w-8 h-8 rounded-full object-cover" />

              <div className="text-left">
                <div className="text-sm font-medium">{customer?.name}</div>
                <div className="text-xs opacity-80">{customer?.course}</div>
              </div>
            </button>
          )}
        </div>
      </div>
      {/* Selected Customer Stats */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getProbabilityColor(customers?.[selectedCustomer]?.renewalProbability)}`}>
              {customers?.[selectedCustomer]?.renewalProbability}% Renewal Probability
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-text-secondary">Engagement Score:</span>
            <span className={`text-sm font-semibold ${getEngagementColor(customers?.[selectedCustomer]?.engagementScore)}`}>
              {customers?.[selectedCustomer]?.engagementScore}/100
            </span>
          </div>
        </div>
      </div>
      {/* Activity Timeline */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activityData?.map((activity, index) =>
        <div key={index} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity?.color}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              {index < activityData?.length - 1 &&
            <div className="w-px h-8 bg-border mt-2" />
            }
            </div>
            
            <div className="flex-1 min-w-0 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-text-primary">{activity?.title}</h4>
                  <p className="text-xs text-text-secondary mt-1">{activity?.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-xs font-medium text-text-primary">
                    {new Date(activity.date)?.toLocaleDateString()}
                  </div>
                  <div className="text-xs text-text-secondary">{activity?.time}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Showing last 7 activities</span>
          <Button variant="ghost" size="sm" iconName="ArrowRight">
            View Full History
          </Button>
        </div>
      </div>
    </div>);

};

export default CustomerActivityTimeline;