// menu-items/auditorium/reports.js
import { IconReportAnalytics, IconChartBar, IconFileReport } from '@tabler/icons-react';

const icons = {
  IconReportAnalytics,
  IconChartBar,
  IconFileReport
};

const reports = {
  id: 'auditorium-reports',
  title: 'Reports',
  type: 'group',
  children: [
    {
      id: 'revenue-reports',
      title: 'Revenue Reports',
      type: 'item',
      url: '/auditorium/reports/revenue',
      icon: icons.IconChartBar,
      breadcrumbs: false
    },
    {
      id: 'booking-analytics',
      title: 'Booking Analytics',
      type: 'item',
      url: '/auditorium/reports/analytics',
      icon: icons.IconReportAnalytics,
      breadcrumbs: false
    },
    {
      id: 'monthly-reports',
      title: 'Monthly Reports',
      type: 'item',
      url: '/auditorium/reports/monthly',
      icon: icons.IconFileReport,
      breadcrumbs: false
    }
  ]
};

export default reports;