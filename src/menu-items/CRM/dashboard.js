// assets
import {
  IconDashboard,
  IconGraph,
  IconSettings,
  IconUserShield,   // roles & permissions
  IconUserCog,      // profile settings
  IconTools         // system settings
} from '@tabler/icons-react';

// constants
const icons = {
  IconDashboard,
  IconGraph,
  IconSettings,
  IconUserShield,
  IconUserCog,
  IconTools
};

// ==============================|| DASHBOARD FULL MENU GROUP ||============================== //

const dashboard = {
  id: 'dashboard-group',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'main-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'dashboard-statistics',
      title: 'Statistics',
      type: 'item',
      url: '/dashboard/statistics',
      icon: icons.IconGraph,
      breadcrumbs: false
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        {
          id: 'roles-permissions',
          title: 'Roles & Permissions',
          type: 'item',
          url: '/settings/roles',
          icon: icons.IconUserShield
        },
        {
          id: 'profile-settings',
          title: 'Profile Settings',
          type: 'item',
          url: '/settings/profile',
          icon: icons.IconUserCog
        },
        {
          id: 'system-settings',
          title: 'System Settings',
          type: 'item',
          url: '/settings/system',
          icon: icons.IconTools
        }
      ]
    }
  ]
};

export default dashboard;
