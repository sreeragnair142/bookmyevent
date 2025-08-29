// menu-items/auditorium/customers.js
import { IconUsers, IconUserPlus, IconUserCheck } from '@tabler/icons-react';

const icons = {
  IconUsers,
  IconUserPlus,
  IconUserCheck
};

const auditoriummanagement = {
  id: 'auditorium-customers',
  title: 'AuditoriumManagement',
  type: 'group',
  children: [
    {
      id: 'Banners',
      title: 'Banners',
      type: 'item',
      url: '/auditorium/banner',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'Coupons',
      title: 'Coupons',
      type: 'item',
      url: '/auditorium/coupons',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    },
    {
      id: 'Push-notifications',
      title: 'Pushnotifications',
      type: 'item',
      url: '/auditorium/pushnotifications',
      icon: icons.IconUserCheck,
      breadcrumbs: false
    }
  ]
};

export default auditoriummanagement;
