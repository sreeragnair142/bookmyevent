// assets
import {
  IconDashboard,
  IconUserPlus,
  IconUsers,
  IconBuildingSkyscraper,
  IconBriefcase,
  IconFileText,
  IconVideo,
  IconBell,
  IconCalendarEvent,
  IconCreditCard,
  IconSettings,
  IconCalendar,
  IconUserCheck,
  IconClock,
  IconCurrencyDollar,
  IconKey,
  IconGraph
} from '@tabler/icons-react';

// constants
const icons = {
  IconDashboard,
  IconUserPlus,
  IconUsers,
  IconBuildingSkyscraper,
  IconBriefcase,
  IconFileText,
  IconVideo,
  IconBell,
  IconCalendarEvent,
  IconCreditCard,
  IconSettings,
  IconCalendar,
  IconUserCheck,
  IconClock,
  IconCurrencyDollar,
  IconKey,
  IconGraph
};

// ==============================|| DASHBOARD FULL MENU GROUP ||============================== //

const tripmanagemet = {
  title: 'Trip Management',
  id: 'tripmanagemet',
  type: 'group',
  children: [
    {
      id: 'Trips',
      title: 'Trips',
      type: 'collapse',
      icon: icons.IconBuildingSkyscraper,  // <- changed icon here
      children: [
        {
          id: 'all-leads',
          title: 'All ',
          type: 'item',
          url: '/leads'
        },
        {
          id: 'new-leads',
          title: 'Scheduled',
          type: 'item',
          url: '/leads/new'
        },
        {
          id: 'follow-up',
          title: 'Pending',
          type: 'item',
          url: '/leads/follow-up'
        },
        {
          id: 'converted',
          title: 'Confirmed',
          type: 'item',
          url: '/leads/converted'
        },
        {
          id: 'converted',
          title: 'Ongoing',
          type: 'item',
          url: '/leads/converted'
        },
        {
          id: 'converted',
          title: 'Completed',
          type: 'item',
          url: '/leads/converted'
        },
        {
          id: 'converted',
          title: 'Canceled',
          type: 'item',
          url: '/leads/converted'
        },
        {
          id: 'converted',
          title: 'Payment failed',
          type: 'item',
          url: '/leads/converted'
        }
      ]
    },
  ]
};

export default tripmanagemet;
